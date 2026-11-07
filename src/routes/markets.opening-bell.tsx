import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/opening-bell")({
  head: () =>
    marketsHead(
      "/markets/opening-bell",
      "Opening Bell — Markets Desk — Vivek Vishal",
      "The 9:45 AM IST first read of the Indian session: conclusion first, every figure timestamped and sourced.",
    ),
  component: () => <LatestReport type="opening-bell" />,
});
