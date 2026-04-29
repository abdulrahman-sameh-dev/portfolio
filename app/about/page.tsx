"use client"
import React from "react";
import { motion } from "motion/react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User, Cpu, Code2, ArrowLeft } from "lucide-react";

export default function AboutSoon() {
  return (
    <main className="relative min-h-screen w-full bg-[#050505] flex flex-col items-center justify-center p-6 overflow-hidden">
      
      {/* Background Decor: Subtle Indigo Lines */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-0 left-1/4 w-px h-full bg-linear-to-b from-transparent via-indigo-500/50 to-transparent" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-linear-to-b from-transparent via-indigo-500/50 to-transparent" />
      </div>

      <div className="relative z-10 max-w-3xl w-full">
        
        {/* Top Header: Identity Reveal */}
        <div className="flex flex-col items-center mb-12">
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            className="w-20 h-20 rounded-2xl bg-zinc-900 border border-zinc-800 flex items-center justify-center mb-6 shadow-2xl shadow-indigo-500/10"
          >
            <User className="text-indigo-500" size={32} />
          </motion.div>
          
          <motion.h1 
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            className="text-4xl md:text-5xl font-bold tracking-tight text-white text-center"
          >
            Indexing Identity<span className="text-indigo-500">...</span>
          </motion.h1>
        </div>

        {/* The "Loading" Bento Placeholder */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-12">
          {[
            { icon: <Cpu size={18} />, label: "Experience" },
            { icon: <Code2 size={18} />, label: "Stack" },
            { icon: <User size={18} />, label: "Philosophy" }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 + 0.3 }}
              className="p-4 rounded-xl border border-zinc-800/50 bg-zinc-900/20 backdrop-blur-sm flex flex-col items-center gap-3"
            >
              <div className="text-zinc-600 animate-pulse">{item.icon}</div>
              <div className="h-1 w-12 bg-zinc-800 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-indigo-500" 
                  animate={{ x: [-48, 48] }} 
                  transition={{ repeat: Infinity, duration: 1.5, ease: "linear" }}
                />
              </div>
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{item.label}</span>
            </motion.div>
          ))}
        </div>

        {/* Detailed Message */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          className="bg-zinc-900/30 border border-zinc-800 p-6 rounded-2xl font-mono text-sm text-zinc-400 space-y-4 shadow-inner"
        >
          <div className="flex gap-2">
            <span className="text-indigo-500 italic">➜</span>
            <p>Fetching bio for <span className="text-white">Abdulrahman Sameh</span></p>
          </div>
          <div className="flex gap-2">
            <span className="text-indigo-500 italic">➜</span>
            <p>Status: <span className="text-emerald-500 italic">Architecting Story...</span></p>
          </div>
          <p className="text-zinc-500 leading-relaxed pl-6 italic">
            "I don't just write code; I design scalable systems with a minimalist aesthetic. Full bio coming as soon as the deployment finishes."
          </p>
        </motion.div>

        {/* Back Button */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1 }}
          className="mt-10 flex justify-center"
        >
          <Button asChild variant="link" className="text-zinc-500 hover:text-indigo-400 transition-colors group">
            <Link href="/" className="flex items-center gap-2">
              <ArrowLeft size={16} className="group-hover:-translate-x-1 transition-transform" />
              Return to Control Center
            </Link>
          </Button>
        </motion.div>

      </div>
    </main>
  );
}





// "use client";
// import { motion } from "motion/react";
// import HexNode from '@/components/ui/HexNode';

// const HexGrid = () => {
//   // تعريف زوايا ودوران الـ 6 نودز بناءً على الدائرة (0, 60, 120, 180, 240, 300)
//   // Distance هي المسافة من المركز لكل قطعة (تحتاج ضبط بناءً على حجم النود)
//   const distance = 160; 

//   const nodes = [
//     { angle: 0, rotate: 0, delay: 0 },
//     { angle: 60, rotate: 60, delay: 0.1 },
//     { angle: 120, rotate: 120, delay: 0.2 },
//     { angle: 180, rotate: 180, delay: 0.3 },
//     { angle: 240, rotate: 240, delay: 0.4 },
//     { angle: 300, rotate: 300, delay: 0.5 },
//   ];

//   return (
//     <div className="relative flex items-center justify-center min-h-screen w-full bg-black overflow-hidden">
      
//       {/* 1. الطبقة الخلفية: الـ Dynamic Hex Grid */}
//       <div className="absolute inset-0 flex items-center justify-center">
//         {nodes.map((node, index) => {
//           // حساب الـ (x, y) باستخدام حساب المثلثات (Cos, Sin)
//           // عشان نوزعهم بدقة في شكل دائري سداسي
//           const x = distance * Math.cos((node.angle * Math.PI) / 180);
//           const y = distance * Math.sin((node.angle * Math.PI) / 180);

//           return (
//             <motion.div
//               key={index}
//               className="absolute"
//               initial={{ opacity: 0, scale: 0.8 }}
//               animate={{ opacity: 1, scale: 1 }}
//               transition={{ delay: node.delay, duration: 1 }}
//               style={{
//                 // التحريك والدوران لكل نود
//                 transform: `translate(${x}px, ${y}px) rotate(${node.rotate}deg)`,
//                 // تأكد إن نقطة الدوران هي السنتر بتاع النود نفسها
//                 transformOrigin: 'center center', 
//               }}
//             >
//               {/* حجم النود الواحد. تأكد إنه متفرغ صح */}
//               <HexNode className="w-[200px] h-[200px]" />
//             </motion.div>
//           );
//         })}
//       </div>

//       {/* 2. الطبقة الوسطى: الـ Headline
//       <div className="relative z-10 text-center font-geist">
//         <h1 className="text-9xl font-bold tracking-tighter text-white">
//           Portfolite<span className="text-purple-500">.</span>
//         </h1>
//         <p className="text-zinc-500 text-lg mt-4 font-mono tracking-widest uppercase">
//           Dynamic Systems Architecture
//         </p>
//       </div> */}
//     </div>
//   )
// }

// export default HexGrid