"""Remove the background from every brand-banner image so we have
clean scooter cutouts on transparency. Output PNGs go to public/img/cutouts/
so the original webPs stay available as a fallback.

Run: python scripts/remove-bg.py
"""

from pathlib import Path
from rembg import remove, new_session
from PIL import Image
import io
import sys

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "public" / "img"
OUT = ROOT / "public" / "img" / "cutouts"
OUT.mkdir(parents=True, exist_ok=True)

INPUTS = [
    "xypro_brand_banner.webp",
    "jett_brand_banner.webp",
    "ep_brand_banner.webp",
    "4all_brand_banner.webp",
    "home_hero_section_2.webp",
]

# isnet-general-use has cleaner edges on product photography than u2net.
session = new_session("isnet-general-use")

for name in INPUTS:
    src = SRC / name
    if not src.exists():
        print(f"  skip: {name} (source missing)")
        continue

    out_name = Path(name).stem + "-cutout.png"
    dst = OUT / out_name

    if dst.exists() and dst.stat().st_size > 0:
        print(f"  ok  (cached): {out_name} [{dst.stat().st_size:,} bytes]")
        continue

    with open(src, "rb") as f:
        data = f.read()

    print(f"  processing {name} ({len(data):,} bytes)…", flush=True)
    output = remove(data, session=session, post_process_mask=True)

    with open(dst, "wb") as f:
        f.write(output)

    print(f"  ok           {out_name} [{dst.stat().st_size:,} bytes]")

print("done.")
