// @lovable.dev/vite-tanstack-config already includes TanStack Start, React, Tailwind,
// tsconfig paths, and the @ alias — do NOT add them manually.
//
// Static build for GitHub Pages:
// - nitro disabled (no server runtime is deployed)
// - every route is prerendered to its own index.html (full SEO metadata in HTML)
// - an SPA shell is emitted as 404.html so any other URL still boots the client router
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
    // SPA shell: GitHub Pages serves 404.html for any URL without a file, which
    // boots the client router at the requested path (deep links, future routes).
    spa: {
      enabled: true,
      maskPath: "/__spa-shell",
      prerender: { outputPath: "/404.html", crawlLinks: false, retryCount: 0 },
    },
    prerender: { enabled: true, crawlLinks: false, autoSubfolderIndex: true },
    pages: [
      ...routes.map((path) => ({ path, prerender: { enabled: true } })),
    ],
  },
});
