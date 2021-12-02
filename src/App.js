import "./App.css";
import React from "react";
import BubbleChartPage from "./components/BubbleChartPage";
import BarChartPage from "./components/BarChartPage";
import { Routes, Route, Link } from "react-router-dom";

export default function App() {
  return (
    <div className="App">
      <div className="nav">
        <Link to="/">Bubble chart</Link>
        <Link to="/BarChartPage">Bar chart</Link>
      </div>
      <Routes>
        <Route path="/" element={<BubbleChartPage />} />
        <Route path="/BarChartPage" element={<BarChartPage />} />
      </Routes>
    </div>
  );
}
