import type { LucideIcon } from 'lucide-react';
import { BookOpen, Cpu, Database, Globe } from 'lucide-react';

export type DomainKey = 'web' | 'ai' | 'data' | 'other';
export type TopicKey = 'html' | 'css' | 'js' | 'node' | 'deploy' | 'python' | 'ml' | 'sql' | 'git';
export type LevelKey = 'Beginner' | 'Intermediate' | 'Advanced';

export type LessonSection = {
  title: string;
  description: string;
  bullets?: string[];
  code?: { languageLabel: string; snippet: string };
};

export type Chapter = {
  id: string;
  title: string;
  overview: string;
  outcomes: string[];
  sections: LessonSection[];
  practice: string[];
  miniProject: { title: string; steps: string[] };
};

export type Topic = {
  key: TopicKey;
  title: string;
  description: string;
  levels: LevelKey[];
};

export type Domain = {
  key: DomainKey;
  title: string;
  icon: LucideIcon;
  enabled: boolean;
  topics: Topic[];
};

export const SELF_LEARN_DOMAINS: Domain[] = [
  {
    key: 'web',
    title: 'Web Development',
    icon: Globe,
    enabled: true,
    topics: [
      {
        key: 'html',
        title: 'HTML',
        description: 'Build clean, accessible page structure with semantic HTML.',
        levels: ['Beginner', 'Intermediate', 'Advanced'],
      },
      {
        key: 'css',
        title: 'CSS',
        description: 'Style responsive interfaces with modern CSS layouts.',
        levels: ['Beginner', 'Intermediate', 'Advanced'],
      },
      {
        key: 'js',
        title: 'JavaScript',
        description: 'Add interactivity with modern JavaScript and DOM patterns.',
        levels: ['Beginner', 'Intermediate', 'Advanced'],
      },
      {
        key: 'node',
        title: 'Backend (Node.js)',
        description: 'Build server-side APIs with Node.js, Express, and databases.',
        levels: ['Beginner', 'Intermediate', 'Advanced'],
      },
      {
        key: 'deploy',
        title: 'Deployment',
        description: 'Ship your apps with hosting, CI/CD, Docker, and monitoring.',
        levels: ['Beginner', 'Intermediate', 'Advanced'],
      },
    ],
  },
  {
    key: 'ai',
    title: 'AI / ML',
    icon: Cpu,
    enabled: true,
    topics: [
      { key: 'python', title: 'Python Basics', description: 'Core Python for Data & AI.', levels: ['Beginner', 'Intermediate', 'Advanced'] },
      { key: 'ml', title: 'Machine Learning', description: 'Concepts of model training.', levels: ['Beginner', 'Intermediate', 'Advanced'] }
    ],
  },
  {
    key: 'data',
    title: 'Data Science',
    icon: Database,
    enabled: true,
    topics: [
      { key: 'sql', title: 'SQL', description: 'Query and manage relational data.', levels: ['Beginner', 'Intermediate', 'Advanced'] }
    ],
  },
  {
    key: 'other',
    title: 'More Domains',
    icon: BookOpen,
    enabled: true,
    topics: [
      { key: 'git', title: 'Git & GitHub', description: 'Version control for teams.', levels: ['Beginner', 'Intermediate', 'Advanced'] }
    ],
  },
];

