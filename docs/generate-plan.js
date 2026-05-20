/* eslint-disable */
// One-shot generator for the ElectricPe 90-day execution plan.
// Run with: node _plan-generator.js  (outputs Electricpe-90-Day-Execution-Plan.docx)

const fs = require("fs");
const {
  Document, Packer, Paragraph, TextRun,
  Table, TableRow, TableCell,
  Header, Footer, AlignmentType, LevelFormat,
  HeadingLevel, BorderStyle, WidthType, ShadingType, VerticalAlign,
  PageNumber, PageBreak,
} = require("docx");

// ─── Tokens ──────────────────────────────────────────────────
const C = {
  ink: "0F172A",         // primary text
  muted: "475569",       // secondary text
  subtle: "64748B",      // captions
  brand: "15803D",       // brand green (deeper for print)
  brandSoft: "DCFCE7",   // brand tint for table headers
  rule: "E2E8F0",        // border
  surface: "F8FAFC",     // zebra-row fill
};

const border = { style: BorderStyle.SINGLE, size: 6, color: C.rule };
const cellBorders = { top: border, bottom: border, left: border, right: border };

// ─── Helpers ─────────────────────────────────────────────────
const P = (text, opts = {}) =>
  new Paragraph({
    spacing: { after: 120, ...(opts.spacing || {}) },
    alignment: opts.alignment,
    children: [new TextRun({ text, size: opts.size || 22, color: opts.color || C.ink, bold: opts.bold, italics: opts.italics, font: "Arial" })],
  });

const H1 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_1,
    pageBreakBefore: true,
    spacing: { before: 240, after: 180 },
    children: [new TextRun({ text, size: 36, bold: true, color: C.brand, font: "Arial" })],
  });

const H2 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_2,
    spacing: { before: 280, after: 140 },
    children: [new TextRun({ text, size: 28, bold: true, color: C.ink, font: "Arial" })],
  });

const H3 = (text) =>
  new Paragraph({
    heading: HeadingLevel.HEADING_3,
    spacing: { before: 180, after: 100 },
    children: [new TextRun({ text, size: 24, bold: true, color: C.ink, font: "Arial" })],
  });

const Eyebrow = (text) =>
  new Paragraph({
    spacing: { before: 0, after: 60 },
    children: [new TextRun({ text: text.toUpperCase(), size: 18, bold: true, color: C.brand, font: "Arial", characterSpacing: 50 })],
  });

const Bullet = (text, level = 0, ref = "default-bullets") =>
  new Paragraph({
    numbering: { reference: ref, level },
    spacing: { after: 80 },
    children: [new TextRun({ text, size: 22, color: C.ink, font: "Arial" })],
  });

const Cell = (text, opts = {}) =>
  new TableCell({
    borders: cellBorders,
    width: { size: opts.width || 2340, type: WidthType.DXA },
    shading: opts.fill ? { fill: opts.fill, type: ShadingType.CLEAR } : undefined,
    verticalAlign: VerticalAlign.TOP,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: Array.isArray(text)
      ? text.map((t) => new Paragraph({ children: [new TextRun({ text: t, size: opts.size || 20, color: opts.color || C.ink, bold: opts.bold, font: "Arial" })], spacing: { after: 40 } }))
      : [new Paragraph({ children: [new TextRun({ text, size: opts.size || 20, color: opts.color || C.ink, bold: opts.bold, font: "Arial" })] })],
  });

const HeaderCell = (text, width) =>
  Cell(text, { width, fill: C.brandSoft, bold: true, color: C.ink });

const HRule = () =>
  new Paragraph({
    spacing: { before: 80, after: 80 },
    border: { bottom: { color: C.rule, space: 1, style: BorderStyle.SINGLE, size: 6 } },
    children: [new TextRun({ text: "" })],
  });

// ─── Data ────────────────────────────────────────────────────

const TARGETS = [
  ["Organic Sessions", "+40–70%", "vs Week-1 GA4 baseline"],
  ["Indexed Long-tail Pages", "60–80", "new programmatic URLs in GSC"],
  ["AIO Citations", "15+ per month", "Google AIO + Perplexity + ChatGPT + Gemini"],
  ["Conversion Rate Lift", "+10–20%", "test-ride booking + WhatsApp leads"],
  ["Founder Engagement", "2× lift", "avg reach + reactions per LinkedIn post"],
  ["Content Velocity", "100% on-time", "weekly delivery vs plan"],
];

const PILLARS = [
  ["01", "SEO + GEO content for AIOs", "Answer-first, citable, schema-rich. Engineered to be quoted by Google AIO, Perplexity, ChatGPT and Gemini."],
  ["02", "Content-based SEO depth", "Entity coverage, topic clusters, hub-and-spoke linking. Every page earns its rank."],
  ["03", "Conversational tone for NLP", "Natural-language, Q&A scaffolding. Reads like a human, parses like a machine."],
  ["04", "AEO trust signals", "Real bylines, original photography, first-party data, expert quotes. Defeats AI-spam classifiers."],
];

const WORKSTREAMS = [
  ["WS-1", "SEO Tech & Audit", "Tech audit, schema, internal-links, Core Web Vitals, llms.txt, indexation.", "Dev / SEO Lead"],
  ["WS-2", "Programmatic Content", "City × Charger × Use-case page factory. Wave 1 (20–30) → Wave 2 (to 60–80).", "Dev + Content"],
  ["WS-3", "Pillar & GEO Content", "4–6 AEO pillar articles + 2–3 GEO city hubs. Original photography + first-party data.", "Content + Designer"],
  ["WS-4", "CRO & Conversion", "Funnel audit, heatmaps, three documented A/B experiments.", "Dev + Analytics"],
  ["WS-5", "Founder & Brand Social", "Founder LinkedIn relaunch (2/wk). Brand social across IG, X, YT Shorts, LinkedIn (2/wk per channel).", "Founder + Content"],
  ["WS-6", "Analytics, Reporting & Ops", "Tracking dashboard, fortnightly reports, end-of-quarter review.", "Analytics / PM"],
];

