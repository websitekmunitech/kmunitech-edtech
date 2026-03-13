import React, { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { Crown, Medal, Trophy, Target, Gauge, Layers3 } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import LoadingSpinner from '../../components/common/LoadingSpinner';
import { useAuth } from '../../context/AuthContext';
import {
  fetchPublicSelfLearnLeaderboard,
  type PublicSelfLearnLeaderboardEntry,
} from '../../utils/api';
import {
  SELF_LEARN_DOMAINS,
  type LevelKey,
  type TopicKey,
} from '../../data/selfLearn';

type TopicFilter = 'all' | TopicKey;
type LevelFilter = 'all' | LevelKey;

const roleBadge: Record<string, string> = {
  student: 'border-emerald-500/20 bg-emerald-500/10 text-emerald-300',
  instructor: 'border-blue-500/20 bg-blue-500/10 text-blue-300',
};

const podiumTone = [
  'from-amber-300/20 via-amber-400/10 to-transparent border-amber-300/25',
  'from-slate-200/15 via-slate-300/10 to-transparent border-slate-200/20',
  'from-orange-400/15 via-orange-300/10 to-transparent border-orange-300/20',
];

function formatDate(value: string) {
  if (!value) return 'No attempts yet';
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return 'No attempts yet';
  return date.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' });
}

export default function SelfLearnLeaderboardPage() {
  const { user } = useAuth();
  const [items, setItems] = useState<PublicSelfLearnLeaderboardEntry[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [topicFilter, setTopicFilter] = useState<TopicFilter>('all');
  const [levelFilter, setLevelFilter] = useState<LevelFilter>('all');

  const topics = useMemo(
    () => SELF_LEARN_DOMAINS.flatMap((domain) => domain.topics.map((topic) => ({ key: topic.key, title: topic.title }))),
    [],
  );

  useEffect(() => {
    let mounted = true;

    (async () => {
      try {
        setIsLoading(true);
        setError('');
        const response = await fetchPublicSelfLearnLeaderboard({
          limit: 50,
          topic: topicFilter === 'all' ? undefined : topicFilter,
          level: levelFilter === 'all' ? undefined : levelFilter,
        });
        if (!mounted) return;
        setItems(response.items);
      } catch (e: any) {
        if (!mounted) return;
        setError(e?.message || 'Failed to load leaderboard');
      } finally {
        if (!mounted) return;
        setIsLoading(false);
      }
    })();

    return () => {
      mounted = false;
    };
  }, [topicFilter, levelFilter]);

  const topThree = items.slice(0, 3);
  const remaining = items.slice(3);
  const totalPoints = items.reduce((sum, item) => sum + item.totalPoints, 0);
  const averageAccuracy = items.length > 0
    ? Math.round(items.reduce((sum, item) => sum + item.accuracyPercent, 0) / items.length)
    : 0;

  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(245,158,11,0.16),_transparent_28%),linear-gradient(180deg,_#0b1220_0%,_#0f172a_48%,_#111827_100%)]">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <header className="mb-10 overflow-hidden rounded-[32px] border border-white/10 bg-white/5 p-6 shadow-[0_30px_80px_rgba(0,0,0,0.35)] backdrop-blur-xl md:p-8">
            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
              <div className="max-w-3xl">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-amber-400/20 bg-amber-500/10 px-4 py-1.5">
                  <Trophy size={14} className="text-amber-300" />
                  <span className="text-xs font-bold uppercase tracking-[0.24em] text-amber-200">Self Learn Leaderboard</span>
                </div>
                <h1 className="text-4xl font-black tracking-tight text-white md:text-5xl">Ranked by self-learn marks and chapter performance</h1>
                <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-300 md:text-base">
                  Rankings are calculated from the best score earned in each self-learn chapter. More points place you higher, with accuracy and chapter coverage used as tie-breakers.
                </p>
              </div>

              <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Ranked learners</p>
                  <p className="mt-2 text-3xl font-black text-white">{items.length}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Points banked</p>
                  <p className="mt-2 text-3xl font-black text-white">{totalPoints}</p>
                </div>
                <div className="rounded-2xl border border-white/10 bg-slate-950/35 p-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Avg accuracy</p>
                  <p className="mt-2 text-3xl font-black text-white">{averageAccuracy}%</p>
                </div>
              </div>
            </div>
          </header>

          <section className="mb-8 flex flex-col gap-4 rounded-[28px] border border-white/10 bg-white/5 p-5 backdrop-blur-xl lg:flex-row lg:items-center lg:justify-between">
            <div>
              <p className="text-sm font-semibold text-white">Filter standings</p>
              <p className="mt-1 text-sm text-slate-400">Focus on a topic or level to compare specific self-learn tracks.</p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setTopicFilter('all')}
                  className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                    topicFilter === 'all'
                      ? 'border-amber-300/30 bg-amber-400/10 text-white'
                      : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                  }`}
                >
                  All Topics
                </button>
                {topics.map((topic) => (
                  <button
                    key={topic.key}
                    type="button"
                    onClick={() => setTopicFilter(topic.key)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                      topicFilter === topic.key
                        ? 'border-amber-300/30 bg-amber-400/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {topic.title}
                  </button>
                ))}
              </div>

              <div className="flex flex-wrap gap-2">
                {(['all', 'Beginner', 'Intermediate', 'Advanced'] as const).map((level) => (
                  <button
                    key={level}
                    type="button"
                    onClick={() => setLevelFilter(level)}
                    className={`rounded-xl border px-4 py-2 text-sm font-semibold transition-all ${
                      levelFilter === level
                        ? 'border-sky-300/30 bg-sky-400/10 text-white'
                        : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                    }`}
                  >
                    {level === 'all' ? 'All Levels' : level}
                  </button>
                ))}
              </div>
            </div>
          </section>

          {isLoading ? (
            <div className="py-16">
              <LoadingSpinner text="Loading leaderboard..." />
            </div>
          ) : error ? (
            <div className="rounded-[28px] border border-red-500/20 bg-red-500/10 p-6 text-sm text-red-100">
              {error}
            </div>
          ) : items.length === 0 ? (
            <div className="rounded-[28px] border border-white/10 bg-white/5 p-8 text-center backdrop-blur-xl">
              <p className="text-xl font-bold text-white">No ranked attempts yet</p>
              <p className="mt-2 text-sm text-slate-400">Complete self-learn chapter activities to start appearing here.</p>
              <Link to="/self-learn" className="mt-5 inline-flex rounded-xl border border-amber-300/20 bg-amber-400/10 px-5 py-3 text-sm font-bold text-amber-100">
                Start Self Learn
              </Link>
            </div>
          ) : (
            <div className="space-y-8">
              <section className="grid grid-cols-1 gap-5 lg:grid-cols-3">
                {topThree.map((entry, index) => {
                  const isCurrentUser = user?.id === entry.user.id;
                  const accent = podiumTone[index] ?? podiumTone[podiumTone.length - 1];
                  const icon = index === 0 ? Crown : Medal;
                  const Icon = icon;
                  return (
                    <article
                      key={entry.user.id}
                      className={`relative overflow-hidden rounded-[30px] border bg-gradient-to-b ${accent} p-6 shadow-[0_25px_70px_rgba(0,0,0,0.25)]`}
                    >
                      <div className="absolute right-5 top-5 text-5xl font-black text-white/10">#{entry.rank}</div>
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl bg-white/10 text-white shadow-lg shadow-black/20">
                        <Icon size={22} className={index === 0 ? 'text-amber-200' : 'text-slate-200'} />
                      </div>
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-2xl font-black text-white">{entry.user.name}</p>
                          <div className="mt-2 flex flex-wrap items-center gap-2">
                            <span className={`rounded-full border px-3 py-1 text-xs font-bold uppercase tracking-wide ${roleBadge[entry.user.role]}`}>
                              {entry.user.role}
                            </span>
                            {isCurrentUser ? (
                              <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-3 py-1 text-xs font-bold uppercase tracking-wide text-amber-100">
                                You
                              </span>
                            ) : null}
                          </div>
                        </div>
                        <p className="text-right text-sm text-slate-300">Updated {formatDate(entry.lastActivityAt)}</p>
                      </div>

                      <div className="mt-6 grid grid-cols-2 gap-3">
                        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Points</p>
                          <p className="mt-1 text-3xl font-black text-white">{entry.totalPoints}</p>
                          <p className="text-sm text-slate-400">out of {entry.totalPossiblePoints}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-slate-950/30 p-4">
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Accuracy</p>
                          <p className="mt-1 text-3xl font-black text-white">{entry.accuracyPercent}%</p>
                          <p className="text-sm text-slate-400">best chapter scores</p>
                        </div>
                      </div>

                      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300">
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center gap-2 text-slate-400"><Layers3 size={15} /> Chapters played</div>
                          <p className="mt-2 text-lg font-bold text-white">{entry.chaptersPlayed}</p>
                        </div>
                        <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
                          <div className="flex items-center gap-2 text-slate-400"><Target size={15} /> Attempts used</div>
                          <p className="mt-2 text-lg font-bold text-white">{entry.attemptsCount}</p>
                        </div>
                      </div>
                    </article>
                  );
                })}
              </section>

              <section className="overflow-hidden rounded-[30px] border border-white/10 bg-white/5 backdrop-blur-xl">
                <div className="flex items-center justify-between gap-4 border-b border-white/10 px-6 py-5">
                  <div>
                    <h2 className="text-xl font-bold text-white">Full standings</h2>
                    <p className="mt-1 text-sm text-slate-400">Ordered by total self-learn marks, then accuracy and chapter coverage.</p>
                  </div>
                  <Link to="/self-learn" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-200 hover:border-white/20">
                    Go to Self Learn
                  </Link>
                </div>

                <div className="divide-y divide-white/6">
                  {items.map((entry) => {
                    const isCurrentUser = user?.id === entry.user.id;
                    return (
                      <div
                        key={entry.user.id}
                        className={`grid grid-cols-1 gap-4 px-6 py-5 lg:grid-cols-[88px_minmax(0,1.6fr)_repeat(4,minmax(0,0.8fr))_150px] lg:items-center ${
                          isCurrentUser ? 'bg-amber-400/8' : 'bg-transparent'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-slate-950/40 text-lg font-black text-white">
                            {entry.rank}
                          </div>
                          <div className="lg:hidden">
                            <p className="text-base font-bold text-white">{entry.user.name}</p>
                            <p className="text-xs text-slate-500">{entry.user.role}</p>
                          </div>
                        </div>

                        <div className="hidden min-w-0 lg:block">
                          <div className="flex items-center gap-2">
                            <p className="truncate text-base font-bold text-white">{entry.user.name}</p>
                            <span className={`rounded-full border px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${roleBadge[entry.user.role]}`}>
                              {entry.user.role}
                            </span>
                            {isCurrentUser ? (
                              <span className="rounded-full border border-amber-300/20 bg-amber-400/10 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-amber-100">
                                You
                              </span>
                            ) : null}
                          </div>
                          <p className="mt-1 truncate text-sm text-slate-400">{entry.user.bio || 'Focused on climbing the self-learn leaderboard.'}</p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Points</p>
                          <p className="mt-1 text-lg font-bold text-white">{entry.totalPoints}/{entry.totalPossiblePoints}</p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Accuracy</p>
                          <p className="mt-1 flex items-center gap-2 text-lg font-bold text-white"><Gauge size={15} className="text-sky-300" /> {entry.accuracyPercent}%</p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Chapters</p>
                          <p className="mt-1 text-lg font-bold text-white">{entry.chaptersPlayed}</p>
                        </div>

                        <div>
                          <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Attempts</p>
                          <p className="mt-1 text-lg font-bold text-white">{entry.attemptsCount}</p>
                        </div>

                        <div className="flex items-center justify-between gap-3 lg:block lg:text-right">
                          <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-slate-500">Last activity</p>
                            <p className="mt-1 text-sm font-semibold text-slate-200">{formatDate(entry.lastActivityAt)}</p>
                          </div>
                          <Link
                            to={`/profile/${entry.user.id}`}
                            className="inline-flex rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm font-semibold text-slate-100 hover:border-white/20"
                          >
                            Profile
                          </Link>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </section>
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
}