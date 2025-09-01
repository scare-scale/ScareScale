import { defineCollection, z } from "astro:content";
import { queryMovies } from "./lib/supabase";
import { Movies } from "./models/Movies";

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const createMovies = async () => {
  const movieEntries = await queryMovies();
  if (!movieEntries || movieEntries.length === 0) {
    return Movies.empty();
  }
  return Movies.fromSupabaseResponse(movieEntries);
};

export const movies: Movies = await createMovies();

export const collections = {
  page: pageCollection,
};
