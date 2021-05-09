let getInfo = document.getElementById("myForm");

function createItem()  {
  localStorage.editInput = getInfo.value;
}

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
        .style("fill", "#E8E8E8 "  )

      //location to make little marks - later
      // let lat = 142.10;
      // let lon = 170.98;

      // CREATE SHAPES ON THE PAGE!
      viz.selectAll(".province").data(geoData.features).enter()
        .append("path")
          .attr("class", "province")
          .attr("d", pathMaker)
          .attr("fill", "grey")
          .attr("stroke", "white")
      ;

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
       viz.selectAll("path").attr("d", pathMaker)
          tOld = tNew;
          oldPos = pos;
      } else {
        tOld = now;
      }
   }
      // let pixelValue = projection([lon, lat]);
})
