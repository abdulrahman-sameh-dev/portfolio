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
    default: "Abdulrahman Sameh",
    template: "%s | Abdulrahman Sameh", // عشان لو عملت صفحات تانية زي /projects
  },
  verification: {
    google: "OZK-VlhBTdy11FQf4a0uuq-rjERT39lDsJ1ag_0up0o", // حط الكود اللي بعد كلمة content هنا
  },
  description:
    "Official portfolio of Abdulrahman Sameh. A Professional Full Stack Developer specializing in building scalable web systems with Next.js, TypeScript, Laravel 12, PHP, and MySQL.",
  keywords: [
    "Abdulrahman Sameh",
    "Full-Stack Developer",
    "Full Stack Developer Egypt",
    "Next.js Developer",
    "Laravel Developer",
    "Laravel 12",
    "PHP Developer",
    "Software Architecture",
    "System Design",
    "Remote Full-Stack Developer",
    "Egypt Remote Developer",
    "Giza Egypt Developer",
    "TypeScript",
    "Scalable Web Systems",
    "First Onw HR",
  ],
  authors: [{ name: "Abdulrahman Sameh" }],
  creator: "Abdulrahman Sameh",
  publisher: "Abdulrahman Sameh",
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
    title: "Abdulrahman Sameh | Full-Stack Developer & Software Architect",
    description:
      "Full-Stack Developer in Egypt specializing in Next.js, Laravel 12, PHP, MySQL, and scalable software architecture for remote teams.",
    type: "website",
    locale: "en_US",
    siteName: "Abdulrahman Sameh",
    images: [
      {
        url: "/assets/MetaDeta.png",
        width: 1200,
        height: 630,
        alt: "Abdulrahman Sameh — Full-Stack Developer portfolio preview",
      },
    ],
    url: siteConfig.siteUrl,
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Sameh | Full-Stack Developer",
    description:
      "Next.js, Laravel 12, PHP, MySQL & software architecture. Full-stack engineering from Giza, Egypt — working remotely.",
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
      {/* suppressHydrationWarning مهمة جداً هنا عشان الـ dark mode والـ classes */}
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
        {/* الـ container يكون هنا عشان يتحكم في عرض المحتوى بس */}
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
