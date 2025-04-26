import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

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
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt({
      sitemap: [`https://${domain}/sitemap-index.xml`],
      policy: [
        {
          userAgent: "*",
          allow: "/"
        },
      ],
    }),
  ],
});
