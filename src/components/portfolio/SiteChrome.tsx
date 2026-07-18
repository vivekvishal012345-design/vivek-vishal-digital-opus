import type { ReactNode } from "react";
import { Nav } from "./Nav";
import { Footer } from "./Footer";

export function SiteChrome({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-background text-foreground">
      <Nav />
      <main id="top">{children}</main>
      <Footer />
    </div>
  );
}
