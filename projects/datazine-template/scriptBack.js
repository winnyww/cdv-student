// <---------the cavans is here-------->
let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
    //.style("background-color", "#001233")
    .style("background-image", "url('pic/2.jpg')")
;


function circleSize(d,i){
  return 300 + i*20;
}

let sampleColor = [
  "#d5aca9",
  "#bbd0ff",
  "#1a759f",
  "#ffe6a7",
  "#d6e2e9",
  "#a4c3b2",
  "#d5aca9",
  "#bbd0ff",
  "#1a759f",
  "#ffe6a7",
  "#d6e2e9",
]

function circleColor(d,i){
  return sampleColor[i];
}

function arrowPosition1(){
  var x = 600 - Math.cos(0.5)* 300;
  var y = 400 - Math.sin(0.5)* 300;
  return "translate(" + x + "," + y + ")" + "rotate(-80)";
}

function arrowPosition2(){
  var x = 600 - Math.cos(2.5)* 300;
  var y = 400 - Math.sin(2.5)* 300;
  return "translate(" + x + "," + y + ")" + "rotate(-90)";
}

function arrowPosition3(){
  var x = 600 - Math.cos(-1.5)* 300;
  var y = 400 - Math.sin(-1.5)* 300;
  return "translate(" + x + "," + y + ")" + "rotate(-80)";
}

var countY = 0;
var countZ = 0;

function groupLocations2(incomingData){
  if (countY > 5){
  countY = 0;
}
  let x = 450;
  let y = 230 + countY * 20;
  countY++;
  return "translate(" + x + ", " + y + ")";
}

function groupLocationsText(incomingData){
  if (countZ > 5){
  countZ = 0;
  }
  let x = 500;
  let y = 230  + countZ * 20;
  countZ++;
  return "translate(" + x + ", " + y + ")";
}

let sampleColor2 = [
  "#d5aca9",
  "#bbd0ff",
  "#1a759f",
  "#ffe6a7",
  "#d6e2e9",
  "#a4c3b2",
  "#d5aca9"
]

var b = 0;
var c = 0;

function groupColor2(incomingData){
  if(c > 5){
    c = 0;
  }
  c++;
  return sampleColor2[c];
}

let names = [
"stranger",
"boyfriend",
"Zoomer",
"nobody",
"friend",
"manypeople"
]

function groupText(incomingData, i){
    return names[i];
}

let shapes = [//17
  d3.symbolCross,
  d3.symbolCircle,
  d3.symbolDiamond,
  d3.symbolSquare,
  d3.symbolStar,
  d3.symbolTriangle,
  d3.symbolCross,
  d3.symbolDiamond,
  d3.symbolSquare,
  d3.symbolWye,
  d3.symbolStar,
  d3.symbolTriangle,
  d3.symbolCross,
  d3.symbolDiamond,
  d3.symbolSquare,
  d3.symbolStar,
  d3.symbolSquare
]

let shapeColor = [//17
  "#fec5bb",
  "#fcd5ce",
  "#fae1dd",
  "#f8edeb",
  "#e8e8e4",
  "#d8e2dc",
  "#ece4db",
  "#ffe5d9",
  "#ffd7ba",
  "#fec89a",
  "#abc4ff",
  "#b6ccfe",
  "#c1d3fe",
  "#ccdbfd",
  "#d7e3fc",
  "#e2eafc",
  "#edf2fb"
]

var shapeCount1 = 0;

function drawAppShape(){

  var symbolGenerator = d3.symbol()
    .type(shapes[shapeCount1])
    .size(160)
    ;

if (shapeCount1 < 17){
  shapeCount1++;
  var pathData = symbolGenerator();
  return pathData;
}
console.log(shapeCount1);
}


var yanse = 0;

function drawColor(d,i){
  if (yanse > 15){
    yanse = 0;
  }
  yanse++;
  return shapeColor[yanse];
}

var row = 0;
var col = 0;

function appLocations(d,i){
  if (col > 4){
    col = 0;
    row++;
  }
let x = 410 + col * 87;
let y = 530  + row * 25;
col++;
return "translate(" + x + ", " + y + ")";
}

let text = [
  "Eleme",
  "Wechat text",
  "Social media",
  "taobao",
  "Chrome",
  "pictures",
  "Wechat  moments",
  "nothing",
  "calendar",
  "time",
  "lockscreen",
  "Duo app",
  "date",
  "wallpaper",
  "my reflection",
  "nothing really",
  "I forgot what I wanted to check"
]

function appText(incomingData, i){
    return text[i];
}

