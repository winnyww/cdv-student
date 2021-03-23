// just some console.logging at the start to make
// sure the script runs and we have data (from dataManager.js)
console.log("\n\n\nWelcome!\n\n\n");
console.log("script runs.");
console.log("do we have data?");
// check if variable exists: https://stackoverflow.com/a/519157
console.log("data:", typeof data!=='undefined'?data:"nothing here");
console.log(typeof data!=='undefined'?"seems like it ;-) it comes from the dataManager.js script.":"...damnit! let's see what is going wrong in the dataManager.js script.");

let color = [
  "#b7e4c7",
  "#95d5b2",
  "#74c69d",
  "#52b788",
  "#40916c",
  "#2d6a4f",
  "#1b4332",
  "#081c15"
]

let clickcount = 0;

function add(){
  addDatapoints(1);

  if (clickcount > color.length-3){
    clickcount = 0;
  } else {
    clickcount++;
  }

    elementsForPage = graphGroup.selectAll(".datapoint").data(data);

    enteringElements = elementsForPage.enter();
 allNames = data.map(function(d){return d.key});
 xScale.domain(allNames);

 xAxis = d3.axisBottom(xScale);
 xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
 xAxisGroup.selectAll("line").remove();

 yMax = d3.max(data, function(d){return d.value});
 yDomain = [0, yMax+yMax*0.1];
 yScale.domain(yDomain);

 xAxisGroup.transition().delay(200).call(xAxis).selectAll("text").attr("font-size", 18);
 xAxisGroup.selectAll("line").remove();

 elementsForPage.transition().delay(200).duration(500).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
 });

 elementsForPage.select("rect")
  .transition()
  .delay(200)
  .duration(500)
  .attr("width", function(){
     return xScale.bandwidth();
  })
  .attr("y", function(d,i){
    return -yScale(d.value);
  })
  .attr("height", function(d, i){
    return yScale(d.value);
  })
  .attr("fill", color[clickcount+1])
 ;


    let incomingDataGroups = enteringElements.append("g").classed("datapoint", true);
    incomingDataGroups.attr("transform", function(d, i){
      return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
    });

    incomingDataGroups
      .append("rect")
        .attr("y", function(d,i){
          return 0;
        })
        .attr("height", function(d, i){
          return 0;
        })
        .attr("width", function(){
          return xScale.bandwidth();
        })
        .attr("fill", color[clickcount])
        .transition()
        .delay(500)
        .duration(1000)
        .attr("y", function(d,i){
          return -yScale(d.value);
        })
        .attr("height", function(d, i){
          return yScale(d.value);
        })
        .attr("fill", color[clickcount+1])
     ;

}
document.getElementById("buttonA").addEventListener("click", add);

function remove(){
  removeDatapoints(1);

  if (clickcount > color.length-3){
    clickcount = 0;
  } else {
    clickcount++;
  }

    elementsForPage = graphGroup.selectAll(".datapoint").data(data,function(d){return d.key});
    enteringElements = elementsForPage.enter();
    exitingElements = elementsForPage.exit();

    exitingElements
      .select("rect")
        .attr("fill", color[clickcount])
        .transition()
        .delay(300)
        .duration(600)
        .attr("y", function(d,i){
          return 0;
        })
        .attr("height", function(d, i){
          return 0;
        })
        .remove();
     ;
   exitingElements.transition().delay(1000).remove();

   allNames = data.map(function(d){return d.key});
   xScale.domain(allNames);

   xAxis = d3.axisBottom(xScale); //we adjust this because it uses the new xScale
   xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;}); // we adjust this because it uses the new data
   xAxisGroup.call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page

   yMax = d3.max(data, function(d){return d.value});
   yDomain = [0, yMax+yMax*0.1];
   yScale.domain(yDomain);

   xAxisGroup.transition().call(xAxis).selectAll("text").attr("font-size", 18); // we adjust this to bring the new axis onto the page

   elementsForPage.transition().delay(200).duration(1000).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
   });

     elementsForPage.select("rect")
     .transition()
      .delay(200)
      .duration(200)
      .attr("width", function(){
         return xScale.bandwidth();
      })
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("fill", color[clickcount+1])
     ;


}
document.getElementById("buttonB").addEventListener("click", remove);

