/**
 * Single source of truth for all content models.
 * Every piece of repo-local content is typed against these.
 */

export type UseCase = "commute" | "delivery" | "student" | "family";
export type BrandSlug = "xypro" | "jett" | "4all";
export type BatteryType = "lithium-ion" | "lead-acid";
export type FearTag =
  | "battery"
  | "service"
  | "speed"
  | "repair"
  | "brand-credibility"
  | "emi";

export type ScooterSpecs = {
  rangeKm: number;
  topSpeedKmh: number;
  chargeTimeHours: number;
  batteryType: BatteryType;
  batteryCapacityKwh: number;
  motorWattage: number;
  weightKg: number;
  payloadKg: number;
  wheelSize: string;
  brakes: string;
  suspension: string;
  certification: string;
  warranty: string;
};

export type ScooterColor = {
  name: string;
  hex: string;
  gallery: string[];
};

export type Scooter = {
  brand: BrandSlug;
  variantSlug: string;
  name: string;
  tagline: string;
  priceOnRoad: number;
  priceOriginal?: number;
  emiFrom: number;
  specs: ScooterSpecs;
  colors: ScooterColor[];
  heroGallery: string[];
  featureBullets: string[];
  useCases: UseCase[];
  licenseRequired: false;
  faqIds: string[];
  testimonialIds: string[];
  availabilityCities: string[];
  seo: { title: string; description: string };
};

export type Charger = {
  slug: string;
  brand: "oakter" | "riod" | "teltonika";
  name: string;
  image: string;
  gallery: string[];
  powerKw: number;
  currentType: "AC" | "DC";
  connectorType: string;
  ocppCompatible: boolean;
  smart: boolean;
  recommendedForBrands: BrandSlug[];
  priceInr?: number;
  requestQuoteOnly?: boolean;
  installationIncluded: boolean;
  specs: Record<string, string | number>;
  faqIds: string[];
  seo: { title: string; description: string };
};

export type StoreHours = {
  open: string;
  close: string;
};

export type DayOfWeek = "mon" | "tue" | "wed" | "thu" | "fri" | "sat" | "sun";

export type Store = {
  slug: string;
  name: string;
  cityId: string;
  state: string;
  address: string;
  pincode: string;
  lat: number;
  lng: number;
  phone: string;
  whatsapp: string;
  email?: string;
  hours: Record<DayOfWeek, StoreHours | "closed">;
  services: ("sales" | "service" | "testRides" | "charging")[];
  brandsAvailable: BrandSlug[];
  photos: string[];
  managerName?: string;
  storeCode: string;
  isComingSoon?: boolean;
};

export type City = {
  slug: string;
  name: string;
  state: string;
  lat: number;
  lng: number;
  servedStoreSlugs: string[];
  bestsellerScooterVariantSlugs: string[];
  localFuelPricePerLitre: number;
  localElectricityRatePerKwh: number;
  nearbyCitySlugs: string[];
  localFaqIds: string[];
  testimonialIds: string[];
  introCopy: string;
  customerCount: string;
  scootersSoldCount: string;
};

export type Testimonial = {
  id: string;
  customerName: string;
  cityId: string;
  scooterVariantSlug: string;
  brand: BrandSlug;
  rating: number;
  quote: string;
  fullStory?: string;
  photo: string;
  videoUrl?: string;
  date: string;
  verified: boolean;
  fearAddressed: FearTag;
  source: "interview" | "app-review" | "google-review" | "whatsapp";
};

export type FaqCategory =
  | "buying"
  | "financing"
  | "service"
  | "battery"
  | "charging"
  | "legal"
  | "app"
  | "store";

export type Faq = {
  id: string;
  question: string;
  answerMdx: string;
  category: FaqCategory;
  scope: "global" | "brand" | "scooter" | "city" | "page";
  scopeId?: string;
  order: number;
};

export type FinancePartner = {
  id: string;
  name: string;
  logo: string;
  type: "bank" | "nbfc";
  usp: string;
  minInterestAnnualPct: number;
  maxTenureMonths: number;
  eligibility: string[];
  docs: string[];
  availableInCityIds: string[];
  applyUrl?: string;
};

export type BlogPostMeta = {
  slug: string;
  title: string;
  dek: string;
  coverImage: string;
  author: {
    name: string;
    avatar: string;
    role: string;
    linkedin?: string;
  };
  categories: string[];
  tags: string[];
  publishedAt: string;
  updatedAt?: string;
  readMinutes: number;
};

export type JobPosting = {
  slug: string;
  title: string;
  department: "retail" | "service" | "tech" | "marketing" | "operations" | "hr";
  city: string;
  type: "FT" | "PT" | "Intern" | "Contract";
  descriptionMdx: string;
  responsibilities: string[];
  requirements: string[];
  niceToHave?: string[];
  publishedAt: string;
  closingAt?: string;
};

export type PressItem = {
  id: string;
  outlet: string;
  logo: string;
  headline: string;
  url: string;
  publishedAt: string;
  type: "coverage" | "release";
  summary?: string;
};

export type ChargingNetwork = {
  id: string;
  name: string;
  logo: string;
};

export type GlobalStats = {
  appDownloads: string;
  rating: string;
  communityMembers: string;
  vehiclesSold: string;
  happyOwners: string;
  storesOpen: string;
  stationsCount: string;
  networksCount: string;
  citiesServed: string;
};

export type AnnouncementBar = {
  enabled: boolean;
  text: string;
  ctaText?: string;
  ctaHref?: string;
  dismissKey: string;
};

export type GlobalSettings = {
  stats: GlobalStats;
  slaThisMonthPct: number;
  announcementBar: AnnouncementBar;
  whatsappNumber: string;
  supportPhone: string;
  supportEmail: string;
  social: {
    instagram: string;
    youtube: string;
    facebook: string;
    linkedin: string;
    twitter: string;
  };
  hqAddress: string;
  legalEntity: {
    name: string;
    cin: string;
    gstin: string;
  };
  appLinks: {
    playStore: string;
    appStore: string;
  };
};
