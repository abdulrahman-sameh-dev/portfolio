import type { Metadata } from "next";
import AboutView from "@/components/AboutView";
import { siteConfig } from "@/lib/site";

const description =
  "Learn about Abdulrahman Sameh, a product-minded software developer focused on understanding problems, planning clearly, and building useful digital products.";

export const metadata: Metadata = {
  title: "Who I Am",
  description,
  alternates: { canonical: "/about" },
  openGraph: {
    title: `Who I Am | ${siteConfig.name}`,
    description,
    url: `${siteConfig.siteUrl}/about`,
    type: "profile",
  },
  twitter: {
    card: "summary_large_image",
    title: `Who I Am | ${siteConfig.name}`,
    description,
  },
};

export default function AboutPage() {
  return <AboutView />;
}
