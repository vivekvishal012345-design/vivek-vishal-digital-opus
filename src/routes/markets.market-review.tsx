import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/market-review")({
  head: () => marketsHead("/markets/market-review", "The Market Review — India Equities, Macro & Cross-Asset Intelligence — Vivek Vishal", "Published 6:00 PM IST each trading day: closes, attribution, flows, a company study, and cross-asset risk monitoring. Timestamped and sourced."),
  component: () => <LatestReport type="market-review" />,
});
