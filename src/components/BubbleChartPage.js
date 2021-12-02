import BubbleChart from "./BubbleChart";
import { songData } from "../data";

export default function BubbleChartPage() {
  return (
    <>
      <h1>What albums do Taylor Swift's most populair songs come from?</h1>
      <label>
        <input type="checkbox" name="Filter" value="1" id="filter" />
        Taylor Swift only
      </label>
      <BubbleChart data={songData} />
      <div className="hidden" id="toolTip">
        <p id="type"></p>
        <p id="value"></p>
      </div>
    </>
  );
}
