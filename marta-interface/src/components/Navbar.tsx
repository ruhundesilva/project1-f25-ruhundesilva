import React, { useMemo } from "react";
import "./NavBar.css";

type Props = {
  color: string;
  data: any[];
  selectedStation: string | null;
  onSelectStation: (station: string | null) => void;
};

export default function NavBar({
  color,
  data,
  selectedStation,
  onSelectStation,
}: Props) {
  const stations = useMemo(() => {
    const names = new Set<string>();
    (Array.isArray(data) ? data : []).forEach((t) => {
      if (t?.STATION) names.add(String(t.STATION).trim());
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [data]);

  const allStations = ["All Stations", ...stations];

  function handleClick(name: string) {
    onSelectStation(name === "All Stations" ? null : name);
  }

  return (
    <aside className="navbar">
      <div className="nav-inner">
        <div className="nav-caption">Select your starting station</div>
        <div className="nav-subtle">({color.toUpperCase()} line)</div>

        <ul className="station-list">
          {allStations.map((s) => {
            const active =
              (selectedStation == null && s === "All Stations") ||
              selectedStation === s;
            return (
              <li
                key={s}
                className={`station${active ? " active" : ""}`}
                onClick={() => handleClick(s)}
              >
                {s}
              </li>
            );
          })}
        </ul>
      </div>
    </aside>
  );
}
