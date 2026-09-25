// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind,
// tsconfig paths, and the @ alias — do NOT add them manually.
//
// Static build for GitHub Pages:
// - nitro disabled (no server runtime is deployed)
// - every route is prerendered to its own index.html (full SEO metadata in HTML)
// - a not-found page is emitted as 404.html; the client router hydrates at the
//   requested URL, so unknown paths show the site's own 404 view
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
    prerender: { outputPath: "/404.html", crawlLinks: false, retryCount: 0 },
    },
    prerender: { enabled: true, crawlLinks: false, autoSubfolderIndex: true },
    pages: [
      ...routes.map((path) => ({ path, prerender: { enabled: true } })),
      // Not-found page; GitHub Pages serves 404.html for any URL without a file.
      { path: "/404", prerender: { enabled: true, outputPath: "/404.html" } },
    ],
  },
});
