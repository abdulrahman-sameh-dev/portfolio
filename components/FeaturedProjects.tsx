import { motion } from "motion/react";
import ProjectCard from "@/components/ProjectCard";
import { Button } from "./ui/button";
import Link from "next/link";
import { siteConfig } from "@/lib/site";

export const FeaturedProjects = () => {
  const projects = siteConfig.projects;

  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 1 } }}
        viewport={{ once: true }}
        className="mb-16"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Featured Systems.
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl">
          A selection of scalable architectures and digital products engineered
          with precision.
        </p>
      </motion.div>

      <div className="relative grid grid-cols-1 md:grid-cols-12 gap-6 auto-rows-[350px] max-sm:auto-rows-auto max-sm:gap-4">
        <div className="absolute inset-0 bg-linear-to-t from-[#050505] via-[#050505]/80 to-transparent rounded-b-2xl pointer-events-none" />

        {/* Dark Hub - المربع الكبير */}
        <div className="md:col-span-8 md:row-span-2">
          <ProjectCard project={projects[0]} />
        </div>

        {/* Portfolite SaaS - مربع طولي أو جانبي */}
        <div className="md:col-span-4 md:row-span-2">
          <ProjectCard project={projects[1]} />
        </div>

        {/* Red Connect - مربع عريض تحت */}
        <div className="md:col-span-12 md:row-span-1">
          <ProjectCard project={projects[2]} />
        </div>
      </div>
      <Button
        asChild // دي أهم كلمة هنا
        variant="outline"
        size={"lg"}
        className="mt-8 border-zinc-800 hover:bg-zinc-900"
      >
        <Link href="/projects">View All Projects</Link>
      </Button>
    </section>
  );
};
