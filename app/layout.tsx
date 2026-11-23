import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import NavigationWrapper from "@/components/NavigationWrapper";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import CustomCursor from "@/components/ui/CustomCursor";
import TransitionLayout from "@/components/TransitionLayout";
import CommandPalette from "@/components/CommandPalette";
import MotionProvider from "@/components/MotionProvider";
import { siteConfig } from "@/lib/site";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.siteUrl),
  title: {
    default: `${siteConfig.name} — ${siteConfig.role}`,
    template: `%s | ${siteConfig.name}`,
  },
  verification: {
    google: "OZK-VlhBTdy11FQf4a0uuq-rjERT39lDsJ1ag_0up0o",
  },
  description:
    "Official portfolio of Abdulrahman Sameh, a product-minded software developer with a full-stack foundation. Selected projects, case studies, and ongoing explorations.",
  keywords: [
    "Abdulrahman Sameh",
    "Product-minded Developer",
    "Full-Stack Developer",
    "Full Stack Developer Egypt",
    "Next.js Developer",
    "TypeScript",
    "Laravel Developer",
    "Laravel 12",
    "PHP Developer",
    "PostgreSQL",
    "MySQL",
    "Software Development",
    "Project Planning",
    "The Lab",
    "Zitsy Store",
    "Clip Tool",
    "First Onw HR",
  ],
  authors: [{ name: siteConfig.name }],
  creator: siteConfig.name,
  publisher: siteConfig.name,
  category: "Technology",
  alternates: {
    canonical: siteConfig.siteUrl,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description: siteConfig.intro,
    type: "website",
    locale: "en_US",
    siteName: siteConfig.name,
    images: [
      {
        url: "/assets/MetaDeta.png",
        width: 1200,
        height: 630,
        alt: `${siteConfig.name} — ${siteConfig.role}`,
      },
    ],
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: `${siteConfig.name} — ${siteConfig.role}`,
    description:
      "Selected projects, case studies, and ongoing explorations from a product-minded software developer with a full-stack foundation.",
    site: "@darkhub_dev",
    creator: "@darkhub_dev",
    images: ["/assets/MetaDeta.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className="dark dark:bg-[#050505]" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased min-h-screen bg-[#050505] text-white flex flex-col`}
      >
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-150 focus:px-4 focus:py-2 focus:rounded-xl focus:bg-zinc-900 focus:border focus:border-indigo-500/50 focus:text-white focus:text-sm font-mono"
        >
          Skip to content
        </a>
        <MotionProvider>
        <CustomCursor />
        <NavigationWrapper />
        <CommandPalette />
        <main id="main" className="relative grow container mx-auto px-4 pt-20">
          <TransitionLayout>{children}</TransitionLayout>
        </main>
        <Analytics />
        <Toaster />
        </MotionProvider>
      </body>
    </html>
  );
}
