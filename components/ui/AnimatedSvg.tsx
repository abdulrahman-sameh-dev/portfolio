"use client";

import type { Transition } from "motion/react";
import { motion, useAnimation } from "motion/react";
import type { HTMLAttributes } from "react";
import {
  forwardRef,
  useCallback,
  useEffect,
  useImperativeHandle,
  useRef,
} from "react";

import { cn } from "@/lib/utils";

export interface AnimatedSvgHandle {
  startAnimation: () => void;
  stopAnimation: () => void;
}

interface AnimatedSvgProps extends HTMLAttributes<HTMLDivElement> {
  size?: number;
}

const TRANSITION_MAIN: Transition = {
  type: "tween",
  duration: 0.75,
  ease: [0.22, 1, 0.36, 1],
};

const TRANSITION_SECONDARY: Transition = {
  type: "tween",
  duration: 0.9,
  ease: "easeInOut",
};

const TRANSITION_GLOW: Transition = {
  type: "tween",
  duration: 1,
  ease: "easeInOut",
};

const AUTO_DELAY = 2400;
const AUTO_RESTORE_DELAY = 1100;

const AnimatedSvg = forwardRef<AnimatedSvgHandle, AnimatedSvgProps>(
  ({ onMouseEnter, onMouseLeave, className, size = 40, ...props }, ref) => {
    const controls = useAnimation();
    const isControlledRef = useRef(false);
    const intervalRef = useRef<number | null>(null);
    const timeoutRef = useRef<number | null>(null);

    useImperativeHandle(ref, () => {
      isControlledRef.current = true;

      return {
        startAnimation: () => controls.start("animate"),
        stopAnimation: () => controls.start("normal"),
      };
    });

    const playAnimation = useCallback(() => {
      controls.start("animate");

      if (timeoutRef.current !== null) {
        window.clearTimeout(timeoutRef.current);
      }

      timeoutRef.current = window.setTimeout(() => {
        controls.start("normal");
      }, AUTO_RESTORE_DELAY);
    }, [controls]);

    useEffect(() => {
      if (isControlledRef.current) return;

      intervalRef.current = window.setInterval(() => {
        playAnimation();
      }, AUTO_DELAY);

      return () => {
        if (intervalRef.current !== null) window.clearInterval(intervalRef.current);
        if (timeoutRef.current !== null) window.clearTimeout(timeoutRef.current);
      };
    }, [playAnimation]);

    const handleMouseEnter = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseEnter?.(e);
        } else {
          playAnimation();
        }
      },
      [onMouseEnter, playAnimation]
    );

    const handleMouseLeave = useCallback(
      (e: React.MouseEvent<HTMLDivElement>) => {
        if (isControlledRef.current) {
          onMouseLeave?.(e);
        } else {
          controls.start("normal");
        }
      },
      [controls, onMouseLeave]
    );

    return (
      <div
        className={cn("inline-flex items-center justify-center", className)}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        {...props}
      >
        <svg
          fill="none"
          height={size}
          width={size}
          viewBox="0 0 311 270"
          xmlns="http://www.w3.org/2000/svg"
        >
          <defs>
            <filter
              id="animatedSvgGlow"
              x="-20%"
              y="-20%"
              width="140%"
              height="140%"
              colorInterpolationFilters="sRGB"
            >
              <feGaussianBlur stdDeviation="3.5" result="blur" />
              <feColorMatrix
                in="blur"
                type="matrix"
                values="
                  1 0 0 0 0
                  0 1 0 0 0
                  0 0 1 0 0
                  0 0 0 0.55 0"
              />
            </filter>
          </defs>

          <motion.path
            d="M120.345 29.5C120.345 29.5 130.649 48.3395 137.303 59.872L102.877 119.5H70.7254L0 242L15.8771 269.5H51.0001L66.8772 242H137.309L154.877 269.5H293.377L310.409 240L293.377 210.5H259.923L224.377 148.933L241.371 119.5L172.377 0H137.377L120.345 29.5Z"
            fill="#D9D9D9"
            filter="url(#animatedSvgGlow)"
            animate={controls}
            transition={TRANSITION_SECONDARY}
            variants={{
              normal: {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0.14,
              },
              animate: {
                x: [0, -1, 1, 0],
                y: [0, 2, -1, 0],
                scale: [1, 1.02, 1],
                opacity: [0.14, 0.22, 0.14],
              },
            }}
            style={{
              transformOrigin: "50% 50%",
            }}
          />

          <motion.path
            d="M172.377 119.5L207.307 180L189.698 210.5H120.345L102.877 180.244L137.948 119.5H172.377Z"
            fill="#D9D9D9"
            filter="url(#animatedSvgGlow)"
            animate={controls}
            transition={TRANSITION_GLOW}
            variants={{
              normal: {
                x: 0,
                y: 0,
                scale: 1,
                opacity: 0.12,
              },
              animate: {
                x: [0, 0, 0],
                y: [0, -2, 0],
                scale: [1, 1.04, 1],
                opacity: [0.12, 0.2, 0.12],
              },
            }}
            style={{
              transformOrigin: "50% 50%",
            }}
          />

          <motion.path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M120.345 29.5C120.345 29.5 130.649 48.3395 137.303 59.872L102.877 119.5H70.7254L0 242L15.8771 269.5H51.0001L66.8772 242H137.309L154.877 269.5H293.377L310.409 240L293.377 210.5H259.923L224.377 148.933L241.371 119.5L172.377 0H137.377L120.345 29.5ZM172.377 119.5L207.307 180L189.698 210.5H120.345L102.877 180.244L137.948 119.5H172.377Z"
            fill="#D9D9D9"
            animate={controls}
            transition={TRANSITION_MAIN}
            variants={{
              normal: {
                x: 0,
                y: 0,
                scale: 1,
                rotate: 0,
                opacity: 1,
              },
              animate: {
                x: [0, -2, 1, 0],
                y: [0, -5, 2, 0],
                scale: [1, 1.03, 0.99, 1.04, 1],
                rotate: [0, -3, 2, 0],
                opacity: [1, 0.94, 1],
              },
            }}
            style={{
              transformOrigin: "50% 50%",
            }}
          />
        </svg>
      </div>
    );
  }
);

AnimatedSvg.displayName = "AnimatedSvg";

export { AnimatedSvg };