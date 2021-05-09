
console.log(localStorage.getItem("commentInput"))


//page-5
d3.csv('wwii.csv').then(function(incomingData){

    let w = 1900;
    let h = 1000;
    let padding = 0;
    fontFamily = "Noto Serif JP, serif, bold"
    fontScale = 15;
    let realComments = [];

    let colors = [
      "#e0aaff",
      "#c77dff",
      "#9d4edd",
      "#f2e9e4"
    ]

  //grid
    let viz = d3.select("#container-5")
      .append("svg")
        .style("width", w)
        .style("height", h)
        .style("background-color", "white")
    ;

  //process data
    let items = Object.keys(incomingData[incomingData.length-1]);
    let comments = items[2];
    let user = items[1]
     //console.log(items)
    for(let j = 0; j < incomingData.length; j++){
      let info = incomingData[j];
      realComments.push(info[user]);

    }
    console.log(realComments.length)
    //let test = ["1", "2", "3", "4"... "467"]

  //grid - rect
    viz.selectAll().data(realComments)
      .enter()
      .append("text")
        .attr("x", function(d,i){
          return Math.random() * w
        })
        .attr("y", function(d,i){
          return Math.random() * h;
        })
        .text(realComments)
        .style('font-family', 'Noto Serif JP, serif, bold')
        .style('font-size', '15px')
        .style('color', 'grey')
        .style('opacity', 1)
      ;
    ;

});
