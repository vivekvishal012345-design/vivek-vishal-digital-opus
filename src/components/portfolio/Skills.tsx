import { Section } from "./Section";
import { motion } from "framer-motion";

const skills = [
  "Finance",
  "Mutual Funds",
  "Investment Products",
  "Sales",
  "Relationship Management",
  "Financial Analysis",
  "Microsoft Excel",
  "PowerPoint",
  "Communication",
  "Presentation Skills",
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Craft, honed over time."
      intro="A working toolkit built across markets, spreadsheets, and stakeholder conversations."
    >
      <div className="flex flex-wrap gap-2.5">
        {skills.map((s, i) => (
          <motion.span
            key={s}
            initial={{ opacity: 0, y: 8 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.35, delay: i * 0.03 }}
            className="rounded-full border border-border bg-[color:var(--surface)] px-4 py-2 text-sm text-foreground transition-colors hover:border-[color:var(--royal)]/60 hover:text-[color:var(--royal)]"
          >
            {s}
          </motion.span>
        ))}
      </div>
    </Section>
  );
}
