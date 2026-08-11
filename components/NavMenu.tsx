"use client";
import { motion, AnimatePresence, Variants } from "motion/react";
import Link from "next/link";
import { XIcon, GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-animated";
import { Button } from "./ui/button";
import { Globe } from "lucide-react";
import { siteConfig } from "@/lib/site";
import { useEffect, useRef } from "react";

const MotionLink = motion.create(Link);

interface NavMenuProps {
  isOpen: boolean;
  onClose: () => void;
  handleContactClick: (e: React.MouseEvent) => void;
}

export const NavMenu = ({ isOpen, onClose, handleContactClick }: NavMenuProps) => {
  const menuRef = useRef<HTMLDivElement>(null);
  const lastFocused = useRef<HTMLElement | null>(null);

  // Focus management: remember the trigger, move focus into the menu on open,
  // restore it on close, and keep focus trapped while the menu is open.
  useEffect(() => {
    if (!isOpen) return;

    lastFocused.current = document.activeElement as HTMLElement | null;

    const firstFocusable =
      menuRef.current?.querySelector<HTMLElement>("a, button");
    firstFocusable?.focus();

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
        return;
      }

      if (e.key === "Tab" && menuRef.current) {
        const focusables = Array.from(
          menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled])'
          )
        );
        if (focusables.length === 0) return;

        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        const active = document.activeElement as HTMLElement | null;

        if (e.shiftKey && (active === first || active === menuRef.current)) {
          e.preventDefault();
          last.focus();
        } else if (!e.shiftKey && active === last) {
          e.preventDefault();
          first.focus();
        }
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      lastFocused.current?.focus();
    };
  }, [isOpen, onClose]);
  
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
          ref={menuRef}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
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
              aria-label="Close menu"
              className="rounded-full w-12 h-12 border-zinc-800 hover:bg-zinc-900 hover:text-white cursor-pointer transition-transform active:scale-90"
            >
              <XIcon size={40} />
            </Button>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 grow items-center">
            {/* Links */}
            <div className="flex flex-col gap-2 md:gap-4">
              {["Home", "About", "Projects", "Resume", "Get in touch"].map((item) => (
                <motion.div key={item} variants={itemVariants}>
                  <MotionLink
                    href={
                      item === "Home"
                        ? "/"
                        : item === "Get in touch"
                        ? "/#contact"
                        : item === "Resume"
                        ? siteConfig.resumeUrl
                        : `/${item.toLowerCase()}`
                    }
                    target={item === "Resume" ? "_blank" : undefined}
                    rel={item === "Resume" ? "noopener noreferrer" : undefined}
                    onClick={(e) => {
                      if (item === "Get in touch") {
                        handleContactClick(e);
                      } else {
                        onClose();
                      }
                    }}
                    className="text-5xl md:text-8xl font-bold text-zinc-400 lg:text-zinc-500 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:underline decoration-indigo-400 underline-offset-8 transition-all tracking-tighter inline-block"
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
                <h4 className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                  Connect
                </h4>
                <div className="flex gap-8">
                  {[
                    { name: "GitHub", href: siteConfig.socials.github, Icon: GithubIcon },
                    { name: "LinkedIn", href: siteConfig.socials.linkedin, Icon: LinkedinIcon },
                    { name: "X (Twitter)", href: siteConfig.socials.x, Icon: TwitterIcon },
                  ].map(({ name, href, Icon }) => (
                    <Link
                      key={name}
                      href={href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="text-zinc-400 hover:text-white focus-visible:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-400 rounded-lg transition-colors hover:-translate-y-1 duration-300"
                    >
                      <Icon size={24} />
                    </Link>
                  ))}
                </div>
              </div>

              {/* Location */}
              <div className="space-y-4">
                <h4 className="text-zinc-400 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">
                  HQ Location
                </h4>
                <div className="flex items-center gap-3 text-zinc-200 text-lg font-medium">
                  <Globe size={20} className="text-indigo-500 animate-pulse" />
                  <span>{siteConfig.location.city} — {siteConfig.location.timezone}</span>
                </div>
              </div>

              {/* Project Card */}
              <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md space-y-4 max-w-sm">
                <div className="flex justify-between items-start">
                  <p className="text-zinc-400 text-xs font-mono">
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
              <span className="text-indigo-400 text-[10px] font-mono uppercase tracking-[0.3em]">
                Next.js 16
              </span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};