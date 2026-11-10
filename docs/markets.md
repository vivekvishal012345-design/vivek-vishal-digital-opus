# Markets Desk: research and publishing

This is a section of Vivek Vishal's existing personal website, not a second site. All portfolio URLs, `public/CNAME = vivekvishal.com`, and `.github/workflows/deploy.yml` are preserved. Reports are static; they update only after an approved deployment. There are no price feeds, background refreshes, or invented example market values.

## Report files and validation

One JSON object per `content/markets/YYYY-MM-DD/<type>.json`. Active publications (the only types accepted for new reports): `opening-brief` (The Opening Brief — 9:45 AM IST) and `market-review` (The Market Review — 6:00 PM IST, including all cross-asset and risk monitoring). Retired types (`opening-bell`, `mid-market-review`, `daily-study`, `risk-monitor`) remain readable for any historical files and corrections only; their old URLs are kept, marked noindex and excluded from the sitemap. The shared source of truth is `src/lib/markets/schema.ts`; required coverage keys are in `requirements.ts`. Invalid reports fail site loading/build rather than going live.

### Example format (types only, not sample market data)

```typescript
{
  type: "opening-brief" | "market-review", // retired types are archive-readable only
  date: string, // YYYY-MM-DD, must match asOf's IST date and file directory
  title?: string,
  asOf: string, generatedAt: string, // valid ISO timestamps with explicit offset
  provisional?: boolean,
  conclusion: string, // concise, conclusion first; 2–4 sentences recommended
  session: {
    status: "open" | "closed", note: string,
    calendarSourceId: string, checkedAt: string
  },
  metrics: [{
    label: string, scope: "india-session" | "global" | "historical",
    unit?: string, baseline: number | null, baselineAt: string | null,
    baselineLabel?: string, latest: number | null, changeBps?: number | null,
    status: "confirmed" | "provisional" | "estimate" | "stale" | "unavailable",
    sourceId: string, capturedAt: string, note?: string
  }],
  sections: [{
    topic: string, // required keys below
    kind: "fact" | "estimate" | "interpretation",
    status: "confirmed" | "provisional" | "estimate" | "stale" | "unavailable",
    asOf: string, title: string, body: string, sourceIds: string[]
  }],
  scenarios: [{
    horizon: "3M" | "6M" | "12M", subject: string,
    status: "estimate" | "unavailable", outlook: string,
    confidence: "low" | "medium" | "high" | "unavailable",
    alternative: string, confirmation: string, invalidation: string,
    sourceIds: string[]
  }],
  sources: [{ id: string, name: string, url: string, accessedAt: string }],
  revisions: [{ at: string, note: string }]
}
```

All source URLs must be HTTPS. IDs are unique and all references must resolve. Numeric baselines require their own observation timestamp. Non-confirmed observations require a reason; unavailable latest values must be `null`, never zero. Numbers should appear in metrics with explicit unit/scope/source/time; cite narrative financial claims through section source links and describe each claim's observation date in its body. Sections can repeat a topic to separate factual evidence, estimates and interpretation. Estimates are not facts. Put short jargon explanations inline with the relevant analysis.

Point change = latest − baseline. Percentage change = difference / absolute baseline × 100; undefined at a zero baseline. For yield levels expressed as `%`, bps = percentage-point change × 100, not relative percent change. An explicit `changeBps` is for verified spread/yield comparisons. Keep stock percentage moves separate from verified index-point contribution observations; never derive point attribution from a stock's percentage move alone.

The validator checks structure, coverage, timestamps, citations and revision behavior. It cannot verify market truth, financial calculations within prose, exchange holiday announcements, source licensing, or forecast quality. A human must check these before deployment. Charts are intentionally omitted until a verified series warrants one; do not create illustrative price charts.

## Research brief for each task

Generate only verified research using current primary/high-quality sources: NSE/BSE and official index data, NSE trading-holiday/calendar notices, company exchange filings/results, RBI/FBIL/CCIL, NSDL and exchange cash-flow releases, central banks/treasury releases, and reliable commodity/credit providers as appropriate. A homepage link is not a substitute for the actual document/data page. Each observation has a timestamp and timezone, previous baseline and latest value. Label provisional releases with their actual flow date; don't substitute an older flow for today's flow. If no licensed/reliable spread or attribution data is available, explicitly mark it unavailable and explain why.

Check the NSE calendar for that date before asserting a session; weekend/holiday reports use `session.status = closed` with source and note, omit Indian session price observations, and may still discuss global/historical data distinctly. No-session reports are allowed without the trading-session coverage keys or scenarios. Special weekend sessions require editorial review outside the normal schema; never assume a session just because a quote exists.

### The Opening Brief (`opening-brief`) — 9:45 AM Asia/Kolkata

Keep it concise.

Required topic keys:
- `index-open`: Nifty previous close, **official open**, latest timestamped observation, absolute points and percentage change.
- `sectors`: relevant sectors and their evidence, not an unsourced narrative.
- `attribution`: verified constituent contributors/detractors. Separate stock percentage moves from index-point contributions; explicitly unavailable if attribution cannot be verified.
- `breadth-bank-nifty`: breadth and Bank Nifty observations.
- `cross-assets`: compact current cross-asset pulse.
- `catalysts`: overnight and domestic catalysts with dated sources.
- `watchlist`: session watchlist and conditional confirmation/invalidation levels.
- `historical-returns`: **actual** Nifty 3M/6M/1Y returns with dated baselines and latest observations. Do not relabel forecasts as returns.

Include 3M/6M/12M reasoned market scenarios with confidence, alternatives, confirmation/invalidation triggers; disclose missing evidence. Avoid invented targets.

