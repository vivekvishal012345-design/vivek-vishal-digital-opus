// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind,
// tsconfig paths, and the @ alias — do NOT add them manually.
//
// Static build for GitHub Pages:
// - nitro disabled (no server runtime is deployed)
// - every route is prerendered to its own index.html (full SEO metadata in HTML)
// - a rendered not-found page is emitted as 404.html for unknown URLs
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
      // Rendered not-found page; GitHub Pages serves it for any unknown URL.
      { path: "/404", prerender: { enabled: true, outputPath: "/404.html" } },
    ],
  },
});
