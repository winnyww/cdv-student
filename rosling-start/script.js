console.log("hi");
//data from https://towardsdatascience.com/how-to-build-animated-charts-like-hans-rosling-doing-it-all-in-r-570efc6ba382

let w = 800;
let h = 800;
let xPadding = 50;
let yPadding = 50;

let viz = d3.select("#container")
  .append("svg")
    .attr("width", w+200)
    .attr("height", h+200)
    .style("background-color", "white")
;

viz.append("rect")
  .attr("width", w/2)
  .attr("height", h/2)
  .style("fill", "lightgreen")
  .attr('transform', 'translate(' + w/2 + ',' + 0 + ')')
;

viz.append("rect")
  .attr("width", w/2)
  .attr("height", h/2)
  .style("fill", "lightyellow")
  .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
;

viz.append("rect")
  .attr("width", w/2)
  .attr("height", h/2)
  .style("fill", "lightpink")
  .attr('transform', 'translate(' + 0 + ',' + h/2 + ')')
;

viz.append("rect")
  .attr("width", w/2)
  .attr("height", h/2)
  .style("fill", "lightblue")
  .attr('transform', 'translate(' + w/2 + ',' + h/2 + ')')
;

viz.append("text")
  .attr("fill", "white")
  .text("Performance")
  .attr("font-family", "sans-serif")
  .attr("font-size", "1.5em")
  .attr('font-style', 'italic')
  .attr('transform', 'translate(' + w/5*4 + ',' + yPadding + ')')
  .style('position', 'absolute')
;

viz.append("text")
  .attr("fill", "grey")
  .text("Survival")
  .attr("font-family", "sans-serif")
  .attr("font-size", "1.5em")
  .attr('font-style', 'italic')
  .attr('transform', 'translate(' + xPadding + ',' + yPadding + ')')
  .style('position', 'absolute')
;

viz.append("text")
  .attr("fill", "white")
  .text("Burn-out")
  .attr("font-family", "sans-serif")
  .attr("font-size", "1.5em")
  .attr('font-style', 'italic')
  .attr('transform', 'translate(' + xPadding + ',' + h/15*14 + ')')
  .style('position', 'absolute')
;

viz.append("text")
  .attr("fill", "grey")
  .text("Renewal")
  .attr("font-family", "sans-serif")
  .attr("font-size", "1.5em")
  .attr('font-style', 'italic')
  .attr('transform', 'translate(' + w/5*4 + ',' + h/15*14 + ')')
  .style('position', 'absolute')
;

