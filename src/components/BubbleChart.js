import useD3 from "../hooks/useD3";
import React from "react";
import * as d3 from "d3";

function BubbleChart({ data }) {

  // Define the div for the tooltip
  var div = d3.select("body").append("div")	
  .attr("class", "tooltip")				
  .style("opacity", 0);

  // set the dimensions and margins of the graph
  const margin = {top: 0, bottom: 10, left: 0, right: 0};
  const width = 1500 - margin.left - margin.right;
  const height = 900 - margin.top - margin.bottom;

  var color = d3.scaleOrdinal()
  .domain([data.album])
  .range([ "yellow", "pink", "grey", "red", "blue", "black", "green","white"])

  const ref = useD3(
    (svg) => {

  //Group used to enforce margin
  const g = svg.append('g')
  .attr('transform', `translate(${margin.left},${margin.top})`);

  //Add a scale for bubble size
  const sqrtScale = d3.scaleSqrt()
  .domain(d3.extent(data, d => d.views))
  //Output between 10 and 100
  .range([10, 100])

  const circle = g.selectAll('circle').data(data, function(d) { return d.name; });

  // Initialize the circle: all located at the center of the svg area
  var node = circle.enter()
  .append("circle")
      .attr("r", function(d){ return sqrtScale(d.views)})
      //Color circle according to album name
      .style("fill", function(d){ return color(d.album)})
      // .attr("fill", function(data) {
      //   if (data.album == "folklore") {
      //     return "grey";
      //   } 
      //   if (data.album == "evermore") {
      //     return "green";
      //   } 
      //   else if (data.album == "reputation") {
      //     return "black";
      //   }
      //   else if (data.album.includes("1989")) {
      //     return "blue";
      //   }
      //   else if (data.album.includes("Red")) {
      //     return "#FF0000";
      //   }
      //   else if (data.album.includes("Lover")) {
      //     return "pink";
      //   }
      //   else if (data.album.includes("Fearless")) {
      //     return "yellow";
      //   }
      //   return "white";
      // })
      .style("fill-opacity", 0.8)
      .attr("stroke", "#69a2b2")
      .style("stroke-width", 4)

      // Hover show song titel
      .on("mouseover", function(d, data) {	
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '.85');
        div.transition()		
            .duration(200)		
            .style("opacity", .9);
        // div.html(data.name)
        //     .style("left", (d.pageX) + "px")		
        //     .style("top", (d.pageY - 28) + "px")
            
          d3.select('#toolTip')
        // take position of mouse for position of tooltip
        .style('left', d.pageX + 'px')
        .style('top', d.pageY + 'px')
        d3.select('#type').text(data.name);
        })	
        //Change opacity bubble when mouse is on				
      .on("mouseout", function(d) {	
        d3.select(this).transition()
          .duration('50')
          .attr('opacity', '1');
            
          div.transition()		
              .duration(500)		
              .style("opacity", 0);	
    });

  // circle.update;
  // //Remove unneeded circles
  // circle.exit().remove();

  // Features of the forces applied to the nodes:
  var simulation = d3.forceSimulation()
  // Attraction to the center of the svg area
      .force("center", d3.forceCenter().x(width / 2).y(height / 2))
      // Force that avoids circle overlapping
      .force("collide", d3.forceCollide().strength(.2).radius(function(d){ return (sqrtScale(d.views)+3) }).iterations(1)) 

  // Apply these forces to the nodes and update their positions.
  // Once the force algorithm is happy with positions ('alpha' value is low enough), simulations will stop.
  simulation
      .nodes(data)
      .on("tick", function(d){
        node
            .attr("cx", function(d){ return d.x; })
            .attr("cy", function(d){ return d.y; })
      });
  });
      return (
          <svg
            ref={ref}
            style={{
              height: height,
              width: "100%",
              margin: margin
            }}
          />
        );
}

export default BubbleChart;