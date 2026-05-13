import type { Faq } from "../types";

export const faqs: Faq[] = [
  {
    id: "buying-licence",
    question: "Do I need a driving licence to ride an ElectricPe scooter?",
    answerMdx:
      "No. Every scooter in the ElectricPe lineup is a low-speed EV, capped at 25 km/h. Under Indian law, vehicles with a top speed of 25 km/h or less do not require a driving licence or vehicle registration. You can ride it home the day you buy it.",
    category: "legal",
    scope: "global",
    order: 1,
  },
  {
    id: "buying-test-ride",
    question: "How does the free test ride work?",
    answerMdx:
      "You pick a city, a model, and a time slot on our booking page. We confirm via WhatsApp within the hour. You can ride at our store, or we can bring the scooter to your home for ₹299 (refunded when you test). The ride is always free; the ₹299 is just a commitment deposit for doorstep delivery.",
    category: "buying",
    scope: "global",
    order: 2,
  },
  {
    id: "financing-emi-docs",
    question: "What documents do I need for EMI?",
    answerMdx:
      "For salaried customers: Aadhaar, PAN, and the last 3 months of bank statements or salary slips. For self-employed: Aadhaar, PAN, and the last 1 year of income proof. Students can apply with a guardian as co-applicant. Approvals typically complete within 15 minutes at our Mobility Centers.",
    category: "financing",
    scope: "global",
    order: 3,
  },
  {
    id: "financing-zero-down",
    question: "Is zero down payment available?",
    answerMdx:
      "Yes, at select stores and for select models. Our partner banks and NBFCs offer schemes from zero down payment up to 100% financing. Exact eligibility depends on your income profile and the model chosen. Your local Mobility Center will walk you through the options.",
    category: "financing",
    scope: "global",
    order: 4,
  },
  {
    id: "service-sla",
    question: "What does the 24-hour service promise actually mean?",
    answerMdx:
      "When you bring your scooter to any ElectricPe Mobility Center, we commit to completing the service and returning the vehicle to you within 24 hours. If the issue requires a part that isn't on the shelf, we'll update you immediately and keep you informed until completion. We publish our actual SLA performance on the service page every month.",
    category: "service",
    scope: "global",
    order: 5,
  },
  {
    id: "service-warranty",
    question: "What does the warranty cover?",
    answerMdx:
      "Warranty coverage varies by component. The motor and controller are covered for 1 year, the charger for 1 year, and the lithium-ion battery for 3 years or 10,000 km (whichever is earlier). Wear-and-tear items (tyres, brake pads), accidental damage and unauthorised modifications are not covered. Exact terms are shared at handover or on inquiry at any Mobility Center.",
    category: "service",
    scope: "global",
    order: 6,
  },
  {
    id: "battery-lifespan",
    question: "How long does the battery last?",
    answerMdx:
      "A lithium-ion battery typically lasts 4–5 years or 1,200+ charge cycles before meaningful capacity loss. A lead-acid battery lasts 1.5–2 years. Genuine replacement batteries are stocked at every ElectricPe Mobility Center; prices are published transparently.",
    category: "battery",
    scope: "global",
    order: 7,
  },
  {
    id: "charging-home",
    question: "Can I charge at home?",
    answerMdx:
      "Yes. All ElectricPe scooters charge from any regular 5A domestic socket. No special wiring required. We also sell home chargers (Oakter, RIOD, Teltonika) for faster charging, and can arrange certified installation across 30+ cities.",
    category: "charging",
    scope: "global",
    order: 8,
  },
  {
    id: "app-overview",
    question: "What is the ElectricPe app for?",
    answerMdx:
      "The ElectricPe app is an aggregator of 25,000+ EV charging stations across India from 60+ partner networks. Even if you don't own an ElectricPe scooter, the app is free to use for finding, navigating to, and paying at charging stations. Owners also get community groups, service-request tracking, and warranty info inside the app.",
    category: "app",
    scope: "global",
    order: 9,
  },
  {
    id: "store-visit",
    question: "What should I bring to my store visit?",
    answerMdx:
      "For a test ride: a valid ID proof (Aadhaar, licence, PAN, or voter card). To buy: Aadhaar and PAN for EMI, or any one ID for full payment. We'll take care of the rest, from paperwork to roadside registration (if applicable for higher-speed variants).",
    category: "store",
    scope: "global",
    order: 10,
  },
  {
    id: "xypro-range",
    question: "What's the real-world range of the Xypro?",
    answerMdx:
      "The Xypro Lithium Ion delivers 90–100 km in real-world conditions: slightly better on flat roads, slightly less if you're carrying a pillion or climbing elevations. The Xypro Lead Acid delivers 55–60 km. These are rider-tested numbers, not lab figures.",
    category: "buying",
    scope: "brand",
    scopeId: "xypro",
    order: 11,
  },
  {
    id: "jett-storage",
    question: "How much can the Jett carry?",
    answerMdx:
      "The Jett has 10 kg of under-seat storage (helmet + small bag) and a rear rack rated for 15 kg. Total payload capacity is 160 kg including rider.",
    category: "buying",
    scope: "brand",
    scopeId: "jett",
    order: 12,
  },
  {
    id: "ep-delivery",
    question: "Is the EP City Plus good for delivery work?",
    answerMdx:
      "Yes. It's the most affordable in our lineup and designed for single-rider use with heavy daily mileage. Delivery partners on Swiggy, Zomato, and Zepto report average fuel savings of ₹250/day compared to petrol scooters.",
    category: "buying",
    scope: "brand",
    scopeId: "ep",
    order: 13,
  },
  {
    id: "4all-licence",
    question: "Why doesn't the 4ALL need a licence?",
    answerMdx:
      "All 4ALL variants are speed-limited to 25 km/h, which qualifies them as low-speed EVs under Indian motor-vehicle law. No driving licence, no RTO registration, no road tax.",
    category: "legal",
    scope: "brand",
    scopeId: "4all",
    order: 14,
  },
  {
    id: "xypro-swap-subscription",
    question: "How does the battery swap subscription work?",
    answerMdx:
      "With the Xypro Swap, you own the vehicle but subscribe to the battery. Starting at ₹8/day, you can swap depleted batteries for fully charged ones at any partner swap station, typically in under 60 seconds. Perfect if you can't charge at home or run multiple shifts.",
    category: "charging",
    scope: "scooter",
    scopeId: "xypro-swap",
    order: 15,
  },
];

export const getFaqsByCategory = (category: string): Faq[] =>
  faqs.filter((f) => f.category === category).sort((a, b) => a.order - b.order);

export const getFaqsByBrand = (brand: string): Faq[] =>
  faqs.filter((f) => f.scope === "brand" && f.scopeId === brand);

export const getFaqById = (id: string): Faq | undefined =>
  faqs.find((f) => f.id === id);
