import { createFileRoute } from "@tanstack/react-router";
import { LatestReport } from "@/components/markets/LatestReport";
import { marketsHead } from "@/lib/markets/head";

export const Route = createFileRoute("/markets/opening-brief")({
  head: () => marketsHead("/markets/opening-brief", "The Opening Brief — India Market Opening & Global Signals — Vivek Vishal", "Published 9:45 AM IST each trading day: overnight global signals, the Indian open, and what matters for the session. Timestamped and sourced."),
  component: () => <LatestReport type="opening-brief" />,
});
