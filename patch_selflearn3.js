const fs = require('fs');

const pLearn = 'd:/kmunigithub/kmunitech-edtech/kmuni-tech-frontend/src/data/selfLearn.ts';
let code = fs.readFileSync(pLearn, 'utf-8');

// 1. Update TopicKey
code = code.replace(
  `export type TopicKey = 'html' | 'css' | 'js';`,
  `export type TopicKey = 'html' | 'css' | 'js' | 'python' | 'ml' | 'sql' | 'git';`
);

// Replace AI
code = code.replace(
  /\{\s*key:\s*'ai',\s*title:\s*'AI \/ ML',\s*icon:\s*Cpu,\s*enabled:\s*false,\s*topics:\s*\[\],\s*\}/,
  `{ key: 'ai', title: 'AI / ML', icon: Cpu, enabled: true, topics: [{ key: 'python', title: 'Python Basics', description: 'Core Python for Data & AI.', levels: ['Beginner', 'Intermediate', 'Advanced'] }, { key: 'ml', title: 'Machine Learning', description: 'Concepts of model training.', levels: ['Beginner', 'Intermediate', 'Advanced'] }] }`
);

// Replace Data
code = code.replace(
  /\{\s*key:\s*'data',\s*title:\s*'Data Science',\s*icon:\s*Database,\s*enabled:\s*false,\s*topics:\s*\[\],\s*\}/,
  `{ key: 'data', title: 'Data Science', icon: Database, enabled: true, topics: [{ key: 'sql', title: 'SQL', description: 'Query and manage relational data.', levels: ['Beginner', 'Intermediate', 'Advanced'] }] }`
);

// Replace Other
code = code.replace(
  /\{\s*key:\s*'other',\s*title:\s*'More Domains',\s*icon:\s*BookOpen,\s*enabled:\s*false,\s*topics:\s*\[\],\s*\}/,
  `{ key: 'other', title: 'More Domains', icon: BookOpen, enabled: true, topics: [{ key: 'git', title: 'Git & GitHub', description: 'Version control for teams.', levels: ['Beginner', 'Intermediate', 'Advanced'] }] }`
);

const extraContent = `,
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
            code: { languageLabel: 'SQL', snippet: 'SELECT * FROM users\\nWHERE active = true;' },
          }
        ],
        practice: ['Write a query selecting only the name and email.'],
        miniProject: { title: 'Mini Project: User Roster', steps: ['Query 5 users out of a mock table'] }
      }
    ],
    Intermediate: [],
    Advanced: []
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
            code: { languageLabel: 'Bash', snippet: 'git init\\ngit add .\\ngit commit -m "Initial commit"' },
          }
        ],
        practice: ['Initialize an empty repo and make one commit.'],
        miniProject: { title: 'Mini Project: First Commit', steps: ['Create a text file, add it, and commit it'] }
      }
    ],
    Intermediate: [],
    Advanced: []
  }
};`;

const lastBraceIndex = code.lastIndexOf('};');
if (lastBraceIndex !== -1) {
    code = code.substring(0, lastBraceIndex) + extraContent + code.substring(lastBraceIndex + 2);
    fs.writeFileSync(pLearn, code, 'utf-8');
    console.log("Patched selfLearn.ts successfully.");
} else {
    console.log("FAILED to patch selfLearn.ts");
}

const pAct = 'd:/kmunigithub/kmunitech-edtech/kmuni-tech-frontend/src/data/selfLearnActivities.ts';
let codeAct = fs.readFileSync(pAct, 'utf-8');

const extraAct = `,

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
};`;

// Find the last '};' before 'export function'
const matchAct = codeAct.lastIndexOf('};', codeAct.indexOf('export function'));

if (matchAct !== -1) {
  codeAct = codeAct.substring(0, matchAct) + extraAct + codeAct.substring(matchAct + 2);
  fs.writeFileSync(pAct, codeAct, 'utf-8');
  console.log("Patched selfLearnActivities.ts successfully.");
} else {
  console.log("FAILED to patch selfLearnActivities.ts");
}
