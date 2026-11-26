import type { Metadata } from "next";
import LabView from "@/components/LabView";
import { siteConfig } from "@/lib/site";

const description =
  "Ongoing research, product ideas, and unfinished experiments from Abdulrahman Sameh — an honest look at work before it becomes a shipped product.";

export const metadata: Metadata = {
  title: "The Lab",
  description,
  alternates: { canonical: "/lab" },
  openGraph: {
    title: `The Lab | ${siteConfig.name}`,
    description,
    url: `${siteConfig.siteUrl}/lab`,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: `The Lab | ${siteConfig.name}`,
    description,
  },
};

export default function LabPage() {
  return <LabView />;
}
