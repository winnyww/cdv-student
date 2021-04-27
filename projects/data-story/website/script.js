
let w = 1200;
let h = 650;
let padding = 90
var rotationOn = true;
const tRotation = 10000; //30s per rotation
var tNew, dt, steps, pos, tOld, oldPos;
tOld = 0;
oldPos = 0;

// SVG
let viz = d3.select("#container").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "white")
    .style("margin-top", "170px")
;

let viz2 = d3.select("#container-2").append("svg")
    .style("width", w)
    .style("height", h)
    .style("background-color", "white")
    .style("margin-top", "170px")
;


// IMPORT DATA
d3.json("countries.geojson").then(function(geoData){
 d3.csv("china-pop-2018.csv").then(function(incomingData){


      incomingData = incomingData.map(function(d, i){
        d.population = Number(d.population);
        return d
      })

      let minPop = d3.min(incomingData, function(d, i){
        return d.population
      })

      let maxPop = d3.max(incomingData, function(d, i){
        return d.population
      })

      let colorScale = d3.scaleLinear().domain([minPop, maxPop]).range(["white", "blue"]);

      let projection = d3.geoOrthographic()
          .translate([w/2, h/2])
          // .fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
        ;

      let pathMaker = d3.geoPath(projection);

      var bgCircle = viz.append("circle")
                 .attr("cx", w/2)
                 .attr("cy", h/2)
                 .attr("r", projection.scale())
                 .style("fill", "#E8E8E8")

      //location
      let lat = 142.10;
      let lon = 170.98;

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

           if (pos <= -180) {pos = pos+360}

           projection.rotate([pos, 0]);
           viz.selectAll("path").attr("d", pathMaker)


           tOld = tNew;
           oldPos = pos;
         }
         else {
           tOld = now;
         }
       }


      // let pixelValue = projection([lon, lat]);
  })
})
