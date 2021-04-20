let w = 1200;
let h = 800;
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



      // SCALES (to translate data values to pixel values)
      // let xDomain = d3.extent(incomingData, function(d){ return Number(d.year); })
      // let xScale = d3.scaleLinear().domain(xDomain).range([padding,w-padding]);
      // let yDomain = d3.extent(incomingData, function(d){ return Number(d.birthsPerThousand); })
      // let yScale = d3.scaleLinear().domain(yDomain).range([h-padding,padding]);

      let projection = d3.geoOrthographic()
          .translate([w/2, h/2])
          // .fitExtent([[padding, padding], [w-padding, h-padding]], geoData)
        ;
      // PATH (line) MAKER - gets points, returns one of those complicated looking path strings
      // let lineMaker = d3.line()
      //     .x(function(d){
      //       return xScale(Number(d.year));
      //     })
      //     .y(function(d){
      //       return yScale(Number(d.birthsPerThousand));
      //     })
      // ;
      let pathMaker = d3.geoPath(projection);

      var bgCircle = viz.append("circle")
                 .attr("cx", w/2)
                 .attr("cy", h/2)
                 .attr("r", projection.scale())
                 .style("fill", "#fec89a")

      //location
      let lat = 142.10;
      let lon = 170.98;

      // CREATE SHAPES ON THE PAGE!
      viz.selectAll(".province").data(geoData.features).enter()
        .append("path")
          .attr("class", "province")
          .attr("d", pathMaker)
          .attr("fill", function(d, i){
            if (i == 31){
              // console.log(d.geometry.coordinates[1][0][0]);
              return "red"
            } else {
              return "grey"
            }
          })
          // .attr("fill", function(d ,i){
          //
          //   //see if d.properties.name is in incomingData
          // let correspondingDatapoint = incomingData.find(function(datapoint){
          //     //console.log(d.properties.name)
          //     if(datapoint.province == d.properties.name){
          //       return true;
          //     } else {
          //       return false;
          //     }
          // })
          //     if(correspondingDatapoint != undefined){
          //       console.log(correspondingDatapoint);
          //       return colorScale(correspondingDatapoint.population)
          //     } else {
          //       return "grey"
          //     }
          // })
          .attr("stroke", "white")
      ;


      // viz.append("circle")
      //     .attr("d", pathMaker)
      //     .attr("cx", function(){
      //         return projection([lon, lat])[0];
      //       })
      //       .attr("cy", function(){
      //         return projection([lon, lat])[1];
      //       })
      //     .attr("fill", "red")
      //     .attr("r", 5)
      // ;

      // viz.append("circle")
      //   .attr("cx", function(){
      //     return projection([lon, lat])[0];
      //   })
      //   .attr("cy", function(){
      //     return projection([lon, lat])[1];
      //   })
      //   .attr("r", 5)
      //   .attr("fill", "red")
      // ;

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
