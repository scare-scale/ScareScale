import React from "react";

const ReviewsTable = ({
  movies,
  showMovieInfo = false,
  showEditButton = false
}) => {
  return (
    <div className="bg-bg-card rounded-lg border border-border-primary">
      <table className="w-full text-left">
        <thead className="bg-bg-accent border-b border-border-primary">
          <tr>
            {showMovieInfo && (
              <>
                <th className="px-2 md:px-6 py-4 text-text-secondary font-semibold uppercase tracking-wide text-sm">
                  Movie
                </th>
                <th className="px-2 md:px-6 py-4 text-text-secondary font-semibold uppercase tracking-wide text-sm">
                  Poster
                </th>
              </>
            )}
            <th className="px-2 md:px-6 py-4 text-text-secondary font-semibold uppercase tracking-wide text-sm">
              Reviewer
            </th>
            <th className="px-2 md:px-6 py-4 text-text-secondary font-semibold uppercase tracking-wide text-sm">
              Rating
            </th>
            <th className="px-2 md:px-6 py-4 text-text-secondary font-semibold uppercase tracking-wide text-sm">
              Categories
            </th>
            {showEditButton && (
              <th className="px-2 md:px-6 py-4 text-text-secondary font-semibold uppercase tracking-wide text-sm">
                Actions
              </th>
            )}
          </tr>
        </thead>
        <tbody className="border-b-2 border-primary">
          {movies.map((movie) =>
            movie.reviews.map((review, index) => (
              <React.Fragment key={movie.slug + index}>
                <tr className="border-t-2 border-primary">
                  {showMovieInfo && (
                    <>
                      <td className="px-2 md:px-6 py-4">
                        <div className="text-text-primary font-medium">
                          {movie.name}
                        </div>
                      </td>
                      <td className="px-2 md:px-6 py-4">
                        <img
                          src={movie.posterUrl}
                          alt={`${movie.name} poster`}
                          className="w-12 h-18 object-cover rounded"
                        />
                      </td>
                    </>
                  )}
                  <td className="px-2 md:px-6 py-4">
                    <div className="flex items-center gap-3">
                      <div>
                        <div className="text-text-primary font-medium">
                          {review.displayName}
                        </div>
                        <div className="text-text-muted text-sm">{review.displayName != "Anonymous" && "Verified"}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-2 md:px-6 py-4">
                    <div className="text-2xl font-bold text-blood-500">
                      {review.overallRating}/10
                    </div>
                  </td>
                  <td className="px-2 md:px-6 py-4 md:table-cell">
                    <div className="flex flex-wrap gap-2">
                      {Object.entries(review.categories).map(
                        ([categoryName, score]) => (
                          <div
                            key={categoryName}
                            className="flex items-center gap-1 bg-bg-accent px-2 py-1 rounded text-sm"
                          >
                            <img
                              className="w-3 h-3"
                              src={`/icons/categories/${categoryName}.svg`}
                              alt={categoryName}
                            />
                            <span className="text-text-secondary capitalize">
                              {categoryName}
                            </span>
                            <span className="text-blood-400 font-medium">
                              {score}/10
                            </span>
                          </div>
                        )
                      )}
                    </div>
                  </td>
                  {showEditButton && (
                    <td className="px-2 md:px-6 py-4">
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
                    </td>
                  )}
                </tr>
                {review.content?.trim() && (
                  <tr>
                    <td
                      colSpan={
                        showMovieInfo
                          ? showEditButton
                            ? 6
                            : 5
                          : showEditButton
                          ? 4
                          : 3
                      }
                      className="px-2 md:px-6 py-4"
                    >
                      <div className="text-text-primary text-sm leading-relaxed max-w-none">
                        {review.content}
                      </div>
                    </td>
                  </tr>
                )}
              </React.Fragment>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ReviewsTable;
