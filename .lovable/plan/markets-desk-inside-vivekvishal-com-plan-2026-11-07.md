# Markets desk inside vivekvishal.com — plan

## What I found
- Site is a static build: every page is pre-rendered to its own HTML file and deployed by `.github/workflows/deploy.yml` on every push to `main`. `public/CNAME` = vivekvishal.com. No database, no server at runtime.
- Pages share `SiteChrome` (nav + footer), `PageHeader`, and the dark editorial theme in `src/styles.css`.
- The list of pre-rendered pages is hard-coded in `vite.config.ts`; the sitemap is hard-coded in `src/routes/sitemap[.]xml.ts`.
- The full written specs for the three reports are not in this conversation. I'll build the layout around the rules below and fit the exact sections to your specs when you paste them (or I'll pull them from earlier chat if they exist).

Nothing existing is removed: domain, workflow, the nine pages and their content all stay as they are.

## What visitors will see

```text
/markets                      Overview: latest of each report, schedule, how to read
/markets/opening-bell         Latest Opening Bell (9:45 AM IST)
/markets/mid-market-review    Latest intraday review (no fixed schedule)
/markets/daily-study          Latest Daily Indian Market Study (6:00 PM IST)
/markets/risk-monitor         Latest Cross-Asset Risk Monitor (7:00 PM IST)
/markets/archive              Every report, grouped by date, filter by type
/markets/archive/<date>/<type> Permanent page for one report
```

- "Markets" added to the main nav (between Projects and Now) and footer; a quiet secondary tab bar inside /markets.
- Every report page reads top to bottom: **Conclusion** (2–4 sentences) → key-levels table → expandable sections (Facts / Estimates / Interpretation kept visually separate) → sources list → timestamps.
- Tables: tabular numerals, baseline vs latest, change in points, % and bps. Red/green only on the direction value, never on rows or backgrounds. "Unavailable" and "Provisional" shown as small neutral labels, never a blank or zero.
- Every number links to a cited source with a capture time in IST.
- Charts only where a report supplies a series (small, static, no animation). No tickers, no flashing, no motion beyond the site's existing gentle page fade.
- Empty state until the first real report arrives: "No report published yet." No sample values anywhere.

## How reports get onto the site

Each report is one structured file stored in the repo, e.g. `content/markets/2026-11-09/opening-bell.json`. The build reads every file, checks it against a strict format (rejects missing timestamps, missing sources, numbers without a status), and pre-renders its page, the archive and the sitemap. So publishing a report = adding one file to `main`; the existing workflow rebuilds the site in about 1–2 minutes.

### What can be automated today
- ChatGPT scheduled tasks can generate the three reports at 9:45 AM, 6:00 PM and 7:00 PM IST.
- They cannot by themselves write into your GitHub repo — scheduled tasks have no secure way to hold a GitHub key and commit a file. That needs a small bridge.

### The bridge (simplest secure option)
```text
ChatGPT (Custom GPT action, or scheduled task output)
   -> POST report JSON + secret key
   -> small publishing endpoint (Cloudflare Worker, free tier)
        checks key, validates format, size limit, date/type
   -> GitHub API: commit file to content/markets/... with a
      fine-grained token limited to this one repo, contents only
   -> existing deploy workflow publishes the site
```
- Keys live only in the Worker's settings, never in the site.
- Worker refuses overwrites unless a "correction" flag is set; corrections keep a "Revised at" note.
- Caveat: whether a *scheduled* ChatGPT task can call a Custom GPT action automatically depends on your ChatGPT plan/features at the time; if not, it becomes one tap ("Publish") on the generated report.

### Manual fallback (works from day one, no bridge)
- A "New report" GitHub issue form, or a `workflow_dispatch` form in GitHub Actions: paste the report JSON, submit; a workflow validates it, commits the file, and the site redeploys. Usable from the GitHub Android app.
- Or upload the file directly in the GitHub web editor.

I'll build the site side plus the manual fallback now. The Worker bridge is a separate piece that needs your GitHub token and Cloudflare account; I can write its code and setup steps, but you'll create the accounts/keys.

## Static hosting constraints and risks
- No live data: pages update only when a new file is committed and the build finishes (~1–2 min delay). Fine for scheduled reports, not for real-time quotes.
- GitHub Pages has soft limits (about 10 builds/hour, 1 GB site). Four reports a day is well within this.
- Opening Bell at 9:45 will appear around 9:47 after build — the page shows the report's own timestamp, not the deploy time.
- Data accuracy depends on what ChatGPT gathers; the format check enforces sources and timestamps but cannot verify the numbers themselves. A "Generated with AI assistance; verify before use / not investment advice" note will sit on every report.
- Lovable's preview ignores the static settings, so I'll verify with a clean production build as before.
- Licensing: some index/price data providers restrict republication; citations reduce but don't remove that risk.

## Technical details
- Routes: `src/routes/markets.tsx` (layout with `<Outlet />` + tab bar), `markets.index.tsx`, `markets.opening-bell.tsx`, `markets.mid-market-review.tsx`, `markets.daily-study.tsx`, `markets.risk-monitor.tsx`, `markets.archive.index.tsx`, `markets.archive.$date.$type.tsx`. Each with its own head() (title, description, og, canonical on vivekvishal.com).
- Content loading: `import.meta.glob('/content/markets/**/*.json', { eager: true })` in `src/lib/markets/reports.ts`, validated with zod schema `src/lib/markets/schema.ts` (types: opening-bell | mid-market-review | daily-study | risk-monitor; fields: generatedAt, asOf (IST), conclusion, metrics[{label, baseline, latest, change{pts,pct,bps}, status: confirmed|provisional|unavailable|estimate, sourceId, capturedAt}], sections[{kind: fact|estimate|interpretation, title, body}], sources[{id, name, url, accessedAt}], revisions[]). Invalid file fails the build with a clear message.
- `vite.config.ts` and sitemap generate the pre-render list from the same report index, so new reports get static pages automatically.
- Components in `src/components/markets/`: ReportHeader, ConclusionBlock, MetricsTable, DetailAccordion, SourceList, StatusBadge, ArchiveList, small static chart (recharts, no animation).
- Design tokens added to `src/styles.css`: `--market-up`, `--market-down`, `--market-neutral` (muted, AA contrast in both themes); `.tabular` utility using `font-variant-numeric: tabular-nums`.
- Manual publish: `.github/ISSUE_TEMPLATE/market-report.yml` + `.github/workflows/publish-report.yml` (validates with the same schema via `bun`, commits, triggers deploy). Existing `deploy.yml` unchanged.
- Bridge (optional, later): `bridge/worker.ts` with setup README; not deployed by this project.
- Tests: schema tests (rejects metric without source, without timestamp, unknown type; accepts unavailable values with no number) and change math (pts, %, bps) with vitest.
- Record architecture rule in `AGENTS.md`: market reports are repo files validated at build time; no runtime backend.
