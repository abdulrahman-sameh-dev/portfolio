"use client";
import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";
import { XIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-animated";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";

const MotionLink = motion.create(Link);

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleContactClick: (e: any) => void;
}

export const NavMenu = ({ isOpen, onClose, handleContactClick }: NavMenuProps) => {
  
  // نفس الـ Variants اللي إنت معرفها بالظبط
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "circOut",
        staggerChildren: 0.1,
        when: "beforeChildren",
      },
    },
    exit: {
      opacity: 0,
      transition: { duration: 0.3, ease: "circIn" },
    },
  };

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" },
    },
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={menuVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 max-sm:overflow-y-auto z-110 bg-black p-6 md:p-12 flex flex-col overflow-hidden"
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-8 md:mb-12">
            <span className="text-sm font-mono text-zinc-400/80 uppercase tracking-[0.3em]">
              Navigation System
            </span>

            <Button
              variant="outline"
              onClick={onClose}
              className="rounded-full w-12 h-12 border-zinc-800 hover:bg-zinc-900 hover:text-white cursor-pointer transition-transform active:scale-90"
            >
              <XIcon size={40} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 grow items-center">
            {/* Links */}
            <div className="flex flex-col gap-2 md:gap-4">
              {["Home", "About", "Projects", "Get in touch"].map((item) => (
                <motion.div key={item} variants={itemVariants}>
                  <MotionLink
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Get in touch"
                        ? "/#contact"
                        : `/${item.toLowerCase()}`
                    }
                    onClick={(e) => {
                      if (item === "Get in touch") {
                        handleContactClick(e);
                      } else {
                        onClose();
                      }
                    }}
                    className="text-5xl md:text-8xl font-bold text-zinc-400 lg:text-zinc-600 hover:text-white transition-all tracking-tighter inline-block"
                    whileHover={{ x: 25, transition: { duration: 0.3 } }}
                  >
                    {item}
                    <span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">
                      .
                    </span>
                  </MotionLink>
                </motion.div>
              ))}
            </div>

            {/* Right Panel */}
            <motion.div
              variants={itemVariants}
              className="flex flex-col space-y-10 lg:pl-16 lg:border-l border-zinc-900"
            >
              {/* Social */}
              <div className="space-y-4">
                <h4 className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                  Connect
                </h4>
                <div className="flex gap-8">
                  <Link href="https://github.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors hover:-translate-y-1 duration-300">
                    <GithubIcon size={24} />
                  </Link>
                  <Link href="https://linkedin.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors hover:-translate-y-1 duration-300">
                    <LinkedinIcon size={24} />
                  </Link>
                  <Link href="https://x.com" target="_blank" className="text-zinc-400 hover:text-white transition-colors hover:-translate-y-1 duration-300">
                    <TwitterIcon size={24} />
                  </Link>
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h4 className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                  HQ Location
                </h4>
                <div className="flex items-center gap-3 text-zinc-200 text-lg font-medium">
                  <Globe size={20} className="text-indigo-500 animate-pulse" />
                  <span>Cairo, Egypt — GMT+2</span>
                </div>
              </div>

              {/* Project Card */}
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md space-y-4 max-w-sm shadow-2xl">
                <div className="flex justify-between items-start">
                  <p className="text-zinc-500 text-xs font-mono">
                    Current Focus
                  </p>
                  <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
                    65%
                  </span>
                </div>

                <p className="text-white font-bold text-lg tracking-tight">
                  Portfolite Platform Architecture
                </p>

                <div className="w-full h-1 bg-zinc-800 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full bg-indigo-500"
                    initial={{ width: 0 }}
                    animate={{ width: "65%" }}
                    transition={{ duration: 1.5, delay: 0.8 }}
                  />
                </div>
              </div>
            </motion.div>
          </div>

          {/* Footer */}
          <div className="mt-auto pt-8 border-t border-zinc-900 flex flex-col md:flex-row justify-between items-center gap-4">
            <span className="text-muted-foreground text-[10px] font-mono uppercase tracking-[0.3em]">
              © 2026 Abdulrahman Sameh / Systems Architect
            </span>

            <div className="flex gap-4">
              <span className="text-foreground text-[10px] font-mono uppercase tracking-[0.3em]">
                V1.0.4-Stable
              </span>
              <span className="text-indigo-700 text-[10px] font-mono uppercase tracking-[0.3em]">
                Next.js 14
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};