export type CareerCategory = "company" | "project" | "architecture_epoch";

export type CareerEpochId = "scale" | "architect";

export interface CareerActionLinks {
  caseStudyUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface CareerNode {
  id: string;
  title: string;
  category: CareerCategory;
  timeline: string;
  summary: string;
  impactMetrics: string[];
  architectureDecisions: string[];
  stack: string[];
  actionLinks: CareerActionLinks;
  epoch: CareerEpochId;
  x: number;
  y: number;
  connectedTo: string[];
}

export const CAREER_EPOCHS: { id: CareerEpochId; label: string }[] = [
  { id: "scale", label: "2022 — 2024: FOUNDATIONS" },
  { id: "architect", label: "2024 — 2026: BUILDING & SYSTEMS" },
];

export const CAREER_CANVAS = { w: 1000, h: 640 };

export const careerNodes: CareerNode[] = [
  {
    id: "foundations",
    title: "Systems & Logic Foundations",
    category: "architecture_epoch",
    epoch: "scale",
    timeline: "2022.03 — 2022.12",
    summary:
      "Built a foundation in programming logic and how machines execute instructions before moving into web frameworks. Linux, Bash, and Git became part of the daily workflow.",
    impactMetrics: [
      "Studied programming fundamentals with C++",
      "Practiced Linux, Bash, and Git as regular tools",
    ],
    architectureDecisions: [
      "Learn fundamentals before adopting abstractions",
      "Use version control from the start",
    ],
    stack: ["C++", "Linux", "Bash", "Git"],
    actionLinks: {},
    x: 170,
    y: 400,
    connectedTo: ["web-foundations"],
  },
  {
    id: "web-foundations",
    title: "The Web Platform Layer",
    category: "architecture_epoch",
    epoch: "scale",
    timeline: "2023.01 — 2023.08",
    summary:
      "Learned the raw web stack: semantic markup, layout systems, JavaScript, and the browser as an execution environment. Early servers ran on localhost while HTTP contracts and cross-origin rules became clear.",
    impactMetrics: [
      "Built responsive layouts with HTML, CSS, and JavaScript",
      "Worked through HTTP, the DOM, and browser event behavior",
    ],
    architectureDecisions: [
      "Understand the web platform before adopting libraries",
      "Debug systematically instead of guessing",
    ],
    stack: ["HTML5", "CSS", "JavaScript (ES6+)", "Node.js", "HTTP"],
    actionLinks: {},
    x: 370,
    y: 235,
    connectedTo: ["mern-build"],
  },
  {
    id: "mern-build",
    title: "MERN Practice",
    category: "project",
    epoch: "scale",
    timeline: "2023.06 — 2024.03",
    summary:
      "Built full-stack CRUD projects with MongoDB, Express, React, and Node.js. The focus was on clear REST contracts, typed state where practical, and getting projects deployed rather than leaving them local.",
    impactMetrics: [
      "Built multiple full-stack CRUD projects with the MERN stack",
      "Practiced REST contracts and basic deployment workflows",
    ],
    architectureDecisions: [
      "Keep API contracts explicit",
      "Prefer small, reviewable increments",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    actionLinks: {},
    x: 350,
    y: 475,
    connectedTo: ["devops-baseline", "realtime-depth"],
  },
  {
    id: "devops-baseline",
    title: "Deployment Practice",
    category: "architecture_epoch",
    epoch: "scale",
    timeline: "2024.02 — 2024.09",
    summary:
      "Started treating deployment as part of the deliverable. Practiced containerization, Linux-based hosting, and automated build and release workflows on small projects.",
    impactMetrics: [
      "Practiced containerizing projects with Docker",
      "Used Linux, Nginx, and GitHub Actions in deployment experiments",
    ],
    architectureDecisions: [
      "Make deployment part of the build process",
      "Keep local and production environments as close as practical",
    ],
    stack: ["Docker", "Linux", "Nginx", "GitHub Actions"],
    actionLinks: {},
    x: 560,
    y: 335,
    connectedTo: ["architecture-mindset"],
  },
  {
    id: "realtime-depth",
    title: "Real-Time Exploration",
    category: "architecture_epoch",
    epoch: "architect",
    timeline: "2024.10 — 2025.06",
    summary:
      "Explored WebRTC, WebSockets, and signaling patterns. The work focused on understanding join flows, NAT traversal, and the constraints of real-time media on ordinary networks.",
    impactMetrics: [
      "Explored WebRTC, WebSockets, and Socket.io signaling",
      "Studied NAT traversal and join-flow constraints",
    ],
    architectureDecisions: [
      "Treat signaling as a first-class part of real-time systems",
      "Design media paths with a realistic upgrade route",
    ],
    stack: ["WebRTC", "Socket.io", "Redis", "LiveKit", "WebSockets"],
    actionLinks: {},
    x: 510,
    y: 110,
    connectedTo: ["architecture-mindset", "eaalim-meet"],
  },
  {
    id: "architecture-mindset",
    title: "Systems Thinking",
    category: "architecture_epoch",
    epoch: "architect",
    timeline: "2025.01 — 2026.08",
    summary:
      "Moved from isolated features to thinking about boundaries, data models, and deployment constraints. The emphasis is on systems that are understandable and maintainable after the first version.",
    impactMetrics: [
      "Applied typed boundaries and data contracts in recent projects",
      "Focused on deployment constraints and maintainable structure",
    ],
    architectureDecisions: [
      "Clarify the data model before polishing the interface",
      "Prefer boring, observable systems over clever ones",
    ],
    stack: ["TypeScript", "Prisma", "Next.js", "PostgreSQL", "System Design"],
    actionLinks: {},
    x: 745,
    y: 300,
    connectedTo: ["eaalim-meet", "red-connect", "first-onw-hr", "dark-hub"],
  },
  {
    id: "eaalim-meet",
    title: "Eaalim Meet — Full-Stack Project",
    category: "project",
    epoch: "architect",
    timeline: "2025.01 — 2026.02",
    summary:
      "Worked on a real-time education platform involving presence, media signaling, and backend integration. The project was a practical lesson in keeping frontend and backend behavior aligned under real-time constraints.",
    impactMetrics: [
      "Practiced real-time presence and signaling in an education context",
      "Worked across frontend and backend boundaries",
    ],
    architectureDecisions: [
      "Keep room state isolated from presentation state",
      "Make join and presence behavior explicit in the design",
    ],
    stack: ["Next.js", "TypeScript", "WebRTC", "Socket.io", "MongoDB"],
    actionLinks: {},
    x: 545,
    y: 510,
    connectedTo: ["red-connect"],
  },
  {
    id: "red-connect",
    title: "Red Connect — Technical MVP",
    category: "project",
    epoch: "architect",
    timeline: "2026.03 — 2026.08",
    summary:
      "A technical MVP exploring low-latency video rooms. It started with a peer-to-peer media path and kept a simple upgrade route toward an SFU if scale ever required it.",
    impactMetrics: [
      "Explored WebRTC room setup on constrained networks",
      "Kept the media path simple before adding scale infrastructure",
    ],
    architectureDecisions: [
      "Use peer-to-peer media until scale demands an SFU",
      "Treat NAT traversal as a design concern, not a late patch",
    ],
    stack: ["WebRTC", "LiveKit", "Socket.io", "Node.js"],
    actionLinks: {},
    x: 860,
    y: 480,
    connectedTo: [],
  },
  {
    id: "first-onw-hr",
    title: "First Onw HR Platform",
    category: "project",
    epoch: "architect",
    timeline: "2026.09 — PRESENT",
    summary:
      "Built an authenticated employee management platform with Laravel 12, PHP 8, and MySQL, then re-engineered it for a stateless serverless PHP runtime. Framework defaults that assumed persistent storage were deliberately re-bound.",
    impactMetrics: [
      "4 employee CRUD operations over 6 fields with 25 records per page",
      "5 feature tests covering the full lifecycle and auth guards",
    ],
    architectureDecisions: [
      "Move sessions, cache, and queues out of ephemeral /tmp into MySQL",
      "Use a hybrid build graph with a PHP function and static edge on one domain",
    ],
    stack: ["Laravel 12", "PHP 8", "MySQL", "Blade", "Eloquent", "Vercel"],
    actionLinks: {
      caseStudyUrl: "/projects/first-onw-hr",
    },
    x: 810,
    y: 105,
    connectedTo: [],
  },
  {
    id: "dark-hub",
    title: "Dark Hub.dev",
    category: "project",
    epoch: "architect",
    timeline: "2026.06 — PRESENT",
    summary:
      "An ongoing exploration of how product thinking, engineering, and brand work can share a clearer workflow. It is a space for experiments, not a public product or agency claim.",
    impactMetrics: [
      "Exploring a connected workflow for planning and building",
      "No public release or client work yet",
    ],
    architectureDecisions: [
      "Keep product, engineering, and brand decisions connected",
      "Separate exploration from shipped products",
    ],
    stack: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    actionLinks: {
      caseStudyUrl: "/lab/dark-hub-dev",
    },
    x: 910,
    y: 250,
    connectedTo: [],
  },
];
