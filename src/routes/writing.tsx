import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { ComingSoon } from "@/components/portfolio/ComingSoon";

export const Route = createFileRoute("/writing")({
  head: () => ({
    meta: [
      { title: "Writing — Vivek Vishal" },
      {
        name: "description",
        content:
          "Essays and notes by Vivek Vishal on markets, mutual funds, investing, and the way finance is practised in India.",
      },
      { property: "og:title", content: "Writing — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "Essays and notes on markets, mutual funds, and things worth thinking about.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivekvishal.com/writing" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivekvishal.com/writing" }],
  }),
  component: WritingPage,
});

function WritingPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Writing"
        title="Essays and notes."
        intro="Long-form pieces on markets, mutual funds, and the way finance is actually practised. Written slowly, published when ready."
      />
      <ComingSoon note="The first essays are being drafted. They'll appear here as they're finished — no schedule, no manufactured cadence." />
    </SiteChrome>
  );
}
