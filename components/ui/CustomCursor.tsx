"use client";
import React, { useEffect, useState } from "react";
import { motion, useSpring, useMotionValue } from "motion/react";

export default function CustomCursor() {
  const [isHovered, setIsHovered] = useState(false);
  const cursorX = useMotionValue(-100);
  const cursorY = useMotionValue(-100);

  // تنعيم حركة الماوس (Spring Physics)
  const springConfig = { damping: 25, stiffness: 200 };
  const mainX = useSpring(cursorX, springConfig);
  const mainY = useSpring(cursorY, springConfig);

  useEffect(() => {
    const moveCursor = (e: MouseEvent) => {
      cursorX.set(e.clientX);
      cursorY.set(e.clientY);
    };

    const handleHover = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      // بيعرف الـ Hover لو العنصر زرار أو رابط أو فيه خاصية data-cursor
      const isSelectable = target.closest("button, a, .cursor-pointer");
      setIsHovered(!!isSelectable);
    };

    window.addEventListener("mousemove", moveCursor);
    window.addEventListener("mouseover", handleHover);

    return () => {
      window.removeEventListener("mousemove", moveCursor);
      window.removeEventListener("mouseover", handleHover);
    };
  }, []);

  return (
    // المكون لا يظهر إلا في الشاشات الكبيرة (أكبر من Tablet)
    <div className="hidden md:block pointer-events-none fixed inset-0 z-9999">
      {/* الدائرة الأساسية (The Core) */}
      <motion.div
        className="absolute w-4 h-4 bg-indigo-500 rounded-full mix-blend-difference"
        style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovered ? 4 : 1,
          opacity: isHovered ? .39 : 1
        }}
      />
      {/* الحلقة الخارجية (The Ring) */}
      <motion.div
        className="absolute w-8 h-8 border border-indigo-500/50 rounded-full"
        style={{ x: mainX, y: mainY, translateX: "-50%", translateY: "-50%" }}
        animate={{
          scale: isHovered ? 1.5 : 1,
          opacity: isHovered ? 0 : 1,
        }}
      />
    </div>
  );
}