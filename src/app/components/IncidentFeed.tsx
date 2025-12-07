"use client";

import { useEffect, useState } from "react";
import { getEvents } from "./../lib/events";

export default function IncidentFeed() {
  const [events, setEvents] = useState<any[]>([]);

  useEffect(() => {
    const i = setInterval(() => {
      setEvents([...getEvents()]);
    }, 800);

    return () => clearInterval(i);
  }, []);

  return (
    <div>
      <h2 style={{ marginBottom: 10 }}>Live Whale Activity</h2>
      {events.map((e) => (
        <div key={e.id} style={{
          background: "#111",
          padding: 10,
          marginBottom: 8,
          border: "1px solid #333",
          borderRadius: 6
        }}>
          🐋 {e.type} — Wallet: {e.wallet} — Amount: {e.amount}
        </div>
      ))}
    </div>
  );
}
