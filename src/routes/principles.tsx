import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { motion } from "framer-motion";

const principles = [
  {
    n: "01",
    title: "Know the product before you speak to it.",
    body:
      "Read the factsheet, the commentary, the annual report. Opinions held without the reading behind them don't age well.",
  },
  {
    n: "02",
    title: "Prefer clarity over cleverness.",
    body:
      "Simple language, honest framing. If a point needs jargon to hold together, it usually doesn't hold together.",
  },
  {
    n: "03",
    title: "Long horizons over loud takes.",
    body:
      "Most of what matters — in markets, in careers, in writing — compounds quietly over years. Act accordingly.",
  },
  {
    n: "04",
    title: "Be useful to the person in front of you.",
    body:
      "Distributor, advisor, colleague, reader. If the work doesn't help someone specific do their job better, it's decoration.",
  },
  {
    n: "05",
    title: "Keep opinions revisable.",
    body:
      "Hold views strongly enough to act, loosely enough to update. The market rarely rewards ego.",
  },
  {
    n: "06",
    title: "Publish when it's ready, not when it's due.",
    body:
      "This site has no cadence. Things go up when they're finished — and not before.",
  },
];

export const Route = createFileRoute("/principles")({
  head: () => ({
    meta: [
      { title: "Principles — Vivek Vishal" },
      {
        name: "description",
        content:
          "How Vivek Vishal tries to think and work — a short set of principles kept honest and revised over time.",
      },
      { property: "og:title", content: "Principles — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "A short set of principles on how I try to think, work, and hold opinions.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivek-vishal-digital-opus.lovable.app/principles" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivek-vishal-digital-opus.lovable.app/principles" }],
  }),
  component: PrinciplesPage,
});

function PrinciplesPage() {
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Principles"
        title="How I try to work."
        intro="A short set of principles I return to — for markets, for writing, and for the way I'd like to spend a career. Kept honest, revised when they should be."
      />
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <ol className="grid gap-5 sm:grid-cols-2">
            {principles.map((p, i) => (
              <motion.li
                key={p.n}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="card-elevated card-elevated-hover p-6 sm:p-7"
              >
                <span className="font-display text-sm text-[color:var(--royal)]">{p.n}</span>
                <h3 className="mt-3 text-lg font-medium leading-snug tracking-tight">
                  {p.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
              </motion.li>
            ))}
          </ol>
        </div>
      </section>
    </SiteChrome>
  );
}
