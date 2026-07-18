import { Linkedin, Mail, ArrowUp } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { navLinks } from "./Nav";

const EMAIL = "hello@vivekvishal.com";
const LINKEDIN = "https://www.linkedin.com/in/vivekvishal";

export function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });
  return (
    <footer className="border-t border-border mt-16">
      <div className="container-x py-14">
        <div className="grid gap-10 lg:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <div className="flex items-center gap-2 font-display text-lg tracking-tight">
              <span className="grid h-8 w-8 place-items-center rounded-md bg-[color:var(--royal)] text-white font-semibold">
                V
              </span>
              Vivek Vishal
            </div>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              A long-term personal site — writing, work, and the things I return to.
              Built to grow slowly, one section at a time.
            </p>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Navigate
            </p>
            <ul className="mt-4 grid grid-cols-2 gap-y-2 text-sm">
              {navLinks.map((l) => (
                <li key={l.to}>
                  <Link
                    to={l.to}
                    className="text-muted-foreground transition-colors hover:text-foreground"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <p className="text-xs font-medium uppercase tracking-[0.18em] text-muted-foreground">
              Elsewhere
            </p>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`mailto:${EMAIL}`}
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  {EMAIL}
                </a>
              </li>
              <li>
                <a
                  href={LINKEDIN}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-muted-foreground transition-colors hover:text-foreground"
                >
                  LinkedIn
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-border pt-6 text-xs text-muted-foreground sm:flex-row sm:items-center">
          <p>© {new Date().getFullYear()} Vivek Vishal. Nagpur, India.</p>
          <div className="flex items-center gap-2">
            <a
              href={`mailto:${EMAIL}`}
              aria-label="Email"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:border-[color:var(--royal)]/50 hover:text-[color:var(--royal)] active:scale-95"
            >
              <Mail className="h-4 w-4" />
            </a>
            <a
              href={LINKEDIN}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:border-[color:var(--royal)]/50 hover:text-[color:var(--royal)] active:scale-95"
            >
              <Linkedin className="h-4 w-4" />
            </a>
            <button
              type="button"
              onClick={scrollTop}
              aria-label="Back to top"
              className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:border-[color:var(--royal)]/50 hover:text-[color:var(--royal)] active:scale-95"
            >
              <ArrowUp className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
