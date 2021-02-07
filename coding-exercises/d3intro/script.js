console.log("js loaded. hello! ");

// document.getElementById("viz-container");

let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id","viz")
    .attr("width", 600)
    .attr("height", 600)
;

function seven(){
  return 7
}

let a = seven(); //store the

// current selection is id = viz-container
//<div id = "viz-container"><svg></svg></div>
