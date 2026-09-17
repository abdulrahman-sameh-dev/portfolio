export type CareerCategory = "company" | "project" | "architecture_epoch";

export type CareerEpochId = "scale" | "architect";

export interface CareerActionLinks {
  caseStudyUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
}

export interface CareerNode {
  // Identity
  id: string;
  title: string;
  category: CareerCategory;
  timeline: string;
  summary: string;
  // Evidence
  impactMetrics: string[];
  architectureDecisions: string[];
  stack: string[];
  actionLinks: CareerActionLinks;
  // Graph layout
  epoch: CareerEpochId;
  x: number;
  y: number;
  connectedTo: string[];
}

export const CAREER_EPOCHS: { id: CareerEpochId; label: string }[] = [
  { id: "scale", label: "2022–2024: SCALE PHASE" },
  { id: "architect", label: "2024–2026: ARCHITECT PHASE" },
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
      "Established a systems-first mental model by studying how machines actually execute logic before touching a single web framework. Built CLI fluency, compilation semantics, and version control into daily operating rituals.",
    impactMetrics: [
      "Completed 400+ exercises across logic, memory, and pointer semantics",
      "Reached daily-driver fluency in Linux CLI and Git in under six months",
    ],
    architectureDecisions: [
      "Learned fundamentals before frameworks — no abstraction while the primitives are still unclear",
      "Adopted Linux and Git as the permanent daily environment",
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
      "Mastered the raw web stack — semantic markup, layout systems, and the browser as an execution environment. First servers listened on localhost, and the early pain points were HTTP contracts and cross-origin rules.",
    impactMetrics: [
      "Hand-built 200+ responsive layouts without a single CSS framework",
      "Compressed debug-to-fix cycles to under three iterations through systematic tracing",
    ],
    architectureDecisions: [
      "Learned HTTP and the event loop before touching any frontend abstraction",
      "Reimplemented common UI patterns by hand before adopting libraries",
    ],
    stack: ["HTML5", "CSS", "JavaScript (ES6+)", "Node.js", "HTTP"],
    actionLinks: {},
    x: 370,
    y: 235,
    connectedTo: ["mern-build"],
  },
  {
    id: "mern-build",
    title: "MERN Product Systems",
    category: "project",
    epoch: "scale",
    timeline: "2023.06 — 2024.03",
    summary:
      "Shipped full-stack systems on MongoDB, Express, React, and Node with CRUD contracts treated as public API surface. Every deliverable reached a live URL — never a local-only file.",
    impactMetrics: [
      "Shipped 6 full-stack systems to production",
      "Standardized REST contract versioning across all shipped services",
    ],
    architectureDecisions: [
      "Standardized REST contract versioning before the first client integration",
      "Adopted typed state patterns before they became mainstream",
    ],
    stack: ["MongoDB", "Express", "React", "Node.js"],
    actionLinks: {},
    x: 350,
    y: 475,
    connectedTo: ["devops-baseline", "realtime-depth"],
  },
  {
    id: "devops-baseline",
    title: "Server Ops & Deployment Discipline",
    category: "architecture_epoch",
    epoch: "scale",
    timeline: "2024.02 — 2024.09",
    summary:
      "Learned to treat deployment as a first-class system output — reproducible, observable, and deliberately boring. Containerized every project and routed all releases through automated pipelines.",
    impactMetrics: [
      "Cut release time from manual copy steps to sub-3-minute pipeline deploys",
      "Held a 100% green pipeline streak across six consecutive months",
    ],
    architectureDecisions: [
      "Dockerize everything early — enforced parity between local and production",
      "Automate deploys through CI/CD pipelines only — zero manual server steps",
    ],
    stack: ["Docker", "Linux", "Nginx", "GitHub Actions"],
    actionLinks: {},
    x: 560,
    y: 335,
    connectedTo: ["architecture-mindset"],
  },
  {
    id: "realtime-depth",
    title: "Real-Time Telemetry Epoch",
    category: "architecture_epoch",
    epoch: "architect",
    timeline: "2024.10 — 2025.06",
    summary:
      "Went deep on low-latency signaling and media-plane engineering — WebSockets, WebRTC internals, and the realities of NAT traversal on constrained networks. Designed a signaling topology optimized for sub-second joins.",
    impactMetrics: [
      "Designed signaling for sub-200ms join latency under sustained load",
      "Benchmarked 10k+ concurrent socket connections without reconnect storms",
    ],
    architectureDecisions: [
      "Redis Pub/Sub for sub-second socket syncing across instances",
      "SFU-ready media topology from day one instead of retrofitting scale",
    ],
    stack: ["WebRTC", "Socket.io", "Redis", "LiveKit", "WebSockets"],
    actionLinks: {},
    x: 510,
    y: 110,
    connectedTo: ["architecture-mindset", "eaalim-meet"],
  },
  {
    id: "architecture-mindset",
    title: "Systems Architecture Discipline",
    category: "architecture_epoch",
    epoch: "architect",
    timeline: "2025.01 — 2026.08",
    summary:
      "Moved from building features to designing systems — type-safe boundaries, multi-tenant isolation, and the discipline of decisions that survive the first version. Standardized a contract-first workflow across the entire stack.",
    impactMetrics: [
      "Standardized typed boundaries across 4 production services",
      "Driven cross-service integration bugs to zero within two release cycles",
    ],
    architectureDecisions: [
      "Data contracts before UI polish — the schema is the API",
      "Typed boundaries on every layer; boring, observable systems over cleverness",
    ],
    stack: ["TypeScript", "Prisma", "Next.js", "PostgreSQL", "System Design"],
    actionLinks: {},
    x: 745,
    y: 300,
    connectedTo: ["eaalim-meet", "red-connect", "first-onw-hr", "dark-hub"],
  },
  {
    id: "eaalim-meet",
    title: "Senior Full-Stack Architect",
    category: "company",
    epoch: "architect",
    timeline: "2025.01 — 2026.02",
    summary:
      "Owned the full vertical slice of Eaalim Meet, a production real-time education platform — presence, media signaling, and the backend that kept thousands of concurrent connections calm under load. Sub-second joins and crash-free presence were the product contract, not aspirational notes.",
    impactMetrics: [
      "Handled 10k+ concurrent WebRTC streams without degradation",
      "Reduced API latency by 42% via typed service boundaries",
    ],
    architectureDecisions: [
      "Event-driven presence isolation over shared mutable room state",
      "Redis Pub/Sub for sub-second socket syncing across instances",
      "Observability wired in before launch — metrics went live on day one",
    ],
    stack: ["Next.js 16", "TypeScript", "WebRTC", "Socket.io", "Redis", "MongoDB"],
    actionLinks: {},
    x: 545,
    y: 510,
    connectedTo: ["red-connect"],
  },
  {
    id: "red-connect",
    title: "Red Connect Infrastructure",
    category: "project",
    epoch: "architect",
    timeline: "2026.03 — 2026.08",
    summary:
      "Architected a low-latency video conferencing platform engineered for constrained networks, with P2P media first and an SFU upgrade path ready. Latency budgets were enforced in code review, not just in documentation.",
    impactMetrics: [
      "Achieved sub-second room join on constrained corporate networks",
      "P2P-first media path cutting bandwidth by 60% for two-party rooms",
    ],
    architectureDecisions: [
      "P2P until scale demands an SFU — pragmatic media topology",
      "NAT traversal treated as a first-class concern, not a patch for later",
    ],
    stack: ["WebRTC", "LiveKit", "Socket.io", "Node.js", "Docker"],
    actionLinks: {
      caseStudyUrl: "/projects/red-connect",
    },
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
      "Shipped a full-stack employee management platform with Laravel 12, PHP 8, and MySQL — then re-engineered it stateless-first to survive Vercel's serverless PHP runtime on AWS Lambda. Every framework default that assumed a persistent filesystem was deliberately re-bound.",
    impactMetrics: [
      "4 employee CRUD ops over 6 fields with 25 records per page",
      "5 feature tests covering the full lifecycle + auth guards",
    ],
    architectureDecisions: [
      "All state moved to MySQL — sessions, cache and queues out of the ephemeral /tmp",
      "Hybrid build graph: framework: null with a PHP lambda + static edge on one domain",
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
    title: "Dark Hub Studio Platform",
    category: "company",
    epoch: "architect",
    timeline: "2026.06 — PRESENT",
    summary:
      "Directing the flagship vision of Dark Hub — a premium digital studio where product strategy, engineering, and branding run through a single pipeline. Zero templates, one coherent system, from idea to ship.",
    impactMetrics: [
      "Running all 3 core disciplines through one unified pipeline",
      "0 templates — every deliverable produced from scratch",
    ],
    architectureDecisions: [
      "Brand discipline enforced as an engineering constraint",
      "Single pipeline from idea to ship across product and brand work",
    ],
    stack: ["Next.js 16", "TypeScript", "Tailwind CSS", "Motion", "Vercel"],
    actionLinks: {
      caseStudyUrl: "/projects/dark-hub",
    },
    x: 910,
    y: 250,
    connectedTo: [],
  },
];