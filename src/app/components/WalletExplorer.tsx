"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEvents } from "./../lib/events";

interface WalletEvent {
  id: number;
  type: string;
  wallet: string;
  amount: number;
  timestamp: string;
}

export default function WalletExplorer() {
  const [wallet, setWallet] = useState("");
  const [list, setList] = useState<WalletEvent[]>([]);
  const [searching, setSearching] = useState(false);

  function search() {
    if (!wallet.trim()) return;
    setSearching(true);
    const res = getEvents().filter((e: any) => e.wallet === wallet);
    setList(res);
    setTimeout(() => setSearching(false), 300);
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") search();
  };

  const totalVolume = list.reduce((sum, e) => sum + (e.amount || 0), 0);

  return (
    <div className="space-y-6">
      {/* Search Input */}
      <motion.div
        className="flex gap-3"
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <input
          value={wallet}
          onChange={(e) => setWallet(e.target.value)}
          onKeyPress={handleKeyPress}
          placeholder="Enter wallet address or ID..."
          className="flex-1 px-4 py-3 rounded-xl bg-slate-900/50 border border-slate-700/50 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
        />
        <motion.button
          onClick={search}
          disabled={!wallet.trim() || searching}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-cyan-500 font-semibold text-white hover:shadow-lg hover:shadow-blue-500/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {searching ? "Searching..." : "Search"}
        </motion.button>
      </motion.div>

      {/* Results */}
      <AnimatePresence mode="wait">
        {list.length > 0 ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="space-y-4"
          >
            {/* Summary Card */}
            <motion.div
              className="grid grid-cols-3 gap-4"
              variants={{
                hidden: { opacity: 0 },
                visible: {
                  opacity: 1,
                  transition: { staggerChildren: 0.1 },
                },
              }}
              initial="hidden"
              animate="visible"
            >
              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="bg-gradient-to-br from-blue-900/20 to-blue-800/20 border border-blue-500/30 rounded-xl p-4"
              >
                <p className="text-xs text-slate-400 mb-1">Transfers</p>
                <p className="text-2xl font-bold text-blue-400">{list.length}</p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="bg-gradient-to-br from-green-900/20 to-green-800/20 border border-green-500/30 rounded-xl p-4"
              >
                <p className="text-xs text-slate-400 mb-1">Total Volume</p>
                <p className="text-xl font-bold text-green-400">
                  {(totalVolume / 1000000).toFixed(2)}M
                </p>
              </motion.div>

              <motion.div
                variants={{
                  hidden: { opacity: 0, x: -10 },
                  visible: { opacity: 1, x: 0 },
                }}
                className="bg-gradient-to-br from-purple-900/20 to-purple-800/20 border border-purple-500/30 rounded-xl p-4"
              >
                <p className="text-xs text-slate-400 mb-1">Avg Transfer</p>
                <p className="text-xl font-bold text-purple-400">
                  {(totalVolume / list.length / 1000000).toFixed(2)}M
                </p>
              </motion.div>
            </motion.div>

            {/* Transaction List */}
            <div className="space-y-3 max-h-96 overflow-y-auto custom-scrollbar">
              <AnimatePresence mode="popLayout">
                {list.map((item, index) => (
                  <motion.div
                    key={item.id}
                    layout
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 20 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="group"
                  >
                    <div className="bg-gradient-to-r from-slate-800/30 to-slate-900/30 border border-slate-700/50 rounded-xl p-4 hover:border-slate-600/50 hover:shadow-lg hover:shadow-blue-500/10 transition-all">
                      <div className="flex items-center justify-between mb-3">
                        <span className="text-sm font-semibold text-cyan-400 flex items-center gap-2">
                          <span className="text-lg">🐋</span>
                          {item.type}
                        </span>
                        <span className="text-xs text-slate-500 bg-slate-900/50 px-3 py-1 rounded-lg">
                          #{index + 1}
                        </span>
                      </div>

                      <div className="space-y-2">
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Amount</span>
                          <span className="text-green-400 font-bold">
                            {(item.amount || 0).toLocaleString()} QUBIC
                          </span>
                        </div>
                        <div className="flex justify-between text-xs">
                          <span className="text-slate-400">Time</span>
                          <span className="text-slate-300">
                            {new Date(item.timestamp).toLocaleString()}
                          </span>
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </div>
          </motion.div>
        ) : wallet ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-slate-400"
          >
            <p className="text-lg">🔍 No transfers found for this wallet</p>
            <p className="text-sm text-slate-500 mt-2">Try searching for another wallet address</p>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-16 text-slate-400"
          >
            <p className="text-lg">📍 Enter a wallet address to explore transfers</p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
