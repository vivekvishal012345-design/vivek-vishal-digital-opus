import { Section } from "./Section";
import { motion } from "framer-motion";

const items = [
  {
    role: "Assistant Manager",
    company: "DSP Asset Managers",
    period: "Present",
    location: "India",
    points: [
      "Drive distribution and relationship management across mutual fund and investment product lines.",
      "Partner with advisors and institutional stakeholders to grow assets under management.",
      "Deliver market updates, product insights, and portfolio guidance to key partners.",
    ],
  },
  {
    role: "Finance Intern",
    company: "Central Coalfields Limited (CCL)",
    period: "Internship",
    location: "India",
    points: [
      "Analysed operational finance workflows across procurement, budgeting, and reporting.",
      "Contributed to a live project on financial planning and cost analysis.",
      "Presented findings to senior finance leadership at the close of the engagement.",
    ],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="A steady climb through finance."
      intro="Roles held, work delivered, and lessons carried forward."
    >
      <div className="relative">
        <div className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-6" aria-hidden />
        <div className="space-y-6">
          {items.map((it, i) => (
            <motion.article
              key={it.role}
              initial={{ opacity: 0, x: -16 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.08, ease: [0.16, 1, 0.3, 1] }}
              className="relative pl-12 sm:pl-16"
            >
              <span className="absolute left-[11px] top-6 h-2.5 w-2.5 rounded-full bg-[color:var(--royal)] ring-4 ring-background sm:left-[19px]" />
              <div className="card-elevated card-elevated-hover p-6 sm:p-7">
                <div className="flex flex-wrap items-baseline justify-between gap-2">
                  <div>
                    <h3 className="text-lg font-medium tracking-tight">{it.role}</h3>
                    <p className="text-sm text-[color:var(--royal)]">{it.company}</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {it.period} · {it.location}
                  </div>
                </div>
                <ul className="mt-4 space-y-2">
                  {it.points.map((p) => (
                    <li key={p} className="flex gap-3 text-sm text-muted-foreground">
                      <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-[color:var(--royal)]" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </Section>
  );
}
