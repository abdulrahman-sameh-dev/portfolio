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
