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

  'html-b-attributes': {
    topic: 'html',
    level: 'Beginner',
    chapterId: 'html-b-attributes',
    title: 'Activity: Elements, Attributes, Nesting',
    questions: [
      q('q1', 'An HTML attribute is used to…', ['Add extra information/config to an element', 'Replace CSS', 'Run JavaScript automatically', 'Make text bold always'], 0),
      q('q2', 'Which is a void (empty) element?', ['<p>', '<div>', '<img>', '<section>'], 2),
      q('q3', 'A boolean attribute is typically…', ['Always written with a number value', 'Enabled by its presence (e.g., required)', 'Only used in CSS', 'Only used on links'], 1),
      q('q4', 'To connect a label to an input you need…', ['label href + input src', 'label for + input id', 'label id + input for', 'label name + input class'], 1),
      q('q5', 'Proper nesting means…', ['Closing tags in the correct order', 'Using only div elements', 'Using uppercase tags', 'Avoiding all attributes'], 0),
    ],
  },

  'html-b-block-inline': {
    topic: 'html',
    level: 'Beginner',
    chapterId: 'html-b-block-inline',
    title: 'Activity: Block vs Inline + Containers',
    questions: [
      q('q1', 'Which is commonly an inline element?', ['<p>', '<section>', '<a>', '<article>'], 2),
      q('q2', 'Which is commonly a block element?', ['<span>', '<em>', '<div>', '<a>'], 2),
      q('q3', 'You should choose elements primarily based on…', ['Meaning/semantics', 'How big they look by default', 'Random preference', 'File name'], 0),
      q('q4', 'A good use of <span> is…', ['Wrapping an entire page layout', 'Grouping a word inside a paragraph', 'Replacing <main>', 'Creating navigation'], 1),
      q('q5', 'A good use of <div> is…', ['Adding meaning like “navigation”', 'Grouping content for layout/styling when semantics don’t fit', 'Replacing headings', 'Creating form labels'], 1),
    ],
  },

  'html-i-validation': {
    topic: 'html',
    level: 'Intermediate',
    chapterId: 'html-i-validation',
    title: 'Activity: Native Form Validation',
    questions: [
      q('q1', 'Which attribute prevents submitting a form without a value?', ['required', 'readonly', 'open', 'autofocus'], 0),
      q('q2', 'Which attribute is used to constrain text length?', ['minlength/maxlength', 'min/max', 'pattern only', 'scope'], 0),
      q('q3', 'aria-describedby is commonly used to…', ['Attach helper/error text to a field', 'Change font size', 'Encrypt form data', 'Submit faster'], 0),
      q('q4', 'Which is generally a good first choice for email validation?', ['type="email"', 'pattern with a huge regex', 'contenteditable', 'id="email" only'], 0),
      q('q5', 'novalidate on a form will…', ['Disable native validation UI', 'Enable stricter validation', 'Autofill fields', 'Convert GET to POST'], 0),
    ],
  },

  'html-i-media-embeds': {
    topic: 'html',
    level: 'Intermediate',
    chapterId: 'html-i-media-embeds',
    title: 'Activity: Media + Embeds',
    questions: [
      q('q1', 'Which element provides the built-in UI for a video player?', ['controls attribute on <video>', '<caption>', '<meta>', '<figure>'], 0),
      q('q2', 'Multiple encodings for a video are typically provided using…', ['Multiple <source> tags', 'Multiple <title> tags', 'Multiple <body> tags', 'Multiple <track> tags only'], 0),
      q('q3', 'An iframe should have a title because…', ['It improves accessibility for screen readers', 'It adds CSS', 'It validates JavaScript', 'It removes ads'], 0),
      q('q4', 'The sandbox attribute on an iframe is used to…', ['Restrict capabilities of embedded content', 'Speed up HTML parsing', 'Change image resolution', 'Make it responsive automatically'], 0),
      q('q5', 'Captions for a video are commonly provided via…', ['<track kind="captions">', '<caption>', '<meta name="captions">', '<subtitle>'], 0),
    ],
  },

  'html-a-interactive': {
    topic: 'html',
    level: 'Advanced',
    chapterId: 'html-a-interactive',
    title: 'Activity: Interactive HTML',
    questions: [
      q('q1', 'The <details> element is commonly used for…', ['Expandable/disclosure content', 'Page navigation', 'Embedding videos', 'Submitting forms'], 0),
      q('q2', 'The clickable label for a <details> element is…', ['<summary>', '<caption>', '<legend>', '<title>'], 0),
      q('q3', 'A <dialog> can be opened in JavaScript using…', ['showModal()', 'open()', 'run()', 'display()'], 0),
      q('q4', 'A good practice for interactive controls is…', ['Clear button text like “Close”', 'Only icons with no labels', 'Clickable divs without keyboard support', 'Removing focus outlines always'], 0),
      q('q5', 'Testing with Tab helps verify…', ['Keyboard navigation and focus order', 'Only CSS performance', 'Only image quality', 'Only SEO ranking'], 0),
    ],
  },

  'html-a-advanced-forms': {
    topic: 'html',
    level: 'Advanced',
    chapterId: 'html-a-advanced-forms',
    title: 'Activity: Advanced Forms',
    questions: [
      q('q1', 'fieldset/legend is used to…', ['Group related form fields with a label', 'Style text to be bold', 'Embed external pages', 'Define table headers'], 0),
      q('q2', 'The name attribute on an input typically controls…', ['The key sent during native form submission', 'The font family', 'The CSS selector', 'The tab title'], 0),
      q('q3', 'autocomplete tokens help mainly by…', ['Letting browsers suggest stored values', 'Encrypting data', 'Disabling validation', 'Changing layout'], 0),
      q('q4', 'datalist is best described as…', ['A suggestion list for an input', 'A mandatory dropdown', 'A table section', 'A media caption'], 0),
      q('q5', 'inputmode is useful because it can…', ['Hint a better mobile keyboard (e.g., numeric)', 'Replace required validation', 'Change CSS specificity', 'Make iframe safe'], 0),
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

  'js-b-basics': {
    topic: 'js',
    level: 'Beginner',
    chapterId: 'js-b-basics',
    title: 'Activity: Values & Variables',
    questions: [
      q('q1', 'Which statement prints a message in the browser console?', ['console.log("Hi")', 'print("Hi")', 'alert.log("Hi")', 'echo("Hi")'], 0),
      q('q2', 'In modern JavaScript, which keyword should you prefer for values that won’t be reassigned?', ['var', 'let', 'const', 'static'], 2),
      q('q3', 'Which of these is a boolean value?', ['"true"', 'true', '1', '"yes"'], 1),
      q('q4', '`undefined` usually means…', ['The value is intentionally empty', 'The variable has not been assigned a value', 'The value is always zero', 'The value is a number'], 1),
      q('q5', 'Which keyword is best for a value you plan to reassign?', ['const', 'let', 'import', 'export'], 1),
    ],
  },

  'js-b-control': {
    topic: 'js',
    level: 'Beginner',
    chapterId: 'js-b-control',
    title: 'Activity: Control Flow + Functions',
    questions: [
      q('q1', 'An `if` block runs when its condition is…', ['true', 'false', 'a string', 'undefined'], 0),
      q('q2', 'Which loop is commonly used when you know the number of iterations?', ['for', 'while', 'try', 'switch'], 0),
      q('q3', 'What does `return` do inside a function?', ['Stops the function and provides an output value', 'Logs to console', 'Declares a variable', 'Imports a module'], 0),
      q('q4', 'Function parameters are…', ['The values passed into a function when you call it', 'Always global variables', 'Only used for loops', 'Only used for arrays'], 0),
      q('q5', 'A `while` loop typically stops when…', ['The condition becomes false', 'The browser closes', 'A semicolon is missing', 'The variable name changes'], 0),
    ],
  },

  'js-b-dom': {
    topic: 'js',
    level: 'Beginner',
    chapterId: 'js-b-dom',
    title: 'Activity: DOM Basics + Events',
    questions: [
      q('q1', '`document.querySelector(".card")` returns…', ['All matching elements', 'The first matching element', 'Only text nodes', 'An array of strings'], 1),
      q('q2', 'Which method attaches an event handler to an element?', ['addEventListener', 'addHandler', 'onClick()', 'listen()'], 0),
      q('q3', 'Which property is best for setting plain text inside an element?', ['innerHTML', 'textContent', 'outerHTML', 'value'], 1),
      q('q4', 'What does `classList.toggle("open")` do?', ['Always removes the class', 'Always adds the class', 'Adds it if missing, removes it if present', 'Renames the class'], 2),
      q('q5', 'A click event handler runs…', ['When the element is clicked', 'Only when the page loads', 'Only when CSS changes', 'Only in Node.js'], 0),
    ],
  },

  'js-i-data': {
    topic: 'js',
    level: 'Intermediate',
    chapterId: 'js-i-data',
    title: 'Activity: Arrays, Objects, Modern Syntax',
    questions: [
      q('q1', '`array.map(fn)` usually returns…', ['A new array', 'A single value', 'A boolean', 'Nothing'], 0),
      q('q2', '`array.filter(fn)` returns…', ['Only the first match', 'A new array with items that pass the test', 'The last item', 'A number'], 1),
      q('q3', 'Destructuring helps you…', ['Delete properties', 'Extract values into variables', 'Encrypt objects', 'Sort arrays'], 1),
      q('q4', 'The spread operator (`...`) is commonly used to…', ['Mutate arrays in place', 'Copy/merge arrays and objects', 'Create loops', 'Declare classes'], 1),
      q('q5', '`array.find(fn)` returns…', ['All matches', 'The first matching item (or undefined)', 'A new array of matches', 'The index of every match'], 1),
    ],
  },

  'js-i-async': {
    topic: 'js',
    level: 'Intermediate',
    chapterId: 'js-i-async',
    title: 'Activity: Async JavaScript',
    questions: [
      q('q1', 'An `async` function always returns…', ['A Promise', 'A number', 'A DOM element', 'A CSS rule'], 0),
      q('q2', '`await` is used to…', ['Make code run in parallel always', 'Pause until a promise settles (in async code)', 'Convert strings to numbers', 'Import a module'], 1),
      q('q3', 'When you `await` a rejected promise inside try/catch, the error is…', ['Ignored', 'Caught in catch', 'Converted to undefined', 'Printed automatically'], 1),
      q('q4', 'In the browser, `fetch(url)` returns…', ['A Promise that resolves to a Response', 'A JSON object directly', 'A string', 'A DOM node'], 0),
      q('q5', '`res.ok` is true when…', ['The response status is in the 200–299 range', 'The JSON has a field ok=true', 'The network is offline', 'The request uses POST'], 0),
    ],
  },

  'js-i-modules': {
    topic: 'js',
    level: 'Intermediate',
    chapterId: 'js-i-modules',
    title: 'Activity: Modules + Organization',
    questions: [
      q('q1', 'Which keyword makes a function available outside its file?', ['export', 'require', 'public', 'open'], 0),
      q('q2', 'A common relative import path starts with…', ['http://', './ or ../', '#', 'C:/'], 1),
      q('q3', 'A default export is typically imported…', ['With braces only', 'Without braces (name can be chosen)', 'Only with require()', 'Only in CSS'], 1),
      q('q4', 'Modules help primarily by…', ['Making CSS faster', 'Organizing code and reducing globals', 'Removing the need for HTML', 'Increasing file size'], 1),
      q('q5', 'Named exports are typically imported…', ['Without braces', 'With braces', 'With parentheses', 'With a semicolon prefix'], 1),
    ],
  },

  'js-a-debugging': {
    topic: 'js',
    level: 'Advanced',
    chapterId: 'js-a-debugging',
    title: 'Activity: Debugging + Performance',
    questions: [
      q('q1', 'A breakpoint in DevTools lets you…', ['Pause code execution and inspect state', 'Minify code', 'Deploy to production', 'Fix CSS automatically'], 0),
      q('q2', 'Debouncing is useful when…', ['An event fires rapidly (like typing)', 'You want to remove all events', 'You want CSS to compile', 'You want to encrypt data'], 0),
      q('q3', 'A performance trap in DOM code is often…', ['Reading/writing layout repeatedly in a loop', 'Using const', 'Using template strings', 'Using strict equality'], 0),
      q('q4', 'A good debugging approach is to…', ['Add many random logs and hope', 'Use the debugger and isolate the smallest failing case', 'Rewrite the whole file', 'Disable errors'], 1),
      q('q5', 'In general, you should avoid doing expensive work…', ['Inside tight loops or high-frequency events', 'In functions', 'In variables', 'In comments'], 0),
    ],
  },

  'js-a-patterns': {
    topic: 'js',
    level: 'Advanced',
    chapterId: 'js-a-patterns',
    title: 'Activity: Robust Patterns',
    questions: [
      q('q1', 'Immutability means…', ['Changing objects directly', 'Not mutating existing objects/arrays in place', 'Only using const', 'Only using classes'], 1),
      q('q2', 'To add an item immutably to an array, a common pattern is…', ['arr.push(x)', '[...arr, x]', 'arr = x', 'arr.pop()'], 1),
      q('q3', 'A “pure function” typically…', ['Depends only on inputs and has no side effects', 'Always updates the DOM', 'Always throws errors', 'Requires a database'], 0),
      q('q4', 'An event emitter pattern is used to…', ['Notify listeners when something happens', 'Write CSS selectors', 'Compress images', 'Validate HTML'], 0),
      q('q5', 'Using small, focused modules helps mainly with…', ['Maintainability and testing', 'Changing browser fonts', 'Making HTML optional', 'Disabling errors'], 0),
    ],
  },
  'py-b-intro': {
    topic: 'python',
    level: 'Beginner',
    chapterId: 'py-b-intro',
    title: 'Activity: Python Introduction',
    questions: [
      q('py1', 'Which function prints text safely to the console in Python?', ['console.log()', 'out()', 'print()', 'echo()'], 2),
      q('py2', 'Python uses what for block scopes instead of curly braces?', ['Indentation', 'Semicolons', 'Tags', 'Parentheses'], 0),
      q('py3', 'Which of these is a valid Python comment?', ['// comment', '<!-- comment -->', '# comment', '/* comment */'], 2),
    ],
  },
  'ml-b-intro': {
    topic: 'ml',
    level: 'Beginner',
    chapterId: 'ml-b-intro',
    title: 'Activity: Intro to ML',
    questions: [
      q('ml1', 'Supervised learning requires...', ['No data', 'Labeled data', 'Only images', 'A robotic arm'], 1),
      q('ml2', 'Predicting a continuous value (like house prices) is called:', ['Classification', 'Regression', 'Clustering', 'Routing'], 1),
      q('ml3', 'Which is an example of clustering?', ['Sorting spam vs not spam', 'Grouping customers by purchasing behavior', 'Predicting the weather', 'Translating text'], 1),
    ],
  },
  'sql-b-select': {
    topic: 'sql',
    level: 'Beginner',
    chapterId: 'sql-b-select',
    title: 'Activity: Basic Queries',
    questions: [
      q('sq1', 'Which clause is used to filter records?', ['WHERE', 'FILTER', 'FIND', 'ORDER BY'], 0),
      q('sq2', 'What does the * symbol mean in a SELECT statement?', ['Multiply everything', 'Select all columns', 'Inner join', 'Add a wildcard'], 1),
      q('sq3', 'Which clause sorts the results?', ['SORT BY', 'GROUP BY', 'ORDER BY', 'ARRANGE BY'], 2),
    ],
  },
  'git-b-intro': {
    topic: 'git',
    level: 'Beginner',
    chapterId: 'git-b-intro',
    title: 'Activity: Git Basics',
    questions: [
      q('git1', 'Which command initializes a new Git repository?', ['git start', 'git create', 'git init', 'git make'], 2),
      q('git2', 'How do you stage all modified files for a commit?', ['git add .', 'git stage all', 'git commit all', 'git push'], 0),
      q('git3', 'Which command records changes to the repository?', ['git commit', 'git save', 'git store', 'git record'], 0),
    ],
  }
};

export function getChapterActivity(topic: TopicKey, level: LevelKey, chapterId: string): ChapterActivity | undefined {
  const activity = SELF_LEARN_ACTIVITIES[chapterId];
  if (!activity) return undefined;
  if (activity.topic !== topic) return undefined;
  if (activity.level !== level) return undefined;
  return activity;
}
