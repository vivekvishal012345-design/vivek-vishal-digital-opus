import { AnimatePresence, motion, useScroll, useSpring } from "framer-motion";
import { Moon, Sun, Menu, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import { useTheme } from "@/hooks/use-theme";

export const navLinks = [
  { to: "/", label: "Home" },
  { to: "/work", label: "Work" },
  { to: "/writing", label: "Writing" },
  { to: "/library", label: "Library" },
  { to: "/photography", label: "Photography" },
  { to: "/projects", label: "Projects" },
  { to: "/now", label: "Now" },
  { to: "/principles", label: "Principles" },
  { to: "/contact", label: "Contact" },
] as const;

export function Nav() {
  const { theme, toggle, mounted } = useTheme();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, { stiffness: 120, damping: 30, mass: 0.2 });

  useEffect(() => {
    const on = () => setScrolled(window.scrollY > 12);
    on();
    window.addEventListener("scroll", on, { passive: true });
    return () => window.removeEventListener("scroll", on);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  const isActive = (to: string) =>
    to === "/" ? pathname === "/" : pathname === to || pathname.startsWith(to + "/");

  return (
    <>
      <motion.div
        style={{ scaleX: progress }}
        className="fixed left-0 right-0 top-0 z-[70] h-[2px] origin-left bg-[color:var(--royal)]"
      />
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
          scrolled || open ? "glass border-b border-border" : "bg-transparent"
        }`}
      >
        <nav className="container-x flex h-16 items-center justify-between gap-4">
          <Link
            to="/"
            onClick={() => setOpen(false)}
            className="flex items-center gap-2 font-display text-lg tracking-tight"
          >
            <span className="grid h-8 w-8 place-items-center rounded-md bg-[color:var(--royal)] text-white font-semibold">
              V
            </span>
            <span className="hidden sm:inline">Vivek Vishal</span>
          </Link>
          <div className="hidden items-center gap-0.5 lg:flex">
            {navLinks.map((l) => {
              const active = isActive(l.to);
              return (
                <Link
                  key={l.to}
                  to={l.to}
                  className={`relative rounded-full px-3 py-1.5 text-sm transition-colors ${
                    active ? "text-foreground" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {active && (
                    <motion.span
                      layoutId="nav-active"
                      className="absolute inset-0 -z-10 rounded-full bg-[color:var(--accent)]"
                      transition={{ type: "spring", stiffness: 380, damping: 32 }}
                    />
                  )}
                  {l.label}
                </Link>
              );
            })}
          </div>
          <div className="flex items-center gap-2">
            {mounted && (
              <button
                onClick={toggle}
                aria-label="Toggle theme"
                className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border text-foreground transition-all hover:bg-accent active:scale-95"
              >
                {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
              </button>
            )}
            <button
              onClick={() => setOpen((v) => !v)}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              className="inline-flex h-10 w-10 items-center justify-center rounded-full border border-border transition-all active:scale-95 lg:hidden"
            >
              {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </button>
          </div>
        </nav>
      </header>

      <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 top-16 z-40 lg:hidden"
        >
          <div className="absolute inset-0 glass border-t border-border" />
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="container-x relative flex flex-col py-4"
          >
            {navLinks.map((l, i) => {
              const active = isActive(l.to);
              return (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: -8 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.03 }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className={`flex items-center justify-between rounded-lg px-3 py-3 text-base transition-colors ${
                      active
                        ? "bg-[color:var(--accent)] text-foreground"
                        : "text-muted-foreground hover:bg-[color:var(--accent)]/60 hover:text-foreground"
                    }`}
                  >
                    {l.label}
                    {active && (
                      <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--royal)]" />
                    )}
                  </Link>
                </motion.div>
              );
            })}
          </motion.div>
        </motion.div>
      )}
      </AnimatePresence>
    </>
  );
}
