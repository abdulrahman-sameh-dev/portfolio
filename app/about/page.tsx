"use client";
import React from 'react'
import { motion } from 'framer-motion'
import HexNode from '@/components/ui/HexNode';

const HexGrid = () => {
  // تعريف زوايا ودوران الـ 6 نودز بناءً على الدائرة (0, 60, 120, 180, 240, 300)
  // Distance هي المسافة من المركز لكل قطعة (تحتاج ضبط بناءً على حجم النود)
  const distance = 160; 

  const nodes = [
    { angle: 0, rotate: 0, delay: 0 },
    { angle: 60, rotate: 60, delay: 0.1 },
    { angle: 120, rotate: 120, delay: 0.2 },
    { angle: 180, rotate: 180, delay: 0.3 },
    { angle: 240, rotate: 240, delay: 0.4 },
    { angle: 300, rotate: 300, delay: 0.5 },
  ];

  return (
    <div className="relative flex items-center justify-center min-h-screen w-full bg-black overflow-hidden">
      
      {/* 1. الطبقة الخلفية: الـ Dynamic Hex Grid */}
      <div className="absolute inset-0 flex items-center justify-center">
        {nodes.map((node, index) => {
          // حساب الـ (x, y) باستخدام حساب المثلثات (Cos, Sin)
          // عشان نوزعهم بدقة في شكل دائري سداسي
          const x = distance * Math.cos((node.angle * Math.PI) / 180);
          const y = distance * Math.sin((node.angle * Math.PI) / 180);

          return (
            <motion.div
              key={index}
              className="absolute"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: node.delay, duration: 1 }}
              style={{
                // التحريك والدوران لكل نود
                transform: `translate(${x}px, ${y}px) rotate(${node.rotate}deg)`,
                // تأكد إن نقطة الدوران هي السنتر بتاع النود نفسها
                transformOrigin: 'center center', 
              }}
            >
              {/* حجم النود الواحد. تأكد إنه متفرغ صح */}
              <HexNode className="w-[200px] h-[200px]" />
            </motion.div>
          );
        })}
      </div>

      {/* 2. الطبقة الوسطى: الـ Headline
      <div className="relative z-10 text-center font-geist">
        <h1 className="text-9xl font-bold tracking-tighter text-white">
          Portfolite<span className="text-purple-500">.</span>
        </h1>
        <p className="text-zinc-500 text-lg mt-4 font-mono tracking-widest uppercase">
          Dynamic Systems Architecture
        </p>
      </div> */}
    </div>
  )
}

export default HexGrid