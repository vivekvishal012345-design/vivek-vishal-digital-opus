import { motion } from "framer-motion";
import type { ReactNode } from "react";

interface Props {
  eyebrow: string;
  title: string;
  intro?: string;
  children?: ReactNode;
}

export function PageHeader({ eyebrow, title, intro, children }: Props) {
  return (
    <header className="relative overflow-hidden pt-32 pb-10 sm:pt-36 sm:pb-14">
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[360px] w-[720px] -translate-x-1/2 rounded-full bg-[color:var(--royal)] opacity-[0.08] blur-[120px]" />
      </div>
      <div className="container-x">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-2xl"
        >
          <div className="mb-4 inline-flex items-center gap-2 text-xs font-medium uppercase tracking-[0.18em] text-[color:var(--royal)]">
            <span className="h-px w-6 bg-[color:var(--royal)]" />
            {eyebrow}
          </div>
          <h1 className="font-display text-4xl font-medium tracking-tight sm:text-5xl md:text-6xl">
            {title}
          </h1>
          {intro && (
            <p className="mt-5 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {intro}
            </p>
          )}
          {children && <div className="mt-6">{children}</div>}
        </motion.div>
      </div>
    </header>
  );
}
