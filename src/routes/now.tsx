import { createFileRoute } from "@tanstack/react-router";
import { SiteChrome } from "@/components/portfolio/SiteChrome";
import { PageHeader } from "@/components/portfolio/PageHeader";
import { motion } from "framer-motion";

const items = [
  {
    label: "Work",
    body: "Distributor and advisor engagement across the region for DSP Mutual Fund — product conversations, fund updates, and business development.",
  },
  {
    label: "Reading",
    body: "Fund commentaries and factsheets during the week; longer books on markets and behaviour on weekends.",
  },
  {
    label: "Learning",
    body: "Slowly deepening the fixed-income side of the toolkit — credit, duration, and how debt category positioning actually plays out in portfolios.",
  },
  {
    label: "Building",
    body: "This site — writing the first essays, planning the library section, and figuring out what to publish first.",
  },
];

export const Route = createFileRoute("/now")({
  head: () => ({
    meta: [
      { title: "Now — Vivek Vishal" },
      {
        name: "description",
        content:
          "What Vivek Vishal is focused on right now — work, reading, learning, and things in progress this season.",
      },
      { property: "og:title", content: "Now — Vivek Vishal" },
      {
        property: "og:description",
        content:
          "A short note on what I'm working on, reading, and learning this season.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivek-vishal-digital-opus.lovable.app/now" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "https://vivek-vishal-digital-opus.lovable.app/now" }],
  }),
  component: NowPage,
});

function NowPage() {
  const updated = new Date().toLocaleString("en-IN", { month: "long", year: "numeric" });
  return (
    <SiteChrome>
      <PageHeader
        eyebrow="Now"
        title="What I'm focused on."
        intro="A short, honest note on where my time is going this season — updated when it actually changes, not on a schedule."
      >
        <p className="text-xs uppercase tracking-[0.18em] text-muted-foreground">
          Last reviewed · {updated}
        </p>
      </PageHeader>

      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <ul className="divide-y divide-border border-y border-border">
            {items.map((it, i) => (
              <motion.li
                key={it.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="grid gap-2 py-6 sm:grid-cols-[10rem_minmax(0,1fr)] sm:gap-8 sm:py-8"
              >
                <span className="text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--royal)]">
                  {it.label}
                </span>
                <p className="text-base leading-relaxed text-foreground/85">{it.body}</p>
              </motion.li>
            ))}
          </ul>
          <p className="mt-8 max-w-xl text-sm leading-relaxed text-muted-foreground">
            Inspired by the <span className="text-foreground">/now</span> page convention — a small
            piece of the internet where people say, plainly, what they're up to.
          </p>
        </div>
      </section>
    </SiteChrome>
  );
}
