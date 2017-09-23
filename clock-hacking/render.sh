#!/usr/bin/env bash

node draw.js
ffmpeg -y -i %2d.png -c:v libx264 -pix_fmt yuv420p -r 20 sine.mp4
ffmpeg -y -i %2d.png -r 20 sine.gif
