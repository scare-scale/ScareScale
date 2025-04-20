import { defineConfig ***REMOVED*** from 'astro/config';
import tailwind from "@astrojs/tailwind";

***REMOVED***act from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file'
  ***REMOVED***,
  integrations: [tailwind(), react()]
***REMOVED***);