import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import trainImg from "../assets/marta_train.jpg";
import "./Home.css";

export default function Home() {
  return (
    <div className="home-container">
      <header className="home-header">
        <h1 className="home-title">MARTA</h1>
        <Link to="/about" className="home-about">
          About MARTA
        </Link>
      </header>

      <main className="home-main">
        <section className="home-left">
          <h2>VIEW ROUTES SCHEDULE</h2>
          <ul className="home-lines">
            <li>
              <Link to="/lines?color=gold">Gold Line</Link>
            </li>
            <li>
              <Link to="/lines?color=red">Red Line</Link>
            </li>
            <li>
              <Link to="/lines?color=green">Green Line</Link>
            </li>
            <li>
              <Link to="/lines?color=blue">Blue Line</Link>
            </li>
          </ul>
        </section>

        <section className="home-right">
          <img src={trainImg} alt="MARTA train" className="train-image" />
        </section>
      </main>
    </div>
  );
}
