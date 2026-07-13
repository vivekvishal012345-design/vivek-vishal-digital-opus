import { Section } from "./Section";
import { Mail, Linkedin, MapPin, Send, FileDown, Copy, Check } from "lucide-react";
import { useState, type FormEvent } from "react";
import { motion } from "framer-motion";
import { toast } from "sonner";


const EMAIL = "vivekvishal.contact@gmail.com";
const LINKEDIN = "https://www.linkedin.com/in/vivekvishal";
const RESUME = "/resume.pdf";

export function Contact() {
  const [sent, setSent] = useState(false);

  const onSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get("name") ?? "");
    const email = String(data.get("email") ?? "");
    const message = String(data.get("message") ?? "");
    const subject = encodeURIComponent(`Website enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${EMAIL}?subject=${subject}&body=${body}`;
    setSent(true);
    form.reset();
  };

  return (
    <Section
      id="contact"
      eyebrow="Contact"
      title="Let's talk."
      intro="For opportunities, collaborations, or a considered conversation about finance and markets."
    >
      <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr]">
        <div className="space-y-4">
          <a
            href={`mailto:${EMAIL}`}
            className="card-elevated card-elevated-hover flex items-center gap-4 p-5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
              <Mail className="h-5 w-5" />
            </div>
            <div className="min-w-0">
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Email</p>
              <p className="truncate text-sm font-medium">{EMAIL}</p>
            </div>
          </a>
          <a
            href={LINKEDIN}
            target="_blank"
            rel="noopener noreferrer"
            className="card-elevated card-elevated-hover flex items-center gap-4 p-5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
              <Linkedin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">LinkedIn</p>
              <p className="text-sm font-medium">Connect with me</p>
            </div>
          </a>
          <a
            href={RESUME}
            download
            className="card-elevated card-elevated-hover flex items-center gap-4 p-5"
          >
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
              <FileDown className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Resume</p>
              <p className="text-sm font-medium">Download PDF</p>
            </div>
          </a>
          <div className="card-elevated flex items-center gap-4 p-5">
            <div className="grid h-11 w-11 place-items-center rounded-lg bg-[color:var(--royal)]/12 text-[color:var(--royal)]">
              <MapPin className="h-5 w-5" />
            </div>
            <div>
              <p className="text-xs uppercase tracking-widest text-muted-foreground">Location</p>
              <p className="text-sm font-medium">Nagpur, India</p>
            </div>
          </div>
        </div>

        <motion.form
          onSubmit={onSubmit}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.5 }}
          className="card-elevated p-6 sm:p-8"
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Name</span>
              <input
                required
                name="name"
                autoComplete="name"
                className="rounded-lg border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[color:var(--royal)] focus:ring-2 focus:ring-[color:var(--royal)]/25"
              />
            </label>
            <label className="flex flex-col gap-1.5">
              <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Email</span>
              <input
                required
                type="email"
                name="email"
                autoComplete="email"
                className="rounded-lg border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[color:var(--royal)] focus:ring-2 focus:ring-[color:var(--royal)]/25"
              />
            </label>
          </div>
          <label className="mt-4 flex flex-col gap-1.5">
            <span className="text-xs font-medium uppercase tracking-widest text-muted-foreground">Message</span>
            <textarea
              required
              name="message"
              rows={5}
              className="resize-none rounded-lg border border-border bg-[color:var(--surface)] px-3.5 py-2.5 text-sm outline-none transition focus:border-[color:var(--royal)] focus:ring-2 focus:ring-[color:var(--royal)]/25"
            />
          </label>
          <div className="mt-5 flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              {sent ? "Opening your email client…" : "Responses within a couple of business days."}
            </p>
            <button
              type="submit"
              className="inline-flex items-center gap-2 rounded-full bg-[color:var(--royal)] px-5 py-2.5 text-sm font-medium text-white transition hover:brightness-110"
            >
              <Send className="h-4 w-4" />
              Send message
            </button>
          </div>
        </motion.form>
      </div>
    </Section>
  );
}
