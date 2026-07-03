import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Script from "next/script";
import NavigationWrapper from "@/components/NavigationWrapper";
import { Analytics } from "@vercel/analytics/next"
import { Toaster } from "@/components/ui/sonner"
import CustomCursor from "@/components/ui/CustomCursor";
import TransitionLayout from "@/components/TransitionLayout";
import CommandPalette from "@/components/CommandPalette";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL('https://portfolite-mocha.vercel.app/'),
  title: {
    default: "Abdulrahman Sameh",
    template: "%s | Abdulrahman Sameh", // عشان لو عملت صفحات تانية زي /projects
  },
  verification: {
    google: "OZK-VlhBTdy11FQf4a0uuq-rjERT39lDsJ1ag_0up0o", // حط الكود اللي بعد كلمة content هنا
  },
  description:
    "Official portfolio of Abdulrahman Sameh. A Professional Full Stack Developer specializing in building scalable web systems and Next.js architecture.",
  keywords: [
    "Abdulrahman Sameh",
    "Abdulrahman Sameh Developer",
    "Full Stack Developer",
    "Abdulrahman",
    "Abdelrahman Sameh",
    "Abdulrahman Sameh dev",
    "Abdulrahman Sameh Frontend",
    "Abdulrahman Sameh Back end",
    "Abdelrahman",
    "Sameh",
    "Next.js",
    "System Design",
    "DevOps",
    "Software Architecture",
    "portfolite",
    "portfolio"
  ],
  authors: [{ name: "Abdulrahman Sameh" }],
  openGraph: {
    title: "Abdulrahman Sameh | Full Stack Developer",
    description:
      "Building Scalable Software Solutions with an Engineering Mindset.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/assets/MetaDeta.png",
        width: 1200,
        height: 630,
        alt: "abdulrahman sameh portfo Preview",
      },
    ],
    url: 'https://portfolite-mocha.vercel.app/',
  },
  twitter: {
    card: "summary_large_image",
    title: "Abdulrahman Sameh",
    description:
      "Full Stack Developer specializing in MERN Stack & System Design",
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
        <CustomCursor />
        <NavigationWrapper />
        <CommandPalette />
        {/* الـ container يكون هنا عشان يتحكم في عرض المحتوى بس */}
        <main className="relative grow container mx-auto px-4 pt-20">
          <TransitionLayout>{children}</TransitionLayout>
        </main>
        {process.env.NODE_ENV === "development" && (
          <Script src="http://localhost:8097" strategy="afterInteractive" />
        )}
        <Analytics /> 
        <Toaster />
      </body>
    </html>
  );
}
