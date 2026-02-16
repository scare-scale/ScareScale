import React, { useState, useEffect } from 'react';
import { signIn, signUp, getCurrentUser, resetPassword, updatePassword } from '../lib/supabase';

const AuthComponent = () => {
  const [mode, setMode] = useState('signin');
  const [referrerUrl, setReferrerUrl] = useState('/');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const modeParam = urlParams.get('mode');
    const validModes = ['signin', 'signup', 'forgot', 'reset'];
    let mode = validModes.includes(modeParam) ? modeParam : 'signin';
    const referrer = urlParams.get('referrer') || '/';

    // Check for password reset callback
    const hashParams = new URLSearchParams(window.location.hash.substring(1));
    const accessToken = hashParams.get('access_token');
    const type = hashParams.get('type');

    if (accessToken && type === 'recovery') {
      mode = 'reset';
      // Clear the hash to clean up the URL
      window.history.replaceState({}, document.title, window.location.pathname + window.location.search);
    }

    const checkLoggedIn = async () => {
        if (await getCurrentUser() != null && mode != "reset") {
            window.location.href = referrer
        }
    };
    checkLoggedIn();

    setMode(mode);
    setReferrerUrl(referrer);
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    setLoading(true);

    const formData = new FormData(e.target);
    const email = formData.get('email');
    const password = mode !== 'forgot' ? formData.get('password') : null;
    const displayName = mode === 'signup' ? formData.get('displayName') : null;
    const newPassword = mode === 'reset' ? formData.get('newPassword') : null;
    const confirmPassword = mode === 'reset' ? formData.get('confirmPassword') : null;

    try {
      if (mode === 'signup') {
        const { error: signUpError } = await signUp(email, password, displayName);
        if (signUpError) {
          setError(signUpError.message);
        } else {
          setSuccess('Account created! Please check your email to confirm.');
        }
      } else if (mode === 'forgot') {
        const { error: resetError } = await resetPassword(email);
        if (resetError) {
          setError(resetError.message);
        } else {
          setSuccess('Password reset email sent! Please check your email.');
        }
      } else if (mode === 'reset') {
        if (newPassword !== confirmPassword) {
          setError('Passwords do not match.');
          return;
        }
        const { error: updateError } = await updatePassword(newPassword);
        if (updateError) {
          setError(updateError.message);
        } else {
          setSuccess('Password updated successfully! You can now sign in with your new password.');
          setTimeout(() => {
            window.location.href = '/auth?mode=signin';
          }, 2000);
        }
      } else {
        const { error: signInError } = await signIn(email, password);
        if (signInError) {
          setError(signInError.message);
        } else {
          window.location.href = referrerUrl;
        }
      }
    } catch (err) {
      setError('An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  const toggleMode = () => {
    const newMode = mode === 'signup' ? 'signin' : 'signup';
    setMode(newMode);
    const url = new URL(window.location);
    url.searchParams.set('mode', newMode);
    window.history.pushState({}, '', url);
  };

  const switchToForgot = () => {
    setMode('forgot');
    const url = new URL(window.location);
    url.searchParams.set('mode', 'forgot');
    window.history.pushState({}, '', url);
  };

  const switchToSignin = () => {
    setMode('signin');
    const url = new URL(window.location);
    url.searchParams.set('mode', 'signin');
    window.history.pushState({}, '', url);
  };

  return (
    <div className="flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-lg w-full space-y-8 bg-gray-50 p-10">
        <div>
          <div className="mx-auto flex items-center justify-center">
            <img src="/logo/logo.svg" alt="Scare Scale Logo" className="h-20 w-auto" />
          </div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">
            {mode === 'signup' ? 'Create a new account' : mode === 'forgot' ? 'Reset your password' : mode === 'reset' ? 'Set new password' : 'Sign in to your account'}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-600">
            {mode === 'forgot' ? (
              <>
                Remember your password?
                <button
                  onClick={switchToSignin}
                  className="font-medium text-red-600 hover:text-red-500 ml-1"
                >
                  Sign in
                </button>
              </>
            ) : mode === 'reset' ? (
              <>
                <button
                  onClick={switchToSignin}
                  className="font-medium text-red-600 hover:text-red-500"
                >
                  Back to sign in
                </button>
              </>
            ) : (
              <>
                Or
                <button
                  onClick={toggleMode}
                  className="font-medium text-red-600 hover:text-red-500 ml-1"
                >
                  {mode === 'signup' ? 'sign in instead' : 'create a new account'}
                </button>
              </>
            )}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="mt-8 space-y-6">
          <div className="rounded-md shadow-sm -space-y-px">
            {mode === 'signup' && (
              <div>
                <label htmlFor="displayName" className="sr-only">Display Name</label>
                <input
                  id="displayName"
                  name="displayName"
                  type="text"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Display name"
                />
              </div>
            )}
            {mode !== 'reset' && (
              <div>
                <label htmlFor="email" className="sr-only">Email address</label>
                <input
                  id="email"
                  name="email"
                  type="email"
                  required
                  className={`appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 ${mode === 'signup' || mode === 'forgot' ? 'rounded-t-md' : ''} focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm`}
                  placeholder="Email address"
                />
              </div>
            )}
            {mode === 'reset' ? (
              <>
                <div>
                  <label htmlFor="newPassword" className="sr-only">New Password</label>
                  <input
                    id="newPassword"
                    name="newPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="New password"
                  />
                </div>
                <div>
                  <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                    placeholder="Confirm new password"
                  />
                </div>
              </>
            ) : mode !== 'forgot' && (
              <div>
                <label htmlFor="password" className="sr-only">Password</label>
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-red-500 focus:border-red-500 focus:z-10 sm:text-sm"
                  placeholder="Password"
                />
              </div>
            )}
          </div>

          {mode === 'signin' && (
            <div className="text-right">
              <button
                type="button"
                onClick={switchToForgot}
                className="text-sm text-red-600 hover:text-red-500"
              >
                Forgot your password?
              </button>
            </div>
          )}

          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}

          <div>
            <button
              type="submit"
              disabled={loading}
              className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:opacity-50"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <svg className="h-5 w-5 text-red-500 group-hover:text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" />
                </svg>
              </span>
              {loading ? 'Processing...' : (mode === 'signup' ? 'Sign up' : mode === 'forgot' ? 'Send reset email' : mode === 'reset' ? 'Update password' : 'Sign in')}
            </button>
          </div>

          <div className="text-center">
            <a href="/legal" className="text-sm text-gray-600 hover:text-gray-500">By using Scare Scale, you agree to our privacy policy.</a>
          </div>
          
          <div className="text-center">
            <a href="/" className="text-sm text-gray-600 hover:text-gray-500">← Back to home</a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AuthComponent;