import { Section } from "./Section";
import { motion } from "framer-motion";

const groups: { category: string; items: string[] }[] = [
  {
    category: "Domain",
    items: ["Mutual Funds", "Capital Markets", "Investment Products"],
  },
  {
    category: "Work",
    items: ["Distributor Engagement", "Business Development", "Product Positioning", "Client Servicing"],
  },
  {
    category: "Tools",
    items: ["Excel", "PowerPoint"],
  },
];

export function Skills() {
  return (
    <Section
      id="skills"
      eyebrow="Skills"
      title="Skills."
      intro="Areas I work across."
    >
      <div className="space-y-8">
        {groups.map((g) => (
          <div key={g.category}>
            <h3 className="mb-3 text-xs font-medium uppercase tracking-widest text-muted-foreground">
              {g.category}
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {g.items.map((s, i) => (
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
          </div>
        ))}
      </div>
    </Section>
  );
}
