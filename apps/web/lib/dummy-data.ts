// Dummy data for GitHub dashboard - will be replaced with real API calls later

export interface Repository {
  name: string;
  fullName: string;
  url: string;
  description: string;
  language: string;
  stars: number;
  forks: number;
  openIssues: number;
  isPrivate: boolean;
  updatedAt: string;
  createdAt: string;
  defaultBranch: string;
  topics: string[];
}

export interface Issue {
  id: number;
  title: string;
  repoName: string;
  state: "open" | "closed";
  labels: { name: string; color: string }[];
  createdAt: string;
  updatedAt: string;
  author: string;
  comments: number;
  assignee?: string;
}

export interface ActivityData {
  day: string;
  commits: number;
  pullRequests: number;
}

export interface LanguageData {
  language: string;
  count: number;
  color: string;
}

export const DUMMY_REPOSITORIES: Repository[] = [
  {
    name: "Gitbro",
    fullName: "HimanshuTamoli24/Gitbro",
    url: "https://github.com/HimanshuTamoli24/Gitbro",
    description: "A full-stack GitHub integration platform with OAuth, tRPC, and Corsair engine.",
    language: "TypeScript",
    stars: 142,
    forks: 23,
    openIssues: 8,
    isPrivate: false,
    updatedAt: "2026-07-31T10:00:00Z",
    createdAt: "2026-06-15T08:00:00Z",
    defaultBranch: "main",
    topics: ["nextjs", "trpc", "typescript", "monorepo"],
  },
  {
    name: "react-dashboard-kit",
    fullName: "HimanshuTamoli24/react-dashboard-kit",
    url: "https://github.com/HimanshuTamoli24/react-dashboard-kit",
    description: "Opinionated React dashboard starter with shadcn/ui, charts, and dark mode.",
    language: "TypeScript",
    stars: 89,
    forks: 15,
    openIssues: 3,
    isPrivate: false,
    updatedAt: "2026-07-28T14:30:00Z",
    createdAt: "2026-05-01T12:00:00Z",
    defaultBranch: "main",
    topics: ["react", "dashboard", "shadcn"],
  },
  {
    name: "express-auth-api",
    fullName: "HimanshuTamoli24/express-auth-api",
    url: "https://github.com/HimanshuTamoli24/express-auth-api",
    description: "Production-ready Express.js API with JWT auth, rate limiting, and Swagger docs.",
    language: "JavaScript",
    stars: 56,
    forks: 12,
    openIssues: 5,
    isPrivate: false,
    updatedAt: "2026-07-25T09:15:00Z",
    createdAt: "2026-03-20T10:00:00Z",
    defaultBranch: "main",
    topics: ["express", "auth", "api", "swagger"],
  },
  {
    name: "ml-playground",
    fullName: "HimanshuTamoli24/ml-playground",
    url: "https://github.com/HimanshuTamoli24/ml-playground",
    description: "Interactive ML experiments with TensorFlow.js and real-time visualizations.",
    language: "Python",
    stars: 234,
    forks: 45,
    openIssues: 12,
    isPrivate: false,
    updatedAt: "2026-07-30T16:00:00Z",
    createdAt: "2026-01-10T08:00:00Z",
    defaultBranch: "main",
    topics: ["machine-learning", "python", "tensorflow"],
  },
  {
    name: "private-infra",
    fullName: "HimanshuTamoli24/private-infra",
    url: "https://github.com/HimanshuTamoli24/private-infra",
    description:
      "Infrastructure-as-code for personal cloud deployments using Terraform and Docker.",
    language: "HCL",
    stars: 0,
    forks: 0,
    openIssues: 2,
    isPrivate: true,
    updatedAt: "2026-07-29T11:00:00Z",
    createdAt: "2026-04-05T14:00:00Z",
    defaultBranch: "main",
    topics: ["terraform", "docker", "infrastructure"],
  },
  {
    name: "portfolio-v3",
    fullName: "HimanshuTamoli24/portfolio-v3",
    url: "https://github.com/HimanshuTamoli24/portfolio-v3",
    description:
      "Personal portfolio website built with Next.js, GSAP animations, and Lenis scroll.",
    language: "TypeScript",
    stars: 18,
    forks: 4,
    openIssues: 1,
    isPrivate: false,
    updatedAt: "2026-07-20T08:30:00Z",
    createdAt: "2026-06-01T10:00:00Z",
    defaultBranch: "main",
    topics: ["portfolio", "nextjs", "gsap"],
  },
  {
    name: "cli-toolbox",
    fullName: "HimanshuTamoli24/cli-toolbox",
    url: "https://github.com/HimanshuTamoli24/cli-toolbox",
    description: "Collection of CLI utilities for dev workflow automation.",
    language: "Rust",
    stars: 67,
    forks: 8,
    openIssues: 4,
    isPrivate: false,
    updatedAt: "2026-07-22T15:00:00Z",
    createdAt: "2026-02-14T09:00:00Z",
    defaultBranch: "main",
    topics: ["rust", "cli", "developer-tools"],
  },
  {
    name: "design-system",
    fullName: "HimanshuTamoli24/design-system",
    url: "https://github.com/HimanshuTamoli24/design-system",
    description: "Shared component library and design tokens for all projects.",
    language: "TypeScript",
    stars: 34,
    forks: 6,
    openIssues: 7,
    isPrivate: false,
    updatedAt: "2026-07-27T12:00:00Z",
    createdAt: "2026-04-20T11:00:00Z",
    defaultBranch: "main",
    topics: ["design-system", "components", "storybook"],
  },
  {
    name: "go-microservices",
    fullName: "HimanshuTamoli24/go-microservices",
    url: "https://github.com/HimanshuTamoli24/go-microservices",
    description: "Microservices template in Go with gRPC, NATS messaging, and OpenTelemetry.",
    language: "Go",
    stars: 112,
    forks: 19,
    openIssues: 6,
    isPrivate: false,
    updatedAt: "2026-07-26T13:45:00Z",
    createdAt: "2026-02-28T07:00:00Z",
    defaultBranch: "main",
    topics: ["go", "microservices", "grpc"],
  },
  {
    name: "notes-app",
    fullName: "HimanshuTamoli24/notes-app",
    url: "https://github.com/HimanshuTamoli24/notes-app",
    description: "Minimal note-taking app with markdown support and local-first sync.",
    language: "TypeScript",
    stars: 45,
    forks: 7,
    openIssues: 3,
    isPrivate: false,
    updatedAt: "2026-07-18T10:20:00Z",
    createdAt: "2026-05-12T16:00:00Z",
    defaultBranch: "main",
    topics: ["notes", "markdown", "local-first"],
  },
  {
    name: "secret-env-manager",
    fullName: "HimanshuTamoli24/secret-env-manager",
    url: "https://github.com/HimanshuTamoli24/secret-env-manager",
    description: "Encrypted environment variable manager for teams with role-based access.",
    language: "TypeScript",
    stars: 28,
    forks: 3,
    openIssues: 1,
    isPrivate: true,
    updatedAt: "2026-07-15T09:00:00Z",
    createdAt: "2026-06-20T08:00:00Z",
    defaultBranch: "main",
    topics: ["security", "env", "encryption"],
  },
  {
    name: "leetcode-solutions",
    fullName: "HimanshuTamoli24/leetcode-solutions",
    url: "https://github.com/HimanshuTamoli24/leetcode-solutions",
    description:
      "Solutions to LeetCode problems with explanations, complexity analysis, and tests.",
    language: "Java",
    stars: 76,
    forks: 22,
    openIssues: 0,
    isPrivate: false,
    updatedAt: "2026-07-31T07:00:00Z",
    createdAt: "2025-11-01T08:00:00Z",
    defaultBranch: "main",
    topics: ["leetcode", "algorithms", "java"],
  },
];