var row2 = 0;
var col2 = 0;

function groupAppText(d,i){
  if (col2 > 4){
    col2 = 0;
    row2++;
  }
let x = 423 + col2 * 87;
let y = 531  + row2 * 25;
col2++;
return "translate(" + x + ", " + y + ")";
}


function drawShape1(incomingData){
var lineGenerator = d3.line();
var points = [
    [610, 230],
    [630, 220],
    [650, 230],
    [670, 220],
    [690, 230],
    [710, 220],
    [730, 230],
    [750, 220]
];

var line = lineGenerator(points);
return line;
}

function drawShape2(incomingData){
var lineGenerator = d3.line();
var points = [
    [610, 260],
    [620, 270],
    [630, 260],
    [640, 270],
    [650, 260],
    [660, 270],
    [670, 260],
    [680, 270],
    [690, 260],
    [700, 270],
    [710, 260],
    [720, 270],
    [730, 260],
    [740, 270],
    [750, 260],
];

var line = lineGenerator(points);
return line;
}

function drawShape3(incomingData){
var lineGenerator = d3.line();
var points = [
  [610, 300],
  [615, 310],
  [620, 300],
  [625, 310],
  [630, 300],
  [635, 310],
  [640, 300],
  [645, 310],
  [650, 300],
  [655, 310],
  [660, 300],
  [665, 310],
  [670, 300],
  [675, 310],
  [680, 300],
  [685, 310],
  [690, 300],
  [695, 310],
  [700, 300],
  [705, 310],
  [710, 300],
  [715, 310],
  [720, 300],
  [725, 310],
  [730, 300],
  [735, 310],
  [740, 300],
  [745, 310],
  [750, 300],
];

var line = lineGenerator(points);
return line;
}

function drawShape4(incomingData){
var lineGenerator = d3.line();
var points = [
  [610, 340],
  [620, 350],
  [630, 340],
  [640, 350],
  [650, 340],
  [660, 350],
  [670, 340],
  [680, 350],
  [690, 340],
  [700, 350],
  [710, 340],
  [720, 350],
  [730, 340],
  [740, 350],
  [750, 340],
];

var line = lineGenerator(points);
return line;
}

// <---------drawing here-------->

