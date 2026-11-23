"use client";

import dynamic from "next/dynamic";
import { FeaturedProjects } from "@/components/FeaturedProjects";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Footer from "@/components/Footer";

const sectionFallback = (minHeight: string) =>
  function LoadingSection() {
    return <div aria-hidden="true" className={`w-full ${minHeight}`} />;
  };

const GitActivity = dynamic(
  () => import("@/components/GitActivity").then((mod) => mod.GitActivity),
  { ssr: false, loading: sectionFallback("min-h-[420px]") }
);

const StackGrid = dynamic(() => import("@/components/StackGrid"), {
  ssr: false,
  loading: sectionFallback("min-h-[520px]"),
});

const Certifications = dynamic(() => import("@/components/Certifications"), {
  ssr: false,
  loading: sectionFallback("min-h-[640px]"),
});

const ContactForm = dynamic(() => import("@/components/ContactForm"), {
  ssr: false,
  loading: function ContactFallback() {
    return (
      <section
        id="contact"
        aria-hidden="true"
        className="min-h-[85vh] scroll-mt-24"
      />
    );
  },
});

const Page = () => {
  return (
    <section>
      <Hero />
      <FeaturedProjects />
      <GitActivity />
      <Services />
      <StackGrid />
      <Certifications />
      <ContactForm />
      <Footer />
    </section>
  );
};

export default Page;
