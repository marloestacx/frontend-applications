import BarChart from "./BarChart";
import { songData } from "../data";

export default function BarChartPage() {
  return (
    <div className="App">
      <BarChart data={songData} />
      <div className="hidden" id="toolTip">
        <p id="type"></p>
        <p id="value"></p>
      </div>
    </div>
  );
}
