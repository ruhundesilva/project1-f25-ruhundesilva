import React from "react";
import './NavBar.css'

type Props = {
  color: string;
  data: any[];
};

export default function NavBar({ color, data }: Props) {
  return (
    <aside className="navbar">
      <div className="navbar-header">Select Starting Station</div>
      <div className="navbar-subtitle">({color.toUpperCase()} line)</div>
    </aside>
  );
}
