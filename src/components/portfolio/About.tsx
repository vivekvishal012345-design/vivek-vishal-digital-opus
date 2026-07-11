import { Section } from "./Section";
import { Briefcase, Compass, Sparkles, Target } from "lucide-react";
import { motion } from "framer-motion";

const blocks = [
  {
    icon: Compass,
    title: "My Journey Into Finance",
    body: "Finance drew me in early — first through curiosity about how markets move, then through the discipline of an MBA in Finance. What began as an interest slowly turned into a career I care deeply about.",
  },
  {
    icon: Sparkles,
    title: "Interest in Capital Markets",
    body: "I spend a lot of time following equities, fund flows, and how macroeconomic shifts translate into investor behaviour. Reading annual reports, fund factsheets, and policy notes is genuinely how I unwind.",
  },
  {
    icon: Briefcase,
    title: "Asset Management Experience",
    body: "At DSP Asset Managers I work closely with distributors and advisors — supporting mutual fund conversations, helping position investment products, and building trust one relationship at a time.",
  },
  {
    icon: Target,
    title: "Continuous Learning & Long-Term Vision",
    body: "NISM certifications are behind me and deeper credentials are next. The long-term goal is simple: to grow into an exceptional finance professional whose work meaningfully helps investors compound wealth over decades.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A finance professional, quietly building."
      intro="A short introduction to my journey, my work, and what I'm building towards."
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
