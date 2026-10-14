#!/bin/zsh
# Local image generation with mflux (FLUX.2 klein 4B). Free, runs on this Mac.
cd ~/Projects/watch-store/art/raw
NEG=", photographic, cinematic, film grain, no text, no letters, no logo, no watermark"
gen() { # name w h seed prompt
  [ -f "$1.png" ] && return
  mflux-generate-flux2 --model flux2-klein-4b --steps 4 --width $2 --height $3 --seed $4 --prompt "$5$NEG" --output "$1.png" >/dev/null 2>&1 && echo "done $1"
}
gen hero-sea 1600 896 11 "Wide cinematic photograph of a lone man in a black wetsuit standing on a dark rock above a stormy grey sea at dusk, seen from behind, dramatic overcast sky, muted desaturated teal tones"
gen col-sport 896 1408 12 "Close-up cinematic photograph of a man's tanned wrist wearing a steel sports watch with an integrated steel bracelet and a plain blue dial, hand resting on the teak deck rail of a sailing boat, sea spray, golden hour, shallow depth of field"
gen col-field 896 1408 13 "Cinematic photograph of a hiker's wrist wearing a small steel field watch with a black dial and white numerals on an olive green nylon strap, misty pine forest behind, early morning light, shallow depth of field"
gen col-dress 896 1408 14 "Cinematic photograph of a man in a dark navy suit adjusting his shirt cuff over a slim gold dress watch with a cream dial and brown leather strap, warm candlelit restaurant bokeh behind, elegant"
gen col-digital 896 1408 15 "Cinematic night photograph of a wrist wearing a retro silver digital watch with a glowing green screen, rainy neon city street reflections, shallow depth of field"
gen col-gshock 896 1408 16 "Cinematic photograph of a skateboarder's wrist wearing a rugged black square digital sports watch, concrete skatepark, hard afternoon sunlight, motion, dynamic angle"
gen col-straps 896 1408 17 "Overhead still life photograph of watch straps, an olive nylon strap, a black rubber strap and a tan leather strap, laid on a dark walnut workbench with small brass tools, soft window light"
gen statement 1600 896 18 "Macro cinematic photograph of a watchmaker's hands holding fine steel tweezers over a tiny open watch movement under a warm desk lamp, dark workshop, shallow depth of field"
gen film-gears 1600 896 19 "Extreme macro photograph of brass watch gears and small red jewel bearings inside a mechanical movement, dramatic side light, black background"
gen film-crown 1600 896 20 "Macro photograph of a polished steel watch crown and case edge covered in water droplets, dark moody light, black background"
gen film-strap 1600 896 21 "Macro photograph of a craftsman stitching a tan leather watch strap by hand with white thread, warm light, dark background"
echo ALL_DONE