function gotData(incomingData){

  let datagroups = viz.selectAll(".datagroup").data(incomingData).enter()
    .append("g")
      .attr("class", "datagroup")
  ;

  datagroups.append("circle")
    .attr("cx", 600)
    .attr("cy", 400)
    .attr("r", circleSize)
    .attr("stroke", circleColor)
    .attr('stroke-width', 2)
    .attr('fill', "none")
  ;

  datagroups.append('rect')
    .attr('x', 0)
    .attr('y', 360)
    .attr('width', 1200)
    .attr('height', 80)
    // .attr('stroke', 'black')
    .attr('fill', 'black')
    .style('position', 'absolute')
    //.attr('transform', 'translate(1200 390) rotate(-45)')
  ;

  datagroups.append('rect')
    .attr('x', 850)
    .attr('y', 400)
    .attr('width', 335)
    .attr('height', 1)
    .attr('fill', 'white')
    .style('position', 'fixed')
  ;

  var symbolGenerator = d3.symbol()
    .type(d3.symbolTriangle)
    .size(80)
    ;

  var pathData = symbolGenerator();

  datagroups.append("path")
    .attr("d", pathData)
    .style("fill", "white")
    .attr('transform', 'translate(1190, 400) rotate(90)')
  ;

  datagroups.append("path")
    .attr('transform', arrowPosition1)
    .attr("d", pathData)
    .style("fill", "#d5aca9")
  ;

  datagroups.append("path")
    .attr('transform', arrowPosition2)
    .attr("d", pathData)
    .style("fill", "#d5aca9")
  ;

  datagroups.append("path")
    .attr('transform', arrowPosition3)
    .attr("d", pathData)
    .style("fill", "#d5aca9")
  ;

  datagroups.append('text')
    .attr("x", 900)
    .attr("y", 400)
    .text("C h r o n o l o g i c a l")
    .style("font-size",20)
    .style("fill", "white")
    .style("text-aligh", "center")
    .style('text-shadow', ' 2px 2px brown')
  ;

  datagroups.append('text')
    .attr("x", 1090)
    .attr("y", 400)
    .text("O r d e r")
    .style("font-size",20)
    .style("fill", "white")
    .style("text-aligh", "center")
    .style('text-shadow', ' 2px 2px brown')
  ;

  datagroups.append('text')
    .attr("x", 100)
    .attr("y", 380)
    .text("Apps I Wanted to Check")
    .style("font-size",20)
    .style("fill", "white")
    .style("text-aligh", "center")
    .style('text-shadow', ' 2px 4px darkgreen')
  ;

  datagroups.append('text')
    .attr("x", 100)
    .attr("y", 425)
    .text("Apps I Ended Up Checking")
    .style("font-size",20)
    .style("fill", "white")
    .style("text-aligh", "center")
    .style('text-shadow', ' 2px 4px darkgreen')
  ;

  datagroups.append('text')
    .attr("x", 430)
    .attr("y", 200)
    .text("who was I with")
    .style("font-size",17)
    .style("fill", "white")
    .style("text-aligh", "center")
    .style('text-shadow', ' 2px 2px purple')
  ;

  datagroups.append("circle")
    .attr("cx", 0)
    .attr("cy", 0)
    .attr("r", 15)
    .attr("fill", groupColor2)
    .attr("transform", groupLocations2)
  ;

  datagroups.append("text")
    .attr("x", -20)
    .attr("y", 0)
    .text(groupText)
    .style("font-size",10)
    .style("fill", "white")
    .style("text-aligh", "center")
    .attr("transform", groupLocationsText);
  ;

  datagroups.append('text')
    .attr("x", 610)
    .attr("y", 198)
    .text("how much time I spent")
    .style("font-size",17)
    .style("fill", "white")
    .style("text-aligh", "center")
      .style('text-shadow', ' 2px 2px purple')
  ;

  datagroups.append('text')
    .attr("x", 770)
    .attr("y", 230)
    .text("5s")
    .style("font-size",12)
    .style("fill", "white")
    .style("text-aligh", "center")
  ;

  datagroups.append('text')
    .attr("x", 770)
    .attr("y", 270)
    .text("60s")
    .style("font-size",12)
    .style("fill", "white")
    .style("text-aligh", "center")
  ;

  datagroups.append('text')
    .attr("x", 770)
    .attr("y", 310)
    .text("180s")
    .style("font-size",11)
    .style("fill", "white")
    .style("text-aligh", "center")
  ;

  datagroups.append('text')
    .attr("x", 770)
    .attr("y", 340)
    .text("dash means")
    .style("font-size",12)
    .style("fill", "white")
    .style("text-aligh", "center")
  ;

  datagroups.append('text')
    .attr("x", 770)
    .attr("y", 355)
    .text("didn't unlock phone")
    .style("font-size",12)
    .style("fill", "white")
    .style("text-aligh", "center")
  ;

  datagroups.append("path")
    // .style("stroke-dasharray", dashOrNot)
    .attr("d", drawShape1)
    // .attr("transform", groupLocations)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", "none")
    .attr("opacity", 1)
  ;

  datagroups.append("path")
    // .style("stroke-dasharray", dashOrNot)
    .attr("d", drawShape2)
    // .attr("transform", groupLocations)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", "none")
    .attr("opacity", 1)
  ;

  datagroups.append("path")
    // .style("stroke-dasharray", dashOrNot)
    .attr("d", drawShape3)
    // .attr("transform", groupLocations)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", "none")
    .attr("opacity", 1)
  ;

  datagroups.append("path")
    .style("stroke-dasharray", 3)
    .attr("d", drawShape4)
    // .attr("transform", groupLocations)
    .attr("stroke", "white")
    .attr("stroke-width", 1)
    .attr("fill", "none")
    .attr("opacity", 1)
  ;


  datagroups.append('text')
    .attr("x", 540)
    .attr("y", 500)
    .text("what are the apps")
    .style("font-size",17)
    .style("fill", "white")
    .style("text-aligh", "center")
    .style('text-shadow', ' 2px 3px purple')
  ;

  datagroups.append("path")
    .attr("d", drawAppShape)
    .style("fill", drawColor)
    .attr("transform", appLocations)
  ;

  datagroups.append("text")
    .attr("x", 0)
    .attr("y", 0)
    .text(appText)
    .style("font-size",10)
    .style("fill", "white")
    .style("text-aligh", "center")
    .attr("transform", groupAppText);
  ;

  datagroups.append('text')
    .attr("x", 480)
    .attr("y", 420)
    .text("HOW TO READ")
    .style("font-size", 40)
    .style("fill", "white")
    .style('text-shadow', ' 4px 6px blue')
    .style("text-aligh", "center")
  ;


}







// <-------import dataset---------->
d3.json("data.json").then(gotData);