// 12-week calendar starting Mon May 18, 2026
const WEEK_DATES = [
  ["May 18", "May 19", "May 20", "May 21", "May 22"],     // W1
  ["May 25", "May 26", "May 27", "May 28", "May 29"],     // W2
  ["Jun 01", "Jun 02", "Jun 03", "Jun 04", "Jun 05"],     // W3
  ["Jun 08", "Jun 09", "Jun 10", "Jun 11", "Jun 12"],     // W4 (end M1)
  ["Jun 15", "Jun 16", "Jun 17", "Jun 18", "Jun 19"],     // W5
  ["Jun 22", "Jun 23", "Jun 24", "Jun 25", "Jun 26"],     // W6
  ["Jun 29", "Jun 30", "Jul 01", "Jul 02", "Jul 03"],     // W7
  ["Jul 06", "Jul 07", "Jul 08", "Jul 09", "Jul 10"],     // W8 (end M2)
  ["Jul 13", "Jul 14", "Jul 15", "Jul 16", "Jul 17"],     // W9
  ["Jul 20", "Jul 21", "Jul 22", "Jul 23", "Jul 24"],     // W10
  ["Jul 27", "Jul 28", "Jul 29", "Jul 30", "Jul 31"],     // W11
  ["Aug 03", "Aug 04", "Aug 05", "Aug 06", "Aug 07"],     // W12 (end Q)
];