function gotData(incomingData){


  // min max fertility rate (for xScale)
  // let positivityExtent = d3.min(incomingData, function(d, i){
  //   return d.Energy;
  // });

  // make the xscale which we use to locate points along the xaxis
  let xScale = d3.scaleLinear().domain([-5, 5]).range([xPadding, w-xPadding]);


  // min max life expectancy
  // let energyExtent = d3.extent(incomingData, function(d, i){
  //   return d.Positivity;
  // });

  // make the yscale which we use to locate points along the yaxis
  let yScale = d3.scaleLinear().domain([-5, 5]).range([h-yPadding, yPadding]);

  // using the function defined at the bottom of this script to build two axis
  buildXAndYAxis(xScale, yScale);


  // // min max Population
  // let numberExtent = d3.extent(incomingData, function(d, i){
  //   return d[i].dataPoint;
  // });
  //console.log("popExtent", popExtent);
  // you may use this scale to define a radius for the circles
  let colorScale = d3.scaleLinear().domain([-5, 5]).range([0, 255]);

  //console.log(incomingData.Note)

  // the simple out put of this complicated bit of code,
  // is an array of all the years the data talks about.
  // the "dates" array looks like:
  // ["1962", "1963", "1964", "1965", ... , "2012", "2013", "2014", "2015"]
  let dates = incomingData.reduce(function(acc,d,i){
    if(!acc.includes(d.dataPoint)){
      acc.push(d.dataPoint)
    }
    return acc
  }, [])

  //console.log("dates", dates);

  // this block of code is needed to select a subsection of the data (by year)
  let currentYearIndex = 0;
  let currentYear = dates[currentYearIndex];
  let sideText = incomingData[currentYearIndex].Note;

  function filterYear(d, i){
    if(d.dataPoint == currentYear){
      return true;
    }else{
      return false;
    }
  }


  // make a group for all things visualization:
  let vizGroup = viz.append("g").attr("class", "vizGroup");

  // this function is called every second.
  // inside it is a data variable that always carries the "latest" data of a new year
  // inside it we want to draw shapes and deal with both updating and entering element.


  function drawViz(){

    let currentYearData = incomingData.filter(filterYear);
    //console.log("---\nthe currentYearData array now carries the data for year", currentYear);
    // Below here is where your coding should take place! learn from lab 6:
    // https://github.com/leoneckert/critical-data-and-visualization-spring-2020/tree/master/labs/lab-6
    // the three steps in the comments below help you to know what to aim for here

    // bind currentYearData to elements

    let datagroups = vizGroup.selectAll('.datagroup').data(currentYearData).enter()
          .append('g')
            .attr('class', 'datagroup')
        ;

    let enteringElemnts = vizGroup.selectAll('.datagroup');

    // function getColor(d,i){
    //   if (d.continent == "Asia"){
    //     return 'red';
    //   } else if (d.continent == "Europe"){
    //     return 'blue';
    //   } else if (d.continent == "Africa"){
    //     return 'brown';
    //   } else if (d.continent == "Americas"){
    //     return 'green';
    //   } else if (d.continent == "Oceania"){
    //     return 'yellow';
    //   }
    // }

    enteringElemnts.append('circle')
      .attr('r', "10")
      .attr('fill', 'black')
    ;

      let number = enteringElemnts.append('text')
          .attr('x', 13)
          .attr('y', 10)
          .attr('font-family', 'sans-serif')
          .attr('font-size', '1.3em')
          .attr('fill', 'black')
        ;

      let text =  viz.append("text")
            .attr("x", 100)
            .attr("y", 830)
            .attr("font-family", "sans-serif")
            .attr("font-size", "1.6em")
            .attr("fill", "black")
        ;



    // let test = "<text>🏃</text>";
    // enteringElemnts
    //   .html("<text>🏃</text>")
    //   .attr('font-size', '3em')
    //   //.html(currentYear)
    //   ;




    function getIncomingGroupLocation(d, i){
      let x = xScale(d.Energy);
      let y = yScale(d.Positivity);
      return 'translate(' + x + ',' + y + ')';
    }

    function getColor(d,i){
         let x = colorScale(d.Energy);
         let y = colorScale(d.Positivity);
        return 'rgb(' + x + ',' + y +',100)';
        //return "rbg(" colorScale(d.Energy) + ",100," + colorScale(d.Positivity) + ")";
    }

      enteringElemnts
        .transition()
        .attr('transform', getIncomingGroupLocation)
      ;

      text
        .transition()
        .text(sideText)
        .duration(3000)
        .remove()
      ;

      number
        .transition()
        .text(currentYear)
        .duration(3000)
        .remove()
      ;



  }


  // this called the drawViz function every second
  // and changes the year of interest
  // and updates the text element that displays the year.
  setInterval(function(){
    if(currentYearIndex>dates.length){
      currentYearIndex = 0;
    }
    currentYear = dates[currentYearIndex];
    sideText = incomingData[currentYearIndex].Note;
    // year.text(currentYear)
    drawViz();
    currentYearIndex++;
  }, 3000);






}


// load data
d3.csv("text.csv").then(gotData);






// function to build x anc y axis.
// the only reasons these are down here is to make the code above look less polluted

function buildXAndYAxis(xScale, yScale){
  let xAxisGroup = viz.append("g").attr("class", 'xaxis');
  let xAxis = d3.axisBottom(xScale);
  xAxisGroup.call(xAxis)
  xAxisGroup.attr("transform", "translate(0, "+ h/2 +")")
  xAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate("+(w-xPadding)+", 40)")
    .append("text")
    .attr("fill", "black")
    .text("Positivity")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;

  let yAxisGroup = viz.append("g").attr("class", 'yaxis');
  let yAxis = d3.axisLeft(yScale);
  yAxisGroup.call(yAxis)
  yAxisGroup.attr("transform", "translate("+w/2+", 0)")

  yAxisGroup.append("g").attr('class', 'xLabel')
    .attr("transform", "translate(-33, "+ yPadding+") rotate(-90)")
    .append("text")
    .attr("fill", "black")
    .text("Energy")
    .attr("font-family", "sans-serif")
    .attr("font-size", "1.7em")

  ;
}
