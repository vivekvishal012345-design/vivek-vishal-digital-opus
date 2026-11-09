# Markets Desk: branded report types (Task 1 of 2)

## What I found
- Four report types exist today: Opening Bell, Mid-Market Review, Daily Study, Risk Monitor. All four are equally accepted for new publishing.
- The report folder in the project is empty (only a placeholder file). No published reports exist in this project, so there is no historical report data to migrate. If reports exist elsewhere (e.g. on GitHub but not synced here), that needs confirming before building.
- Permanent URLs today: `/markets/opening-bell`, `/markets/mid-market-review`, `/markets/daily-study`, `/markets/risk-monitor`, and `/markets/archive/<date>/<type>`.

## The one focused task
Teach the report format about the new branded reports, and stop the old types from being published in future, without removing anything.

1. Add two new report types:
   - `opening-brief` — "The Opening Brief — India Market Opening & Global Signals", scheduled 9:45 AM IST. Reuses the Opening Bell content requirements.
   - `market-review` — "The Market Review — India Equities, Macro & Cross-Asset Intelligence", one evening report. Requires the combined Daily Study + Risk Monitor topics (one set of attribution, one deep dive, full cross-asset coverage).
2. Mark the four existing types as legacy: still valid, still rendered, still in the archive at their existing URLs, but no longer listed with a schedule.
3. The publishing check (phone form / GitHub workflow script) rejects new submissions of legacy types with a clear message, while the build keeps accepting any legacy file already in the repo.
4. Hub name in the Markets overview page title and heading becomes "Vivek Vishal | Markets Desk".

## Deliberately NOT in this task (Task 2, later)
- New pages `/markets/opening-brief` and `/markets/market-review`, Markets tab bar changes, sitemap/prerender list updates, and docs/README rewrite. Until Task 2, new-type reports are reachable via the Archive only.

## Files likely to change
- `src/lib/markets/schema.ts` — new types, titles, legacy flag, publishable-type list.
- `src/lib/markets/requirements.ts` — required topics for the two new types.
- `scripts/publish-market-report.ts` — reject legacy types for new publishing.
- `src/lib/markets/schema.test.ts` — new tests.
- `src/routes/markets.index.tsx` — hub title/heading; show only scheduled types as current.
- `AGENTS.md`, `roadmap.md`, Markets memory — record the rule and the new names.

## Risks
- Archive page for `<date>/<type>` must keep accepting legacy type names, or old links break.
- Overlap: Market Review must not double-count topics shared by Daily Study and Risk Monitor.
- Any ChatGPT scheduled task still sending old types will start failing at publish — intended, but those schedules must be updated.
- Unsynced reports on GitHub (if any) are unknown from here.

## Verification
- Tests: legacy file still validates; legacy type rejected by publish script; new types require their topics; Market Review rejects missing cross-asset topics.
- Typecheck/build log clean; old Markets URLs still render; no domain, CNAME or deploy workflow changes.

## Credit estimate
I can't reliably estimate Lovable build credits: cost depends on how many edit/check rounds are needed, and I don't have a per-task price. Rough expectation is a small task (about 6 files, one test run), but treat that as unverified. You can check actual usage afterward in your workspace usage.
