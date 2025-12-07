"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { getEvents } from "./../lib/events";

interface Event {
  id: number;
  type: string;
  wallet: string;
  amount: number;
  timestamp: string;
}

export default function IncidentFeed() {
  const [events, setEvents] = useState<Event[]>([]);
  const [displayedEvents, setDisplayedEvents] = useState<Event[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const allEvents = getEvents();
      setEvents(allEvents);
      setDisplayedEvents(allEvents.slice(0, 6)); // Show only 6 most recent
    }, 800);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="space-y-3 max-h-[600px] overflow-y-auto custom-scrollbar">
      <AnimatePresence mode="popLayout">
        {displayedEvents.length > 0 ? (
          displayedEvents.map((event, index) => (
            <motion.div
              key={event.id}
              layout
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.4 }}
              className="group"
            >
              <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-purple-900/20 to-pink-900/20 border border-purple-500/20 p-4 hover:border-purple-500/50 transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20">
                {/* Background animation */}
                <div className="absolute inset-0 bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-xl">🐋</span>
                      <span className="font-semibold text-purple-400 text-sm">{event.type}</span>
                    </div>
                    <span className="text-xs text-slate-500 bg-slate-800/50 px-2 py-1 rounded">
                      #{index + 1}
                    </span>
                  </div>

                  <div className="space-y-1">
                    <p className="text-xs text-slate-400">
                      <span className="text-slate-500">Wallet:</span>
                      <span className="text-cyan-400 font-mono ml-1">
                        {event.wallet.slice(0, 10)}...
                      </span>
                    </p>
                    <p className="text-sm font-bold">
                      <span className="text-slate-400">Amount: </span>
                      <span className="text-green-400">
                        {(event.amount || 0).toLocaleString()}
                      </span>
                      <span className="text-slate-500 ml-1">QUBIC</span>
                    </p>
                  </div>

                  <div className="mt-2 pt-2 border-t border-slate-700/50">
                    <p className="text-xs text-slate-500">
                      {new Date(event.timestamp).toLocaleTimeString()}
                    </p>
                  </div>
                </div>

                {/* Badge */}
                <motion.div
                  className="absolute top-2 right-2 w-2 h-2 bg-green-400 rounded-full"
                  animate={{ scale: [1, 1.5, 1] }}
                  transition={{ duration: 2, repeat: Infinity }}
                />
              </div>
            </motion.div>
          ))
        ) : (
          <div className="flex flex-col items-center justify-center h-64 text-slate-400">
            <motion.div
              animate={{ opacity: [0.5, 1] }}
              transition={{ duration: 2, repeat: Infinity }}
            >
              <p className="text-center">⏳ Waiting for whale transfers...</p>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
