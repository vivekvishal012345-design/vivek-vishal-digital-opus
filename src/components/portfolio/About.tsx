import { Section } from "./Section";
import { Briefcase, Compass, LineChart, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const blocks = [
  {
    icon: Compass,
    title: "Background",
    body: "Trained in finance through a B.Com from Ranchi University and an MBA in Finance from Sarala Birla University. My work sits at the intersection of markets, products, and the people who advise on them.",
  },
  {
    icon: Briefcase,
    title: "Current Role",
    body: "Assistant Manager at DSP Mutual Fund, based in Nagpur. I work with distributors and advisors across the region on mutual fund distribution, product positioning, and business development.",
  },
  {
    icon: LineChart,
    title: "Focus Areas",
    body: "Day-to-day work centres on equity and debt mutual funds — reading factsheets, tracking category performance, and translating fund positioning into conversations advisors can use with their clients.",
  },
  {
    icon: BookOpen,
    title: "How I Work",
    body: "I prefer to know the product well before I speak to it. Most of my time goes into reading — annual reports, fund commentaries, policy notes — and using that reading to be genuinely useful to the partners I work with.",
  },
];

export function About() {
  return (
    <Section
      id="about"
      eyebrow="About"
      title="A note on the work."
      intro="Where I come from, what I do, and how I approach it."
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
