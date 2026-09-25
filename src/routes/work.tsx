import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { Experience } from "@/components/portfolio/Experience";
import { EducationCerts } from "@/components/portfolio/EducationCerts";
import { Skills } from "@/components/portfolio/Skills";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work — Vivek Vishal" },
      {
        name: "description",
        content:
          "Professional work of Vivek Vishal — Assistant Manager at DSP Mutual Fund, education from Sarala Birla University and Ranchi University, NISM certification, and areas of focus.",
      },
      { property: "og:title", content: "Work — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "Experience, education, certifications, and skills — the professional side of the site.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivekvishal.com/work" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivekvishal.com/work" }],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Work"
        title="The professional side."
        intro="Roles, education, certifications, and the skills I've built up along the way. Kept factual and short."
      />
      <Experience />
      <EducationCerts />
      <Skills />
    </SiteChrome>
  );
}
