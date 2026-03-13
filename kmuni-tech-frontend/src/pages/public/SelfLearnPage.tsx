import React, { useEffect, useMemo, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { BookOpen, CheckCircle2, Code2, ChevronLeft, ChevronRight } from 'lucide-react';
import Navbar from '../../components/layout/Navbar';
import Footer from '../../components/layout/Footer';
import { useAuth } from '../../context/AuthContext';
import {
  SELF_LEARN_CONTENT,
  SELF_LEARN_DOMAINS,
  type DomainKey,
  type LevelKey,
  type TopicKey,
} from '../../data/selfLearn';
import {
  buildProgressFromCompletions,
  getSelfLearnProgress,
  isChapterCompleted,
  isLevelFullyComplete,
  toggleChapterCompletion,
} from '../../utils/selfLearnProgress';
import { getChapterActivity } from '../../data/selfLearnActivities';
import {
  fetchSelfLearnChapterCompletions,
  fetchSelfLearnActivityAttempts,
  setSelfLearnChapterCompletion,
  submitSelfLearnActivityAttempt,
  type SelfLearnChapterCompletionDTO,
  type SelfLearnActivityAttemptDTO,
} from '../../utils/api';

export default function SelfLearnPage() {
  const { user, token } = useAuth();
  const userId = user?.id ?? null;

  const domains = useMemo(() => SELF_LEARN_DOMAINS, []);
  const [activeDomainKey, setActiveDomainKey] = useState<DomainKey>('web');
  const activeDomain = domains.find((d) => d.key === activeDomainKey) ?? domains[0];

  const [activeTopicKey, setActiveTopicKey] = useState<TopicKey>('html');
  const [activeLevel, setActiveLevel] = useState<LevelKey>('Beginner');
  const [activeChapterId, setActiveChapterId] = useState<string>('');
  const lessonTopRef = useRef<HTMLDivElement | null>(null);
  const [chapterPulse, setChapterPulse] = useState(false);

  const [activitySelections, setActivitySelections] = useState<Partial<Record<string, number>>>({});
  const [activityAttempts, setActivityAttempts] = useState<SelfLearnActivityAttemptDTO[]>([]);
  const [activityLoading, setActivityLoading] = useState(false);
  const [activityError, setActivityError] = useState('');
  const [activitySubmitting, setActivitySubmitting] = useState(false);
  const [activitySubmitError, setActivitySubmitError] = useState('');
  const [activityLastScore, setActivityLastScore] = useState<number | null>(null);

  const [localProgressTick, setLocalProgressTick] = useState(0);
  const localProgress = useMemo(() => {
    void localProgressTick;
    return getSelfLearnProgress(userId);
  }, [userId, localProgressTick]);

  const [completions, setCompletions] = useState<SelfLearnChapterCompletionDTO[]>([]);
  const [progressLoading, setProgressLoading] = useState(false);
  const [progressError, setProgressError] = useState('');

  useEffect(() => {
    setProgressError('');
    setCompletions([]);

    if (!token) return;

    let mounted = true;
    setProgressLoading(true);
    fetchSelfLearnChapterCompletions(token)
      .then((rows) => {
        if (!mounted) return;
        setCompletions(rows);
      })
      .catch((e: any) => {
        if (!mounted) return;
        setProgressError(e?.message || 'Failed to load self-learn progress');
      })
      .finally(() => {
        if (!mounted) return;
        setProgressLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [token]);

  const remoteProgress = useMemo(() => buildProgressFromCompletions(completions), [completions]);
  const progress = token ? remoteProgress : localProgress;

  const activityErrorHint = useMemo(() => {
    const msg = (activityError || '').toLowerCase();
    if (!msg) return '';
    if (
      msg.includes('failed to fetch') ||
      msg.includes('could not connect') ||
      msg.includes('network') ||
      msg.includes('connect to')
    ) {
      return 'Backend API is not reachable. Start it with: kmuni-tech-backend-nest → npm run start:dev';
    }
    if (msg.includes('cannot get')) {
      return 'Backend API route not found. Ensure the Nest backend is running on port 3000 and rebuilt/restarted.';
    }
    return '';
  }, [activityError]);

  const activeTopic = activeDomain.topics.find((t) => t.key === activeTopicKey) ?? activeDomain.topics[0];

  const chapters = useMemo(() => {
    if (!activeTopic) return [];
    return SELF_LEARN_CONTENT[activeTopic.key]?.[activeLevel] ?? [];
  }, [activeTopic, activeLevel]);

  useEffect(() => {
    setActiveChapterId(chapters[0]?.id ?? '');
  }, [activeTopicKey, activeLevel, chapters]);

  const activeChapter = useMemo(() => {
    if (!chapters.length) return undefined;
    return chapters.find((c) => c.id === activeChapterId) ?? chapters[0];
  }, [chapters, activeChapterId]);

  const activity = useMemo(() => {
    if (!activeTopic || !activeChapter) return undefined;
    return getChapterActivity(activeTopic.key, activeLevel, activeChapter.id);
  }, [activeTopic, activeLevel, activeChapter]);

  const activeChapterIndex = useMemo(() => {
    if (!activeChapter) return -1;
    return chapters.findIndex((c) => c.id === activeChapter.id);
  }, [chapters, activeChapter]);

  useEffect(() => {
    if (!activeChapterId) return;

    lessonTopRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    setChapterPulse(true);
    const timeoutId = window.setTimeout(() => setChapterPulse(false), 400);
    return () => window.clearTimeout(timeoutId);
  }, [activeChapterId]);

  useEffect(() => {
    setActivitySelections({});
    setActivityAttempts([]);
    setActivityError('');
    setActivitySubmitError('');
    setActivityLastScore(null);

    if (!token || !activity) return;

    let mounted = true;
    setActivityLoading(true);
    fetchSelfLearnActivityAttempts(
      { topic: activity.topic, level: activity.level, chapterId: activity.chapterId },
      token,
    )
      .then((rows) => {
        if (!mounted) return;
        setActivityAttempts(rows);
      })
      .catch((e: any) => {
        if (!mounted) return;
        setActivityError(e?.message || 'Failed to load activity attempts');
      })
      .finally(() => {
        if (!mounted) return;
        setActivityLoading(false);
      });

    return () => {
      mounted = false;
    };
  }, [token, activity?.chapterId, activity?.topic, activity?.level]);

  const isLevelComplete = Boolean(activeTopic && isLevelFullyComplete(progress, activeTopic.key, activeLevel));

  useEffect(() => {
    if (!activeDomain.enabled || activeDomain.topics.length === 0) return;
    const nextTopicKey = activeDomain.topics[0]?.key;
    if (nextTopicKey && !activeDomain.topics.some((t) => t.key === activeTopicKey)) {
      setActiveTopicKey(nextTopicKey);
    }
  }, [activeDomainKey, activeDomain.enabled, activeDomain.topics, activeTopicKey]);

  const completedCount = activeTopic
    ? chapters.filter((c) => isChapterCompleted(progress, activeTopic.key, activeLevel, c.id)).length
    : 0;

  async function onToggleChapter(topic: TopicKey, level: LevelKey, chapterId: string) {
    if (!token || !user) {
      toggleChapterCompletion(userId, topic, level, chapterId);
      setLocalProgressTick((t) => t + 1);
      return;
    }

    const isDone = isChapterCompleted(progress, topic, level, chapterId);
    try {
      const res = await setSelfLearnChapterCompletion(
        { topic, level, chapterId, completed: !isDone },
        token,
      );

      setCompletions((prev) => {
        const without = prev.filter(
          (r) => !(r.topic === topic && r.level === level && r.chapterId === chapterId),
        );
        if (!('completed' in res) || res.completed === false) return without;
        return [...without, { id: res.id, topic: res.topic, level: res.level, chapterId: res.chapterId, completedAt: res.completedAt }];
      });
    } catch (e: any) {
      setProgressError(e?.message || 'Failed to update progress');
    }
  }

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 bg-blue-500/10 border border-blue-500/20 rounded-full px-4 py-1.5 mb-5">
              <Code2 size={14} className="text-blue-300" />
              <span className="text-blue-300 text-xs font-bold uppercase tracking-widest">Self Learn Courses</span>
            </div>

            <div className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-5">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Learn by Yourself, Step by Step</h1>
                <p className="text-slate-400 text-lg max-w-3xl">
                  Choose a domain and start with the level that fits you — Beginner, Intermediate, or Advanced.
                </p>
              </div>

              <Link
                to="/self-learn/leaderboard"
                className="inline-flex items-center justify-center gap-2 rounded-2xl border border-amber-400/20 bg-amber-500/10 px-5 py-3 text-sm font-bold text-amber-100 transition-all hover:border-amber-300/40 hover:bg-amber-500/15"
              >
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-xl bg-amber-400/15 text-amber-300">#</span>
                View Leaderboard
              </Link>
            </div>
          </header>

          <div className="grid grid-cols-1 lg:grid-cols-[300px_1fr] gap-6">
            {/* Left sidebar (W3Schools-style) */}
            <aside className="card p-5 lg:sticky lg:top-24 h-fit">
              <p className="text-slate-300 text-sm font-semibold mb-4">Domains</p>
              <div className="space-y-2">
                {domains.map((d) => {
                  const Icon = d.icon;
                  const isActive = d.key === activeDomainKey;
                  const disabled = !d.enabled;

                  return (
                    <button
                      key={d.key}
                      type="button"
                      disabled={disabled}
                      onClick={() => setActiveDomainKey(d.key)}
                      className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-left transition-all border ${
                        isActive
                          ? 'bg-blue-600/20 border-blue-500/30 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                      } ${disabled ? 'opacity-50 cursor-not-allowed hover:border-white/10' : ''}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-blue-500/15' : 'bg-white/5'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-blue-300' : 'text-slate-400'} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{d.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{d.enabled ? `${d.topics.length} topics` : 'Coming soon'}</p>
                      </div>
                      <ChevronRight size={16} className={`ml-auto ${isActive ? 'text-blue-300' : 'text-slate-500'}`} />
                    </button>
                  );
                })}
              </div>
            </aside>

            {/* Main content */}
            <section className="card p-6 md:p-8">
              <div className="flex items-start justify-between gap-6 mb-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-white">{activeDomain.title}</h2>
                  <p className="text-slate-400 text-sm mt-2">
                    {activeDomain.enabled ? 'Pick a topic and choose your level.' : 'This domain will be added soon.'}
                  </p>
                </div>
                <div className="hidden sm:flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <span className="text-slate-400 text-xs font-semibold">Levels:</span>
                  <span className="text-white text-xs font-bold">Beginner</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-white text-xs font-bold">Intermediate</span>
                  <span className="text-slate-500">•</span>
                  <span className="text-white text-xs font-bold">Advanced</span>
                </div>
              </div>

              {activeDomain.enabled && activeDomain.topics.length > 0 ? (
                <div className="space-y-6">
                  {/* Topic picker */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {activeDomain.topics.map((t) => {
                      const isActive = t.key === activeTopicKey;
                      return (
                        <button
                          key={t.key}
                          type="button"
                          onClick={() => setActiveTopicKey(t.key)}
                          className={`text-left bg-white/5 border rounded-2xl p-6 transition-all ${
                            isActive ? 'border-blue-500/30' : 'border-white/10 hover:border-white/20'
                          }`}
                        >
                          <div className="flex items-start justify-between gap-4">
                            <div>
                              <h3 className="text-white font-bold text-xl">{t.title}</h3>
                              <p className="text-slate-400 text-sm mt-2">{t.description}</p>
                            </div>
                            <span
                              className={`px-3 py-1.5 rounded-xl text-xs font-bold border ${
                                isActive
                                  ? 'bg-blue-600/10 border-blue-500/20 text-blue-200'
                                  : 'bg-white/5 border-white/10 text-slate-300'
                              }`}
                            >
                              {isActive ? 'Selected' : 'Select'}
                            </span>
                          </div>

                          <div className="mt-5">
                            <p className="text-slate-300 text-sm font-semibold mb-3">Levels</p>
                            <div className="flex flex-wrap gap-2">
                              {t.levels.map((lvl) => (
                                <span
                                  key={lvl}
                                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-blue-600/10 border border-blue-500/20 text-blue-200"
                                >
                                  {lvl}
                                </span>
                              ))}
                            </div>
                          </div>
                        </button>
                      );
                    })}
                  </div>

                  {/* Level picker + certificate status */}
                  {activeTopic && (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                        <div>
                          <p className="text-slate-300 text-sm font-semibold">Now learning</p>
                          <p className="text-white font-bold text-xl mt-1">{activeTopic.title}</p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          {activeTopic.levels.map((lvl) => {
                            const selected = lvl === activeLevel;
                            return (
                              <button
                                key={lvl}
                                type="button"
                                onClick={() => setActiveLevel(lvl)}
                                className={`px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                                  selected
                                    ? 'bg-blue-600/20 border-blue-500/30 text-white'
                                    : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                                }`}
                              >
                                {lvl}
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                        <div className="min-w-0">
                          <p className="text-slate-300 text-sm font-semibold">Certificate</p>
                          {isLevelComplete ? (
                            <p className="text-emerald-400 text-sm mt-1 font-bold">
                              Unlocked — you completed all chapters in {activeLevel}.
                            </p>
                          ) : (
                            <p className="text-slate-400 text-sm mt-1">
                              Complete all chapters in this level to unlock the certificate.
                            </p>
                          )}
                        </div>
                        {user ? (
                          <a
                            href="/student/certificates"
                            className={`inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold border transition-all ${
                              isLevelComplete
                                ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-200'
                                : 'bg-white/5 border-white/10 text-slate-300'
                            }`}
                          >
                            View Certificates
                          </a>
                        ) : (
                          <a
                            href="/login"
                            className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold border bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                          >
                            Login to Save
                          </a>
                        )}
                      </div>
                    </div>
                  )}

                  {/* Chapter list */}
                  {activeTopic && activeChapter ? (
                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <p className="text-slate-300 text-sm font-semibold">Chapters</p>
                          <p className="text-slate-500 text-sm mt-1">Mark each chapter as completed when you finish it.</p>
                        </div>
                        <div className="text-xs font-bold text-slate-400">
                          {completedCount}/{chapters.length}
                        </div>
                      </div>

                      {token && progressLoading ? (
                        <p className="mt-4 text-slate-400 text-sm">Loading your progress…</p>
                      ) : null}
                      {progressError ? (
                        <p className="mt-4 text-sm text-red-400 font-semibold">{progressError}</p>
                      ) : null}

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {chapters.map((c, idx) => {
                          const selected = c.id === activeChapter.id;
                          const done = isChapterCompleted(progress, activeTopic.key, activeLevel, c.id);
                          return (
                            <div
                              key={c.id}
                              className={`rounded-2xl border p-4 flex items-start gap-3 ${
                                selected
                                  ? 'bg-blue-600/10 border-blue-500/20'
                                  : 'bg-white/5 border-white/10 hover:border-white/20'
                              }`}
                            >
                              <button
                                type="button"
                                onClick={() => onToggleChapter(activeTopic.key, activeLevel, c.id)}
                                className={`mt-0.5 w-6 h-6 rounded-lg border flex items-center justify-center ${
                                  done
                                    ? 'bg-emerald-500/15 border-emerald-500/25 text-emerald-300'
                                    : 'bg-white/5 border-white/10 text-slate-400 hover:border-white/20'
                                }`}
                                aria-label={done ? 'Mark chapter incomplete' : 'Mark chapter complete'}
                              >
                                {done ? <CheckCircle2 size={14} /> : <span className="text-xs font-bold">{idx + 1}</span>}
                              </button>

                              <button type="button" onClick={() => setActiveChapterId(c.id)} className="text-left min-w-0 flex-1">
                                <p className={`text-sm font-bold ${selected ? 'text-white' : 'text-slate-200'}`}>{c.title}</p>
                                <p className="text-xs text-slate-500 mt-1 line-clamp-2">{c.overview}</p>
                              </button>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ) : null}

                  {/* Lesson content */}
                  {activeChapter ? (
                    <div
                      className={`bg-gradient-to-br from-blue-600/10 to-green-600/5 border border-blue-500/20 rounded-3xl p-6 md:p-8 transition-all duration-300 ${
                        chapterPulse ? 'ring-2 ring-blue-500/30' : ''
                      }`}
                    >
                      <div ref={lessonTopRef} />
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-blue-300 text-xs font-bold uppercase tracking-widest">
                            {activeLevel} • {activeTopic?.title}
                          </p>
                          <h3 className="text-white font-bold text-2xl md:text-3xl mt-2">Lesson Guide</h3>
                          <p className="text-slate-300 text-sm font-semibold mt-2">{activeChapter.title}</p>
                        </div>
                        <div className="hidden md:flex items-center gap-2 px-4 py-2 rounded-2xl bg-white/5 border border-white/10">
                          <span className="text-slate-400 text-xs font-semibold">Progress:</span>
                          <span className="text-white text-xs font-bold">Chapters → Practice → Mini project</span>
                        </div>
                      </div>

                      <p className="text-slate-300 text-base leading-relaxed">{activeChapter.overview}</p>

                      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
                        {activeChapter.outcomes.map((o) => (
                          <div key={o} className="bg-white/5 border border-white/10 rounded-2xl p-4">
                            <p className="text-white font-semibold text-sm">Learning outcome</p>
                            <p className="text-slate-400 text-sm mt-1">{o}</p>
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 space-y-4">
                        {activeChapter.sections.map((s) => (
                          <div key={s.title} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                            <h4 className="text-white font-bold text-lg">{s.title}</h4>
                            <p className="text-slate-400 text-sm mt-2 leading-relaxed">{s.description}</p>
                            {s.bullets && s.bullets.length > 0 && (
                              <ul className="mt-3 space-y-1.5">
                                {s.bullets.map((b) => (
                                  <li key={b} className="text-slate-300 text-sm flex gap-2">
                                    <span className="text-blue-300">•</span>
                                    <span>{b}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                            {s.code && (
                              <div className="mt-4">
                                <div className="flex items-center justify-between mb-2">
                                  <span className="text-slate-400 text-xs font-semibold">Example ({s.code.languageLabel})</span>
                                </div>
                                <pre className="bg-[#0d0f1a]/70 border border-white/10 rounded-2xl p-4 overflow-auto text-slate-200 text-xs leading-relaxed">
{s.code.snippet}
                                </pre>
                              </div>
                            )}
                          </div>
                        ))}
                      </div>

                      <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h4 className="text-white font-bold text-lg">Practice tasks</h4>
                          <p className="text-slate-500 text-sm mt-1">Do these to lock in the concepts.</p>
                          <ul className="mt-4 space-y-2">
                            {activeChapter.practice.map((p) => (
                              <li key={p} className="text-slate-300 text-sm flex gap-2">
                                <span className="text-emerald-400">✓</span>
                                <span>{p}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                        <div className="bg-white/5 border border-white/10 rounded-2xl p-6">
                          <h4 className="text-white font-bold text-lg">{activeChapter.miniProject.title}</h4>
                          <p className="text-slate-500 text-sm mt-1">Build something small, end-to-end.</p>
                          <ol className="mt-4 space-y-2">
                            {activeChapter.miniProject.steps.map((st, idx) => (
                              <li key={st} className="text-slate-300 text-sm flex gap-2">
                                <span className="text-blue-300 font-bold">{idx + 1}.</span>
                                <span>{st}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
                      </div>

                      {/* Activity (Exam) */}
                      {activity ? (
                        <div className="mt-8 bg-white/5 border border-white/10 rounded-2xl p-6">
                          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                            <div>
                              <h4 className="text-white font-bold text-lg">Activity</h4>
                              <p className="text-slate-500 text-sm mt-1">5 questions • Max 3 attempts</p>
                            </div>
                            <div className="text-left sm:text-right">
                              <p className="text-slate-400 text-xs font-semibold">Attempts</p>
                              <p className="text-white text-sm font-bold mt-1">{Math.min(activityAttempts.length, 3)}/3</p>
                            </div>
                          </div>

                          {!user || !token ? (
                            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                              <p className="text-slate-300 text-sm font-semibold">Login required to attempt the activity.</p>
                              <a
                                href="/login"
                                className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold border bg-white/5 border-white/10 text-slate-300 hover:border-white/20"
                              >
                                Login
                              </a>
                            </div>
                          ) : activityLoading ? (
                            <p className="mt-5 text-slate-400 text-sm">Loading attempts…</p>
                          ) : activityError ? (
                            <div className="mt-5 rounded-2xl border border-white/10 bg-white/5 p-4">
                              <p className="text-slate-300 text-sm font-semibold">{activityError}</p>
                              {activityErrorHint ? (
                                <p className="text-slate-500 text-sm mt-2">{activityErrorHint}</p>
                              ) : null}
                            </div>
                          ) : (
                            <>
                              <div className="mt-5 space-y-4">
                                {activity.questions.map((question, index) => (
                                  <div key={question.id} className="bg-white/5 border border-white/10 rounded-2xl p-5">
                                    <p className="text-white font-semibold text-sm">Q{index + 1}. {question.prompt}</p>
                                    <div className="mt-3 space-y-2">
                                      {question.options.map((opt, optIndex) => {
                                        const selected = activitySelections[question.id] === optIndex;
                                        return (
                                          <button
                                            key={opt}
                                            type="button"
                                            onClick={() => setActivitySelections((prev) => ({ ...prev, [question.id]: optIndex }))}
                                            className={`w-full text-left px-4 py-3 rounded-xl border transition-all ${
                                              selected
                                                ? 'bg-blue-600/20 border-blue-500/30 text-white'
                                                : 'bg-white/5 border-white/10 text-slate-300 hover:border-white/20'
                                            }`}
                                          >
                                            <span className="text-sm font-semibold">{opt}</span>
                                          </button>
                                        );
                                      })}
                                    </div>
                                  </div>
                                ))}
                              </div>

                              {activitySubmitError ? (
                                <p className="mt-4 text-sm text-red-400 font-semibold">{activitySubmitError}</p>
                              ) : null}

                              {typeof activityLastScore === 'number' ? (
                                <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-4">
                                  <p className="text-slate-300 text-sm font-semibold">
                                    Last attempt score: <span className="text-white">{activityLastScore}/5</span>
                                  </p>
                                </div>
                              ) : null}

                              <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                                <div className="text-slate-400 text-sm">
                                  Best score: <span className="text-white font-bold">{Math.max(0, ...activityAttempts.map((a) => a.score))}/5</span>
                                </div>
                                <button
                                  type="button"
                                  disabled={activitySubmitting || activityAttempts.length >= 3}
                                  onClick={async () => {
                                    if (!activity || !token) return;
                                    setActivitySubmitError('');

                                    const unanswered = activity.questions.filter((q) => typeof activitySelections[q.id] !== 'number');
                                    if (unanswered.length > 0) {
                                      setActivitySubmitError('Please answer all questions before submitting.');
                                      return;
                                    }

                                    const answers = activity.questions.map((q) => activitySelections[q.id]);
                                    const score = activity.questions.reduce((acc, q) => {
                                      return acc + (activitySelections[q.id] === q.correctIndex ? 1 : 0);
                                    }, 0);

                                    try {
                                      setActivitySubmitting(true);
                                      const saved = await submitSelfLearnActivityAttempt(
                                        {
                                          topic: activity.topic,
                                          level: activity.level,
                                          chapterId: activity.chapterId,
                                          score,
                                          answers,
                                        },
                                        token,
                                      );
                                      setActivityAttempts((prev) => [...prev, saved]);
                                      setActivityLastScore(score);
                                    } catch (e: any) {
                                      setActivitySubmitError(e?.message || 'Failed to submit attempt');
                                    } finally {
                                      setActivitySubmitting(false);
                                    }
                                  }}
                                  className="inline-flex items-center justify-center px-4 py-2 rounded-xl text-sm font-bold border bg-blue-600/20 border-blue-500/30 text-white hover:bg-blue-600/25 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                  {activitySubmitting ? 'Submitting…' : activityAttempts.length >= 3 ? 'Attempt Limit Reached' : 'Submit Attempt'}
                                </button>
                              </div>
                            </>
                          )}
                        </div>
                      ) : null}

                      <div className="mt-8 flex items-center justify-between gap-3">
                        <button
                          type="button"
                          disabled={activeChapterIndex <= 0}
                          onClick={() => {
                            const prev = chapters[activeChapterIndex - 1];
                            if (prev) setActiveChapterId(prev.id);
                          }}
                          className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border bg-white/5 border-white/10 text-slate-300 hover:border-white/20 transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:active:scale-100"
                        >
                          <ChevronLeft
                            size={16}
                            className="transition-transform duration-200 ease-out group-hover:-translate-x-0.5 group-active:-translate-x-1"
                          />
                          Previous
                        </button>

                        <button
                          type="button"
                          disabled={activeChapterIndex < 0 || activeChapterIndex >= chapters.length - 1}
                          onClick={() => {
                            const next = chapters[activeChapterIndex + 1];
                            if (next) setActiveChapterId(next.id);
                          }}
                          className="group inline-flex items-center justify-center gap-2 px-4 py-2 rounded-xl text-sm font-bold border bg-white/5 border-white/10 text-slate-300 hover:border-white/20 transition-all duration-200 ease-out active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:border-white/10 disabled:active:scale-100"
                        >
                          Next
                          <ChevronRight
                            size={16}
                            className="transition-transform duration-200 ease-out group-hover:translate-x-0.5 group-active:translate-x-1"
                          />
                        </button>
                      </div>
                    </div>
                  ) : (
                    <div className="text-center py-10">
                      <p className="text-slate-400">Select a topic to see content.</p>
                    </div>
                  )}
                </div>
              ) : (
                <div className="text-center py-16">
                  <div className="w-16 h-16 bg-white/5 rounded-2xl flex items-center justify-center mx-auto mb-4">
                    <BookOpen size={24} className="text-slate-500" />
                  </div>
                  <p className="text-white font-semibold text-xl">Coming soon</p>
                  <p className="text-slate-500 text-sm mt-2">We’re adding this domain next.</p>
                </div>
              )}
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
