import React, { useState, useEffect } from "react";
import { supabase } from "../lib/supabase";
import MovieCarousel from "./carousel/MovieCarousel";
import { Movies } from "../models/Movies";

const CATEGORY_KEYS = ["gore", "creepy", "suspense", "jumpscares", "psychological"];

const SearchResults = () => {
  const [movies, setMovies] = useState([]);
  const [query, setQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const q = params.get("q")?.trim() ?? "";
    setQuery(q);

    if (q.length < 1) {
      setLoading(false);
      return;
    }

    supabase
      .from("movies")
      .select(`
        id,
        name,
        tmdbPosterId,
        tmdbBackdropId,
        releaseDate,
        synopsis,
        reviews ( type, content, categories, profiles (display_name) )
      `)
      .ilike("name", `%${q}%`)
      .then(({ data, error }) => {
        if (error || !data) { setLoading(false); return; }

        const allMovies = Movies.fromSupabaseResponse(data).getAll();
        const sorted = allMovies.sort(
          (a, b) => b.getSummaryReview().overallRating - a.getSummaryReview().overallRating
        );

        // Shape data to what MovieCarousel expects
        const movieData = sorted.map((m) => {
          const review = m.getSummaryReview();
          return {
            slug:            m.slug,
            name:            m.name,
            releaseYear:     m.releaseYear,
            posterUrl:       m.posterUrl,
            hasReviews:      m.hasReviews(),
            isApproved:      m.isApproved(),
            isReleased:      m.isReleased,
            releaseDateText: m.releaseDateText,
            overallScore:    review.overallRating,
            scoreText:       review.scoreText,
            topCategories:   m.getTopCategories().slice(0, 2),
            reviewType:      review.type,
          };
        });

        setMovies(movieData);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center py-20">
        <div className="text-gray-400 text-sm animate-pulse">Searching…</div>
      </div>
    );
  }

  if (movies.length === 0) {
    return (
      <div className="text-center py-16 px-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-8 max-w-md mx-auto border border-gray-700">
          <img src="/icons/search.svg" alt="No results" className="w-16 h-16 mx-auto mb-4 opacity-50" />
          <p className="text-xl text-gray-400 mb-2">No movies found</p>
          <p className="text-sm text-gray-500">Try a different search term</p>
        </div>
      </div>
    );
  }

  return (
    <MovieCarousel
      movies={movies}
      title={`${movies.length} result${movies.length !== 1 ? "s" : ""} for "${query}"`}
      carouselId="search-results"
      mode="grid"
    />
  );
};

export default SearchResults;
