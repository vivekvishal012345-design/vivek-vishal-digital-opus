import { Section } from "./Section";
import { GraduationCap, Award, BookOpen, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    icon: GraduationCap,
    degree: "MBA — Finance",
    school: "Institute of Management, Nirma University",
    year: "2022 – 2024",
    detail:
      "Specialised in Finance with coursework across corporate finance, investment analysis, financial markets, and derivatives. Engaged with live projects, case competitions, and a summer internship in the finance function of a public-sector enterprise.",
  },
  {
    icon: BookOpen,
    degree: "Bachelor of Commerce (B.Com)",
    school: "Ranchi University",
    year: "2017 – 2020",
    detail:
      "Undergraduate degree in commerce covering accounting, economics, business law, and financial management — the foundation on which the rest of the finance journey has been built.",
  },
];

const certs = [
  {
    title: "NISM Series V-A",
    detail: "Mutual Fund Distributors Certification — the core regulatory qualification for advising on mutual funds in India.",
  },
  {
    title: "NISM Certifications",
    detail: "Additional NISM modules completed to strengthen understanding across investment products and market operations.",
  },
  {
    title: "Continuous Learning",
    detail: "Currently expanding expertise through continuous learning in capital markets and investment products.",
    icon: Sparkles,
  },
];

export function EducationCerts() {
  return (
    <>
      <Section
        id="education"
        eyebrow="Education"
        title="Formal grounding."
        intro="Degrees earned and the thinking they shaped."
      >
        <div className="grid gap-5 sm:grid-cols-2">
          {education.map((e, i) => (
            <motion.div
              key={e.degree}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-elevated card-elevated-hover p-7"
            >
              <div className="mb-4 inline-flex h-10 w-10 items-center justify-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
                <e.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-medium tracking-tight">{e.degree}</h3>
              <p className="mt-1 text-sm text-[color:var(--royal)]">{e.school}</p>
              <p className="mt-0.5 text-xs uppercase tracking-widest text-muted-foreground">{e.year}</p>
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="certifications"
        eyebrow="Certifications"
        title="Credentials in hand."
        intro="Regulatory certifications completed, with more in progress."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {certs.map((c, i) => {
            const Icon = c.icon ?? Award;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="card-elevated card-elevated-hover p-6"
              >
                <Icon className="h-5 w-5 text-[color:var(--royal)]" />
                <h3 className="mt-4 text-base font-medium tracking-tight">{c.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
              </motion.div>
            );
          })}
        </div>
      </Section>
    </>
  );
}
