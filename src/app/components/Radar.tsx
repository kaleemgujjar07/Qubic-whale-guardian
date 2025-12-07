"use client";

import { motion } from "framer-motion";

export default function Radar() {
  return (
    <div className="flex justify-center items-center w-full">
      <motion.div
        className="relative w-72 h-72 rounded-full border-2 border-cyan-400/50 overflow-hidden shadow-2xl shadow-cyan-500/40"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
      >
        {/* Outer rings */}
        <div className="absolute inset-0 rounded-full border border-cyan-400/20" style={{ width: "80%", height: "80%", top: "10%", left: "10%" }} />
        <div className="absolute inset-0 rounded-full border border-cyan-400/10" style={{ width: "60%", height: "60%", top: "20%", left: "20%" }} />

        {/* Spinning radar sweep */}
        <motion.div
          className="absolute inset-0"
          animate={{ rotate: 360 }}
          transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
          style={{
            background: "conic-gradient(from 0deg, #06b6d4 0deg, #0891b2 45deg, transparent 90deg)",
            opacity: 0.7,
          }}
        />

        {/* Center glow */}
        <motion.div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-5 h-5 bg-cyan-400 rounded-full shadow-lg shadow-cyan-400"
          animate={{ scale: [1, 1.3, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        />

        {/* Pulsing dots for activity */}
        {[...Array(3)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2.5 h-2.5 bg-purple-400 rounded-full"
            animate={{
              x: Math.cos((i * 120 * Math.PI) / 180) * 50,
              y: Math.sin((i * 120 * Math.PI) / 180) * 50,
              opacity: [0.2, 1, 0.2],
            }}
            transition={{ duration: 3, repeat: Infinity, delay: i * 0.3 }}
          />
        ))}

        {/* Label */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center text-xs font-bold tracking-widest">
          <div className="text-cyan-400 text-sm">● LIVE</div>
          <div className="text-slate-500 text-xs">SCAN</div>
        </div>
      </motion.div>
    </div>
  );
}
