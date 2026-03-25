import React, { useRef, useEffect, useCallback } from 'react';

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

const MovieCard = ({ movie, cardClass, onLinkClick }) => {
  const { slug, name, releaseYear, posterUrl, hasReviews, isApproved, isReleased, releaseDateText, overallScore, scoreText, topCategories, reviewType } = movie;
  const isAiReview  = reviewType === 'ai';
  const isUpcoming  = !isReleased && !hasReviews;

  return (
    <a href={`/movie/${slug}`} className={`${cardClass} block group`} draggable={false} onClick={onLinkClick}>
      <div
        className="relative rounded-xl overflow-hidden bg-gray-900 shadow-lg shadow-black/40"
        style={{ aspectRatio: '2/3' }}
      >
        <img
          src={posterUrl}
          alt={name}
          className="absolute inset-0 w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          loading="lazy"
          draggable={false}
        />
        {isApproved && (
          <div
            className="absolute top-0 left-0 px-2 py-1 rounded-br-xl rounded-tl-xl"
            style={{ background: 'linear-gradient(135deg, rgba(176,37,37,0.9), rgba(66,15,15,0.9))' }}
          >
            <img src="/icons/official.svg" alt="Approved" className="w-4 h-4" draggable={false} />
          </div>
        )}
        {topCategories.length > 0 && (
          <div
            className="absolute bottom-0 left-0 right-0 flex gap-1 p-1.5 justify-end"
            style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7), transparent)' }}
          >
            {topCategories.map(cat => (
              <img key={cat} src={`/icons/categories/${cat}.svg`} alt={cat} className="w-4 h-4 opacity-90" draggable={false} />
            ))}
          </div>
        )}
      </div>

      <div className="mt-2 px-0.5">
        {isUpcoming ? (
          <p className="text-xs text-gray-400 mb-1.5 leading-tight">{releaseDateText}</p>
        ) : (
          <div className="flex items-center gap-1.5 mb-1.5">
            <img
              src={isAiReview ? '/icons/ai.svg' : '/logo/icon.png'}
              alt={isAiReview ? 'AI Review' : 'Scare Scale'}
              className="w-5 h-5 flex-shrink-0"
              draggable={false}
            />
            {hasReviews ? (
              <>
                <span
                  className="text-md font-bold tabular-nums leading-none text-white"
                >
                  {overallScore} / 10
                </span>
              </>
            ) : (
              <span className="text-sm font-bold leading-none text-gray-500">—</span>
            )}
          </div>
        )}
        <p className="text-white font-semibold text-xs sm:text-sm leading-snug line-clamp-2">{name}</p>
        <p className="text-xs mt-0.5 text-gray-400">{releaseYear}</p>
      </div>
    </a>
  );
};

const SectionHeader = ({ title, viewAllUrl }) => (
  <div className="flex items-center justify-between mb-4 px-4 sm:px-6">
    <h2 className="text-xl sm:text-2xl font-bold text-white">{title}</h2>
    {viewAllUrl && (
      <a href={viewAllUrl} className="text-sm font-medium text-blood-500 hover:text-blood-400 whitespace-nowrap">
        View All →
      </a>
    )}
  </div>
);

const NavButton = ({ btnRef, onClick, side, children }) => (
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
    <span
      className="w-8 h-8 rounded-full flex items-center justify-center bg-black/50 border text-white shadow-md"
      style={{ borderColor: 'rgba(255,255,255,0.15)' }}
    >
      {children}
    </span>
  </button>
);

