
let getInfo = document.getElementById("myForm");
function createItem()  {
  localStorage.countryInput = getInfo.value;
}

//page-2
d3.csv('edits.csv').then(function(incomingData){

    let w = 1700;
    let h = 750;
    let padding = 100;
    let inputNumber = localStorage.getItem("editInput");
    let countryInUse = [];

  //stripe shapes
    let viz2 = d3.select("#container-2").append("svg")
        .style("width", w)
        .style("height", h)
        .style("background-color", "white")
        .style("margin-top", "150px")
    ;
  //text note
    var div = d3.select("#container-2").append("div")
      .attr("class", "textNote")
      .style("opacity", 0)
    ;

  //your guess
    var div2 = d3.select("#container-2").append("div")
      .attr("class", "yourGuess")
      .style("opacity", 1)
    ;

  //create option
  let items = Object.keys(incomingData[incomingData.length-1]);
  let countryCode = items[5];
  let form = document.getElementById('myForm');

    for(let j = 0; j < incomingData.length; j++){
      let info = incomingData[j];
      countryInUse.push(info[countryCode]);
      var opt = document.createElement("option");
      var t = document.createTextNode(countryInUse[j]);
      opt.appendChild(t);
      form.appendChild(opt);
    }




  //process data
    let allNames = incomingData.map(function(d){return d.month});
    let xScale = d3.scaleBand()
        .domain(allNames)
        .range([padding, w-padding])
        .paddingInner(0.1)
    ;

    let xAxis = d3.axisBottom(xScale)
    xAxis.tickFormat(d=>{return incomingData.filter(dd=>dd.key==d)[0].month;
    });

    let xAxisGroup = viz2.append("g").classed("xAxis", true);
    xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")")

    // let yMax = d3.max(incomingData, function(d){return d.total});
    let yMax = 6735271;
    yDomain = [0, yMax];
    let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2]);
    let graphGroup = viz2.append("g").classed("graphGroup", true);

    // let colorScale = d3.scaleLinear().domain(yDomain).range([0,255]);

    let elementsForPage = graphGroup.selectAll(".datapoint").data(incomingData);
    //console.log("D3's assessment of whats needed on the page:", elementsForPage);

    let enteringElements = elementsForPage.enter();

    let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);
    enteringDataGroups
      .attr("transform", function(d, i){
        return "translate("+ xScale(d.month)+ "," + (h - padding) + ")"
      })
    ;

  //stripe shape
    enteringDataGroups
      .append("rect")
        .attr("width", function(){
          return xScale.bandwidth();
        })
        .transition()
        .delay(500)
        .duration(1000)
        .attr("height", function(d, i){
          return yScale(d.total);
        })
        .attr("y", function(d,i){
          return -yScale(d.total);
        })
        .attr("fill", "#70baff")
    ;

    enteringDataGroups.select("rect")
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
    ;

  //line chart



  function handleMouseOver(d, i) {  // Add interactivity
      d3.select(this)
        .attr("fill", "#004a8f")
      ;

      div .html(
             "time: "
           + d.month[0]
           + d.month[1]
           + d.month[2]
           + d.month[3]
           + "."
           + d.month[5]
           + d.month[6]
           + " "
           + "edits: "
           + d.total)
         .style('top', h-yScale(d.total)+30 + "px")
         .style('left', xScale(d.month)-30 + "px")
         .style("opacity", 1)
         .attr('id', "t" + "-" + d.total + "-" + i)
      ;
    }

  //your guess line
    viz2.append("line")
      .attr('stroke', '#393b60')
      .attr('stroke-width', "2px")
      .style('position', 'absolute')
      .style('stroke-linecap', "round")
      .style('stroke-dasharray', "5,5")
    ;

    viz2.append("text")
      .text("your guess is here:")
      .style('font-family', 'Noto Serif JP, serif, bold')
      .style('font-size', '20px')
      .attr('x', 150)
      .attr('y', h-yScale(inputNumber)-padding-10)
      .style('top', h-yScale(inputNumber)-padding-10 + "px")
      .style('left', "30px")
      .style('opacity', 0)
    ;

    viz2.select("text")
      .transition()
      .delay(2300)
      .duration(1000)
      .style('opacity', 1)
    ;

    viz2.select("line")
      .attr('y1', h-yScale(inputNumber)-padding)
      .attr('y2', h-yScale(inputNumber)-padding)
      .transition()
      .delay(2500)
      .duration(1000)
      .attr('x1', 140)
      .attr('x2', w-50)

    function handleMouseOut(d, i) {  // Add interactivity
      d3.select(this).attr("fill", "#70baff");
      d3.select("#t" + "-" + d.total + "-" + i).style('opacity', 0);
    }
});
