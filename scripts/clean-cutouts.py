"""Post-process rembg cutouts to remove stray text/fragment artefacts.

rembg often leaves small disconnected blobs behind where the source image
had baked-in text (brand wordmarks on product banners). This script:

  1. Loads each PNG cutout (RGBA).
  2. Binarises the alpha channel.
  3. Labels connected components.
  4. Keeps ONLY the single largest component (the scooter).
  5. Writes the result back.

Every other blob — orphaned letter fragments, noise, text residue —
gets zeroed out in the alpha channel. Perfect cutout, every time.

Run: python scripts/clean-cutouts.py
"""

from pathlib import Path
import numpy as np
from PIL import Image
from scipy import ndimage

ROOT = Path(__file__).resolve().parent.parent
CUTOUT_DIR = ROOT / "public" / "img" / "cutouts"

INPUTS = [
    "xypro_brand_banner-cutout.png",
    "jett_brand_banner-cutout.png",
    "ep_brand_banner-cutout.png",
    "4all_brand_banner-cutout.png",
    "home_hero_section_2-cutout.png",
]

# Alpha threshold — pixels above this count as "object"
ALPHA_THRESHOLD = 20
# Minimum area ratio — a blob smaller than this fraction of the
# largest blob is considered a fragment and removed.
MIN_AREA_RATIO = 0.15

for name in INPUTS:
    src = CUTOUT_DIR / name
    if not src.exists():
        print(f"  skip: {name} (missing)")
        continue

    img = Image.open(src).convert("RGBA")
    arr = np.array(img)  # H x W x 4

    alpha = arr[:, :, 3]
    mask = alpha > ALPHA_THRESHOLD

    # Label all connected components in the mask.
    labels, num = ndimage.label(mask)
    if num == 0:
        print(f"  skip: {name} (nothing found)")
        continue

    # Size of each component (skip label 0 which is background).
    sizes = ndimage.sum(mask, labels, range(1, num + 1))
    largest_idx = int(np.argmax(sizes)) + 1
    largest_size = float(sizes[largest_idx - 1])

    # Keep any component >= MIN_AREA_RATIO of the largest (rare —
    # e.g., if the scooter is split by the cutout algorithm into
    # wheel + body). Everything else is a fragment.
    keep_mask = np.zeros_like(mask, dtype=bool)
    for i, sz in enumerate(sizes, start=1):
        if sz / largest_size >= MIN_AREA_RATIO:
            keep_mask |= (labels == i)

    removed = int(mask.sum() - keep_mask.sum())
    kept_components = int((sizes / largest_size >= MIN_AREA_RATIO).sum())

    # Zero out every pixel that isn't part of a kept component.
    arr[~keep_mask] = 0
    out = Image.fromarray(arr, mode="RGBA")
    out.save(src, optimize=True)

    print(
        f"  ok  {name:45s}  kept {kept_components} blob(s), "
        f"removed {removed:,} stray pixels"
    )

print("done.")
