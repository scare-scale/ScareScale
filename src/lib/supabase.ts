import { createClient } from "@supabase/supabase-js";

export const supabase = createClient(
  import.meta.env.SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export const queryMovies = async () => {
    let { data: movies, error } = await supabase.from('movies')
    .select(`  
      id,
      name,
      tmdbPosterId,
      tmdbBackdropId,
      releaseDate,
      synopsis,
      reviews ( type, review, categories )
    `)

    if (error) {
      throw new Error(error.message);
    }

    return movies;
}