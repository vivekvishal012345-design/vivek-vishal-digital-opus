import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/risk-monitor")({
  head: () =>
    marketsHead(
      "/markets/risk-monitor",
      "Cross-Asset Risk Monitor — Markets Desk — Vivek Vishal",
      "The 7:00 PM IST cross-asset risk read for Indian markets: conclusion first, every figure timestamped and sourced.",
    ),
  component: () => <LatestReport type="risk-monitor" />,
});
