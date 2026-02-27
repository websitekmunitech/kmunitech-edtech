import type { LucideIcon } from 'lucide-react';
import { BookOpen, Cpu, Database, Globe } from 'lucide-react';

export type DomainKey = 'web' | 'ai' | 'data' | 'other';
export type TopicKey = 'html' | 'css';
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
    ],
  },
  {
    key: 'ai',
    title: 'AI / ML',
    icon: Cpu,
    enabled: false,
    topics: [],
  },
  {
    key: 'data',
    title: 'Data Science',
    icon: Database,
    enabled: false,
    topics: [],
  },
  {
    key: 'other',
    title: 'More Domains',
    icon: BookOpen,
    enabled: false,
    topics: [],
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
};
