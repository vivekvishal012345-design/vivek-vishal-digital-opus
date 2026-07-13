import { motion } from "framer-motion";
import { ArrowUpRight, FileDown, Linkedin, Mail, MapPin, User } from "lucide-react";
import { useState } from "react";

export function Hero() {
  const [imgOk, setImgOk] = useState(true);
  return (
    <section id="top" className="relative overflow-hidden pt-28 pb-16 sm:pt-32 sm:pb-20 md:pt-36 md:pb-24">

      {/* Ambient background */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-[color:var(--royal)] opacity-[0.10] blur-[120px]" />
        <div
          className="absolute inset-0 opacity-[0.35]"
          style={{
            backgroundImage:
              "radial-gradient(circle at 1px 1px, color-mix(in oklab, var(--foreground) 12%, transparent) 1px, transparent 0)",
            backgroundSize: "28px 28px",
            maskImage: "radial-gradient(ellipse at center, black 30%, transparent 75%)",
          }}
        />
      </div>

      <div className="container-x">
        <div className="grid items-center gap-12 lg:grid-cols-[1.3fr_1fr]">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-6 inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-3 py-1 text-xs text-muted-foreground"
            >
              <span className="relative flex h-1.5 w-1.5">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-emerald-500" />
              </span>
              Currently at DSP Asset Managers
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="text-5xl font-medium leading-[1.05] tracking-tight sm:text-6xl md:text-7xl"
            >
              <span className="text-gradient">Vivek Vishal</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
              className="mt-5 text-sm font-medium text-muted-foreground sm:text-base"
            >
              MBA (Finance) · Assistant Manager at DSP Asset Managers · Investment & Capital Markets Professional
            </motion.p>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
              className="mt-8 max-w-xl text-lg leading-relaxed text-foreground/85 sm:text-xl"
            >
              Helping investors make informed financial decisions while continuously building expertise in capital markets, investment products, and long-term wealth creation.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="mt-10 flex flex-wrap items-center gap-3"
            >
              <a
                href="/resume.pdf"
                download
                className="group inline-flex min-h-11 items-center gap-2 rounded-full bg-[color:var(--royal)] px-5 py-2.5 text-sm font-medium text-white shadow-lg shadow-[color:var(--royal)]/20 transition-all hover:brightness-110 hover:shadow-xl hover:shadow-[color:var(--royal)]/30 active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--royal)] focus-visible:ring-offset-2 focus-visible:ring-offset-background"
              >
                <FileDown className="h-4 w-4" />
                Download Resume
              </a>
              <a
                href="https://www.linkedin.com/in/vivekvishal"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-border bg-[color:var(--surface)] px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:bg-accent"
              >
                <Linkedin className="h-4 w-4" />
                Connect on LinkedIn
              </a>
              <a
                href="#contact"
                className="group inline-flex items-center gap-2 rounded-full border border-transparent px-5 py-2.5 text-sm font-medium text-foreground transition-colors hover:border-border"
              >
                <Mail className="h-4 w-4" />
                Contact Me
                <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.5 }}
              className="mt-10 flex items-center gap-2 text-sm text-muted-foreground"
            >
              <MapPin className="h-4 w-4" />
              Nagpur, India
            </motion.div>
          </div>

          {/* Portrait card */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm"
          >
            <div className="absolute -inset-4 rounded-3xl bg-gradient-to-br from-[color:var(--royal)]/30 via-transparent to-transparent blur-2xl" />
            <div className="relative h-full w-full overflow-hidden rounded-3xl border border-border bg-[color:var(--surface)] shadow-2xl shadow-[color:var(--royal)]/10">
              {imgOk ? (
                <img
                  src="/profile.jpg"
                  alt="Portrait of Vivek Vishal"
                  loading="eager"
                  decoding="async"
                  className="absolute inset-0 h-full w-full object-cover"
                  onError={() => setImgOk(false)}
                />
              ) : (
                <>
                  <div
                    className="absolute inset-0"
                    style={{
                      background:
                        "linear-gradient(135deg, color-mix(in oklab, var(--royal) 25%, transparent) 0%, transparent 60%)",
                    }}
                  />
                  <div className="absolute inset-0 grid place-items-center">
                    <div className="grid h-28 w-28 place-items-center rounded-full border border-border bg-[color:var(--card)] text-foreground/60">
                      <User className="h-12 w-12" strokeWidth={1.25} />
                    </div>
                  </div>
                </>
              )}

              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between rounded-xl border border-border bg-[color:var(--card)]/80 px-3 py-2 text-xs text-muted-foreground backdrop-blur">
                <span>Finance · Markets · Investments</span>
                <span className="text-[color:var(--royal)]">●</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
