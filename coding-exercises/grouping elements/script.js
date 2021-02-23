
// <---------the cavans is here-------->
let viz = d3.select("#viz-container")
  .append("svg")
    .attr("id", "viz")
    .style("background-color", "white")
;

let countX = 0;
let countY = 0;
let countZ = 0;

function groupLocations(incomingData){
      if (countX > 7){
      countX = 0;
      countY++;
    }
  let x = 200 + countX * 130;
  let y = 130 + countY * 130;
  countX++;
  return "translate(" + x + ", " + y + ")";
}

function groupLocations2(incomingData){
  if (countZ > 7){
  countZ = 0;
}
  let x = 1300;
  let y = 400 + countZ * 50;
  countZ++;
  return "translate(" + x + ", " + y + ")";
}

function drawShape(incomingData){
  var radialLineGenerator = d3.radialLine();
  var points = [];

    for (let t = 0; t < incomingData; t++){
      points.push([Math.PI * 2 / incomingData * t, Math.random(30, 40)*incomingData]);}

  var radialLine = radialLineGenerator(points);
  return radialLine;
}



// <---------the cavans ends-------->


function gotData(incomingData){
  // console.log(incomingData);

// <---------analyzing data---------->

let questions = Object.keys(incomingData[incomingData.length-1 ]);
let questionsNo = Object.keys(incomingData[incomingData.length-2 ]);

for(let n = 0; n < 3; n++){
questions[questions.length] = questionsNo[n+4];
}
// console.log(questions); //an array of all questions asked



// <---------set elements---------->
  let location = questions[1];
  let people = questions[2];
  let phone = questions[3];

  // let wantToCheck = questions[4];
  // let didCheck = questions[5];
  let timeYes = questions[6];
  let timeNo = questions[8];
  let notes = questions[9];
// <---------set elements---------->




  let time = [];
  let lockTimes = 0;
  let unlockTimes = 0;


  let peopleColor = [];
  let noteContent = [];

  for(let j = 0; j < incomingData.length; j++){
    let questionsAndAnswers = incomingData[j];

// <---------time---------->
    if (questionsAndAnswers[phone] == "yes"){
      time.push(questionsAndAnswers[timeYes]);
      lockTimes++;
    } else if (questionsAndAnswers[phone] == "no"){
      time.push(questionsAndAnswers[timeNo]);
      unlockTimes++;
    }
// <---------time---------->

// <---------people---------->
  if (questionsAndAnswers[people] == "stranger"){
    peopleColor.push("rgb(88, 89, 91)");
  } else if (questionsAndAnswers[people] == "my boyfriend"){
    peopleColor.push("rgb(167, 245, 255)");
  } else if (questionsAndAnswers[people] == "zoom classmates & professor"){
    peopleColor.push("rgb(230, 121, 91)");
  } else if (questionsAndAnswers[people] == "Nobody"){
    peopleColor.push("black");
  } else if (questionsAndAnswers[people] == "my friend"){
    peopleColor.push("rgb(234, 177, 199)");
  } else {
    peopleColor.push("rgb(237, 224, 114)");
  }
// <---------people---------->

// <---------notes---------->
// <---------notes---------->

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
  "rgb(88, 89, 91)",
  "rgb(167, 245, 255)",
  "rgb(230, 121, 91)",
  "black",
  "rgb(234, 177, 199)",
  "rgb(237, 224, 114)"
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
  .attr("d", drawShape)
;


datagroup1.attr("transform", groupLocations);
datagroup1.attr("fill", groupColor);
datagroup1.attr("opacity", 0.8);

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
  .style("text-aligh", "center")
;

datagroup2.attr("transform", groupLocations2);
// <---------end drawing 1---------->
}






// <-------import dataset---------->
d3.json("data.json").then(gotData);
