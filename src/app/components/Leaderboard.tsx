"use client";
import { useEffect, useState } from "react";
import { getEvents } from "./../lib/events";

export default function Leaderboard() {
  const [board, setBoard] = useState<any[]>([]);

  useEffect(() => {
    const i = setInterval(() => {
      const events = getEvents();
      const map: any = {};

      events.forEach((e) => {
        map[e.wallet] = (map[e.wallet] || 0) + e.amount;
      });

      interface LeaderboardEntry {
        wallet: string;
        total: number;
      }

      const sorted: LeaderboardEntry[] = Object.entries(map)
        .map(([wallet, total]) => ({ wallet, total: Number(total) }))
        .sort((a, b) => b.total - a.total);

      setBoard(sorted);
    }, 1000);

    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Top Whale Wallets</h2>

      {board.map((b) => (
        <div key={b.wallet} style={{
          marginBottom: 6,
          background: "#111",
          padding: 10,
          border: "1px solid #444"
        }}>
          🐋 {b.wallet} — {b.total}
        </div>
      ))}
    </div>
  );
}
