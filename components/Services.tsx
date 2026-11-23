"use client";
import { motion, type Variants } from "motion/react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { siteConfig } from "@/lib/site";
import {
  REQUEST_PROTOCOL_EVENT,
  serviceProtocolToContact,
  type RequestProtocolDetail,
} from "@/lib/contact";

const gridVariants: Variants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.1 } },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 20 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.5, ease: "easeOut" },
  },
};

const requestProtocol = (
  e: React.MouseEvent<HTMLAnchorElement>,
  serviceId: string
) => {
  e.preventDefault();
  const protocol = serviceProtocolToContact[serviceId];
  if (!protocol) return;

  const reduceMotion = window.matchMedia(
    "(prefers-reduced-motion: reduce)"
  ).matches;
  document
    .getElementById("contact")
    ?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "start" });

  const detail: RequestProtocolDetail = {
    service: serviceId,
    ...protocol,
  };
  window.dispatchEvent(
    new CustomEvent<RequestProtocolDetail>(REQUEST_PROTOCOL_EVENT, {
      detail,
    })
  );

  if (window.history.replaceState) {
    window.history.replaceState(null, "", `/#contact?service=${serviceId}`);
  }
};

export const Services = () => {
  return (
    <section className="py-24 px-6 w-full max-w-7xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0, transition: { duration: 0.8 } }}
        viewport={{ once: true }}
        className="mb-12"
      >
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Engagement Protocols.
        </h2>
        <p className="text-zinc-400 text-lg max-w-2xl">
          Three defined ways to put a system in motion — each scoped,
          contract-driven, and shipped with the same precision.
        </p>
      </motion.div>

      <motion.div
        variants={gridVariants}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 md:grid-cols-3 gap-4"
      >
        {siteConfig.services.map((service) => (
          <motion.div
            key={service.id}
            variants={cardVariants}
            className="group relative flex flex-col p-7 rounded-2xl border border-zinc-800 bg-transparent transition-colors duration-300 hover:border-indigo-500/50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400"
          >
            <span className="font-mono text-[11px] text-indigo-400">
              {service.code}
            </span>

            <h3 className="mt-4 text-lg font-bold text-zinc-100 group-hover:text-white transition-colors tracking-tight">
              {service.title}
            </h3>

            <p className="mt-2 text-sm text-zinc-400 leading-relaxed flex-1">
              {service.description}
            </p>

            <ul className="mt-6 space-y-1.5 border-t border-zinc-800/80 pt-5">
              {service.stack.map((tech) => (
                <li
                  key={tech}
                  className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-wider text-zinc-500 group-hover:text-zinc-400 transition-colors"
                >
                  <span className="text-indigo-500/60">{"▶"}</span>
                  {tech}
                </li>
              ))}
            </ul>

            <Link
              href={`/#contact?service=${service.id}`}
              onClick={(e) => requestProtocol(e, service.id)}
              className="mt-6 inline-flex items-center gap-1.5 font-mono text-xs uppercase tracking-widest text-indigo-400 hover:text-indigo-300 transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded cursor-pointer"
            >
              Request Protocol
              <ArrowRight size={14} className="transition-transform duration-300 group-hover:translate-x-0.5" />
            </Link>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
};

export default Services;