export const DUMMY_ISSUES: Issue[] = [
  {
    id: 1,
    title: "OAuth callback fails with state mismatch on Safari",
    repoName: "Gitbro",
    state: "open",
    labels: [
      { name: "bug", color: "#d73a4a" },
      { name: "priority: high", color: "#e99695" },
    ],
    createdAt: "2026-07-30T14:00:00Z",
    updatedAt: "2026-07-31T08:00:00Z",
    author: "HimanshuTamoli24",
    comments: 3,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 2,
    title: "Add dark mode toggle to dashboard sidebar",
    repoName: "Gitbro",
    state: "open",
    labels: [{ name: "enhancement", color: "#a2eeef" }],
    createdAt: "2026-07-29T10:00:00Z",
    updatedAt: "2026-07-30T12:00:00Z",
    author: "contributor42",
    comments: 5,
  },
  {
    id: 3,
    title: "TypeScript strict mode errors in chart components",
    repoName: "react-dashboard-kit",
    state: "open",
    labels: [
      { name: "bug", color: "#d73a4a" },
      { name: "typescript", color: "#3178c6" },
    ],
    createdAt: "2026-07-28T16:00:00Z",
    updatedAt: "2026-07-29T09:00:00Z",
    author: "devuser99",
    comments: 2,
  },
  {
    id: 4,
    title: "Rate limiter not working with Redis cluster mode",
    repoName: "express-auth-api",
    state: "open",
    labels: [
      { name: "bug", color: "#d73a4a" },
      { name: "help wanted", color: "#008672" },
    ],
    createdAt: "2026-07-27T11:00:00Z",
    updatedAt: "2026-07-28T15:00:00Z",
    author: "opensourcedev",
    comments: 8,
  },
  {
    id: 5,
    title: "Add GPU memory profiling for large models",
    repoName: "ml-playground",
    state: "open",
    labels: [
      { name: "enhancement", color: "#a2eeef" },
      { name: "performance", color: "#fbca04" },
    ],
    createdAt: "2026-07-26T09:00:00Z",
    updatedAt: "2026-07-30T10:00:00Z",
    author: "HimanshuTamoli24",
    comments: 4,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 6,
    title: "Terraform state locking fails on concurrent deploys",
    repoName: "private-infra",
    state: "open",
    labels: [{ name: "bug", color: "#d73a4a" }],
    createdAt: "2026-07-25T14:00:00Z",
    updatedAt: "2026-07-26T08:00:00Z",
    author: "HimanshuTamoli24",
    comments: 1,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 7,
    title: "Implement GSAP ScrollTrigger for project cards",
    repoName: "portfolio-v3",
    state: "closed",
    labels: [{ name: "enhancement", color: "#a2eeef" }],
    createdAt: "2026-07-20T10:00:00Z",
    updatedAt: "2026-07-22T16:00:00Z",
    author: "HimanshuTamoli24",
    comments: 0,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 8,
    title: "CLI crashes on Windows with special characters in path",
    repoName: "cli-toolbox",
    state: "open",
    labels: [
      { name: "bug", color: "#d73a4a" },
      { name: "windows", color: "#0078d4" },
    ],
    createdAt: "2026-07-22T08:00:00Z",
    updatedAt: "2026-07-23T11:00:00Z",
    author: "windowsuser",
    comments: 6,
  },
  {
    id: 9,
    title: "Update Storybook to v9 with new CSF format",
    repoName: "design-system",
    state: "open",
    labels: [
      { name: "dependencies", color: "#0366d6" },
      { name: "enhancement", color: "#a2eeef" },
    ],
    createdAt: "2026-07-21T12:00:00Z",
    updatedAt: "2026-07-27T09:00:00Z",
    author: "HimanshuTamoli24",
    comments: 3,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 10,
    title: "gRPC health check endpoint returning wrong status",
    repoName: "go-microservices",
    state: "closed",
    labels: [{ name: "bug", color: "#d73a4a" }],
    createdAt: "2026-07-19T15:00:00Z",
    updatedAt: "2026-07-20T10:00:00Z",
    author: "godev101",
    comments: 2,
  },
  {
    id: 11,
    title: "Markdown preview doesn't render LaTeX equations",
    repoName: "notes-app",
    state: "open",
    labels: [
      { name: "enhancement", color: "#a2eeef" },
      { name: "good first issue", color: "#7057ff" },
    ],
    createdAt: "2026-07-18T09:00:00Z",
    updatedAt: "2026-07-19T14:00:00Z",
    author: "mathuser",
    comments: 4,
  },
  {
    id: 12,
    title: "Add support for .env.vault encrypted files",
    repoName: "secret-env-manager",
    state: "closed",
    labels: [{ name: "enhancement", color: "#a2eeef" }],
    createdAt: "2026-07-15T08:00:00Z",
    updatedAt: "2026-07-17T16:00:00Z",
    author: "HimanshuTamoli24",
    comments: 1,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 13,
    title: "Add two-pointer technique solutions for medium problems",
    repoName: "leetcode-solutions",
    state: "closed",
    labels: [{ name: "documentation", color: "#0075ca" }],
    createdAt: "2026-07-14T11:00:00Z",
    updatedAt: "2026-07-15T09:00:00Z",
    author: "HimanshuTamoli24",
    comments: 0,
  },
  {
    id: 14,
    title: "Implement multi-tenant data isolation for repositories",
    repoName: "Gitbro",
    state: "open",
    labels: [
      { name: "enhancement", color: "#a2eeef" },
      { name: "priority: high", color: "#e99695" },
    ],
    createdAt: "2026-07-28T08:00:00Z",
    updatedAt: "2026-07-31T11:00:00Z",
    author: "HimanshuTamoli24",
    comments: 7,
    assignee: "HimanshuTamoli24",
  },
  {
    id: 15,
    title: "Docker compose file missing volume mounts for hot reload",
    repoName: "go-microservices",
    state: "open",
    labels: [
      { name: "bug", color: "#d73a4a" },
      { name: "docker", color: "#0db7ed" },
    ],
    createdAt: "2026-07-24T13:00:00Z",
    updatedAt: "2026-07-25T10:00:00Z",
    author: "devopsengineer",
    comments: 3,
  },
  {
    id: 16,
    title: "Neural network visualization renders incorrectly on mobile",
    repoName: "ml-playground",
    state: "open",
    labels: [
      { name: "bug", color: "#d73a4a" },
      { name: "responsive", color: "#c5def5" },
    ],
    createdAt: "2026-07-29T12:00:00Z",
    updatedAt: "2026-07-30T14:00:00Z",
    author: "mobiledev",
    comments: 2,
  },
];

export const DUMMY_ACTIVITY: ActivityData[] = [
  { day: "Mon", commits: 12, pullRequests: 3 },
  { day: "Tue", commits: 19, pullRequests: 5 },
  { day: "Wed", commits: 8, pullRequests: 2 },
  { day: "Thu", commits: 24, pullRequests: 7 },
  { day: "Fri", commits: 15, pullRequests: 4 },
  { day: "Sat", commits: 6, pullRequests: 1 },
  { day: "Sun", commits: 3, pullRequests: 0 },
];

export const DUMMY_LANGUAGES: LanguageData[] = [
  { language: "TypeScript", count: 5, color: "#3178c6" },
  { language: "Python", count: 1, color: "#3572A5" },
  { language: "Go", count: 1, color: "#00ADD8" },
  { language: "Rust", count: 1, color: "#dea584" },
  { language: "JavaScript", count: 1, color: "#f1e05a" },
  { language: "HCL", count: 1, color: "#844fba" },
  { language: "Java", count: 1, color: "#b07219" },
];
