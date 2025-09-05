import { useState, useEffect } from 'react';
import { getMoviesWithCurrentUserReview } from '../lib/supabase';
import ReviewsTable from './ReviewsTable';
import { Movies } from '../models/Movies';

const UserReviews = () => {
  const [reviewedMovies, setReviewedMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const data = await getMoviesWithCurrentUserReview();
        const movies = Movies.fromSupabaseResponse(data);
        setReviewedMovies(movies.getAll());
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) {
    return (
      <div className="text-center text-gray-400">
        <p>Loading your reviews...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-red-400">
        <p>Error loading reviews: {error}</p>
      </div>
    );
  }

  return reviewedMovies.length > 0 ? (
    <ReviewsTable movies={reviewedMovies} showMovieInfo={true} showEditButton={true} />
  ) : (
    <div className="text-center text-gray-400">
      <p>You haven't written any reviews yet.</p>
      <a href="/" className="text-blood-400 hover:text-blood-300">Browse movies to review</a>
    </div>
  );
};

export default UserReviews;