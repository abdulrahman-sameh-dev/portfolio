"use client";

import Link from "next/link";
import React, { useEffect, useState } from "react";
import { AlignRightIcon } from "@/components/ui/align-right";
import { motion, AnimatePresence, Variants } from "motion/react"; // استيراد Variants هنا
import { XIcon } from "@/components/ui/x";
import { usePathname } from "next/navigation";
import { Button } from "./ui/button";
import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-animated";
import { Globe } from "lucide-react";

const MotionLink = motion.create(Link);

export const Navebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  // 1. تعريف الـ Variants بنوع صريح لحل مشكلة الـ TypeScript
  const menuVariants: Variants = {
    hidden: { opacity: 0, y: -20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        duration: 0.5, 
        ease: "circOut", 
        staggerChildren: 0.1,
        when: "beforeChildren"
      } 
    },
    exit: { 
      opacity: 0, 
      transition: { duration: 0.3, ease: "circIn" } 
    }
  };

  const itemVariants: Variants = {
    hidden: { x: -20, opacity: 0 },
    visible: { 
      x: 0, 
      opacity: 1,
      transition: { duration: 0.4, ease: "easeOut" }
    }
  };

  // 2. إدارة الـ Side Effects
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  return (
    <nav className="flex justify-between items-center p-6 w-full max-w-7xl mx-auto z-100 relative">
      {/* Logo */}
      <Link href="/" className="text-2xl font-bold text-white tracking-tighter group transition-all">
        Abdulrahman<span className="text-indigo-600 group-hover:animate-pulse">.</span>
      </Link>

      {/* Right Side: Quick Status + Toggle */}
      <div className="flex items-center gap-6">
        {/* <div className="hidden md:flex items-center gap-3 px-4 py-1.5 rounded-full bg-zinc-900/50 border border-zinc-800 backdrop-blur-sm shadow-sm">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-mono uppercase tracking-widest text-zinc-400 font-medium">
            Available for Hire
          </span>
        </div> */}

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
          onClick={() => setIsOpen(true)}
          className="p-2 hover:bg-zinc-900 rounded-xl transition-all active:scale-90 cursor-pointer"
          aria-label="Open Menu"
        >
          <AlignRightIcon className="w-8 h-8 text-white" />
        </button>
      </div>

      {/* Fullscreen Overlay Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            variants={menuVariants}
            initial="hidden"
            animate="visible"
            exit="exit"
            className="fixed inset-0 z-110 bg-black p-6 md:p-12 flex flex-col overflow-hidden"
          >
            {/* Menu Header */}
            <div className="flex justify-between items-center mb-8 md:mb-12">
              <span className="text-sm font-mono text-zinc-400/80 uppercase tracking-[0.3em]">Navigation System</span>
              <Button 
                variant="outline" 
                onClick={() => setIsOpen(false)}
                className="rounded-full w-12 h-12  border-zinc-800 hover:bg-zinc-900 hover:text-white cursor-pointer transition-transform active:scale-90"
              >
                <XIcon size={40} className="" />
              </Button>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 grow items-center">
              {/* Left Side: Navigation Links */}
              <div className="flex flex-col gap-2 md:gap-4">
                {["Home", "About", "Projects", "Contact"].map((item) => (
                  <motion.div key={item} variants={itemVariants}>
                    <MotionLink
                      href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
                      className="text-5xl md:text-8xl font-bold text-zinc-400 lg:text-zinc-600 hover:text-white transition-all tracking-tighter inline-block"
                      whileHover={{ x: 25, transition: { duration: 0.3 } }}
                    >
                      {item}<span className="text-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity">.</span>
                    </MotionLink>
                  </motion.div>
                ))}
              </div>

              {/* Right Side: System Info Panels */}
              <motion.div 
                variants={itemVariants}
                className="flex flex-col space-y-10 lg:pl-16 lg:border-l border-zinc-900"
              >
                {/* Social Links Section */}
                <div className="space-y-4">
                  <h4 className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">Connect</h4>
                  <div className="flex gap-8">
                    <Link href="https://github.com/abdulrahmansameh" target="_blank" className="text-zinc-400 hover:text-white transition-colors hover:-translate-y-1 duration-300"><GithubIcon size={24}/></Link>
                    <Link href="https://linkedin.com/in/abdulrahman-sameh" target="_blank" className="text-zinc-400 hover:text-white transition-colors hover:-translate-y-1 duration-300"><LinkedinIcon size={24}/></Link>
                    <Link href="https://x.com/abdulrahman_dev" target="_blank" className="text-zinc-400 hover:text-white transition-colors hover:-translate-y-1 duration-300"><TwitterIcon size={24}/></Link>
                  </div>
                </div>

                {/* Location Display */}
                <div className="space-y-4">
                  <h4 className="text-zinc-600 font-mono text-[10px] uppercase tracking-[0.4em] font-bold">HQ Location</h4>
                  <div className="flex items-center gap-3 text-zinc-200 text-lg font-medium">
                    <Globe size={20} className="text-indigo-500 animate-pulse" />
                    <span>Cairo, Egypt — GMT+2</span>
                  </div>
                </div>

                {/* Current Project Snapshot */}
                <div className="p-6 rounded-3xl bg-zinc-900/40 border border-zinc-800/50 backdrop-blur-md space-y-4 max-w-sm shadow-2xl">
                  <div className="flex justify-between items-start">
                    <p className="text-zinc-500 text-xs font-mono">Current Focus</p>
                    <span className="text-[10px] px-2 py-0.5 rounded-md bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">65%</span>
                  </div>
                  <p className="text-white font-bold text-lg tracking-tight">Portfolite Platform Architecture</p>
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

            {/* Menu Footer Line */}
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
    </nav>
  );
};

