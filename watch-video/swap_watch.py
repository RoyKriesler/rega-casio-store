#!/usr/bin/env python3
"""Replace the watch in a base video with a different watch.

Tracks the watch region through the clip (optical flow + homography) and
composites a product photo of the new watch onto it, matching the shot's
lighting frame by frame. CPU only, no paid services.

Usage:
  python3 swap_watch.py --video base.mp4 --watch new_watch.png \
      --quad "x1,y1 x2,y2 x3,y3 x4,y4" [--ref-frame 0] --out out.mp4

--quad   corners of the old watch case on --ref-frame, clockwise from top-left.
--watch  PNG of the new watch case, front-on, transparent background,
         cropped tightly to the case (top of case at the top of the image).
"""
import argparse
import subprocess
import sys

import cv2
import numpy as np


def parse_quad(s):
    pts = [tuple(map(float, p.split(","))) for p in s.split()]
    if len(pts) != 4:
        sys.exit("--quad needs 4 points")
    return np.array(pts, dtype=np.float32)


def read_frames(path):
    cap = cv2.VideoCapture(path)
    fps = cap.get(cv2.CAP_PROP_FPS) or 25
    frames = []
    while True:
        ok, f = cap.read()
        if not ok:
            break
        frames.append(f)
    return frames, fps


def track_quads(frames, quad, ref):
    """Return the watch quad for every frame, tracked out from frame `ref`."""
    n = len(frames)
    quads = [None] * n
    quads[ref] = quad.copy()
    gray = [cv2.cvtColor(f, cv2.COLOR_BGR2GRAY) for f in frames]

    def feature_mask(q, shape):
        # Track the watch and the wrist right around it; both move together.
        m = np.zeros(shape, np.uint8)
        c = q.mean(axis=0)
        cv2.fillConvexPoly(m, ((q - c) * 1.6 + c).astype(np.int32), 255)
        return m

    for step in (1, -1):
        q = quad.copy()
        i = ref
        pts = cv2.goodFeaturesToTrack(gray[i], 300, 0.01, 4, mask=feature_mask(q, gray[i].shape))
        while 0 <= i + step < n:
            j = i + step
            if pts is None or len(pts) < 12:
                pts = cv2.goodFeaturesToTrack(gray[i], 300, 0.01, 4, mask=feature_mask(q, gray[i].shape))
            nxt, st, _ = cv2.calcOpticalFlowPyrLK(gray[i], gray[j], pts, None, winSize=(21, 21), maxLevel=3)
            good_old, good_new = pts[st == 1], nxt[st == 1]
            if len(good_old) >= 8:
                H, inl = cv2.findHomography(good_old, good_new, cv2.RANSAC, 3.0)
                if H is not None:
                    q = cv2.perspectiveTransform(q.reshape(-1, 1, 2), H).reshape(-1, 2)
                    good_new = good_new[inl.ravel() == 1]
            quads[j] = q.copy()
            pts = good_new.reshape(-1, 1, 2)
            i = j

    # Light temporal smoothing to kill jitter.
    arr = np.stack(quads)
    k = np.array([1, 2, 3, 2, 1], np.float32)
    k /= k.sum()
    pad = np.pad(arr, ((2, 2), (0, 0), (0, 0)), mode="edge")
    return [sum(k[t] * pad[i + t] for t in range(5)) for i in range(n)]


def luminance_in(frame, quad):
    m = np.zeros(frame.shape[:2], np.uint8)
    cv2.fillConvexPoly(m, quad.astype(np.int32), 255)
    lab = cv2.cvtColor(frame, cv2.COLOR_BGR2LAB)
    return cv2.mean(lab, mask=m)[0]


def composite(frame, watch_rgba, quad, light_gain, blur):
    h, w = frame.shape[:2]
    wh, ww = watch_rgba.shape[:2]
    src = np.float32([[0, 0], [ww, 0], [ww, wh], [0, wh]])
    M = cv2.getPerspectiveTransform(src, quad.astype(np.float32))
    warped = cv2.warpPerspective(watch_rgba, M, (w, h), flags=cv2.INTER_LINEAR, borderValue=(0, 0, 0, 0))
    rgb = warped[:, :, :3].astype(np.float32) * light_gain
    alpha = warped[:, :, 3].astype(np.float32) / 255.0
    if blur > 0:
        rgb = cv2.GaussianBlur(rgb, (0, 0), blur)
    alpha = cv2.GaussianBlur(alpha, (0, 0), 0.8)[..., None]

    # Hide the old case wherever the new one does not cover it.
    old = np.zeros((h, w), np.uint8)
    cv2.fillConvexPoly(old, quad.astype(np.int32), 255)
    old = cv2.dilate(old, np.ones((5, 5), np.uint8))
    uncovered = ((old > 0) & (alpha[..., 0] < 0.5)).astype(np.uint8) * 255
    base = cv2.inpaint(frame, uncovered, 5, cv2.INPAINT_TELEA) if uncovered.any() else frame

    # Soft contact shadow under the new case.
    shadow = cv2.GaussianBlur(alpha[..., 0], (0, 0), 4)
    shadow = np.roll(shadow, (3, 2), axis=(0, 1))[..., None] * 0.35
    base = base.astype(np.float32) * (1 - shadow)

    out = rgb * alpha + base * (1 - alpha)
    return np.clip(out, 0, 255).astype(np.uint8)


def main():
    ap = argparse.ArgumentParser()
    ap.add_argument("--video", required=True)
    ap.add_argument("--watch", required=True)
    ap.add_argument("--quad", required=True)
    ap.add_argument("--ref-frame", type=int, default=0)
    ap.add_argument("--blur", type=float, default=0.6, help="soften the pasted watch to match footage sharpness")
    ap.add_argument("--out", required=True)
    a = ap.parse_args()

    frames, fps = read_frames(a.video)
    if not frames:
        sys.exit("could not read video")
    watch = cv2.imread(a.watch, cv2.IMREAD_UNCHANGED)
    if watch is None or watch.shape[2] != 4:
        sys.exit("--watch must be a PNG with transparency")

    quads = track_quads(frames, parse_quad(a.quad), a.ref_frame)
    ref_l = luminance_in(frames[a.ref_frame], quads[a.ref_frame])

    h, w = frames[0].shape[:2]
    ff = subprocess.Popen(
        ["ffmpeg", "-y", "-loglevel", "error", "-f", "rawvideo", "-pix_fmt", "bgr24",
         "-s", f"{w}x{h}", "-r", str(fps), "-i", "-",
         "-c:v", "libx264", "-pix_fmt", "yuv420p", "-crf", "18", "-movflags", "+faststart", a.out],
        stdin=subprocess.PIPE)
    for f, q in zip(frames, quads):
        gain = np.clip(luminance_in(f, q) / max(ref_l, 1), 0.6, 1.4)
        ff.stdin.write(composite(f, watch, q, gain, a.blur).tobytes())
    ff.stdin.close()
    ff.wait()
    print(f"wrote {a.out} ({len(frames)} frames)")


if __name__ == "__main__":
    main()
