import BarChart from "./BarChart";
import { songData } from "../data";

export default function BarChartPage() {
  return (
    <>
      <BarChart data={songData} />
    </>
  );
}
