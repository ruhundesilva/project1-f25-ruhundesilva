import React from "react";
import "./NavBar.css";

type Props = { color: string; data: any[] };

export default function NavBar({ color }: Props) {
  return (
    <aside className="navbar">
      <div className="nav-inner">
        <div className="nav-caption">Select your starting station</div>
        <div className="nav-subtle">({color.toUpperCase()} line)</div>
        <div className="nav-blank" />
      </div>
    </aside>
  );
}