d3.json("births.json").then(gotData);


let w = 900;
let h = 500;
let xpadding = 100;
let ypadding = 50;
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
    .style("outline", "solid black")
;

let count = 0;
let data = [];
let dataChina = [];



function gotData(incomingData){
  // the following function is defined below
  // it allows for us to NOT WORRY about parsing
  // time strings and creating JS date objects
  // in the following script
  incomingData = fixJSDateObjects(incomingData);
   console.log(incomingData);


  // temporarily flatten data to get the minima/maxima:
  let flatData = d3.merge(incomingData)
  // we can use a  time scale because our data expresses
  // years in the form of JS date objects
  let xDomain = d3.extent(flatData, function(d){ return d.year });
  let xScale = d3.scaleTime().domain(xDomain).range([xpadding, w-xpadding]);
  let xAxis = d3.axisBottom(xScale);
  let xAxisGroup = viz.append("g")
      .attr("class", "xaxisgroup")
      .attr("transform", "translate(0,"+(h-ypadding)+")")
  ;
  xAxisGroup.call(xAxis);

  let yMax = d3.max(flatData, function(d){
    return d.birthsPerThousand;
  })
  let yDomain = [0, yMax];
  let yScale = d3.scaleLinear().domain(yDomain).range([h-ypadding, ypadding]);
  let yAxis = d3.axisLeft(yScale);
  let yAxisGroup = viz.append("g")
      .attr("class", "yaxisgroup")
      .attr("transform", "translate("+(xpadding/2)+",0)")
  ;
  yAxisGroup.call(yAxis);

  let graphGroup = viz.append("g").attr("class", "graphGroup");

  let lineMaker = d3.line()
    .x(function(d,i){
      return xScale(d.year);
    })
    .y(function(d,i){
      return yScale(d.birthsPerThousand);
    })
  ;


  function draw(incomingData){


    if (count == 1){
      graphGroup.selectAll('.line').data(incomingData).enter()
        .append('path')
        .attr('d', lineMaker)
        .attr('fill', 'none')
        .attr('stroke', 'black')
        .attr('stroke-width', 5)
        .attr('stroke', function(d,i){
          if (d[0].country === "United States"){
            return 'blue';
            console.log(d[0])
          } else {
            return 'red';
          }
        })
        .attr("class", "line")
        console.log()
      ;

    } else {
      graphGroup.selectAll('.line').data(incomingData)
        .transition()
        .duration(500)
        .attr('d', lineMaker)
        .attr('stroke', function(d,i){
          if (d[0].country === "United States"){
            return 'blue';
          } else {
            return 'red';
          }
        })
      ;
      console.log("good")
      console.log(incomingData)
    }
  }

  d3.select("#china").on("click", function(){
    count++;
    data = [];
    data.push(incomingData[1]);
    draw(data);
  });
  d3.select("#usa").on("click", function(){
    count++;
    data = [];
    data.push(incomingData[0]);
    draw(data);
  });

}

// function that turns all datapoints year values
// into JS date objects in the very beginning
// so that WE DON'T HAVE TO DEAL WITH IT LATER
function fixJSDateObjects(dataToFix){
  // timeParser
  let timeParse = d3.timeParse("%Y");
  return dataToFix.map(function(data){
    return data.map(function(d){
      return {
        "country": d.country,
        "year": timeParse(d.year),
        "birthsPerThousand": d.birthsPerThousand
      }
    })
  });
}
