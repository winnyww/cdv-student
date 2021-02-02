let data = [
    {
        "timestamp": "2021-01-28T17:14:02.349Z",
        "Nepal": 6,
        "Ethiopia": 2,
        "China": 1,
        "Germany": 3,
        "Greece": 7,
        "NorthKorea": 1,
        "anyOverallFeedbackForThisSurvey": "yikes"
    },
    {
        "timestamp": "2021-01-28T17:20:51.265Z",
        "Nepal": 2,
        "Ethiopia": 3,
        "China": 3,
        "Germany": 7,
        "Greece": 3,
        "Iceland": 7,
        "NorthKorea": 3
    },
    {
        "timestamp": "2021-01-28T17:22:54.930Z",
        "Nepal": 6,
        "Ethiopia": 3,
        "China": 5,
        "Germany": 8,
        "Greece": 6,
        "Iceland": 8,
        "NorthKorea": 5
    },
    {
        "timestamp": "2021-01-29T01:25:04.020Z",
        "Nepal": 7,
        "Ethiopia": 5,
        "China": 7,
        "Germany": 3,
        "Greece": 5,
        "Iceland": 4,
        "NorthKorea": 6
    },
    {
        "timestamp": "2021-01-29T01:57:33.101Z",
        "Nepal": 3,
        "Ethiopia": 3,
        "China": 2,
        "Germany": 7,
        "Greece": 3,
        "Iceland": 8,
        "NorthKorea": 7
    },
    {
        "timestamp": "2021-01-29T03:29:31.771Z",
        "Nepal": 5,
        "Ethiopia": 3,
        "China": 4,
        "berlinGermany": 3,
        "Greece": 3,
        "Iceland": 3,
        "NorthKorea": 6
    },
    {
        "timestamp": "2021-01-29T03:32:03.188Z",
        "Nepal": 6,
        "Ethiopia": 2,
        "China": 3,
        "Germany": 7,
        "Greece": 5,
        "Iceland": 7,
        "NorthKorea": 3
    },
    {
        "timestamp": "2021-01-29T05:28:35.766Z",
        "Nepal": 6,
        "Ethiopia": 4,
        "China": 4,
        "Germany": 4,
        "Greece": 3,
        "Iceland": 5,
        "NorthKorea": 4
    },
    {
        "timestamp": "2021-01-29T05:40:23.902Z",
        "Nepal": 6,
        "Ethiopia": 3,
        "China": 4,
        "Germany": 3,
        "Greece": 4,
        "Iceland": 5,
        "NorthKorea": 7
    },
    {
        "timestamp": "2021-01-29T05:47:31.599Z",
        "Nepal": 5,
        "Ethiopia": 3,
        "China": 7,
        "Germany": 5,
        "Greece": 3,
        "Iceland": 4,
        "NorthKorea": 6
    },
    {
        "timestamp": "2021-01-30T03:30:25.480Z",
        "Nepal": 4,
        "Ethiopia": 2,
        "China": 5,
        "Germany": 2,
        "Greece": 2,
        "Iceland": 3,
        "NorthKorea": 7
    },
    {
        "timestamp": "2021-01-30T06:30:06.304Z",
        "Nepal": 7,
        "Ethiopia": 4,
        "China": 5,
        "Germany": 4,
        "Greece": 4,
        "Iceland": 4,
        "NorthKorea": 6
    },
    {
        "timestamp": "2021-01-30T09:57:33.405Z",
        "Nepal": 4,
        "Ethiopia": 2,
        "China": 7,
        "Germany": 6,
        "Greece": 5,
        "Iceland": 8,
        "NorthKorea": 3
    },
    {
        "timestamp": "2021-01-30T18:39:02.996Z",
        "Nepal": 1,
        "Ethiopia": 1,
        "China": 1,
        "Germany": 8,
        "Greece": 1,
        "Iceland": 4,
        "NorthKorea": 1,
        "anyOverallFeedbackForThisSurvey": "Can't wait to see what you'll do with that data!"
    }
]



function averageData(data){
  let newData = [];
  let keys = Object.keys(data[ data.length-1 ]);
  for(let i = 0; i < keys.length; i++){
    let key = keys[i];
    let sum = 0;
    let num = 0;
    for(let j = 0; j < data.length; j++){
      let datum = data[j];
      if(key in datum){
        sum += datum[key];
        num++;
      }
    }
    let avg = sum/num;
    if(!isNaN(avg)){
      let newDataPoint = {"name": key, "average": avg, 'numMeasurements': num};
      newData.push(newDataPoint);
    }
  }
  return newData;
}

let transformedData = averageData(data);
//14 items in the array


//---------start drawing----------//



for(let i = 0; i < transformedData.length; i++){
  // get the item we deal with at this iteration
  let datapoint = transformedData[i];

  let country = datapoint.name;
  let average = datapoint.average;

  let bar = document.createElement("div");
  let circle = document.createElement("div");
  // next, we assign the className to the div
  // that will make sure basic bar styling (defined in css/style.css)
  // is applied to it (like height, color, margin)
  bar.className = "bar";
  bar.style.height = (average * 25) + "px";


  circle.className = "circle";
  circle.style.width = (average * 5) + "px";
  circle.style.height= (average * 5) + "px";

  let color = "rgb(" + (100 + i*30) + "," + 100 + "," + 100 + ")";
  circle.style.background = color;
  bar.style.background = color;
  // console.log(color);

  let holder = document.getElementById("placeholder");
  holder.appendChild(circle);




  let barname = document.createElement("p");
  barname.innerHTML = country;
  holder.appendChild(barname);
  // at this point the element we have created using JavaScript only
  // looks like:
  // <div class="bar"><p>watermelonWithFetaCheese</p></div>
  // (that is for the first datapoint (watermelonWithFetaCheese) that we iterate over)

  // that whole element (the div containing the p tag)
  // we append to the body after all
  // bring it from "JavaScript world" to "HTML world"
  let counter = "container" + (i + 1);
  let container = document.getElementById(counter);

  container.appendChild(bar);
  // console.log(counter);

}
