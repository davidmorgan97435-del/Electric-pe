import type { BrandSlug } from "./types";

/**
 * Brand presentation theme + landing-page content.
 *
 * The `banner` cutout is a transparent PNG of the scooter alone (no baked-in
 * brand text), so every card/hero can render the brand wordmark as real
 * typography on top of a themed background. `tint` is the Tailwind class set
 * for the card background; it matches the aesthetic of the original
 * `*_brand_banner.webp` assets without the letterbox/crop problems.
 *
 * The landing-page fields (`positioning`, `story*`, `pillars`, `bestFor`) are
 * consumed by <BrandLanding> at /ev/{slug}. Icon names reference the keys in
 * BRAND_ICON_MAP below — stored as strings so this module stays pure data.
 */

export type BrandPillarIcon =
  | "Wallet"
  | "ShieldCheck"
  | "Store"
  | "Clock"
  | "Zap"
  | "Gauge"
  | "Heart"
  | "Users"
  | "Package"
  | "Sparkles"
  | "MapPin"
  | "Wrench";

export type BrandPillar = {
  iconName: BrandPillarIcon;
  title: string;
  proof: string;
};

export type BrandTheme = {
  slug: BrandSlug;
  displayName: string;
  tagline: string;
  /** Transparent-PNG cutout of the scooter. */
  cutout: string;
  /** Background on brand tiles / PDP hero (Tailwind class). */
  tint: string;
  /** Text color that reads well against `tint`. */
  onTint: string;

  // ─── Landing-page content ────────────────────────────────
  /** One-line brand positioning, sits under the hero H1. */
  positioning: string;
  /** H2 above the brand story section. */
  storyTitle: string;
  /** 2–3 sentence brand origin / philosophy paragraph. */
  storyBody: string;
  /** 3 brand-specific USP pillars (not the generic service promise). */
  pillars: [BrandPillar, BrandPillar, BrandPillar];
  /** Use-case tags ("Daily commute", "Family", etc.) rendered as chips. */
  bestFor: string[];
  /** Short trust chip row shown under the hero. */
  trustChips: string[];
};

