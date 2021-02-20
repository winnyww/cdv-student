console.log("js loaded. hello! ");

// document.getElementById("viz-container");

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id","viz")
    .attr("width", 600)
    .attr("height", 600)
    .style("background-color", "lavender")
;

function randomX(){
 return Math.random() * 600;
}

function randomY(){
 return Math.random() * 400;
}
function randomGroupLocations(){
  let x = Math.random() * 600;
  let y = Math.random() * 400;
  return "translate(" + x + ", " + y + ")";

}

function gotData(incomingData){
  console.log(incomingData);

// viz.selectAll(".food").data(incomingData).enter()
//   .append("rect")
//   .attr("x", randomX)
//   .attr("y", randomY)
//   .attr("height", 20)
//   .attr("width", 20)
//   .attr("class", "food")
// ;
// viz.selectAll(".foodtext").data(incomingData).enter()
//   .append("text")
//   .attr("x", randomX)
//   .attr("y", randomY)
//   .text("food")
//   .attr("fill", "red")
//   .attr("class", foodtext)
// ;

let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
  .append("g")
    .attr("class", "datagroup")
;

datagroups.append("circle")
  .attr("cx", 0)
  .attr("cy", 0)
  .attr("r", 20)
;

datagroups.append("text")
  .attr("x", 0)
  .attr("y", 0)
  .text("HELLO")
;

datagroups.attr("transform", randomGroupLocations);

}

d3.json("data.json").then(gotData);


// current selection is id = viz-container
//<div id = "viz-container"><svg></svg></div>

//
// let myRect = viz.append("line")
//   .attr("x1",200)
//   .attr("y2",250)
//   .attr("y1",300)
//   .attr("y2",350)
// ;
// myRect .attr("stroke", "red")
// myRect .attr("stroke-width", 30)

// let myData = [2,3,6,9,1];
//
function justChecking(datapoint){
  return Math.random()*400;
}

function chooseColor(datapoint){
  if(datapoint == gotData[0]){
  return "blue";
  }
}
//
// for (let i = 1; i < 4; i++){ no need for loop, d3 does loop for you
