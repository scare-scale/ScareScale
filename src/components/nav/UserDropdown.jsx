import React, { useState, useEffect } from "react";
import { getCurrentUser, signOut } from "../../lib/supabase";

const UserDropdown = () => {
  const [user, setUser] = useState(null);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      const currentUser = await getCurrentUser();
      setUser(currentUser);
      setLoading(false);
    };
    fetchUser();
  }, []);

  const handleButtonClick = () => {
    setOpen(!open);
  };

  if (loading) {
    return (
      <div className="relative">
        <button
          className="flex items-center space-x-2 text-white p-2 rounded-lg"
          aria-hidden="true"
        >
          <div className="w-8 h-8 rounded-full bg-blood-600/30 animate-pulse" />
          <div className="h-4 w-24 bg-blood-600/20 rounded animate-pulse" />
        </button>
      </div>
    );
  }

  return user ? (
    <div className="relative">
      <button
        className="flex items-center space-x-2 text-white hover:text-blood-400 transition-colors p-2 rounded-lg hover:bg-white/10"
        aria-expanded={open.toString()}
        aria-haspopup="true"
        aria-label="User menu"
        onClick={handleButtonClick}
      >
        <img
          src="/icons/user.svg"
          alt="User avatar"
          className="w-8 h-8 rounded-full bg-blood-600 p-1"
        />
        <span className="text-sm font-medium">
          {user.user_metadata?.display_name || user.email.split("@")[0]}
        </span>
      </button>
      <div
        className={`absolute right-0 mt-2 w-48 bg-bg-secondary/95 backdrop-blur-md rounded-lg shadow-lg border border-blood-600/30 py-2 z-50 ${
          open ? "" : "hidden"
        }`}
        role="menu"
        aria-labelledby="userMenuButton"
      >
        <a
          href="/profile"
          className="block px-4 py-2 text-sm text-text-primary hover:bg-blood-600/20 hover:text-blood-400 transition-colors"
          role="menuitem"
        >
          Profile
        </a>
        <a
          href="/my-reviews"
          className="block px-4 py-2 text-sm text-text-primary hover:bg-blood-600/20 hover:text-blood-400 transition-colors"
          role="menuitem"
        >
          My Reviews
        </a>
        <a
          href="/"
          onClick={signOut}
          className="block px-4 py-2 text-sm text-text-primary hover:bg-blood-600/20 hover:text-blood-400 transition-colors"
          role="menuitem"
        >
          Logout
        </a>
      </div>
    </div>
  ) : (
    <a
      href="/auth"
      className="bg-gradient-to-r from-blood-600 to-blood-700 text-white px-4 py-2 rounded-lg hover:from-blood-700 hover:to-blood-800 text-sm font-medium shadow-lg hover:shadow-xl transition-all duration-200"
    >
      Sign In
    </a>
  );
};

export default UserDropdown;