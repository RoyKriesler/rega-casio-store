#!/bin/zsh
# Turn generated PNGs into web JPGs. Stills are zoomed with CSS in the browser (smooth); do not bake zoom into video, it shakes.
set -e
cd ~/Projects/watch-store
mkdir -p public/art public/video
for f in art/raw/*.png; do
  n=$(basename $f .png)
  [ -f public/art/$n.jpg ] || ffmpeg -v error -y -i $f -vf "scale='min(1600,iw)':-2" -q:v 3 public/art/$n.jpg
done
ls -la public/art public/video | grep -v "^total"
