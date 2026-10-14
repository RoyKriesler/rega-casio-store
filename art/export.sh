#!/bin/zsh
# Turn generated PNGs into web JPGs, and film-* stills into slow push-in MP4 clips.
set -e
cd ~/Projects/watch-store
mkdir -p public/art public/video
for f in art/raw/*.png; do
  n=$(basename $f .png)
  [ -f public/art/$n.jpg ] || ffmpeg -v error -y -i $f -vf "scale='min(1600,iw)':-2" -q:v 3 public/art/$n.jpg
done
for n in film-gears film-crown film-strap film-bezel film-rain film-bracelet film-dial; do
  [ -f art/raw/$n.png ] || continue
  [ -f public/video/$n.mp4 ] && continue
  ffmpeg -v error -y -loop 1 -i art/raw/$n.png \
    -vf "scale=3200:-2,zoompan=z='min(zoom+0.0009,1.18)':x='iw/2-(iw/zoom/2)':y='ih/2-(ih/zoom/2)':d=175:s=1280x716:fps=25" \
    -t 7 -an -c:v libx264 -preset slow -crf 24 -pix_fmt yuv420p -movflags +faststart public/video/$n.mp4
done
ls -la public/art public/video | grep -v "^total"
