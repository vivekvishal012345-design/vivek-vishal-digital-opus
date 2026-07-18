import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { ComingSoon } from "@/components/portfolio/ComingSoon";

export const Route = createFileRoute("/photography")({
  head: () => ({
    meta: [
      { title: "Photography — Vivek Vishal" },
      {
        name: "description",
        content:
          "A curated set of photographs by Vivek Vishal — travel, cities, and everyday scenes from India.",
      },
      { property: "og:title", content: "Photography — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "A curated set of photographs — travel, cities, and everyday scenes.",
      },
      { property: "og:type", content: "website" },
    ],
    links: [{ rel: "canonical", href: "/photography" }],
  }),
  component: PhotographyPage,
});

function PhotographyPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Photography"
        title="Frames worth keeping."
        intro="A curated set of photographs from travel and everyday life — added quietly, edited carefully."
      />
      <ComingSoon note="The first set is being edited. This section will stay small on purpose — a handful of frames I'd actually stand behind, rather than a feed." />
    </SiteChrome>
  );
}
