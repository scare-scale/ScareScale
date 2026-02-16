import React, { useState, useEffect } from 'react';
import { getCurrentUser } from '../lib/supabase';

const ProfileComponent = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      if (!currentUser) {
        window.location.href = '/auth';
        return;
      }
      setUser(currentUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4 py-12">
        <div className="text-center">
          <p className="text-lg text-white">Loading...</p>
        </div>
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
          <h1 className="text-2xl font-bold text-white mb-2">Profile</h1>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Display Name</label>
              <p className="text-lg text-white bg-dark/50 rounded-lg px-4 py-2 border border-blood-600/30">
                {user.user_metadata?.display_name || "Not set"}
              </p>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-400 mb-1">Email Address</label>
              <p className="text-lg text-white bg-dark/50 rounded-lg px-4 py-2 border border-blood-600/30">
                {user.email}
              </p>
            </div>
            <div>
              <p className="text-lg text-white rounded-lg px-4 py-2">
                To delete your account email us at info@scarescale.com
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileComponent;