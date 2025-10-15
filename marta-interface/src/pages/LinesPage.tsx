// src/pages/LinesPage.tsx
import React, { useEffect, useState } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import NavBar from "../components/Navbar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

type LineColor = "gold" | "red" | "blue" | "green";
const COLORS: LineColor[] = ["gold", "red", "blue", "green"];

export default function LinesPage() {
  const { color } = useParams();
  const navigate = useNavigate();

  const currColor: LineColor = COLORS.includes((color || "") as LineColor)
    ? (color as LineColor)
    : "gold";

  useEffect(() => {
    if (!color || !COLORS.includes(color as LineColor)) {
      navigate("/lines/gold", { replace: true });
    }
  }, [color, navigate]);

  // data + ui state
  const [trainData, setTrainData] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedStation, setSelectedStation] = useState<string | null>(null);

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
        setError(e?.message ?? "Failed to fetch train data");
        setTrainData([]);
      } finally {
        setLoading(false);
      }
    }
    fetchTrains();
  }, [currColor]);

  useEffect(() => {
    setSelectedStation(null);
  }, [currColor]);

  return (
    <div className="lines-page">
      <header className="topbar">
        <div className="line-tabs">
          {COLORS.map((c) => (
            <Link key={c} to={`/lines/${c}`} className={`line-tab ${c}`}>
              {c.toUpperCase()}
            </Link>
          ))}
        </div>
      </header>

      <h1 className="line-title">{currColor.toUpperCase()}</h1>

      {loading ? (
        <div className="loading">Loading train data…</div>
      ) : error ? (
        <div className="loading">
          Error: {error} <Link to={`/lines/${currColor}`}>Retry</Link>
        </div>
      ) : (
        <div className="layout">
          <NavBar
            color={currColor}
            data={trainData}
            selectedStation={selectedStation}
            onSelectStation={setSelectedStation}
          />
          <TrainList
            color={currColor}
            data={trainData}
            selectedStation={selectedStation}
          />
        </div>
      )}
    </div>
  );
}
