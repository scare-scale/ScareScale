import { createMovies } from '../../lib/movies';

export async function GET() {
  const movies = await createMovies();
  const filteredContent = movies.getAll().map(({ rendered, ...rest }) => rest);

  return new Response(JSON.stringify(filteredContent), {
    headers: {
      'Content-Type': 'application/json',
      'Cache-Control': 'public, s-maxage=300, stale-while-revalidate=60',
    },
  });
}
