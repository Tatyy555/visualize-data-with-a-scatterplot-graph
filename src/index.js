const fetchDataAndDraw = async () => {
  // Fetching data
  const res = await fetch(
    "https://raw.githubusercontent.com/freeCodeCamp/ProjectReferenceData/master/cyclist-data.json"
  );
  let fetchedData = await res.json();
  // console.log(fetchedData)

  // Arrange data
  let data = [];
  fetchedData.map((d) => {
    let tmp = {};

    tmp["Time"] = new Date(d["Seconds"] * 1000);
    tmp["Year"] = parseInt(d["Year"]);
    tmp["Doping"] = d["Doping"];
    tmp["Name"] = d["Name"];
    data.push(tmp);
  });

  let height = 370;
  let width = 750;
  let padding = 60;
  let svg = d3.select("svg").attr("width", width).attr("height", height);

  let heightScale = d3;
  //   .scaleLinear()
  //   .domain([
  //     d3.min(data, (d) => {
  //       return d["Time"];
  //     }) - 1,
  //     d3.max(data, (d) => {
  //       return d["Time"];
  //     }) + 1,
  //   ])
  //   .range([0, height - 2 * padding]);

  // let widthScale = d3
  //   .scaleLinear()
  //   .domain([0, data.length - 1])
  //   .range([padding, width - padding]);

  let xAxisScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => {
        return d["Year"];
      }) - 1,
      d3.max(data, (d) => {
        return d["Year"];
      }) + 1,
    ])
    .range([padding, width - padding]);
  svg
    .append("g")
    .call(
      d3
        .axisBottom(xAxisScale)
        .tickFormat((d) => d.toString())
        .ticks(15)
    )
    .attr("id", "x-axis")
    .attr("transform", "translate(30," + (height - padding) + ")");

  let yAxisScale = d3
    .scaleLinear()
    .domain([
      d3.min(data, (d) => {
        return d["Time"];
      }),
      d3.max(data, (d) => {
        return d["Time"];
      }),
    ])
    .range([height - padding, padding]);
  svg
    .append("g")
    .call(d3.axisLeft(yAxisScale).tickFormat(d3.timeFormat("%M:%S")))
    .attr("id", "y-axis")
    .attr("transform", "translate(" + (30 + padding) + ",0)");

  // Add dots
  svg
    .append("g")
    .selectAll("dot")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", function (d) {
      return xAxisScale(d["Year"]);
    })
    .attr("cy", function (d) {
      return yAxisScale(d["Time"]);
    })
    .attr("r", 5)
    .attr("transform", "translate(" + 30 + ",0)")
    .attr("class", "dot")
    .attr("fill", (d) => {
      if (d["Doping"] === "") {
        return "blue";
      } else {
        return "orange";
      }
    })
    .attr("data-xvalue", (d) => {
      return d["Year"];
    })
    .attr("data-yvalue", (d) => {
      return d["Time"];
    })
    .on("mouseover", (d) => {
      tooltip.transition().style("visibility", "visible");
      tooltip.attr("data-year", d["Year"]);
      tooltip2.transition().style("visibility", "visible");
      tooltip3.transition().style("visibility", "visible");
      tooltip4.transition().style("visibility", "visible");

      tooltip.text(`Year: ${d["Year"]}`);
      tooltip2.text(`Minutes: ${d["Time"].getMinutes()}:${d["Time"].getSeconds()}`);
      tooltip3.text(`Doping: ${d["Doping"]}`);
      tooltip4.text(`Name: ${d["Name"]}`);
    })
    .on("mouseout", (d) => {
      tooltip.transition().style("visibility", "hidden");
      tooltip2.transition().style("visibility", "hidden");
      tooltip3.transition().style("visibility", "hidden");
      tooltip4.transition().style("visibility", "hidden");
    });

  svg
    .append("text")
    .attr("class", "x label")
    .attr("text-anchor", "end")
    .attr("x", width - 30)
    .attr("y", height - 15)
    .text("Year");

  svg
    .append("text")
    .attr("class", "y label")
    .attr("text-anchor", "end")
    .attr("y", 35)
    .attr("x", -55)
    .attr("transform", "rotate(-90)")
    .text("Time in Minutes");

  let = tooltip = d3
    .select("div")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .attr("class", "myTooltip")

  let = tooltip2 = d3
    .select("div")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .attr("class", "myTooltip")

    let = tooltip3 = d3
    .select("div")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .attr("class", "myTooltip")

    let = tooltip4 = d3
    .select("div")
    .append("div")
    .attr("id", "tooltip")
    .style("visibility", "hidden")
    .attr("class", "myTooltip")
};

fetchDataAndDraw();
