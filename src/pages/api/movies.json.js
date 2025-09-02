import { movies } from '../../lib/movies';

export async function GET() {
  const filteredContent = movies.getAll().map(({ rendered, ...rest }) => rest);

  return new Response(JSON.stringify(filteredContent), {
    headers: { 'Content-Type': 'application/json' },
  });
}
