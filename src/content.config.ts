import { defineCollection, getCollection, z } from "astro:content";
import { calculateOverallRating, fearLevelText } from "./utils/scoreUtils";

const POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";

const movieCollection = defineCollection({
  schema: z.object({
    name: z.string(),
    tmdbId: z.string(),
    tmdbPosterId: z.string(),
    releaseDate: z.date(),
    categoryRatings: z.object({
      gore: z.number(),
      creepy: z.number(),
      jumpscares: z.number(),
      suspense: z.number(),
      psychological: z.number(),
    }),
  }),
});

const pageCollection = defineCollection({
  schema: z.object({
    title: z.string().optional(),
    description: z.string().optional(),
  }),
});

const getMovies = async () => {
  const movieEntries = await getCollection("movie");
  return movieEntries.map((movie) => {
    const posterUrl = `${POSTER_BASE_URL}${movie.data.tmdbPosterId}`;

    const scareScaleRating = calculateOverallRating(movie.data.categoryRatings);
    const scareScaleText = fearLevelText(scareScaleRating);
    const parsedDate = new Date(String(movie.data.releaseDate));
    const formattedDate = parsedDate.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });

    return {
      ...movie,
      posterUrl,
      scareScaleRating,
      scareScaleText,
      formattedDate,
      parsedDate,
      releaseYear: parsedDate.getFullYear()
    };
  });
};

export const allMovies = await getMovies();

export const upcomingMovies = (await getMovies())
    .filter((movie) => movie.parsedDate > new Date())
    .sort((a, b) => a.parsedDate.getTime() - b.parsedDate.getTime());

export const collections = {
  movie: movieCollection,
  page: pageCollection,
};
