import React, { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

type LineColor = "gold" | "red" | "blue" | "green";

export default function LinesPage() {
  const colors: LineColor[] = ["gold", "red", "blue", "green"];
  const [currColor, setCurrColor] = useState<LineColor>("gold");
  const [trainData, setTrainData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchTrains() {
      setLoading(true);
      setError(null);

      try {
        const res = await fetch(
          `https://midsem-bootcamp-api.onrender.com/arrivals/${currColor}`
        );
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const data = await res.json();
        setTrainData(Array.isArray(data) ? data : []);
      } catch (e: any) {
        setError(e?.message ?? "failed to fetch train data");
        setTrainData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTrains();
  }, [currColor]);

  return (
    <div className="lines-page">
      <header className="topbar">
        <div className="line-tabs">
          {colors.map((c) => (
            <button
              key={c}
              className={`line-tab ${c}`}
              onClick={() => setCurrColor(c)}
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <h1 className="line-title">{currColor.toUpperCase()}</h1>

      {loading ? (
        <div className="loading">Loading train data…</div>
      ) : error ? (
        <div className="loading">
          {error} <button onClick={() => setCurrColor((c) => c)}>Retry</button>
        </div>
      ) : (
        <div className="layout">
          <NavBar color={currColor} data={trainData} />
          <TrainList color={currColor} data={trainData} />
        </div>
      )}
    </div>
  );
}