// "use client";

// import Link from "next/link";
// import React, { useEffect, useState } from "react";
// import { AlignRightIcon } from "@/components/ui/align-right";
// import { motion, AnimatePresence, Variants } from "motion/react";
// import { XIcon } from "@/components/ui/x";
// import { usePathname } from "next/navigation";
// import { Button } from "./ui/button";
// import { GithubIcon, LinkedinIcon, TwitterIcon } from "lucide-animated";
// import { Globe, Box } from "lucide-react";
// const MotionLink = motion.create(Link);

// export const Navebar = () => {
//   const [isOpen, setIsOpen] = useState(false);
//   const pathname = usePathname();

//   const menuVariants: Variants = {
//     hidden: { opacity: 0, scale: 0.98 },
//     visible: { 
//       opacity: 1, 
//       scale: 1,
//       transition: { duration: 0.4, ease: "circOut", staggerChildren: 0.1, when: "beforeChildren" } 
//     },
//     exit: { opacity: 0, transition: { duration: 0.3 } }
//   };

//   const itemVariants: Variants = {
//     hidden: { y: 20, opacity: 0 },
//     visible: { y: 0, opacity: 1, transition: { duration: 0.4 } }
//   };

//   useEffect(() => {
//     setIsOpen(false);
//   }, [pathname]);

//   useEffect(() => {
//     document.body.style.overflow = isOpen ? "hidden" : "";
//     return () => { document.body.style.overflow = ""; };
//   }, [isOpen]);

//   return (
//     <nav className="flex justify-between items-center p-6 w-full max-w-7xl mx-auto z-100 relative">
//       {/* Logo: Back to Portfolite */}
//       <Link href="/" className="text-3xl font-bold text-white tracking-wider group">
//         Portfolite<span className="text-indigo-600 group-hover:animate-bounce inline-block">.</span>
//       </Link>

//       {/* Status & Toggle */}
//       <div className="flex items-center gap-6">
//         {/* Back to System Building Status */}
//         <div className="hidden md:flex items-center gap-3 px-4 py-2 rounded-full bg-zinc-900 border border-zinc-800 shadow-lg">
//           <span className="relative flex h-2 w-2">
//             <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-indigo-400 opacity-75"></span>
//             <span className="relative inline-flex rounded-full h-2 w-2 bg-indigo-500"></span>
//           </span>
//           <span className="text-xs font-mono uppercase tracking-widest text-zinc-200 font-semibold">
//             System Building
//           </span>
//         </div>

//         <button 
//           onClick={() => setIsOpen(true)}
//           className="p-2 hover:bg-zinc-900 rounded-xl transition-all cursor-pointer border border-transparent hover:border-zinc-800"
//         >
//           <AlignRightIcon className="w-9 h-9 text-white" />
//         </button>
//       </div>

