#!/bin/bash

# Define the source image
SOURCE="${1:-/Users/hlorenzoz/.gemini/antigravity/brain/9e060c26-d4f5-41c1-a5fd-a75ad002a54b/master_icon_1777629833405.png}"
OUTPUT_DIR="$(pwd)/public/icons"

# List of sizes to generate
SIZES=(48 72 96 128 144 152 180 192 384 512)

# Ensure output directory exists
mkdir -p "$OUTPUT_DIR"

# Generate icons
for SIZE in "${SIZES[@]}"; do
    echo "Generating ${SIZE}x${SIZE} webp icon..."
    magick "$SOURCE" -resize "${SIZE}x${SIZE}" "$OUTPUT_DIR/icon-${SIZE}.webp"
done

echo "Done!"
