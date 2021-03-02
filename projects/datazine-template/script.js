
// <---------the cavans is here-------->
let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
    .style("background-color", "#001233")
    // .style("background-image", "url('pic/1.jpg')")
;

let countX = 0;
let countY = 0;
let countZ = 0;
let t = 2;

function groupLocations(incomingData){
  //     if (countX > 7){
  //     countX = 0;
  //     countY++;
  //   }
  // let x = 200 + countX * 130;
  // let y = 130 + countY * 130;
  // countX++;
  return "translate(" + 1200 + ", " + 400 + ")";
}

function groupLocations2(incomingData){
  if (countZ > 7){
  countZ = 0;
}
  let x = 1900;
  let y = 300 + countZ * 50;
  countZ++;
  return "translate(" + x + ", " + y + ")";
}


  var cou = 0;

function drawShape(incomingData){
  var radialLineGenerator = d3.radialLine();
  var points = [];


    for (let t = 0; t <= incomingData; t++){
      points.push([Math.PI * 2 / incomingData * t, 30 + cou * 15]);
      points.push([Math.PI * 2 / incomingData * t + Math.PI * 2 / incomingData * 0.5, 45 + cou * 15]);
  }

  var radialLine = radialLineGenerator(points);
  cou++;
  return radialLine;
}

let shapePoints = [];

function groupLocations3(incomingData, i){
  if (t > 35){
  t = 2;
  }
  let x = 1200 + Math.sin(-3.14/5)*16*t;
  let y = 400 + Math.cos(-3.14/5)*16*t;
  t++;
  return "translate(" + x + ", " + y + ")";
}

let lockTimes = [];
var h = 0;

function dashOrNot(d, i){
  if (lockTimes[i] == "no"){
    return "3";
  }
}

let shapes = [
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
  d3.symbolDiamond,
  d3.symbolSquare,
  d3.symbolStar
]

//
// function drawAppShape(d,i){
//
//   var symbolGenerator = d3.symbol()
//     .type(shapes[2])
//     .size(80);
//
//
//   var pathData = symbolGenerator();
//   return pathData;
// }




// <---------the cavans ends-------->


