import { z, defineCollection } from "astro:content";

export const MovieData = {
    name: z.string(),
    tmdbId: z.date(),
    tmdbPosterId: z.string(),
    releaseDate: z.string(),
    categoryRatings: z.object({}),
};
  
defineCollection({
    schema: z.object(MovieData),
});
  