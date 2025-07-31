#!/bin/bash

path=$PWD

# & at the end so `node index.js` runs in the background
cd "$path/backend" &&  node index.js &
cd "$path/frontend" && npm start &
