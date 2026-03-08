import type { LevelKey, TopicKey } from '../data/selfLearn';
import { SELF_LEARN_CONTENT } from '../data/selfLearn';

export type SelfLearnProgressV1 = {
  version: 1;
  // completedChapterIds[topic][level] => string[]
  completedChapterIds: Partial<Record<TopicKey, Partial<Record<LevelKey, string[]>>>>;
  // completedAt[topic][level] => ISO timestamp
  completedAt: Partial<Record<TopicKey, Partial<Record<LevelKey, string>>>>;
};

const STORAGE_VERSION = 1 as const;

function storageKey(userId?: string | null) {
  const safe = (userId || 'guest').trim() || 'guest';
  return `kmuni_selflearn_progress_v${STORAGE_VERSION}_${safe}`;
}

function uniqueStrings(items: string[]) {
  return Array.from(new Set(items)).filter(Boolean);
}

export function getSelfLearnProgress(userId?: string | null): SelfLearnProgressV1 {
  const key = storageKey(userId);
  try {
    const raw = localStorage.getItem(key);
    if (!raw) return { version: 1, completedChapterIds: {}, completedAt: {} };
    const parsed = JSON.parse(raw);
    if (!parsed || parsed.version !== 1) return { version: 1, completedChapterIds: {}, completedAt: {} };

    return {
      version: 1,
      completedChapterIds: parsed.completedChapterIds ?? {},
      completedAt: parsed.completedAt ?? {},
    };
  } catch {
    return { version: 1, completedChapterIds: {}, completedAt: {} };
  }
}

export function setSelfLearnProgress(userId: string | null | undefined, next: SelfLearnProgressV1) {
  const key = storageKey(userId);
  localStorage.setItem(key, JSON.stringify(next));
}

export function isChapterCompleted(progress: SelfLearnProgressV1, topic: TopicKey, level: LevelKey, chapterId: string) {
  const list = progress.completedChapterIds?.[topic]?.[level] ?? [];
  return list.includes(chapterId);
}

export function toggleChapterCompletion(userId: string | null | undefined, topic: TopicKey, level: LevelKey, chapterId: string) {
  const progress = getSelfLearnProgress(userId);
  const prev = progress.completedChapterIds?.[topic]?.[level] ?? [];
  const exists = prev.includes(chapterId);
  const nextList = exists ? prev.filter((id) => id !== chapterId) : uniqueStrings([...prev, chapterId]);

  const next: SelfLearnProgressV1 = {
    ...progress,
    completedChapterIds: {
      ...progress.completedChapterIds,
      [topic]: {
        ...(progress.completedChapterIds?.[topic] ?? {}),
        [level]: nextList,
      },
    },
    completedAt: { ...progress.completedAt },
  };

  // If a level becomes fully complete, stamp completedAt.
  if (isLevelFullyComplete(next, topic, level)) {
    next.completedAt = {
      ...next.completedAt,
      [topic]: {
        ...(next.completedAt?.[topic] ?? {}),
        [level]: next.completedAt?.[topic]?.[level] ?? new Date().toISOString(),
      },
    };
  } else {
    // If it becomes incomplete again, remove completedAt.
    if (next.completedAt?.[topic]?.[level]) {
      const topicCompletedAt = { ...(next.completedAt?.[topic] ?? {}) };
      delete (topicCompletedAt as any)[level];
      next.completedAt = {
        ...next.completedAt,
        [topic]: topicCompletedAt,
      };
    }
  }

  setSelfLearnProgress(userId, next);
  return next;
}

export function getLevelChapters(topic: TopicKey, level: LevelKey) {
  return SELF_LEARN_CONTENT?.[topic]?.[level] ?? [];
}

export function isLevelFullyComplete(progress: SelfLearnProgressV1, topic: TopicKey, level: LevelKey) {
  const chapters = getLevelChapters(topic, level);
  if (chapters.length === 0) return false;

  const completed = progress.completedChapterIds?.[topic]?.[level] ?? [];
  return chapters.every((c) => completed.includes(c.id));
}

