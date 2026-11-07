import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/mid-market-review")({
  head: () =>
    marketsHead(
      "/markets/mid-market-review",
      "Mid-Market Review — Markets Desk — Vivek Vishal",
      "An intraday review of the Indian market session: conclusion first, every figure timestamped and sourced.",
    ),
  component: () => <LatestReport type="mid-market-review" />,
});