// Original, handcrafted content (no copyrighted text). The goal is “W3Schools-like” learning flow:
// - chapter list
// - short explanations
// - examples
// - practice + mini project
export const SELF_LEARN_CONTENT: Record<TopicKey, Record<LevelKey, Chapter[]>> = {
  html: {
    Beginner: [
      {
        id: 'html-b-structure',
        title: 'HTML Page Structure',
        overview:
          'Learn what an HTML document is, how browsers read it, and how to create a clean page skeleton you can reuse for any project.',
        outcomes: [
          'Create a valid HTML page with head/body/meta/title',
          'Understand the purpose of doctype and language attribute',
          'Organize content using a predictable structure',
        ],
        sections: [
          {
            title: 'A Minimal, Valid Document',
            description:
              'Start with a doctype and a basic skeleton. Metadata belongs in the head, and visible content belongs in the body.',
            code: {
              languageLabel: 'HTML',
              snippet: `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>My Page</title>\n  </head>\n  <body>\n    <h1>Hello!</h1>\n    <p>This is my first page.</p>\n  </body>\n</html>`,
            },
          },
          {
            title: 'Common Head Tags',
            description:
              'The head sets up how the browser and search engines interpret your page. Keep it small but correct.',
            bullets: [
              'title: the tab title and search result title',
              'meta viewport: makes layout behave on phones',
              'meta charset: ensures correct character encoding',
            ],
          },
        ],
        practice: [
          'Create a new HTML file with a correct skeleton and a meaningful title.',
          'Add a short paragraph introducing yourself.',
          'Add a second heading (h2) for a section called “Projects”.',
        ],
        miniProject: {
          title: 'Mini Project: One-Page Portfolio Skeleton',
          steps: [
            'Create sections: About, Projects, Contact.',
            'Use h1 for the page title, h2 for section titles.',
            'Keep the head tags correct (charset + viewport + title).',
          ],
        },
      },
      {
        id: 'html-b-content',
        title: 'Text, Links, Lists, Images',
        overview:
          'Learn the everyday building blocks used on almost every page: headings, paragraphs, links, lists, and images with accessibility in mind.',
        outcomes: [
          'Use headings and paragraphs correctly',
          'Create links that open safely in a new tab',
          'Add images with required alt text',
        ],
        sections: [
          {
            title: 'Headings & Paragraphs',
            description:
              'Headings create the outline of your page. Keep levels in order so the page stays readable.',
            bullets: [
              'Use h1 once for the main page topic',
              'Use h2 for major sections, h3 for subsections',
              'Avoid using headings just to make text bigger',
            ],
          },
          {
            title: 'Links (Navigation vs Actions)',
            description:
              'Use links for navigation (going somewhere). Use buttons for actions (submitting, toggling, opening menus).',
            code: {
              languageLabel: 'HTML',
              snippet: `<a href="https://example.com" target="_blank" rel="noopener noreferrer">\n  Visit example.com\n</a>`,
            },
          },
          {
            title: 'Images (Alt Text Matters)',
            description:
              'Alt text explains the image to screen readers and appears if the image fails to load.',
            code: {
              languageLabel: 'HTML',
              snippet: `<img src="/images/profile.jpg" alt="Portrait of K.M.Pradosh" width="320" height="320" />`,
            },
          },
          {
            title: 'Lists',
            description:
              'Lists help scanability. Use unordered lists for sets and ordered lists for steps.',
            code: {
              languageLabel: 'HTML',
              snippet: `<h2>Skills</h2>\n<ul>\n  <li>HTML</li>\n  <li>CSS</li>\n  <li>JavaScript</li>\n</ul>`,
            },
          },
        ],
        practice: [
          'Create a navigation with links: Home, Projects, Contact.',
          'Add a list of 5 skills using ul/li.',
          'Add an image with meaningful alt text.',
        ],
        miniProject: {
          title: 'Mini Project: Personal “About Me” Page',
          steps: [
            'Write a short bio using paragraphs and headings.',
            'Add a profile image with alt, width, and height.',
            'Add a list of hobbies and a link to your favorite website.',
          ],
        },
      },
      {
        id: 'html-b-semantics',
        title: 'Semantic Layout',
        overview:
          'Learn semantic tags that describe meaning: header, nav, main, section, article, and footer. This improves accessibility and SEO.',
        outcomes: [
          'Use semantic layout tags to organize a page',
          'Understand landmarks for screen readers',
          'Create a consistent section pattern',
        ],
        sections: [
          {
            title: 'Landmarks',
            description:
              'Landmarks help assistive technologies jump around the page. Aim for one main landmark per page.',
            code: {
              languageLabel: 'HTML',
              snippet: `<header>\n  <nav aria-label="Primary">...</nav>\n</header>\n<main>\n  <section>...</section>\n</main>\n<footer>...</footer>`,
            },
          },
          {
            title: 'Meaning Over Styling',
            description:
              'Choose tags based on meaning, not looks. You can style any element with CSS later.',
            bullets: [
              'Use button for actions, a for navigation',
              'Use section/article when it describes content structure',
              'Keep headings meaningful and scannable',
            ],
          },
        ],
        practice: [
          'Refactor a div-heavy page into header/nav/main/section/footer.',
          'Ensure headings follow a logical order without skipping levels.',
          'Add aria-label to nav if there are multiple nav areas.',
        ],
        miniProject: {
          title: 'Mini Project: Simple Blog Layout',
          steps: [
            'Create a layout with header, nav, main, and footer.',
            'Inside main, create 2 articles with headings and paragraphs.',
            'Add a sidebar section (optional) using aside.',
          ],
        },
      },
      {
        id: 'html-b-attributes',
        title: 'Elements, Attributes, and Nesting',
        overview:
          'Learn how elements are structured, how attributes add meaning/behavior, and how to nest markup so browsers (and teammates) can understand it easily.',
        outcomes: [
          'Identify opening/closing tags and properly nest elements',
          'Use common attributes like id, class, href, src, alt',
          'Understand void elements (no closing tag) and boolean attributes',
        ],
        sections: [
          {
            title: 'Elements + Proper Nesting',
            description:
              'HTML is a tree. When you open an element, you should close it in the correct order. Proper nesting prevents weird layout and accessibility bugs.',
            code: {
              languageLabel: 'HTML',
              snippet: `<article>\n  <h2>My First Article</h2>\n  <p>HTML elements can contain other elements.</p>\n  <ul>\n    <li>Keep nesting correct</li>\n    <li>Indent for readability</li>\n  </ul>\n</article>`,
            },
          },
          {
            title: 'Attributes (Including Boolean Attributes)',
            description:
              'Attributes configure an element. Some are key/value pairs (href, src). Some are boolean (disabled, checked, required) where the presence of the attribute turns it on.',
            code: {
              languageLabel: 'HTML',
              snippet: `<a href="/courses" class="nav-link">Courses</a>\n\n<input id="agree" type="checkbox" checked />\n<label for="agree">I agree</label>`,
            },
          },
          {
            title: 'Void Elements',
            description:
              'Some elements don’t wrap content and therefore don’t have closing tags (for example: img, input, br, meta, link).',
            bullets: ['Common void elements: <img>, <input>, <meta>, <link>', 'Do not write closing tags for void elements', 'Prefer CSS spacing over using <br> repeatedly'],
          },
        ],
        practice: [
          'Create a small article using article, h2, p, and ul/li with correct nesting.',
          'Add an id to one heading and link to it using an anchor link.',
          'Create a checkbox + label pair where clicking the label toggles the checkbox.',
        ],
        miniProject: {
          title: 'Mini Project: “Quick Notes” Page',
          steps: [
            'Create 3 notes using <article> elements.',
            'Give each note a heading and a short list.',
            'Add an in-page table of contents using anchor links (#ids).',
          ],
        },
      },
      {
        id: 'html-b-block-inline',
        title: 'Block vs Inline + Containers',
        overview:
          'Understand the difference between block and inline elements and learn when to use generic containers like div and span without losing semantics.',
        outcomes: [
          'Recognize common block and inline elements',
          'Use div for grouping and span for inline text grouping',
          'Avoid common nesting mistakes and messy markup',
        ],
        sections: [
          {
            title: 'Block vs Inline (Practical View)',
            description:
              'Block elements typically start on a new line and can contain other blocks. Inline elements flow within text. CSS can change display, but start by choosing elements based on meaning.',
            bullets: ['Common block: div, p, section, article, ul/li', 'Common inline: a, span, strong, em', 'Prefer meaning first, styling second'],
          },
          {
            title: 'div and span (When Semantics Don’t Fit)',
            description:
              'Use div and span when you need a hook for layout/styling, but no semantic element is a good match. Don’t replace meaningful elements with divs.',
            code: {
              languageLabel: 'HTML',
              snippet: `<p>\n  You can <span class="highlight">highlight</span> a word without changing the paragraph structure.\n</p>\n\n<div class="card">\n  <h3>Course</h3>\n  <p>HTML for Beginners</p>\n</div>`,
            },
          },
          {
            title: 'Keep Markup Clean',
            description:
              'Clean markup is easier to maintain. If you find yourself nesting many divs, check if a semantic element (section/article/nav/aside) fits better.',
            bullets: ['Indent consistently', 'Avoid unnecessary wrappers', 'Use headings to create structure'],
          },
        ],
        practice: [
          'Create a paragraph containing a link and a highlighted word using span.',
          'Create a simple card using a div container with a heading and paragraph inside.',
          'Replace a meaningless div wrapper with section/article if it improves meaning.',
        ],
        miniProject: {
          title: 'Mini Project: Feature Cards Markup',
          steps: [
            'Create 4 feature cards using semantic headings and short text.',
            'Use div only where you need grouping for layout.',
            'Ensure the page outline is logical (h1 then h2/h3).',
          ],
        },
      },
    ],
    Intermediate: [
      {
        id: 'html-i-forms',
        title: 'Forms That Feel Professional',
        overview:
          'Forms are where HTML becomes interactive. Build forms that are accessible, easy to fill, and friendly on mobile devices.',
        outcomes: [
          'Pair inputs with labels correctly',
          'Pick input types that improve mobile keyboards',
          'Use required, autocomplete, and helper text',
        ],
        sections: [
          {
            title: 'Labels + Inputs',
            description:
              'Every input needs a label. “for” must match the input id so clicking the label focuses the input.',
            code: {
              languageLabel: 'HTML',
              snippet: `<form>\n  <label for="email">Email</label>\n  <input id="email" name="email" type="email" autocomplete="email" required />\n\n  <label for="msg">Message</label>\n  <textarea id="msg" name="message" rows="4" required></textarea>\n\n  <button type="submit">Send</button>\n</form>`,
            },
          },
          {
            title: 'Input Types',
            description:
              'Use input types to improve validation and usability.',
            bullets: ['email, tel, url, number, date', 'checkbox and radio for choices', 'textarea for multi-line text'],
          },
        ],
        practice: [
          'Build a contact form with name, email, and message.',
          'Add autocomplete attributes for name and email.',
          'Add a short helper paragraph under an input explaining what to enter.',
        ],
        miniProject: {
          title: 'Mini Project: Event Registration Form',
          steps: [
            'Collect name, email, phone, and a session choice (radio buttons).',
            'Make fields required where appropriate.',
            'Add a submit button and a clear heading.',
          ],
        },
      },
      {
        id: 'html-i-tables',
        title: 'Tables (Only for Real Data)',
        overview:
          'Tables are great for tabular data like schedules, pricing, or comparisons. They should not be used for page layout.',
        outcomes: [
          'Create accessible tables with thead/tbody',
          'Use th with scope',
          'Keep tables readable and structured',
        ],
        sections: [
          {
            title: 'A Clean Table Pattern',
            description:
              'Use thead for headers and tbody for rows. Keep columns consistent.',
            code: {
              languageLabel: 'HTML',
              snippet: `<table>\n  <thead>\n    <tr>\n      <th scope="col">Topic</th>\n      <th scope="col">Estimated Time</th>\n    </tr>\n  </thead>\n  <tbody>\n    <tr>\n      <td>Forms</td>\n      <td>45 minutes</td>\n    </tr>\n    <tr>\n      <td>Tables</td>\n      <td>30 minutes</td>\n    </tr>\n  </tbody>\n</table>`,
            },
          },
          {
            title: 'Captions and Readability',
            description:
              'A caption can explain what the table is. This helps users understand the purpose quickly.',
            bullets: ['Use <caption> for table title', 'Keep header labels short', 'Avoid empty cells when possible'],
          },
        ],
        practice: [
          'Create a simple timetable with at least 4 rows.',
          'Add table headers with scope="col".',
          'Add a caption describing what the table contains.',
        ],
        miniProject: {
          title: 'Mini Project: Course Comparison Table',
          steps: [
            'Compare 3 courses with columns: Course, Level, Duration.',
            'Use thead/tbody and headers.',
            'Add a caption that explains what is being compared.',
          ],
        },
      },
      {
        id: 'html-i-seo',
        title: 'SEO-Friendly Pages',
        overview:
          'SEO basics are mostly about clarity: meaningful headings, structured content, and good metadata. Build pages that read well.',
        outcomes: [
          'Write meaningful page titles and descriptions',
          'Structure long content with sections',
          'Use semantic tags consistently',
        ],
        sections: [
          {
            title: 'Title + Description',
            description:
              'Your title should describe the page in a few words. The description is a short summary that can appear in search results.',
            code: {
              languageLabel: 'HTML',
              snippet: `<head>\n  <title>HTML Workshop Registration</title>\n  <meta name="description" content="Register for our beginner-friendly HTML workshop and build your first web page." />\n</head>`,
            },
          },
          {
            title: 'Scannable Content',
            description:
              'Most people scan first. Use headings, short paragraphs, and lists to improve readability.',
            bullets: ['Short paragraphs (2–4 lines)', 'Lists for grouped info', 'Consistent headings for sections'],
          },
        ],
        practice: [
          'Write a title and description for a “Contact Us” page.',
          'Create a page with 3 sections and consistent headings.',
          'Add at least one list that summarizes key points.',
        ],
        miniProject: {
          title: 'Mini Project: Simple Product Page',
          steps: [
            'Create sections: Features, Pricing, FAQ.',
            'Write a strong title and meta description.',
            'Use headings and lists to keep it scannable.',
          ],
        },
      },
      {
        id: 'html-i-validation',
        title: 'Native Form Validation + Helpful Errors',
        overview:
          'HTML has built-in validation that works without JavaScript. Learn the key attributes and how to show helper text that’s friendly and accessible.',
        outcomes: [
          'Use required, minlength/maxlength, min/max, and pattern',
          'Write helper text using aria-describedby',
          'Understand when to use novalidate (and why you might)',
        ],
        sections: [
          {
            title: 'Common Validation Attributes',
            description:
              'Start with the simplest constraints. Native validation improves UX and reduces errors before data reaches your backend.',
            code: {
              languageLabel: 'HTML',
              snippet: `<form>\n  <label for="username">Username</label>\n  <input\n    id="username"\n    name="username"\n    type="text"\n    minlength="3"\n    maxlength="20"\n    required\n    aria-describedby="username-help"\n  />\n  <p id="username-help">3–20 characters. Letters and numbers only.</p>\n\n  <button type="submit">Create account</button>\n</form>`,
            },
          },
          {
            title: 'Pattern + Input Type',
            description:
              'Pick the right input type first (email/url/tel). Use pattern for custom formats, but keep patterns simple and avoid over-restricting real users.',
            code: {
              languageLabel: 'HTML',
              snippet: `<label for="code">Invite code</label>\n<input\n  id="code"\n  name="code"\n  type="text"\n  pattern="[A-Z0-9]{6}"\n  required\n  aria-describedby="code-help"\n/>\n<p id="code-help">6 characters, uppercase letters and numbers.</p>`,
            },
          },
          {
            title: 'novalidate (Use Carefully)',
            description:
              'If you plan to fully control validation in JavaScript (custom UI and messages), you can disable native validation with novalidate. If not, keep native validation enabled.',
            bullets: ['Native validation is a good default', 'Server-side validation is still required', 'Use helper text to guide users'],
          },
        ],
        practice: [
          'Add minlength/maxlength to a username field.',
          'Add helper text and connect it with aria-describedby.',
          'Create a number input with min/max (e.g., age 1–120).',
        ],
        miniProject: {
          title: 'Mini Project: Signup Form (Validation First)',
          steps: [
            'Build a signup form with name, email, password.',
            'Use required + appropriate input types.',
            'Add helper text for password rules using aria-describedby.',
          ],
        },
      },
      {
        id: 'html-i-media-embeds',
        title: 'Audio, Video, and Embeds (Responsible Defaults)',
        overview:
          'Modern pages often include media and embeds. Learn how to add audio/video with fallbacks, and embed external pages safely with iframes.',
        outcomes: [
          'Use audio/video with controls and multiple sources',
          'Add captions with track when needed',
          'Embed content with iframe title and basic safety attributes',
        ],
        sections: [
          {
            title: 'Video with Multiple Sources',
            description:
              'Use <source> elements so the browser can choose a supported format. Always provide a fallback message for older browsers.',
            code: {
              languageLabel: 'HTML',
              snippet: `<video controls width="640">\n  <source src="/media/intro.mp4" type="video/mp4" />\n  <source src="/media/intro.webm" type="video/webm" />\n  Sorry, your browser cannot play this video.\n</video>`,
            },
          },
          {
            title: 'Captions and Accessibility',
            description:
              'When video contains speech that matters, captions help many users. Track files are commonly WebVTT (.vtt).',
            code: {
              languageLabel: 'HTML',
              snippet: `<video controls width="640">\n  <source src="/media/lesson.mp4" type="video/mp4" />\n  <track kind="captions" src="/media/lesson.en.vtt" srclang="en" label="English" default />\n</video>`,
            },
          },
          {
            title: 'Iframes (Add a Title, Consider Sandboxing)',
            description:
              'If you embed external content, give the iframe a title for screen readers. Use sandbox when you want to restrict what the embed can do.',
            code: {
              languageLabel: 'HTML',
              snippet: `<iframe\n  title="Map preview"\n  src="https://example.com/map"\n  loading="lazy"\n  sandbox\n  width="600"\n  height="400"\n></iframe>`,
            },
          },
        ],
        practice: [
          'Add a video element with controls and at least one source.',
          'Add a track element for captions (use a placeholder file path).',
          'Embed an iframe with a title and loading="lazy".',
        ],
        miniProject: {
          title: 'Mini Project: Media Showcase Page',
          steps: [
            'Create sections for Video, Audio, and Embed.',
            'Include a video with a fallback message.',
            'Include an iframe with title + lazy loading.',
          ],
        },
      },
    ],
    Advanced: [
      {
        id: 'html-a-accessibility',
        title: 'Accessibility Fundamentals',
        overview:
          'Advanced HTML is about building for everyone: clear labels, correct elements, and predictable navigation for keyboard users.',
        outcomes: [
          'Choose correct elements for interactions',
          'Improve keyboard navigation basics',
          'Avoid common accessibility mistakes',
        ],
        sections: [
          {
            title: 'Buttons vs Links',
            description:
              'Links navigate to another page/section. Buttons trigger an action. Using the correct element avoids many issues.',
            bullets: [
              'Use <a> for navigation',
              'Use <button> for actions',
              'Don’t make divs clickable unless you fully handle keyboard + ARIA',
            ],
          },
          {
            title: 'Meaningful Labels',
            description:
              'Visible labels are best. Use aria-label only when there is no visible label option.',
            code: {
              languageLabel: 'HTML',
              snippet: `<button type="button" aria-label="Share profile">Share</button>`,
            },
          },
        ],
        practice: [
          'Replace a clickable div with a button in a small UI demo.',
          'Ensure every form input has a label.',
          'Verify you can use Tab + Enter/Space to interact with controls.',
        ],
        miniProject: {
          title: 'Mini Project: Accessible FAQ',
          steps: [
            'Create an FAQ page with clear headings.',
            'Use button elements for collapsible items (structure only).',
            'Ensure everything is reachable by keyboard.',
          ],
        },
      },
      {
        id: 'html-a-media',
        title: 'Media + Performance-Friendly Markup',
        overview:
          'Performance improvements often start with small HTML tweaks: explicit sizes, lazy loading, and sensible structure.',
        outcomes: [
          'Reduce layout shift with width/height',
          'Use lazy loading appropriately',
          'Write markup that scales',
        ],
        sections: [
          {
            title: 'Prevent Layout Shift',
            description:
              'If you know image dimensions, provide width/height so the browser reserves space before the image loads.',
            code: {
              languageLabel: 'HTML',
              snippet: `<img\n  src="/images/banner.jpg"\n  alt="Course banner"\n  width="1200"\n  height="600"\n  loading="lazy"\n/>`,
            },
          },
          {
            title: 'Structure for Long Pages',
            description:
              'For long content, use sections and a simple table of contents with anchor links.',
            bullets: ['Use id on headings', 'Add a list of links to those ids', 'Keep headings consistent'],
          },
        ],
        practice: [
          'Add width/height and loading="lazy" to images on a sample page.',
          'Create a table of contents linking to 3 sections.',
          'Split a long page into semantic sections.',
        ],
        miniProject: {
          title: 'Mini Project: Mini Documentation Page',
          steps: [
            'Create 4 sections with h2 headings and ids.',
            'Add a table of contents at the top.',
            'Include one image with proper sizing and lazy loading.',
          ],
        },
      },
      {
        id: 'html-a-interactive',
        title: 'Interactive HTML (Details + Dialog)',
        overview:
          'Not every interaction needs a heavy framework. Learn built-in interactive elements and how to use them in an accessible way.',
        outcomes: [
          'Use details/summary for simple disclosure UI',
          'Use dialog for modal-like UI with minimal JS',
          'Keep focus and labels clear for users',
        ],
        sections: [
          {
            title: 'Disclosure with details/summary',
            description:
              'details/summary is a built-in pattern for expandable content. It’s a great fit for FAQs and “show more” sections.',
            code: {
              languageLabel: 'HTML',
              snippet: `<details>\n  <summary>What is KM Uni?</summary>\n  <p>KM Uni is a learning platform for building practical tech skills.</p>\n</details>`,
            },
          },
          {
            title: 'A Small Dialog Pattern',
            description:
              'dialog can be opened with JavaScript. Keep the dialog content short and include a clear close action.',
            code: {
              languageLabel: 'HTML',
              snippet: `<button id="open" type="button">Open dialog</button>\n\n<dialog id="d">\n  <h2>Contact</h2>\n  <p>Send your message and we will reply.</p>\n  <form method="dialog">\n    <button type="submit">Close</button>\n  </form>\n</dialog>\n\n<script>\n  const dialog = document.querySelector('#d');\n  document.querySelector('#open')?.addEventListener('click', () => dialog?.showModal());\n</script>`,
            },
          },
          {
            title: 'Accessibility Notes',
            description:
              'Even with built-in elements, test with keyboard navigation. Ensure buttons have clear text and content is readable in a logical order.',
            bullets: ['Use clear button labels like “Close”', 'Avoid putting essential content only in placeholders', 'Test with Tab to ensure focus moves logically'],
          },
        ],
        practice: [
          'Create an FAQ using details/summary with 3 items.',
          'Create a dialog with a heading and a close button.',
          'Test navigation using Tab and Enter/Space.',
        ],
        miniProject: {
          title: 'Mini Project: FAQ + Contact Dialog',
          steps: [
            'Create a FAQ section using details/summary.',
            'Add a “Contact” button that opens a dialog.',
            'Add a close button inside the dialog using a form with method="dialog".',
          ],
        },
      },
      {
        id: 'html-a-advanced-forms',
        title: 'Advanced Forms (Fieldsets, Autocomplete, Datalist)',
        overview:
          'Advanced forms are about clarity: grouping related fields, choosing helpful autocomplete tokens, and making input faster and less error-prone.',
        outcomes: [
          'Group related fields with fieldset/legend',
          'Use autocomplete tokens intentionally',
          'Provide suggestions with datalist when appropriate',
        ],
        sections: [
          {
            title: 'Group Related Fields',
            description:
              'fieldset/legend helps users understand what a group of inputs represents. This can improve accessibility and scanning.',
            code: {
              languageLabel: 'HTML',
              snippet: `<form>\n  <fieldset>\n    <legend>Billing address</legend>\n\n    <label for="city">City</label>\n    <input id="city" name="city" autocomplete="address-level2" />\n\n    <label for="zip">ZIP</label>\n    <input id="zip" name="zip" inputmode="numeric" autocomplete="postal-code" />\n  </fieldset>\n\n  <button type="submit">Pay</button>\n</form>`,
            },
          },
          {
            title: 'Datalist Suggestions',
            description:
              'datalist provides suggestions without forcing a fixed choice like a select. It’s useful for long lists where free text is also allowed.',
            code: {
              languageLabel: 'HTML',
              snippet: `<label for="skill">Skill</label>\n<input id="skill" name="skill" list="skills" />\n<datalist id="skills">\n  <option value="HTML"></option>\n  <option value="CSS"></option>\n  <option value="JavaScript"></option>\n</datalist>`,
            },
          },
          {
            title: 'Form Submission Basics',
            description:
              'For real apps, HTML forms send key/value pairs using name attributes. Even if you submit via JavaScript later, understanding name/action/method helps you design forms correctly.',
            bullets: ['name controls the key sent for that field', 'method is usually GET or POST', 'action is the URL the form submits to (if using native submission)'],
          },
        ],
        practice: [
          'Add a fieldset/legend to group 2–3 related inputs.',
          'Add autocomplete to name and email fields (e.g., autocomplete="name").',
          'Add a datalist to suggest common values (skills, cities, etc.).',
        ],
        miniProject: {
          title: 'Mini Project: Checkout Form Markup',
          steps: [
            'Create sections for Contact and Billing address (use fieldset/legend).',
            'Use autocomplete tokens to reduce typing.',
            'Add a datalist for a field that benefits from suggestions.',
          ],
        },
      },
    ],
  },
  css: {
    Beginner: [
      {
        id: 'css-b-selectors',
        title: 'Selectors + Simple Styling',
        overview:
          'Learn how CSS finds elements and applies styles. Start with classes, spacing, and a few core properties you’ll use daily.',
        outcomes: [
          'Write element/class/id selectors',
          'Understand inheritance at a high level',
          'Apply color, typography, and spacing',
        ],
        sections: [
          {
            title: 'Prefer Classes',
            description:
              'Classes are reusable. IDs are unique. In most UI styling, classes are the best default.',
            code: {
              languageLabel: 'CSS',
              snippet: `.card {\n  padding: 16px;\n  border-radius: 16px;\n}\n\n.card-title {\n  font-weight: 700;\n  font-size: 18px;\n}`,
            },
          },
          {
            title: 'Typography Basics',
            description:
              'Readable text usually means: decent line-height, clear hierarchy, and consistent spacing.',
            bullets: ['Use line-height ~1.4–1.7 for paragraphs', 'Use font-weight for emphasis', 'Avoid tiny font sizes'],
          },
        ],
        practice: [
          'Create a card style: padding, border, border-radius.',
          'Style headings and paragraphs with font-size and line-height.',
          'Add a subtle hover style to a link.',
        ],
        miniProject: {
          title: 'Mini Project: Profile Card',
          steps: [
            'Create a card with a name, role, and short bio.',
            'Add spacing and typography for readability.',
            'Add a hover state for a link or button.',
          ],
        },
      },
      {
        id: 'css-b-boxmodel',
        title: 'Box Model + Sizing',
        overview:
          'Most layout confusion comes from the box model. Learn how padding, border, and margin affect size and spacing.',
        outcomes: [
          'Explain content/padding/border/margin',
          'Use box-sizing to simplify sizing',
          'Debug spacing issues confidently',
        ],
        sections: [
          {
            title: 'Box Sizing',
            description:
              'With border-box, widths become more predictable (padding is included in the width).',
            code: {
              languageLabel: 'CSS',
              snippet: `* {\n  box-sizing: border-box;\n}\n\n.container {\n  max-width: 1100px;\n  margin: 0 auto;\n  padding: 16px;\n}`,
            },
          },
          {
            title: 'Margin vs Padding',
            description:
              'Padding creates space inside. Margin creates space outside. Use them deliberately.',
            bullets: ['Padding: inside spacing', 'Margin: outside spacing', 'Borders sit between them'],
          },
        ],
        practice: [
          'Add consistent padding to a card component.',
          'Use margin to space cards apart in a list.',
          'Enable border-box globally in a small demo.',
        ],
        miniProject: {
          title: 'Mini Project: Simple Blog Card List',
          steps: [
            'Create 3 blog cards in a column.',
            'Use padding inside cards and margin between cards.',
            'Add a max-width container centered on the page.',
          ],
        },
      },
      {
        id: 'css-b-responsive',
        title: 'Responsive Basics',
        overview:
          'Make layouts work on both mobile and desktop. Use flexible widths and simple media queries for bigger screens.',
        outcomes: [
          'Use relative units where helpful',
          'Create simple breakpoints',
          'Build a layout that adapts',
        ],
        sections: [
          {
            title: 'A Simple Breakpoint',
            description:
              'Start mobile-first, then enhance for larger screens.',
            code: {
              languageLabel: 'CSS',
              snippet: `.grid {\n  display: grid;\n  grid-template-columns: 1fr;\n  gap: 16px;\n}\n\n@media (min-width: 768px) {\n  .grid {\n    grid-template-columns: 1fr 1fr;\n  }\n}`,
            },
          },
          {
            title: 'Keep Images Flexible',
            description:
              'Prevent images from overflowing their containers.',
            code: {
              languageLabel: 'CSS',
              snippet: `img {\n  max-width: 100%;\n  height: auto;\n}`,
            },
          },
        ],
        practice: [
          'Build a 2-column grid on desktop and 1-column on mobile.',
          'Make images scale within their parent container.',
          'Test responsiveness by resizing the browser window.',
        ],
        miniProject: {
          title: 'Mini Project: Responsive Feature Grid',
          steps: [
            'Create 6 feature cards.',
            'Use 1 column on small screens, 2 columns on medium screens.',
            'Ensure text and spacing remain readable.',
          ],
        },
      },
    ],
    Intermediate: [
      {
        id: 'css-i-flexbox',
        title: 'Flexbox for Alignment',
        overview:
          'Flexbox is perfect for toolbars, navbars, and aligning items. Learn the key properties and when to use them.',
        outcomes: [
          'Align items with align-items and justify-content',
          'Use gap for consistent spacing',
          'Switch between row and column layouts',
        ],
        sections: [
          {
            title: 'Core Flex Pattern',
            description:
              'A flex row with centered items and space between is a common navbar pattern.',
            code: {
              languageLabel: 'CSS',
              snippet: `.row {\n  display: flex;\n  align-items: center;\n  justify-content: space-between;\n  gap: 12px;\n}`,
            },
          },
          {
            title: 'Flex Wrap',
            description:
              'If items shouldn’t overflow, allow wrapping.',
            code: {
              languageLabel: 'CSS',
              snippet: `.tags {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 8px;\n}`,
            },
          },
        ],
        practice: [
          'Build a navbar with logo, links, and a button aligned in a row.',
          'Create a list of tags that wraps nicely.',
          'Use gap instead of margins for consistent spacing.',
        ],
        miniProject: {
          title: 'Mini Project: Responsive Header',
          steps: [
            'Create a header with left logo and right actions.',
            'Wrap actions on small screens.',
            'Add hover and focus styles for links/buttons.',
          ],
        },
      },
      {
        id: 'css-i-grid',
        title: 'Grid for Layout',
        overview:
          'CSS Grid is great for page-level layout. Use it for sidebars, dashboards, and card grids with consistent spacing.',
        outcomes: [
          'Create two-column layouts with grid',
          'Make layouts responsive with media queries',
          'Use gap for consistent spacing',
        ],
        sections: [
          {
            title: 'Sidebar Layout',
            description:
              'A classic two-column layout becomes one column on smaller screens.',
            code: {
              languageLabel: 'CSS',
              snippet: `.layout {\n  display: grid;\n  grid-template-columns: 280px 1fr;\n  gap: 20px;\n}\n\n@media (max-width: 1024px) {\n  .layout {\n    grid-template-columns: 1fr;\n  }\n}`,
            },
          },
          {
            title: 'Auto-Fit Card Grid',
            description:
              'Auto-fit is useful for card grids that adapt to available space.',
            code: {
              languageLabel: 'CSS',
              snippet: `.cards {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));\n  gap: 16px;\n}`,
            },
          },
        ],
        practice: [
          'Build a sidebar layout with grid-template-columns.',
          'Create a card grid that adapts automatically.',
          'Ensure the layout becomes single-column on mobile.',
        ],
        miniProject: {
          title: 'Mini Project: Dashboard Layout',
          steps: [
            'Create a sidebar + main content layout.',
            'Add a responsive card grid inside main.',
            'Use consistent spacing using gap.',
          ],
        },
      },
      {
        id: 'css-i-states',
        title: 'UI States (Hover/Focus/Active)',
        overview:
          'Polish comes from states. Learn to style hover and focus without breaking accessibility.',
        outcomes: [
          'Style :hover for pointer users',
          'Style :focus-visible for keyboard users',
          'Keep states consistent across components',
        ],
        sections: [
          {
            title: 'Focus Visible',
            description:
              'Use :focus-visible to show focus for keyboard users without forcing focus rings on mouse clicks.',
            code: {
              languageLabel: 'CSS',
              snippet: `button:focus-visible, a:focus-visible {\n  outline: 2px solid currentColor;\n  outline-offset: 2px;\n}`,
            },
          },
          {
            title: 'Consistent Transitions',
            description:
              'Keep motion subtle: short duration and simple properties.',
            bullets: ['Prefer opacity/transform', 'Avoid long animations', 'Keep durations consistent'],
          },
        ],
        practice: [
          'Add hover styles to buttons and links.',
          'Add focus-visible outlines and test with Tab.',
          'Add a subtle transition for background and transform.',
        ],
        miniProject: {
          title: 'Mini Project: Button Set',
          steps: [
            'Create Primary and Secondary buttons.',
            'Add hover, active, and focus-visible styles.',
            'Ensure focus styles are visible on dark backgrounds.',
          ],
        },
      },
    ],
    Advanced: [
      {
        id: 'css-a-architecture',
        title: 'Maintainable CSS Strategy',
        overview:
          'At advanced level, the goal is predictable styling: low specificity, reusable patterns, and fewer bugs when the UI grows.',
        outcomes: [
          'Avoid specificity traps',
          'Build reusable component styles',
          'Create a small, consistent design system',
        ],
        sections: [
          {
            title: 'Low Specificity Wins',
            description:
              'Deep selectors cause “why isn’t this working?” problems. Prefer shallow, class-based selectors.',
            bullets: ['Prefer .component over .page .component .title', 'Avoid !important when possible', 'Use composition over overrides'],
          },
          {
            title: 'Design Tokens (Simple)',
            description:
              'Define consistent spacing and typography decisions, then reuse them.',
            bullets: ['Pick a spacing scale (8, 12, 16, 24...)', 'Use consistent font sizes', 'Keep border-radius consistent'],
          },
        ],
        practice: [
          'Refactor a set of styles to use fewer nested selectors.',
          'Create reusable utility classes (or use Tailwind consistently).',
          'Remove one !important by simplifying your selectors.',
        ],
        miniProject: {
          title: 'Mini Project: Tiny UI Kit',
          steps: [
            'Create Card, Button, Input styles.',
            'Keep selectors shallow and consistent.',
            'Add clear hover and focus states.',
          ],
        },
      },
      {
        id: 'css-a-debugging',
        title: 'Debugging Like a Pro',
        overview:
          'Advanced CSS skills include debugging. Learn what to inspect and how to find the real cause quickly using DevTools.',
        outcomes: [
          'Inspect computed styles and box model',
          'Diagnose layout issues with grid/flex overlays',
          'Find override conflicts fast',
        ],
        sections: [
          {
            title: 'Computed Styles',
            description:
              'Computed styles show what actually applies after cascade and specificity.',
            bullets: ['Check which rule wins', 'Look for inherited properties', 'Watch for accidental overrides'],
          },
          {
            title: 'Layout Tools',
            description:
              'Use grid/flex overlays and spacing highlights to reveal what’s happening.',
            bullets: ['Grid overlay shows tracks and gaps', 'Flex overlay shows alignment', 'Box model diagram shows margins/padding'],
          },
        ],
        practice: [
          'Use DevTools to identify why a rule is not applying.',
          'Find and remove a conflicting selector override.',
          'Fix a spacing issue by inspecting the box model.',
        ],
        miniProject: {
          title: 'Mini Project: “Fix This Layout” Challenge',
          steps: [
            'Create a small broken layout intentionally (overflow, wrong spacing).',
            'Use DevTools to identify the cause.',
            'Apply a minimal fix and document what you changed.',
          ],
        },
      },
    ],
  },
  js: {
    Beginner: [
      {
        id: 'js-b-basics',
        title: 'JavaScript Basics: Values & Variables',
        overview:
          'Learn how JavaScript runs in the browser, how to print output for debugging, and how to store values in variables using let and const.',
        outcomes: [
          'Write a script and see output in the browser console',
          'Use let and const appropriately',
          'Understand common value types (string, number, boolean, null, undefined)',
        ],
        sections: [
          {
            title: 'Your First Script + Console',
            description:
              'In the browser, JavaScript can run from a script tag. The console is your best friend for quick checks and debugging.',
            code: {
              languageLabel: 'HTML',
              snippet: `<!doctype html>\n<html lang="en">\n  <head>\n    <meta charset="UTF-8" />\n    <meta name="viewport" content="width=device-width, initial-scale=1.0" />\n    <title>JS Basics</title>\n  </head>\n  <body>\n    <script>\n      console.log('Hello from JavaScript');\n    </script>\n  </body>\n</html>`,
            },
          },
          {
            title: 'Variables: let vs const',
            description:
              'Use const by default. Use let only when you need to reassign the value. Avoid var in modern code unless you’re reading legacy code.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const siteName = 'KM Uni';\nlet visits = 0;\n\nvisits = visits + 1;\nconsole.log(siteName, visits);`,
            },
          },
          {
            title: 'Types You’ll See Every Day',
            description:
              'JavaScript is dynamically typed: a variable can hold any type. Learn the common primitives so you can reason about values correctly.',
            bullets: [
              'string: text like "Hello"',
              'number: integers/decimals like 42 or 3.14',
              'boolean: true/false',
              'null: intentional “no value”',
              'undefined: not assigned yet',
            ],
          },
        ],
        practice: [
          'Create a page that logs your name and a favorite number in the console.',
          'Create 2 const values and 1 let value, then reassign the let value.',
          'Create a boolean variable and log it with a helpful label.',
        ],
        miniProject: {
          title: 'Mini Project: Simple Counter (Console Only)',
          steps: [
            'Create a visits variable starting at 0.',
            'Increment it 5 times using a loop.',
            'Log the value after each increment.',
          ],
        },
      },
      {
        id: 'js-b-control',
        title: 'Control Flow + Functions',
        overview:
          'Learn how to make decisions with if/else, repeat work with loops, and package logic into reusable functions.',
        outcomes: [
          'Write if/else statements to branch logic',
          'Use for and while loops safely',
          'Create functions with parameters and return values',
        ],
        sections: [
          {
            title: 'Conditions (if/else)',
            description:
              'Use if/else to run different code based on a boolean condition. Keep conditions readable.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const score = 78;\n\nif (score >= 90) {\n  console.log('A');\n} else if (score >= 75) {\n  console.log('B');\n} else {\n  console.log('Keep practicing');\n}`,
            },
          },
          {
            title: 'Loops',
            description:
              'Loops repeat work. Always be sure the loop has a clear end condition so it doesn’t run forever.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `for (let i = 1; i <= 3; i++) {\n  console.log('Step', i);\n}\n\nlet n = 3;\nwhile (n > 0) {\n  console.log('Countdown', n);\n  n--;\n}`,
            },
          },
          {
            title: 'Functions',
            description:
              'Functions help reuse logic and keep code organized. A return value is what the function produces as output.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `function add(a, b) {\n  return a + b;\n}\n\nconst total = add(10, 5);\nconsole.log(total);`,
            },
          },
        ],
        practice: [
          'Write a function that converts minutes to seconds.',
          'Write an if/else that prints “Adult” if age >= 18, otherwise “Minor”.',
          'Write a loop that prints numbers 1 to 10.',
        ],
        miniProject: {
          title: 'Mini Project: Grade Checker',
          steps: [
            'Write a function grade(score) that returns A/B/C/Fail.',
            'Call it with 4 different scores and log the results.',
            'Keep your conditions readable (use else if).',
          ],
        },
      },
      {
        id: 'js-b-dom',
        title: 'DOM Basics + Events',
        overview:
          'Bring JavaScript to life by selecting elements, updating text, and responding to user actions like clicks.',
        outcomes: [
          'Select elements with querySelector',
          'Update text content and classes',
          'Handle events with addEventListener',
        ],
        sections: [
          {
            title: 'Select + Update Elements',
            description:
              'Use querySelector to find elements. Use textContent to update text safely.',
            code: {
              languageLabel: 'HTML',
              snippet: `<h1 id="title">Welcome</h1>\n<button id="btn">Change title</button>\n\n<script>\n  const title = document.querySelector('#title');\n  const btn = document.querySelector('#btn');\n\n  btn.addEventListener('click', () => {\n    title.textContent = 'You clicked the button!';\n  });\n</script>`,
            },
          },
          {
            title: 'Class Toggling',
            description:
              'classList.toggle is a clean way to turn styles on/off (e.g., open/closed, active/inactive).',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const panel = document.querySelector('#panel');\n\nfunction toggleOpen() {\n  panel?.classList.toggle('open');\n}`,
            },
          },
        ],
        practice: [
          'Create a button that changes a paragraph’s text when clicked.',
          'Create a button that toggles a CSS class on a div.',
          'Log “clicked” to the console on every click.',
        ],
        miniProject: {
          title: 'Mini Project: Toggle Card',
          steps: [
            'Create a card with a title and hidden details text.',
            'Add a “Show/Hide” button that toggles a class.',
            'Use CSS to hide/show based on that class.',
          ],
        },
      },
    ],
    Intermediate: [
      {
        id: 'js-i-data',
        title: 'Arrays, Objects, and Modern Syntax',
        overview:
          'Most real-world JavaScript is about processing data. Learn how to work with arrays/objects using readable modern patterns.',
        outcomes: [
          'Use map/filter/find to process arrays',
          'Read and update objects safely',
          'Use destructuring and spread for cleaner code',
        ],
        sections: [
          {
            title: 'Array Methods (map/filter/find)',
            description:
              'These methods help you create new arrays without manual loops. They’re readable and reduce bugs when used correctly.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const prices = [100, 250, 80];\n\nconst withTax = prices.map((p) => Math.round(p * 1.18));\nconst expensive = prices.filter((p) => p >= 200);\nconst firstCheap = prices.find((p) => p < 100);\n\nconsole.log(withTax, expensive, firstCheap);`,
            },
          },
          {
            title: 'Objects + Destructuring',
            description:
              'Destructuring makes it easier to pull values out of objects. Spread helps copy and update immutably.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const user = { name: 'Asha', role: 'student', points: 10 };\nconst { name, points } = user;\n\nconst nextUser = { ...user, points: points + 5 };\nconsole.log(name, nextUser);`,
            },
          },
        ],
        practice: [
          'Create an array of numbers and map it to squares.',
          'Filter an array of scores to keep only those >= 75.',
          'Create an object and update one field using spread.',
        ],
        miniProject: {
          title: 'Mini Project: Simple Leaderboard',
          steps: [
            'Create an array of player objects: name and score.',
            'Filter players above a threshold score.',
            'Map to a list of display strings like “Name — Score”.',
          ],
        },
      },
      {
        id: 'js-i-async',
        title: 'Async JavaScript: Promises & async/await',
        overview:
          'Modern apps call APIs. Learn how promises work and how async/await makes asynchronous code easier to read.',
        outcomes: [
          'Explain what a promise represents',
          'Use async/await with try/catch',
          'Fetch JSON data from an API',
        ],
        sections: [
          {
            title: 'Promises, Briefly',
            description:
              'A promise represents a future value: pending → fulfilled (resolved) or rejected (error).',
            bullets: ['Use .then/.catch or async/await', 'Always handle errors', 'Avoid deeply nested callbacks'],
          },
          {
            title: 'Fetch + JSON Example',
            description:
              'fetch returns a promise. You typically await the response and then parse JSON.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `async function loadTodo() {\n  try {\n    const res = await fetch('https://jsonplaceholder.typicode.com/todos/1');\n    if (!res.ok) throw new Error('Request failed');\n\n    const data = await res.json();\n    console.log('Todo:', data.title);\n  } catch (err) {\n    console.error(err);\n  }\n}\n\nloadTodo();`,
            },
          },
        ],
        practice: [
          'Write an async function that fetches JSON and logs one field.',
          'Add an error check using res.ok.',
          'Wrap your fetch in try/catch and log errors.',
        ],
        miniProject: {
          title: 'Mini Project: Quote Loader (Console)',
          steps: [
            'Fetch a JSON endpoint (any public test API).',
            'Log a “loading…” message before the request.',
            'Log the result and handle errors gracefully.',
          ],
        },
      },
      {
        id: 'js-i-modules',
        title: 'Modules + Organizing Code',
        overview:
          'As your codebase grows, you need structure. Learn how ES modules work and how to organize functions across files.',
        outcomes: [
          'Use export and import correctly',
          'Separate logic into small files',
          'Avoid global variables by default',
        ],
        sections: [
          {
            title: 'Export and Import',
            description:
              'ES modules let you export values from one file and import them into another. This keeps code maintainable.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `// math.js\nexport function sum(a, b) {\n  return a + b;\n}\n\n// app.js\nimport { sum } from './math.js';\nconsole.log(sum(2, 3));`,
            },
          },
          {
            title: 'Naming + Responsibility',
            description:
              'Keep files focused. A good module name describes what it does. Avoid huge files that contain unrelated logic.',
            bullets: ['One module = one responsibility', 'Prefer small pure functions', 'Export only what you need'],
          },
        ],
        practice: [
          'Create a module with a function that formats a currency value.',
          'Import and use it from another file.',
          'Refactor one large script into 2 smaller modules.',
        ],
        miniProject: {
          title: 'Mini Project: Utilities Library',
          steps: [
            'Create utils/strings.js and utils/numbers.js.',
            'Export 2 functions from each file.',
            'Import them in app.js and demonstrate usage in console.',
          ],
        },
      },
    ],
    Advanced: [
      {
        id: 'js-a-debugging',
        title: 'Debugging + Performance Thinking',
        overview:
          'Advanced JavaScript work is about finding issues quickly and writing code that stays fast as apps scale.',
        outcomes: [
          'Use the debugger and breakpoints effectively',
          'Recognize performance traps in DOM code',
          'Apply debouncing to reduce repeated work',
        ],
        sections: [
          {
            title: 'DevTools Debugger',
            description:
              'Use breakpoints to pause execution and inspect variables. Prefer debugging over guessing.',
            bullets: ['Set a breakpoint inside an event handler', 'Inspect call stack and scope variables', 'Step over/into carefully'],
          },
          {
            title: 'Debounce Example',
            description:
              'Debouncing prevents a function from running too often (useful for search inputs and resize events).',
            code: {
              languageLabel: 'JavaScript',
              snippet: `function debounce(fn, delayMs) {\n  let timerId;\n  return (...args) => {\n    clearTimeout(timerId);\n    timerId = setTimeout(() => fn(...args), delayMs);\n  };\n}\n\nconst onSearch = debounce((value) => {\n  console.log('Searching for:', value);\n}, 300);`,
            },
          },
        ],
        practice: [
          'Use a breakpoint to inspect a variable inside a function.',
          'Add a debounce wrapper around a keyup handler.',
          'Identify one place where you can avoid repeated DOM queries.',
        ],
        miniProject: {
          title: 'Mini Project: Debounced Search Input',
          steps: [
            'Create an input field and listen for input events.',
            'Debounce the handler by 300ms.',
            'Show the latest “search term” text below the input.',
          ],
        },
      },
      {
        id: 'js-a-patterns',
        title: 'Robust Patterns (Immutability + Events)',
        overview:
          'Build maintainable front-end logic by keeping state updates predictable and using event-driven patterns cleanly.',
        outcomes: [
          'Update state immutably to avoid side effects',
          'Use simple observer-style events when needed',
          'Separate pure logic from UI code',
        ],
        sections: [
          {
            title: 'Immutability Basics',
            description:
              'Instead of editing objects/arrays in place, create copies with the updates. This makes bugs easier to avoid and tests easier to write.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const state = { items: ['HTML', 'CSS'] };\n\nconst next = {\n  ...state,\n  items: [...state.items, 'JS'],\n};\n\nconsole.log(state.items.length, next.items.length);`,
            },
          },
          {
            title: 'A Tiny Event Emitter',
            description:
              'In larger apps, you sometimes need to notify multiple parts of the system. Keep it simple and explicit.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `function createEmitter() {\n  const listeners = new Set();\n  return {\n    on(fn) { listeners.add(fn); return () => listeners.delete(fn); },\n    emit(value) { for (const fn of listeners) fn(value); },\n  };\n}\n\nconst emitter = createEmitter();\nemitter.on((v) => console.log('Event:', v));\nemitter.emit('updated');`,
            },
          },
        ],
        practice: [
          'Refactor an array update to use spread instead of push.',
          'Create an emitter and emit 2 different events.',
          'Keep UI code separate from data transformation code.',
        ],
        miniProject: {
          title: 'Mini Project: Simple Todo State Engine',
          steps: [
            'Store todos in an array and update immutably.',
            'Emit an “updated” event whenever state changes.',
            'Render the updated list to the DOM on every update.',
          ],
        },
      },
    ],
  },
  python: {
    Beginner: [
      {
        id: 'py-b-intro',
        title: 'Python Introduction',
        overview: 'Learn the syntax and core concepts of Python.',
        outcomes: ['Write your first Python script', 'Understand variables and data types'],
        sections: [
          {
            title: 'Hello Python',
            description: 'Python is a high-level, interpreted language.',
            code: { languageLabel: 'Python', snippet: 'print("Hello, Python!")' },
            bullets: ['Easy to read', 'Dynamically typed']
          }
        ],
        practice: ['Run a print statement in the terminal.'],
        miniProject: { title: 'Mini Project: Greet', steps: ['Ask for user name using input()', 'Print a personalized greeting'] }
      }
    ],
    Intermediate: [],
    Advanced: []
  },
  ml: {
    Beginner: [
      {
        id: 'ml-b-intro',
        title: 'Intro to Machine Learning',
        overview: 'What makes ML different from traditional programming.',
        outcomes: ['Understand supervised vs unsupervised learning'],
        sections: [
          {
            title: 'The AI Spectrum',
            description: 'ML algorithms learn patterns from data instead of hard-coded rules.',
            bullets: ['Supervised: Labeled data', 'Unsupervised: Unlabeled grouping']
          }
        ],
        practice: ['Identify 3 apps that use ML.'],
        miniProject: { title: 'Mini Project: Classify Data', steps: ['Conceptual mapping of inputs to outputs'] }
      }
    ],
    Intermediate: [],
    Advanced: []
  },
  sql: {
    Beginner: [
      {
        id: 'sql-b-select',
        title: 'Basic Queries (SELECT)',
        overview: 'Retrieve data from a database cleanly.',
        outcomes: ['Write a basic SELECT statement', 'Filter with WHERE'],
        sections: [
          {
            title: 'Selecting Data',
            description: 'The SELECT keyword is the foundation of SQL.',
            code: { languageLabel: 'SQL', snippet: 'SELECT * FROM users\nWHERE active = true;' },
          }
        ],
        practice: ['Write a query selecting only the name and email.'],
        miniProject: { title: 'Mini Project: User Roster', steps: ['Query 5 users out of a mock table'] }
      }
    ],
    Intermediate: [],
    Advanced: []
  },
  node: {
    Beginner: [
      {
        id: 'node-b-intro',
        title: 'What is Node.js?',
        overview: 'Understand how Node.js lets you run JavaScript on the server, why it exists, and how to set up your first project.',
        outcomes: [
          'Explain why Node.js was created',
          'Run a JavaScript file with Node',
          'Initialize a project with npm',
        ],
        sections: [
          {
            title: 'Node.js in a Nutshell',
            description:
              'Node.js is a runtime that executes JavaScript outside the browser. It uses the V8 engine from Chrome and adds server-side APIs for files, networking, and more.',
            bullets: [
              'Created by Ryan Dahl in 2009',
              'Uses an event-driven, non-blocking I/O model',
              'npm is the default package manager',
            ],
          },
          {
            title: 'Your First Script',
            description: 'Create a file, write some code, run it with `node`.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `// hello.js\nconsole.log('Hello from Node.js!');\n\n// Run: node hello.js`,
            },
          },
          {
            title: 'Initializing a Project',
            description: '`npm init -y` creates a package.json that tracks your dependencies and scripts.',
            code: {
              languageLabel: 'Bash',
              snippet: `mkdir my-api\ncd my-api\nnpm init -y`,
            },
          },
        ],
        practice: [
          'Install Node.js and verify with `node -v`.',
          'Create a script that prints the current date and run it.',
          'Initialize a new project and add a start script.',
        ],
        miniProject: {
          title: 'Mini Project: CLI Greeter',
          steps: [
            'Accept a name argument from process.argv.',
            'Print a personalized greeting.',
            'Add an npm start script that runs the file.',
          ],
        },
      },
      {
        id: 'node-b-express',
        title: 'Express Basics',
        overview: 'Learn how to create a web server with Express, define routes, and send responses.',
        outcomes: [
          'Install and set up Express',
          'Create GET and POST routes',
          'Return JSON responses',
        ],
        sections: [
          {
            title: 'Installing Express',
            description: 'Express is the most popular Node.js web framework. Install it as a dependency.',
            code: {
              languageLabel: 'Bash',
              snippet: `npm install express`,
            },
          },
          {
            title: 'Hello World Server',
            description: 'A minimal Express app listens on a port and responds to HTTP requests.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const express = require('express');\nconst app = express();\n\napp.get('/', (req, res) => {\n  res.json({ message: 'Hello World' });\n});\n\napp.listen(3000, () => console.log('Server on port 3000'));`,
            },
          },
          {
            title: 'Route Parameters & Query Strings',
            description: 'Express makes it easy to read URL params and query strings.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `app.get('/users/:id', (req, res) => {\n  const userId = req.params.id;\n  const fields = req.query.fields; // ?fields=name,email\n  res.json({ userId, fields });\n});`,
            },
          },
        ],
        practice: [
          'Create a GET /health route that returns { status: "ok" }.',
          'Add a POST /echo route that returns the request body as JSON.',
          'Use route params to create GET /users/:id.',
        ],
        miniProject: {
          title: 'Mini Project: Simple API',
          steps: [
            'Create /api/items (GET) that returns a hardcoded array of items.',
            'Create /api/items/:id (GET) that finds an item by ID.',
            'Add a POST /api/items route that adds to the array.',
          ],
        },
      },
      {
        id: 'node-b-rest',
        title: 'REST API Design',
        overview: 'Learn the conventions of RESTful APIs: resources, HTTP methods, status codes, and response shapes.',
        outcomes: [
          'Design endpoints following REST conventions',
          'Use correct HTTP methods and status codes',
          'Structure JSON responses consistently',
        ],
        sections: [
          {
            title: 'REST Principles',
            description: 'REST maps CRUD operations to HTTP methods on resource URLs.',
            bullets: [
              'GET /items — list all',
              'GET /items/:id — get one',
              'POST /items — create',
              'PUT /items/:id — replace',
              'PATCH /items/:id — partial update',
              'DELETE /items/:id — remove',
            ],
          },
          {
            title: 'Status Codes',
            description: 'Use meaningful status codes so clients know what happened.',
            bullets: [
              '200 OK — success',
              '201 Created — resource created',
              '400 Bad Request — invalid input',
              '404 Not Found — resource missing',
              '500 Internal Server Error — server bug',
            ],
          },
          {
            title: 'Consistent Response Shape',
            description: 'Keep responses predictable with a consistent envelope.',
            code: {
              languageLabel: 'JSON',
              snippet: `{\n  "data": { "id": 1, "name": "Widget" },\n  "message": "Item created",\n  "status": 201\n}`,
            },
          },
        ],
        practice: [
          'Design endpoint URLs for a "tasks" resource.',
          'Return 201 when creating and 404 when not found.',
          'Add a standard error response shape.',
        ],
        miniProject: {
          title: 'Mini Project: Tasks CRUD API',
          steps: [
            'Implement all five CRUD endpoints for tasks.',
            'Use proper status codes for each operation.',
            'Store tasks in an in-memory array for now.',
          ],
        },
      },
    ],
    Intermediate: [
      {
        id: 'node-i-middleware',
        title: 'Middleware & Error Handling',
        overview: 'Understand the Express middleware pipeline, write custom middleware, and handle errors gracefully.',
        outcomes: [
          'Explain the middleware chain',
          'Write logging and auth middleware',
          'Create a centralized error handler',
        ],
        sections: [
          {
            title: 'What is Middleware?',
            description: 'Middleware functions have access to req, res, and next. They run in order.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `function logger(req, res, next) {\n  console.log(req.method, req.url);\n  next();\n}\napp.use(logger);`,
            },
          },
          {
            title: 'Built-in & Third-Party Middleware',
            description: 'Express ships with body parsers; popular add-ons include cors, helmet, and morgan.',
            bullets: [
              'express.json() — parse JSON body',
              'cors() — handle cross-origin requests',
              'helmet() — set security headers',
            ],
          },
          {
            title: 'Centralized Error Handling',
            description: 'An error-handling middleware has four parameters: (err, req, res, next).',
            code: {
              languageLabel: 'JavaScript',
              snippet: `app.use((err, req, res, next) => {\n  console.error(err.stack);\n  res.status(err.status || 500).json({ error: err.message });\n});`,
            },
          },
        ],
        practice: [
          'Add a request logger middleware that logs method + URL + timestamp.',
          'Create an auth middleware that checks for an API key header.',
          'Add a catch-all error handler.',
        ],
        miniProject: {
          title: 'Mini Project: Protected API',
          steps: [
            'Add helmet and cors middleware.',
            'Protect routes behind an API-key check.',
            'Return structured error JSON for all failures.',
          ],
        },
      },
      {
        id: 'node-i-database',
        title: 'Database Integration',
        overview: 'Connect your API to a real database (PostgreSQL or SQLite), run queries, and manage schemas.',
        outcomes: [
          'Connect to a SQL database from Node',
          'Perform CRUD operations with queries',
          'Use an ORM for schema management',
        ],
        sections: [
          {
            title: 'Why a Database?',
            description: 'In-memory arrays disappear on restart. A database persists data reliably.',
            bullets: [
              'SQLite — file-based, great for small projects',
              'PostgreSQL — production-grade relational DB',
              'ORM (e.g. TypeORM, Prisma) simplifies queries',
            ],
          },
          {
            title: 'Raw SQL Queries',
            description: 'You can run SQL directly using a client library.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const { Pool } = require('pg');\nconst pool = new Pool({ connectionString: process.env.DATABASE_URL });\n\nconst result = await pool.query('SELECT * FROM tasks WHERE id = $1', [taskId]);`,
            },
          },
          {
            title: 'Using an ORM',
            description: 'ORMs let you define models in code and auto-generate SQL.',
            code: {
              languageLabel: 'TypeScript',
              snippet: `@Entity()\nexport class Task {\n  @PrimaryGeneratedColumn()\n  id: number;\n\n  @Column()\n  title: string;\n}`,
            },
          },
        ],
        practice: [
          'Create a tasks table in SQLite or Postgres.',
          'Rewrite your in-memory CRUD to use real queries.',
          'Add a migration script that creates the table.',
        ],
        miniProject: {
          title: 'Mini Project: Persistent Tasks API',
          steps: [
            'Connect Express to a database.',
            'Replace in-memory store with real queries.',
            'Add a seed script to populate initial data.',
          ],
        },
      },
      {
        id: 'node-i-auth',
        title: 'Authentication with JWT',
        overview: 'Implement user registration, login, and token-based authentication with JSON Web Tokens.',
        outcomes: [
          'Hash passwords securely with bcrypt',
          'Issue JWTs on login',
          'Protect routes with auth middleware',
        ],
        sections: [
          {
            title: 'Password Hashing',
            description: 'Never store plain-text passwords. Use bcrypt to create a one-way hash.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const bcrypt = require('bcrypt');\nconst hash = await bcrypt.hash(password, 10);\n// Verify\nconst match = await bcrypt.compare(input, hash);`,
            },
          },
          {
            title: 'Issuing Tokens',
            description: 'After verifying credentials, issue a JWT the client sends on future requests.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const jwt = require('jsonwebtoken');\nconst token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET, { expiresIn: '7d' });`,
            },
          },
          {
            title: 'Auth Middleware',
            description: 'Verify the token in the Authorization header before allowing access.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `function authGuard(req, res, next) {\n  const token = req.headers.authorization?.split(' ')[1];\n  if (!token) return res.status(401).json({ error: 'No token' });\n  try {\n    req.user = jwt.verify(token, process.env.JWT_SECRET);\n    next();\n  } catch {\n    res.status(401).json({ error: 'Invalid token' });\n  }\n}`,
            },
          },
        ],
        practice: [
          'Create POST /auth/register with bcrypt password hashing.',
          'Create POST /auth/login that returns a JWT.',
          'Protect a /me route so only authenticated users can access it.',
        ],
        miniProject: {
          title: 'Mini Project: Auth System',
          steps: [
            'Implement register + login endpoints.',
            'Add authGuard middleware.',
            'Return user profile from GET /me.',
          ],
        },
      },
    ],
    Advanced: [
      {
        id: 'node-a-security',
        title: 'Security Best Practices',
        overview: 'Harden your Node.js API against common vulnerabilities: injection, XSS, rate limiting, and more.',
        outcomes: [
          'Prevent SQL injection and XSS',
          'Apply rate limiting and CORS correctly',
          'Use environment variables for secrets',
        ],
        sections: [
          {
            title: 'Injection Prevention',
            description: 'Always use parameterized queries or ORM methods. Never interpolate user input into SQL.',
            bullets: [
              'Use $1, $2 placeholders in pg',
              'Use ORM query builders',
              'Validate/sanitize all input',
            ],
          },
          {
            title: 'Rate Limiting & Helmet',
            description: 'Limit request rates to prevent abuse. Helmet sets security-related HTTP headers.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const rateLimit = require('express-rate-limit');\napp.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }));\napp.use(require('helmet')());`,
            },
          },
          {
            title: 'Environment Variables',
            description: 'Keep secrets out of code. Use .env files locally and platform env settings in production.',
            code: {
              languageLabel: 'Bash',
              snippet: `# .env\nDATABASE_URL=postgres://user:pass@host/db\nJWT_SECRET=my-secret-key\n\n# In code\nrequire('dotenv').config();\nprocess.env.JWT_SECRET;`,
            },
          },
        ],
        practice: [
          'Replace any string-concatenated SQL with parameterized queries.',
          'Add helmet and rate-limit middleware.',
          'Move all secrets to environment variables.',
        ],
        miniProject: {
          title: 'Mini Project: Security Audit',
          steps: [
            'Review an existing API for injection risks.',
            'Add rate limiting, helmet, and CORS config.',
            'Ensure no secrets appear in source code.',
          ],
        },
      },
      {
        id: 'node-a-architecture',
        title: 'Project Architecture & Testing',
        overview: 'Organize your Node.js project for scale: folder structure, service layers, and automated testing.',
        outcomes: [
          'Structure code with controllers, services, and repositories',
          'Write unit and integration tests',
          'Use dependency injection patterns',
        ],
        sections: [
          {
            title: 'Layered Architecture',
            description: 'Separate concerns: routes handle HTTP, services hold logic, repositories talk to the DB.',
            bullets: [
              'Controller → validates input, calls service',
              'Service → business logic, calls repository',
              'Repository → database queries',
            ],
          },
          {
            title: 'Testing with Jest',
            description: 'Write tests that verify your logic works and catch regressions.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const { createTask } = require('./task.service');\n\ntest('creates a task with a title', async () => {\n  const task = await createTask({ title: 'Test' });\n  expect(task.title).toBe('Test');\n  expect(task.id).toBeDefined();\n});`,
            },
          },
          {
            title: 'Integration Tests',
            description: 'Use supertest to test your Express routes end-to-end.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const request = require('supertest');\nconst app = require('./app');\n\ntest('GET /api/tasks returns 200', async () => {\n  const res = await request(app).get('/api/tasks');\n  expect(res.status).toBe(200);\n});`,
            },
          },
        ],
        practice: [
          'Refactor a flat Express app into controller/service layers.',
          'Write at least 3 unit tests for a service.',
          'Add an integration test for one endpoint.',
        ],
        miniProject: {
          title: 'Mini Project: Well-Structured API',
          steps: [
            'Create src/controllers, src/services, src/repositories folders.',
            'Move logic out of route handlers into services.',
            'Add Jest tests with at least 80% coverage.',
          ],
        },
      },
    ],
  },
  deploy: {
    Beginner: [
      {
        id: 'deploy-b-intro',
        title: 'What is Deployment?',
        overview: 'Understand what it means to deploy a web app: hosting, domains, and making your project live on the internet.',
        outcomes: [
          'Explain the difference between development and production',
          'Understand domains, DNS, and HTTPS',
          'Know the major hosting categories',
        ],
        sections: [
          {
            title: 'Development vs Production',
            description: 'In development you run on localhost. In production your app lives on a server with a real URL.',
            bullets: [
              'Development: localhost:3000, hot reload, verbose logs',
              'Production: real domain, optimized build, error tracking',
              'Environment variables control the difference',
            ],
          },
          {
            title: 'Domains & DNS',
            description: 'A domain name (example.com) maps to a server IP via DNS records.',
            bullets: [
              'A record: points domain to an IP',
              'CNAME: points a subdomain to another domain',
              'HTTPS: encrypts traffic (Let\'s Encrypt is free)',
            ],
          },
          {
            title: 'Hosting Categories',
            description: 'Choose the right platform for your project type.',
            bullets: [
              'Static hosting (Vercel, Netlify, GitHub Pages) — for frontend SPAs',
              'Platform-as-a-Service (Render, Railway, Heroku) — for backend APIs',
              'Cloud VMs (AWS EC2, DigitalOcean) — full control, more work',
            ],
          },
        ],
        practice: [
          'List 3 differences between dev and production environments.',
          'Look up the DNS records for a domain you own or use.',
          'Compare pricing of Vercel, Render, and Railway free tiers.',
        ],
        miniProject: {
          title: 'Mini Project: Deployment Checklist',
          steps: [
            'Write a checklist of steps to go from local code to live app.',
            'Include domain setup, environment variables, and HTTPS.',
            'Research one hosting platform and note its deploy process.',
          ],
        },
      },
      {
        id: 'deploy-b-static',
        title: 'Deploying Static Sites',
        overview: 'Deploy a frontend project (React, Vite, plain HTML) to a static hosting platform like Vercel or Netlify.',
        outcomes: [
          'Build a production bundle with Vite or similar',
          'Deploy to Vercel from a Git repository',
          'Configure environment variables on the platform',
        ],
        sections: [
          {
            title: 'Building for Production',
            description: 'Most frontend tools have a build command that creates optimized static files.',
            code: {
              languageLabel: 'Bash',
              snippet: `npm run build\n# Output: dist/ folder with HTML, JS, CSS`,
            },
          },
          {
            title: 'Deploying to Vercel',
            description: 'Connect your GitHub repo. Vercel auto-detects the framework and deploys on every push.',
            bullets: [
              'Import your repo at vercel.com/new',
              'Set framework preset (Vite, Next.js, etc.)',
              'Add environment variables in project settings',
              'Every git push triggers a new deployment',
            ],
          },
          {
            title: 'SPA Routing Fix',
            description: 'Single-page apps need a rewrite rule so all paths serve index.html.',
            code: {
              languageLabel: 'JSON',
              snippet: `// vercel.json\n{\n  "rewrites": [{ "source": "/(.*)", "destination": "/index.html" }]\n}`,
            },
          },
        ],
        practice: [
          'Run `npm run build` and inspect the dist folder.',
          'Deploy a simple HTML page to Vercel or Netlify.',
          'Add a VITE_API_URL environment variable in the platform.',
        ],
        miniProject: {
          title: 'Mini Project: Deploy Your Portfolio',
          steps: [
            'Build a simple React or HTML portfolio site.',
            'Push to GitHub and connect to Vercel.',
            'Verify the live URL works with HTTPS.',
          ],
        },
      },
      {
        id: 'deploy-b-backend',
        title: 'Deploying a Backend API',
        overview: 'Deploy a Node.js/Express API to a platform like Render or Railway, connect a database, and go live.',
        outcomes: [
          'Deploy a Node.js app to Render',
          'Configure environment variables for database and secrets',
          'Verify the API is reachable from the frontend',
        ],
        sections: [
          {
            title: 'Platform Setup',
            description: 'Render, Railway, and Fly.io let you deploy from a Git repo with minimal config.',
            bullets: [
              'Create a new Web Service from your repo',
              'Set the build command: npm install',
              'Set the start command: node dist/main.js (or npm start)',
              'Add environment variables: DATABASE_URL, JWT_SECRET, etc.',
            ],
          },
          {
            title: 'Database on the Platform',
            description: 'Most PaaS platforms offer managed PostgreSQL. Copy the connection string to your env.',
            code: {
              languageLabel: 'Bash',
              snippet: `# Render dashboard → New PostgreSQL\n# Copy Internal Database URL\n# Paste as DATABASE_URL env var in your web service`,
            },
          },
          {
            title: 'CORS Configuration',
            description: 'Your backend must allow requests from your frontend origin.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `app.enableCors({\n  origin: process.env.FRONTEND_URL || 'http://localhost:5173',\n  credentials: true,\n});`,
            },
          },
        ],
        practice: [
          'Deploy a hello-world Express app to Render.',
          'Add a DATABASE_URL env var and connect Postgres.',
          'Set FRONTEND_URL and verify CORS headers in the browser.',
        ],
        miniProject: {
          title: 'Mini Project: Full-Stack Deploy',
          steps: [
            'Deploy your backend to Render with a Postgres database.',
            'Deploy your frontend to Vercel with VITE_API_BASE_URL pointing to Render.',
            'Verify end-to-end: frontend fetches data from the live API.',
          ],
        },
      },
    ],
    Intermediate: [
      {
        id: 'deploy-i-cicd',
        title: 'CI/CD Pipelines',
        overview: 'Automate testing and deployment with continuous integration and continuous deployment using GitHub Actions.',
        outcomes: [
          'Explain CI/CD concepts',
          'Create a GitHub Actions workflow',
          'Run tests automatically on every push',
        ],
        sections: [
          {
            title: 'What is CI/CD?',
            description: 'CI runs tests on every code change. CD deploys automatically when tests pass.',
            bullets: [
              'CI: build + test on every push/PR',
              'CD: auto-deploy to production on merge to main',
              'Catches bugs before they reach users',
            ],
          },
          {
            title: 'GitHub Actions Basics',
            description: 'Define workflows in .github/workflows/*.yml that run on events like push or pull_request.',
            code: {
              languageLabel: 'YAML',
              snippet: `name: CI\non: [push, pull_request]\njobs:\n  test:\n    runs-on: ubuntu-latest\n    steps:\n      - uses: actions/checkout@v4\n      - uses: actions/setup-node@v4\n        with: { node-version: 20 }\n      - run: npm ci\n      - run: npm test`,
            },
          },
          {
            title: 'Auto-Deploy on Merge',
            description: 'Platforms like Vercel and Render auto-deploy from the main branch. Add a test gate to PRs.',
            bullets: [
              'Require status checks to pass before merging',
              'Main branch deploys trigger automatically',
              'Preview deployments for pull requests',
            ],
          },
        ],
        practice: [
          'Create a .github/workflows/ci.yml that runs npm test.',
          'Open a PR and verify the workflow runs.',
          'Add a build step to catch TypeScript errors.',
        ],
        miniProject: {
          title: 'Mini Project: CI Pipeline',
          steps: [
            'Set up GitHub Actions with lint + test + build steps.',
            'Configure branch protection to require CI pass.',
            'Verify that a failing test blocks the merge.',
          ],
        },
      },
      {
        id: 'deploy-i-docker',
        title: 'Docker for Web Apps',
        overview: 'Containerize your Node.js app with Docker so it runs the same everywhere.',
        outcomes: [
          'Write a Dockerfile for a Node.js app',
          'Build and run a Docker image locally',
          'Understand multi-stage builds',
        ],
        sections: [
          {
            title: 'Why Docker?',
            description: 'Docker packages your app with its dependencies into a portable container.',
            bullets: [
              'No more "works on my machine" problems',
              'Same image runs locally, in CI, and in production',
              'Isolates your app from the host system',
            ],
          },
          {
            title: 'Basic Dockerfile',
            description: 'A Dockerfile is a recipe for building an image.',
            code: {
              languageLabel: 'Dockerfile',
              snippet: `FROM node:20-alpine\nWORKDIR /app\nCOPY package*.json ./\nRUN npm ci --production\nCOPY . .\nEXPOSE 3000\nCMD ["node", "dist/main.js"]`,
            },
          },
          {
            title: 'Multi-Stage Build',
            description: 'Use one stage to build, another to run — keeps the final image small.',
            code: {
              languageLabel: 'Dockerfile',
              snippet: `# Build stage\nFROM node:20-alpine AS build\nWORKDIR /app\nCOPY . .\nRUN npm ci && npm run build\n\n# Run stage\nFROM node:20-alpine\nWORKDIR /app\nCOPY --from=build /app/dist ./dist\nCOPY --from=build /app/node_modules ./node_modules\nEXPOSE 3000\nCMD ["node", "dist/main.js"]`,
            },
          },
        ],
        practice: [
          'Write a Dockerfile for your Express app.',
          'Build and run: docker build -t myapi . && docker run -p 3000:3000 myapi.',
          'Use .dockerignore to exclude node_modules and .git.',
        ],
        miniProject: {
          title: 'Mini Project: Dockerized API',
          steps: [
            'Create a multi-stage Dockerfile.',
            'Add a docker-compose.yml with app + Postgres services.',
            'Run docker compose up and verify the API works.',
          ],
        },
      },
      {
        id: 'deploy-i-env',
        title: 'Environment Management',
        overview: 'Manage configuration across dev, staging, and production with environment variables and config files.',
        outcomes: [
          'Use .env files for local development',
          'Set platform env vars for production',
          'Avoid leaking secrets in code or logs',
        ],
        sections: [
          {
            title: 'The .env File',
            description: 'Store local config in a .env file. Never commit it to Git.',
            code: {
              languageLabel: 'Bash',
              snippet: `# .env\nDATABASE_URL=postgres://localhost/mydb\nJWT_SECRET=dev-secret\nNODE_ENV=development`,
            },
          },
          {
            title: 'Platform Env Vars',
            description: 'On Render/Vercel/Railway, set env vars in the dashboard. They override .env.',
            bullets: [
              'DATABASE_URL — connection string from managed DB',
              'FRONTEND_URL — for CORS allowlist',
              'NODE_ENV=production — enables optimizations',
            ],
          },
          {
            title: 'Secrets Hygiene',
            description: 'Audit your repo to ensure no secrets leaked.',
            bullets: [
              'Add .env to .gitignore',
              'Use platform secret scanning (GitHub, GitGuardian)',
              'Rotate secrets immediately if exposed',
            ],
          },
        ],
        practice: [
          'Create a .env.example with placeholder values.',
          'Verify .env is in .gitignore.',
          'Set all production env vars on your hosting platform.',
        ],
        miniProject: {
          title: 'Mini Project: Config Audit',
          steps: [
            'List all env vars your app needs.',
            'Create .env, .env.example, and verify .gitignore.',
            'Set production env vars on your platform and verify the app starts.',
          ],
        },
      },
    ],
    Advanced: [
      {
        id: 'deploy-a-monitoring',
        title: 'Monitoring & Logging',
        overview: 'Set up production monitoring, structured logging, and uptime alerts so you know when things break.',
        outcomes: [
          'Add structured JSON logging',
          'Set up health checks and uptime monitors',
          'Use error tracking services',
        ],
        sections: [
          {
            title: 'Structured Logging',
            description: 'Use JSON logs instead of console.log for easier parsing in production.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `const pino = require('pino');\nconst logger = pino({ level: 'info' });\n\nlogger.info({ userId: 123, action: 'login' }, 'User logged in');`,
            },
          },
          {
            title: 'Health Checks',
            description: 'A /health endpoint lets monitors verify your app is running.',
            code: {
              languageLabel: 'JavaScript',
              snippet: `app.get('/health', async (req, res) => {\n  try {\n    await db.query('SELECT 1');\n    res.json({ status: 'ok', db: 'connected' });\n  } catch {\n    res.status(503).json({ status: 'error', db: 'disconnected' });\n  }\n});`,
            },
          },
          {
            title: 'Error Tracking',
            description: 'Services like Sentry capture unhandled errors and notify your team.',
            bullets: [
              'Install the SDK: npm install @sentry/node',
              'Initialize early in your app entry point',
              'Tag releases for better debugging',
            ],
          },
        ],
        practice: [
          'Replace console.log with a structured logger.',
          'Add a /health endpoint that checks the database.',
          'Set up a free uptime monitor (UptimeRobot, Betterstack).',
        ],
        miniProject: {
          title: 'Mini Project: Observable API',
          steps: [
            'Add pino logging to all routes.',
            'Create a /health endpoint.',
            'Sign up for a free error tracker and integrate it.',
          ],
        },
      },
      {
        id: 'deploy-a-scaling',
        title: 'Scaling & Performance',
        overview: 'Prepare your app for growth: caching, load balancing, and horizontal scaling strategies.',
        outcomes: [
          'Add caching to reduce database load',
          'Understand horizontal vs vertical scaling',
          'Optimize build and cold-start times',
        ],
        sections: [
          {
            title: 'Caching Strategies',
            description: 'Cache frequently accessed data to reduce latency and database load.',
            bullets: [
              'In-memory cache (node-cache) for small datasets',
              'Redis for shared cache across instances',
              'HTTP cache headers for static assets',
            ],
          },
          {
            title: 'Horizontal Scaling',
            description: 'Run multiple instances of your app behind a load balancer.',
            bullets: [
              'Stateless servers (no in-memory sessions)',
              'Use a shared database and cache',
              'Platform auto-scaling (Render, Railway, Fly.io)',
            ],
          },
          {
            title: 'Build Optimization',
            description: 'Faster builds and smaller bundles improve deploy speed and cold starts.',
            bullets: [
              'Use multi-stage Docker builds',
              'Tree-shake unused code',
              'Lazy-load routes in the frontend',
              'Optimize images and use CDN for static assets',
            ],
          },
        ],
        practice: [
          'Add a simple in-memory cache to a frequently-hit endpoint.',
          'Measure response times before and after caching.',
          'Configure your platform to run 2+ instances.',
        ],
        miniProject: {
          title: 'Mini Project: Production-Ready App',
          steps: [
            'Add caching to your most expensive endpoint.',
            'Configure auto-scaling or multiple instances.',
            'Run a simple load test and verify performance.',
          ],
        },
      },
    ],
  },
  git: {
    Beginner: [
      {
        id: 'git-b-intro',
        title: 'Git Version Control',
        overview: 'Track your code changes safely.',
        outcomes: ['Init a repository', 'Commit changes'],
        sections: [
          {
            title: 'The Staging Area',
            description: 'Git commits are built by staging files first.',
            code: { languageLabel: 'Bash', snippet: 'git init\ngit add .\ngit commit -m "Initial commit"' },
          }
        ],
        practice: ['Initialize an empty repo and make one commit.'],
        miniProject: { title: 'Mini Project: First Commit', steps: ['Create a text file, add it, and commit it'] }
      }
    ],
    Intermediate: [],
    Advanced: []
  }
};
