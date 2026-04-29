"use client";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AlignRightIcon } from "@/components/ui/align-right";
import { motion, AnimatePresence } from "motion/react";
import { XIcon } from "@/components/ui/x";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";

const MotionLink = motion.create(Link);

export const Navebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        when: "beforeChildren", // شغل انيميشن الأب الأول
        staggerChildren: 0.1, // الفرق الزمني بين كل لينك والتاني
      },
    },
    exit: { opacity: 0 },
  };

  useEffect(() => {
    const handleBack = () => {
      // كود لإعادة ضبط الـ Dropdown state يدوياً لو علقت
      setIsOpen(false);
    };
    window.addEventListener("popstate", handleBack);
    return () => window.removeEventListener("popstate", handleBack);
  }, []);

  const linkVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 },
  };

  const pathname = usePathname();

  useEffect(() => {
    setIsOpen(false); // أول ما المسار يتغير، اقفل المينيو فوراً
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <div className="flex list-none justify-between items-center gap-2 p-4 mb-4 w-full">
      <Link
        href="/"
        className="items-center text-3xl tracking-wider font-bold text-white"
      >
        Portfolite<span className="text-indigo-700">.</span>
      </Link>
      <div className="lg:flex items-center gap-2 px-3 py-1 rounded-full hidden bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm">
        <span className="relative flex h-2 w-2">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
        </span>
        <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-zinc-400">
          System Building
        </span>
      </div>
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="relative cursor-pointer z-50"
        title="Main Menu"
      >
        <AlignRightIcon className="w-10 h-10 items-center pt-1.5 pl-2 text-white" />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.nav
            initial="hidden"
            variants={menuVariants}
            animate="visible"
            exit="exit"
            role="navigation"
            className="fixed inset-0 z-50 max-h-screen backdrop-blur-lg bg-white/5 p-14"
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 20, opacity: 0 }}
              className="w-full h-full bg-black z-50 p-10 gap-4 text-2xl flex flex-col rounded-3xl"
            >
              <div className="flex w-full justify-between pb-4">
                <h1 className="items-center text-3xl tracking-wider font-bold text-white">
                  Portfolite<span className="text-indigo-700">.</span>
                </h1>
                <Button
                  variant={"outline"}
                  onClick={() => setIsOpen(!isOpen)}
                  className="w-fit self-end cursor-pointer"
                >
                  <XIcon />
                </Button>
              </div>
              <div className="flex flex-col gap-4 pl-4">
                <MotionLink
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setIsOpen(false)}
                  variants={linkVariants}
                  href="/"
                >
                  Home
                </MotionLink>
                <MotionLink
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setIsOpen(false)}
                  variants={linkVariants}
                  href="/about"
                >
                  About
                </MotionLink>
                <MotionLink
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setIsOpen(false)}
                  variants={linkVariants}
                  href="/contact"
                >
                  Contact
                </MotionLink>
                <MotionLink
                  whileHover={{ x: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                  onClick={() => setIsOpen(false)}
                  variants={linkVariants}
                  href="/get_start"
                >
                  Get Started
                </MotionLink>
              </div>
            </motion.div>
          </motion.nav>
        )}
      </AnimatePresence>
    </div>
  );
};
