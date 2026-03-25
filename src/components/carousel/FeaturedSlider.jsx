import React, { useState, useEffect, useRef } from "react";

const ChevronLeft = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg
    width="14"
    height="14"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2.5"
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const FeaturedSlider = ({ movies }) => {
  const [current, setCurrent] = useState(0);
  const timerRef = useRef(null);

  const stopAutoPlay = () => {
    if (timerRef.current) clearInterval(timerRef.current);
  };

  const handlePrev = () => {
    stopAutoPlay();
    setCurrent((c) => (c - 1 + movies.length) % movies.length);
  };

  const handleNext = () => {
    stopAutoPlay();
    setCurrent((c) => (c + 1) % movies.length);
  };

  const handleDot = (i) => {
    stopAutoPlay();
    setCurrent(i);
  };

  useEffect(() => {
    timerRef.current = setInterval(() => {
      setCurrent((c) => (c + 1) % movies.length);
    }, 6000);
    return () => clearInterval(timerRef.current);
  }, [movies.length]);

  return (
    <section className="py-6 sm:py-8">
      <div
        className="relative overflow-hidden w-full"
        style={{ height: "clamp(240px, 42vw, 520px)" }}
      >
        {movies.map((movie, i) => (
          <a
            href={`/movie/${movie.slug}`}
            key={movie.slug}
            className={`absolute inset-0 transition-opacity duration-700 ${
              i === current ? "opacity-100 z-10" : "opacity-0 z-0"
            }`}
          >
            <img
              src={movie.backdropUrl || movie.posterUrl}
              alt={movie.name}
              className="absolute inset-0 w-full h-full object-cover object-center"
              loading={i === 0 ? "eager" : "lazy"}
              draggable={false}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/25 to-transparent" />
            <div className="absolute inset-0 bg-gradient-to-r from-black/55 via-black/10 to-transparent" />

            <div className="absolute top-4 sm:top-6 left-4 sm:left-6">
              <span className="text-sm sm:text-xl font-bold uppercase tracking-[0.2em] text-white tracking-tight">
                Featured
              </span>
            </div>

            <div className="absolute bottom-0 left-0 px-4 sm:px-6 pb-5 sm:pb-8 max-w-2xl">
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-black text-white leading-none tracking-tight mb-2 drop-shadow-xl">
                {movie.name}
              </h1>

              <p className="text-gray-300 text-base sm:text-lg font-medium mb-1 drop-shadow-sm">
                {movie.releaseYear}
              </p>

              {movie.synopsis && (
                <p className="hidden sm:block text-gray-300 text-sm leading-snug mb-3 drop-shadow-sm line-clamp-2 max-w-lg">
                  {movie.synopsis}
                </p>
              )}

              <div className="flex items-center gap-2 mb-4">
                <img
                  src="/logo/icon.png"
                  alt="Scare Scale"
                  className="w-6 h-6 flex-shrink-0 drop-shadow-md"
                  draggable={false}
                />
                {movie.hasReviews ? (
                  <>
                    <span
                      className="text-2xl font-bold tabular-nums drop-shadow-sm text-white"
                    >
                      {movie.overallScore} / 10
                    </span>
                  </>
                ) : (
                  <span className="text-gray-400 text-base font-bold drop-shadow-sm">
                    —
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>

      <div className="flex items-center justify-between mt-3 px-4 sm:px-6">
        <div className="flex items-center gap-1.5">
          {movies.map((_, i) => (
            <button
              key={i}
              onClick={() => handleDot(i)}
              className="h-1.5 rounded-full transition-all duration-300 border border-white/20"
              style={{
                width: i === current ? "1.5rem" : "0.375rem",
                backgroundColor:
                  i === current
                    ? "rgba(255,255,255,0.90)"
                    : "rgba(255,255,255,0.30)",
              }}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/15 text-white transition-opacity duration-200"
            aria-label="Previous slide"
          >
            <ChevronLeft />
          </button>
          <button
            onClick={handleNext}
            className="w-8 h-8 rounded-full flex items-center justify-center bg-white/5 border border-white/15 text-white transition-opacity duration-200"
            aria-label="Next slide"
          >
            <ChevronRight />
          </button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedSlider;
