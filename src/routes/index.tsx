import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowUpRight, MapPin } from "lucide-react";
import { SiteChrome } from "@/components/portfolio/SiteChrome";

const sections = [
  {
    to: "/work",
    label: "Work",
    line: "Professional experience, education, certifications, and skills.",
  },
  {
    to: "/writing",
    label: "Writing",
    line: "Essays and notes on markets, funds, and things worth thinking about.",
  },
  {
    to: "/library",
    label: "Library",
    line: "Books I return to, with short reflections on why they stay on the shelf.",
  },
  {
    to: "/photography",
    label: "Photography",
    line: "A slowly growing set of photographs from travel and everyday life.",
  },
  {
    to: "/projects",
    label: "Projects",
    line: "This site, upcoming tools, and other things I'm quietly building.",
  },
  {
    to: "/now",
    label: "Now",
    line: "What I'm focused on this season — reading, learning, working on.",
  },
  {
    to: "/principles",
    label: "Principles",
    line: "How I try to think, work, and hold my opinions.",
  },
  {
    to: "/contact",
    label: "Contact",
    line: "For introductions, referrals, or a good conversation about markets.",
  },
] as const;

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Vivek Vishal — Writing, Work, and a Long-Form Personal Site" },
      {
        name: "description",
        content:
          "The personal site of Vivek Vishal — MBA (Finance), Assistant Manager at DSP Mutual Fund. Writing, work, library, photography, and projects, kept in one place.",
      },
      { property: "og:title", content: "Vivek Vishal" },
      {
        property: "og:description",
        content:
          "A personal site for writing, work, library, photography, and projects — from Vivek Vishal, based in Nagpur, India.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "https://vivek-vishal-digital-opus.lovable.app/" },
      { name: "twitter:card", content: "summary_large_image" },
      { name: "twitter:title", content: "Vivek Vishal" },
      {
        name: "twitter:description",
        content:
          "Writing, work, and a long-form personal site by Vivek Vishal.",
      },
    ],
    links: [{ rel: "canonical", href: "https://vivek-vishal-digital-opus.lovable.app/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: "Vivek Vishal",
          jobTitle: "Assistant Manager",
          worksFor: { "@type": "Organization", name: "DSP Mutual Fund" },
          address: { "@type": "PostalAddress", addressLocality: "Nagpur", addressCountry: "IN" },
          email: "hello@vivekvishal.com",
          url: "https://vivek-vishal-digital-opus.lovable.app/",
          alumniOf: [
            { "@type": "CollegeOrUniversity", name: "Sarala Birla University" },
            { "@type": "CollegeOrUniversity", name: "Ranchi University" },
          ],
        }),
      },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <SiteChrome>
      {/* Hero */}
      <section className="relative overflow-hidden pt-36 pb-20 sm:pt-44 sm:pb-28">
        <div className="pointer-events-none absolute inset-0 -z-10">
          <div className="absolute left-1/2 top-0 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-[color:var(--royal)] opacity-[0.10] blur-[130px]" />
          <div
            className="absolute inset-0 opacity-[0.30]"
            style={{
              backgroundImage:
                "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 0)",
              backgroundSize: "30px 30px",
              maskImage: "radial-gradient(ellipse at center, black 25%, transparent 75%)",
            }}
          />
        </div>

        <div className="container-x">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-3 py-1 text-xs text-muted-foreground"
          >
            <span className="relative flex h-1.5 w-1.5">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
            </span>
            The digital home of Vivek Vishal
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="font-display text-5xl font-medium leading-[1.02] tracking-tight sm:text-6xl md:text-7xl lg:text-[5.5rem]"
          >
            Vivek Vishal
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
            className="mt-6 max-w-2xl text-lg leading-relaxed text-foreground/85 sm:text-xl"
          >
            A quiet corner of the internet for writing, work, and the things I return to.
            Kept, slowly, as a long-term record rather than a résumé.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.25 }}
            className="mt-8 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm text-muted-foreground"
          >
            <span>MBA (Finance)</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span>Assistant Manager, DSP Mutual Fund</span>
            <span className="h-1 w-1 rounded-full bg-border" />
            <span className="inline-flex items-center gap-1.5">
              <MapPin className="h-3.5 w-3.5" /> Nagpur, India
            </span>
          </motion.div>
        </div>
      </section>

      {/* Section index */}
      <section className="pb-24 sm:pb-32">
        <div className="container-x">
          <div className="mb-10 flex items-end justify-between gap-6">
            <div>
              <div className="mb-3 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--royal)]">
                <span className="h-px w-6 bg-[color:var(--royal)]" />
                Index
              </div>
              <h2 className="font-display text-3xl font-medium tracking-tight sm:text-4xl">
                The sections of this site.
              </h2>
            </div>
          </div>

          <ul className="divide-y divide-border border-y border-border">
            {sections.map((s, i) => (
              <motion.li
                key={s.to}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
              >
                <Link
                  to={s.to}
                  className="group grid grid-cols-[minmax(0,1fr)_auto] items-baseline gap-6 py-6 transition-colors sm:grid-cols-[10rem_minmax(0,1fr)_auto] sm:py-7"
                >
                  <span className="font-display text-2xl font-medium tracking-tight text-foreground transition-colors group-hover:text-[color:var(--royal)] sm:text-3xl">
                    {s.label}
                  </span>
                  <span className="col-span-2 text-sm leading-relaxed text-muted-foreground sm:col-span-1 sm:text-base">
                    {s.line}
                  </span>
                  <ArrowUpRight className="hidden h-5 w-5 text-muted-foreground transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-[color:var(--royal)] sm:block" />
                </Link>
              </motion.li>
            ))}
          </ul>
        </div>
      </section>
    </SiteChrome>
  );
}
