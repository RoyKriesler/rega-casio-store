# Watch swap

One base video of a model wearing a watch, re-rendered for every watch in the catalog by replacing only the watch.

`swap_watch.py` tracks the watch through the clip (optical flow + homography) and composites a product photo of the new watch on it, matching the shot's brightness frame by frame. Runs on CPU, no paid services.

```
python3 swap_watch.py --video base.mp4 --watch new_watch.png \
  --quad "x1,y1 x2,y2 x3,y3 x4,y4" --out out.mp4
```

- `--quad`: corners of the old watch case on the reference frame, clockwise from top-left.
- `--watch`: PNG of the new watch case, front-on, transparent background.

Works best when the base video is shot for it: the watch faces the camera, the wrist moves slowly, nothing passes in front of the watch. The bracelet in the base video is kept, so watches on a similar bracelet swap most convincingly.

`demo-swap.jpg`: start, middle and end of a test clip (hand moving and lighting darkening), with a test watch swapped in.

Requires `pip install opencv-python-headless numpy` and ffmpeg.