export const BRAND_THEMES: Record<BrandSlug, BrandTheme> = {
  xypro: {
    slug: "xypro",
    displayName: "Xypro",
    tagline: "Most affordable. No licence, no registration.",
    cutout: "/img/cutouts/xypro_brand_banner-cutout.png",
    tint: "bg-gradient-to-br from-sky-100 via-indigo-100 to-rose-100",
    onTint: "text-slate-900",
    positioning:
      "Affordable everyday ride for first-time EV owners — available in lead-acid, lithium-ion and battery-swap variants.",
    storyTitle: "Built for the everyday Indian commute",
    storyBody:
      "Xypro was designed around one idea: an electric scooter should cost less than your last bike, charge on any 5A socket at home, and never need a licence or registration. Three variants cover three budgets — the lead-acid Xypro starts at ₹53,999, the long-range lithium-ion version pushes 100 km, and the Xypro Swap strips price to the bone with battery-as-a-service.",
    pillars: [
      {
        iconName: "Wallet",
        title: "Starts at ₹35,000",
        proof:
          "The Xypro Swap is the lowest-priced scooter in our range — battery comes as a monthly subscription, so upfront cost stays low.",
      },
      {
        iconName: "Zap",
        title: "100 km lithium range",
        proof:
          "The Xypro Lithium Ion delivers a real-world 100 km on a single 4-hour charge — tested on Indian roads, not a lab bench.",
      },
      {
        iconName: "ShieldCheck",
        title: "No licence, no RTO",
        proof:
          "All three Xypro variants are ≤25 km/h and ARAI-classified low-speed — ride home the same day, no DL or registration.",
      },
    ],
    bestFor: ["Daily commute", "Students", "First-time EV riders"],
    trustChips: ["ARAI-approved", "Made in India", "3-year warranty", "No licence required"],
  },

  jett: {
    slug: "jett",
    displayName: "Jett",
    tagline: "Timeless elegance meets daily comfort.",
    cutout: "/img/cutouts/jett_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-red-950 via-red-900 to-red-950",
    onTint: "text-white",
    positioning:
      "A classic-silhouette electric scooter built for the family ride — generous seat, 12-inch wheels, cargo you can live with.",
    storyTitle: "The family scooter, reimagined electric",
    storyBody:
      "Jett keeps the silhouette of the scooter your parents rode and gives it a silent, clean-running electric heart. 12-inch wheels flatten out Indian roads, a cushioned dual seat and 10 kg of under-seat storage make daily errands effortless, and the lithium-ion variant stretches 90 km on a charge — enough for two commutes and the weekend grocery run.",
    pillars: [
      {
        iconName: "Users",
        title: "Two-up comfort",
        proof:
          "Cushioned dual seat with lumbar support and 160 kg payload — built to carry a rider and a pillion every day without complaint.",
      },
      {
        iconName: "Package",
        title: "10 kg under-seat storage",
        proof:
          "The largest dry-storage compartment in the ElectricPe range. Helmet, groceries, a laptop bag — all lock away under the seat.",
      },
      {
        iconName: "Gauge",
        title: "12-inch wheels",
        proof:
          "Larger wheels absorb potholes and speed breakers far better than the 10-inch standard — a quieter, steadier ride on rough roads.",
      },
    ],
    bestFor: ["Family", "Daily commute", "Weekend errands"],
    trustChips: ["ARAI-approved", "Made in India", "3-year warranty", "No licence required"],
  },

  ep: {
    slug: "ep",
    displayName: "EP City+",
    tagline: "Ab India chalega ElectricPe.",
    cutout: "/img/cutouts/ep_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-stone-700 via-stone-800 to-stone-900",
    onTint: "text-white",
    positioning:
      "The most affordable ElectricPe — designed for delivery partners, first-time riders, and anyone who just needs to get there.",
    storyTitle: "Electric mobility, made simple",
    storyBody:
      "EP City+ is our entry point. One variant, one price (₹43,000 on-road), one job — move you across the city at 25 km/h without a licence, without registration, without drama. Lightweight enough to park in narrow lanes, serviceable at every ElectricPe Mobility Centre, and warrantied for three years on the motor. That's it. That's the pitch.",
    pillars: [
      {
        iconName: "Wallet",
        title: "₹43,000 on-road",
        proof:
          "Lowest sticker price in the ElectricPe catalogue — taxes and road-side delivery included. What you see is what you pay.",
      },
      {
        iconName: "MapPin",
        title: "Built for Indian cities",
        proof:
          "Lightweight (78 kg), narrow footprint, 10-inch wheels — fits through the lanes and parking squeezes most scooters can't.",
      },
      {
        iconName: "Wrench",
        title: "Service at any ElectricPe centre",
        proof:
          "Part of the same service network as every other ElectricPe scooter — 30+ Mobility Centres, 24-hour SLA, genuine parts on the shelf.",
      },
    ],
    bestFor: ["Delivery partners", "First-time riders", "Tight budgets"],
    trustChips: ["ARAI-approved", "Made in India", "3-year motor warranty", "No licence required"],
  },

  "4all": {
    slug: "4all",
    displayName: "4ALL",
    tagline: "Best range. Zero hassle.",
    cutout: "/img/cutouts/4all_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-stone-600 via-stone-700 to-neutral-900",
    onTint: "text-white",
    positioning:
      "Longest real-world range in the no-licence category — 95 km on lithium, 95 km on lead-acid, same honest 25 km/h top speed.",
    storyTitle: "Range, without the paperwork",
    storyBody:
      "Most long-range electric scooters ask you to queue at the RTO and memorise a traffic code. 4ALL refuses that trade. Both variants cap speed at 25 km/h to stay in the no-licence category — but squeeze 95 km out of a single charge, more than any other licence-free scooter we sell. Lithium charges in 4 hours. Lead-acid costs less and lives longer on rough service schedules. Pick your chemistry.",
    pillars: [
      {
        iconName: "Zap",
        title: "95 km real-world range",
        proof:
          "Both 4ALL variants return 95 km on a single charge — tested on Indian roads with a 70 kg rider, not on a lab bench in neutral.",
      },
      {
        iconName: "ShieldCheck",
        title: "No RTO, no waiting",
        proof:
          "25 km/h means no driving licence, no registration, no road tax. Book today, ride home tonight — that's the promise.",
      },
      {
        iconName: "Sparkles",
        title: "Lithium or lead-acid",
        proof:
          "Same chassis, same range, two chemistries. Lithium-ion for fast charging (4 hours). Lead-acid for lower sticker price (₹62,000).",
      },
    ],
    bestFor: ["Long commutes", "Daily family use", "Range anxiety, fixed"],
    trustChips: ["ARAI-approved", "Made in India", "3-year warranty", "No licence required"],
  },
};

export const BRAND_ORDER: BrandSlug[] = ["xypro", "jett", "ep", "4all"];

export function getBrandTheme(slug: string): BrandTheme | undefined {
  return BRAND_THEMES[slug as BrandSlug];
}
