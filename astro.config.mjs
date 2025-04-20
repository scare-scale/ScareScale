import { defineConfig } from 'astro/config';
import tailwind from "@astrojs/tailwind";

import react from "@astrojs/react";

// https://astro.build/config
export default defineConfig({
  build: {
    format: 'file'
  },
  integrations: [tailwind(), react()]
});