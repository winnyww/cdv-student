console.log("js loaded. hello! ");

// document.getElementById("viz-container");

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id","viz")
    .attr("width", 600)
    .attr("height", 600)
;

d3.json("data.json").then(gotData);

function gotData(incomingData){

  viz.selectAll("circle").data(incomingData).enter().append("circle")
    .attr("cx", justChecking)
    .attr("cy", 200)
    .attr("r", 20)
    .attr("fill", chooseColor)
  ;

}

console.log(gotData);


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
