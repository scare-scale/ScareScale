import { createClient } from "@supabase/supabase-js";
import type { Movie } from "../models/Movie";
import type { Categories } from "../models/Categories";
import type { Review } from "../models/Review";

export const supabase = createClient(
  import.meta.env.PUBLIC_SUPABASE_URL,
  import.meta.env.PUBLIC_SUPABASE_ANON_KEY,
);

export const signUp = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
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
  const { data: { user } } = await supabase.auth.getUser();
  return user;
};

export const isLoggedIn = async (): Promise<boolean> => {
  const { data: { user } } = await supabase.auth.getUser();
  if (user) {
    return true;
  }
  return false;
};

export const submitReview = async (movie: Movie, review: Review) => {
  const user = await getCurrentUser();

  if (!user) throw new Error('User must be authenticated to submit a review');

  const { data, error } = await supabase
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

  return { data, error };
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