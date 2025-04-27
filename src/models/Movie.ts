import { z, defineCollection ***REMOVED*** from "astro:content";

export const MovieData = {
  name: z.string(),
  tmdbId: z.date(),
  tmdbPosterId: z.string(),
  releaseDate: z.string(),
  categoryRatings: z.object({***REMOVED***),
***REMOVED***;

export type Movie = {
  data: typeof MovieData;
  slug: String;
  scareScaleRating: number;
  releaseDateParsed: Date;
***REMOVED***;

defineCollection({
  schema: z.object(MovieData),
***REMOVED***);
