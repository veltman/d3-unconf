#!/usr/bin/env bash

node draw.js | ffmpeg -y -c:v png -f image2pipe -r 20 -i - -an -c:v libx264 -pix_fmt yuv420p -movflags +faststart globe.mp4
