import React from "react";
import { Link, BrowserRouter, Route, Routes } from "react-router-dom";
import trainImg from "../assets/marta_train.jpg";
import "./Home.css";

export default function Home() {
  return (
    <div className="home">
      <header className="home__header">
        <div aria-hidden className="home__spacer" />
        <h1 className="home__brand">MARTA</h1>
        <Link to="/about" className="home__about">
          About MARTA
        </Link>
      </header>

      <main className="home__main">
        <section className="home__left">
          <h2 className="home__subtitle">VIEW ROUTES SCHEDULE</h2>
          <ul className="home__lines">
            <li>
              <Link to="/lines/gold">Gold Line</Link>
            </li>
            <li>
              <Link to="/lines/red">Red Line</Link>
            </li>
            <li>
              <Link to="/lines/green">Green Line</Link>
            </li>
            <li>
              <Link to="/lines/blue">Blue Line</Link>
            </li>
          </ul>
        </section>

        <section className="home__right">
          <img
            src={trainImg}
            alt="MARTA train on the guideway"
            className="home__image"
          />
        </section>
      </main>
    </div>
  );
}
