import { Section } from "./Section";
import { motion } from "framer-motion";
import { ArrowUpRight, LineChart, Search, PieChart, Sparkles, Trophy } from "lucide-react";

const projects = [
  { icon: PieChart, title: "Portfolio Management", tag: "Case Study", body: "Constructing and reviewing model portfolios across risk profiles, with a focus on asset allocation discipline." },
  { icon: Search, title: "Market Research", tag: "Ongoing", body: "Sector notes and macro tracking to inform product positioning and client conversations." },
  { icon: LineChart, title: "Financial Analysis", tag: "Series", body: "Company deep-dives with ratio analysis, valuation lenses, and forward-looking assumptions." },
  { icon: Sparkles, title: "Future Personal Projects", tag: "Coming Soon", body: "Space reserved for writing, tools, and public work — from finance explainers to policy commentary." },
];

const achievements = [
  { title: "Placeholder Achievement", body: "Space reserved for a notable award, recognition, or milestone worth celebrating." },
  { title: "Placeholder Achievement", body: "Space reserved for a professional distinction or academic honor." },
  { title: "Placeholder Achievement", body: "Space reserved for a community or leadership contribution." },
];

export function ProjectsAchievements() {
  return (
    <>
      <Section
        id="projects"
        eyebrow="Projects"
        title="Selected work."
        intro="A window into how I think about markets, analysis, and impact."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {projects.map((p, i) => (
            <motion.article
              key={p.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-elevated card-elevated-hover group p-7"
            >
              <div className="flex items-start justify-between">
                <div className="inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
                  <p.icon className="h-5 w-5" />
                </div>
                <span className="rounded-full border border-border px-2.5 py-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                  {p.tag}
                </span>
              </div>
              <h3 className="mt-6 flex items-center gap-2 text-lg font-medium tracking-tight">
                {p.title}
                <ArrowUpRight className="h-4 w-4 opacity-0 transition-all group-hover:opacity-100 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 text-[color:var(--royal)]" />
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        id="achievements"
        eyebrow="Achievements"
        title="Milestones worth marking."
        intro="Space kept for the wins to come — professional, academic, and personal."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {achievements.map((a, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-elevated card-elevated-hover p-6"
            >
              <Trophy className="h-5 w-5 text-[color:var(--royal)]" />
              <h3 className="mt-4 text-base font-medium tracking-tight">{a.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{a.body}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
