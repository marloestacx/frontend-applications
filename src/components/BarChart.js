import useD3 from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BarChart({ data }) {
  const height = 700;
  const width = 1500;
  const margin = { top: 20, right: 30, bottom: 300, left: 40 };

  const ref = useD3(
    (svg) => {
      const x = d3
        .scaleBand()
        .domain(data.map((d) => d.name))
        .rangeRound([margin.left, width - margin.right])
        .padding(0.1);

      console.log(data);

      const y1 = d3
        .scaleLinear()
        .domain([0, d3.max(data, (d) => d.views)])
        .rangeRound([height - margin.bottom, margin.top]);

      // svg
      //   .append("g")
      //   .attr("transform", "translate(0,50)") // This controls the vertical position of the Axis
      //   .call(d3.axisBottom(x));

      const xAxis = (g) =>
        g
          .attr("transform", `translate(0,${height - margin.bottom + 2})`)
          .style("color", "#440099")
          .call(d3.axisBottom(x))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          )
          //rotating labels
          .selectAll("text")
          .attr("y", 0)
          .attr("x", 0)
          .attr("dy", ".35em")
          .attr("transform", "rotate(45)")
          .style("text-anchor", "start");

      const y1Axis = (g) =>
        g
          .attr("transform", `translate(${margin.left},0)`)
          .style("color", "#440099")
          .call(d3.axisLeft(y1).ticks(null, "s"))
          .call((g) => g.select(".domain").remove())
          .call((g) =>
            g
              .append("text")
              .attr("x", -margin.left)
              .attr("y", 10)
              .attr("fill", "currentColor")
              .attr("text-anchor", "start")
              .text(data.y1)
          );

      svg.select(".x-axis").call(xAxis);
      svg.select(".y-axis").call(y1Axis);

      svg
        .select(".plot-area")
        .attr("fill", "#6b09df")
        .selectAll(".bar")
        .data(data)
        .join("rect")
        .attr("class", "bar")
        .attr("x", (d) => x(d.name))
        .attr("width", x.bandwidth())
        .attr("y", (d) => y1(d.views))
        .attr("height", (d) => y1(0) - y1(d.views));
    },
    [data.length]
  );

  return (
    <svg
      ref={ref}
      style={{
        height: height,
        width: "100%",
        marginRight: "0px",
        marginLeft: "0px",
      }}
    >
      <g className="plot-area" />
      <g className="x-axis" />
      <g className="y-axis" />
    </svg>
  );
}

export default BarChart;
