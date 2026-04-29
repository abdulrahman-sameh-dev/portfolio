"use client";
import { motion } from "motion/react";
import HexNode from "@/components/ui/HexNode";
import { Button } from "@/components/ui/button";
import { ArrowUpRightIcon } from "@/components/ui/arrow-up-right";

const Hero = () => {
  // تعريف الـ Animation Variants للـ Staggering
  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // تأخير 0.2 ثانية بين كل عنصر والتاني
        delayChildren: 0.5,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, x: -20 },
    show: { opacity: 1, x: 0, transition: { duration: 0.8 } },
  };

  return (
    <section className="relative w-full min-h-[90vh] flex flex-col justify-start md:justify-center items-start overflow-hidden py-30 md:py-5 px-6">
      <motion.div
        variants={container}
        initial="hidden"
        animate="show"
        className="relative z-10 flex flex-col gap-6 md:gap-10"
      >
        {/* الـ Badge */}
        <motion.span
          variants={item}
          className="border border-indigo-500/30 bg-indigo-500/5 text-indigo-300 text-sm md:text-base font-medium px-5 py-3 rounded-xl w-fit backdrop-blur-sm"
        >
          Specialized in Scalable Web Systems
        </motion.span>

        {/* العنوان */}
        <motion.h1
          variants={item}
          className="text-3xl md:text-6xl font-bold max-w-4xl tracking- md:leading-[1.1]"
        >
          Developing High-Performance <br />
          <span className="text-transparent bg-clip-text bg-linear-to-r from-indigo-300 via-indigo-400 to-purple-500">
            Full-Stack Applications.
          </span>
        </motion.h1>

        {/* الوصف */}
        <motion.p
          variants={item}
          className="max-w-2xl text-xl md:text-2xl text-zinc-400 leading-relaxed"
        >
          Full Stack Developer specialized in MERN Stack, Next.js & System
          Design.
        </motion.p>

        {/* الأزرار */}
        <motion.div variants={item} className="flex gap-6">
          <Button className="w-fit text-xl text-white bg-linear-30 from-indigo-700 to-indigo-400 border-0 py-6 px-6 md:px-8">
            Get Started
          </Button>
          <Button className="w-fit text-xl bg-white/0 text-white border-indigo-300/40 border py-6 px-6 md:px-8">
            Learn More <ArrowUpRightIcon />
          </Button>
        </motion.div>
      </motion.div>

      {/* الـ HexNode كـ Background */}
      <div className="absolute top-1/2 -translate-y-1/2 hidden lg:flex -right-30 w-full max-w-[700px] opacity-50 md:opacity-100 transition-opacity pt-20">
        <HexNode className="w-2/3" />
      </div>
    </section>
  );
};

export default Hero;
