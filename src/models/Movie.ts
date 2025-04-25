import { z, defineCollection ***REMOVED*** from "astro:content";

export const MovieData = {
    name: z.string(),
    tmdbId: z.date(),
    tmdbPosterId: z.string(),
    categoryRatings: z.object({***REMOVED***),
***REMOVED***;
  
defineCollection({
    schema: z.object(MovieData),
***REMOVED***);
  