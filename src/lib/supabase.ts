import { createClient } from "@supabase/supabase-js";
import type { Movie } from "../models/Movie";
import type { Review } from "../models/Review";
import { Movies } from "../models/Movies";

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
      emailRedirectTo: `${window.location.origin}/auth`
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

export const resetPassword = async (email: string) => {
  const { data, error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${window.location.origin}/auth?mode=reset`,
  });
  return { data, error };
};

export const updatePassword = async (newPassword: string) => {
  const { data, error } = await supabase.auth.updateUser({
    password: newPassword,
  });
  return { data, error };
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

export const getUserReviewCount = async (): Promise<number> => {
  const user = await getCurrentUser();
  if (!user) return 0;

  const { count, error } = await supabase
    .from('reviews')
    .select('*', { count: 'exact', head: true })
    .eq('user_id', user.id)
    .eq('type', 'user');

  if (error) throw new Error(error.message);
  return count ?? 0;
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
    reviews ( type, content, categories, profiles (display_name) )
  `)

  if (error) {
    throw new Error(error.message);
  }

  return movies;
};

export const searchMovies = async (q: string, limit: number = 10) => {
  const { data, error } = await supabase
    .from('movies')
    .select('id, name, tmdbPosterId, releaseDate')
    .ilike('name', `%${q}%`)
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
};

export const getMovieReviews = async (movieId: number) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      movie_id,
      user_id,
      type,
      content,
      categories,
      created_at,
      profiles (
        display_name
      )
    `)
    .eq('movie_id', movieId)
    .order('created_at', { ascending: false });

  if (error) throw new Error(error.message);
  return data ?? [];
};

const TMDB_POSTER_BASE_URL_SUPABASE = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

export const getMovieBySlug = async (slug: string) => {
  // Slug format: "movie-name-year" (year is always 4-digit at the end)
  const lastDashIdx = slug.lastIndexOf('-');
  if (lastDashIdx === -1) return null;

  const year = slug.substring(lastDashIdx + 1);
  if (!/^\d{4}$/.test(year)) return null;

  const namePart = slug.substring(0, lastDashIdx).replace(/-/g, ' ');

  const { data, error } = await supabase
    .from('movies')
    .select('id, name, tmdbPosterId, releaseDate, synopsis')
    .ilike('name', `%${namePart}%`)
    .like('releaseDate', `%/${year}`)
    .limit(5);

  if (error || !data || data.length === 0) return null;

  for (const m of data) {
    const candidateSlug = m.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + year;
    if (candidateSlug === slug) {
      return {
        id: m.id,
        name: m.name,
        releaseYear: parseInt(year),
        synopsis: m.synopsis,
        posterUrl: `${TMDB_POSTER_BASE_URL_SUPABASE}${m.tmdbPosterId}`,
      };
    }
  }

  return null;
};

export const getMoviesWithCurrentUserReview = async () => {
  const user = await getCurrentUser();

  if (!user) return [];

  const { data, error } = await supabase
    .from('reviews')
    .select(`
      type,
      content,
      categories,
      user_id,
      movies (
        id,
        name,
        tmdbPosterId,
        tmdbBackdropId,
        releaseDate,
        synopsis
      )
    `)
    .eq('user_id', user.id);

  if (error) {
    throw new Error(error.message);
  }

  if (!data || data.length === 0) {
    return [];
  }

  // Reform movies json
  return data.map((item) => {
    return {
          ...item.movies,
          reviews: [{...item}]
        }
  });
};

export const getLatestReviews = async (limit: number = 12) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      movie_id,
      user_id,
      type,
      content,
      categories,
      created_at,
      movies (
        id,
        name,
        tmdbPosterId,
        releaseDate
      ),
      profiles (
        display_name
      )
    `)
    .eq('type', 'user')
    .order('created_at', { ascending: false })
    .limit(limit);

  if (error) throw new Error(error.message);
  return data ?? [];
};

export const getLeaderboard = async (limit: number = 10) => {
  const { data, error } = await supabase
    .from('reviews')
    .select(`
      user_id,
      profiles (
        display_name
      )
    `)
    .eq('type', 'user');

  if (error) throw new Error(error.message);

  // Group and count reviews per user client-side
  const countsMap: Record<string, { userId: string; displayName: string; count: number }> = {};

  (data ?? []).forEach((review: any) => {
    const userId = review.user_id;
    const displayName = review.profiles?.display_name || 'Anonymous';
    if (!countsMap[userId]) {
      countsMap[userId] = { userId, displayName, count: 0 };
    }
    countsMap[userId].count++;
  });

  return Object.values(countsMap)
    .sort((a, b) => b.count - a.count)
    .slice(0, limit);
};