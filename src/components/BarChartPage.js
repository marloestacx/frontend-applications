import BarChart from "./BarChart";
import { songData } from "../data";

export default function BarChartPage() {
  return (
    <div className="App">
      <BarChart data={songData} />
    </div>
  );
}
