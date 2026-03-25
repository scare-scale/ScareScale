import React, { useState, useEffect } from "react";
import { getCurrentUser, getUserReviewCount } from "../lib/supabase";
import { getRankProgress } from "../utils/rankUtils";

const RankCard = ({ reviewCount }) => {
  const { current, next, progress, needed } = getRankProgress(reviewCount);

  return (
    <div className={`rounded-xl border p-4 ${current.bgClass}`}>
      <div className="flex items-center gap-3 mb-3">
        <span className="text-4xl leading-none">{current.emoji}</span>
        <div>
          <p className={`font-bold text-sm ${current.colorClass}`}>{current.name}</p>
          <p className="text-gray-500 text-xs">
            {reviewCount} {reviewCount === 1 ? 'review' : 'reviews'} submitted
          </p>
        </div>
      </div>

      {next ? (
        <div>
          <div className="flex justify-between text-xs text-gray-500 mb-1.5">
            <span>Progress to {next.emoji} {next.name}</span>
            <span>{needed} {needed === 1 ? 'review' : 'reviews'} to go</span>
          </div>
          <div className="w-full bg-dark rounded-full h-1.5 overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blood-700 to-blood-500 transition-all duration-500"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      ) : (
        <p className="text-xs text-blood-400 font-medium">🏆 Maximum rank achieved!</p>
      )}
    </div>
  );
};

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [reviewCount, setReviewCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        window.location.href = "/auth";
        return;
      }
      setUser(currentUser);

      try {
        const count = await getUserReviewCount();
        setReviewCount(count);
      } catch {
        // non-critical
      }

      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <p className="text-lg text-white">Loading...</p>
      </div>
    );
  }

  return (
    <div className="mt-12 flex items-center justify-center px-4 py-12">
      <div className="max-w-md w-full bg-dark-lighter/80 backdrop-blur-md rounded-lg shadow-lg border border-blood-600/40 p-8 animate-fade-in">
        <div className="text-center">
          <div className="mb-6">
            <img
              src="/icons/user.svg"
              alt="User avatar"
              className="w-20 h-20 rounded-full bg-blood-600 p-3 mx-auto"
            />
          </div>
          <h1 className="text-2xl font-bold text-white mb-4">Profile</h1>

          <div className="space-y-4">
            <RankCard reviewCount={reviewCount} />

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Display Name
              </label>
              <p className="text-lg text-white bg-dark/50 rounded-lg px-4 py-2 border border-blood-600/30">
                {user.user_metadata?.display_name || "Not set"}
              </p>
              <p className="text-sm font-medium text-gray-400 rounded-lg px-4 py-2">
                To update your display name email us at info@scarescale.com
              </p>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">
                Email Address
              </label>
              <p className="text-lg text-white bg-dark/50 rounded-lg px-4 py-2 border border-blood-600/30">
                {user.email}
              </p>
            </div>

            <a
              href="/auth?mode=reset"
              className="w-full text-center py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-500 text-white font-semibold shadow-md hover:shadow-lg transition-all block"
            >
              Reset Password
            </a>

            <p className="text-sm font-medium text-gray-400 rounded-lg px-4 py-2">
              To delete your account email us at info@scarescale.com
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;
