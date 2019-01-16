function makeResponsive() {

    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
      svgArea.remove();
    }

    var svgWidth = 1100;
    var svgHeight = 550;

    var margin = {
    top: 20,
    right: 40,
    bottom: 60,
    left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("#scatter")
    .append("svg")
    .attr("width", svgWidth)
    .attr("height", svgHeight);

    var chartGroup = svg.append("g")
    .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data/data.csv").then(function(dataCSV) {
        // console.log(dataCSV);

        Object.values(dataCSV).forEach(
            function(data) {
                data.smokes = +data.smokes;
                data.obesity = +data.obesity;
            }
        );

        var xLinearScale = d3.scaleLinear().
            domain([d3.min(dataCSV,d=>d.smokes)-1, d3.max(dataCSV,d=>d.smokes)+1]).
            range([0, width]);
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(dataCSV,d=>d.obesity)-1, d3.max(dataCSV,d=>d.obesity)+1])
            .range([height, 0]);

        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
        .attr("transform", `translate(0, ${height})`)
        .call(bottomAxis);
        chartGroup.append("g")
        .call(leftAxis);

        var circleGroup = chartGroup.selectAll(".stateCircle")
        .data(dataCSV)
        .enter()
        .append("circle")
        .attr("class","stateCircle")
        .attr("cx", function(d){return xLinearScale(d.smokes)})
        .attr("cy", function(d){return yLinearScale(d.obesity)})
        .attr("r", "15")
        .attr("opacity", ".9");

        var circleText = chartGroup.selectAll(".stateText")
        .data(dataCSV)
        .enter()
        .append("text")
        .attr("class", "stateText")
        .attr("x", function(d){return xLinearScale(d.smokes)})
        .attr("y", function(d){return yLinearScale(d.obesity)})
        .attr('text-anchor', 'middle')
        .attr('alignment-baseline', 'middle')
        .style('font-size', "10")
        .text(function(d) {return d.abbr;});

        var toolTip = d3.tip()
        .attr("class", "d3-tooltip")
        .offset([80, -60])
        .attr("background-color","black")
        .html(function(d) {
            return (`${d.state}<br>smokers: ${d.smokes}%<br>obesity: ${d.obesity}%`);
        });
        chartGroup.call(toolTip);
        circleGroup.on("mouseover", function(data) {
            toolTip.show(data, this);
            })
            .on("mouseout", function(data, index) {
            toolTip.hide(data);
        });
        circleText.on("mouseover", function(data) {
            toolTip.show(data, this);
            })
            .on("mouseout", function(data, index) {
                toolTip.hide(data);
        });

        chartGroup.append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 0 - margin.left + 40)
        .attr("x", 0 - (height / 2))
        .attr("dy", "1em")
        .attr("class", "aText")
        .text("Rate of Obesity (%)");
        chartGroup.append("text")
        .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
        .attr("class", "aText")
        .text("Amount of Smokers (%)");
    });
}
makeResponsive();

d3.select(window).on("resize", makeResponsive);

