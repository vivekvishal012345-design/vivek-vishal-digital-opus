// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind,
// tsconfig paths, and the @ alias — do NOT add them manually.
//
// Static build for GitHub Pages (output: dist/client):
// - nitro disabled: no server runtime is deployed
// - every route is prerendered to its own <route>/index.html with full head metadata,
//   so direct navigation and refresh are served as real files
// - /404 is prerendered to 404.html; GitHub Pages serves it for any unknown URL
import { defineConfig } from "@lovable.dev/vite-tanstack-config";

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
  "/sitemap.xml",
];

export default defineConfig({
  nitro: false,
  tanstackStart: {
    prerender: { enabled: true, crawlLinks: false, autoSubfolderIndex: true },
    pages: [
      ...routes.map((path) => ({ path, prerender: { enabled: true } })),
      { path: "/404", prerender: { enabled: true, outputPath: "/404.html" } },
    ],
  },
});
