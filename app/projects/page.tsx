"use client"
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Construction } from "lucide-react";

export default function ProjectsSoon() {
  return (
    <main className="relative min-h-screen w-full bg-black flex flex-col items-center justify-center overflow-hidden selection:bg-indigo-500/30">
      
      {/* 1. Background System: Grid + Radial Glow */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-size-[40px_40px] mask-[radial-gradient(ellipse_60%_50%_at_50%_50%,#000_70%,transparent_100%)]" />
        <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-600/10 blur-[120px] rounded-full" />
      </div>

      {/* 2. Content Container */}
      <div className="relative z-10 flex flex-col items-center text-center px-6">
        
        {/* Animated Badge */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex items-center gap-2 px-3 py-1 rounded-full border border-indigo-500/20 bg-indigo-500/5 mb-8"
        >
          <Construction size={14} className="text-indigo-400" />
          <span className="text-[10px] font-mono uppercase tracking-[0.2em] text-indigo-300">
            System Under Construction
          </span>
        </motion.div>

        {/* Main Title with Mask Effect */}
        <motion.h1 
          initial={{ opacity: 0, filter: "blur(10px)" }}
          animate={{ opacity: 1, filter: "blur(0px)" }}
          transition={{ duration: 0.8 }}
          className="text-6xl md:text-8xl font-bold tracking-tighter text-white mb-6"
        >
          SOON<span className="text-indigo-500">.</span>
        </motion.h1>

        {/* Description */}
        <motion.p 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          className="max-w-[460px] text-zinc-500 text-lg md:text-xl leading-relaxed mb-10 font-medium"
        >
          I'm currently indexing my latest architectures and full-stack deployments. 
          The full archive is being optimized.
        </motion.p>

        {/* Actions */}
        <motion.div 
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 items-center"
        >
          <Button asChild variant="default" className="bg-white hover:bg-zinc-200 text-black px-8 h-12 font-bold rounded-full">
            <Link href="/">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Home
            </Link>
          </Button>
          
          <div className="text-zinc-600 font-mono text-xs tracking-widest uppercase">
            Status: 40% Compiled
          </div>
        </motion.div>
      </div>

      {/* 3. Bottom Subtle Branding */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ delay: 1 }}
        className="absolute bottom-12 font-mono text-[10px] text-zinc-700 uppercase tracking-[0.5em]"
      >
        Abdulrahman Sameh / Systems Architect
      </motion.div>

    </main>
  );
}