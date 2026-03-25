import React, { useState, useEffect } from 'react';
import { getLeaderboard } from '../../lib/supabase';
import { RANKS, getRank } from '../../utils/rankUtils';

const MEDALS = [
  { icon: '🥇', borderClass: 'border-yellow-500/50',  bgClass: 'bg-yellow-950/20' },
  { icon: '🥈', borderClass: 'border-gray-400/40',    bgClass: 'bg-gray-800/20'   },
  { icon: '🥉', borderClass: 'border-orange-700/50',  bgClass: 'bg-orange-950/20' },
];

const PodiumCard = ({ entry, medal }) => {
  const rank = getRank(entry.count);
  return (
    <div className={`rounded-xl border p-3 text-center flex flex-col items-center gap-1 ${medal.borderClass} ${medal.bgClass}`}>
      <span className="text-3xl leading-none">{medal.icon}</span>
      <span className="text-white font-semibold text-sm leading-snug truncate w-full text-center px-1">
        {entry.displayName}
      </span>
      <span className={`text-xs font-medium ${rank.colorClass}`}>
        {rank.emoji} {rank.name}
      </span>
      <span className="text-gray-400 text-xs mt-0.5">
        {entry.count} {entry.count === 1 ? 'review' : 'reviews'}
      </span>
    </div>
  );
};

const LeaderboardRow = ({ entry, position }) => {
  const rank = getRank(entry.count);
  return (
    <div className="bg-dark-card rounded-xl border border-dark-border px-4 py-3 flex items-center gap-3 hover:border-blood-700/40 transition-colors">
      <span className="text-gray-500 font-bold text-sm w-6 text-center flex-shrink-0">
        {position}
      </span>
      <div className="flex-1 min-w-0">
        <span className="text-white font-medium text-sm truncate block">{entry.displayName}</span>
        <span className={`text-xs ${rank.colorClass}`}>{rank.emoji} {rank.name}</span>
      </div>
      <span className="text-gray-400 text-xs flex-shrink-0 tabular-nums">
        {entry.count} {entry.count === 1 ? 'review' : 'reviews'}
      </span>
    </div>
  );
};

const RankLegend = () => (
  <div className="mt-6 p-4 bg-dark-card/50 rounded-xl border border-dark-border/60">
    <p className="text-xs text-gray-500 font-semibold uppercase tracking-wider mb-3">Rank Tiers</p>
    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
      {RANKS.map((r) => (
        <div key={r.name} className="flex items-center gap-2 text-xs">
          <span>{r.emoji}</span>
          <span className={`font-medium ${r.colorClass}`}>{r.name}</span>
          <span className="text-gray-600">({r.minReviews}+)</span>
        </div>
      ))}
    </div>
  </div>
);

const SkeletonPodium = () => (
  <div className="grid grid-cols-3 gap-3 mb-4">
    {[...Array(3)].map((_, i) => (
      <div key={i} className="h-28 bg-dark-card rounded-xl border border-dark-border animate-pulse" />
    ))}
  </div>
);

const Leaderboard = () => {
  const [entries, setEntries] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getLeaderboard(10)
      .then(setEntries)
      .catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  return (
    <section className="py-6 sm:py-8 px-4 sm:px-6">
      <div className="flex items-center gap-3 mb-6 max-w-2xl mx-auto">
        <h2 className="text-xl sm:text-2xl font-bold text-white">🏆 Top Reviewers</h2>
        <span className="text-xs text-gray-500 font-medium uppercase tracking-wider border border-dark-border rounded-full px-3 py-0.5">
          Leaderboard
        </span>
      </div>

      {loading ? (
        <div className="max-w-2xl mx-auto space-y-3">
          <SkeletonPodium />
          {[...Array(4)].map((_, i) => (
            <div key={i} className="h-14 bg-dark-card rounded-xl border border-dark-border animate-pulse" />
          ))}
        </div>
      ) : entries.length === 0 ? (
        <div className="max-w-2xl mx-auto text-center py-12">
          <p className="text-gray-500 text-sm">No reviews yet. Be the first to review a movie!</p>
          <a href="/" className="mt-3 inline-block text-blood-400 hover:text-blood-300 text-sm">
            Browse Movies →
          </a>
        </div>
      ) : (
        <div className="max-w-2xl mx-auto">
          {entries.length >= 1 && (
            <div className="grid grid-cols-3 gap-3 mb-4">
              {entries.slice(0, Math.min(3, entries.length)).map((entry, i) => (
                <PodiumCard key={entry.userId} entry={entry} medal={MEDALS[i]} />
              ))}
            </div>
          )}

          {entries.length > 3 && (
            <div className="space-y-2">
              {entries.slice(3).map((entry, i) => (
                <LeaderboardRow key={entry.userId} entry={entry} position={i + 4} />
              ))}
            </div>
          )}

          <RankLegend />
        </div>
      )}
    </section>
  );
};

export default Leaderboard;
