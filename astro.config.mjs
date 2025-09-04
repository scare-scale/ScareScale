import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";
import react from '@astrojs/react';
import vercel from "@astrojs/vercel";

const domain = "scarescale.com";

// https://astro.build/config
export default defineConfig({
  site: "https://" + domain,
  build: {
    format: "file",
  },

  image: {
    remotePatterns: [{ protocol: "https" }],
  },

  test: {
    include: ['src/**/*.{test,spec}.{js,mjs,cjs,ts,mts,cts,jsx,tsx}'],
    exclude: ['src/pages/**'],
    environment: 'jsdom',
    setupFiles: ['./src/__tests__/setup.ts'],
  },

  integrations: [
    tailwind(),
    react(),
    sitemap(),
    robotsTxt({
      sitemap: [`https://${domain}/sitemap-index.xml`],
      policy: [
        {
          userAgent: "*",
          allow: "/",
          disallow: ["/search", "/all"],
        },
      ],
    })
  ],

  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
    imageService: true,
    devImageService: 'sharp',
    edgeMiddleware: true,
    isr: false,
  }),
});
