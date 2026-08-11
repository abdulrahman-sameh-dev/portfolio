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

export const siteConfig = {
  name: "Abdulrahman Sameh",
  email: "hello@abdulrahmansameh.dev",
  siteUrl: "https://portfolite-mocha.vercel.app",
  resumeUrl: "/resume.pdf",
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
      padding: "2px",
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
      padding: "4px",
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
      padding: "6px",
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
      padding: "7px",
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
      padding: "5px",
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
      padding: "2px",
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
      padding: "4px",
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
      padding: "7px",
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
      padding: "2px",
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
      slug: "portfolite-platform",
      title: "Portfolite SaaS",
      status: "Beta / In-Concept",
      description:
        "A specialized platform for developers to deploy premium portfolios with zero design effort and custom subdomains.",
      tags: ["Multi-tenancy", "SaaS", "Wildcard Domains", "Next.js"],
      size: "medium",
      datePublished: "2026-02-01",
      overview:
        "Portfolite is a platform for developers who want a premium portfolio without the design grind — isolated workspaces, custom subdomains, and one-command deploys.",
      problem:
        "Developers spend hours handcrafting portfolio design instead of shipping the work that actually gets them hired.",
      architecture: {
        summary:
          "A multi-tenant SaaS where each developer gets an isolated workspace, a custom subdomain, and zero-config deploys on a shared Next.js core.",
        stack: ["Next.js", "Multi-tenancy", "Wildcard Domains", "PostgreSQL"],
      },
      challenges: [
        "Multi-tenant isolation per developer workspace",
        "Wildcard subdomain routing to per-user content",
        "Zero-config deploys so developers stay in flow",
      ],
      metrics: [
        { value: "< 5 min", label: "From signup to live portfolio" },
        { value: "0", label: "Design effort required from the developer" },
        { value: "1-click", label: "Custom subdomain provisioning" },
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
