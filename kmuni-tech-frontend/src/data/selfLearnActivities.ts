import type { TopicKey, LevelKey } from './selfLearn';

export type ActivityQuestion = {
  id: string;
  prompt: string;
  options: string[];
  correctIndex: number;
};

export type ChapterActivity = {
  topic: TopicKey;
  level: LevelKey;
  chapterId: string;
  title: string;
  questions: ActivityQuestion[];
};

const q = (id: string, prompt: string, options: string[], correctIndex: number): ActivityQuestion => ({
  id,
  prompt,
  options,
  correctIndex,
});

// 5 questions per chapter (HTML + CSS only) – handcrafted, non-copyrighted.
export const SELF_LEARN_ACTIVITIES: Record<string, ChapterActivity> = {
  'html-b-structure': {
    topic: 'html',
    level: 'Beginner',
    chapterId: 'html-b-structure',
    title: 'Activity: HTML Page Structure',
    questions: [
      q('q1', 'What does `<!doctype html>` tell the browser?', ['The document is HTML5', 'The page should use dark mode', 'The page is encrypted', 'The page should load CSS'], 0),
      q('q2', 'Where should visible page content be placed?', ['Inside `<head>`', 'Inside `<body>`', 'Inside `<title>`', 'Inside `<meta>`'], 1),
      q('q3', 'Which tag sets the character encoding?', ['<meta charset="UTF-8" />', '<meta viewport="device-width" />', '<link rel="charset" />', '<title charset="UTF-8">'], 0),
      q('q4', 'Why is `lang="en"` on `<html>` useful?', ['It improves accessibility and SEO language detection', 'It loads English fonts automatically', 'It makes CSS work', 'It prevents errors in JavaScript'], 0),
      q('q5', 'Which element usually contains metadata and the page title?', ['<header>', '<main>', '<head>', '<footer>'], 2),
    ],
  },

  'html-b-content': {
    topic: 'html',
    level: 'Beginner',
    chapterId: 'html-b-content',
    title: 'Activity: Text, Links, Lists, Images',
    questions: [
      q('q1', 'Which HTML element is best for a paragraph?', ['<p>', '<div>', '<span>', '<section>'], 0),
      q('q2', 'If a link opens a new tab, which `rel` value is recommended for security?', ['noopener noreferrer', 'nofollow', 'external', 'unsafe'], 0),
      q('q3', 'Alt text is mainly used for…', ['Screen readers and fallback when image fails', 'Making images load faster', 'Applying CSS', 'Tracking clicks'], 0),
      q('q4', 'Which list type should you use for step-by-step instructions?', ['<ul>', '<ol>', '<dl>', '<li>'], 1),
      q('q5', 'Which is correct: links for navigation, buttons for…', ['layout', 'typography', 'actions', 'metadata'], 2),
    ],
  },

  'html-b-semantics': {
    topic: 'html',
    level: 'Beginner',
    chapterId: 'html-b-semantics',
    title: 'Activity: Semantic Layout',
    questions: [
      q('q1', 'Which tag usually contains the main unique content of the page?', ['<main>', '<nav>', '<header>', '<aside>'], 0),
      q('q2', 'Which tag is best for primary navigation links?', ['<nav>', '<section>', '<article>', '<footer>'], 0),
      q('q3', 'Semantic HTML is primarily about…', ['Meaning/structure, not styling', 'Making text bigger', 'Replacing CSS', 'Loading JavaScript faster'], 0),
      q('q4', 'Landmarks help…', ['Search engines only', 'Assistive tech navigate the page', 'Images load faster', 'Forms validate automatically'], 1),
      q('q5', 'Which is the best choice for an independent piece of content (like a blog post)?', ['<article>', '<span>', '<b>', '<small>'], 0),
    ],
  },

  'html-i-forms': {
    topic: 'html',
    level: 'Intermediate',
    chapterId: 'html-i-forms',
    title: 'Activity: Forms That Feel Professional',
    questions: [
      q('q1', 'How do you correctly connect a `<label>` to an `<input>`?', ['Use `for` on label and matching `id` on input', 'Wrap input in `<title>`', 'Use `href` on label', 'Use `name` only'], 0),
      q('q2', 'Which input type typically shows an email keyboard on mobile?', ['text', 'email', 'password', 'number'], 1),
      q('q3', 'What does `required` do?', ['Makes field optional', 'Prevents submitting without a value', 'Auto-fills the value', 'Encrypts the value'], 1),
      q('q4', 'Which attribute helps browsers suggest stored values?', ['autocomplete', 'aria-live', 'tabindex', 'data-cache'], 0),
      q('q5', 'For multi-line text input you should use…', ['<input type="text" />', '<textarea>', '<select>', '<option>'], 1),
    ],
  },

  'html-i-tables': {
    topic: 'html',
    level: 'Intermediate',
    chapterId: 'html-i-tables',
    title: 'Activity: Tables (The Right Way)',
    questions: [
      q('q1', 'Which tag defines a table header cell?', ['<td>', '<th>', '<tr>', '<thead>'], 1),
      q('q2', 'What does `<tr>` represent?', ['A table row', 'A table column', 'A table caption', 'A table footer'], 0),
      q('q3', 'Which section groups the header rows?', ['<thead>', '<tbody>', '<tfoot>', '<head>'], 0),
      q('q4', 'Which attribute can improve accessibility for header cells?', ['scope', 'href', 'target', 'style'], 0),
      q('q5', 'Tables are best used for…', ['Page layout', 'Tabular data', 'Buttons', 'Images'], 1),
    ],
  },

  'html-i-seo': {
    topic: 'html',
    level: 'Intermediate',
    chapterId: 'html-i-seo',
    title: 'Activity: SEO-Friendly HTML Basics',
    questions: [
      q('q1', 'A good page title should be…', ['Empty', 'Meaningful and specific', 'Only numbers', 'The same on every page'], 1),
      q('q2', 'Which improves SEO and accessibility most directly?', ['Semantic headings and structure', 'Using more `<div>`', 'Inline styles everywhere', 'Removing alt text'], 0),
      q('q3', 'Meta description is typically placed in…', ['<body>', '<head>', '<footer>', '<nav>'], 1),
      q('q4', 'Which is a good practice for headings?', ['Use h1 once for main topic', 'Skip from h1 to h4', 'Use h1 everywhere', 'Use headings only for styling'], 0),
      q('q5', 'Images should include…', ['Random alt text', 'No alt attribute', 'Meaningful alt text', 'Only width/height'], 2),
    ],
  },

  'html-a-accessibility': {
    topic: 'html',
    level: 'Advanced',
    chapterId: 'html-a-accessibility',
    title: 'Activity: Accessibility Patterns',
    questions: [
      q('q1', 'Keyboard accessibility means users can…', ['Use only a mouse', 'Navigate with Tab/Enter/Space', 'Only scroll', 'Only zoom'], 1),
      q('q2', 'For form inputs, the most important accessibility feature is…', ['Fancy placeholder', 'A visible label connected to the input', 'A background image', 'Inline CSS'], 1),
      q('q3', 'ARIA should be used…', ['As a replacement for semantic HTML always', 'Only when necessary to describe behavior', 'To style elements', 'To improve performance'], 1),
      q('q4', 'Which helps screen reader navigation?', ['Landmarks like `<main>` and `<nav>`', 'Using `<br>` often', 'Using only `<span>`', 'Removing headings'], 0),
      q('q5', 'Color contrast is important because…', ['It makes pages heavier', 'It affects readability for many users', 'It changes HTML validity', 'It disables CSS'], 1),
    ],
  },

  'html-a-media': {
    topic: 'html',
    level: 'Advanced',
    chapterId: 'html-a-media',
    title: 'Activity: Media & Embeds',
    questions: [
      q('q1', 'Which attribute shows default controls on a `<video>`?', ['controls', 'muted', 'poster', 'preload'], 0),
      q('q2', 'Which tag is used to provide multiple media sources?', ['<source>', '<track>', '<media>', '<file>'], 0),
      q('q3', 'Captions/subtitles for video are usually provided with…', ['<track kind="captions">', '<meta name="captions">', '<caption>', '<sub>'], 0),
      q('q4', 'For responsive images, a common CSS pattern is…', ['width: 100%; height: auto;', 'width: auto; height: 100%;', 'position: fixed;', 'display: none;'], 0),
      q('q5', 'Audio in HTML is typically embedded with…', ['<audio>', '<sound>', '<mp3>', '<media>'], 0),
    ],
  },

  'css-b-selectors': {
    topic: 'css',
    level: 'Beginner',
    chapterId: 'css-b-selectors',
    title: 'Activity: CSS Selectors & Specificity',
    questions: [
      q('q1', 'Which selector targets an element by id?', ['.card', '#card', 'card', '*card'], 1),
      q('q2', 'Which selector targets elements by class?', ['#btn', '.btn', 'btn()', 'btn:'], 1),
      q('q3', 'Specificity generally means…', ['How fast CSS loads', 'Which rule wins when multiple match', 'How big the font is', 'How many files you have'], 1),
      q('q4', 'Which selector targets all `<p>` elements?', ['p', '.p', '#p', '*p'], 0),
      q('q5', 'Which is more specific?', ['.btn', '#btn', 'button', '*'], 1),
    ],
  },

  'css-b-boxmodel': {
    topic: 'css',
    level: 'Beginner',
    chapterId: 'css-b-boxmodel',
    title: 'Activity: Box Model Basics',
    questions: [
      q('q1', 'The box model includes…', ['margin, border, padding, content', 'only text', 'only images', 'only grid'], 0),
      q('q2', 'Which property adds space inside the border?', ['margin', 'padding', 'gap', 'outline'], 1),
      q('q3', 'Which property adds space outside the border?', ['margin', 'padding', 'font-size', 'line-height'], 0),
      q('q4', '`box-sizing: border-box` means width includes…', ['Only content', 'Content + padding + border', 'Only margin', 'Only border'], 1),
      q('q5', 'Borders sit between…', ['content and padding', 'padding and margin', 'margin and background', 'text and font'], 1),
    ],
  },

  'css-b-responsive': {
    topic: 'css',
    level: 'Beginner',
    chapterId: 'css-b-responsive',
    title: 'Activity: Responsive Design Essentials',
    questions: [
      q('q1', 'A media query is used to…', ['Load JavaScript', 'Apply styles based on viewport/device', 'Validate forms', 'Compress images'], 1),
      q('q2', 'Which is generally a mobile-first approach?', ['Start with small screens, then add larger breakpoints', 'Start with desktop only', 'Disable media queries', 'Use fixed widths everywhere'], 0),
      q('q3', 'Which unit is relative to the root font size?', ['px', 'rem', 'deg', 's'], 1),
      q('q4', 'A common responsive image rule is…', ['max-width: 100%; height: auto;', 'width: 1000px;', 'position: absolute;', 'float: left;'], 0),
      q('q5', 'To prevent a layout from becoming too wide you often use…', ['max-width', 'min-height', 'z-index', 'outline'], 0),
    ],
  },

  'css-i-flexbox': {
    topic: 'css',
    level: 'Intermediate',
    chapterId: 'css-i-flexbox',
    title: 'Activity: Flexbox Layout',
    questions: [
      q('q1', 'To enable flex layout on a container you use…', ['display: flex', 'position: flex', 'flex: display', 'layout: flex'], 0),
      q('q2', 'Which property controls alignment on the main axis?', ['align-items', 'justify-content', 'place-items', 'text-align'], 1),
      q('q3', 'Which property controls alignment on the cross axis?', ['align-items', 'justify-content', 'flex-wrap', 'gap'], 0),
      q('q4', 'To allow items to wrap onto multiple lines you use…', ['flex-wrap: wrap', 'flex: wrap', 'wrap: true', 'overflow: wrap'], 0),
      q('q5', 'The default flex direction is…', ['column', 'row', 'grid', 'inline'], 1),
    ],
  },

  'css-i-grid': {
    topic: 'css',
    level: 'Intermediate',
    chapterId: 'css-i-grid',
    title: 'Activity: CSS Grid Fundamentals',
    questions: [
      q('q1', 'To enable grid layout you use…', ['display: grid', 'position: grid', 'grid: display', 'layout: grid'], 0),
      q('q2', 'Which property defines columns?', ['grid-template-columns', 'grid-columns', 'columns-template', 'grid-column-gap'], 0),
      q('q3', '`repeat(3, 1fr)` means…', ['3 columns each 1 fraction', '3 rows each 1 pixel', '1 column repeated 3 times in HTML', '3 fixed-width columns of 1px'], 0),
      q('q4', 'Which unit is common for flexible grid tracks?', ['fr', 'ms', 'dpi', 'vhx'], 0),
      q('q5', 'Grid is especially useful for…', ['2D layouts (rows and columns)', 'Only typography', 'Only animations', 'Only forms'], 0),
    ],
  },

  'css-i-states': {
    topic: 'css',
    level: 'Intermediate',
    chapterId: 'css-i-states',
    title: 'Activity: States, Pseudo-classes, Focus',
    questions: [
      q('q1', 'Which pseudo-class targets hover state?', [':hover', ':active()', ':press', ':mouse'], 0),
      q('q2', 'Which pseudo-class is important for keyboard users?', [':focus', ':visited', ':lang', ':root'], 0),
      q('q3', 'It is generally best to…', ['Remove focus outlines always', 'Keep focus styles visible', 'Disable tab navigation', 'Use only hover styles'], 1),
      q('q4', 'Which pseudo-class applies while clicking/tapping?', [':active', ':open', ':touch', ':pressed'], 0),
      q('q5', 'Pseudo-classes are used to style…', ['Element states and relationships', 'Only images', 'Only fonts', 'Only scripts'], 0),
    ],
  },

  'css-a-architecture': {
    topic: 'css',
    level: 'Advanced',
    chapterId: 'css-a-architecture',
    title: 'Activity: CSS Architecture & Maintainability',
    questions: [
      q('q1', 'A common naming convention for scalable CSS is…', ['BEM', 'SQL', 'JWT', 'MVC only'], 0),
      q('q2', 'CSS variables are defined with…', ['--my-color', '$myColor', '@color', 'var-color'], 0),
      q('q3', 'Why is avoiding overly-specific selectors helpful?', ['Fewer merge conflicts and easier overrides', 'It increases CPU usage', 'It makes HTML invalid', 'It disables cascade'], 0),
      q('q4', 'Design systems benefit from…', ['Consistent tokens and reusable patterns', 'Random colors per component', 'Inline styles everywhere', 'No reuse'], 0),
      q('q5', 'The cascade means…', ['Later/more specific rules can override earlier ones', 'CSS runs on the server', 'Only IDs can style elements', 'CSS ignores order'], 0),
    ],
  },

  'css-a-debugging': {
    topic: 'css',
    level: 'Advanced',
    chapterId: 'css-a-debugging',
    title: 'Activity: Debugging CSS Like a Pro',
    questions: [
      q('q1', 'The fastest way to see why a rule isn’t applying is usually…', ['Browser DevTools computed styles', 'Guessing', 'Restarting the PC', 'Adding more !important'], 0),
      q('q2', 'If spacing looks wrong, a quick debug trick is…', ['Add outlines temporarily', 'Delete HTML', 'Remove all CSS', 'Turn off the monitor'], 0),
      q('q3', 'When two rules conflict, the winner is decided by…', ['Specificity and source order', 'File name alphabetically', 'Font size', 'Image dimensions'], 0),
      q('q4', 'To debug flex layouts, you often inspect…', ['Flex container + item properties', 'Only JavaScript console', 'Only network tab', 'Only HTML validator'], 0),
      q('q5', 'A good practice when fixing CSS bugs is…', ['Make the smallest change and verify', 'Rewrite everything', 'Add many !important rules', 'Disable responsive design'], 0),
    ],
  },
};

export function getChapterActivity(topic: TopicKey, level: LevelKey, chapterId: string): ChapterActivity | undefined {
  const activity = SELF_LEARN_ACTIVITIES[chapterId];
  if (!activity) return undefined;
  if (activity.topic !== topic) return undefined;
  if (activity.level !== level) return undefined;
  return activity;
}
