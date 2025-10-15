import React, { useMemo, useState } from "react";
import "./TrainList.css";
import Train, { type TrainRecord } from "./Train";

type Props = {
  color: "gold" | "red" | "blue" | "green";
  data: any[];
};

export default function TrainList({ color, data }: Props) {
  const trains: TrainRecord[] = Array.isArray(data)
    ? (data as TrainRecord[])
    : [];

  const [showArriving, setShowArriving] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);
  const [direction, setDirection] = useState<null | "A" | "B">(null);

  const isArriving = (t: TrainRecord) => {
    const w = (t.WAITING_TIME ?? "").toLowerCase().trim();
    return (
      w.includes("arriv") || w.includes("board") || w === "0" || w === "0 min"
    );
  };
  const isScheduled = (t: TrainRecord) => !isArriving(t);

  const normDir = (t: TrainRecord): "N" | "S" | "E" | "W" | "" => {
    const raw = ((t.DIRECTION ?? "") + "").toUpperCase().trim();
    if (raw === "N" || raw.startsWith("NORTH")) return "N";
    if (raw === "S" || raw.startsWith("SOUTH")) return "S";
    if (raw === "E" || raw.startsWith("EAST")) return "E";
    if (raw === "W" || raw.startsWith("WEST")) return "W";
    return "";
  };

  const wantsEastWest = color === "blue" || color === "green";
  const dirALabel = wantsEastWest ? "Eastbound" : "Northbound";
  const dirBLabel = wantsEastWest ? "Westbound" : "Southbound";

  const filtered = useMemo(() => {
    return trains.filter((t) => {
      if (showArriving && !isArriving(t)) return false;
      if (showScheduled && !isScheduled(t)) return false;

      const d = normDir(t);

      if (direction === "A") {
        // A = North/East
        if (wantsEastWest) return d === "E";
        return d === "N";
      }
      if (direction === "B") {
        // B = South/West
        if (wantsEastWest) return d === "W";
        return d === "S";
      }

      return true;
    });
  }, [trains, showArriving, showScheduled, direction, wantsEastWest]);

  const onClickArriving = () => {
    setShowArriving((v) => !v);
    setShowScheduled(false);
  };
  const onClickScheduled = () => {
    setShowScheduled((v) => !v);
    setShowArriving(false);
  };
  const onClickDirA = () => setDirection((d) => (d === "A" ? null : "A"));
  const onClickDirB = () => setDirection((d) => (d === "B" ? null : "B"));

  return (
    <section className="trainlist">
      <div className="filter-bar">
        <button
          className={`chip ${showArriving ? "active" : ""}`}
          onClick={onClickArriving}
        >
          Arriving
        </button>
        <button
          className={`chip ${showScheduled ? "active" : ""}`}
          onClick={onClickScheduled}
        >
          Scheduled
        </button>
        <button
          className={`chip ${direction === "A" ? "active" : ""}`}
          onClick={onClickDirA}
        >
          {dirALabel}
        </button>
        <button
          className={`chip ${direction === "B" ? "active" : ""}`}
          onClick={onClickDirB}
        >
          {dirBLabel}
        </button>
      </div>

      <div className="train-list">
        {filtered.length === 0 ? (
          <div className="empty">No trains match filters</div>
        ) : (
          filtered.map((item, idx) => (
            <Train key={idx} item={item} color={color} />
          ))
        )}
      </div>
    </section>
  );
}