// Weekly themes, daily tasks, deliverables. Each week:
//   theme, focus, days[5]: { owner, task, deliverable }, deliverables[], inputs[]
const WEEKS = [
  {
    n: 1,
    month: 1,
    theme: "Kickoff + Technical SEO Audit",
    focus: "Establish baseline, lock tooling, get a forensic read of the current site so every later decision is data-anchored.",
    days: [
      { owner: "Lead / PM", task: "Project kickoff (60 min). Confirm scope, roles, RACI, weekly cadence. Lock access to Semrush, GSC, GA4, Microsoft Clarity, Looker Studio. Stand up shared drive + Slack channel.", deliverable: "Kickoff notes, access matrix" },
      { owner: "Dev / SEO", task: "Technical SEO crawl with Screaming Frog. Capture status codes, redirect chains, canonicals, hreflang, sitemap coverage, robots directives. Export to Excel.", deliverable: "Crawl export (XLSX)" },
      { owner: "Dev", task: "Core Web Vitals run on top 20 organic-landing pages (PageSpeed Insights, mobile + desktop). Capture LCP, CLS, INP. Flag any failing pages.", deliverable: "CWV report" },
      { owner: "SEO", task: "Schema audit: enumerate every page-template and the JSON-LD types it emits. Cross-reference against Google's eligible rich-result list. Flag gaps (FAQ, Product, AutoDealer, Article, Breadcrumb).", deliverable: "Schema gap list" },
      { owner: "Analytics", task: "Pull Semrush Domain Overview (current organic traffic, top 100 keywords, top 50 pages by traffic, backlinks). GSC export: 90-day Performance + Coverage. GA4: 90-day Acquisition + Conversion. Lock as baseline.xlsx.", deliverable: "Baseline.xlsx + Friday review" },
    ],
    deliverables: ["Technical SEO Audit (v1 draft)", "Site crawl + CWV exports", "Schema gap inventory", "Baseline.xlsx (Semrush + GSC + GA4)"],
    inputs: ["Semrush login + Domain Overview report", "Google Search Console verified access", "GA4 property + reader access", "Microsoft Clarity workspace (or budget approval to install)"],
  },
  {
    n: 2,
    month: 1,
    theme: "City × Charger × Use-case Grid + Keyword Research",
    focus: "Build the programmatic-page address space and the keyword cluster master that will power Months 2–3.",
    days: [
      { owner: "SEO", task: "Content inventory: list every existing URL on electricpe.com. Tag each by intent (informational, navigational, transactional) and content-type (programmatic, blog, landing, product).", deliverable: "Content inventory sheet" },
      { owner: "SEO / PM", task: "Build the grid: 30 priority Indian cities × 6 charger types (AC slow, AC fast, DC fast, swap, home, public) × 4 use-cases (commute, delivery, family, student). Filter to ~150–200 viable long-tail cells.", deliverable: "Grid v1 (sheet)" },
      { owner: "SEO", task: "Keyword research via Semrush Keyword Magic for each grid cell + seed clusters: 'electric scooter India', 'electric scooter no licence', 'ev charging station [city]', 'electric scooter price'. Capture volume + difficulty + intent.", deliverable: "Keyword cluster master" },
      { owner: "SEO", task: "Competitor gap analysis: Semrush Domain vs Domain electricpe.com vs olaelectric.com vs atherenergy.com. Pull keywords competitors rank top-20 that we don't. Tag must-win KWs.", deliverable: "Competitor gap report" },
      { owner: "PM / Lead", task: "Friday review: ratify the grid, prioritise the first 20 cells for Wave 1, sign off keyword cluster master. Open programmatic page brief template draft.", deliverable: "Grid v2 final + Wave 1 priority list" },
    ],
    deliverables: ["City × Charger × Use-case grid (final)", "Keyword cluster master sheet", "Competitor gap report", "Programmatic brief template (draft)"],
    inputs: ["Semrush Keyword Magic + Domain vs Domain access", "Confirmed list of priority cities (PM + Founder)", "Existing sitemap.xml of electricpe.com"],
  },
  {
    n: 3,
    month: 1,
    theme: "CRO Funnel Audit + AEO/GEO Visibility Baseline",
    focus: "Surface conversion friction and lock the AIO visibility benchmark we'll measure against in Week 12.",
    days: [
      { owner: "Analytics", task: "Funnel definition: codify the Home → Brand page → Variant PDP → Test-ride booking funnel in GA4 Explore. Pull last 90-day drop-off rates per step. Identify the leakiest stage.", deliverable: "Funnel report v1" },
      { owner: "Dev / Analytics", task: "Install or verify Microsoft Clarity on all marketing routes. Tag conversion events. Watch 30 representative session recordings; tag friction patterns (form fields, copy, layout, mobile bugs).", deliverable: "Clarity session-log (30 reviewed)" },
      { owner: "Designer / Analytics", task: "Heatmap audit of /, /ev, /ev/[brand], /book-test-ride. Click maps + scroll depth + rage-click hotspots. Annotate findings.", deliverable: "Heatmap audit deck" },
      { owner: "SEO", task: "AEO/GEO visibility baseline: for the top 30 target queries from the keyword master, manually query Google (does AIO appear? cited domains?), Perplexity, ChatGPT, Gemini. Log who's cited today.", deliverable: "AIO citation baseline log" },
      { owner: "PM / Lead", task: "Friday review: pick the 3 CRO experiment hypotheses for Month 2. Sign off AEO baseline. Draft CRO experiment brief template.", deliverable: "Three CRO hypotheses (ranked) + AEO baseline locked" },
    ],
    deliverables: ["CRO funnel report (v1)", "Heatmap audit deck", "AEO/GEO citation baseline log", "Three approved CRO hypotheses"],
    inputs: ["GA4 admin access (to publish funnel report)", "Microsoft Clarity install permission (1-line script)", "Manager sign-off on CRO hypotheses"],
  },
  {
    n: 4,
    month: 1,
    theme: "Founder & Social Diagnostics + Tracking Dashboard Live",
    focus: "Close out Month 1. Get the founder content engine ready and the dashboard wired so every metric updates itself.",
    days: [
      { owner: "Content / PM", task: "Founder interview (60 min). Topics they're qualified + willing to speak on. History of past content + audience. Comfort level with formats (video, written, voice notes).", deliverable: "Founder voice + topic doc" },
      { owner: "Content", task: "Founder content pillars: 5 pillars × 3 sample topic ideas each (15 LinkedIn post outlines). Map each pillar to a target search query the founder's voice can authentically own.", deliverable: "Founder content matrix" },
      { owner: "Analytics", task: "Tracking dashboard build in Looker Studio. Connect GA4, GSC, Semrush API. Page-1 (Organic overview), Page-2 (AIO citations log), Page-3 (Funnel), Page-4 (Content perf), Page-5 (Social).", deliverable: "Dashboard v1" },
      { owner: "Analytics / PM", task: "Dashboard finalisation. Share with manager + founder. 30-min walkthrough so each stakeholder knows where to look for the number they care about.", deliverable: "Dashboard live + stakeholder access" },
      { owner: "PM / Lead", task: "MONTH 1 END-OF-MONTH REVIEW. Present every Month 1 deliverable. Approve Month 2 plan + first Wave 1 page batch. Fortnightly report #1 published.", deliverable: "Month 1 review deck + Fortnightly Report #1" },
    ],
    deliverables: ["Founder voice + content matrix", "Tracking dashboard (live, shared)", "Fortnightly Report #1", "Month 1 review sign-off"],
    inputs: ["60 min founder time (Mon)", "Looker Studio workspace + Semrush API key", "Manager review slot (Fri)"],
  },
  {
    n: 5,
    month: 2,
    theme: "Programmatic Page Template + First Wave (Pages 1–5)",
    focus: "Ship the template that will mint the next 80 pages, and prove the format with the first 5 live.",
    days: [
      { owner: "SEO / Content", task: "Programmatic page template structure: H1 with primary KW, opening 'answer-first' paragraph (2 sentences), 4–6 H2 sections, FAQ block (4 Qs), schema (FAQ + LocalBusiness/Product + BreadcrumbList), original photo slot.", deliverable: "Template spec (v1)" },
      { owner: "Dev", task: "Implement the dynamic route /[city]/[charger]/[use-case] in Next.js. Wire to content data file. Emit full JSON-LD. Add to sitemap.xml + GSC URL inspection workflow.", deliverable: "Dynamic route + schema in prod (staging)" },
      { owner: "Content / SEO", task: "Write content briefs for pages 1–10 (highest-volume cells). Each brief: primary KW, semantic KWs, structure outline, must-include entities, internal links, FAQs.", deliverable: "10 content briefs" },
      { owner: "Content", task: "Writer drafts pages 1–5. Editor + SEO lead review for keyword + schema + voice consistency.", deliverable: "5 drafts in review" },
      { owner: "Dev / SEO / PM", task: "Pages 1–5 published to production. Submit to GSC URL Inspection (Request Indexing). Friday review.", deliverable: "5 programmatic pages live + indexed" },
    ],
    deliverables: ["Programmatic page template (spec + code)", "Pages 1–5 live in production", "10 content briefs locked"],
    inputs: ["Approved Wave 1 priority list (from W2)", "Content writer onboarded + briefed", "Original photography (5 hero shots, see W6/W7 risk note)"],
  },
  {
    n: 6,
    month: 2,
    theme: "Programmatic Wave 1 Push + Pillar Article #1",
    focus: "Hit the 20-page mark, ship the first pillar article, lock the photography rhythm.",
    days: [
      { owner: "Content / SEO", task: "Content briefs for pages 6–20. Writer queue staged.", deliverable: "15 content briefs" },
      { owner: "Content", task: "Writer drafts pages 6–12. Pillar Article #1 outline approved ('Best No-Licence Electric Scooters Under ₹50,000 in India 2026', comparison + buyers guide).", deliverable: "7 drafts + Pillar #1 outline" },
      { owner: "Dev / SEO", task: "Pages 6–12 published. Pillar Article #1 drafted by content; editor review begins.", deliverable: "7 pages live + Pillar #1 draft" },
      { owner: "Content / Designer", task: "Pages 13–20 drafted + published. Original photography session #1: founder + scooter, store interior, charging session, real-owner portraits.", deliverable: "8 pages live + photo set 1" },
      { owner: "PM / Lead", task: "Pillar Article #1 published with hero photo + original quotes. Pillar Article #2 outline. Friday review. Milestone: 20 programmatic pages live.", deliverable: "Pillar #1 live + Milestone hit" },
    ],
    deliverables: ["20 programmatic pages live", "Pillar Article #1 published", "Original photo set #1 (8–12 shots)"],
    inputs: ["Booked photography slot (Thursday)", "Approved Pillar #1 angle (manager sign-off)", "Founder quote for Pillar #1"],
  },
  {
    n: 7,
    month: 2,
    theme: "Pillar Articles #2–3 + GEO City Hubs + Social Relaunch",
    focus: "Light up the GEO sub-domain pattern and reboot all owned social channels.",
    days: [
      { owner: "Content", task: "Pillar Article #2 published ('How Long Does an Electric Scooter Take to Charge? Real-world tests across 4 chargers'). Pillar #3 outline.", deliverable: "Pillar #2 live + Pillar #3 outline" },
      { owner: "Dev / Content", task: "GEO City Hub #1: Bengaluru. Pillar landing page + spoke pages linking 8–12 local charger-station entries. Schema: Place + LocalBusiness.", deliverable: "Bengaluru hub live" },
      { owner: "Dev / Content / Founder", task: "GEO City Hub #2: Hyderabad (same pattern). Founder LinkedIn relaunch begins: post #1 + #2 (one industry POV + one founder-story format).", deliverable: "Hyderabad hub + 2 LinkedIn posts" },
      { owner: "Content / Designer", task: "Brand social relaunch across IG, X (Twitter), YouTube Shorts, LinkedIn company. 2 posts per channel this week (cross-posted variants from photo set #1).", deliverable: "8 brand-social posts live" },
      { owner: "PM / Lead", task: "Pillar Article #3 outline finalised. Friday review. Fortnightly Report #2.", deliverable: "Fortnightly Report #2" },
    ],
    deliverables: ["Pillar Article #2 live", "GEO City Hubs: Bengaluru + Hyderabad", "8 brand-social posts + 2 founder LinkedIn posts", "Fortnightly Report #2"],
    inputs: ["Local store data for Bengaluru + Hyderabad (addresses, hours, photos)", "Founder availability (1h drafting + recording)", "Designer turnaround for social cards"],
  },
  {
    n: 8,
    month: 2,
    theme: "Pillar #3 + #4 + GEO Hub #3 + CRO Experiment 1 Live",
    focus: "Close Month 2. First A/B test in market.",
    days: [
      { owner: "Content / Dev", task: "Pillar Article #3 published. CRO Experiment 1 hypothesis approved (top-of-funnel, likely hero CTA copy or trust-strip variant on /).", deliverable: "Pillar #3 live + Experiment 1 brief" },
      { owner: "Dev", task: "CRO Experiment 1 implementation: A/B framework (GrowthBook or Vercel Edge config). Two variants, 50/50 traffic split, primary metric = test-ride booking start.", deliverable: "Experiment 1 in staging" },
      { owner: "Content / Dev", task: "Pillar Article #4 published ('Electric Scooter Service in India: what 3-year warranties actually cover'). GEO Hub #3: Chennai live.", deliverable: "Pillar #4 + Chennai hub live" },
      { owner: "Dev / Analytics", task: "CRO Experiment 1 live in production. Daily monitoring. Ensure GA4 event capture + stats dashboard reads correctly.", deliverable: "Experiment 1 live" },
      { owner: "PM / Lead", task: "MONTH 2 END-OF-MONTH REVIEW. Pillar #5 + #6 outlines drafted for Month 3. Founder + brand social retro (which posts performed). Approve Wave 2 page priorities.", deliverable: "Month 2 review deck" },
    ],
    deliverables: ["Pillar Articles #3 + #4 live", "GEO City Hub #3 (Chennai) live", "CRO Experiment 1 live in production", "Month 2 review sign-off"],
    inputs: ["Approved Experiment 1 hypothesis (W3 output)", "Statistical-significance threshold agreed (e.g. 95% CI, minimum sample size)", "Founder availability for retro"],
  },
  {
    n: 9,
    month: 3,
    theme: "Programmatic Wave 2 + AIO Optimisation + llms.txt",
    focus: "Scale to 40 pages and harden the site for AI overview citation.",
    days: [
      { owner: "Content / SEO", task: "Content briefs for pages 21–40 (Wave 2 priority cells).", deliverable: "20 briefs" },
      { owner: "Dev / SEO", task: "Publish /llms.txt at site root. Audit top 20 pages for 'answer-first' opening pattern; rewrite the first paragraph to lead with a 1–2 sentence answer where missing.", deliverable: "llms.txt live + 20 lede rewrites" },
      { owner: "Content", task: "Pages 21–30 drafted + published. Editor pass on lede rewrites continuing.", deliverable: "10 pages live" },
      { owner: "Content / SEO", task: "Pillar Article #5 published ('How much does it really cost to own an electric scooter in India over 3 years?', original cost calculator + tables).", deliverable: "Pillar #5 live" },
      { owner: "PM / Lead", task: "Pages 31–40 drafted + published. Friday review. Indexed long-tail count from GSC.", deliverable: "40 pages cumulative" },
    ],
    deliverables: ["40 programmatic pages cumulative", "Pillar Article #5 live", "/llms.txt deployed", "20 'answer-first' lede rewrites"],
    inputs: ["GSC URL inspection batch-request workflow validated", "First-party 'cost of ownership' data (founder + accounting)"],
  },
  {
    n: 10,
    month: 3,
    theme: "Internal-Link Architecture + Topic Clusters + CRO Experiment 2",
    focus: "Make the new content graph 'click' for both crawlers and humans. Second A/B test in market.",
    days: [
      { owner: "SEO / Dev", task: "Internal-link audit (Screaming Frog rerun). Map every pillar to its supporting programmatic spokes. Identify orphan pages + pillars under-linked to.", deliverable: "Link-graph audit + orphan list" },
      { owner: "Content / SEO", task: "Add 50+ contextual internal links: pillar → programmatic, programmatic → product, blog → pillar. Topic-cluster tagging across all pillar + hub pages.", deliverable: "50+ new internal links live" },
      { owner: "Dev / Analytics", task: "CRO Experiment 2 implementation (mid-funnel, likely PDP variant: price-saving messaging vs feature messaging on /ev/[brand]).", deliverable: "Experiment 2 in staging" },
      { owner: "Content / Dev", task: "Pillar Article #6 published ('Buying an electric scooter in India: every question first-time buyers ask, answered'). Pages 41–50 published.", deliverable: "Pillar #6 + 10 pages live" },
      { owner: "Dev / PM", task: "CRO Experiment 2 live in production. Friday review. Fortnightly Report #4.", deliverable: "Experiment 2 live + Fortnightly Report #4" },
    ],
    deliverables: ["Refined internal-link architecture", "Pillar Article #6 live", "Pages 41–50 (50 cumulative)", "CRO Experiment 2 live", "Fortnightly Report #4"],
    inputs: ["Approved Experiment 2 hypothesis (Month 1 output)", "PDP component slots ready for variant copy injection"],
  },
  {
    n: 11,
    month: 3,
    theme: "Reddit Thought-Leadership + 80 Pages + CRO Experiment 3",
    focus: "Open the off-platform credibility channel and push programmatic to the upper target band.",
    days: [
      { owner: "Content / Founder", task: "Reddit strategy: identify target subs (r/india, r/IndiaSpeaks, r/CarsIndia, r/Electric_Vehicles, r/india_tourism, r/IndianMotorcycles). Subscribe, observe norms, plan founder AMA approach.", deliverable: "Reddit playbook + AMA pitch" },
      { owner: "Content", task: "Pages 51–60 published. First 2 Reddit foundation posts (helpful comments + 1 long-form post in r/Electric_Vehicles, value-first, not promotional).", deliverable: "60 cumulative + Reddit seeded" },
      { owner: "Dev", task: "CRO Experiment 3 implementation (bottom-funnel, likely test-ride booking form: field reduction vs urgency cue).", deliverable: "Experiment 3 in staging" },
      { owner: "Content / Founder", task: "Pages 61–70 published. Reddit AMA confirmed + scheduled (next week). Founder primes LinkedIn audience.", deliverable: "70 cumulative + AMA scheduled" },
      { owner: "Dev / PM", task: "CRO Experiment 3 live. Friday review.", deliverable: "Experiment 3 live" },
    ],
    deliverables: ["Pages 51–70 (70 cumulative)", "Reddit channel opened + AMA scheduled", "CRO Experiment 3 live"],
    inputs: ["Founder availability for AMA (typically 90 min window)", "Approved Experiment 3 hypothesis"],
  },
  {
    n: 12,
    month: 3,
    theme: "Final Push + End-of-Quarter Review",
    focus: "Land the 80-page target. Pull every metric. Translate 12 weeks into a hand-off + the next quarter's brief.",
    days: [
      { owner: "Content / Dev", task: "Pages 71–80 published. Final QA pass on schema, internal links, alt-text, page speed for the full programmatic set.", deliverable: "80 cumulative + QA report" },
      { owner: "Analytics", task: "CRO experiments 1–3 results analysis. Statistical significance test. Winner / loser / inconclusive verdict per experiment + retained learnings doc.", deliverable: "Three experiment learnings docs" },
      { owner: "Analytics / PM", task: "End-of-quarter analytics pull. Compare W1 baseline vs W12 current: organic sessions, indexed pages, AIO citations, conversion rate, founder engagement, content velocity. Calculate vs targets.", deliverable: "End-of-quarter scorecard" },
      { owner: "Content / Founder", task: "Reddit AMA execution. Top-performing content compilation (best 5 pillars + best 10 programmatic by impressions). Founder + brand social retro.", deliverable: "AMA done + content top-10 list" },
      { owner: "PM / Lead", task: "END-OF-QUARTER REVIEW MEETING with client. Present scorecard vs targets. Deliver hand-off package: full audit set, content library, dashboard access, experiment learnings, recommended Q4 priorities.", deliverable: "Q1 review deck + Q4 brief + Hand-off package" },
    ],
    deliverables: ["80 programmatic pages live (target hit)", "Three CRO experiment learnings shipped", "End-of-quarter scorecard", "Q4 recommended-priorities brief", "Final hand-off package"],
    inputs: ["Manager + Founder + Client review slot (Fri, 90 min)", "Stakeholder list for hand-off recipients"],
  },
];