function removeAndAdd(){
  removeAndAddDatapoints(1,1);

  if (clickcount > color.length-3){
    clickcount = 0;
  } else {
    clickcount++;
  }

  elementsForPage = graphGroup.selectAll(".datapoint").data(data, function(d){
    return d.name;
  });

  exitingElements = elementsForPage.exit();
  enteringElements = elementsForPage.enter();

  exitingElements
    .select("rect")
      .attr("fill", color[clickcount])
      .transition()
      .delay(300)
      .duration(600)
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .remove();
   ;
 exitingElements.transition().delay(1000).remove();


  allNames = data.map(function(d){return d.key});
  xScale.domain(allNames);

  xAxis = d3.axisBottom(xScale);
  xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
  xAxisGroup.selectAll("line").remove();

  yMax = d3.max(data, function(d){return d.value});
  yDomain = [0, yMax+yMax*0.1];
  yScale.domain(yDomain);

  xAxisGroup.transition().delay(1000).call(xAxis).selectAll("text").attr("font-size", 18);
  xAxisGroup.selectAll("line").remove();

  elementsForPage.transition().delay(1000).duration(500).attr("transform", function(d, i){
      return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });

  elementsForPage.select("rect")
  .transition()
   .delay(200)
   .duration(200)
   .attr("width", function(){
      return xScale.bandwidth();
   })
   .attr("y", function(d,i){
     return -yScale(d.value);
   })
   .attr("height", function(d, i){
     return yScale(d.value);
   })
   .attr("fill", color[clickcount+1])
  ;

  let incomingDataGroups = enteringElements
    .append("g")
      .classed("datapoint", true)
  ;

  incomingDataGroups.attr("transform", function(d, i){
    return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
  });

  incomingDataGroups
    .append("rect")
      .attr("y", function(d,i){
        return 0;
      })
      .attr("height", function(d, i){
        return 0;
      })
      .attr("width", function(){
        return xScale.bandwidth();
      })
      .attr("fill", color[clickcount])
      .transition()
      .delay(500)
      .duration(1000)
      .attr("y", function(d,i){
        return -yScale(d.value);
      })
      .attr("height", function(d, i){
        return yScale(d.value);
      })
      .attr("fill", color[clickcount+1])
   ;
}
document.getElementById("buttonC").addEventListener("click", removeAndAdd);

function sortData(){
  sortDatapoints();

  elementsForPage = graphGroup.selectAll(".datapoint").data(data, function(d){
    return d.name;
  });

  enteringElements = elementsForPage.enter();
 allNames = data.map(function(d){return d.key});
 xScale.domain(allNames);

 xAxis = d3.axisBottom(xScale);
 xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
 xAxisGroup.selectAll("line").remove();

 yMax = d3.max(data, function(d){return d.value});
 yDomain = [0, yMax+yMax*0.1];
 yScale.domain(yDomain);

 xAxisGroup.transition().delay(200).call(xAxis).selectAll("text").attr("font-size", 18);
 xAxisGroup.selectAll("line").remove();

 elementsForPage.transition().delay(200).duration(500).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
 });

 elementsForPage.select("rect")
  .transition()
  .delay(200)
  .duration(500)
  .attr("width", function(){
     return xScale.bandwidth();
  })
  .attr("y", function(d,i){
    return -yScale(d.value);
  })
  .attr("height", function(d, i){
    return yScale(d.value);
  })
 ;
}
document.getElementById("buttonD").addEventListener("click", sortData);

