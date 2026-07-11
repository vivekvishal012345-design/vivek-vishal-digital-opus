import { Section } from "./Section";
import { motion } from "framer-motion";

const items = [
  {
    role: "Assistant Manager",
    company: "DSP Asset Managers",
    period: "Present",
    location: "Nagpur, India",
    points: [
      "Manage distributor relationships across the region — supporting IFAs and partner firms with product queries, servicing, and day-to-day engagement.",
      "Position mutual fund and investment products with advisors through fund updates, portfolio commentary, and category-level conversations.",
      "Drive business development by identifying growth opportunities within the existing advisor network and onboarding new partners.",
      "Communicate market developments and fund performance clearly, so advisors can guide their clients with confidence.",
      "Own client servicing at a partner level — resolving operational queries end-to-end and ensuring a smooth investor experience.",
    ],
  },
  {
    role: "Finance Intern",
    company: "Central Coalfields Limited (CCL)",
    period: "Summer Internship",
    location: "Ranchi, India",
    points: [
      "Studied the organisation's cost structure across key operational heads and identified areas worth reviewing.",
      "Worked on budget review and variance analysis, comparing planned vs. actual spend across departments.",
      "Assisted with internal financial reporting workflows and understood how figures flowed from source to statement.",
      "Presented the final findings and recommendations to the senior finance team at the close of the engagement.",
    ],
  },
];

export function Experience() {
  return (
    <Section
      id="experience"
      eyebrow="Experience"
      title="Where I've worked, and what I've learned."
      intro="Roles that have shaped how I think about finance, markets, and relationships."
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
