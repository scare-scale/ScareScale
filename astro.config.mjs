import { defineConfig ***REMOVED*** from "astro/config";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";
import robotsTxt from "astro-robots-txt";

const domain = "scarescale.com";

// https://astro.build/config
export default defineConfig({
  site: "https://" + domain,
  build: {
    format: "file",
  ***REMOVED***,
  output: "static",
  image: {
    remotePatterns: [{ protocol: "https" ***REMOVED***],
  ***REMOVED***,
  integrations: [
    tailwind(),
    sitemap(),
    robotsTxt({
      sitemap: [`https://${domain***REMOVED***/sitemap-index.xml`],
      policy: [
        {
          userAgent: "*",
          allow: "/"
        ***REMOVED***,
      ],
    ***REMOVED***),
  ],
  server: {
    apiPrefix: "api",
  ***REMOVED***,
***REMOVED***);