### The Market Review (`market-review`) — 6:00 PM Asia/Kolkata

Comprehensive. Combines the closing study with the cross-asset risk monitor below; each topic is covered once.

Required topic keys:
- `index-closes`: official closes, previous/latest, points/%, timestamps.
- `attribution`: verified index-point attribution, separately from stock percentage moves.
- `breadth`, `sector-rotation`: breadth and changes in sector leadership.
- `corporate-developments`: earnings/corporate developments and actual release dates.
- `institutional-flows`: FPI/DII cash flows, flow date, release timestamp and provisional/confirmed status.
- `company-deep-dive`: one rotating business; business model, industry, competitive position, management/capital allocation, quality, valuation (P/E, P/B, EV/EBITDA where relevant), earnings, margins, cash conversion, balance sheet, risks, peers, fair-value scenarios and sensitivities. Cite statements and period ends. Ratios not appropriate to the business should be identified as such. Don't rotate by inventing companies or results; review recent archive to avoid repetition.
- `philosophy-fit`: state the investment philosophy used, then explain why the business fits or fails it. Do not attribute an invented philosophy to Vivek.
- `historical-returns`: actual Nifty/sector 3M/6M/1Y returns with dated observations.
- `cross-assets`: concise implications; detailed risk coverage follows in the keys below.

Include market **and company** 3M/6M/12M scenarios (use multiple entries per horizon/subject), confidence, alternatives, confirmation/invalidation and valuation sensitivities. These are conditional estimates, not promised returns.

Cross-asset and risk-monitoring topic keys (also required in The Market Review):
- `indices-volatility`: Nifty, Bank Nifty and India VIX.
- `currency-flows`: USD/INR and dated FPI flows.
- `commodities`: Brent, natural gas, gold/silver and relevant industrial commodities. Identify instrument, unit, contract/spot and session date.
- `india-rates-liquidity`: Indian G-Sec maturities/yields, liquidity and RBI expectations.
- `us-rates-policy`: US Treasury maturities/yields and Fed expectations.
- `credit-spreads`: reliable domestic/global credit spreads with benchmark and units, or explicitly unavailable.
- `causal-channels`: oil → inflation/current account/currency; rates → bond prices/bank treasury/borrowing costs; liquidity/credit → equities. Explain conditional mechanisms without claiming causation from mere correlation.
- `yield-vs-price`: distinguish yield movement from bond-price change; maturity and duration matter.
- `historical-returns`: actual 3M/6M/1Y observations/returns where meaningful, yield/spread changes in bps where appropriate.

Both publications require 3M/6M/12M conditional scenarios on open sessions. Where evidence is insufficient, record the scenario with `status: "unavailable"` and `confidence: "unavailable"` and explain why — never invent scenarios, targets or data.

## Phone-friendly manual publishing

1. In GitHub, open this repository → **Issues → New issue → Market report**. Paste complete report JSON into the form and submit. Only collaborators with repository write permission can save reports. The workflow validates and commits a new file to `main`; duplicates fail. Issues are public, so do not paste credentials/private research.
2. For a correction, open **Actions → Publish market report → Run workflow**, branch `main`. Paste complete replacement JSON, select **correction**, retain all existing revision notes and append one new timestamped explanatory note. `generatedAt` must advance to include the revision. Original full report content remains in Git history; archive URLs stay stable.
3. **Deploy is off by default.** Review in Lovable/GitHub first; when ready, manually run the unchanged **Deploy to GitHub Pages** workflow, or explicitly select **deploy** in the publisher's Actions form. A bot-token commit does not trigger GitHub's push workflows, so the publisher dispatches the existing deploy workflow only when requested. Failure to deploy is not proof of publication.

Local validation/save: `bun scripts/publish-market-report.ts /tmp/report.json` (or append `--correction`). Tests: `bunx vitest run src/lib/markets`. Site build on GitHub remains `bunx vite build`, output `dist/client`. No runtime service, Cloudflare Worker, extra hosting or new private secret is needed for this fallback.

## ChatGPT connection and automation boundary

The three research briefs above are ready for ChatGPT tasks at 9:45 AM, 6:00 PM and 7:00 PM **Asia/Kolkata**. This repository does not create tasks in your ChatGPT account, and no scheduled generation or automatic posting is claimed active.

After connecting GitHub in ChatGPT, verify **both** repository file-write support and whether a scheduled task can invoke that write action without interaction. Connecting alone proves neither. Ask a supported connector to validate the JSON against this schema and commit exactly `content/markets/<date>/<type>.json` to this existing repository; new files only unless an explicit correction is reviewed. Read the committed file back and verify a full scheduled run before calling automation active. If scheduled tasks cannot write, generate research on schedule and use the issue/Actions fallback. No publishing bridge should be introduced until this capability check shows it is needed.

**Safety:** Direct connector/human pushes to `main` trigger the existing deployment immediately. For preview-only testing, use a review branch/PR and merge only after approval. The Actions fallback defaults to no deployment. This chat does not deploy to Lovable or intentionally dispatch production Pages.

## Static routes and SEO

`/markets`, `/markets/opening-brief`, `/markets/market-review`, `/markets/archive` and each `/markets/archive/<date>/<type>` get page-specific metadata and canonical URLs at vivekvishal.com. New report filenames generate prerender paths; the same validated files feed the archive and sitemap. Each known path is served as its own static HTML, with client navigation thereafter. Unknown URLs receive the existing `404.html`; no hash-router rewrite is needed. Invalid files fail validation. Actual production build output is verified by the platform/GitHub build, not by a runtime backend.