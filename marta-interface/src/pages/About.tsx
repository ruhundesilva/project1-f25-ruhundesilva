import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";

export default function About() {
  return (
    <div className="about-container">
      <h1>About MARTA</h1>
      <p>This is the information about MARTA</p>
      <Link to="/" className="back-link">Back to Home</Link>
    </div>
  );
}
