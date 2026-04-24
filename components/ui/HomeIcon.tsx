import { motion } from 'motion/react'
import React from 'react'

export const HomeIcon = ({ className, width, height }: { className?: string, width?: number, height?: number }) => {
  return (
    <div className={`${className} flex justify-center items-center gap-2`}>
      {/* <svg width={width} height={height} viewBox="0 0 311 270" fill="none" xmlns="http://www.w3.org/2000/svg" className={className}>
      <path fillRule="evenodd" clipRule="evenodd" d="M120.345 29.5C120.345 29.5 130.649 48.3395 137.303 59.872L102.877 119.5H70.7254L0 242L15.8771 269.5H51.0001L66.8772 242H137.309L154.877 269.5H293.377L310.409 240L293.377 210.5H259.923L224.377 148.933L241.371 119.5L172.377 0H137.377L120.345 29.5ZM172.377 119.5L207.307 180L189.698 210.5H120.345L102.877 180.244L137.948 119.5H172.377Z" fill="#D9D9D9" />
      </svg> */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8, duration: 1 }}
        className="relative z-10 text-center"
      >
        <h1 className="text-3xl tracking-wider font-bold text-white">
          Portfolite<span className="text-indigo-700">.</span>
        </h1>
      </motion.div>
    </div>
  )
}
