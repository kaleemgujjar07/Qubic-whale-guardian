"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { getEvents } from "./../lib/events";
import Radar from "./components/Radar";
import IncidentFeed from "./components/IncidentFeed";
import Leaderboard from "./components/Leaderboard";
import WalletExplorer from "./components/WalletExplorer";
import StatsCard from "./components/StatsCard";
import TransferChart from "./components/TransferChart";

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.8 },
  },
};

export default function Home() {
  const [events, setEvents] = useState<any[]>([]);
  const [stats, setStats] = useState({ totalTransfers: 0, totalVolume: 0, avgAmount: 0 });

  useEffect(() => {
    const interval = setInterval(() => {
      const allEvents = getEvents();
      setEvents(allEvents);
      
      const totalTransfers = allEvents.length;
      const totalVolume = allEvents.reduce((sum, e) => sum + (e.amount || 0), 0);
      const avgAmount = totalTransfers > 0 ? totalVolume / totalTransfers : 0;
      
      setStats({
        totalTransfers,
        totalVolume: Math.round(totalVolume),
        avgAmount: Math.round(avgAmount),
      });
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-slate-950 via-purple-950 to-slate-950 overflow-hidden">
      {/* Animated gradient background */}
      <div className="fixed inset-0 -z-10 opacity-40">
        <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse"></div>
        <div className="absolute top-1/3 right-1/4 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-cyan-500 rounded-full mix-blend-multiply filter blur-3xl animate-pulse animation-delay-4000"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 w-full"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Hero Header */}
        <motion.div className="w-full px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center" variants={itemVariants}>
          <motion.h1
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
          >
            🐋 Qubic Whale Guardian
          </motion.h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto mb-8">
            Enterprise-grade real-time monitoring of large QUBIC transfers
          </p>
          
          {/* Live Status Indicator */}
          <motion.div
            className="flex items-center justify-center gap-3"
            animate={{ opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <div className="w-3 h-3 bg-green-400 rounded-full shadow-lg shadow-green-400"></div>
            <span className="text-sm text-green-400 font-semibold">Live Monitoring Active</span>
          </motion.div>
        </motion.div>

        {/* Stats Cards */}
        <motion.div
          className="w-full px-4 sm:px-6 lg:px-8 mb-12"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-7xl mx-auto">
            <StatsCard
              title="Total Transfers"
              value={stats.totalTransfers}
              icon="📊"
              color="from-blue-500 to-cyan-400"
              variants={itemVariants}
            />
            <StatsCard
              title="Total Volume"
              value={`${stats.totalVolume.toLocaleString()} QUBIC`}
              icon="💰"
              color="from-purple-500 to-pink-400"
              variants={itemVariants}
            />
            <StatsCard
              title="Avg Transfer"
              value={`${stats.avgAmount.toLocaleString()} QUBIC`}
              icon="📈"
              color="from-green-500 to-emerald-400"
              variants={itemVariants}
            />
          </div>
        </motion.div>

        {/* Transfer Chart */}
        <motion.div className="w-full px-4 sm:px-6 lg:px-8 mb-12" variants={itemVariants}>
          <div className="max-w-7xl mx-auto">
            <TransferChart events={events} />
          </div>
        </motion.div>

        {/* Main Grid */}
        <motion.div
          className="w-full px-4 sm:px-6 lg:px-8 mb-12"
          variants={containerVariants}
        >
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
            {/* Radar - Left */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl hover:shadow-cyan-500/30 transition-shadow duration-300">
                <h2 className="text-xl font-bold text-cyan-400 mb-4">Activity Radar</h2>
                <div className="flex justify-center">
                  <Radar />
                </div>
              </div>
            </motion.div>

            {/* Incident Feed - Center */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl hover:shadow-purple-500/30 transition-shadow duration-300 h-full">
                <h2 className="text-xl font-bold text-purple-400 mb-4">Live Transfers</h2>
                <IncidentFeed />
              </div>
            </motion.div>

            {/* Leaderboard - Right */}
            <motion.div className="lg:col-span-1" variants={itemVariants}>
              <div className="bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-6 shadow-2xl hover:shadow-pink-500/30 transition-shadow duration-300 h-full">
                <h2 className="text-xl font-bold text-pink-400 mb-4">Top Whales</h2>
                <Leaderboard />
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* Wallet Explorer */}
        <motion.div className="w-full px-4 sm:px-6 lg:px-8 mb-12" variants={itemVariants}>
          <div className="max-w-7xl mx-auto bg-gradient-to-br from-slate-800/50 to-slate-900/50 backdrop-blur-xl rounded-2xl border border-slate-700/50 p-8 shadow-2xl hover:shadow-blue-500/30 transition-shadow duration-300">
            <h2 className="text-2xl font-bold text-blue-400 mb-6">Wallet Explorer</h2>
            <WalletExplorer />
          </div>
        </motion.div>

        {/* Footer */}
        <motion.div className="w-full px-4 sm:px-6 lg:px-8 py-8 border-t border-slate-700/50 text-center text-slate-400" variants={itemVariants}>
          <p className="text-sm">Powered by EasyConnect • Real-time Data • Enterprise Analytics</p>
        </motion.div>
      </motion.div>
    </div>
  );
}
