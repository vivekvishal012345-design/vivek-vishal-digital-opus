import { Section } from "./Section";
import { GraduationCap, Award, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const education = [
  {
    icon: GraduationCap,
    degree: "MBA — Finance",
    school: "Post-Graduate Program",
    detail: "Specialisation in Finance with coursework in corporate finance, investments, and financial markets.",
  },
  {
    icon: BookOpen,
    degree: "Bachelor's Degree",
    school: "Undergraduate",
    detail: "Foundation in analytical thinking, quantitative methods, and business fundamentals.",
  },
];

const certs = [
  { title: "NISM Certifications", detail: "Regulatory certifications for the Indian securities market." },
  { title: "Investment Products", detail: "Continuing education across mutual funds and capital market products." },
  { title: "Future Finance Certifications", detail: "CFA / FRM level programs planned as the practice deepens." },
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
              <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{e.detail}</p>
            </motion.div>
          ))}
        </div>
      </Section>

      <Section
        id="certifications"
        eyebrow="Certifications"
        title="Continuous learning."
        intro="Credentials in hand and on the way."
      >
        <div className="grid gap-5 md:grid-cols-3">
          {certs.map((c, i) => (
            <motion.div
              key={c.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="card-elevated card-elevated-hover p-6"
            >
              <Award className="h-5 w-5 text-[color:var(--royal)]" />
              <h3 className="mt-4 text-base font-medium tracking-tight">{c.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{c.detail}</p>
            </motion.div>
          ))}
        </div>
      </Section>
    </>
  );
}
