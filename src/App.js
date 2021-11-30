import "./App.css";
import React from "react";
import BubbleChart from "./components/BubbleChart";
import { songData } from "./data";

export default function App() {
  return (
    <div className="App">
      <h1>What albums do Taylor Swift's most populair songs come from?</h1>
      <label>
        <input type="checkbox" name="Filter" value="1" id="filter" />
        Taylor Swift only
      </label>
      <BubbleChart data={songData} />
      {/* <BarChart data={songData} /> */}
      <div className="hidden" id="toolTip">
        <p id="type"></p>
        <p id="value"></p>
      </div>
    </div>
  );
}