//       <AnimatePresence>
//         {isOpen && (
//           <motion.div
//             variants={menuVariants}
//             initial="hidden"
//             animate="visible"
//             exit="exit"
//             className="fixed inset-0 z-110 bg-[#050505] p-8 md:p-16 flex flex-col"
//           >
//             {/* Header Area */}
//             <div className="flex justify-between items-center mb-16">
//               <div className="flex items-center gap-2">
//                 <Box className="text-indigo-500" size={24} />
//                 <span className="text-lg font-bold text-white tracking-widest uppercase">System Menu</span>
//               </div>
//               <Button 
//                 variant="outline" 
//                 onClick={() => setIsOpen(false)}
//                 className="rounded-full w-14 h-14 border-zinc-700 hover:bg-white hover:text-black cursor-pointer transition-all"
//               >
//                 <XIcon className="w-8 h-8" />
//               </Button>
//             </div>

//             <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 grow">
//               {/* Navigation Links - Clearer Font Sizes */}
//               <div className="flex flex-col gap-6 justify-center">
//                 {["Home", "About", "Projects", "Contact"].map((item) => (
//                   <motion.div key={item} variants={itemVariants}>
//                     <MotionLink
//                       href={item === "Home" ? "/" : `/${item.toLowerCase()}`}
//                       className="text-6xl md:text-8xl font-black text-zinc-600 hover:text-white transition-all tracking-tighter"
//                       whileHover={{ x: 20 }}
//                     >
//                       {item}
//                     </MotionLink>
//                   </motion.div>
//                 ))}
//               </div>

//               {/* Sidebar Info - High Contrast */}
//               <motion.div 
//                 variants={itemVariants}
//                 className="flex flex-col justify-center space-y-12 lg:border-l lg:border-zinc-800 lg:pl-16"
//               >
//                 {/* Socials */}
//                 <div className="space-y-6">
//                   <h4 className="text-indigo-400 font-mono text-sm uppercase tracking-[0.2em] font-bold">Social Architecture</h4>
//                   <div className="flex gap-8">
//                     <Link href="#" className="text-zinc-300 hover:text-white transition-transform hover:-translate-y-1"><GithubIcon size={32}/></Link>
//                     <Link href="#" className="text-zinc-300 hover:text-white transition-transform hover:-translate-y-1"><LinkedinIcon size={32}/></Link>
//                     <Link href="#" className="text-zinc-300 hover:text-white transition-transform hover:-translate-y-1"><TwitterIcon size={32}/></Link>
//                   </div>
//                 </div>

//                 {/* Location */}
//                 <div className="space-y-6">
//                   <h4 className="text-indigo-400 font-mono text-sm uppercase tracking-[0.2em] font-bold">Base Location</h4>
//                   <div className="flex items-center gap-4 text-white text-2xl font-semibold">
//                     <Globe size={28} className="text-indigo-500" />
//                     <span>Cairo, Egypt</span>
//                   </div>
//                 </div>

//                 {/* Project Status Panel - More Readable */}
//                 <div className="p-8 rounded-[2rem] bg-zinc-900 border border-zinc-800 space-y-6 shadow-2xl">
//                   <div className="flex justify-between items-center">
//                     <p className="text-zinc-300 font-bold text-sm uppercase tracking-wider italic">Active Task</p>
//                     <span className="bg-indigo-600 text-white px-3 py-1 rounded text-xs font-black">65%</span>
//                   </div>
//                   <p className="text-white font-extrabold text-2xl tracking-tight leading-none">
//                     Portfolite SaaS Core
//                   </p>
//                   <div className="w-full h-3 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700">
//                     <motion.div 
//                       className="h-full bg-indigo-500"
//                       initial={{ width: 0 }}
//                       animate={{ width: "65%" }}
//                       transition={{ duration: 1.5, delay: 0.5 }}
//                     />
//                   </div>
//                 </div>
//               </motion.div>
//             </div>

//             {/* Footer with High Contrast Metadata */}
//             <div className="mt-auto pt-10 border-t border-zinc-800 flex flex-col md:flex-row justify-between items-center gap-6">
//               <span className="text-zinc-400 text-sm font-bold font-mono tracking-widest uppercase">
//                 © 2026 Portfolite System Architecture
//               </span>
//               <div className="flex gap-8 text-zinc-500 font-mono text-xs font-bold uppercase tracking-[0.2em]">
//                 <span>Build: v1.0.4</span>
//                 <span className="text-indigo-500">Node: Stable</span>
//               </div>
//             </div>
//           </motion.div>
//         )}
//       </AnimatePresence>
//     </nav>
//   );
// };