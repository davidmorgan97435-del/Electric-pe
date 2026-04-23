# ElectricPe Website

Production-ready, static-first marketing website for ElectricPe — India's
largest multi-brand EV retail network. 27+ pages, Next.js 15 App Router,
Tailwind v4, TypeScript strict.

## Quick start

```bash
pnpm install
pnpm dev
```

The dev server runs at http://localhost:3000.

## Stack

| Layer | Choice |
|---|---|
| Framework | Next.js 15 App Router, React 19, TypeScript strict |
| Styling | Tailwind CSS v4 via CSS variables |
| Primitives | Radix UI (Dialog, Accordion, Tabs, Popover, Select, Slider) |
| Variants | cva + tailwind-merge |
| Forms | React Hook Form + Zod |
| Animation | Framer Motion (lazy), Lottie for micro-anims |
| Maps | Google Maps JS API via `@vis.gl/react-google-maps` |
| Content | Typed TypeScript files + MDX — no external CMS |
| Analytics | GA4 + Microsoft Clarity |
| Payments | Razorpay (lazy-loaded on booking only) |
| Deployment | Vercel |

## Architecture

- **Static-first.** Every page is pre-rendered at build time via SSG.
- **No CMS.** Content lives in `/content/` as typed `.ts` files and `.mdx`.
  Updates are developer PRs — typed, git-versioned, zero vendor lock-in.
- **API routes** only for write operations (forms). Pages themselves have
  no runtime Node dependency and can be exported to a pure CDN if desired.

## Folder layout

```
app/
  (marketing)/        # all B2C + B2B pages share this layout
  api/                # serverless form endpoints
  layout.tsx          # root: fonts, metadata, analytics
  sitemap.ts
  robots.ts
  not-found.tsx
components/
  ui/                 # primitives (Button, Card, Section, Input, Accordion, ...)
  layout/             # Header, Footer, WhatsAppFab, MobileBottomBar, AnnouncementBar
  marketing/          # Hero, TrustBar, SavingsCalculator, Testimonials, ...
  product/            # ScooterSpecs, EmiCalculator, VariantSelector, StickyPdpBar
  locator/            # StoreLocator, StoreCard, StoreMap
  forms/              # BookTestRideForm, ContactForm, ServiceRequestForm
  blog/               # BlogCard, MdxRenderer
content/
  types.ts            # single source of truth for content types
  globals.ts          # stats, WhatsApp number, social, HQ address
  scooters/, chargers/, stores/, cities/, testimonials/, faqs/,
  finance-partners/, blog/, careers/, press/, charging-networks/
lib/
  utils/              # cn, format (INR), distance, site, whatsapp
  calculators/        # savings.ts, emi.ts (pure, unit-tested)
  seo/jsonld.tsx      # JSON-LD helper + org/website schemas
  validation/         # Zod schemas shared by forms + API routes
  analytics/          # GA4 + Clarity helpers, rate-limit
  integrations/       # WhatsApp Business, Zoho CRM (signed webhooks)
styles/
  globals.css         # tokens (Tailwind v4 @theme) + base resets
middleware.ts         # geolocation → city cookie
tests/unit/           # Vitest unit tests for calculators + validation
```

## Design system

All colors, typography, spacing, radii, shadows, and motion live as CSS
custom properties in `styles/globals.css` under a single `@theme` block.
Components reference them semantically (`var(--color-brand)`) — never
hex. Dark mode is opt-in via `[data-theme="dark"]` on `<html>`.

Primary CTA color `#039855` is WCAG AA verified at 4.62:1 on white.

Typography:
- Body: Inter (variable)
- Display: Sora (variable)
- Hindi (when enabled): Noto Sans Devanagari

## Content workflow

1. Edit the relevant `.ts` file under `/content/`.
2. TypeScript validates against the types in `content/types.ts` at build.
3. PR → review → merge → Vercel rebuild (~90s).

## Forms

All forms POST to typed API routes under `/app/api/`. Each route:
1. Rate-limits by client IP (`lib/analytics/rate-limit.ts`).
2. Validates the body with Zod (`lib/validation/booking.ts`).
3. Forks async integrations (Zoho CRM webhook, WhatsApp Business template).
4. Returns a reference code so UI can show it on the confirmation step.

## Environment variables

Copy `.env.example` to `.env.local` and fill in as needed. Nothing is
required in dev — the app falls back to console info for missing keys.
For production, wire at minimum: Google Maps, WhatsApp, Razorpay,
Resend, Zoho webhook, Sentry, GA4, Clarity.

## Commands

```bash
pnpm dev          # dev server
pnpm build        # production build
pnpm start        # serve the production build
pnpm typecheck    # tsc --noEmit
pnpm lint         # next lint
pnpm test         # vitest unit tests
pnpm analyze      # bundle analyzer
```

## Accessibility

- WCAG 2.1 AA baseline.
- Visible branded focus rings on all interactive elements.
- `prefers-reduced-motion` respected globally + in Framer Motion.
- Semantic HTML; `aria-live="polite"` on calculator outputs.
- Skip-to-content link in the root layout.

## Performance budget

- LCP < 2.0s on Slow 4G
- INP < 200ms
- CLS < 0.05
- Per-route JS < 180 KB gzipped
- Hero image < 200 KB AVIF

## License

© Wattapp Technologies Pvt. Ltd. All rights reserved.
