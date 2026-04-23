import type { Testimonial } from "../types";

export const testimonials: Testimonial[] = [
  {
    id: "t-priya-chennai",
    customerName: "Priya S.",
    cityId: "chennai",
    scooterVariantSlug: "xypro-lithium-ion",
    brand: "xypro",
    rating: 5,
    quote:
      "I was worried about service. Three months in, I had a minor issue. The Anna Nagar store resolved it the same day. I didn't even need to leave my vehicle overnight.",
    photo: "/img/home_hero_section_2.webp",
    date: "2026-02-14",
    verified: true,
    fearAddressed: "service",
    source: "interview",
  },
  {
    id: "t-arvind-bengaluru",
    customerName: "Arvind M.",
    cityId: "bengaluru",
    scooterVariantSlug: "xypro-lithium-ion",
    brand: "xypro",
    rating: 5,
    quote:
      "I commute 22 km a day from Yelahanka. The Xypro Lithium does it comfortably with 30% charge to spare. ElectricPe set up a home charging socket for me — zero hassle.",
    photo: "/img/home_hero_section_2.webp",
    date: "2026-01-20",
    verified: true,
    fearAddressed: "battery",
    source: "whatsapp",
  },
  {
    id: "t-shalini-coimbatore",
    customerName: "Shalini R.",
    cityId: "chennai",
    scooterVariantSlug: "jett-lithium-ion",
    brand: "jett",
    rating: 5,
    quote:
      "My husband works nights — the Jett is my independence. School run, groceries, pharmacy. No queue at the petrol pump. No licence needed. The team at ElectricPe explained everything twice, patiently.",
    photo: "/img/home_hero_section_2.webp",
    date: "2026-01-08",
    verified: true,
    fearAddressed: "brand-credibility",
    source: "interview",
  },
  {
    id: "t-kiran-chennai",
    customerName: "Kiran P.",
    cityId: "chennai",
    scooterVariantSlug: "ep-city-plus",
    brand: "ep",
    rating: 5,
    quote:
      "I do 50+ deliveries a day on Swiggy. The EP City Plus cut my fuel cost from ₹300/day to ₹35. Paid back the upgrade in 4 months. Service centre is always open when I need parts.",
    photo: "/img/home_hero_section_2.webp",
    date: "2025-12-11",
    verified: true,
    fearAddressed: "emi",
    source: "google-review",
  },
  {
    id: "t-rajesh-bengaluru",
    customerName: "Rajesh K.",
    cityId: "bengaluru",
    scooterVariantSlug: "xypro-lead-acid",
    brand: "xypro",
    rating: 4.5,
    quote:
      "I was skeptical — all these new EV brands come and go. ElectricPe had a real store, real people, real signboard. That's what convinced me. Six months later, zero problems.",
    photo: "/img/home_hero_section_2.webp",
    date: "2025-10-29",
    verified: true,
    fearAddressed: "brand-credibility",
    source: "interview",
  },
  {
    id: "t-meera-gurugram",
    customerName: "Meera T.",
    cityId: "gurugram",
    scooterVariantSlug: "jett-lithium-ion",
    brand: "jett",
    rating: 5,
    quote:
      "The top speed is 25 km/h. I was nervous about that at first — but honestly, in Gurugram traffic, I've never once wished it was faster. Safer and calmer than my old petrol scooter.",
    photo: "/img/home_hero_section_2.webp",
    date: "2026-03-02",
    verified: true,
    fearAddressed: "speed",
    source: "google-review",
  },
  {
    id: "t-vikram-delhi",
    customerName: "Vikram S.",
    cityId: "delhi",
    scooterVariantSlug: "4all-lithium-ion",
    brand: "4all",
    rating: 5,
    quote:
      "My wife damaged the front fairing in a parking incident. ElectricPe had the part in stock at the Nehru Place store and fixed it in 40 minutes. That's the reason I'll stay.",
    photo: "/img/home_hero_section_2.webp",
    date: "2026-02-26",
    verified: true,
    fearAddressed: "repair",
    source: "interview",
  },
  {
    id: "t-nikhil-pune",
    customerName: "Nikhil D.",
    cityId: "pune",
    scooterVariantSlug: "xypro-lithium-ion",
    brand: "xypro",
    rating: 4.5,
    quote:
      "Took the ₹299 test ride option. Rode it for an hour. Bought it the same evening. The EMI was approved in 15 minutes with only Aadhaar and PAN.",
    photo: "/img/home_hero_section_2.webp",
    date: "2026-03-18",
    verified: true,
    fearAddressed: "emi",
    source: "whatsapp",
  },
];

export const getTestimonialById = (id: string): Testimonial | undefined =>
  testimonials.find((t) => t.id === id);

export const getTestimonialsByBrand = (brand: string): Testimonial[] =>
  testimonials.filter((t) => t.brand === brand);

export const getTestimonialsByCity = (citySlug: string): Testimonial[] =>
  testimonials.filter((t) => t.cityId === citySlug);