function makeResponsive() {

    var svgArea = d3.select("body").select("svg");
    if (!svgArea.empty()) {
        svgArea.remove();
    }

    var svgWidth = 1100;
    var svgHeight = 550;

    var margin = {
        top: 20,
        right: 40,
        bottom: 60,
        left: 100
    };

    var width = svgWidth - margin.left - margin.right;
    var height = svgHeight - margin.top - margin.bottom;

    var svg = d3.select("#scatter")
        .append("svg")
        .attr("width", svgWidth)
        .attr("height", svgHeight);

    var chartGroup = svg.append("g")
        .attr("transform", `translate(${margin.left}, ${margin.top})`);

    d3.csv("assets/data/data.csv").then(function (dataCSV) {
        // console.log(dataCSV);

        Object.values(dataCSV).forEach(
            function (data) {
                data.smokes = +data.smokes;
                data.obesity = +data.obesity;
            }
        );

        var xLinearScale = d3.scaleLinear().
        domain([d3.min(dataCSV, d => d.smokes) - 1, d3.max(dataCSV, d => d.smokes) + 1]).
        range([0, width]);
        var yLinearScale = d3.scaleLinear()
            .domain([d3.min(dataCSV, d => d.obesity) - 1, d3.max(dataCSV, d => d.obesity) + 1])
            .range([height, 0]);

        var bottomAxis = d3.axisBottom(xLinearScale);
        var leftAxis = d3.axisLeft(yLinearScale);

        chartGroup.append("g")
            .attr("transform", `translate(0, ${height})`)
            .call(bottomAxis);
        chartGroup.append("g")
            .call(leftAxis);

        var circleGroup = chartGroup.selectAll(".stateCircle")
            .data(dataCSV)
            .enter()
            .append("circle")
            .attr("class", "stateCircle")
            .attr("cx", function (d) {
                return xLinearScale(d.smokes)
            })
            .attr("cy", function (d) {
                return yLinearScale(d.obesity)
            })
            .attr("r", "15")
            .attr("opacity", ".9");

        var circleText = chartGroup.selectAll(".stateText")
            .data(dataCSV)
            .enter()
            .append("text")
            .attr("class", "stateText")
            .attr("x", function (d) {
                return xLinearScale(d.smokes)
            })
            .attr("y", function (d) {
                return yLinearScale(d.obesity)
            })
            .attr('text-anchor', 'middle')
            .attr('alignment-baseline', 'middle')
            .style('font-size', "10")
            .text(function (d) {
                return d.abbr;
            });

        var toolTip = d3.tip()
            .attr("class", "d3-tooltip")
            .offset([80, -60])
            .attr("background-color", "black")
            .html(function (d) {
                return (`${d.state}<br>smokers: ${d.smokes}%<br>obesity: ${d.obesity}%`);
            });
        chartGroup.call(toolTip);
        circleGroup.on("mouseover", function (data) {
                toolTip.show(data, this);
            })
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });
        circleText.on("mouseover", function (data) {
                toolTip.show(data, this);
            })
            .on("mouseout", function (data, index) {
                toolTip.hide(data);
            });

        chartGroup.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left + 40)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .attr("class", "aText")
            .text("Rate of Obesity (%)");
        chartGroup.append("text")
            .attr("transform", `translate(${width / 2}, ${height + margin.top + 30})`)
            .attr("class", "aText")
            .text("Amount of Smokers (%)");
    });
}
makeResponsive();

d3.select(window).on("resize", makeResponsive);


/*
var svgWidth = 960;
var svgHeight = 500;

var margin = {
  top: 20,
  right: 40,
  bottom: 60,
  left: 100
};

var width = svgWidth - margin.left - margin.right;
var height = svgHeight - margin.top - margin.bottom;

var svg = d3.select("#scatter")
  .append("svg")
  .attr("width", svgWidth)
  .attr("height", svgHeight);

var chartGroup = svg.append("g")
  .attr("transform", `translate(${margin.left}, ${margin.top})`);

d3.csv("assets/data/data.csv").then(function(dataCSV) {
    console.log(dataCSV);

    var state = [];
    var healthcare = [];
    var poverty = [];
    var smokers = [];
    var age = [];
    dataCSV.forEach((obs) => {
        Object.entries(obs).forEach(function([key,value]) {
            if (key === "abbr") {
                state.push(value)
            }
            if (key === "healthcare") {
                healthcare.push(value);
            }        
            if (key === "poverty") {
                poverty.push(value);
            }        
            if (key === "smokes") {
                smokers.push(value);
            }        
            if (key === "age") {
                age.push(value);
            }        
        });
    });
    //console.log(state);
    //console.log(healthcare);
    //console.log(poverty);
    //console.log(smokers);
    //console.log(age);

    povertyNum = [];
    poverty.forEach(function(num){
        povertyNum.push(Number(num))
    });
    healthcareNum = [];
    healthcare.forEach(function(num){
        healthcareNum.push(Number(num))
    });

    var dict = {
        state: state,
        poverty: povertyNum,
        healthcare: healthcareNum
    };
    console.log(dict[0]);
    
    var xLinearScale = d3.scaleLinear().
        domain([0, d3.max(dict.poverty)]).
        range([0, width]);
    var yLinearScale = d3.scaleLinear()
        .domain([0, d3.max(dict.healthcare)])
        .range([height, 0]);

    // Step 3: Create axis functions
    // ==============================
    var bottomAxis = d3.axisBottom(xLinearScale);
    var leftAxis = d3.axisLeft(yLinearScale);

    // Step 4: Append Axes to the chart
    // ==============================
    chartGroup.append("g")
      .attr("transform", `translate(0, ${height})`)
      .call(bottomAxis);

    chartGroup.append("g")
      .call(leftAxis);

    // Step 5: Create Circles
    // ==============================
    var circleGroup = chartGroup.selectAll("circle")
    .data(dict)
    .enter()
    .append("circle")
    .attr("cx", xLinearScale(dict.poverty))
    .attr("cy", yLinearScale(dict.healthcare))
    .attr("r", "15")
    .attr("fill", "pink")
    .attr("opacity", ".5");

    console.log(xLinearScale(dict.poverty));
    console.log((dict.poverty).forEach(function(num){xLinearScale(num)}));
    console.log(d3.max(dict, d => d.poverty));
*/

