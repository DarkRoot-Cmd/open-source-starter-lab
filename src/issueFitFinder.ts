export type ContributorSkill = "html-css" | "javascript" | "python" | "docs" | "testing" | "git";

export type TimeBudget = "15m" | "30m" | "1h";

export interface IssueFit {
  skill: ContributorSkill;
  title: string;
  issueSearchUrl: string;
  whyItFits: string;
  firstCommand: string;
  timeBudget: TimeBudget;
  proofChecklist: string[];
  commentTemplate: string;
}

interface IssueRoute {
  skill: ContributorSkill;
  title: string;
  label: string;
  whyItFits: string;
  firstCommand: string;
  proofChecklist: string[];
}

const repoUrl = "https://github.com/P-r-e-m-i-u-m/open-source-starter-lab";

const issueRoutes: IssueRoute[] = [
  {
    skill: "html-css",
    title: "HTML/CSS first issue",
    label: "skill: html-css",
    whyItFits: "Good if you can improve readable sections, Markdown layout, tables, or beginner-facing page structure.",
    firstCommand: "npm install",
    proofChecklist: [
      "The changed section is easier to scan",
      "Links still work",
      "A screenshot or before/after note is included if layout changed"
    ]
  },
  {
    skill: "javascript",
    title: "JavaScript or TypeScript first issue",
    label: "skill: javascript",
    whyItFits: "Good if you want a small CLI behavior change without needing to understand a large app.",
    firstCommand: "npm run check",
    proofChecklist: [
      "The CLI still builds",
      "The output is clearer for beginners",
      "Smoke tests pass"
    ]
  },
  {
    skill: "python",
    title: "Python beginner issue",
    label: "skill: python",
    whyItFits: "Good if you know Python and want to practice GitHub workflow through docs or cross-language examples.",
    firstCommand: "npm install",
    proofChecklist: [
      "The guide explains how a Python learner can contribute here",
      "The steps avoid TypeScript assumptions",
      "The PR includes the exact check command used"
    ]
  },
  {
    skill: "docs",
    title: "Docs-only first issue",
    label: "skill: docs",
    whyItFits: "Good if you want a real contribution without changing product behavior.",
    firstCommand: "npm run check",
    proofChecklist: [
      "The wording removes one beginner confusion",
      "The page links to the next useful step",
      "The PR explains what was unclear before"
    ]
  },
  {
    skill: "testing",
    title: "Testing first issue",
    label: "skill: testing",
    whyItFits: "Good if you want a code contribution that proves behavior instead of adding a new feature.",
    firstCommand: "npm test",
    proofChecklist: [
      "One behavior is covered by a focused test",
      "The test can fail for the right reason",
      "The full check command passes"
    ]
  },
  {
    skill: "git",
    title: "Git workflow first issue",
    label: "skill: git",
    whyItFits: "Good if the hardest part is branches, commits, pull requests, or fixing Git errors.",
    firstCommand: "git status",
    proofChecklist: [
      "The guide shows safe commands",
      "The recovery step is clear",
      "The PR description includes what command was tested"
    ]
  }
];

const timeAdvice: Record<TimeBudget, string> = {
  "15m": "Pick a wording fix, one broken link, or one missing example. Do not start a feature.",
  "30m": "Pick one docs or CLI output improvement with a small proof checklist.",
  "1h": "Pick one focused code, test, or guide change and run the full project check."
};

function normalizeSkill(skill: string): ContributorSkill {
  const normalized = skill.toLowerCase().trim();
  const aliases: Record<string, ContributorSkill> = {
    html: "html-css",
    css: "html-css",
    "html-css": "html-css",
    javascript: "javascript",
    js: "javascript",
    typescript: "javascript",
    ts: "javascript",
    python: "python",
    py: "python",
    docs: "docs",
    documentation: "docs",
    writing: "docs",
    testing: "testing",
    test: "testing",
    git: "git",
    github: "git"
  };

  const match = aliases[normalized];
  if (!match) {
    throw new Error("Use --skill html-css, javascript, python, docs, testing, or git");
  }

  return match;
}

function normalizeTimeBudget(timeBudget: string): TimeBudget {
  const normalized = timeBudget.toLowerCase().trim();
  if (normalized === "15" || normalized === "15m" || normalized === "15min") {
    return "15m";
  }

  if (normalized === "30" || normalized === "30m" || normalized === "30min") {
    return "30m";
  }

  if (normalized === "60" || normalized === "1h" || normalized === "hour") {
    return "1h";
  }

  throw new Error("Use --time 15m, 30m, or 1h");
}

function buildIssueSearchUrl(label: string): string {
  const query = `is:issue is:open label:"${label}" no:assignee`;
  return `${repoUrl}/issues?q=${encodeURIComponent(query)}`;
}

export function findIssueFit(skillInput: string, timeInput = "30m"): IssueFit {
  const skill = normalizeSkill(skillInput);
  const timeBudget = normalizeTimeBudget(timeInput);
  const route = issueRoutes.find((candidate) => candidate.skill === skill);

  if (!route) {
    throw new Error(`No issue route found for ${skill}`);
  }

  const issueSearchUrl = buildIssueSearchUrl(route.label);
  const proofChecklist = [...route.proofChecklist, timeAdvice[timeBudget]];

  return {
    skill,
    title: route.title,
    issueSearchUrl,
    whyItFits: route.whyItFits,
    firstCommand: route.firstCommand,
    timeBudget,
    proofChecklist,
    commentTemplate: [
      "Hi, I would like to work on this.",
      `Skill: ${skill}`,
      `Time today: ${timeBudget}`,
      "Plan: I will make one focused change, run the check command, and share proof in the PR.",
      "Please assign this to me if it is still available."
    ].join("\n")
  };
}
