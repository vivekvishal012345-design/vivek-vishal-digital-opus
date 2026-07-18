import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  note: string;
  children?: ReactNode;
}

export function ComingSoon({ note, children }: Props) {
  return (
    <section className="pb-24 sm:pb-32">
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.5 }}
          className="card-elevated relative overflow-hidden p-8 sm:p-12"
        >
          <div
            className="pointer-events-none absolute -right-24 -top-24 h-64 w-64 rounded-full bg-[color:var(--royal)] opacity-[0.08] blur-3xl"
            aria-hidden
          />
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-3 py-1 text-xs uppercase tracking-[0.16em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--royal)]" />
            In progress
          </div>
          <p className="max-w-2xl text-base leading-relaxed text-foreground/85 sm:text-lg">
            {note}
          </p>
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </section>
  );
}
