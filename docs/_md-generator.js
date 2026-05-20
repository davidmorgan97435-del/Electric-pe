/* eslint-disable */
// Emit Markdown version of the plan. Run: node docs/_md-generator.js
const fs = require("fs");
const path = require("path");
const { TARGETS, PILLARS, WORKSTREAMS, WEEK_DATES, WEEKS, TOOL_INPUTS, RISKS, GLOSSARY } = require("./plan-data");

const out = [];
const wr = (s) => out.push(s);

// Cover
wr(`# ElectricPe: 90-Day Execution Plan`);
wr(``);
wr(`> **Weekly cadence · Daily tasks · Owner mapped**`);
wr(``);
wr(`**Quarter window:** Mon 18 May 2026 to Fri 7 Aug 2026 · 12 working weeks · 60 working days · 6 workstreams`);
wr(``);
wr(`*Document version 1.0 · Prepared from the client's 1-page strategy brief*`);
wr(``);
wr(`---`);
wr(``);

// 1. Exec summary
wr(`## 1. Executive Summary`);
wr(``);
wr(`This document operationalises the client's 1-page 90-day strategy into a week-by-week and day-by-day execution plan. It is meant to be read by anyone joining the project mid-flight; every section names the owner, the deliverable, and the inputs required to start.`);
wr(``);
wr(`### The mission, restated`);
wr(`Win Google AI Overviews, dominate long-tail commercial search across India's EV charging landscape, and convert the resulting traffic, backed by founder-led trust signals and a programmatic content moat.`);
wr(``);
wr(`### The shape of the quarter`);
wr(`- **Month 1: Foundation & Audit.** Baselines, dashboards, the grid, the briefs.`);
wr(`- **Month 2: Build & Activate.** Programmatic Wave 1, pillar content, GEO hubs, social relaunch, first A/B test.`);
wr(`- **Month 3: Scale & Optimise.** Push to 80 pages, internal-link refinement, AIO + llms.txt, two more A/B tests, off-platform credibility (Reddit), end-of-quarter review.`);
wr(``);
wr(`### Assumptions (open items for Week 1 kickoff)`);
wr(`- Working days are Mon–Fri. 12 weeks × 5 = 60 working days. Public holidays not yet stripped, to be confirmed Week 1.`);
wr(`- Roles named in the daily tables are functional, not headcount. One person may carry two functions; in that case, the daily load needs re-scoping at kickoff.`);
wr(`- The "six workstreams" referenced in the client brief have been inferred (the brief lists only the four pillars). Section 4 names the six and the inference logic.`);
wr(`- Public-holiday list, exact start date, and team headcount are open items for the Week 1 kickoff agenda.`);
wr(``);

// 2. Targets
wr(`## 2. Goals & Targets`);
wr(``);
wr(`Six headline targets the quarter will be judged against. Each is owned by one workstream and reports into the dashboard (Workstream 6).`);
wr(``);
wr(`| Metric | Target | Measured against |`);
wr(`|---|---|---|`);
TARGETS.forEach(([m, t, v]) => wr(`| ${m} | **${t}** | ${v} |`));
wr(``);

// 3. Pillars
wr(`## 3. The Four Pillars (from the client brief)`);
wr(``);
wr(`The pillars define HOW we work, not WHAT we deliver. They sit underneath every workstream and every weekly task.`);
wr(``);
wr(`| # | Pillar | What it means in practice |`);
wr(`|---|---|---|`);
PILLARS.forEach(([n, name, desc]) => wr(`| **${n}** | **${name}** | ${desc} |`));
wr(``);

// 4. Workstreams
wr(`## 4. The Six Workstreams`);
wr(``);
wr(`The client brief mentions "six workstreams" without naming them. Below is the inferred breakdown: each workstream maps cleanly to one or more weekly milestones, and the daily tables in Section 6 tag every task to one of these six. If the manager wants a different split, this is the place to redline before Week 1.`);
wr(``);
wr(`| ID | Workstream | Scope | Primary owner |`);
wr(`|---|---|---|---|`);
WORKSTREAMS.forEach(([id, name, scope, owner]) => wr(`| **${id}** | **${name}** | ${scope} | ${owner} |`));
wr(``);

// 5. Roadmap
wr(`## 5. 90-Day Roadmap at a Glance`);
wr(``);
wr(`| Wk | Dates (Mon–Fri) | Month | Theme |`);
wr(`|---|---|---|---|`);
WEEKS.forEach((w) => wr(`| **${w.n}** | ${WEEK_DATES[w.n - 1][0]} – ${WEEK_DATES[w.n - 1][4]} | M${w.month} | ${w.theme} |`));
wr(``);

// 6. Weekly
wr(`## 6. Week-by-Week Plan with Daily Tasks`);
wr(``);
wr(`Each of the 12 weeks below has a theme line, a daily-task table (Mon–Fri), end-of-week deliverables, and the inputs the team needs to start the week.`);
wr(``);

