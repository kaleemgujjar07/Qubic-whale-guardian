"use client";

import { motion } from "framer-motion";

export default function Radar() {
  return (
    <div style={{
      width: 250,
      height: 250,
      borderRadius: "50%",
      border: "2px solid #0ff",
      position: "relative",
      overflow: "hidden"
    }}>
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
        style={{
          width: "100%",
          height: "100%",
          background: "conic-gradient(#0ff 0deg, transparent 120deg)"
        }}
      />
    </div>
  );
}
