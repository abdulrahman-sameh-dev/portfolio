export type Project = {
  slug: string;
  title: string;
  status: string;
  description: string;
  tags: string[];
  size: "large" | "medium";
  image?: string;
  datePublished: string;
  url?: {
    liveDemo?: string;
    github?: string;
    caseStudy?: string;
  };
  overview: string;
  problem: string;
  architecture: {
    summary: string;
    stack: string[];
  };
  challenges: string[];
  metrics: {
    value: string;
    label: string;
  }[];
};

export type SkillCategory = "Frontend" | "Backend" | "DevOps";

export type Skill = {
  name: string;
  code: string;
  category: SkillCategory;
  level: "Expert" | "Advanced" | "Intermediate" | "Basic";
  proficiency: number;
  description: string;
  icon: string;
  brand: string;
  brandBg: string;
  padding: string;
  featured?: boolean;
};

export type SystemIcon = "stack" | "flow" | "pipeline" | "nodes";

export type System = {
  id: string;
  label: string;
  description: string;
  tech: string[];
  status: string;
  progress: number;
  icon: SystemIcon;
};

export type Service = {
  id: string;
  code: string;
  title: string;
  description: string;
  stack: string[];
};

export const siteConfig = {
  name: "Abdulrahman Sameh",
  email: "abdulrahman.sameh.dev@proton.me",
  siteUrl: "https://portfolite-mocha.vercel.app",
  resumeUrl: "/resume",
  availability: {
    label: "Available for Full-time & Contract Roles",
    status: "open",
  },
  socials: {
    github: "https://github.com/abdulrahman-sameh-dev",
    linkedin: "https://www.linkedin.com/in/abdulrahman-sameh-dev/",
    x: "https://x.com/darkhub_dev",
  },
  location: {
    city: "Giza, Egypt",
    timezone: "GMT+2",
    mapsUrl: "https://maps.app.goo.gl/ywy3QXCJ7y8EfdQL6",
    coordinates: "30°07'59.2\"N, 31°03'45.7\"E",
  },
  skills: [
    {
      name: "Next.js",
      code: "NX",
      category: "Frontend",
      level: "Expert",
      proficiency: 95,
      description: "App Router, Server Actions & High-performance rendering.",
      icon: "nextjs",
      brand: "#000000",
      brandBg: "#ffffff",
      padding: "0px",
      featured: true,
    },
    {
      name: "TypeScript",
      code: "TS",
      category: "Frontend",
      level: "Expert",
      proficiency: 90,
      description: "Type-safe development with strict interfaces & generics.",
      icon: "typescript",
      brand: "#3178C6",
      brandBg: "#ffffff",
      padding: "0px",
      featured: true,
    },
    {
      name: "Tailwind CSS",
      code: "TW",
      category: "Frontend",
      level: "Expert",
      proficiency: 98,
      description: "Utility-first CSS & Scalable Design Systems.",
      icon: "tailwind",
      brand: "#FFFFFF",
      brandBg: "#38BDF8",
      padding: "0px",
      featured: true,
    },
    {
      name: "Postgres",
      code: "PG",
      category: "Backend",
      level: "Advanced",
      proficiency: 85,
      description: "Relational schema design & query optimization.",
      icon: "postgres",
      brand: "#FFFFFF",
      brandBg: "#336791",
      padding: "0px",
      featured: true,
    },
    {
      name: "Docker",
      code: "DK",
      category: "DevOps",
      level: "Basic",
      proficiency: 80,
      description: "Containerizing apps for consistent dev/prod workflows.",
      icon: "docker",
      brand: "#FFFFFF",
      brandBg: "#2496ED",
      padding: "0px",
      featured: true,
    },
    {
      name: "Prisma",
      code: "PR",
      category: "Backend",
      level: "Advanced",
      proficiency: 92,
      description: "Type-safe ORM modeling, migrations & data access.",
      icon: "prisma",
      brand: "#FFFFFF",
      brandBg: "#5A67D8",
      padding: "0px",
      featured: true,
    },
    {
      name: "Framer Motion",
      code: "FM",
      category: "Frontend",
      level: "Advanced",
      proficiency: 88,
      description: "Complex SVG animations & micro-interactions.",
      icon: "framer",
      brand: "#FFFFFF",
      brandBg: "#000000",
      padding: "0px",
      featured: true,
    },
    {
      name: "Node.js",
      code: "JS",
      category: "Backend",
      level: "Advanced",
      proficiency: 90,
      description: "Building scalable server-side logic & RESTful APIs.",
      icon: "node",
      brand: "#000000",
      brandBg: "#339933",
      padding: "0px",
      featured: true,
    },
    {
      name: "React",
      code: "RC",
      category: "Frontend",
      level: "Expert",
      proficiency: 90,
      description: "Modern Hooks, Context API & Component Architecture.",
      icon: "react",
      brand: "#61DAFB",
      brandBg: "#23272F",
      padding: "0px",
    },
    {
      name: "MongoDB",
      code: "MG",
      category: "Backend",
      level: "Advanced",
      proficiency: 85,
      description: "NoSQL Schema design & Mongoose optimization.",
      icon: "mongodb",
      brand: "#00ED64",
      brandBg: "#00684A",
      padding: "0px",
    },
    {
      name: "LiveKit",
      code: "LK",
      category: "Backend",
      level: "Intermediate",
      proficiency: 70,
      description: "Real-time communication & WebRTC infrastructure.",
      icon: "livekit",
      brand: "#1F85FF",
      brandBg: "#000000",
      padding: "0px",
    },
    {
      name: "Linux",
      code: "LN",
      category: "DevOps",
      level: "Advanced",
      proficiency: 85,
      description: "Power user in Bash scripting & system management.",
      icon: "linux",
      brand: "#000000",
      brandBg: "#FFFFFF",
      padding: "0px",
    },
    {
      name: "Git & GitHub",
      code: "GH",
      category: "DevOps",
      level: "Expert",
      proficiency: 90,
      description: "Advanced branching strategies & CI/CD workflows.",
      icon: "github",
      brand: "#FFFFFF",
      brandBg: "#181717",
      padding: "0px",
    },
    {
      name: "PHP",
      code: "PHP",
      category: "Backend",
      level: "Advanced",
      proficiency: 88,
      description: "Serverless-first PHP 8 with hardened stateless runtime patterns.",
      icon: "php",
      brand: "#777BB4",
      brandBg: "#ffffff",
      padding: "0px",
      featured: true,
    },
    {
      name: "Laravel",
      code: "LR",
      category: "Backend",
      level: "Advanced",
      proficiency: 90,
      description: "Laravel 12 — Eloquent, Blade, auth & Form Requests on Lambda.",
      icon: "laravel",
      brand: "#FF2D20",
      brandBg: "#ffffff",
      padding: "0px",
      featured: true,
    },
    {
      name: "MySQL",
      code: "MY",
      category: "Backend",
      level: "Advanced",
      proficiency: 86,
      description: "Managed cloud MySQL — durable sessions, cache & queues.",
      icon: "mysql",
      brand: "#FFFFFF",
      brandBg: "#4479A1",
      padding: "0px",
      featured: true,
    },
    {
      name: "Blade",
      code: "BL",
      category: "Frontend",
      level: "Advanced",
      proficiency: 84,
      description: "Laravel templating — layouts, components & slot-driven views.",
      icon: "blade",
      brand: "#FFFFFF",
      brandBg: "#FF2D20",
      padding: "2px",
      featured: true,
    },
    {
      name: "Eloquent",
      code: "EQ",
      category: "Backend",
      level: "Advanced",
      proficiency: 85,
      description: "Model-bound CRUD, scopes, casting & validated mass assignment.",
      icon: "eloquent",
      brand: "#FFFFFF",
      brandBg: "#6366F1",
      padding: "2px",
      featured: true,
    },
  ] as Skill[],
  systems: [
    {
      id: "frontend",
      label: "Frontend Architecture",
      description:
        "Component-driven design system with Motion-driven micro-interactions and Tailwind CSS 4 token layers.",
      tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      status: "Live",
      progress: 95,
      icon: "stack",
    },
    {
      id: "backend",
      label: "Backend Systems",
      description:
        "RESTful API architecture with Node.js, MongoDB schema design, and real-time WebRTC infrastructure.",
      tech: ["Node.js", "MongoDB", "LiveKit", "WebRTC"],
      status: "Building",
      progress: 65,
      icon: "flow",
    },
    {
      id: "devops",
      label: "DevOps & Infrastructure",
      description:
        "Containerized deployments, CI/CD pipelines, and Linux-based server orchestration.",
      tech: ["Docker", "Linux", "Nginx", "GitHub Actions"],
      status: "Optimizing",
      progress: 50,
      icon: "pipeline",
    },
    {
      id: "realtime",
      label: "Real-Time Systems",
      description:
        "Low-latency communication layer powering live events, presence, and data synchronization.",
      tech: ["LiveKit", "WebRTC", "WebSockets"],
      status: "Designing",
      progress: 30,
      icon: "nodes",
    },
  ] as System[],
  services: [
    {
      id: "architecture",
      code: "// ARCHITECTURE",
      title: "Architecture & System Design",
      description:
        "End-to-end architecture that starts with data contracts and ends with a deployment path. I design typed boundaries, service topology, and production readiness before a single UI pixel ships.",
      stack: ["Next.js / Node.js", "PostgreSQL / Prisma", "Docker · CI/CD Pipelines", "Contracts & System Diagrams"],
    },
    {
      id: "build",
      code: "// FULL-STACK BUILD",
      title: "Full-Stack Product Builds",
      description:
        "From greenfield to ship, I own the full vertical slice — schema, API, interface, and deployment. The result is a coherent system, not a stack of loosely coupled features.",
      stack: ["Next.js · TypeScript", "Tailwind CSS · Motion", "Node.js · WebSockets", "Vercel · Managed Hosting"],
    },
    {
      id: "audit",
      code: "// PERFORMANCE AUDIT",
      title: "Performance & Reliability Audit",
      description:
        "A forensic pass over latency, bundle weight, and failure modes with a prioritized remediation plan. I measure first, then surgically optimize what moves the metric.",
      stack: ["Bundle / Runtime Profiling", "Query & Index Review", "WebVitals Benchmarks", "Load & Failure Testing"],
    },
  ] as Service[],
  projects: [
    {
      slug: "dark-hub",
      title: "Dark Hub",
      status: "The Vision",
      description:
        "Architecting a high-end digital agency focused on premium software solutions and elite branding.",
      tags: ["Product Strategy", "Full-Stack Architecture", "Next.js"],
      size: "large",
      image: "/assets/Projects/Darkhub.png",
      datePublished: "2026-01-15",
      overview:
        "The flagship vision of Dark Hub — a premium digital product studio engineering software and brand experiences for teams that refuse to look generic.",
      problem:
        "The market is flooded with template-level agency work. Premium clients deserve engineering depth and brand discipline from the first revision, not after the third.",
      architecture: {
        summary:
          "A modular full-stack foundation where product strategy, engineering, and branding live in a single pipeline — built to ship agency-grade work consistently.",
        stack: ["Next.js", "TypeScript", "Node.js", "Tailwind CSS", "Vercel"],
      },
      challenges: [
        "Brand consistency across every deliverable",
        "Scaling from solo work to a studio workflow",
        "Keeping quality high while velocity stays fast",
      ],
      metrics: [
        { value: "3", label: "Core disciplines — Strategy, Engineering, Brand" },
        { value: "0", label: "Templates or boilerplate shortcuts" },
        { value: "1", label: "Unified pipeline, from idea to ship" },
      ],
    },
    {
      slug: "first-onw-hr",
      title: "First Onw HR",
      status: "Production",
      description:
        "Modern full-stack employee management platform — Laravel 12, PHP 8, MySQL, Blade & Eloquent, re-engineered stateless-first for Vercel serverless PHP on AWS Lambda.",
      tags: ["Laravel 12", "PHP", "MySQL", "Blade", "Eloquent"],
      size: "medium",
      datePublished: "2026-09-14",
      url: {
        caseStudy: "/case-studies/first-onw-hr",
      },
      overview:
        "First Onw HR is a complete, authenticated employee management platform: registration, login, email verification, password reset, profile management, and a paginated employee directory with full CRUD flows. Build on a modern Laravel 12 + MySQL full-stack, then re-engineered stateless-first so it runs flawlessly on Vercel's serverless PHP runtime. The engineering thesis is not the CRUD — it is the deployment substrate. Every framework default that assumed a persistent filesystem was deliberately re-bound.",
      problem:
        "Laravel expects a persistent, writable filesystem — storage/ for compiled views, sessions, cache and logs; bootstrap/cache for configuration; and a long-lived web server process to boot the framework. A stateless function runtime provides none of these: the filesystem is read-only after deploy, /tmp is ephemeral and instance-local, and every invocation may boot cold.",
      architecture: {
        summary:
          "A bespoke api/index.php front controller pre-declares the storage override, idempotently materializes the writable tree under /tmp, then rebinds storage via Application::useStoragePath() before Laravel boots. All state moves out of the filesystem: SESSION_DRIVER, CACHE_STORE and QUEUE_CONNECTION run on the shared Aiven MySQL instance, converting stateless functions into a stateful application. Blade views and Eloquent models stay idiomatic Laravel while the hybrid Vercel build graph (framework: null) keeps the PHP lambda and the CDN-served static edge on one domain.",
        stack: ["Laravel 12", "PHP 8", "MySQL", "Blade", "Eloquent", "Vercel PHP", "Pest", "Vite"],
      },
      challenges: [
        "Read-only filesystem after deploy — Laravel's first eager-loaded compiled view threw file_put_contents errors until the storage path was re-bound to /tmp",
        "Ephemeral /tmp breaks sessions — file-backed sessions silently 'forget' users, so all state moved to database drivers",
        "Cold-start latency — dev-only providers suppressed via dont-discover, optimized autoloader, and committed Vite assets served from the edge",
        "TLS terminated at the CDN — URL::forceScheme('https') in production to avoid mixed-content and broken redirects",
      ],
      metrics: [
        { value: "25", label: "Records per page — simplePaginate(25)" },
        { value: "4", label: "Employee CRUD ops over 6 fields" },
        { value: "5", label: "Feature tests on the full lifecycle + auth guards" },
        { value: "17", label: "Commits incl. an explicit serverless-hardening phase" },
      ],
    },
    {
      slug: "red-connect",
      title: "Red Connect",
      status: "Technical MVP",
      description:
        "Low-latency video conferencing platform utilizing WebRTC for seamless real-time collaboration.",
      tags: ["WebRTC", "Socket.io", "Real-time"],
      size: "medium",
      datePublished: "2026-03-01",
      overview:
        "Red Connect is a real-time collaboration platform engineered for low-latency video, with a pragmatic upgrade path from peer-to-peer rooms to SFU-backed scale.",
      problem:
        "Existing video tools degrade on constrained networks. Teams need sub-second join times and stable media on connections that are anything but stable.",
      architecture: {
        summary:
          "A WebRTC media plane with a LiveKit-backed SFU for scalable multi-party rooms, orchestrated over Socket.io signaling.",
        stack: ["WebRTC", "LiveKit", "Socket.io", "Node.js"],
      },
      challenges: [
        "Low-latency delivery on constrained networks",
        "NAT traversal and firewall punching",
        "Scaling rooms beyond peer-to-peer limits",
      ],
      metrics: [
        { value: "< 200ms", label: "Target real-time latency" },
        { value: "sub-second", label: "Room join time" },
        { value: "P2P", label: "Direct peer-to-peer media path" },
      ],
    },
  ] as Project[],
} as const;
