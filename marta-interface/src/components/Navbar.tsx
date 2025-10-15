import React, { useMemo } from "react";
import "./NavBar.css";

type Props = { color: string; data: any[] };

export default function NavBar({ color, data }: Props) {
  const stations = useMemo(() => {
    const names = new Set<string>();
    (Array.isArray(data) ? data : []).forEach((t) => {
      if (t.STATION) names.add(t.STATION.toString().trim());
    });
    return Array.from(names).sort((a, b) => a.localeCompare(b));
  }, [data]);

  return (
    <aside className="navbar">
      <div className="nav-inner">
        <div className="nav-caption">Select your starting station</div>
        <div className="nav-subtle">({color.toUpperCase()} line)</div>

        <ul className="station-list">
          {stations.length === 0 ? (
            <li className="station empty">No Stations Found</li>
          ) : stations.length === 0 ? (
            <li className="station empty">No Stations Found</li>
          ) : (
            stations.map((s) => (
              <li className="station" key={s}>
                {s}
              </li>
            ))
          )}
        </ul>
      </div>
    </aside>
  );
}
