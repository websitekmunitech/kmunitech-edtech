import React, { useEffect, useMemo, useState } from 'react';
import { BookOpen, CheckCircle2, Code2, ChevronRight } from 'lucide-react';
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
  getSelfLearnProgress,
  isChapterCompleted,
  isLevelFullyComplete,
  toggleChapterCompletion,
} from '../../utils/selfLearnProgress';

export default function SelfLearnPage() {
  const { user } = useAuth();
  const userId = user?.id ?? null;

  const domains = useMemo(() => SELF_LEARN_DOMAINS, []);
  const [activeDomainKey, setActiveDomainKey] = useState<DomainKey>('web');
  const activeDomain = domains.find((d) => d.key === activeDomainKey) ?? domains[0];

  const [activeTopicKey, setActiveTopicKey] = useState<TopicKey>('html');
  const [activeLevel, setActiveLevel] = useState<LevelKey>('Beginner');
  const [activeChapterId, setActiveChapterId] = useState<string>('');

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

  const [progressTick, setProgressTick] = useState(0);
  const progress = useMemo(() => {
    void progressTick;
    return getSelfLearnProgress(userId);
  }, [userId, progressTick]);

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

  function onToggleChapter(topic: TopicKey, level: LevelKey, chapterId: string) {
    toggleChapterCompletion(userId, topic, level, chapterId);
    setProgressTick((t) => t + 1);
  }

  return (
    <div className="min-h-screen bg-[#0d0f1a]">
      <Navbar />

      <main className="pt-24 pb-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-10">
            <div className="inline-flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 rounded-full px-4 py-1.5 mb-5">
              <Code2 size={14} className="text-indigo-300" />
              <span className="text-indigo-300 text-xs font-bold uppercase tracking-widest">Self Learn Courses</span>
            </div>

            <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">Learn by Yourself, Step by Step</h1>
            <p className="text-slate-400 text-lg max-w-3xl">
              Choose a domain and start with the level that fits you — Beginner, Intermediate, or Advanced.
            </p>
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
                          ? 'bg-indigo-600/20 border-indigo-500/30 text-white'
                          : 'border-white/10 bg-white/5 text-slate-300 hover:border-white/20'
                      } ${disabled ? 'opacity-50 cursor-not-allowed hover:border-white/10' : ''}`}
                    >
                      <div
                        className={`w-9 h-9 rounded-xl flex items-center justify-center ${
                          isActive ? 'bg-indigo-500/15' : 'bg-white/5'
                        }`}
                      >
                        <Icon size={16} className={isActive ? 'text-indigo-300' : 'text-slate-400'} />
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm truncate">{d.title}</p>
                        <p className="text-xs text-slate-500 mt-0.5">{d.enabled ? `${d.topics.length} topics` : 'Coming soon'}</p>
                      </div>
                      <ChevronRight size={16} className={`ml-auto ${isActive ? 'text-indigo-300' : 'text-slate-500'}`} />
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
                            isActive ? 'border-indigo-500/30' : 'border-white/10 hover:border-white/20'
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
                                  ? 'bg-indigo-600/10 border-indigo-500/20 text-indigo-200'
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
                                  className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-indigo-600/10 border border-indigo-500/20 text-indigo-200"
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
                                    ? 'bg-indigo-600/20 border-indigo-500/30 text-white'
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

                      <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-3">
                        {chapters.map((c, idx) => {
                          const selected = c.id === activeChapter.id;
                          const done = isChapterCompleted(progress, activeTopic.key, activeLevel, c.id);
                          return (
                            <div
                              key={c.id}
                              className={`rounded-2xl border p-4 flex items-start gap-3 ${
                                selected
                                  ? 'bg-indigo-600/10 border-indigo-500/20'
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
                    <div className="bg-gradient-to-br from-indigo-600/10 to-purple-600/5 border border-indigo-500/20 rounded-3xl p-6 md:p-8">
                      <div className="flex items-center justify-between gap-4 mb-6">
                        <div>
                          <p className="text-indigo-300 text-xs font-bold uppercase tracking-widest">
                            {activeLevel} • {activeTopic?.title}
                          </p>
                          <h3 className="text-white font-bold text-2xl md:text-3xl mt-2">Lesson Guide</h3>
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
                                    <span className="text-indigo-300">•</span>
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
                                <span className="text-indigo-300 font-bold">{idx + 1}.</span>
                                <span>{st}</span>
                              </li>
                            ))}
                          </ol>
                        </div>
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
