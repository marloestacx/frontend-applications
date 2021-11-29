import "./App.css";
import React from "react";
import BubbleChart from "./components/BubbleChart";
import { songData } from "./data";

export default function App() {
  return (
    <div className="App">
      <BubbleChart data={songData} />
      {/* <BarChart data={songData} /> */}
      <div className="hidden" id="toolTip">
        <p id="type"></p>
        <p id="value"></p>
      </div>
    </div>
  );
}
