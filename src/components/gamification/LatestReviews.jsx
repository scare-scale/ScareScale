import React, { useState, useEffect, useRef, useCallback } from 'react';
import { getLatestReviews } from '../../lib/supabase';
import { Categories } from '../../models/Categories';
import { Review, ReviewType } from '../../models/Review';

const TMDB_POSTER_BASE_URL = "https://www.themoviedb.org/t/p/w300_and_h450_bestv2";
const CATEGORY_KEYS = ['gore', 'creepy', 'jumpscares', 'suspense', 'psychological'];
const SCROLL_AMOUNT = 420;
const DRAG_THRESHOLD = 8;

const buildReview = (rawCategories, content, displayName) => {
  const cats = rawCategories ?? {};
  const categories = new Categories(
    cats.gore ?? 0,
    cats.creepy ?? 0,
    cats.suspense ?? 0,
    cats.jumpscares ?? 0,
    cats.psychological ?? 0,
  );
  return new Review(ReviewType.User, content ?? '', categories, displayName ?? 'Anonymous');
};

const movieSlugFromSupabase = (name, releaseDate) => {
  const year = String(releaseDate ?? '').split('/')[2] ?? '';
  return name.toLowerCase().replace(/[^a-z0-9]+/g, '-') + '-' + year;
};

const timeAgo = (dateStr) => {
  if (!dateStr) return '';
  const seconds = Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
  if (seconds < 60)      return `${seconds}s ago`;
  if (seconds < 3600)    return `${Math.floor(seconds / 60)}m ago`;
  if (seconds < 86400)   return `${Math.floor(seconds / 3600)}h ago`;
  if (seconds < 2592000) return `${Math.floor(seconds / 86400)}d ago`;
  return `${Math.floor(seconds / 2592000)}mo ago`;
};

const ChevronLeft = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="15 18 9 12 15 6" />
  </svg>
);

const ChevronRight = () => (
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <polyline points="9 18 15 12 9 6" />
  </svg>
);

const NavButton = ({ btnRef, onClick, side }) => (
  <button
    ref={btnRef}
    onClick={onClick}
    className={[
      'absolute top-0 bottom-4 z-20 flex items-center justify-center',
      'transition-opacity duration-200 disabled:opacity-0 disabled:pointer-events-none',
      side === 'left'
        ? 'left-0 w-10 sm:w-14 bg-gradient-to-r from-black/50 via-black/20 to-transparent'
        : 'right-0 w-10 sm:w-14 bg-gradient-to-l from-black/50 via-black/20 to-transparent',
    ].join(' ')}
    aria-label={side === 'left' ? 'Scroll left' : 'Scroll right'}
  >
    <span className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 border border-white/15 text-white shadow-md">
      {side === 'left' ? <ChevronLeft /> : <ChevronRight />}
    </span>
  </button>
);

const SkeletonCard = () => (
  <div className="flex-shrink-0 w-80 h-52 bg-dark-card rounded-xl border border-dark-border animate-pulse" />
);

const ReviewCard = ({ data, onLinkClick }) => {
  const movie = data.movies;
  if (!movie) return null;

  const displayName = data.profiles?.display_name ?? 'Anonymous';
  const review = buildReview(data.categories, data.content, displayName);
  const movieSlug = movieSlugFromSupabase(movie.name, movie.releaseDate);
  const posterUrl = movie.tmdbPosterId ? `${TMDB_POSTER_BASE_URL}${movie.tmdbPosterId}` : null;
  const categoryEntries = CATEGORY_KEYS.map((k) => [k, data.categories?.[k]]).filter(([, v]) => v != null);

  return (
    <a
      href={`/movie/${movieSlug}`}
      className="flex-shrink-0 w-80 bg-dark-card rounded-xl border border-dark-border p-4 flex flex-col gap-3 hover:border-blood-600/60 transition-colors duration-200 group"
      draggable={false}
      onClick={onLinkClick}
    >
      <div className="flex items-start gap-3">
        {posterUrl ? (
          <img
            src={posterUrl}
            alt={movie.name}
            className="w-12 h-16 object-cover rounded-lg flex-shrink-0 shadow-md"
            loading="lazy"
            draggable={false}
          />
        ) : (
          <div className="w-12 h-16 bg-dark rounded-lg flex-shrink-0 flex items-center justify-center">
            <span className="text-gray-600 text-xl">🎬</span>
          </div>
        )}
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-semibold text-sm leading-snug line-clamp-2 group-hover:text-blood-400 transition-colors">
            {movie.name}
          </h3>
          <p className="text-gray-400 text-xs mt-0.5">
            by <span className="text-gray-300 font-medium">{displayName}</span>
          </p>
          {data.created_at && (
            <p className="text-gray-600 text-xs mt-0.5">{timeAgo(data.created_at)}</p>
          )}
        </div>
        <div className="flex-shrink-0 text-right">
          <div className="text-2xl font-bold text-blood-400 leading-none tabular-nums">
            {review.overallRating}
          </div>
          <div className="text-xs text-gray-500 mt-0.5">/10</div>
        </div>
      </div>

      <div className="text-xs font-semibold text-blood-500 uppercase tracking-widest">
        {review.scoreText}
      </div>

      <div className="flex flex-wrap gap-1.5">
        {categoryEntries.map(([cat, score]) => (
          <div
            key={cat}
            className="flex items-center gap-1 bg-dark/60 px-1.5 py-0.5 rounded text-xs border border-dark-border/60"
          >
            <img src={`/icons/categories/${cat}.svg`} alt={cat} className="w-3 h-3 opacity-80" draggable={false} />
            <span className="text-gray-400 capitalize">{cat}</span>
            <span className="text-blood-400 font-medium">{score}</span>
          </div>
        ))}
      </div>

      {review.content?.trim() && (
        <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 italic border-t border-dark-border/50 pt-2">
          &ldquo;{review.content.trim()}&rdquo;
        </p>
      )}
    </a>
  );
};

