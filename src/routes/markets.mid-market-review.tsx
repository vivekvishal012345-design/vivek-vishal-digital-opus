import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

// Retired publication: URL kept for backwards compatibility; not in navigation or sitemap.
export const Route = createFileRoute("/markets/mid-market-review")({
  head: () =>
    marketsHead(
      "/markets/mid-market-review",
      "Mid-Market Review (retired format) — Markets Desk — Vivek Vishal",
      "An earlier Markets Desk format, kept for existing links. New reports appear in The Opening Brief and The Market Review.",
      { noindex: true },
    ),
  component: () => <LatestReport type="mid-market-review" />,
});
