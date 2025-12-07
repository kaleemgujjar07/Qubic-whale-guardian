"use client";

import { motion } from "framer-motion";
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";

interface TransferChartProps {
  events: any[];
}

export default function TransferChart({ events }: TransferChartProps) {
  // Prepare chart data - group by time
  const chartData = events
    .slice()
    .reverse()
    .slice(0, 20)
    .map((e, i) => ({
      time: `T${i + 1}`,
      amount: e.amount || 0,
      transfers: 1,
    }));

  const totalEvents = chartData.length;
  const totalVolume = chartData.reduce((sum, d) => sum + d.amount, 0);

  return (
    <motion.div
      className="bg-gradient-to-br from-slate-800/60 via-slate-800/40 to-slate-900/60 backdrop-blur-xl rounded-2xl border border-slate-700/60 p-10 shadow-2xl hover:shadow-cyan-500/50 hover:border-cyan-500/50 transition-all duration-300 group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8 }}
    >
      <div className="mb-10">
        <h2 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-400 mb-3 group-hover:text-cyan-300">📊 Transfer Analytics</h2>
        <p className="text-slate-400 text-sm font-medium">Last {totalEvents} transfers • Total: <span className="text-cyan-400 font-semibold text-lg">{totalVolume.toLocaleString()} QUBIC</span></p>
      </div>

      {chartData.length > 0 ? (
        <div className="space-y-8">
          {/* Line Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
          >
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Transfer Volume Trend</h3>
            <ResponsiveContainer width="100%" height={250}>
              <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.3)" />
                <XAxis dataKey="time" stroke="rgba(148, 163, 184, 0.5)" />
                <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "#22d3ee" }}
                />
                <Line
                  type="monotone"
                  dataKey="amount"
                  stroke="#06b6d4"
                  strokeWidth={2}
                  dot={{ fill: "#06b6d4", r: 4 }}
                  activeDot={{ r: 6 }}
                  animationDuration={300}
                />
              </LineChart>
            </ResponsiveContainer>
          </motion.div>

          {/* Bar Chart */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h3 className="text-sm font-semibold text-slate-300 mb-4">Transfers Count</h3>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(71, 85, 105, 0.3)" />
                <XAxis dataKey="time" stroke="rgba(148, 163, 184, 0.5)" />
                <YAxis stroke="rgba(148, 163, 184, 0.5)" />
                <Tooltip
                  contentStyle={{
                    background: "rgba(15, 23, 42, 0.9)",
                    border: "1px solid rgba(148, 163, 184, 0.3)",
                    borderRadius: "12px",
                  }}
                  labelStyle={{ color: "#a855f7" }}
                />
                <Bar
                  dataKey="transfers"
                  fill="#a855f7"
                  animationDuration={300}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </motion.div>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-64 text-slate-400">
          <p>📊 Waiting for transfer data...</p>
        </div>
      )}
    </motion.div>
  );
}
