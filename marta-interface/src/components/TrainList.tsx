import React from "react";
import "./TrainList.css";
import Train, { type TrainRecord } from "./Train";

type Props = {
  color: "gold" | "red" | "blue" | "green";
  data: any[]; // raw array from the API
};

export default function TrainList({ color, data }: Props) {
  // Use whatever the API returned (the /arrivals/{color} endpoint should already be filtered).
  // If we fell back to the unfiltered endpoint, you can uncomment the client-side filter below.
  let all: TrainRecord[] = Array.isArray(data) ? (data as TrainRecord[]) : [];

  // Optional client-side filter (only if you fetched the unfiltered /arrivals endpoint):
  // const target = color.toUpperCase();
  // all = all.filter(
  //   (t) => ((t?.LINE ?? "") + "").toUpperCase().trim().startsWith(target)
  // );

  return (
    <section className="trainlist">
      {/* Filter chips (wired up in a later commit) */}
      <div className="filter-bar">
        <button className="chip">Arriving</button>
        <button className="chip">Scheduled</button>
        <button className="chip">
          {color === "green" || color === "blue" ? "Eastbound" : "Northbound"}
        </button>
        <button className="chip">
          {color === "green" || color === "blue" ? "Westbound" : "Southbound"}
        </button>
      </div>

      <div className="train-list">
        {all.length === 0 ? (
          <div className="empty">No trains to display</div>
        ) : (
          all.map((item, idx) => <Train key={idx} item={item} color={color} />)
        )}
      </div>
    </section>
  );
}
