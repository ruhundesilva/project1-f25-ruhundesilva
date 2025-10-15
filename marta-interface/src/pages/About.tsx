import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import "./About.css";
import MartaMap from "../assets/Marta_Map.png";

export default function About() {
  return (
    <div className="about-container">
      <header className="about-header">
        <h1 className="about-title">MARTA</h1>
        <Link to="/" className="about-home-link">
          Back to Home
        </Link>
      </header>

      <main className="about-main">
        <section className="about-text">
          <h2>About MARTA</h2>
          <p>
            The Metropolitan Atlanta Rapid Transit Authority (MARTA) provides
            reliable and accessible bus and rail transportation throughout the
            Atlanta metropolitan area. MARTA’s mission is to enhance the
            region’s mobility and quality of life by providing safe, efficient,
            and sustainable transit services.
          </p>
          <p>
            The system includes four major rail lines — Gold, Red, Blue, and
            Green — connecting key neighborhoods, business districts, and the
            airport.
          </p>
        </section>

        <section className="about-image">
          <img src={MartaMap} alt="MARTA rail map" />
        </section>
      </main>
    </div>
  );
}
