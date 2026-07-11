import { Section } from "./Section";
import { motion } from "framer-motion";
import { LineChart, Search, PieChart, GraduationCap, Briefcase, Award } from "lucide-react";

const projects = [
  {
    icon: PieChart,
    title: "Financial Cost Structure Analysis",
    tag: "Internship · CCL",
    body: "Completed during my summer internship at Central Coalfields Limited. Reviewed the cost structure across operational heads, worked on budget variance, and presented findings to the senior finance team.",
  },
  {
    icon: LineChart,
    title: "Mutual Fund Distribution",
    tag: "Ongoing · DSP",
    body: "Day-to-day work with distributors and advisors — product positioning, portfolio-level conversations, and helping partners serve their investors better.",
  },
  {
    icon: Search,
    title: "Market Research",
    tag: "Ongoing",
    body: "Continuous tracking of macroeconomic developments, fund positioning across categories, and investment themes shaping investor allocations.",
  },
];

const milestones = [
  {
    icon: GraduationCap,
    title: "MBA in Finance",
    body: "Graduated with a specialisation in Finance, building the analytical foundation for a career in capital markets.",
  },
  {
    icon: Award,
    title: "NISM Series V-A Certification",
    body: "Cleared the mutual fund distributors certification — the core regulatory credential for advising on mutual funds in India.",
  },
  {
    icon: Briefcase,
    title: "Assistant Manager at DSP Asset Managers",
    body: "Moved into a full-time asset management role, taking ownership of distributor relationships and product positioning.",
  },
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
              <h3 className="mt-6 text-lg font-medium tracking-tight">{p.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.body}</p>
            </motion.article>
          ))}
        </div>
      </Section>

      <Section
        id="achievements"
        eyebrow="Milestones"
        title="Professional milestones."
        intro="A timeline of career growth, certifications, and meaningful professional progress."
      >
        <div className="relative">
          <div className="absolute left-4 top-2 bottom-2 w-px bg-border sm:left-6" aria-hidden />
          <div className="space-y-6">
            {milestones.map((m, i) => (
              <motion.div
                key={m.title}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="relative pl-12 sm:pl-16"
              >
                <span className="absolute left-[11px] top-6 h-2.5 w-2.5 rounded-full bg-[color:var(--royal)] ring-4 ring-background sm:left-[19px]" />
                <div className="card-elevated card-elevated-hover p-6">
                  <div className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
                    <m.icon className="h-4.5 w-4.5" />
                  </div>
                  <h3 className="text-base font-medium tracking-tight">{m.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{m.body}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Section>
    </>
  );
}