const LatestReviews = () => {
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const trackRef    = useRef(null);
  const prevBtnRef  = useRef(null);
  const nextBtnRef  = useRef(null);
  const dragRef     = useRef({ isDown: false, startX: 0, scrollStart: 0, distance: 0 });

  useEffect(() => {
    getLatestReviews(12)
      .then(setReviews)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  const updateNavButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (prevBtnRef.current) prevBtnRef.current.disabled = track.scrollLeft <= 0;
    if (nextBtnRef.current) nextBtnRef.current.disabled =
      track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    if (!track || loading || reviews.length === 0) return;

    const onMouseDown  = (e) => { dragRef.current = { isDown: true, startX: e.clientX, scrollStart: track.scrollLeft, distance: 0 }; track.style.cursor = 'grabbing'; };
    const onMouseUp    = ()  => { dragRef.current.isDown = false; track.style.cursor = ''; };
    const onMouseMove  = (e) => {
      if (!dragRef.current.isDown) return;
      e.preventDefault();
      const dx = dragRef.current.startX - e.clientX;
      dragRef.current.distance = Math.max(dragRef.current.distance, Math.abs(dx));
      track.scrollLeft = dragRef.current.scrollStart + dx;
    };
    let touchStartX = 0, touchScrollStart = 0;
    const onTouchStart = (e) => { touchStartX = e.touches[0].clientX; touchScrollStart = track.scrollLeft; dragRef.current.distance = 0; };
    const onTouchMove  = (e) => { const dx = touchStartX - e.touches[0].clientX; dragRef.current.distance = Math.max(dragRef.current.distance, Math.abs(dx)); track.scrollLeft = touchScrollStart + dx; };

    track.addEventListener('mousedown',  onMouseDown);
    window.addEventListener('mouseup',   onMouseUp);
    track.addEventListener('mousemove',  onMouseMove);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove',  onTouchMove,  { passive: true });
    track.addEventListener('scroll',     updateNavButtons, { passive: true });
    updateNavButtons();

    return () => {
      track.removeEventListener('mousedown',  onMouseDown);
      window.removeEventListener('mouseup',   onMouseUp);
      track.removeEventListener('mousemove',  onMouseMove);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove',  onTouchMove);
      track.removeEventListener('scroll',     updateNavButtons);
    };
  }, [loading, reviews.length, updateNavButtons]);

  const scrollPrev    = () => trackRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  const scrollNext    = () => trackRef.current?.scrollBy({ left:  SCROLL_AMOUNT, behavior: 'smooth' });
  const handleClick   = (e) => { if (dragRef.current.distance > DRAG_THRESHOLD) { e.preventDefault(); dragRef.current.distance = 0; } };

  return (
    <section className="py-6 sm:py-8">
      <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
        <h2 className="text-xl sm:text-2xl font-bold text-white">Latest Community Reviews</h2>
      </div>

      {loading ? (
        <div className="flex gap-3 sm:gap-4 px-4 sm:px-6 pb-2 overflow-hidden">
          {[...Array(4)].map((_, i) => <SkeletonCard key={i} />)}
        </div>
      ) : reviews.length === 0 ? (
        <p className="px-4 sm:px-6 text-gray-500 text-sm">No community reviews yet.</p>
      ) : (
        <div className="relative">
          <NavButton btnRef={prevBtnRef} onClick={scrollPrev} side="left" />
          <div
            ref={trackRef}
            className="scroll-hide flex gap-3 sm:gap-4 px-4 sm:px-6 pb-2 select-none"
            style={{ overflowX: 'scroll', cursor: 'grab' }}
          >
            {reviews.map((r, i) => <ReviewCard key={i} data={r} onLinkClick={handleClick} />)}
          </div>
          <NavButton btnRef={nextBtnRef} onClick={scrollNext} side="right" />
        </div>
      )}
    </section>
  );
};

export default LatestReviews;
