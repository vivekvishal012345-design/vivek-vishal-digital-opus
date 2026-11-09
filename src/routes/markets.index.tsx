import { createFileRoute, Link } from "@tanstack/react-router";
import { HUB_NAME, LEGACY_TYPES, PUBLISHABLE_TYPES, REPORT_META } from "@/lib/markets/schema";
import { formatIST, latestByType } from "@/lib/markets/reports";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/")({
  head: () =>
    marketsHead(
      "/markets",
      HUB_NAME,
      "A daily research desk on Indian markets: The Opening Brief each morning and The Market Review each evening. Timestamped and sourced.",
    ),
  component: MarketsOverview,
});

const LEGACY_PATHS = {
  "opening-bell": "/markets/opening-bell",
  "mid-market-review": "/markets/mid-market-review",
  "daily-study": "/markets/daily-study",
  "risk-monitor": "/markets/risk-monitor",
} as const;

function MarketsOverview() {
  return (
    <div className="mx-auto max-w-3xl">
      <div className="mb-3 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--royal)]">{HUB_NAME}</div>
      <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl">Indian markets, read carefully.</h1>
      <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
        Two reports each trading day: a morning brief and an evening review. Every figure carries a timestamp and a source;
        facts, estimates and interpretation are kept apart, and missing data is labelled rather than filled in.
      </p>

      <ul className="mt-12 border-t border-border">
        {PUBLISHABLE_TYPES.map((t) => {
          const meta = REPORT_META[t];
          const latest = latestByType(t);
          const body = (
            <>
              <span className="tabular text-xs uppercase tracking-[0.14em] text-muted-foreground">{meta.schedule}</span>
              <span>
                <span className="font-display text-xl text-foreground transition-colors group-hover:text-[color:var(--royal)]">{meta.title}</span>
                <span className="mt-1 block text-sm leading-relaxed text-muted-foreground">{meta.blurb}</span>
                <span className="tabular mt-3 block text-xs text-muted-foreground">
                  {latest ? <>Latest: {formatIST(latest.asOf)}</> : "Not yet published"}
                </span>
                {latest && <span className="mt-2 line-clamp-2 block text-sm text-foreground/85">{latest.conclusion}</span>}
              </span>
            </>
          );
          const cls = "group grid gap-2 py-6 sm:grid-cols-[9rem_1fr] sm:gap-6";
          return (
            <li key={t} className="border-b border-border">
              {latest ? (
                <Link to="/markets/archive/$date/$type" params={{ date: latest.date, type: t }} className={cls}>{body}</Link>
              ) : (
                <Link to="/markets/archive" className={cls}>{body}</Link>
              )}
            </li>
          );
        })}
      </ul>

      <div className="mt-10">
        <div className="text-xs uppercase tracking-[0.14em] text-muted-foreground">Earlier formats</div>
        <p className="mt-2 text-sm text-muted-foreground">
          {LEGACY_TYPES.map((t, i) => (
            <span key={t}>
              {i > 0 && " · "}
              <Link to={LEGACY_PATHS[t as keyof typeof LEGACY_PATHS]} className="underline-offset-4 hover:underline">{REPORT_META[t].short}</Link>
            </span>
          ))}
        </p>
      </div>

      <p className="mt-10 text-xs leading-relaxed text-muted-foreground">
        Reports are prepared with AI assistance from public sources and published as written. They are research notes, not investment advice.
      </p>
    </div>
  );
}
