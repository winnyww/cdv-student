//---------load data----------//

d3.json("data.json").then(gotData)

//---------process data----------//

function gotData(data){

  let seconds = [];
  let lock = [];
  // let timeSpentInAB = [];
  let questions = Object.keys(data[data.length-1 ]);

    let time = questions[6];
    let location = questions[1];
    let phone = questions[3];
    let lockTimes = 0;
    let idk = [];
    let unlockTimes = 0;

    for(let j = 0; j < data.length; j++){
      let questionsAndAnswers = data[j];

      // if (questionsAndAnswers[location] == "AB"){
      let newDataPoint = {"name": time,  'time': questionsAndAnswers[time]};
      // timeSpentInAB.push(newDataPoint);
      seconds.push(questionsAndAnswers[time]);

      if (questionsAndAnswers[phone] == "yes"){
        lockTimes++;
      } else if (questionsAndAnswers[phone] == "no"){
        unlockTimes++;
      }
      // }
    }
    idk.push(lockTimes);
    idk.push(unlockTimes);
    console.log(idk);
  // return timeSpentInAB;





//---------start drawing----------//

let vizTime = d3.select("#time-container")
  .append("svg")
    .attr("id","vizTime")
    .attr("height", 500)
    .attr("width", 300)
    .attr("transform", "translate(550,150)")
;


vizTime.selectAll("path").data(seconds).enter().append("path")
           .attr("d", d3.arc()
              .innerRadius(innerPosition)
              .outerRadius(outerPosition)
              .startAngle(0)     // It's in radian, so Pi = 3.14 = bottom.
              .endAngle(curveLength)
            )
           .attr("fill", applyColor)
           .attr("transform", "translate(150,250)")
;

vizTime.selectAll("text").data(seconds).enter().append("text")
           .text("we represent time")
           .attr("x", innerPosition)
           .attr("y", outerPosition)
           .attr("fill", applyColor)
           .attr("transform", "translate(0,0)")
;

//---------drawing----------//

let vizPhone = d3.select("#phoneLock-container")
  .append("svg")
    .attr("id","vizPhone")
    .attr("height", 500)
    .attr("width", 300)
    .attr("transform", "translate(200,150)")
;


vizPhone.selectAll("path").data(idk).enter().append("path")
           .attr("d", d3.arc()
           .innerRadius(0)
           .outerRadius(80)
           .startAngle(angle)     // It's in radian, so Pi = 3.14 = bottom.
           .endAngle(curveLength2)
           )
           .style('fill', applyColor2)
           .attr("transform", "translate(150,250)")
;

vizPhone.selectAll("text").data(idk).enter().append("text")
           .text("we represent phone lock/unlock")
           .attr("x", angle)
           .attr("y", curveLength2)
           .attr("fill", applyColor2)
           .attr("transform", "translate(90,490)")
;

}

function innerPosition(datapoint){
  return datapoint*2;
}
function outerPosition(datapoint){
  return datapoint*2+5;
}
function curveLength(datapoint){
  return datapoint / 20 * 3.14;
}
function applyColor(datapoint){
  return "rgb(" + datapoint * 6 + ",0," + datapoint * 3 + ")";
}

function angle(datapoint){
  return datapoint*2;
}
function curveLength2(datapoint){
  return 6.28 / 6 * datapoint;
}
function applyColor2(datapoint){
  return "rgb(100," + datapoint * 60 + "," + datapoint * 30 + ")";
}
