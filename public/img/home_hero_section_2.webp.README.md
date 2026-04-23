# Image Assets

The following images are referenced by the site code. Drop the real assets
in `public/img/` with these exact filenames (reuse from the current
electricpe.com site per the revamp plan):

## Required for launch
- `home_hero_section_2.webp` — Homepage hero (morning commute in Indian setting)
- `xypro_brand_banner.webp` — Xypro brand hero
- `jett_brand_banner.webp` — Jett brand hero
- `ep_brand_banner.webp` — EP brand hero
- `4all_brand_banner.webp` — 4ALL brand hero
- `eplogo-horiz.png` — Horizontal logo
- `footer-qr.svg` — QR code for app download

## Product galleries (per SKU, 4–7 images each)
- `/img/products/xypro-lithium-ion/01.webp` … `07.webp`
- `/img/products/jett-lithium-ion/…`
- etc. for every variant

## Store photography
- `/img/stores/<store-slug>/01.webp` — interior
- `/img/stores/<store-slug>/02.webp` — service bay

## Customer testimonials
- `/img/testimonials/<customer-id>.webp` — real customer photos with consent

## Partner logos
- `/img/partners/bajaj.svg`, `hdfc.svg`, `idfc.svg`, `shriram.svg`, `kotak.svg`, `lazypay.svg`

## Chargers
- `/img/chargers/oakter.webp`, `riod-74.webp`, `teltonika-74.webp`, `riod-22.webp`, `teltonika-22-4g.webp`

## OG image
- `/og/default.jpg` — 1200×630 homepage OG
- `/og/<page>.jpg` — per-page OG images (PDPs can use next/og generated ones)

Until real assets ship, the page still renders — Next.js falls back to a
broken `<img>` but the layout and JSON-LD are unaffected. For visual QA,
copy placeholders from the current electricpe.com site (WebP format)
into the same paths.
