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
  level: "Advanced" | "Intermediate" | "Basic";
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

export type LabStatus =
  | "Exploring"
  | "Researching"
  | "Planning"
  | "In Progress"
  | "Under Review"
  | "On Hold";

export type LabLink = {
  label: string;
  href: string;
  external?: boolean;
};

export type LabItem = {
  slug: string;
  title: string;
  type: string;
  status: LabStatus;
  description: string;
  details: string[];
  notes: string[];
  technologies: string[];
  links?: LabLink[];
  image?: string;
  datePublished: string;
};

export const siteConfig = {
  name: "Abdulrahman Sameh",
  role: "Product-minded Software Developer",
  headline: "Building useful digital products with a full-stack foundation.",
  intro:
    "I'm Abdulrahman Sameh, a product-minded software developer with a full-stack background. I care about understanding the problem, planning the solution, and building systems that serve real needs.",
  email: "abdulrahman.sameh.giza.eg@gmail.com",
  siteUrl: "https://abdulrahman-sameh-dev.vercel.app",
  resumeUrl: "/resume",
  availability: {
    label: "Available for Full-time & Contract Roles",
    status: "open",
  },
  currentFocus: [
    "Improving full-stack development skills",
    "Building and shipping real projects",
    "Understanding product development",
    "Practicing project planning and management",
    "Exploring business ideas through The Lab",
  ],
  learning: [
    "Digital Egypt Pioneers Initiative (DEPI)",
    "Google Project Management learning track",
    "Entrepreneurship learning",
    "English learning",
    "Intensive PHP & Laravel training — YAT Learning Solutions",
  ],
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
      level: "Advanced",
      description: "App Router, Server Actions, and production-oriented rendering choices.",
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
      level: "Advanced",
      description: "Type-safe development with clear interfaces and practical generics.",
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
      level: "Advanced",
      description: "Utility-first CSS with a consistent token-based workflow.",
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
      level: "Intermediate",
      description: "Relational schema design and query tuning for real applications.",
      icon: "postgres",
      brand: "#FFFFFF",
      brandBg: "#336791",
      padding: "0px",
    },
    {
      name: "Docker",
      code: "DK",
      category: "DevOps",
      level: "Basic",
      description: "Containerizing apps for repeatable local and deployment workflows.",
      icon: "docker",
      brand: "#FFFFFF",
      brandBg: "#2496ED",
      padding: "0px",
    },
    {
      name: "Prisma",
      code: "PR",
      category: "Backend",
      level: "Intermediate",
      description: "Type-safe ORM modeling, migrations, and data access.",
      icon: "prisma",
      brand: "#FFFFFF",
      brandBg: "#5A67D8",
      padding: "0px",
    },
    {
      name: "Framer Motion",
      code: "FM",
      category: "Frontend",
      level: "Intermediate",
      description: "Component animation and restrained micro-interactions.",
      icon: "framer",
      brand: "#FFFFFF",
      brandBg: "#000000",
      padding: "0px",
    },
    {
      name: "Node.js",
      code: "JS",
      category: "Backend",
      level: "Advanced",
      description: "Building server-side logic and REST APIs.",
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
      level: "Advanced",
      description: "Hooks, component composition, and maintainable UI state.",
      icon: "react",
      brand: "#61DAFB",
      brandBg: "#23272F",
      padding: "0px",
      featured: true,
    },
    {
      name: "MongoDB",
      code: "MG",
      category: "Backend",
      level: "Intermediate",
      description: "Document schema design with Mongoose data access.",
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
      description: "Real-time communication and WebRTC experiments.",
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
      description: "Bash scripting and day-to-day system administration.",
      icon: "linux",
      brand: "#000000",
      brandBg: "#FFFFFF",
      padding: "0px",
    },
    {
      name: "Git & GitHub",
      code: "GH",
      category: "DevOps",
      level: "Advanced",
      description: "Branching, code review, and CI/CD workflows.",
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
      description: "PHP 8 with practical serverless deployment patterns.",
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
      description: "Laravel 12 — Eloquent, Blade, auth, and Form Requests.",
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
      level: "Intermediate",
      description: "Managed MySQL — durable sessions, cache, and queues.",
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
      level: "Intermediate",
      description: "Laravel templating — layouts, components, and slot-driven views.",
      icon: "blade",
      brand: "#FFFFFF",
      brandBg: "#FF2D20",
      padding: "2px",
    },
    {
      name: "Eloquent",
      code: "EQ",
      category: "Backend",
      level: "Intermediate",
      description: "Model-bound CRUD, scopes, casting, and validated assignment.",
      icon: "eloquent",
      brand: "#FFFFFF",
      brandBg: "#6366F1",
      padding: "2px",
    },
  ] as Skill[],
  systems: [
    {
      id: "frontend",
      label: "Frontend Practice",
      description:
        "Component-driven interfaces with clear states, restrained motion, and consistent styling tokens.",
      tech: ["Next.js", "React", "Tailwind CSS", "TypeScript"],
      status: "In practice",
      progress: 0,
      icon: "stack",
    },
    {
      id: "backend",
      label: "Backend Practice",
      description:
        "REST APIs, relational and document data modeling, and stateful workflows built on serverless infrastructure.",
      tech: ["Node.js", "PostgreSQL", "MongoDB", "Laravel"],
      status: "In practice",
      progress: 0,
      icon: "flow",
    },
    {
      id: "devops",
      label: "Deployment Practice",
      description:
        "Linux-based environments, Git workflows, container experiments, and deployment paths for small applications.",
      tech: ["Linux", "Git", "Docker", "GitHub Actions"],
      status: "Learning",
      progress: 0,
      icon: "pipeline",
    },
    {
      id: "realtime",
      label: "Real-Time Exploration",
      description:
        "Experiments with WebRTC, signaling, and presence patterns for collaborative interfaces.",
      tech: ["LiveKit", "WebRTC", "WebSockets"],
      status: "Exploring",
      progress: 0,
      icon: "nodes",
    },
  ] as System[],
  services: [
    {
      id: "build",
      code: "// FULL-STACK BUILD",
      title: "Full-Stack Web Development",
      description:
        "I build and maintain web applications from the interface through the API and database. The goal is a coherent product that is straightforward to run, understand, and extend.",
      stack: ["Next.js · React · TypeScript", "Node.js · PHP · Laravel", "PostgreSQL · MySQL · Prisma", "Vercel · Docker"],
    },
    {
      id: "planning",
      code: "// PRODUCT PLANNING",
      title: "Product Planning & Execution",
      description:
        "Before writing code, I help clarify the problem, define scope, and split the work into milestones. This keeps the build focused on real needs and makes progress easy to review.",
      stack: ["Problem framing", "Scope & milestones", "Technical planning", "Clear documentation"],
    },
    {
      id: "improve",
      code: "// PRACTICAL IMPROVEMENT",
      title: "Practical Improvement & Reliability",
      description:
        "I review an existing application for usability, performance, and deployment issues, then fix the highest-impact problems with a prioritized, measurable approach.",
      stack: ["Runtime & bundle review", "Query and index checks", "Deployment hardening", "Focused remediation"],
    },
  ] as Service[],
  projects: [
    {
      slug: "zitsy-store",
      title: "Zitsy Store",
      status: "Live",
      description:
        "A focused print-on-demand storefront: synced catalogue, checkout, fulfillment, and a private order dashboard.",
      tags: ["Next.js", "Printify", "PayPal", "PostgreSQL"],
      size: "large",
      datePublished: "2026-11-23",
      url: {
        liveDemo: "https://zitsy.darkhub.dev/",
        github: "https://github.com/abdulrahman-sameh-dev/zitsy",
      },
      overview:
        "Zitsy Store is an implemented print-on-demand e-commerce app. It keeps catalogue and pricing aligned with Printify, takes payment through PayPal, creates Printify fulfillment orders, sends transactional email with Resend, and records authoritative order state in PostgreSQL. A private analytics dashboard is available through an environment-configured admin path.",
      problem:
        "A print-on-demand store needs several systems to agree: product data, checkout, payment confirmation, fulfillment, customer email, and internal visibility. The project focuses on keeping those boundaries explicit instead of relying on fragile manual steps.",
      architecture: {
        summary:
          "A single Next.js application coordinates Printify catalogue sync, PayPal checkout, Printify fulfillment, Resend email, and PostgreSQL order state. Webhooks are reconciled into a WebhookEvent ledger so retries and out-of-order delivery do not corrupt the order record.",
        stack: ["Next.js", "TypeScript", "PostgreSQL", "Prisma", "Printify", "PayPal", "Resend"],
      },
      challenges: [
        "Keeping Printify catalogue data aligned with the storefront",
        "Reconciling webhooks into authoritative PostgreSQL order state",
        "Sending reliable transactional email without leaking provider details",
        "Keeping the private analytics dashboard behind an environment-configured path",
      ],
      metrics: [
        { value: "Printify", label: "Catalogue sync and fulfillment provider" },
        { value: "PayPal", label: "Checkout and payment confirmation" },
        { value: "Resend", label: "Transactional customer email" },
      ],
    },
    {
      slug: "clipping-tool",
      title: "Clip Tool",
      status: "Local-first",
      description:
        "A local-first workstation that turns source video into reviewable, source-preserving clips.",
      tags: ["Python", "FastAPI", "ffmpeg", "SQLite"],
      size: "large",
      datePublished: "2026-11-23",
      url: {
        github: "https://github.com/abdulrahman-sameh-dev/clipping-app",
      },
      overview:
        "Clip Tool is a personal clipping studio designed around one operator and one machine. A FastAPI backend and CLI coordinate ffmpeg-based video prep, SQLite state, transcription and highlight discovery, and a packaged browser UI served from /ui/. It produces short clips without replacing the original source, with optional Arabic or English burned-in captions, restrained effects, editing metadata, publishing status, and trash/recovery.",
      problem:
        "Clip creation is often a messy loop of manual cuts, temporary files, and lost context. This project keeps every decision local: source media stays intact, metadata stays with the clip, and the operator can review, revise, and publish deliberately.",
      architecture: {
        summary:
          "A local FastAPI service and CLI drive ffmpeg media work, persist clip and editing metadata in SQLite, and expose a packaged vanilla browser UI at /ui/. Transcription and highlight discovery come from a free-tier AI provider; there is no hosted control plane, shared database, external queue, provider proxy, or paid fallback.",
        stack: ["Python", "FastAPI", "SQLite", "ffmpeg", "Vanilla JS", "Browser UI"],
      },
      challenges: [
        "Rendering source-preserving clips without destructively editing media",
        "Keeping transcription and highlight discovery within a free-tier provider",
        "Tracking editing metadata, publishing status, and trash/recovery locally",
        "Packaging a usable browser workflow with no hosted infrastructure",
      ],
      metrics: [
        { value: "Local", label: "One operator, one machine" },
        { value: "ffmpeg", label: "Video preparation and clip rendering" },
        { value: "SQLite", label: "Local project and editing state" },
      ],
    },
    {
      slug: "first-onw-hr",
      title: "First Onw HR",
      status: "Production",
      description:
        "An authenticated employee management platform re-engineered for a stateless serverless PHP deployment.",
      tags: ["Laravel 12", "PHP", "MySQL", "Blade", "Eloquent"],
      size: "medium",
      datePublished: "2026-09-14",
      url: {
        caseStudy: "/case-studies/first-onw-hr",
      },
      overview:
        "First Onw HR is an authenticated employee management platform with registration, login, email verification, password reset, profile management, and a paginated employee directory with full CRUD flows. It was built as a conventional Laravel 12 application, then re-engineered so it can run on Vercel's stateless serverless PHP runtime.",
      problem:
        "Laravel expects a persistent, writable filesystem and a long-lived web server process. A stateless function runtime provides neither: the filesystem is read-only after deploy, /tmp is ephemeral and instance-local, and every invocation may boot cold.",
      architecture: {
        summary:
          "A bespoke front controller rebinds storage before Laravel boots, materializes a writable tree under /tmp, and keeps sessions, cache, and queue state in the shared MySQL instance. Blade views and Eloquent models remain idiomatic while the hybrid Vercel build graph keeps the PHP function and CDN-served static edge on one domain.",
        stack: ["Laravel 12", "PHP 8", "MySQL", "Blade", "Eloquent", "Vercel PHP", "Pest"],
      },
      challenges: [
        "Rebinding Laravel storage before compiled views touch the read-only filesystem",
        "Moving sessions, cache, and queue state out of ephemeral /tmp",
        "Reducing cold-start cost through provider control and committed assets",
        "Forcing HTTPS at the application layer behind the CDN",
      ],
      metrics: [
        { value: "4", label: "Employee CRUD operations" },
        { value: "5", label: "Feature tests covering lifecycle and auth guards" },
        { value: "25", label: "Records per page with simple pagination" },
      ],
    },
  ] as Project[],
  lab: [
    {
      slug: "dark-hub-dev",
      title: "Dark Hub.dev",
      type: "Product + Engineering Exploration",
      status: "In Progress",
      description:
        "An ongoing exploration of a focused workflow for product thinking, engineering, and brand work.",
      details: [
        "Dark Hub.dev is a space for experiments around planning, building, and presenting digital work with more care than a template-driven workflow.",
        "It is not a public product or agency claim. There is no live release, no client work, and no finished service to evaluate.",
      ],
      notes: [
        "Exploring how product decisions and engineering decisions can live in one place",
        "Testing structures for clearer scope, milestones, and handoff",
        "Not public yet",
      ],
      technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Vercel"],
      image: "/assets/Projects/Darkhub.png",
      datePublished: "2026-01-15",
    },
    {
      slug: "zitsy-local-brand",
      title: "Zitsy Local Brand Exploration",
      type: "Business Idea Exploration",
      status: "Exploring",
      description:
        "A separate concept for a locally rooted brand direction, kept deliberately distinct from the implemented Zitsy Store.",
      details: [
        "This is a business and product idea at the exploration stage: research questions, positioning hypotheses, and possible directions.",
        "It has no repository, live store, supplier agreements, partnerships, market validation, revenue, customers, or launch date.",
      ],
      notes: [
        "Researching local customer needs and brand positioning",
        "Separate from the Printify-connected Zitsy Store project",
        "No public links yet",
      ],
      technologies: ["Market research", "Positioning", "Product planning"],
      datePublished: "2026-11-23",
    },
  ] as LabItem[],
} as const;