// ─── Build content sections ──────────────────────────────────

function coverPage() {
  return [
    new Paragraph({ spacing: { before: 2400, after: 240 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "ELECTRICPE × MARKETING", size: 24, bold: true, color: C.brand, font: "Arial", characterSpacing: 60 })] }),
    new Paragraph({ spacing: { before: 0, after: 120 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "90-Day Execution Plan", size: 56, bold: true, color: C.ink, font: "Arial" })] }),
    new Paragraph({ spacing: { before: 0, after: 600 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Weekly cadence · Daily tasks · Owner mapped", size: 28, color: C.muted, italics: true, font: "Arial" })] }),
    new Paragraph({ spacing: { before: 1200, after: 80 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Quarter window", size: 18, bold: true, color: C.brand, font: "Arial", characterSpacing: 50 })] }),
    new Paragraph({ spacing: { after: 80 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Mon 18 May 2026 to Fri 7 Aug 2026", size: 24, color: C.ink, font: "Arial" })] }),
    new Paragraph({ spacing: { after: 600 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "12 working weeks · 60 working days · 6 workstreams", size: 22, color: C.muted, font: "Arial" })] }),
    new Paragraph({ spacing: { before: 600 }, alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Document version 1.0", size: 18, color: C.subtle, font: "Arial" })] }),
    new Paragraph({ alignment: AlignmentType.CENTER, children: [new TextRun({ text: "Prepared from the client's 1-page strategy brief", size: 18, color: C.subtle, italics: true, font: "Arial" })] }),
  ];
}

function execSummary() {
  return [
    H1("1. Executive summary"),
    P("This document operationalises the client's 1-page 90-day strategy into a week-by-week and day-by-day execution plan. It is meant to be read by anyone joining the project mid-flight; every section names the owner, the deliverable, and the inputs required to start."),
    H3("The mission, restated"),
    P("Win Google AI Overviews, dominate long-tail commercial search across India's EV charging landscape, and convert the resulting traffic, backed by founder-led trust signals and a programmatic content moat."),
    H3("The shape of the quarter"),
    Bullet("Month 1: Foundation & Audit. Baselines, dashboards, the grid, the briefs.", 0, "summary-bullets"),
    Bullet("Month 2: Build & Activate. Programmatic Wave 1, pillar content, GEO hubs, social relaunch, first A/B test.", 0, "summary-bullets"),
    Bullet("Month 3: Scale & Optimise. Push to 80 pages, internal-link refinement, AIO + llms.txt, two more A/B tests, off-platform credibility (Reddit), end-of-quarter review.", 0, "summary-bullets"),
    H3("What this document is, and isn't"),
    P("It IS the weekly + daily execution map for the agency/in-house team running the engagement. It IS the rubric against which fortnightly reports will be written. It is NOT a creative brief or a content style-guide. Those live as separate documents referenced by week."),
    H3("Assumptions"),
    Bullet("Working days are Mon–Fri. 12 weeks × 5 = 60 working days. Public holidays not yet stripped, to be confirmed Week 1.", 0, "assumption-bullets"),
    Bullet("Roles named in the daily tables are functional, not headcount. One person may carry two functions; in that case, the daily load needs to be re-scoped at kickoff.", 0, "assumption-bullets"),
    Bullet("The 'six workstreams' referenced in the client brief have been inferred from context (the brief lists only the four pillars). Section 4 names the six and the inference logic.", 0, "assumption-bullets"),
    Bullet("Public-holiday list, exact start date, and team headcount are open items for the Week 1 kickoff agenda.", 0, "assumption-bullets"),
  ];
}

function targetsSection() {
  const rows = [
    new TableRow({
      tableHeader: true,
      children: [HeaderCell("Metric", 3120), HeaderCell("Target", 2340), HeaderCell("Measured against", 3900)],
    }),
    ...TARGETS.map(([m, t, v]) => new TableRow({
      children: [Cell(m, { width: 3120 }), Cell(t, { width: 2340, bold: true }), Cell(v, { width: 3900, color: C.muted })],
    })),
  ];
  return [
    H1("2. Goals & targets"),
    P("Six headline targets the quarter will be judged against. Each is owned by one workstream and reports into the dashboard (Workstream 6)."),
    new Table({ columnWidths: [3120, 2340, 3900], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
  ];
}

function pillarsSection() {
  const rows = [
    new TableRow({
      tableHeader: true,
      children: [HeaderCell("#", 720), HeaderCell("Pillar", 2700), HeaderCell("What it means in practice", 5940)],
    }),
    ...PILLARS.map(([n, name, desc]) => new TableRow({
      children: [Cell(n, { width: 720, bold: true, color: C.brand }), Cell(name, { width: 2700, bold: true }), Cell(desc, { width: 5940, color: C.muted })],
    })),
  ];
  return [
    H1("3. The four pillars (from the client brief)"),
    P("The pillars define HOW we work, not WHAT we deliver. They sit underneath every workstream and every weekly task."),
    new Table({ columnWidths: [720, 2700, 5940], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
  ];
}

function workstreamsSection() {
  const rows = [
    new TableRow({
      tableHeader: true,
      children: [HeaderCell("ID", 720), HeaderCell("Workstream", 2400), HeaderCell("Scope", 4200), HeaderCell("Primary owner", 2040)],
    }),
    ...WORKSTREAMS.map(([id, name, scope, owner]) => new TableRow({
      children: [Cell(id, { width: 720, bold: true, color: C.brand }), Cell(name, { width: 2400, bold: true }), Cell(scope, { width: 4200, color: C.muted }), Cell(owner, { width: 2040 })],
    })),
  ];
  return [
    H1("4. The six workstreams"),
    P("The client brief mentions 'six workstreams' without naming them. Below is the inferred breakdown: each workstream maps cleanly to one or more weekly milestones, and the daily tables in Section 6 tag every task to one of these six. If the manager wants a different split, this is the place to redline before Week 1."),
    new Table({ columnWidths: [720, 2400, 4200, 2040], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
    P(""),
    P("Tasks in the weekly tables (Section 6) reference these IDs in the Owner column where helpful.", { italics: true, color: C.subtle, size: 20 }),
  ];
}

function roadmapTable() {
  const rows = [
    new TableRow({ tableHeader: true, children: [HeaderCell("Wk", 540), HeaderCell("Dates (Mon–Fri)", 1820), HeaderCell("Month", 720), HeaderCell("Theme", 6280)] }),
    ...WEEKS.map((w) => new TableRow({
      children: [
        Cell(String(w.n), { width: 540, bold: true, color: C.brand }),
        Cell(`${WEEK_DATES[w.n - 1][0]} – ${WEEK_DATES[w.n - 1][4]}`, { width: 1820 }),
        Cell(`M${w.month}`, { width: 720 }),
        Cell(w.theme, { width: 6280, color: C.ink }),
      ],
    })),
  ];
  return [
    H1("5. 90-day roadmap at a glance"),
    P("Twelve weeks, three monthly chapters. Each row drills down into Section 6 (daily tasks)."),
    new Table({ columnWidths: [540, 1820, 720, 6280], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
  ];
}

function weekSection(w) {
  const dates = WEEK_DATES[w.n - 1];
  const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const rows = [
    new TableRow({ tableHeader: true, children: [HeaderCell("Day", 900), HeaderCell("Owner", 1620), HeaderCell("Task", 5940), HeaderCell("Deliverable", 900)] }),
    ...w.days.map((d, i) => new TableRow({
      children: [
        Cell([`${dayLabels[i]}`, `${dates[i]}`], { width: 900, bold: true }),
        Cell(d.owner, { width: 1620, color: C.muted }),
        Cell(d.task, { width: 5940 }),
        Cell(d.deliverable, { width: 900, color: C.muted, size: 18 }),
      ],
    })),
  ];

  const out = [
    H1(`Week ${w.n} · ${w.theme}`),
    new Paragraph({ spacing: { after: 60 }, children: [new TextRun({ text: `Month ${w.month}  ·  ${dates[0]} – ${dates[4]}, 2026`.toUpperCase(), size: 18, bold: true, color: C.brand, font: "Arial", characterSpacing: 50 })] }),
    P(w.focus, { color: C.muted, italics: true }),
    P(""),
    H3("Daily plan"),
    new Table({ columnWidths: [900, 1620, 5940, 900], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
    P(""),
    H3("End-of-week deliverables"),
    ...w.deliverables.map((d) => Bullet(d, 0, `wk${w.n}-deliv`)),
    H3("Inputs required to start the week"),
    ...w.inputs.map((d) => Bullet(d, 0, `wk${w.n}-inputs`)),
  ];

  // Add month-end review note for W4, W8, W12
  if (w.n === 4 || w.n === 8) {
    out.push(P(`END OF MONTH ${w.month}. Major review with manager + client. Fortnightly Report ${w.n === 4 ? "#2" : "#4"} published.`, { bold: true, color: C.brand }));
  }
  if (w.n === 12) {
    out.push(P("END OF QUARTER. Full hand-off package delivered. Q4 recommended-priorities brief presented.", { bold: true, color: C.brand }));
  }
  return out;
}

function reportingSection() {
  return [
    H1("7. Reporting cadence"),
    H3("Weekly"),
    Bullet("Friday end-of-week review (30 min, internal). Tasks shipped vs planned. Blockers. Next-week priorities.", 0, "rep-w"),
    Bullet("Looker Studio dashboard auto-updates daily; team checks it Mon morning.", 0, "rep-w"),
    H3("Fortnightly"),
    Bullet("Report to manager every 2nd Friday: 1-page PDF (progress vs targets, key wins, risks).", 0, "rep-f"),
    Bullet("First fortnightly = end of Week 2. Subsequent: W4, W6, W8, W10, W12.", 0, "rep-f"),
    H3("Monthly"),
    Bullet("End-of-month review with client. Decks: progress vs targets, deliverables shipped, next-month focus.", 0, "rep-m"),
    Bullet("Held Friday of Week 4 (Jun 12), Week 8 (Jul 10), Week 12 (Aug 7, end-of-quarter).", 0, "rep-m"),
    H3("End-of-quarter (Week 12)"),
    Bullet("Full scorecard against 90-day targets.", 0, "rep-q"),
    Bullet("Three CRO experiment learnings docs.", 0, "rep-q"),
    Bullet("Hand-off package: dashboards, briefs, briefs-as-templates, photography library, content library.", 0, "rep-q"),
    Bullet("Recommended Q4 priorities (if engagement continues).", 0, "rep-q"),
  ];
}

function inputsSection() {
  const rows = [
    new TableRow({ tableHeader: true, children: [HeaderCell("Input", 4500), HeaderCell("Source", 2400), HeaderCell("Needed by", 1500), HeaderCell("Owner", 960)] }),
    ...[
      ["Semrush: Domain Overview for electricpe.com (traffic, top KWs, top pages, backlinks)", "Semrush", "Week 1, Day 4", "Client / PM"],
      ["Semrush: Position Tracking export for top 200 target keywords", "Semrush", "Week 1, Day 4", "Client / PM"],
      ["Semrush: Keyword Magic Tool exports (5 seed clusters)", "Semrush", "Week 2, Day 3", "SEO Lead"],
      ["Semrush: Domain vs Domain (electricpe vs Ola vs Ather)", "Semrush", "Week 2, Day 4", "SEO Lead"],
      ["Semrush: Backlink Analytics (electricpe + 2 competitors)", "Semrush", "Week 9 (only if off-site add-on is greenlit)", "SEO Lead"],
      ["Google Search Console: 90-day Performance + Coverage export", "GSC", "Week 1, Day 4", "Client (verified access)"],
      ["GA4: last 90 days Acquisition + Conversion + Funnel data", "GA4", "Week 1, Day 4", "Client (reader access)"],
      ["Microsoft Clarity: install permission + workspace", "Clarity", "Week 3, Day 2", "Client (1-line script)"],
      ["Existing sitemap.xml + robots.txt of electricpe.com", "Site", "Week 1, Day 2", "Dev"],
      ["Public-holiday calendar for India (2026 H2)", "HR / Manager", "Week 1, Day 1", "Manager"],
      ["Confirmed list of 30 priority cities for GEO grid", "Manager / Founder", "Week 2, Day 2", "PM"],
      ["Founder availability calendar (LinkedIn drafting, AMA, interviews)", "Founder", "Week 4, Day 1", "Founder"],
      ["Local store data for each GEO city hub (address, hours, photo)", "Stores team", "Week 7, Day 2", "PM"],
      ["First-party cost-of-ownership data (Pillar #5)", "Founder + Finance", "Week 9, Day 4", "Founder"],
      ["Photography brief approval + shoot booking", "Designer / Founder", "Week 5, Day 5", "Founder"],
    ].map((r) => new TableRow({
      children: [Cell(r[0], { width: 4500 }), Cell(r[1], { width: 2400, color: C.muted }), Cell(r[2], { width: 1500, color: C.muted }), Cell(r[3], { width: 960, color: C.muted, size: 18 })],
    })),
  ];
  return [
    H1("8. Inputs required (data, accesses, decisions)"),
    P("These are the non-negotiable dependencies the plan needs from the client / manager / founder. Each is mapped to the week it bites. Missing inputs = slipped milestones; flag immediately if any line below is in doubt."),
    new Table({ columnWidths: [4500, 2400, 1500, 960], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
  ];
}

function risksSection() {
  const rows = [
    new TableRow({ tableHeader: true, children: [HeaderCell("Risk", 4500), HeaderCell("Likelihood", 1080), HeaderCell("Impact", 1080), HeaderCell("Mitigation", 2700)] }),
    ...[
      ["Content writer capacity can't sustain 8–10 pages/week", "Medium", "High", "Onboard a second writer by Week 4. Ship briefs in batches of 10."],
      ["Founder bandwidth too tight for 2 LinkedIn posts/week", "High", "Medium", "Ghost-write from founder voice + transcribed voice notes. Founder approves, doesn't draft."],
      ["AIO citations lag 2–6 weeks after content goes live", "High", "Medium", "Lead with W7 publishing so first AIOs appear by W10. Don't promise 15+/mo in W6 reporting."],
      ["CRO experiment volume too low for statistical significance", "Medium", "Medium", "Pre-calculate sample size in W3. If too thin, switch to bayesian readout or extend run."],
      ["Original-photography shoot delayed (founder/store availability)", "Medium", "Medium", "Book W6 + W10 shoots in W1. Have stock fall-back set approved in W4."],
      ["Reddit AMA backfires or fails to attract questions", "Low", "Medium", "Seed AMA with 5 friendly questions in advance. Pick a sub where founder already has a baseline."],
      ["Public holidays compress timeline (Independence Day = Aug 15 falls just after Q-end)", "Low", "Low", "Confirm 2026 holiday calendar W1 Day 1. Re-scope if any holiday lands inside the quarter."],
      ["Schema markup gets penalised for inflated FAQs", "Low", "High", "Every FAQ derives from a real user question (GSC, Clarity, AMA). No invented questions."],
    ].map((r) => new TableRow({
      children: [Cell(r[0], { width: 4500 }), Cell(r[1], { width: 1080, bold: true, color: r[1] === "High" ? "B91C1C" : r[1] === "Medium" ? "B45309" : "166534" }), Cell(r[2], { width: 1080, bold: true, color: r[2] === "High" ? "B91C1C" : r[2] === "Medium" ? "B45309" : "166534" }), Cell(r[3], { width: 2700, color: C.muted })],
    })),
  ];
  return [
    H1("9. Risks & mitigations"),
    P("Eight risks ranked by likelihood × impact. Each has a pre-agreed mitigation; the plan is to act on them, not just to list them."),
    new Table({ columnWidths: [4500, 1080, 1080, 2700], rows, margins: { top: 80, bottom: 80, left: 120, right: 120 } }),
  ];
}

function glossarySection() {
  const items = [
    ["AIO", "AI Overview. The synthesised answer Google shows at the top of certain SERPs, citing 3–5 source URLs."],
    ["AEO", "Answer Engine Optimisation. Optimising content so AI answer engines (AIO, Perplexity, ChatGPT, Gemini) cite it."],
    ["GEO", "Generative Engine Optimisation. Same intent as AEO, often used interchangeably; can also mean geographic SEO depending on context."],
    ["CRO", "Conversion Rate Optimisation. Disciplined experimentation on the funnel to lift conversion."],
    ["llms.txt", "A plain-text file at site root that gives LLM crawlers a curated map of the highest-value content."],
    ["Programmatic content", "Templated pages generated from a data grid (e.g. City × Charger × Use-case): high volume, long-tail SEO."],
    ["Pillar article", "A long-form authoritative article that anchors a topic cluster and earns links + AIO citations."],
    ["GEO city hub", "A landing page for one city + spoke pages for local sub-topics, used to dominate '[topic] in [city]' queries."],
    ["Topic cluster", "A pillar page + supporting pages tightly internal-linked around one core entity."],
    ["Hub-and-spoke", "Internal-link architecture where the pillar is the hub and supporting pages are spokes."],
    ["Schema (JSON-LD)", "Structured-data markup that tells search engines what an entity on the page is (Product, FAQ, Article, etc.)."],
    ["Core Web Vitals", "Google's user-experience metrics (LCP, CLS, INP). Pass for rank protection."],
    ["GSC", "Google Search Console. Free, authoritative search-performance data."],
    ["GA4", "Google Analytics 4. Traffic + conversion measurement."],
    ["Heatmap", "Visualisation of where users click, move, or rage-click on a page (Microsoft Clarity or Hotjar)."],
    ["A/B test", "Controlled experiment with two variants; statistical winner determines what ships."],
    ["RACI", "Responsible / Accountable / Consulted / Informed: role-mapping framework for tasks."],
  ];
  return [
    H1("10. Glossary"),
    P("Short definitions for the terms used throughout this document. Aimed at someone outside the SEO/CRO world."),
    ...items.map(([term, def]) =>
      new Paragraph({
        spacing: { after: 100 },
        children: [
          new TextRun({ text: `${term}  `, bold: true, size: 22, color: C.brand, font: "Arial" }),
          new TextRun({ text: def, size: 22, color: C.ink, font: "Arial" }),
        ],
      })
    ),
  ];
}

// ─── Compose document ────────────────────────────────────────

const numberingConfig = [
  { reference: "summary-bullets",   levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "assumption-bullets", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "rep-w", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "rep-f", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "rep-m", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  { reference: "rep-q", levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ...WEEKS.flatMap((w) => [
    { reference: `wk${w.n}-deliv`,  levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
    { reference: `wk${w.n}-inputs`, levels: [{ level: 0, format: LevelFormat.BULLET, text: "•", alignment: AlignmentType.LEFT, style: { paragraph: { indent: { left: 720, hanging: 360 } } } }] },
  ]),
];

const children = [
  ...coverPage(),
  ...execSummary(),
  ...targetsSection(),
  ...pillarsSection(),
  ...workstreamsSection(),
  ...roadmapTable(),
  H1("6. Week-by-week plan with daily tasks"),
  P("Each of the 12 weeks below has a theme line, a daily-task table (Mon–Fri), end-of-week deliverables, and the inputs the team needs to start the week."),
  ...WEEKS.flatMap(weekSection),
  ...reportingSection(),
  ...inputsSection(),
  ...risksSection(),
  ...glossarySection(),
];

const doc = new Document({
  creator: "ElectricPe Marketing",
  title: "ElectricPe 90-Day Execution Plan",
  description: "Weekly + daily execution plan operationalising the 1-page 90-day marketing strategy.",
  styles: {
    default: { document: { run: { font: "Arial", size: 22 } } },
    paragraphStyles: [
      { id: "Heading1", name: "Heading 1", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 36, bold: true, color: C.brand, font: "Arial" }, paragraph: { spacing: { before: 240, after: 180 }, outlineLevel: 0 } },
      { id: "Heading2", name: "Heading 2", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 28, bold: true, color: C.ink, font: "Arial" }, paragraph: { spacing: { before: 200, after: 120 }, outlineLevel: 1 } },
      { id: "Heading3", name: "Heading 3", basedOn: "Normal", next: "Normal", quickFormat: true, run: { size: 24, bold: true, color: C.ink, font: "Arial" }, paragraph: { spacing: { before: 160, after: 80 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: numberingConfig },
  sections: [{
    properties: {
      page: { margin: { top: 1080, right: 1080, bottom: 1080, left: 1080 } },
    },
    headers: {
      default: new Header({
        children: [new Paragraph({
          alignment: AlignmentType.RIGHT,
          children: [new TextRun({ text: "ElectricPe · 90-Day Execution Plan", size: 16, color: C.subtle, italics: true, font: "Arial" })],
        })],
      }),
    },
    footers: {
      default: new Footer({
        children: [new Paragraph({
          alignment: AlignmentType.CENTER,
          children: [
            new TextRun({ text: "Page ", size: 16, color: C.subtle, font: "Arial" }),
            new TextRun({ children: [PageNumber.CURRENT], size: 16, color: C.subtle, font: "Arial" }),
            new TextRun({ text: " of ", size: 16, color: C.subtle, font: "Arial" }),
            new TextRun({ children: [PageNumber.TOTAL_PAGES], size: 16, color: C.subtle, font: "Arial" }),
          ],
        })],
      }),
    },
    children,
  }],
});

Packer.toBuffer(doc).then((buf) => {
  fs.writeFileSync("Electricpe-90-Day-Execution-Plan.docx", buf);
  const stat = fs.statSync("Electricpe-90-Day-Execution-Plan.docx");
  console.log(`OK · wrote Electricpe-90-Day-Execution-Plan.docx (${(stat.size / 1024).toFixed(1)} KB)`);
});
