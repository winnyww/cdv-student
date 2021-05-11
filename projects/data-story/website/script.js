let getInfo = document.getElementById("myForm");

function createItem()  {
  localStorage.editInput = getInfo.value;
}

// Wrap every letter in a span
var textWrapper = document.querySelector('.intro-1-1');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.intro-1-1 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: (el, i) => 10 * (i+1)
  });

var textWrapper = document.querySelector('.intro-1-2');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.intro-1-2 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: (el, i) => 2000+10 * (i+1)
  });

var textWrapper = document.querySelector('.intro-1-3');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.intro-1-3 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: (el, i) => 4000+10 * (i+1)
  });

var textWrapper = document.querySelector('.intro-1-4');
textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

anime.timeline({loop: false})
  .add({
    targets: '.intro-1-4 .letter',
    opacity: [0,1],
    easing: "easeInOutQuad",
    duration: 500,
    delay: (el, i) => 6000+10 * (i+1)
  });

//page-1
d3.json("countries.geojson").then(function(geoData){

  let w = 1500;
  let h = 700;
  let padding = 90
  var rotationOn = true;
  const tRotation = 10000; //30s per rotation
  var tNew, dt, steps, pos, tOld, oldPos;
  tOld = 0;
  oldPos = 0;
  let color = "#c0fdff";

  let viz = d3.select("#container").append("svg")
      .style("width", w)
      .style("height", h)
      .style("background-color", "white")
      .style("margin-top", "170px")
  ;

//make earth map
  let projection = d3.geoOrthographic()
        .translate([w/2, h/2])
        ;

  let pathMaker = d3.geoPath(projection);

  var bgCircle = viz.append("circle")
        .attr("cx", w/2)
        .attr("cy", h/2)
        .attr("r", projection.scale())
        .style("fill", "#E8E8E8"  )

      //location to make little marks - later
      // let lat = 142.10;
      // let lon = 170.98;

      // CREATE SHAPES ON THE PAGE!
      viz.selectAll(".province").data(geoData.features).enter()
        .append("path")
          .attr("class", "province")
          .attr("d", pathMaker)
          //.attr("fill", getColor)
          .attr("fill", 'grey')
          .attr("stroke", "white")
      ;

      //light up somewhere every half a second
      function getColor(d,i){
          if (i == (Math.random()*180).toFixed(0)){
            return color;
          } else {
            return 'grey'
          }
      }

  // start timer
  d3.timer(myTimer);

  // function that rotates the earth
  function myTimer(now) {
    if (rotationOn) {
     tNew = now;
     dt = tOld - tNew;
     steps = dt * 360 / tRotation;

     pos = oldPos - steps //the earth rotates towards the east

       if (pos <= -180) {
         pos = pos+360
       }
       projection.rotate([pos, 0]);
       viz.selectAll("path")
        .attr("d", pathMaker)

       if ( (now%500).toFixed(0) < 100){
         viz.selectAll("path")
          .transition()
          .duration(300)
          .attr("fill", getColor)
        //console.log((now/500).toFixed(0))
       }
      //setInterval(viz.selectAll("path").attr("fill", getColor), 500)
          tOld = tNew;
          oldPos = pos;
      } else {
        tOld = now;
      }
   }
      // let pixelValue = projection([lon, lat]);
})
