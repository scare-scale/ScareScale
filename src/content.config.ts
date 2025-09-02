import { defineCollection, z } from "astro:content";

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});



export const collections = {
  page: pageCollection,
};