const dayLabels = ["Mon", "Tue", "Wed", "Thu", "Fri"];
WEEKS.forEach((w) => {
  const dates = WEEK_DATES[w.n - 1];
  wr(`---`);
  wr(``);
  wr(`### Week ${w.n} · ${w.theme}`);
  wr(``);
  wr(`**Month ${w.month}** · ${dates[0]} – ${dates[4]}, 2026`);
  wr(``);
  wr(`*${w.focus}*`);
  wr(``);
  wr(`#### Daily plan`);
  wr(``);
  wr(`| Day | Owner | Task | Deliverable |`);
  wr(`|---|---|---|---|`);
  w.days.forEach((d, i) => {
    const safe = (s) => s.replace(/\|/g, "\\|").replace(/\n/g, " ");
    wr(`| **${dayLabels[i]}** ${dates[i]} | ${safe(d.owner)} | ${safe(d.task)} | ${safe(d.deliverable)} |`);
  });
  wr(``);
  wr(`#### End-of-week deliverables`);
  w.deliverables.forEach((d) => wr(`- ${d}`));
  wr(``);
  wr(`#### Inputs required to start the week`);
  w.inputs.forEach((d) => wr(`- ${d}`));
  wr(``);
  if (w.n === 4 || w.n === 8) {
    wr(`**END OF MONTH ${w.month}.** Major review with manager + client. Fortnightly Report ${w.n === 4 ? "#2" : "#4"} published.`);
    wr(``);
  }
  if (w.n === 12) {
    wr(`**END OF QUARTER.** Full hand-off package delivered. Q4 recommended-priorities brief presented.`);
    wr(``);
  }
});

// 7. Reporting
wr(`---`);
wr(``);
wr(`## 7. Reporting Cadence`);
wr(``);
wr(`### Weekly`);
wr(`- Friday end-of-week review (30 min, internal). Tasks shipped vs planned. Blockers. Next-week priorities.`);
wr(`- Looker Studio dashboard auto-updates daily; team checks it Mon morning.`);
wr(``);
wr(`### Fortnightly`);
wr(`- Report to manager every 2nd Friday: 1-page PDF (progress vs targets, key wins, risks).`);
wr(`- First fortnightly = end of Week 2. Subsequent: W4, W6, W8, W10, W12.`);
wr(``);
wr(`### Monthly`);
wr(`- End-of-month review with client. Decks: progress vs targets, deliverables shipped, next-month focus.`);
wr(`- Held Friday of Week 4 (Jun 12), Week 8 (Jul 10), Week 12 (Aug 7, end-of-quarter).`);
wr(``);
wr(`### End-of-quarter (Week 12)`);
wr(`- Full scorecard against 90-day targets.`);
wr(`- Three CRO experiment learnings docs.`);
wr(`- Hand-off package: dashboards, briefs, briefs-as-templates, photography library, content library.`);
wr(`- Recommended Q4 priorities (if engagement continues).`);
wr(``);

// 8. Inputs
wr(`## 8. Inputs Required (Data, Accesses, Decisions)`);
wr(``);
wr(`These are the non-negotiable dependencies the plan needs from the client / manager / founder. Each is mapped to the week it bites. Missing inputs = slipped milestones; flag immediately if any line below is in doubt.`);
wr(``);
wr(`| Input | Source | Needed by | Owner |`);
wr(`|---|---|---|---|`);
TOOL_INPUTS.forEach((r) => wr(`| ${r[0]} | ${r[1]} | ${r[2]} | ${r[3]} |`));
wr(``);

// 9. Risks
wr(`## 9. Risks & Mitigations`);
wr(``);
wr(`Eight risks ranked by likelihood × impact. Each has a pre-agreed mitigation; the plan is to act on them, not just to list them.`);
wr(``);
wr(`| Risk | Likelihood | Impact | Mitigation |`);
wr(`|---|---|---|---|`);
RISKS.forEach((r) => wr(`| ${r[0]} | **${r[1]}** | **${r[2]}** | ${r[3]} |`));
wr(``);

// 10. Glossary
wr(`## 10. Glossary`);
wr(``);
wr(`Short definitions for the terms used throughout this document. Aimed at someone outside the SEO/CRO world.`);
wr(``);
GLOSSARY.forEach(([term, def]) => wr(`- **${term}**: ${def}`));
wr(``);

const finalText = out.join("\n");
fs.writeFileSync(path.join(__dirname, "Electricpe-90-Day-Execution-Plan.md"), finalText);
console.log(`OK · wrote Electricpe-90-Day-Execution-Plan.md (${(finalText.length / 1024).toFixed(1)} KB · ${finalText.split("\n").length} lines)`);
