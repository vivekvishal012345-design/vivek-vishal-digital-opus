import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { ComingSoon } from "@/components/portfolio/ComingSoon";

export const Route = createFileRoute("/library")({
  head: () => ({
    meta: [
      { title: "Library — Vivek Vishal" },
      {
        name: "description",
        content:
          "A slowly built library of books Vivek Vishal returns to — with short reflections on why they stay on the shelf.",
      },
      { property: "og:title", content: "Library — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "Books worth returning to, with short reflections on why they stay on the shelf.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivek-vishal-digital-opus.lovable.app/library" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivek-vishal-digital-opus.lovable.app/library" }],
  }),
  component: LibraryPage,
});

function LibraryPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Library"
        title="Books I return to."
        intro="A small, slowly growing collection — the books that shape how I think about markets, work, and life. Each with a short note on why it stays."
      />
      <ComingSoon note="The first entries are being written. This section will grow one book at a time — not as a reading list, but as a record of what has actually mattered." />
    </SiteChrome>
  );
}