export type UnlockedCertificate = {
  id: string;
  topic: TopicKey;
  level: LevelKey;
  title: string;
  issuedAt: string;
};

export function getUnlockedCertificatesFromProgress(progress: SelfLearnProgressV1): UnlockedCertificate[] {
  const topics = Object.keys(SELF_LEARN_CONTENT) as TopicKey[];

  const out: UnlockedCertificate[] = [];
  for (const topic of topics) {
    const levels = Object.keys(SELF_LEARN_CONTENT[topic]) as LevelKey[];
    for (const level of levels) {
      if (!isLevelFullyComplete(progress, topic, level)) continue;
      const issuedAt = progress.completedAt?.[topic]?.[level] ?? new Date().toISOString();
      out.push({
        id: `selflearn:${topic}:${level}`,
        topic,
        level,
        title: `Self-Learn ${topic.toUpperCase()} — ${level} Certificate`,
        issuedAt,
      });
    }
  }

  // Latest first
  return out.sort((a, b) => (a.issuedAt < b.issuedAt ? 1 : -1));
}

export function getUnlockedCertificates(userId: string | null | undefined): UnlockedCertificate[] {
  const progress = getSelfLearnProgress(userId);
  return getUnlockedCertificatesFromProgress(progress);
}

export type SelfLearnCompletionRow = {
  topic: string;
  level: string;
  chapterId: string;
  completedAt: string;
};

function isTopicKey(x: string): x is TopicKey {
  return ['html', 'css', 'js', 'node', 'deploy', 'python', 'ml', 'sql', 'git'].includes(x);
}

function isLevelKey(x: string): x is LevelKey {
  return ['Beginner', 'Intermediate', 'Advanced'].includes(x);
}

export function buildProgressFromCompletions(rows: SelfLearnCompletionRow[]): SelfLearnProgressV1 {
  const completedChapterIds: SelfLearnProgressV1['completedChapterIds'] = {};
  const chapterCompletedAt: Record<string, string> = {};

  for (const row of rows) {
    if (!row) continue;
    const topic = String(row.topic || '').trim();
    const level = String(row.level || '').trim();
    const chapterId = String(row.chapterId || '').trim();
    const completedAt = String(row.completedAt || '').trim();
    if (!topic || !level || !chapterId || !completedAt) continue;
    if (!isTopicKey(topic) || !isLevelKey(level)) continue;

    const nextTopic = (completedChapterIds[topic] ?? {}) as Partial<Record<LevelKey, string[]>>;
    const prevList = nextTopic[level] ?? [];
    nextTopic[level] = uniqueStrings([...prevList, chapterId]);
    completedChapterIds[topic] = nextTopic;

    chapterCompletedAt[`${topic}::${level}::${chapterId}`] = completedAt;
  }

  // Compute per-level completion timestamps (when the final required chapter was completed).
  const completedAt: SelfLearnProgressV1['completedAt'] = {};
  for (const topic of Object.keys(SELF_LEARN_CONTENT) as TopicKey[]) {
    const levels = Object.keys(SELF_LEARN_CONTENT[topic]) as LevelKey[];
    for (const level of levels) {
      const chapters = getLevelChapters(topic, level);
      if (chapters.length === 0) continue;

      const doneIds = completedChapterIds?.[topic]?.[level] ?? [];
      const isComplete = chapters.every((c) => doneIds.includes(c.id));
      if (!isComplete) continue;

      let maxIso = '';
      for (const c of chapters) {
        const iso = chapterCompletedAt[`${topic}::${level}::${c.id}`] || '';
        if (!maxIso || (iso && iso > maxIso)) maxIso = iso;
      }

      completedAt[topic] = {
        ...(completedAt[topic] ?? {}),
        [level]: maxIso || new Date().toISOString(),
      };
    }
  }

  return { version: 1, completedChapterIds, completedAt };
}
