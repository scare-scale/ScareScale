import { queryMovies } from "../lib/supabase";
import { Movies } from "../models/Movies";

export const createMovies = async (): Promise<Movies> => {
    const movieEntries = await queryMovies();
    if (!movieEntries || movieEntries.length === 0) {
      return Movies.empty();
    }
    return Movies.fromSupabaseResponse(movieEntries);
};
