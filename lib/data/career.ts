export type CareerNodeType = "Company" | "KeyProject" | "SkillEpoch" | "Landmark";

export type CareerEpochId = "scale" | "architect";

export interface CareerMetric {
  value: string;
  label: string;
}

export interface CareerLink {
  label: string;
  href: string;
  kind: "github" | "live";
}

export interface CareerNode {
  // JSON-LD compliance (schema.org)
  "@context": "https://schema.org";
  "@type": string;
  // Graph
  id: string;
  name: string;
  type: CareerNodeType;
  epoch: CareerEpochId;
  x: number;
  y: number;
  dateRange: { start: string; end?: string; label: string };
  role?: string;
  summary: string;
  decisions: string[];
  tech: string[];
  metrics: CareerMetric[];
  connectedTo: string[];
  links?: CareerLink[];
  linkedRep: () => CareerNode[];
}

const NODE_TYPES: Record<CareerNodeType, string> = {
  Company: "Organization",
  KeyProject: "CreativeWork",
  SkillEpoch: "EducationalOccupationalCredential",
  Landmark: "Event",
};

export const CAREER_EPOCHS: { id: CareerEpochId; label: string }[] = [
  { id: "scale", label: "2022–2024: SCALE PHASE" },
  { id: "architect", label: "2024–2026: ARCHITECT PHASE" },
];

export const CAREER_CANVAS = { w: 1000, h: 640 };

