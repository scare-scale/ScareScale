import rss from "@astrojs/rss";
import { getCollection } from "astro:content";

export async function get(context) {
  const movies = await getCollection("movie");
  return rss({
    title: "Scare Scale",
    description: "Horror Movie Ratings",
    site: context.site,
    trailingSlash: false,
    items: movies.map((movie) => ({
      title: movie.data.name,
      link: `/movie/${movie.slug}`,
      description: movie.body
    }))
  });
}