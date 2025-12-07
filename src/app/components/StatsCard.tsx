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
      className={`relative group overflow-hidden rounded-2xl bg-gradient-to-br ${color} p-0.5`}
      whileHover={{ scale: 1.05, boxShadow: "0 20px 25px -5px rgba(0, 0, 0, 0.3)" }}
      variants={variants}
    >
      {/* Inner card with dark background */}
      <div className="relative bg-gradient-to-br from-slate-900 to-slate-800 rounded-2xl p-8 backdrop-blur-xl">
        <div className="flex items-start justify-between mb-6">
          <div>
            <p className="text-slate-400 text-sm font-medium mb-2">{title}</p>
            <motion.h3
              className="text-4xl font-bold text-white"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              {value}
            </motion.h3>
          </div>
          <span className="text-4xl opacity-80">{icon}</span>
        </div>

        {/* Animated bottom border */}
        <motion.div
          className={`h-1 bg-gradient-to-r ${color} rounded-full`}
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1, delay: 0.2 }}
        />
      </div>

      {/* Glow effect on hover */}
      <div className="absolute inset-0 opacity-0 group-hover:opacity-20 rounded-2xl transition-opacity duration-300" />
    </motion.div>
  );
}