const rawNodes: Omit<CareerNode, "linkedRep" | "@context" | "@type">[] = [
  {
    id: "genesis",
    name: "Logic Foundations",
    type: "SkillEpoch",
    epoch: "scale",
    x: 170,
    y: 380,
    dateRange: { start: "2022", end: "2022", label: "2022" },
    role: "System Exploration",
    summary:
      "First contact with systems thinking. Built a mental model of how machines execute logic before writing a single line of production web code — the command line as home turf, compilation as ceremony, Git as a safety net.",
    decisions: [
      "Learn fundamentals before frameworks",
      "Adopt Linux and Git as daily drivers",
    ],
    tech: ["C++", "Linux CLI", "Git"],
    metrics: [
      { value: "1", label: "foundational language" },
      { value: "∞", label: "curiosity budget" },
    ],
    connectedTo: ["web-foundations", "mern-build"],
  },
  {
    id: "web-foundations",
    name: "The Web Layer",
    type: "SkillEpoch",
    epoch: "scale",
    x: 360,
    y: 220,
    dateRange: { start: "2023", end: "2023", label: "2023" },
    role: "Frontend Foundations",
    summary:
      "Mastered the raw web stack — semantic markup, layout systems, and the browser as an execution environment. First servers listened on localhost; first headaches were CORS.",
    decisions: [
      "Learn HTTP before abstractions",
      "Rebuild interfaces by hand before touching libraries",
    ],
    tech: ["HTML", "CSS", "JavaScript", "Node.js"],
    metrics: [{ value: "200+", label: "hand-built layouts" }],
    connectedTo: ["mern-build"],
  },
  {
    id: "mern-build",
    name: "MERN Systems",
    type: "KeyProject",
    epoch: "scale",
    x: 360,
    y: 460,
    dateRange: { start: "2023", end: "2024", label: "2023–2024" },
    summary:
      "Full-stack systems on MongoDB, Express, React, and Node. CRUD became contracts, rendering became architecture. Every project shipped to a live URL — never a local file.",
    decisions: [
      "Standardize REST contracts early",
      "Adopt typed state patterns before they were fashionable",
    ],
    tech: ["MongoDB", "Express", "React", "Node.js"],
    metrics: [{ value: "5+", label: "shipped systems" }],
    connectedTo: ["devops-baseline", "realtime-depth"],
  },
  {
    id: "devops-baseline",
    name: "Server Ops & Automation",
    type: "SkillEpoch",
    epoch: "scale",
    x: 560,
    y: 330,
    dateRange: { start: "2024", end: "2024", label: "2024" },
    role: "Deployment Discipline",
    summary:
      "Containers, CI/CD, and Linux orchestration. Learned to treat deployment as a first-class system output — reproducible, observable, and deliberately boring.",
    decisions: [
      "Dockerize everything early",
      "Automate deploys through pipelines only",
    ],
    tech: ["Docker", "Linux", "Nginx", "GitHub Actions"],
    metrics: [{ value: "100%", label: "pipelines green" }],
    connectedTo: ["architecture-mindset"],
  },
  {
    id: "realtime-depth",
    name: "Real-Time Protocols",
    type: "SkillEpoch",
    epoch: "architect",
    x: 530,
    y: 110,
    dateRange: { start: "2024", end: "2025", label: "2024–2025" },
    role: "Latency Engineering",
    summary:
      "Low-latency signaling and media-plane depth — WebSockets, WebRTC internals, and the realities of NAT traversal and constrained networks.",
    decisions: [
      "Follow WebRTC internals, not just wrapper APIs",
      "Design for sub-second join times",
    ],
    tech: ["WebRTC", "Socket.io", "LiveKit"],
    metrics: [{ value: "<200ms", label: "target latency" }],
    connectedTo: ["eaalim-meet"],
  },
  {
    id: "architecture-mindset",
    name: "Architecture Layer",
    type: "Landmark",
    epoch: "architect",
    x: 760,
    y: 300,
    dateRange: { start: "2025", end: "2026", label: "2025–2026" },
    summary:
      "The shift from building features to designing systems — type-safe boundaries, multi-tenant isolation, and the discipline of making decisions that scale past the first version.",
    decisions: [
      "Data contracts before UI polish",
      "Typed boundaries on every layer",
      "Preference for boring, observable systems",
    ],
    tech: ["TypeScript", "Prisma", "Next.js", "System Design"],
    metrics: [{ value: "4", label: "architecture principles" }],
    connectedTo: ["eaalim-meet", "red-connect", "dark-hub"],
  },
  {
    id: "eaalim-meet",
    name: "Eaalim Meet",
    type: "Company",
    epoch: "architect",
    x: 560,
    y: 500,
    dateRange: { start: "2025", end: "2026", label: "2025–2026" },
    role: "Full Stack Engineer — Real-time Systems",
    summary:
      "Production-grade real-time education platform. Owned the full stack — presence, media signaling, and the backend that kept thousands of concurrent connections calm under load.",
    decisions: [
      "SFU-backed scaling path from day one",
      "Presence modeled as typed events",
      "Observability wired in before launch",
    ],
    tech: ["Next.js", "WebRTC", "Socket.io", "MongoDB"],
    metrics: [
      { value: "1000s", label: "concurrent connections" },
      { value: "24/7", label: "uptime target" },
    ],
    connectedTo: ["red-connect"],
  },
  {
    id: "red-connect",
    name: "Red Connect",
    type: "KeyProject",
    epoch: "architect",
    x: 820,
    y: 480,
    dateRange: { start: "2026", end: "2026", label: "2026" },
    role: "System Architect & Lead Developer",
    summary:
      "Low-latency video conferencing platform engineered for constrained networks. P2P media first with an SFU upgrade path ready, sub-second joins as the contract.",
    decisions: [
      "Peer-to-peer until scale demands an SFU",
      "NAT traversal as a first-class concern",
      "Latency budget enforced in code review",
    ],
    tech: ["WebRTC", "LiveKit", "Socket.io", "Node.js"],
    metrics: [
      { value: "<200ms", label: "real-time latency" },
      { value: "sub-second", label: "room join" },
    ],
    links: [{ label: "View Case Study", href: "/projects/red-connect", kind: "live" }],
    connectedTo: [],
  },
  {
    id: "dark-hub",
    name: "Dark Hub",
    type: "Landmark",
    epoch: "architect",
    x: 900,
    y: 130,
    dateRange: { start: "2026", end: undefined, label: "2026 — PRESENT" },
    summary:
      "The flagship product vision — a premium digital studio where product strategy, engineering, and branding run through one pipeline. Zero templates, one coherent system.",
    decisions: [
      "Brand discipline as an engineering constraint",
      "Single pipeline from idea to ship",
    ],
    tech: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
    metrics: [
      { value: "3", label: "core disciplines" },
      { value: "0", label: "templates" },
    ],
    links: [{ label: "View Case Study", href: "/projects/dark-hub", kind: "live" }],
    connectedTo: [],
  },
];

export const careerNodes: CareerNode[] = rawNodes.map((node) => ({
  "@context": "https://schema.org",
  "@type": NODE_TYPES[node.type],
  ...node,
  linkedRep: () =>
    careerNodes.filter((candidate) => node.connectedTo.includes(candidate.id)),
}));