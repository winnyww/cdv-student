
// <---------the cavans is here-------->
let viz = d3.select("#container")
  .append("svg")
    .attr("id", "viz")
    .style("background-color", "#001233")
    //.style("background-image", "url('pic/2.jpg')")
;

let countX = 0;
let countY = 0;
let countZ = 0;
let countH = 0;
let t = 2;

let appShape1 = [];
let appShape2 = [];

let myLocations = [];

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
  let x = 450;
  let y = 280 + countZ * 50;
  countZ++;
  return "translate(" + x + ", " + y + ")";
}

// function groupLocationsText(incomingData){
//   if (countH > 7){
//   countH = 0;
// }
//   let x = 500;
//   let y = 300 + countH * 50;
//   countH++;
//   return "translate(" + x + ", " + y + ")";
// }


  var cou = 0;

function drawShape(incomingData){
  var radialLineGenerator = d3.radialLine();
  var points = [];


    for (let t = 0; t <= incomingData; t++){
      points.push([Math.PI * 2 / incomingData * t, 100 + cou * 20]);
      points.push([Math.PI * 2 / incomingData * t + Math.PI * 2 / incomingData * 0.5, 115 + cou * 20]);
  }

  var radialLine = radialLineGenerator(points);
  cou++;
  return radialLine;
}

function abLocations(incomingData, i){

  let x = 1200 + Math.sin(Math.PI*2/Math.random(i))*16*i;
  let y = 400 + Math.cos(Math.PI*2/Math.random(i))*16*i;

  return "translate(" + x + ", " + y + ")";
}

let shapePoints = [];

function groupLocationsRect(incomingData, i){
  return "translate(800, 400)";
}

function groupLocations3(incomingData, i){
  if (t > 35){
  t = 2;
  }
  let x = 1145 + Math.sin(-3.14/2)*21*t;
  let y = 390 + Math.cos(-3.14/2)*21*t;
  t++;
  return "translate(" + x + ", " + y + ")";
}

