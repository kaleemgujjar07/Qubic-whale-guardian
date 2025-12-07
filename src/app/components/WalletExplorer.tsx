"use client";

import { useState } from "react";
import { getEvents } from "./../lib/events";

export default function WalletExplorer() {
  const [wallet, setWallet] = useState("");
  const [list, setList] = useState<any[]>([]);

  function search() {
    const res = getEvents().filter(e => e.wallet === wallet);
    setList(res);
  }

  return (
    <div>
      <h2>Wallet Explorer</h2>
      <input
        value={wallet}
        onChange={(e) => setWallet(e.target.value)}
        placeholder="Enter wallet"
        style={{ padding: 8, marginRight: 10 }}
      />
      <button onClick={search}>Search</button>

      <div style={{ marginTop: 20 }}>
        {list.map((e) => (
          <div key={e.id}>
            {e.type} — {e.amount}
          </div>
        ))}
      </div>
    </div>
  );
}
