import React, { useState, useEffect } from "react";
import NavBar from "../components/Navbar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

type LineColor = "gold" | "red" | "blue" | "green";

export default function LinesPage() {
  const [currColor, setCurrColor] = useState<LineColor>("gold");
  const [trainData, setTrainData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [refreshMsg, setRefreshMsg] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<number | null>(null);

  const colors: LineColor[] = ["gold", "red", "blue", "green"];

  async function fetchTrains(color: LineColor, useSpinner: boolean) {
    if (useSpinner) {
      setLoading(true);
      setError(null);
      setRefreshMsg(null);
    } else {
      setRefreshing(true);
      setRefreshMsg(null);
    }

    try {
      const res = await fetch(
        `https://midsem-bootcamp-api.onrender.com/arrivals/${color}`
      );
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const data = await res.json();

      setTrainData(Array.isArray(data) ? data : []);
      setLastUpdated(Date.now());
      if (!useSpinner) setRefreshMsg(null);
    } catch (e: any) {
      if (useSpinner) {
        setError(e?.message ?? "Failed to fetch train data");
        setTrainData([]);
      } else {
        setRefreshMsg("Refresh failed. Will retry automatically.");
      }
    } finally {
      if (useSpinner) setLoading(false);
      else setRefreshing(false);
    }
  }

  useEffect(() => {
    fetchTrains(currColor, true);
    const id = setInterval(() => {
      fetchTrains(currColor, false);
    }, 30000);
    return () => clearInterval(id);
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

      <div className="sub-status" aria-live="polite">
        {refreshing
          ? "Refreshing…"
          : lastUpdated
          ? `Updated ${new Date(lastUpdated).toLocaleTimeString()}`
          : ""}
        {refreshMsg ? ` — ${refreshMsg}` : ""}
      </div>

      {loading ? (
        <div className="loading">Loading train data…</div>
      ) : error ? (
        <div className="loading">
          Error: {error}{" "}
          <button onClick={() => fetchTrains(currColor, true)}>Retry</button>
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