const MovieCarousel = ({ movies, title, viewAllUrl, carouselId, mode = 'carousel' }) => {
  const trackRef   = useRef(null);
  const prevBtnRef = useRef(null);
  const nextBtnRef = useRef(null);
  const dragRef    = useRef({ isDown: false, startX: 0, scrollStart: 0, distance: 0 });

  const SCROLL_AMOUNT  = 480;
  const DRAG_THRESHOLD = 8;

  const updateNavButtons = useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    if (prevBtnRef.current) prevBtnRef.current.disabled = track.scrollLeft <= 0;
    if (nextBtnRef.current) nextBtnRef.current.disabled = track.scrollLeft >= track.scrollWidth - track.clientWidth - 2;
  }, []);

  useEffect(() => {
    if (mode !== 'carousel') return;
    const track = trackRef.current;
    if (!track) return;

    const onMouseDown = (e) => {
      dragRef.current = { isDown: true, startX: e.clientX, scrollStart: track.scrollLeft, distance: 0 };
      track.style.cursor = 'grabbing';
    };
    const onMouseUp = () => {
      dragRef.current.isDown = false;
      track.style.cursor = '';
    };
    const onMouseMove = (e) => {
      if (!dragRef.current.isDown) return;
      e.preventDefault();
      const dx = dragRef.current.startX - e.clientX;
      dragRef.current.distance = Math.max(dragRef.current.distance, Math.abs(dx));
      track.scrollLeft = dragRef.current.scrollStart + dx;
    };
    let touchStartX = 0;
    let touchScrollStart = 0;
    const onTouchStart = (e) => {
      touchStartX = e.touches[0].clientX;
      touchScrollStart = track.scrollLeft;
      dragRef.current.distance = 0;
    };
    const onTouchMove = (e) => {
      const dx = touchStartX - e.touches[0].clientX;
      dragRef.current.distance = Math.max(dragRef.current.distance, Math.abs(dx));
      track.scrollLeft = touchScrollStart + dx;
    };

    track.addEventListener('mousedown', onMouseDown);
    window.addEventListener('mouseup', onMouseUp);
    track.addEventListener('mousemove', onMouseMove);
    track.addEventListener('touchstart', onTouchStart, { passive: true });
    track.addEventListener('touchmove', onTouchMove, { passive: true });
    track.addEventListener('scroll', updateNavButtons, { passive: true });
    updateNavButtons();

    return () => {
      track.removeEventListener('mousedown', onMouseDown);
      window.removeEventListener('mouseup', onMouseUp);
      track.removeEventListener('mousemove', onMouseMove);
      track.removeEventListener('touchstart', onTouchStart);
      track.removeEventListener('touchmove', onTouchMove);
      track.removeEventListener('scroll', updateNavButtons);
    };
  }, [mode, updateNavButtons]);

  const scrollPrev = () => trackRef.current?.scrollBy({ left: -SCROLL_AMOUNT, behavior: 'smooth' });
  const scrollNext = () => trackRef.current?.scrollBy({ left:  SCROLL_AMOUNT, behavior: 'smooth' });

  const handleCardClick = (e) => {
    if (dragRef.current.distance > DRAG_THRESHOLD) {
      e.preventDefault();
      dragRef.current.distance = 0;
    }
  };

  if (mode === 'grid') {
    return (
      <section className="py-6 sm:py-8">
        <SectionHeader title={title} viewAllUrl={viewAllUrl} />
        <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-7 gap-3 sm:gap-4 px-4 sm:px-6">
          {movies.map(movie => (
            <MovieCard key={movie.slug} movie={movie} cardClass="w-full" />
          ))}
        </div>
      </section>
    );
  }

  return (
    <section className="py-6 sm:py-8">
      <SectionHeader title={title} viewAllUrl={viewAllUrl} />
      <div className="relative">
        <NavButton btnRef={prevBtnRef} onClick={scrollPrev} side="left">
          <ChevronLeft />
        </NavButton>
        <div
          ref={trackRef}
          className="scroll-hide flex gap-3 sm:gap-4 px-4 sm:px-6 pb-2 select-none"
          id={carouselId}
          style={{ overflowX: 'scroll', cursor: 'grab' }}
        >
          {movies.map(movie => (
            <MovieCard
              key={movie.slug}
              movie={movie}
              cardClass="flex-shrink-0 w-32 sm:w-36 lg:w-40"
              onLinkClick={handleCardClick}
            />
          ))}
        </div>
        <NavButton btnRef={nextBtnRef} onClick={scrollNext} side="right">
          <ChevronRight />
        </NavButton>
      </div>
    </section>
  );
};

export default MovieCarousel;
