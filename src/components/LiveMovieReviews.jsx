import React, { useState, useEffect } from 'react';
import { getMovieReviews } from '../lib/supabase';
import { Categories } from '../models/Categories';
import { Review, ReviewType } from '../models/Review';

const CATEGORY_KEYS = ['gore', 'creepy', 'jumpscares', 'suspense', 'psychological'];

const buildReview = (rawCategories, content, type, displayName) => {
  const cats = rawCategories ?? {};
  const categories = new Categories(
    cats.gore ?? 0,
    cats.creepy ?? 0,
    cats.suspense ?? 0,
    cats.jumpscares ?? 0,
    cats.psychological ?? 0,
  );
  const reviewType =
    type === 'ai' ? ReviewType.AI
    : type === 'official' ? ReviewType.Official
    : ReviewType.User;

  return new Review(reviewType, content ?? '', categories, displayName ?? null);
};

const SkeletonRow = () => (
  <tr className="border-t-2 border-blood-600">
    <td className="px-2 md:px-6 py-4">
      <div className="h-4 bg-gray-700/60 rounded animate-pulse w-28" />
    </td>
    <td className="px-2 md:px-6 py-4">
      <div className="h-8 bg-gray-700/60 rounded animate-pulse w-16" />
    </td>
    <td className="px-2 md:px-6 py-4">
      <div className="h-4 bg-gray-700/60 rounded animate-pulse w-48" />
    </td>
  </tr>
);

const LiveMovieReviews = ({ movieId }) => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState(null);

  useEffect(() => {
    getMovieReviews(movieId)
      .then((rawReviews) => {
        const built = rawReviews.map((r, idx) => ({
          review: buildReview(r.categories, r.content, r.type, r.profiles?.display_name),
          key: `${r.user_id ?? 'anon'}-${r.type}-${idx}`,
        }));
        setReviews(built);
      })
      .catch((err) => setFetchError(err.message))
      .finally(() => setLoading(false));
  }, [movieId]);

  if (loading) {
    return (
      <div className="text-center py-8 px-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 max-w-sm mx-auto border border-gray-700">
          <p className="text-gray-400 mb-2">Loading Reviews...</p>
        </div>
      </div>
    );
  }

  if (fetchError) {
    return (
      <p className="text-gray-500 text-sm py-4">Unable to load reviews at this time.</p>
    );
  }

  if (reviews.length === 0) {
    return (
      <div className="text-center py-8 px-6">
        <div className="bg-gray-800/50 backdrop-blur-sm rounded-lg p-6 max-w-sm mx-auto border border-gray-700">
          <p className="text-gray-400 mb-2">No reviews yet</p>
          <p className="text-sm text-gray-500">Be the first to review this movie!</p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-dark-card rounded-lg border border-dark-border">
      <table className="w-full text-left">
        <thead className="bg-dark-card border-b border-dark-border">
          <tr>
            <th className="px-2 md:px-6 py-4 text-gray-400 font-semibold uppercase tracking-wide text-sm">Reviewer</th>
            <th className="px-2 md:px-6 py-4 text-gray-400 font-semibold uppercase tracking-wide text-sm">Rating</th>
            <th className="px-2 md:px-6 py-4 text-gray-400 font-semibold uppercase tracking-wide text-sm">Categories</th>
          </tr>
        </thead>
        <tbody className="border-b-2 border-blood-600">
          {reviews.map(({ review, key }) => (
            <React.Fragment key={key}>
              <tr className="border-t-2 border-blood-600">
                <td className="px-2 md:px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div>
                      <div className="text-white font-medium">{review.displayName}</div>
                      <div className="text-gray-500 text-sm">
                        {review.displayName !== "Anonymous" && "Verified"}
                      </div>
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
                    {CATEGORY_KEYS.map((categoryName) => {
                      const score = review.categories[categoryName];
                      if (score == null) return null;
                      return (
                        <div
                          key={categoryName}
                          className="flex items-center gap-1 bg-dark-card px-2 py-1 rounded text-sm"
                        >
                          <img
                            className="w-3 h-3"
                            src={`/icons/categories/${categoryName}.svg`}
                            alt={categoryName}
                          />
                          <span className="text-gray-300 capitalize">{categoryName}</span>
                          <span className="text-blood-400 font-medium">{score}/10</span>
                        </div>
                      );
                    })}
                  </div>
                </td>
              </tr>
              {review.content?.trim() && (
                <tr>
                  <td colSpan={3} className="px-2 md:px-6 py-4">
                    <div className="text-white text-sm leading-relaxed max-w-none">
                      {review.content}
                    </div>
                  </td>
                </tr>
              )}
            </React.Fragment>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LiveMovieReviews;
