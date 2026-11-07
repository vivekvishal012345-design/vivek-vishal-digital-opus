import { createFileRoute, Link } from "@tanstack/react-router";
import { REPORT_META, REPORT_TYPES } from "@/lib/markets/schema";
import { formatIST, latestByType } from "@/lib/markets/reports";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/")({
  head: () =>
    marketsHead(
      "/markets",
      "Markets Desk — Vivek Vishal",
      "A daily research desk on Indian markets: Opening Bell, intraday review, Daily Market Study and Cross-Asset Risk Monitor. Timestamped and sourced.",
    ),
  component: MarketsOverview,
});

const PATHS = {
  "opening-bell": "/markets/opening-bell",
  "mid-market-review": "/markets/mid-market-review",
  "daily-study": "/markets/daily-study",
  "risk-monitor": "/markets/risk-monitor",
} as const;

function MarketsOverview() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--royal)]">Markets desk</div>
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Indian markets, read carefully.</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Three scheduled reports each trading day, with an occasional intraday review. Every figure carries a timestamp and a source;
        facts, estimates and interpretation are kept apart, and missing data is labelled rather than filled in.
      </p>

      <ul className="mt-12 border-t border-border">
        {REPORT_TYPES.map((t) => {
          const meta = REPORT_META[t];
          const latest = latestByType(t);
          return (
            <li key={t} className="border-b border-border">
              <Link to={PATHS[t]} className="group grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6">
                <span className="tabular text-xs uppercase tracking-[0.14em] text-muted-foreground">{meta.schedule ?? "Intraday"}</span>
                <span>
                  <span className="font-display text-xl text-foreground transition-colors group-hover:text-[color:var(--royal)]">{meta.title}</span>
                  <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{meta.blurb}</span>
                  <span className="tabular mt-3 block text-xs text-muted-foreground">
                    {latest ? <>Latest: {formatIST(latest.asOf)}</> : "Not yet published"}
                  </span>
                  {latest && <span className="mt-2 line-clamp-2 block text-sm text-foreground/85">{latest.conclusion}</span>}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Reports are prepared with AI assistance from public sources and published as written. They are research notes, not investment advice.
      </p>
    </div>
  );
}
