import { supabase } from '../../lib/supabase';

export const prerender = false;

const TMDB_POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

function parseReleaseYear(releaseDate) {
  if (!releaseDate) return '';
  const parts = String(releaseDate).split('/');
  return parts[2] ?? '';
}

function movieSlug(name, releaseDate) {
  const year = parseReleaseYear(releaseDate);
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + year;
}

export async function GET({ request }) {
  const url = new URL(request.url);
  const q = url.searchParams.get('q')?.trim() ?? '';

  if (q.length < 2) {
    return new Response(JSON.stringify([]), {
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const { data, error } = await supabase
    .from('movies')
    .select('id, name, tmdbPosterId, releaseDate')
    .ilike('name', `%${q}%`)
    .limit(10);

  if (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }

  const results = (data ?? []).map(movie => ({
    id: movie.id,
    name: movie.name,
    releaseYear: parseReleaseYear(movie.releaseDate),
    slug: movieSlug(movie.name, movie.releaseDate),
    posterUrl: `${TMDB_POSTER_BASE_URL}${movie.tmdbPosterId}`,
  }));

  return new Response(JSON.stringify(results), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, max-age=60',
    },
  });
}
