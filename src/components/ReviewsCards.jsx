import React from "react";

const ReviewsCards = ({
  movies,
  showMovieInfo = false,
  showEditButton = false
}) => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {movies.map((movie) =>
        movie.reviews.map((review, index) => (
          <div
            key={movie.slug + index}
            className="bg-dark-card rounded-lg border border-dark-border p-6 shadow-lg"
          >
            {showMovieInfo && (
              <a 
                className="flex items-center gap-4 mb-4"                   
                href={`/movie/${movie.slug}`}
                >
                <img
                  src={movie.posterUrl}
                  alt={`${movie.name} poster`}
                  className="w-16 h-24 object-cover rounded"
                />
                <div>
                  <h3 className="text-white font-semibold text-lg">
                    {movie.name}
                  </h3>
                </div>
              </a>
            )}
            <div className="mb-4">
              <div className="text-white font-medium">
                {review.type.charAt(0).toUpperCase() + review.type.slice(1)} Reviewer
              </div>
              <div className="text-gray-500 text-sm">Verified</div>
            </div>
            <div className="mb-4">
              <div className="text-3xl font-bold text-blood-500">
                {review.overallRating}/10
              </div>
            </div>
            <div className="mb-4">
              <div className="flex flex-wrap gap-2">
                {Object.entries(review.categories).map(
                  ([categoryName, score]) => (
                    <div
                      key={categoryName}
                      className="flex items-center gap-1 bg-dark-card px-2 py-1 rounded text-sm"
                    >
                      <img
                        className="w-3 h-3"
                        src={`/icons/categories/${categoryName}.svg`}
                        alt={categoryName}
                      />
                      <span className="text-gray-300 capitalize">
                        {categoryName}
                      </span>
                      <span className="text-blood-400 font-medium">
                        {score}/10
                      </span>
                    </div>
                  )
                )}
              </div>
            </div>
            {review.content?.trim() && (
              <div className="mb-4">
                <div className="text-white text-sm leading-relaxed">
                  {review.content}
                </div>
              </div>
            )}
            {showEditButton && (
              <div className="flex justify-end">
                <a
                  href={`/movie/${movie.slug}/review`}
                  className="inline-flex items-center gap-2 bg-gray-800/80 backdrop-blur-md shadow-xl text-white font-semibold py-2 px-4 rounded-lg transition-colors duration-200 shadow-lg hover:shadow-xl"
                >
                  <img
                    src="/icons/edit.svg"
                    alt="Edit Review"
                    className="w-4 h-4"
                  />
                  Edit
                </a>
              </div>
            )}
          </div>
        ))
      )}
    </div>
  );
};

export default ReviewsCards;