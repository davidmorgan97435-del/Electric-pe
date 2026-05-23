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
 * BRAND_ICON_MAP below, stored as strings so this module stays pure data.
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
      "Affordable everyday ride for first-time EV owners. Available in lead-acid, lithium-ion and battery-swap variants.",
    storyTitle: "Built for the everyday Indian commute",
    storyBody:
      "Xypro was designed around one idea: an electric scooter should cost less than your last bike, charge on any 5A socket at home, and never need a licence or registration. Three variants cover three budgets, all starting at ₹36,000 with 80 km+ real-world range and a 4-hour charge: the lead-acid Xypro for proven chemistry, the lithium-ion version for lighter weight and faster charging, and the Xypro Swap with battery-as-a-service.",
    pillars: [
      {
        iconName: "Wallet",
        title: "Starts at ₹36,000",
        proof:
          "The Xypro range starts at ₹36,000 on-road, the lowest-priced electric scooter in our lineup. EMI from ₹1,299/month.",
      },
      {
        iconName: "Zap",
        title: "80 km+ real-world range",
        proof:
          "Every Xypro variant delivers a real-world 80 km+ on a single 4-hour charge, tested on Indian roads, not a lab bench.",
      },
      {
        iconName: "ShieldCheck",
        title: "No licence, no RTO",
        proof:
          "All three Xypro variants are ≤25 km/h and ARAI-classified low-speed. Ride home the same day, no DL or registration.",
      },
    ],
    bestFor: ["Daily commute", "Students", "First-time EV riders"],
    trustChips: ["ARAI-approved", "Made in India", "Low running cost", "No licence required"],
  },

  jett: {
    slug: "jett",
    displayName: "Jett",
    tagline: "Timeless elegance meets daily comfort.",
    cutout: "/img/cutouts/jett_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-red-950 via-red-900 to-red-950",
    onTint: "text-white",
    positioning:
      "A classic-silhouette electric scooter built for the family ride: generous seat, 12-inch wheels, cargo you can live with.",
    storyTitle: "The family scooter, reimagined electric",
    storyBody:
      "Jett keeps the silhouette of the scooter your parents rode and gives it a silent, clean-running electric heart. 12-inch wheels flatten out Indian roads, a cushioned dual seat and 10 kg of under-seat storage make daily errands effortless, and every variant stretches 80 km+ on a charge, enough for two commutes and the weekend grocery run.",
    pillars: [
      {
        iconName: "Users",
        title: "Two-up comfort",
        proof:
          "Cushioned dual seat with lumbar support and 160 kg payload, built to carry a rider and a pillion every day without complaint.",
      },
      {
        iconName: "Package",
        title: "10 kg under-seat storage",
        proof:
          "The largest dry-storage compartment in the ElectricPe range. Helmet, groceries, a laptop bag, all lock away under the seat.",
      },
      {
        iconName: "Gauge",
        title: "12-inch wheels",
        proof:
          "Larger wheels absorb potholes and speed breakers far better than the 10-inch standard: a quieter, steadier ride on rough roads.",
      },
    ],
    bestFor: ["Family", "Daily commute", "Weekend errands"],
    trustChips: ["ARAI-approved", "Made in India", "Low running cost", "No licence required"],
  },

  "4all": {
    slug: "4all",
    displayName: "4ALL",
    tagline: "Best range. Zero hassle.",
    cutout: "/img/cutouts/4all_brand_banner-cutout.png",
    tint: "bg-gradient-to-b from-stone-600 via-stone-700 to-neutral-900",
    onTint: "text-white",
    positioning:
      "Best range in the no-licence category: 80 km+ on a single charge, honest 25 km/h top speed, ₹56,000 on-road.",
    storyTitle: "Range, without the paperwork",
    storyBody:
      "Most long-range electric scooters ask you to queue at the RTO and memorise a traffic code. 4ALL refuses that trade. Both variants cap speed at 25 km/h to stay in the no-licence category, but deliver 80 km+ on a single 4-hour charge. Lithium for lighter weight and faster recovery cycles. Lead-acid for proven, easy-to-service chemistry. Pick your chemistry.",
    pillars: [
      {
        iconName: "Zap",
        title: "80 km+ real-world range",
        proof:
          "Both 4ALL variants return 80 km+ on a single charge, tested on Indian roads with a 70 kg rider, not on a lab bench in neutral.",
      },
      {
        iconName: "ShieldCheck",
        title: "No RTO, no waiting",
        proof:
          "25 km/h means no driving licence, no registration, no road tax. Book today, ride home tonight. That's the promise.",
      },
      {
        iconName: "Sparkles",
        title: "Lithium or lead-acid",
        proof:
          "Same chassis, same 80 km+ range, two chemistries. Lithium-ion for lighter weight. Lead-acid for proven, easy-to-service durability. Both at ₹56,000.",
      },
    ],
    bestFor: ["Long commutes", "Daily family use", "Range anxiety, fixed"],
    trustChips: ["ARAI-approved", "Made in India", "Low running cost", "No licence required"],
  },
};

export const BRAND_ORDER: BrandSlug[] = ["xypro", "jett", "4all"];

export function getBrandTheme(slug: string): BrandTheme | undefined {
  return BRAND_THEMES[slug as BrandSlug];
}
