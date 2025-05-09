import { defineCollection, z } from 'astro:content';

const movieCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    tmdbId: z.string(),
    tmdbPosterId: z.string(),
    releaseDate: z.string(),
    categoryRatings: z.object({
      gore: z.number(),
      creepy: z.number(),
      jumpscares: z.number(),
      suspense: z.number(),
      psychological: z.number(),
    }),
  }),
});

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

export const collections = {
  movie: movieCollection,
  page: pageCollection,
};
