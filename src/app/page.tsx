import Radar from "./components/Radar";
import IncidentFeed from "./components/IncidentFeed";
import Leaderboard from "./components/Leaderboard";
import WalletExplorer from "./components/WalletExplorer";

export default function Home() {
  return (
    <div style={{
      padding: 30,
      color: "#0ff",
      background: "black",
      minHeight: "100vh"
    }}>
      <h1 style={{ fontSize: 40, marginBottom: 20 }}>🐋 Qubic Whale Guardian</h1>

      <div style={{ display: "flex", gap: 40 }}>
        <Radar />
        <IncidentFeed />
        <Leaderboard />
      </div>

      <div style={{ marginTop: 40 }}>
        <WalletExplorer />
      </div>
    </div>
  );
}
