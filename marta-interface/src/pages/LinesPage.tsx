import React, { useState } from "react";
import NavBar from "../components/Navbar";
import TrainList from "../components/TrainList";
import "./LinesPage.css";

type LineColor = "gold" | "red" | "blue" | "green";

export default function LinesPage() {
  const [currColor, setCurrColor] = useState<LineColor>("gold");
  const colors: LineColor[] = ["gold", "red", "blue", "green"];

  return (
    <div className="lines-page">
      <header className="topbar">
        <div className="line-tabs">
          {colors.map((c) => (
            <button
              key={c}
              className={`line-tab ${c}`}
              onClick={() => setCurrColor(c)}
              type="button"
            >
              {c.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <h1 className="line-title">{currColor.toUpperCase()}</h1>

      <div className="layout">
        <NavBar color={currColor} data={[]} />
        <TrainList color={currColor} data={[]} />
      </div>
    </div>
  );
}
