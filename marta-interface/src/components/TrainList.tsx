import React, { useState } from "react";
import "./TrainList.css";
import Train, { type TrainRecord } from "./Train";

type Props = {
  color: "gold" | "red" | "blue" | "green";
  data: any[];
};

export default function TrainList({ color, data }: Props) {
  let trains: TrainRecord[] = Array.isArray(data)
    ? (data as TrainRecord[])
    : [];

  const [showArriving, setShowArriving] = useState(false);
  const [showScheduled, setShowScheduled] = useState(false);
  const [direction, setDirection] = useState<string | null>(null);

  const isArriving = (t: TrainRecord) =>
    (t.WAITING_TIME ?? "").toLowerCase().includes("arriv") ||
    (t.WAITING_TIME ?? "").toLowerCase().includes("board");

  const isNorthOrEast = (t: TrainRecord) =>
    (t.DIRECTION ?? "")
      .toLowerCase()
      .includes(color === "green" || color === "blue" ? "east" : "north");

  const isSouthOrWest = (t: TrainRecord) =>
    (t.DIRECTION ?? "")
      .toLowerCase()
      .includes(color === "green" || color === "blue" ? "west" : "south");

  const filtered = trains.filter((t) => {
    if (showArriving && !isArriving(t)) return false;
    if (showScheduled && isArriving(t)) return false;

    if (direction === "northOrEast" && !isNorthOrEast(t)) return false;
    if (direction === "southOrEast" && !isSouthOrWest(t)) return false;

    return true;
  });

  // togglers
  function toggleArriving() {
    setShowArriving((prev) => !prev);
    setShowScheduled(false);
  }

  function toggleScheduled() {
    setShowScheduled((prev) => !prev);
    setShowArriving(false);
  }

  function toggleDirection(dir: "northOrEast" | "southOrWest") {
    setDirection((prev) => (prev === dir ? null : dir));
  }

  return (
    <section className="trainlist">
      <div className="filter-bar">
        <button
          className={`chip ${showArriving ? "active" : ""}`}
          onClick={toggleArriving}
        >
          Arriving
        </button>
        <button
          className={`chip ${showScheduled ? "active" : ""}`}
          onClick={toggleScheduled}
        >
          Scheduled
        </button>
        <button
          className={`chip ${direction === "northOrEast" ? "active" : ""}`}
          onClick={() => toggleDirection("northOrEast")}
        >
          {color === "green" || color === "blue" ? "Eastbound" : "Northbound"}
        </button>
        <button
          className={`chip ${direction === "northOrEast" ? "active" : ""}`}
          onClick={() => toggleDirection("northOrEast")}
        >
          {color === "green" || color === "blue" ? "Westbound" : "Southbound"}
        </button>
      </div>

      <div className="train-list">
        {filtered.length === 0 ? (
          <div className="empty">No trains to display</div>
        ) : (
          trains.map((item, idx) => (
            <Train key={idx} item={item} color={color} />
          ))
        )}
      </div>
    </section>
  );
}
