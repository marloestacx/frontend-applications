import useD3 from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BubbleChart({ data }) {
  // set the dimensions and margins of the graph
  const margin = { top: 0, bottom: 10, left: 0, right: 0 };
  const width = 1500 - margin.left - margin.right;
  const height = 900 - margin.top - margin.bottom;

  const colors = [
    { album: "Fearless", color: "yellow" },
    { album: "Lover", color: "pink" },
    { album: "folklore", color: "grey" },
    { album: "Red", color: "red" },
    { album: "reputation", color: "black" },
    { album: "evermore", color: "green" },
    { album: "1989", color: "blue" },
  ];

  var color = d3
    .scaleOrdinal()
    .domain([data.album])
    .range(colors.map((d) => d.color));

  const ref = useD3((svg) => {
    //Add a scale for bubble size
    const sqrtScale = d3
      .scaleSqrt()
      .domain(d3.extent(data, (d) => d.views))
      //Output between 10 and 100
      .range([10, 100]);

    circlePack(data);
    function circlePack(data) {
      //remove old svg
      svg.selectAll("*").remove();

      //Group used to enforce margin
      const g = svg
        .append("g")
        .attr("transform", `translate(${margin.left},${margin.top})`);

      const circle = g.selectAll("circle").data(data, function (d) {
        return d.name;
      });

      // Initialize the circle: all located at the center of the svg area
      var node = circle
        .enter()
        .append("circle")
        .attr("r", function (d) {
          return sqrtScale(d.views);
        })
        //Color circle according to album name
        .style("fill", function (d) {
          if (
            d.album.includes("Lover") ||
            d.album.includes("folklore") ||
            d.album.includes("evermore") ||
            d.album.includes("Red") ||
            d.album.includes("Fearless") ||
            d.album.includes("reputation") ||
            d.album.includes("1989")
          ) {
            return color(d.album);
          } else {
            return "white";
          }
        })
        .style("fill-opacity", 0.8)
        .attr("stroke", "#69a2b2")
        .style("stroke-width", 4)

        // Hover show song titel
        .on("mouseover", function (d, data) {
          d3.select(this).transition().duration("50").attr("opacity", ".85");
          d3.select("#toolTip")
            // take position of mouse for position of tooltip
            .style("left", d.pageX + "px")
            .style("top", d.pageY + "px")
            .transition()
            .duration(200)
            .style("opacity", 0.9);
          d3.select("#type").text(data.name);
        })
        //Change opacity bubble when mouse is on
        .on("mouseout", function (d) {
          d3.select(this).transition().duration("50").attr("opacity", "1");
          d3.select("#toolTip").transition().duration(500).style("opacity", 0);
        });

      // console.log(data)
      legend(data);

      // Features of the forces applied to the nodes:
      var simulation = d3
        .forceSimulation()
        // Attraction to the center of the svg area
        .force(
          "center",
          d3
            .forceCenter()
            .x(width / 2)
            .y(height / 2)
        )
        // Force that avoids circle overlapping
        .force(
          "collide",
          d3
            .forceCollide()
            .strength(0.2)
            .radius(function (d) {
              return sqrtScale(d.views) + 3;
            })
            .iterations(1)
        );

      // Apply these forces to the nodes and update their positions.
      // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
      simulation.nodes(data).on("tick", function (d) {
        node
          .attr("cx", function (d) {
            return d.x;
          })
          .attr("cy", function (d) {
            return d.y;
          });
      });
    }

    function legend(data) {
      //Legend
      //Albums

      let albums = [];
      data.forEach((data) => {
        if (albums.includes(data.album)) {
        } else {
          albums.push(data.album);
        }
      });

      svg
        .append("text")
        .attr("x", 10)
        .attr("y", 40)
        .text("Album")
        .style("font-size", "19px")
        .attr("alignment-baseline", "middle");

      let yas = 70;
      colors.forEach((colors) => {
        svg
          .append("circle")
          .attr("cx", 10)
          .attr("cy", yas)
          .attr("r", 6)
          .style("fill", colors.color);
        svg
          .append("text")
          .attr("x", 30)
          .attr("y", yas)
          .text(colors.album)
          .style("font-size", "15px")
          .attr("alignment-baseline", "middle");
        yas = yas + 30;
      });
      svg
        .append("circle")
        .attr("cx", 10)
        .attr("cy", 280)
        .attr("r", 6)
        .style("fill", "white")
        .style("stroke", "black");
      svg
        .append("text")
        .attr("x", 30)
        .attr("y", 280)
        .text("Other")
        .style("font-size", "15px")
        .attr("alignment-baseline", "middle");

      // //Populairity
      // svg.append("text").attr("x", 10).attr("y", 330).text("Popularity").style("font-size", "19px").attr("alignment-baseline","middle")

      // // The scale you use for bubble size
      // var size = d3.scaleSqrt()
      //   .domain([1, 100])
      //   .range([1, 100])

      // // Add legend: circles
      // var valuesToShow = [{name: 'Least popular', number: 10}, {name: 'Average', number: 50},{name: 'Most popular', number: 100}]
      // var xCircle = 110
      // var xLabel = 250
      // var yCircle = 550

      // svg
      //   .selectAll("legend")
      //   .data(valuesToShow)
      //   .enter()
      //   .append("circle")
      //     .attr("cx", xCircle)
      //     .attr("cy", function(d){ return yCircle - size(d.number) } )
      //     .attr("r", function(d){ return size(d.number) })
      //     .style("fill", "none")
      //     .attr("stroke", "black")

      // // Add legend: segments
      // svg
      // .selectAll("legend")
      // .data(valuesToShow)
      // .enter()
      // .append("line")
      //   .attr('x1', function(d){ return xCircle + size(d.number) } )
      //   .attr('x2', xLabel)
      //   .attr('y1', function(d){ return yCircle - size(d.number) } )
      //   .attr('y2', function(d){ return yCircle - size(d.number) } )
      //   .attr('stroke', 'black')
      //   .style('stroke-dasharray', ('2,2'))

      // // Add legend: labels
      // svg
      // .selectAll("legend")
      // .data(valuesToShow)
      // .enter()
      // .append("text")
      //   .attr('x', xLabel)
      //   .attr('y', function(d){ return yCircle - size(d.number)} )
      //   .text( function(d){ return d.name } )
      //   .style("font-size", 15)
      //   .attr('alignment-baseline', 'middle')
    }

    //filter
    d3.select("#filter").on("change", function () {
      // This will be triggered when the user selects or unselects the checkbox
      const checked = d3.select(this).property("checked");
      if (checked === true) {
        // Checkbox was just checked
        // Keep only data with artist Taylor Swift
        const filtered_data = data.filter((d) => d.artist === "Taylor Swift");
        // Update the chart with the filtered data
        circlePack(filtered_data);
      } else {
        // Checkbox was just unchecked
        // Update the chart with all the data we have
        circlePack(data);
      }
    });
  });

  return (
    <svg
      ref={ref}
      style={{
        height: height,
        width: "100%",
        margin: margin,
      }}
    />
  );
}

export default BubbleChart;
