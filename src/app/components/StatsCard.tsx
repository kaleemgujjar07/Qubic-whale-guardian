"use client";

import { motion } from "framer-motion";

interface StatsCardProps {
  title: string;
  value: string | number;
  icon: string;
  color: string;
  variants?: any;
}

export default function StatsCard({ title, value, icon, color, variants }: StatsCardProps) {
  return (
    <motion.div
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-[2px]`}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 40px -10px rgba(0, 0, 0, 0.5)" }}
      variants={variants}
    >
      {/* Inner card with dark background */}
      <div className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 rounded-2xl p-8 backdrop-blur-xl">
        {/* Background animated gradient */}
        <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-2xl bg-gradient-to-br from-white/5 to-white/0"></div>

        <div className="relative z-10 flex items-start justify-between mb-6">
          <div>
            <p className="text-slate-400 text-sm font-medium uppercase tracking-wide mb-2">{title}</p>
            <motion.h3
              className="text-4xl md:text-5xl font-black text-white tracking-tighter"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
            >
              {value}
            </motion.h3>
          </div>
          <motion.span
            className="text-5xl opacity-90 group-hover:scale-110 transition-transform"
            animate={{ y: [0, -5, 0] }}
            transition={{ duration: 3, repeat: Infinity }}
          >
            {icon}
          </motion.span>
        </div>

        {/* Animated bottom border */}
        <motion.div
          className={`h-1.5 bg-gradient-to-r ${color} rounded-full`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
          style={{ transformOrigin: "left" }}
        />
      </div>

      {/* Glow effect on hover */}
      <motion.div
        className={`absolute inset-0 opacity-0 group-hover:opacity-30 rounded-2xl transition-opacity duration-300 blur-xl`}
        style={{
          background: `linear-gradient(135deg, var(--tw-gradient-stops))`,
        }}
      />
    </motion.div>
  );
}
