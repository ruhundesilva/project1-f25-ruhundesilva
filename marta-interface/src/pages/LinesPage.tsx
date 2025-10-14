import React, { useState } from "react";
import NavBar from "../components/Navbar";
import TrainList from "./TrainList";
import "./LinesPage.css";

type LineColor = "gold" | "red" | "blue" | "green";

export default function LinesPage() {
  const [currColor, setCurrColor] = useState<LineColor>("gold");

  const colors: LineColor[] = ["gold", "red", "blue", "green"];

  return (
    <div className="lines-page">
      <div className="line-tabs">
        {colors.map((c) => (
          <button
            key={c}
            className={`line-tab ${c} ${currColor === c ? "active" : ""}`}
            onClick={() => setCurrColor(c)}
          >
            {c.toUpperCase()}
          </button>
        ))}
      </div>

      <h1 className="line-title">{currColor.toUpperCase()}</h1>
      <div className="layout">
        <NavBar color={currColor} data={[]} />
        <TrainList color={currColor} data={[]} />
      </div>
    </div>
  );
}
