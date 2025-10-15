import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import LinesPage from "./pages/LinesPage";

function App() {
  return (
    <BrowserRouter>
      <div className="nav-bar">
        <Link to="/">Home</Link>
        <Link to="/lines">Lines</Link>
        <Link to="/about">About</Link>
      </div>

      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/lines" Component={LinesPage} />
        <Route path="/about" Component={About} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
