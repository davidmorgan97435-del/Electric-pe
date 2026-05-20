import type { JobPosting } from "../types";

export const jobPostings: JobPosting[] = [
  {
    slug: "store-executive-bengaluru",
    title: "Store Executive, Bengaluru",
    department: "retail",
    city: "Bengaluru",
    type: "FT",
    descriptionMdx:
      "You'll be the face of ElectricPe at one of our Mobility Centers in Bengaluru. You'll guide customers through test rides, handle EMI applications, and build long-term relationships with owners.",
    responsibilities: [
      "Conduct test rides and walk-ins for new customers",
      "Own the end-to-end purchase journey: paperwork, EMI, delivery",
      "Maintain store floor presentation and inventory accuracy",
      "Build relationships with repeat customers for service and referrals",
      "Escalate technical issues to the in-house service technician",
    ],
    requirements: [
      "1+ year in automotive retail, banking, or high-touch customer roles",
      "Fluent in Kannada and English (Hindi a plus)",
      "Comfortable with basic digital tools (CRM, WhatsApp Business)",
      "Willingness to work Saturdays, our busiest day",
    ],
    niceToHave: ["Prior EV experience", "Two-wheeler licence"],
    publishedAt: "2026-03-01",
  },
  {
    slug: "senior-technician-mysuru",
    title: "Senior Technician, Mysuru",
    department: "service",
    city: "Mysuru",
    type: "FT",
    descriptionMdx:
      "You'll run the service bay at our K G Koppal Mobility Center. You'll own the 24-hour service SLA for every scooter that comes in, from diagnostics to parts to handover.",
    responsibilities: [
      "Diagnose and resolve mechanical + electrical issues on the full ElectricPe lineup",
      "Maintain service records and SLA metrics daily",
      "Train junior technicians (2-3 per store)",
      "Manage parts inventory for the store",
      "Escalate warranty issues to HQ with proper documentation",
    ],
    requirements: [
      "5+ years in two-wheeler service (EV or petrol)",
      "ITI or Diploma in Automobile/Electrical/Mechanical",
      "Fluent in Kannada and English",
      "Hands-on experience with CAN bus diagnostics a strong plus",
    ],
    publishedAt: "2026-03-08",
  },
  {
    slug: "growth-marketing-manager",
    title: "Growth Marketing Manager",
    department: "marketing",
    city: "Bengaluru",
    type: "FT",
    descriptionMdx:
      "You'll own our performance marketing funnel: from paid acquisition through test-ride booking and conversion to purchase. Expect to work closely with retail ops and the Flutter app team.",
    responsibilities: [
      "Plan and execute Google/Meta/YouTube campaigns across 15+ cities",
      "Own the full funnel from ad impression → test ride → purchase",
      "Collaborate with the content team on high-intent SEO blog posts",
      "Report weekly CAC/LTV by city and channel to the leadership team",
      "A/B test landing pages and the book-test-ride funnel",
    ],
    requirements: [
      "4+ years in B2C performance marketing",
      "Deep Google Ads + Meta Ads Manager expertise",
      "SQL comfort for analytics (or strong partnership with data)",
      "Portfolio of campaigns in India, ideally for high-ticket B2C",
    ],
    publishedAt: "2026-02-20",
  },
  {
    slug: "fullstack-engineer-platform",
    title: "Full-Stack Engineer, Platform",
    department: "tech",
    city: "Remote (India)",
    type: "FT",
    descriptionMdx:
      "You'll help build the software backbone that powers our retail ops, charging-station aggregator, and B2B CMS. Next.js + TypeScript on the front-end, Node + Postgres on the back.",
    responsibilities: [
      "Ship features across our retail POS, charging app, and CMS",
      "Own performance + observability (Sentry, custom dashboards)",
      "Collaborate with our Flutter app team on shared APIs",
      "Mentor junior engineers and set coding standards",
    ],
    requirements: [
      "3+ years with Next.js / React in production",
      "Strong TypeScript, Node, Postgres/SQL",
      "Comfort reading + debugging Flutter code (you won't ship it)",
      "India-based, comfortable with async remote work",
    ],
    niceToHave: ["OCPP / EV charging protocol knowledge", "Sanity/Payload CMS experience"],
    publishedAt: "2026-02-10",
  },
  {
    slug: "operations-coordinator-north",
    title: "Operations Coordinator, North India",
    department: "operations",
    city: "Delhi",
    type: "FT",
    descriptionMdx:
      "You'll keep the retail network humming across Delhi, Gurugram, Ghaziabad, Meerut, Jaipur, Rohtak and Sonipat. Inventory, delivery logistics, store launches: you'll own the coordination.",
    responsibilities: [
      "Coordinate vehicle + parts supply to North India stores",
      "Own store-level KPIs (footfall, conversion, SLA)",
      "Support new store launches in the region (planning, hiring, opening)",
      "Be the operations PoC for store managers",
    ],
    requirements: [
      "3+ years in retail ops, supply chain, or last-mile operations",
      "Fluent in Hindi and English",
      "Willing to travel 30–40% across the North India region",
    ],
    publishedAt: "2026-01-28",
  },
  {
    slug: "hr-business-partner",
    title: "HR Business Partner",
    department: "hr",
    city: "Bengaluru",
    type: "FT",
    descriptionMdx:
      "You'll own hiring, onboarding, and employee experience for a fast-growing retail + engineering team. Expect to recruit 20-30 people this year across retail floors and HQ.",
    responsibilities: [
      "Own end-to-end recruiting for retail + service roles",
      "Run monthly manager training on feedback, performance, and coaching",
      "Partner with leadership on compensation, leveling, and headcount planning",
      "Build our employer brand on LinkedIn, glassdoor, and careers page",
    ],
    requirements: [
      "4+ years in HR, ideally at a high-growth B2C or retail company",
      "Comfort recruiting blue + grey-collar roles as well as tech",
      "Data-literate: you own offer-acceptance rates and attrition metrics",
    ],
    publishedAt: "2026-01-14",
  },
];

export const getJobPosting = (slug: string): JobPosting | undefined =>
  jobPostings.find((j) => j.slug === slug);
