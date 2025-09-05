import React, { useState, useEffect } from 'react';
import { Categories } from '../models/Categories';
import { Review as MovieReview } from '../models/Review';
import { submitReview } from '../lib/supabase';
import { movies } from "../lib/movies"
import { getCurrentUser } from "../lib/supabase"

const ReviewPage = ({slug}) => {
  const [error, setError] = useState('');
  const [movie, setMovie] = useState(null);
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkLoggedIn = async () => {
        if (await getCurrentUser() == null) {
          window.location.href = `/auth?referrer=${window.location.href}`
        }
    };
    checkLoggedIn();

    const movie = movies.getBySlug(slug);

    if (movie == null) {
      window.location.href = "/"
    }
    setMovie(movie);
  }, []);
  
  const onCancel = () => {
    window.location.href = window.location.href.replace("/review", "")
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    const formData = new FormData(e.target);

    const categories = new Categories(
      Number(formData.get('gore') || 0),
      Number(formData.get('creepy') || 0),
      Number(formData.get('suspense') || 0),
      Number(formData.get('jumpscares') || 0),
      Number(formData.get('psychological') || 0),
    );

    const content = formData.get('content')?.toString() || '';

    const review = MovieReview.userReview(categories, content);

    try {
      const { error: reviewError } = await submitReview(movie, review);
      if (reviewError) {
        setError(reviewError.message);
      } else {
        setSuccess('Your review has been submitted.');
      }
    } catch (err) {
      setError('Something went wrong.');
    } finally {
      setLoading(false);
    }
  };

  if (!movie) {
    return <></>
  }

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full space-y-8 bg-gray-50 p-10">
        {/* Movie Header */}
        <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
          <div className="flex items-start space-x-4">
            <img
              src={movie.posterUrl}
              alt={movie.name}
              width={120}
              height={180}
              className="rounded-lg shadow-sm"
            />
            <div className="flex-1">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{movie.name}</h1>
              <p className="text-gray-600 mb-4">{movie.releaseYear}</p>
              <p className="text-gray-700 text-sm leading-relaxed">{movie.synopsis}</p>
            </div>
          </div>
        </div>

        {/* Review Form */}
        <div className="bg-white rounded-lg shadow-sm p-6">
          <h2 className="text-xl font-bold text-gray-900 mb-6">Add Your Review</h2>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label htmlFor="gore" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <img className="w-6 h-6 flex-none" src="/icons/categories/gore.svg" alt="Gore icon" />
                  Gore
                </label>
                <input
                  type="number"
                  id="gore"
                  name="gore"
                  min="0"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0–10"
                />
              </div>

              <div>
                <label htmlFor="creepy" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <img className="w-6 h-6 flex-none" src="/icons/categories/creepy.svg" alt="Creepy icon" />
                  Creepy
                </label>
                <input
                  type="number"
                  id="creepy"
                  name="creepy"
                  min="0"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0–10"
                />
              </div>

              <div>
                <label htmlFor="suspense" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <img className="w-6 h-6 flex-none" src="/icons/categories/suspense.svg" alt="Suspense icon" />
                  Suspense
                </label>
                <input
                  type="number"
                  id="suspense"
                  name="suspense"
                  min="0"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0–10"
                />
              </div>

              <div>
                <label htmlFor="jumpscares" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <img className="w-6 h-6 flex-none" src="/icons/categories/jumpscares.svg" alt="Jumpscares icon" />
                  Jumpscares
                </label>
                <input
                  type="number"
                  id="jumpscares"
                  name="jumpscares"
                  min="0"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0–10"
                />
              </div>

              <div className="col-span-2">
                <label htmlFor="psychological" className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2">
                  <img className="w-6 h-6 flex-none" src="/icons/categories/psychological.svg" alt="Psychological icon" />
                  Psychological
                </label>
                <input
                  type="number"
                  id="psychological"
                  name="psychological"
                  min="0"
                  max="10"
                  required
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                  placeholder="0–10"
                />
              </div>
            </div>

            <div>
              <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-2">Comments (Optional)</label>
              <textarea
                id="content"
                name="content"
                rows="4"
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-red-500 focus:border-red-500"
                placeholder="Share your thoughts about this movie..."
              />
            </div>

            {error && <div className="text-red-600 text-sm">{error}</div>}
            {success && <div className="text-green-600 text-sm">{success}</div>}

            <div className="flex space-x-4">
              <button
                type="submit"
                disabled={loading}
                className="flex-1 bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 font-medium disabled:opacity-50"
              >
                {loading ? 'Submitting...' : 'Submit Review'}
              </button>
              <button
                type="button"
                onClick={onCancel}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 font-medium"
              >
                Back
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;