function shuffleData(){
  shuffleDatapoints();

  elementsForPage = graphGroup.selectAll(".datapoint").data(data, function(d){
    return d.name;
  });

 enteringElements = elementsForPage.enter();
 allNames = data.map(function(d){return d.key});
 xScale.domain(allNames);

 xAxis = d3.axisBottom(xScale);
 xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
 xAxisGroup.selectAll("line").remove();

 yMax = d3.max(data, function(d){return d.value});
 yDomain = [0, yMax+yMax*0.1];
 yScale.domain(yDomain);

 xAxisGroup.transition().delay(200).call(xAxis).selectAll("text").attr("font-size", 18);
 xAxisGroup.selectAll("line").remove();

 elementsForPage.transition().delay(200).duration(500).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
 });

 elementsForPage.select("rect")
  .transition()
  .delay(200)
  .duration(500)
  .attr("width", function(){
     return xScale.bandwidth();
  })
  .attr("y", function(d,i){
    return -yScale(d.value);
  })
  .attr("height", function(d, i){
    return yScale(d.value);
  })
 ;
}
document.getElementById("buttonE").addEventListener("click", shuffleData);

function noData(){

  if (clickcount > color.length-3){
    clickcount = 0;
  } else {
    clickcount++;
  }

  elementsForPage = graphGroup.selectAll(".datapoint").data(data, function(d){
    return d.name;
  });

 enteringElements = elementsForPage.enter();
 allNames = data.map(function(d){return d.key});
 xScale.domain(allNames);

 xAxis = d3.axisBottom(xScale);
 xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});
 xAxisGroup.selectAll("line").remove();

 yMax = d3.max(data, function(d){return d.value});
 yDomain = [0, yMax+yMax*0.1];
 yScale.domain(yDomain);

 xAxisGroup.transition().delay(200).call(xAxis).selectAll("text").attr("font-size", 18);
 xAxisGroup.selectAll("line").remove();

 elementsForPage.transition().delay(200).duration(500).attr("transform", function(d, i){
     return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
 });

let number = Math.random(5)*300;

 elementsForPage.select("rect")
  .transition()
  .duration(100)
  .attr("width", function(d,i){
    return xScale.bandwidth();
  })
  .attr("y", function(d,i){
    return -50;
  })
  .attr("height", function(d, i){
    return 0;
  })
  .transition()
  .delay(200)
  .duration(500)
  .attr("y", function(d,i){
    return -yScale(d.value);
  })
  .attr("height", function(d, i){
    return yScale(d.value);
  })
  .attr("fill", color[clickcount])
 ;
}
document.getElementById("buttonF").addEventListener("click", noData);
// global variables that we need at various spots:
let w = 800;
let h = 500;
let padding = 50;

// put the svg onto the page:
let viz = d3.select("#container")
  .append("svg")
    .style("width", w)
    .style("height", h)
;

let allNames = data.map(function(d){return d.key});

let xScale = d3.scaleBand()
    .domain(allNames)
    .range([padding, w-padding])
    .paddingInner(0.1)
;

let xAxis = d3.axisBottom(xScale)
xAxis.tickFormat(d=>{return data.filter(dd=>dd.key==d)[0].name;});

let xAxisGroup = viz.append("g").classed("xAxis", true);
xAxisGroup.call(xAxis);
xAxisGroup.selectAll("text").attr("font-size", 24).attr("y", 9);
xAxisGroup.selectAll("line").remove();
xAxisGroup.attr("transform", "translate(0,"+ (h-padding) +")")


let yMax = d3.max(data, function(d){return d.value});
yDomain = [0, yMax];
let yScale = d3.scaleLinear().domain(yDomain).range([0, h-padding*2]);
let graphGroup = viz.append("g").classed("graphGroup", true);

let elementsForPage = graphGroup.selectAll(".datapoint").data(data);
console.log("D3's assessment of whats needed on the page:", elementsForPage);

let enteringElements = elementsForPage.enter();
let exitingElements = elementsForPage.exit();

let enteringDataGroups = enteringElements.append("g").classed("datapoint", true);
enteringDataGroups.attr("transform", function(d, i){
  return "translate("+ xScale(d.key)+ "," + (h - padding) + ")"
});

enteringDataGroups
  .append("rect")
    .attr("width", function(){
      return xScale.bandwidth();
    })
    .attr("height", function(d, i){
      return yScale(d.value);
    })
    .attr("y", function(d,i){
      return -yScale(d.value);
    })
    .attr("fill", color[0])
;
