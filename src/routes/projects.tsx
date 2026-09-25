import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { motion } from "framer-motion";
import { ExternalLink, Youtube, Globe, Wrench } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Vivek Vishal" },
      {
        name: "description",
        content:
          "Projects by Vivek Vishal — this personal site, upcoming YouTube work, and small tools built around finance and personal knowledge.",
      },
      { property: "og:title", content: "Projects — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "Personal projects — this site, upcoming YouTube work, and small tools.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivekvishal.com/projects" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivekvishal.com/projects" }],
  }),
  component: ProjectsPage,
});

const projects = [
  {
    icon: Globe,
    title: "This website",
    status: "Live",
    body:
      "The site itself is a project — a long-term personal record, kept in one place rather than scattered across platforms. Designed to grow slowly, section by section.",
  },
  {
    icon: Youtube,
    title: "YouTube channel",
    status: "Planned",
    body:
      "A quiet, low-frequency channel focused on personal finance and mutual funds for Indian investors — explanations rather than opinions. In early planning.",
  },
  {
    icon: Wrench,
    title: "Small tools",
    status: "Sketching",
    body:
      "A few small tools for my own use — a reading log, a fund tracker, and a note system. If any of them turn out to be useful, they'll show up here.",
  },
];

function ProjectsPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Projects"
        title="Things I'm building."
        intro="A short list of things I'm building or thinking about building — some live, some in planning, some still on paper."
      />
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <div className="grid gap-5 md:grid-cols-2">
            {projects.map((p, i) => (
              <motion.article
                key={p.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-elevated card-elevated-hover flex flex-col p-6 sm:p-7"
              >
                <div className="mb-5 flex items-start justify-between gap-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
                    <p.icon className="h-5 w-5" />
                  </div>
                  <span className="rounded-full border border-border px-2.5 py-0.5 text-[10px] font-medium uppercase tracking-[0.14em] text-muted-foreground">
                    {p.status}
                  </span>
                </div>
                <h3 className="text-lg font-medium tracking-tight">{p.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </motion.article>
            ))}
          </div>
          <p className="mt-8 inline-flex items-center gap-2 text-xs text-muted-foreground">
            <ExternalLink className="h-3.5 w-3.5" />
            More projects will surface here as they become worth showing.
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
