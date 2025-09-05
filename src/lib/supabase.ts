import { createClient } from "@supabase/supabase-js";
import type { Movie } from "../models/Movie";
import type { Review } from "../models/Review";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export const signUp = async (email: string, password: string, displayName: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        display_name: displayName
      },
    },
  });
  return { data, error };
};

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  });
  return { data, error };
};

export const signOut = async () => {
  const { error } = await supabase.auth.signOut();
  return { error };
};

export const getCurrentUser = async () => {
  const { data: { user }, error } = await supabase.auth.getUser();
  return user;
};

export const isLoggedIn = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return true;
  }
  return false;
};

export const submitReview = async (movie: Movie, review: Review, update: boolean) => {
  const user = await getCurrentUser();

  if (!user) throw new Error('User must be authenticated to submit a review');

  if (update) {
    // Update existing review
    return await supabase
      .from('reviews')
      .update({
        content: review.content,
        categories: review.categories,
      })
      .eq('movie_id', movie.id)
      .eq('user_id', user.id);
  } else {
    // Insert new review
    return await supabase
      .from('reviews')
      .insert([
        {
          movie_id: movie.id,
          user_id: user.id,
          type: review.type,
          content: review.content,
          categories: review.categories,
        },
      ]);
  }
};

export const getUserReview = async (movieId: string) => {
  const user = await getCurrentUser();

  if (!user) return null;

  const { data, error } = await supabase
    .from('reviews')
    .select('movie_id, user_id, type, content, categories')
    .eq('movie_id', movieId)
    .eq('user_id', user.id)
    .eq('type', 'user');

  if (error) {
    throw new Error(error.message);
  }

  return data && data.length > 0 ? data[0] : null;
};

export const queryMovies = async () => {
    let { data: movies, error } = await supabase.from('movies')
    .select(`
      id,
      name,
      tmdbPosterId,
      tmdbBackdropId,
      releaseDate,
      synopsis,
      reviews ( type, content, categories )
    `)

    if (error) {
      throw new Error(error.message);
    }

    return movies;
}