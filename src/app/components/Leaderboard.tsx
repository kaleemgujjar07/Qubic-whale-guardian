"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEvents } from "./../lib/events";

interface WalletStats {
  wallet: string;
  total: number;
  count: number;
}

export default function Leaderboard() {
  const [board, setBoard] = useState<WalletStats[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const events = getEvents();
      const walletMap = new Map<string, { total: number; count: number }>();

      events.forEach((e: any) => {
        const wallet = e.wallet || "N/A";
        if (!walletMap.has(wallet)) {
          walletMap.set(wallet, { total: 0, count: 0 });
        }
        const stats = walletMap.get(wallet)!;
        stats.total += e.amount || 0;
        stats.count += 1;
      });

      const sorted = Array.from(walletMap.entries())
        .map(([wallet, { total, count }]) => ({ wallet, total, count }))
        .sort((a, b) => b.total - a.total)
        .slice(0, 5);

      setBoard(sorted);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3">
      <AnimatePresence mode="popLayout">
        {board.length > 0 ? (
          board.map((item, index) => (
            <motion.div
              key={item.wallet}
              layout
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.4, delay: index * 0.05 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-pink-900/20 to-orange-900/20 border border-pink-500/20 p-3 hover:border-pink-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-pink-500/20">
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-pink-500/0 via-pink-500/10 to-pink-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-3">
                      {/* Rank Badge */}
                      <motion.div
                        className="w-8 h-8 rounded-full bg-gradient-to-br from-yellow-400 to-orange-400 flex items-center justify-center font-bold text-slate-900 text-sm"
                        whileHover={{ scale: 1.1 }}
                      >
                        {index + 1}
                      </motion.div>

                      <div>
                        <p className="text-xs text-slate-400">Wallet</p>
                        <p className="text-sm font-mono text-cyan-400">
                          {item.wallet.slice(0, 12)}...
                        </p>
                      </div>
                    </div>

                    {/* Medal emoji for top 3 */}
                    {index === 0 && <span className="text-xl">🥇</span>}
                    {index === 1 && <span className="text-xl">🥈</span>}
                    {index === 2 && <span className="text-xl">🥉</span>}
                  </div>

                  <div className="grid grid-cols-2 gap-2 text-xs">
                    <div className="bg-slate-900/50 rounded p-2">
                      <p className="text-slate-500">Volume</p>
                      <p className="font-bold text-pink-400">
                        {(item.total / 1000000).toFixed(1)}M
                      </p>
                    </div>
                    <div className="bg-slate-900/50 rounded p-2">
                      <p className="text-slate-500">Transfers</p>
                      <p className="font-bold text-purple-400">{item.count}</p>
                    </div>
                  </div>
                </div>

                {/* Progress bar */}
                <motion.div
                  className="mt-2 h-1 bg-gradient-to-r from-pink-500 to-orange-500 rounded-full"
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: (index + 1) / 5 }}
                  transition={{ duration: 0.6 }}
                  style={{ transformOrigin: "left" }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-48 text-slate-400">
            <motion.div
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-center">🔍 Analyzing wallet data...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