function groupLocations33(incomingData, i){
  if (t > 35){
  t = 2;
  }
  let x = 1145 + Math.sin(-3.14/2)*21*t;
  let y = 410 + Math.cos(-3.14/2)*21*t;
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
var shapeCount2 = 0;

function drawAppShape1(d,i){

if(shapeCount1 > 35){
  shapeCount1 = 0;
}

  var symbolGenerator = d3.symbol()
    .type(shapes[appShape1[shapeCount1]])
    .size(100)
    ;

  shapeCount1++;
  var pathData = symbolGenerator();
  return pathData;
}


function drawAppShape2(d,i){

if(shapeCount2 > 35){
  shapeCount2 = 0;
}

  var symbolGenerator = d3.symbol()
    .type(shapes[appShape2[shapeCount2]])
    .size(100)
    ;

  shapeCount2++;
  var pathData = symbolGenerator();
  return pathData;
}

function drawLocationShape(d,i){

if(shapeCount2 > 35){
  shapeCount2 = 0;
}

  var symbolGenerator = d3.symbol()
    .type(shapes[1])
    .size(30)
    ;

  shapeCount2++;
  var pathData = symbolGenerator();
  return pathData;
}

function drawColor1(d,i){
  return shapeColor[appShape1[i]];
}

function drawColor2(d,i){
  return shapeColor[appShape2[i]];
}



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


  for(let j = 0; j < incomingData.length; j++){
    let questionsAndAnswers = incomingData[j];

    // <---------location---------->

    if (questionsAndAnswers[location] == "AB"){
      myLocations.push("AB");
    } else if (questionsAndAnswers[location] == "Elevator"){
      myLocations.push("ELEVATOR");
    } else if (questionsAndAnswers[location] == "Home"){
      myLocations.push("HOME");
    } else if (questionsAndAnswers[location] == "in the street"){
      myLocations.push("IN THE STREET");
    } else if (questionsAndAnswers[location] == "Popeyes"){
      myLocations.push("POPEYES");
    }

    // <---------location---------->

// <---------time---------->
    if (questionsAndAnswers[phone] == "yes"){
      time.push(questionsAndAnswers[timeYes]);
      lockTimes.push("yes");

      if (questionsAndAnswers[wantToCheck] == "Eleme"){
        appShape1.push(1);
      } else if (questionsAndAnswers[wantToCheck] == "Wechat texting someone"){
        appShape1.push(2);
      } else if (questionsAndAnswers[wantToCheck] == "Social media"){
        appShape1.push(3);
      } else if (questionsAndAnswers[wantToCheck] == "taobao"){
        appShape1.push(4);
      } else if (questionsAndAnswers[wantToCheck] == "Chrome"){
        appShape1.push(5);
      } else if (questionsAndAnswers[wantToCheck] == "pictures"){
        appShape1.push(6);
      } else if (questionsAndAnswers[wantToCheck] == "Wechat  moments"){
        appShape1.push(7);
      } else if (questionsAndAnswers[wantToCheck] == "nothing much"){
        appShape1.push(8);
      } else if (questionsAndAnswers[wantToCheck] == "Google calendar"){
        appShape1.push(9);
      } else if (questionsAndAnswers[wantToCheck] == "Time on the lock screen"){
        appShape1.push(10);
      } else if (questionsAndAnswers[wantToCheck] == "Duo app"){
        appShape1.push(11);
      } else {
        appShape1.push(12);
      }

      if (questionsAndAnswers[didCheck] == "Eleme"){
        appShape2.push(1);
      } else if (questionsAndAnswers[didCheck] == "Wechat chats"){
        appShape2.push(2);
      } else if (questionsAndAnswers[didCheck] == "Social media"){
        appShape2.push(3);
      } else if (questionsAndAnswers[didCheck] == "taobao"){
        appShape2.push(4);
      } else if (questionsAndAnswers[didCheck] == "Wechat  moments"){
        appShape2.push(7);
      } else if (questionsAndAnswers[didCheck] == "nothing"){
        appShape2.push(8);
      } else {
        appShape2.push(12);
      }


      // appsWantToCheck.push(questionsAndAnswers[wantToCheck]);
      // appsDidCheck.push(questionsAndAnswers[didCheck]);
    } else if (questionsAndAnswers[phone] == "no"){
      time.push(questionsAndAnswers[timeNo]);
      lockTimes.push("no");

      if (questionsAndAnswers[check] == "Time on the lock screen"){
        appShape1.push(13);
        appShape2.push(13);
      } else if (questionsAndAnswers[check] == "date"){
        appShape1.push(14);
        appShape2.push(14);
      } else if (questionsAndAnswers[check] == "wallpaper"){
        appShape1.push(15);
        appShape2.push(15);
      } else if (questionsAndAnswers[check] == "your own reflection"){
        appShape1.push(16);
        appShape2.push(16);
      } else if (questionsAndAnswers[check] == "nothing really"){
        appShape1.push(8);
        appShape2.push(8);
      } else if (questionsAndAnswers[check] == "I forgot what I wanted to check"){
        appShape1.push(17);
        appShape2.push(17);
      } else {
        appShape1.push(12);
        appShape2.push(12);
      }

      //appsCheck.push(questionsAndAnswers[check]);
    }


      //console.log(appShape1);
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

function locationText(incomingData){
  if(b < incomingData.length){
      b++;
    return myLocations[b];
  }
}

console.log(myLocations);










// <---------start drawing 1---------->
let datagroup1 = viz.selectAll(".datagroup1").data(time).enter()
  .append("g")
    .attr("class", "datagroup1")
;

datagroup1.append("path")
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

// datagroup2.append("circle")
//   .attr("cx", -30)
//   .attr("cy", 0)
//   .attr("r", 10)
//   .attr('id', 'g2')
//   .attr("fill", groupColor2);
// ;

// datagroup2.append("text")
//   .attr("x", -50)
//   .attr("y", 20)
//   .text(groupText)
//   .attr('id', 'g3')
//   .style("font-size",10)
//   .style("fill", "white")
//   .style("text-aligh", "center")
// ;

datagroup2.append('rect')
  .attr('x', 300)
  .attr('y', 370)
  .attr('width', 850)
  .attr('height', 60)
  // .attr('stroke', 'black')
  .attr('fill', '#001233')
  .attr('id', 'rectagles')
  .style('position', 'absolute')
;

datagroup2.select('#g2').attr("transform", groupLocations2);
//datagroup2.select('#g3').attr("transform", groupLocationsText);
//datagroup2.select("#rectagles").attr("transform", groupLocationsRect);
// <---------end drawing 2---------->

// <---------start drawing 3---------->
let datagroup3 = viz.selectAll(".datagroup3").data(appShape1).enter()
  .append("g")
    .attr("class", "datagroup3")
;

// var symbolGenerator = d3.symbol()
//   .type(shapes[6])
//   .size(80);
//
// var pathData = symbolGenerator();

datagroup3.append("path")
  .attr("d", drawAppShape1)
  .attr("id", "firstLine")
  .style("fill", drawColor1)
;
console.log("hello");
// console.log(shapeColor[appShape1]);

datagroup3.append("path")
  .attr("d", drawAppShape2)
  .attr("id", "secondLine")
  .style("fill", drawColor2)
;

datagroup3.select("#firstLine").attr("transform", groupLocations3);
datagroup3.select("#secondLine").attr("transform", groupLocations33);
// <---------end drawing 3---------->

// <---------start drawing 4---------->

// let datagroup4 = viz.selectAll(".datagroup4").data(myLocations).enter()
//   .append("g")
//     .attr("class", "datagroup4")
// ;
//
// datagroup4.append('text')
//   //.attr("d", drawLocationShape)
//   .attr("x", -50)
//   .attr("y", 20)
//   .text(locationText)
//   .attr("id", "AB")
//   .style("font-size",20)
//   .style("fill", "white")
//   .style("text-aligh", "center")
//   //.attr('transform', 'translate(1200 390) rotate(-45)')
// ;
//
// datagroup4.attr("transform", abLocations);

// <---------end drawing 4---------->

}






// <-------import dataset---------->
d3.json("data.json").then(gotData);
