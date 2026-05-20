/* eslint-disable */
// Shared data for both .docx and .md generators. Edit here once.

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

const WEEK_DATES = [
  ["May 18", "May 19", "May 20", "May 21", "May 22"],
  ["May 25", "May 26", "May 27", "May 28", "May 29"],
  ["Jun 01", "Jun 02", "Jun 03", "Jun 04", "Jun 05"],
  ["Jun 08", "Jun 09", "Jun 10", "Jun 11", "Jun 12"],
  ["Jun 15", "Jun 16", "Jun 17", "Jun 18", "Jun 19"],
  ["Jun 22", "Jun 23", "Jun 24", "Jun 25", "Jun 26"],
  ["Jun 29", "Jun 30", "Jul 01", "Jul 02", "Jul 03"],
  ["Jul 06", "Jul 07", "Jul 08", "Jul 09", "Jul 10"],
  ["Jul 13", "Jul 14", "Jul 15", "Jul 16", "Jul 17"],
  ["Jul 20", "Jul 21", "Jul 22", "Jul 23", "Jul 24"],
  ["Jul 27", "Jul 28", "Jul 29", "Jul 30", "Jul 31"],
  ["Aug 03", "Aug 04", "Aug 05", "Aug 06", "Aug 07"],
];

const WEEKS = [
  {
    n: 1, month: 1, theme: "Kickoff + Technical SEO Audit",
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
    n: 2, month: 1, theme: "City × Charger × Use-case Grid + Keyword Research",
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
    n: 3, month: 1, theme: "CRO Funnel Audit + AEO/GEO Visibility Baseline",
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
    n: 4, month: 1, theme: "Founder & Social Diagnostics + Tracking Dashboard Live",
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
    n: 5, month: 2, theme: "Programmatic Page Template + First Wave (Pages 1–5)",
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
    n: 6, month: 2, theme: "Programmatic Wave 1 Push + Pillar Article #1",
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
    n: 7, month: 2, theme: "Pillar Articles #2–3 + GEO City Hubs + Social Relaunch",
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
    n: 8, month: 2, theme: "Pillar #3 + #4 + GEO Hub #3 + CRO Experiment 1 Live",
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
    n: 9, month: 3, theme: "Programmatic Wave 2 + AIO Optimisation + llms.txt",
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
    n: 10, month: 3, theme: "Internal-Link Architecture + Topic Clusters + CRO Experiment 2",
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
    n: 11, month: 3, theme: "Reddit Thought-Leadership + 80 Pages + CRO Experiment 3",
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
    n: 12, month: 3, theme: "Final Push + End-of-Quarter Review",
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

const TOOL_INPUTS = [
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
];

const RISKS = [
  ["Content writer capacity can't sustain 8–10 pages/week", "Medium", "High", "Onboard a second writer by Week 4. Ship briefs in batches of 10."],
  ["Founder bandwidth too tight for 2 LinkedIn posts/week", "High", "Medium", "Ghost-write from founder voice + transcribed voice notes. Founder approves, doesn't draft."],
  ["AIO citations lag 2–6 weeks after content goes live", "High", "Medium", "Lead with W7 publishing so first AIOs appear by W10. Don't promise 15+/mo in W6 reporting."],
  ["CRO experiment volume too low for statistical significance", "Medium", "Medium", "Pre-calculate sample size in W3. If too thin, switch to bayesian readout or extend run."],
  ["Original-photography shoot delayed (founder/store availability)", "Medium", "Medium", "Book W6 + W10 shoots in W1. Have stock fall-back set approved in W4."],
  ["Reddit AMA backfires or fails to attract questions", "Low", "Medium", "Seed AMA with 5 friendly questions in advance. Pick a sub where founder already has a baseline."],
  ["Public holidays compress timeline (Independence Day = Aug 15 falls just after Q-end)", "Low", "Low", "Confirm 2026 holiday calendar W1 Day 1. Re-scope if any holiday lands inside the quarter."],
  ["Schema markup gets penalised for inflated FAQs", "Low", "High", "Every FAQ derives from a real user question (GSC, Clarity, AMA). No invented questions."],
];

const GLOSSARY = [
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

module.exports = { TARGETS, PILLARS, WORKSTREAMS, WEEK_DATES, WEEKS, TOOL_INPUTS, RISKS, GLOSSARY };
