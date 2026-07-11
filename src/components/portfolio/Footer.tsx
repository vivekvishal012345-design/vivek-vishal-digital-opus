import { Heart } from "lucide-react";

export function Footer() {
  return (
    <footer className="border-t border-border py-10">
      <div className="container-x flex flex-col items-center justify-between gap-3 text-sm text-muted-foreground sm:flex-row">
        <p>© {new Date().getFullYear()} Vivek Vishal</p>
        <p className="inline-flex items-center gap-1.5">
          Made with <Heart className="h-3.5 w-3.5 fill-[color:var(--royal)] text-[color:var(--royal)]" />
        </p>
      </div>
    </footer>
  );
}
