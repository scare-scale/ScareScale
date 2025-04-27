import { getCollection ***REMOVED*** from "astro:content";
import type { Movie ***REMOVED*** from "../../../models/Movie";
import { calculateOverallRating ***REMOVED*** from "../../../utils/scoreUtils";

export async function GET({ params ***REMOVED***: { params: { tmdbId: String ***REMOVED*** ***REMOVED***) {
  const { tmdbId ***REMOVED*** = params;
  const movies = await getCollection("movie");
  const movie = movies.find(
    (movie) =>
      movie.data.tmdbId.toString() === tmdbId.toString()
  );

  if (!movie) {
    return new Response(JSON.stringify({ error: "Movie not found" ***REMOVED***), {
      status: 404,
    ***REMOVED***);
  ***REMOVED***

  return new Response(
    JSON.stringify({
      data: {
        ...movie.data,
        link: getLink(movie),
        scareScaleRating: calculateOverallRating(movie.data.categoryRatings),
      ***REMOVED***,
    ***REMOVED***),
    {
      status: 200,
      headers: { "Content-Type": "application/json" ***REMOVED***,
    ***REMOVED***
  );
***REMOVED***

const getLink = (movie: Movie) => {
  return `https://scarescale.com/${movie.collection***REMOVED***/${movie.slug***REMOVED***`;
***REMOVED***;

// Pre-generate all paths for static builds
export async function getStaticPaths() {
  const movies = await getCollection("movie");
  return movies.map((movie) => ({
    params: { tmdbId: movie.data.tmdbId.toString() ***REMOVED***,
  ***REMOVED***));
***REMOVED***
