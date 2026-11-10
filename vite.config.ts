// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind,
// tsconfig paths, and the @ alias — do NOT add them manually.
//
// Static build for GitHub Pages (output: dist/client):
// - nitro disabled: no server runtime is deployed
// - every route is prerendered to its own <route>/index.html with full head metadata,
//   so direct navigation and refresh are served as real files
// - /not-found is prerendered to 404.html; GitHub Pages serves it for any unknown URL
import { defineConfig } from "@lovable.dev/vite-tanstack-config";
import { existsSync, readdirSync } from "node:fs";

// One static page per published market report file in content/markets/<date>/<type>.json
const reportDir = "content/markets";
const reportRoutes = existsSync(reportDir)
  ? readdirSync(reportDir).filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d)).flatMap((d) =>
      readdirSync(`${reportDir}/${d}`).filter((f) => f.endsWith(".json")).map((f) => `/markets/archive/${d}/${f.slice(0, -5)}`),
    )
  : [];

const routes = [
  "/",
  "/work",
  "/writing",
  "/library",
  "/photography",
  "/projects",
  "/now",
  "/principles",
  "/contact",
  "/markets",
  "/markets/opening-brief",
  "/markets/market-review",
  // retired formats: still prerendered so existing links work (noindex, not in sitemap)
  "/markets/opening-bell",
  "/markets/mid-market-review",
  "/markets/daily-study",
  "/markets/risk-monitor",
  "/markets/archive",
  ...reportRoutes,
  "/sitemap.xml",
];

export default defineConfig({
  nitro: false,
  tanstackStart: {
    prerender: { enabled: true, crawlLinks: false, autoStaticPathsDiscovery: false, autoSubfolderIndex: true },
    pages: [
      ...routes.map((path) => ({ path, prerender: { enabled: true } })),
      { path: "/not-found", prerender: { enabled: true, outputPath: "/404.html" } },
    ],
  },
});
