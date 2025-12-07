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
  const colorMap: Record<string, { from: string; to: string; accent: string }> = {
    blue: { from: "#0ea5e9", to: "#06b6d4", accent: "#06b6d4" },
    purple: { from: "#a78bfa", to: "#f472b6", accent: "#a78bfa" },
    green: { from: "#34d399", to: "#10b981", accent: "#34d399" },
  };

  // derive gradient keys from passed `color` (supports values like "from-blue-500 to-cyan-400" or short names)
  const key = color?.split("-")[0] || "blue";
  const grad = colorMap[key] || colorMap.blue;

  return (
    <motion.div
      className={`relative group overflow-hidden rounded-2xl p-[2px] mx-auto`}
      whileHover={{ scale: 1.03 }}
      variants={variants}
    >
      {/* Outer gradient border */}
      <div
        className="relative rounded-2xl"
        style={{ background: `linear-gradient(135deg, ${grad.from}20, ${grad.to}10)` }}
      >
        {/* Inner card with subtle dark background */}
        <div className="relative bg-slate-900/60 rounded-2xl p-6 sm:p-8 backdrop-blur-md">
          <div className="relative z-10 flex items-center justify-between gap-4 mb-4">
            <div className="flex-1">
              <p className="text-slate-300 text-sm font-semibold uppercase tracking-wider mb-1">{title}</p>
              <motion.h3
                className="text-3xl md:text-4xl font-extrabold text-white tracking-tight"
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.05 }}
              >
                {value}
              </motion.h3>
            </div>

            <motion.div
              className="flex-shrink-0 text-4xl md:text-5xl opacity-95"
              animate={{ y: [0, -6, 0] }}
              transition={{ duration: 3, repeat: Infinity }}
            >
              {icon}
            </motion.div>
          </div>

          {/* Animated bottom accent */}
          <motion.div
            className="h-1.5 rounded-full mt-3"
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.9, delay: 0.15 }}
            style={{
              transformOrigin: "left",
              background: `linear-gradient(90deg, ${grad.from}, ${grad.to})`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
