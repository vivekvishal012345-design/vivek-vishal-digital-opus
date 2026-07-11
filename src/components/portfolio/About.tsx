import { Section } from "./Section";
import { Briefcase, Compass, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

const blocks = [
  {
    icon: Briefcase,
    title: "Professional Background",
    body: "Finance professional currently serving as Assistant Manager at DSP Asset Managers, with hands-on exposure to mutual funds, investment products, and client relationships across the asset management landscape.",
  },
  {
    icon: Compass,
    title: "Career Journey",
    body: "From a finance internship at Central Coalfields Limited to an MBA in Finance and a full-time role in asset management — a deliberate path building both analytical depth and real-world commercial judgment.",
  },
  {
    icon: Sparkles,
    title: "Interests",
    body: "Capital markets, macroeconomics, public policy, and the intersection of finance and governance. A steady reader of annual reports, policy papers, and long-form business writing.",
  },
  {
    icon: Target,
    title: "Vision",
    body: "To translate a decade of finance experience into meaningful public service — using markets literacy and disciplined execution to serve institutions and citizens alike.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="Finance today. Public service tomorrow."
      intro="A short introduction to who I am, what I do, and where I'm headed."
    >
      <div className="grid gap-5 sm:grid-cols-2">
        {blocks.map((b, i) => (
          <motion.div
            key={b.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.06, ease: [0.16, 1, 0.3, 1] }}
            className="card-elevated card-elevated-hover p-6 sm:p-7"
          >
            <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
              <b.icon className="h-5 w-5" />
            </div>
            <h3 className="text-lg font-medium tracking-tight">{b.title}</h3>
            <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{b.body}</p>
          </motion.div>
        ))}
      </div>
    </Section>
  );
}
