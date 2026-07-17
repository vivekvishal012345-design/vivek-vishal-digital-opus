import { Linkedin, Mail, ArrowUp } from "lucide-react";

const EMAIL = "hello@vivekvishal.com";
const LINKEDIN = "https://www.linkedin.com/in/vivekvishal";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-x flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Vivek Vishal. All rights reserved.</p>
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
          <a
            href="#top"
            aria-label="Back to top"
            className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border transition-all hover:border-[color:var(--royal)]/50 hover:text-[color:var(--royal)] active:scale-95"
          >
            <ArrowUp className="h-4 w-4" />
          </a>
        </div>
      </div>
    </footer>
  );
}
