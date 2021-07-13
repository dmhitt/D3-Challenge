// @TODO: YOUR CODE HERE!

var svgWidth = 1200;
var svgHeight = 600;

var margin = {
  top: 60,
  right: 40,
  bottom: 60,
  left: 40
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;


var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

  var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

  
d3.csv("data.csv").then(function(data) {

     data.forEach(function(data) {
        data.id = +data.id;
        data.state = data.state;
        data.abbr = data.abbr;
        data.poverty = +data.poverty;
        data.povertyMoe = +data.povertyMoe;
        data.age = +data.age;
        data.ageMoe = +data.ageMoe;
        data.income = +data.income;
        data.incomeMoe = +data.incomeMoe;
        data.healthcare = +data.healthcare;
        data.healthcareLow = +data.healthcareLow;
        data.healthcareHigh = +data.healthcareHigh;
        data.obesity = +data.obesity;
        data.obesityLow = +data.obesityLow;
        data.obesityHigh = +data.obesityHigh;
        data.smokes = +data.smokes;
        data.smokesLow = +data.smokesLow;
        data.smokesHigh = +data.smokesHigh;
       
    });
    console.log("data=",data);

    var xLinearScale = d3.scaleLinear()
      .domain([9, d3.max(data, d => d.poverty)])
      .range([0, width]);

    var yLinearScale = d3.scaleLinear()
      .domain([4, d3.max(data, d => d.healthcare)])
      .range([height, 0]);

    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    var circlesGroup = chartGroup.selectAll("circle")
      .data(data)
      .enter()
      .append("circle")
      .attr("cx", d => xLinearScale(d.poverty))
      .attr("cy", d => yLinearScale(d.healthcare))
      .attr("r", "10")
      .attr("fill", "turquoise")
      .attr("opacity", "0.8");

  
    var circleLabels = chartGroup.selectAll(null).data(data).enter().append("text");

    circleLabels
    .attr("x", d => xLinearScale(d.poverty))
    .attr("y", d => yLinearScale(d.healthcare))
    .text(d => d.abbr)
    .attr("font-family", "arial")
    .attr("font-size", "8px")
    .attr("text-anchor", "middle")
    .attr("fill", "blue");
 
    var toolTip = d3.tip()
      .attr("class", "tooltip")
      .offset([80, -60])
      .html(function(d) {
        return (`${d.state}<br>Poverty: ${d.poverty}<br>Healthcare: ${d.healthcare}`);
      });

    chartGroup.call(toolTip);

    circlesGroup.on("click", function(data) {
      toolTip.show(data, this);
    })

    .on("mouseout", function(data, index) {
      toolTip.hide(data);
    });

    chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left)
        .attr("x", 0 - (height / 1.5))
        .attr("dy", "1em")
        .attr("class", "axisText")
        .text("Lacks Healthcare (%)");
 
      chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top - 10})`)
        .attr("class", "axisText")
        .text("In Poverty (%)");
 
    }).catch(function(error) {
         console.log(error);
    });




