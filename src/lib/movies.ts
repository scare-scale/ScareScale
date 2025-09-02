import { queryMovies } from "../lib/supabase";
import { Movies } from "../models/Movies";

const createMovies = async () => {
    const movieEntries = await queryMovies();
    if (!movieEntries || movieEntries.length === 0) {
      return Movies.empty();
    }
    return Movies.fromSupabaseResponse(movieEntries);
  };
  
export const movies: Movies = await createMovies();