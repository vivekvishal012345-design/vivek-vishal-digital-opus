import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/daily-study")({
  head: () =>
    marketsHead(
      "/markets/daily-study",
      "Daily Indian Market Study — Markets Desk — Vivek Vishal",
      "The 6:00 PM IST closing study of Indian markets: conclusion first, every figure timestamped and sourced.",
    ),
  component: () => <LatestReport type="daily-study" />,
});