function gotData(incomingData){
  // console.log(incomingData);

// <---------analyzing data---------->

let questions = Object.keys(incomingData[incomingData.length-1]);
let questionsNo = Object.keys(incomingData[incomingData.length-2 ]);



for(let n = 0; n < 3; n++){
questions[questions.length] = questionsNo[n+4];
}
// console.log(questions); //an array of all questions asked



// <---------set elements---------->
  let location = questions[1];
  let people = questions[2];
  let phone = questions[3];

  let wantToCheck = questions[4];
  let didCheck = questions[5];
  let check = questions[7];
  let timeYes = questions[6];
  let timeNo = questions[8];
  let notes = questions[9];

// <---------set elements---------->




  let time = [];

  let peopleColor = [];
  let noteContent = [];

  let apps = [];
  let appsWantToCheck = [];
  let appsDidCheck = [];
  let appsCheck = [];

  let appShape = [];

  for(let j = 0; j < incomingData.length; j++){
    let questionsAndAnswers = incomingData[j];

// <---------time---------->
    if (questionsAndAnswers[phone] == "yes"){
      time.push(questionsAndAnswers[timeYes]);
      lockTimes.push("yes");
      appsWantToCheck.push(questionsAndAnswers[wantToCheck]);
      appsDidCheck.push(questionsAndAnswers[didCheck]);
    } else if (questionsAndAnswers[phone] == "no"){
      time.push(questionsAndAnswers[timeNo]);
      lockTimes.push("no");
      appsCheck.push(questionsAndAnswers[check]);
    }
// <---------time---------->


// <---------people---------->
  if (questionsAndAnswers[people] == "stranger"){
    peopleColor.push("#d5aca9");
  } else if (questionsAndAnswers[people] == "my boyfriend"){
    peopleColor.push("#bbd0ff");
  } else if (questionsAndAnswers[people] == "zoom classmates & professor"){
    peopleColor.push("#1a759f");
  } else if (questionsAndAnswers[people] == "Nobody"){
    peopleColor.push("#ffe6a7");
  } else if (questionsAndAnswers[people] == "my friend"){
    peopleColor.push("#d6e2e9");
  } else {
    peopleColor.push("#a4c3b2");
  }
// <---------people---------->

// console.log(appsCheck);
// <---------apps---------->
  if (appsWantToCheck == "Eleme"){
    appShape.push(1);
  } else if (appsWantToCheck == "Wechat texting someone"){
    appShape.push(2);
  } else if (appsWantToCheck == "Social media"){
    appShape.push(3);
  } else if (appsWantToCheck == "taobao"){
    appShape.push(4);
  } else if (appsWantToCheck == "Chrome"){
    appShape.push(5);
  } else if (appsWantToCheck == "pictures"){
    appShape.push(6);
  } else if (appsWantToCheck == "Wechat  moments"){
    appShape.push(7);
  } else if (appsWantToCheck == "nothing much"){
    appShape.push(8);
  } else if (appsWantToCheck == "Google calendar"){
    appShape.push(9);
  } else if (appsWantToCheck == "Time on the lock screen"){
    appShape.push(10);
  } else if (appsWantToCheck == "Duo app"){
    appShape.push(11);
  } else {
    appShape.push(12);
  }

  if (appsDidCheck == "Eleme"){
    appShape.push(1);
  } else if (appsDidCheck == "Wechat chats"){
    appShape.push(2);
  } else if (appsDidCheck == "Social media"){
    appShape.push(3);
  } else if (appsDidCheck == "taobao"){
    appShape.push(4);
  } else if (appsDidCheck == "Wechat  moments"){
    appShape.push(7);
  } else if (appsDidCheck == "nothing"){
    appShape.push(8);
  } else {
    appShape.push(12);
  }

  if (appsCheck == "Time on the lock screen"){
    appShape.push(13);
  } else if (appsCheck == "date"){
    appShape.push(14);
  } else if (appsCheck == "wallpaper"){
    appShape.push(15);
  } else if (appsCheck == "your own reflection"){
    appShape.push(16);
  } else if (appsCheck == "nothing really"){
    appShape.push(8);
  } else if (appsCheck == "I forgot what I wanted to check"){
    appShape.push(17);
  } else {
    appShape.push(12);
  }

// <---------apps---------->

}


  let a = 0;
  let b = -1;
  let c = -1;

  function groupColor(incomingData){
    if(a < incomingData){
      a++;
    return peopleColor[a];
  }
}

let sampleColor = [
  "#d5aca9",
  "#bbd0ff",
  "#1a759f",
  "#ffe6a7",
  "#d6e2e9",
  "#a4c3b2"
]

function groupColor2(incomingData){
  if(c < incomingData.length){
    c++;
  return sampleColor[c];
  }
}


let names = [
"STRANGER",
"BOYFRIEND",
"ZOOMer",
"NOBODY",
"FRIEND",
"MORE "
]

function groupText(incomingData){
  if(b < incomingData.length){
      b++;
  return names[b];
}
}











// <---------start drawing 1---------->
let datagroup1 = viz.selectAll(".datagroup1").data(time).enter()
  .append("g")
    .attr("class", "datagroup1")
;

datagroup1.append("path")
  // .attr("d", d3.arc()
  //    .innerRadius(innerPosition)
  //    .outerRadius(outerPosition)
  //    .startAngle(0)     // It's in radian, so Pi = 3.14 = bottom.
  //    .endAngle(6.29)
  // )
  .style("stroke-dasharray", dashOrNot)
  .attr("d", drawShape)
;


datagroup1.attr("transform", groupLocations);
datagroup1.attr("stroke", groupColor);
datagroup1.attr("stroke-width", 2);
datagroup1.attr("fill", "none");
datagroup1.attr("opacity", 1);

// <---------end drawing 1---------->

// <---------start drawing 2---------->
let datagroup2 = viz.selectAll(".datagroup2").data(names).enter()
  .append("g")
    .attr("class", "datagroup2")
;

datagroup2.append("circle")
  .attr("cx", -30)
  .attr("cy", 0)
  .attr("r", 10)
  .attr("fill", groupColor2);
;

datagroup2.append("text")
  .attr("x", -50)
  .attr("y", 20)
  .text(groupText)
  .style("font-size",10)
  .style("fill", "white")
  .style("text-aligh", "center")
;

datagroup2.attr("transform", groupLocations2);
// <---------end drawing 2---------->

// <---------start drawing 3---------->
let datagroup3 = viz.selectAll(".datagroup3").data(appShape).enter()
  .append("g")
    .attr("class", "datagroup3")
;

var symbolGenerator = d3.symbol()
  .type(shapes[6])
  .size(80);

var pathData = symbolGenerator();

datagroup3.append("path")
  .attr("d", pathData)
  .style("fill", "white")
  .style("background-color", "#001233")
;

datagroup3.append("line")
  .attr("x", 1200)
  .attr("y", 400)
  .attr("dx", 1200 + Math.sin(-3.14/5)*16*33)
  .attr("dy", 400 + Math.cos(-3.14/5)*16*33)
  .attr("stroke", "red")
;

datagroup3.attr("stroke-width", 2);
datagroup3.attr("transform", groupLocations3);
// <---------end drawing 3---------->

}






// <-------import dataset---------->
d3.json("data.json").then(gotData);
