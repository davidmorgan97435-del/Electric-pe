import type { BlogPostMeta } from "../types";

const COVER = "/img/home_hero_section_2.webp";

const authors = {
  raghav: {
    name: "Raghav Rohila",
    avatar: COVER,
    role: "Founder & CEO",
    linkedin: "https://www.linkedin.com/in/raghavrohila",
  },
  priyanka: {
    name: "Priyanka Dhingra",
    avatar: COVER,
    role: "Head of Customer Experience",
  },
  avinash: {
    name: "Avinash Sharma",
    avatar: COVER,
    role: "Co-founder & COO",
  },
} as const;

export const blogPosts: BlogPostMeta[] = [
  {
    slug: "maximise-electric-scooter-range-indian-summer",
    title: "How to maximise your electric scooter range in an Indian summer",
    dek: "Tyre pressure, charging cycles, and a surprising tip about your morning commute.",
    coverImage: COVER,
    author: authors.avinash,
    categories: ["Ownership Tips"],
    tags: ["range", "summer", "battery"],
    publishedAt: "2026-04-05",
    readMinutes: 6,
  },
  {
    slug: "why-low-speed-evs-dont-need-licence",
    title: "Why low-speed EVs don't need a licence — full legal breakdown",
    dek: "A plain-English walkthrough of the Motor Vehicles Act exemption that makes all ElectricPe scooters licence-free.",
    coverImage: COVER,
    author: authors.raghav,
    categories: ["Legal"],
    tags: ["licence", "legal", "low-speed"],
    publishedAt: "2026-03-22",
    readMinutes: 4,
  },
  {
    slug: "ep-city-plus-swiggy-delivery-90-day-audit",
    title: "EP City Plus for Swiggy delivery: a 90-day cost audit",
    dek: "We followed three delivery partners in Chennai. Here's the rupee-by-rupee math.",
    coverImage: COVER,
    author: authors.priyanka,
    categories: ["Ownership Tips", "Finance"],
    tags: ["delivery", "cost", "tco"],
    publishedAt: "2026-03-14",
    readMinutes: 8,
  },
  {
    slug: "xypro-vs-jett-which-fits-your-commute",
    title: "Xypro vs Jett: which ElectricPe fits your commute?",
    dek: "Range, comfort, cargo capacity — and the single question that usually decides it.",
    coverImage: COVER,
    author: authors.raghav,
    categories: ["Buying Guides"],
    tags: ["xypro", "jett", "comparison"],
    publishedAt: "2026-03-01",
    readMinutes: 5,
  },
  {
    slug: "home-vs-commercial-charging-wiring-cost-safety",
    title: "Home vs commercial charging: wiring, cost, and safety",
    dek: "A practical guide for housing-society managers and small-business owners.",
    coverImage: COVER,
    author: authors.avinash,
    categories: ["Charging"],
    tags: ["charging", "infrastructure"],
    publishedAt: "2026-02-18",
    readMinutes: 7,
  },
  {
    slug: "our-24-hour-service-promise-explained",
    title: "Our 24-hour service promise, explained",
    dek: "What the SLA covers, what it doesn't, and why we publish our hit-rate every month.",
    coverImage: COVER,
    author: authors.priyanka,
    categories: ["Ownership Tips"],
    tags: ["service", "warranty"],
    publishedAt: "2026-02-04",
    readMinutes: 3,
  },
  {
    slug: "bengaluru-rider-stories-week-with-xypro",
    title: "Bengaluru rider stories: a week with the Xypro",
    dek: "Four riders, four routes, one scooter. Five-day field diary.",
    coverImage: COVER,
    author: authors.priyanka,
    categories: ["City Guides"],
    tags: ["bengaluru", "xypro"],
    publishedAt: "2026-01-27",
    readMinutes: 6,
  },
  {
    slug: "lithium-vs-lead-acid-which-battery",
    title: "Lithium vs lead-acid: which battery is right for you?",
    dek: "Upfront cost, lifespan, replacement economics — decoded without the jargon.",
    coverImage: COVER,
    author: authors.avinash,
    categories: ["Buying Guides"],
    tags: ["battery", "lithium-ion", "lead-acid"],
    publishedAt: "2026-01-16",
    readMinutes: 5,
  },
  {
    slug: "real-5-year-cost-petrol-vs-electricpe",
    title: "The real 5-year cost of a petrol scooter vs ElectricPe",
    dek: "Including fuel, service, insurance, tyres, and resale. Spreadsheet included.",
    coverImage: COVER,
    author: authors.raghav,
    categories: ["Finance"],
    tags: ["tco", "savings"],
    publishedAt: "2026-01-04",
    readMinutes: 9,
  },
  {
    slug: "charging-etiquette-public-stations",
    title: "Charging etiquette at public stations",
    dek: "Five habits that make shared charging work for everyone.",
    coverImage: COVER,
    author: authors.avinash,
    categories: ["Charging"],
    tags: ["etiquette", "community"],
    publishedAt: "2025-12-20",
    readMinutes: 4,
  },
  {
    slug: "register-electricpe-jaipur",
    title: "How to register an ElectricPe scooter in Jaipur",
    dek: "Good news: for our full lineup, you don't. Here's why, with the paperwork to prove it.",
    coverImage: COVER,
    author: authors.priyanka,
    categories: ["City Guides", "Legal"],
    tags: ["jaipur", "rto", "registration"],
    publishedAt: "2025-12-11",
    readMinutes: 4,
  },
  {
    slug: "what-emi-partners-look-for",
    title: "What our EMI partners look for in an applicant",
    dek: "Credit scores are only part of the story. Here's the full picture.",
    coverImage: COVER,
    author: authors.raghav,
    categories: ["Finance"],
    tags: ["emi", "credit"],
    publishedAt: "2025-12-02",
    readMinutes: 5,
  },
];

export const getBlogPost = (slug: string): BlogPostMeta | undefined =>
  blogPosts.find((p) => p.slug === slug);

export const getRelatedPosts = (
  slug: string,
  limit = 3,
): BlogPostMeta[] => {
  const current = getBlogPost(slug);
  if (!current) return blogPosts.slice(0, limit);
  const scored = blogPosts
    .filter((p) => p.slug !== slug)
    .map((p) => ({
      post: p,
      score: p.categories.filter((c) => current.categories.includes(c)).length,
    }))
    .sort((a, b) => b.score - a.score);
  return scored.slice(0, limit).map((s) => s.post);
};
