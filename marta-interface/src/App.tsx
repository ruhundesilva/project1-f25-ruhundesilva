import React from "react";
import { BrowserRouter, Route, Routes, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import "./App.css";
import LinesPage from "./pages/LinesPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" Component={Home} />
        <Route path="/lines/:color" Component={LinesPage} />
        <Route path="/about" Component={About} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
