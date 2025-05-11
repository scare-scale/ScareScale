import { allMovies } from '../../content.config';

export async function GET() {
  const filteredContent = allMovies.map(({ rendered, ...rest }) => rest);

  return new Response(JSON.stringify(filteredContent), {
    headers: { 'Content-Type': 'application/json' },
  });
}
