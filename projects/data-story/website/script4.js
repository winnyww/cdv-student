let getInfo = document.getElementById("myForm");
function createItem()  {
  localStorage.commentInput = getInfo.value;
}


//page-4
d3.csv('most-editted-pages.csv').then(function(incomingData){

    let w = 1824;
    let h = 980;
    let padding = 30;
    let functionPage = [];

    let colors = [
      "#e0aaff",
      "#c77dff",
      "#9d4edd",
      "#7251b5",
      "#fffcf2"
    ]

  //grid
    let viz = d3.select("#container-4")
      .append("svg")
        .style("width", w)
        .style("height", h)
        .style("background-color", "white")
    ;

  //page note
    var div = d3.select("#container-4").append("div")
      .attr("class", "pageNote")
      .style("opacity", 0)
    ;

  //build axis
    var col = d3.map(incomingData, function(d){return d.time;}).keys()
    var row = d3.map(incomingData, function(d){return d.rank;}).keys()
    let colNum = ['2011', '2012', '2013', '2014', '2015', '2016', '2017', '2018',
               '2019', '2020', '2021']

    let x = d3.scaleBand()
        .domain(col)
        .range([padding, w-padding])
        .paddingInner(0.1)
    ;

  //year axis
    let z = d3.scaleBand()
        .domain(colNum)
        .range([padding, w-padding])
    ;

  //color scale - opacity
    // let colorScale = d3.scaleLinear().domain([0, 25915]).range([0.,1]);

  //process data
    let items = Object.keys(incomingData[incomingData.length-1]);
     let title = items[0];

    for(let j = 0; j < incomingData.length; j++){
      let info = incomingData[j];

      //seperate title
        if (info[title][0]+info[title][1]+info[title][2]+info[title][3]+info[title][4]+info[title][5]+info[title][6]
            == "Project"){
          functionPage.push("Project")
        } else if (info[title][0]+info[title][1]+info[title][2]+info[title][3]
            == "User"){
          functionPage.push("User")
        } else if (info[title][0]+info[title][1]+info[title][2]+info[title][3]
            == "Talk"){
          functionPage.push("Talk")
        } else if (info[title][0]+info[title][1]+info[title][2]+info[title][3]+info[title][4]+info[title][5]+info[title][6]+info[title][7]
            == "Template"){
          functionPage.push("Talk")
        } else {
          functionPage.push("Others")
        }
    }

    viz.append("g")
        .style("font-size", 15)
        .style('fill', 'black')
        .attr("transform", "translate(0, 955)")
        .call(d3.axisBottom(z).tickSize(0))
        .select(".domain").remove()
    ;

    let y = d3.scaleBand()
        .domain(row)
        .range([padding, h-padding])
        .paddingInner(0.1)
    ;

    viz.append("g")
        .style("font-size", 10)
        .style('fill', 'black')
        .attr("transform", "translate(27, 0)")
        .call(d3.axisLeft(y).tickSize(0))
        .select(".domain").remove()
    ;

  //grid - rect
    viz.selectAll().data(incomingData, function(d) {return d.time+':'+d.rank;})
      .enter()
      .append("rect")
        .attr("x", function(d) { return x(d.time) })
        .attr("y", function(d) { return y(d.rank) })
        .attr("rx", 4)
        .attr("ry", 4)
        .attr("width", x.bandwidth() )
        .attr("height", y.bandwidth() )
        .style("fill", getColor)
        .style("stroke-width", 2)
        .style("stroke", "none")
        .style('opacity', 1)
        //.style("opacity", function(d){return colorScale(d.edits)})
        .on("mouseover", handleMouseOver)
        .on("mouseout", handleMouseOut)
    ;

    function getColor(d,i){
      if (functionPage[i] == "Project"){
        return colors[0]
      } else if (functionPage[i] == "User"){
        return colors[1]
      } else if (functionPage[i] == "Talk"){
        return colors[2]
      } else if (functionPage[i] == "Template"){
        return colors[3]
      } else if (functionPage[i] == "Others"){
        return colors[4]
      }
    }

    function handleMouseOver(d, i) {  // Add interactivity
        d3.select(this)
          .attr("fill", "#554a8f")
        ;

        document.addEventListener('mousemove', (event) => {
          let xPos, yPos;
          let tPosX, tPosY
           xPos = `${event.clientX}`;
           yPos = `${event.clientY}`;

          div.html(" " + d.page_title
                  + " was edited " + d.edits + " times "
                  + " during " + " "
                   + d.time[0]
                   + d.time[1]
                   + d.time[2]
                   + d.time[3]
                   + "."
                   + d.time[5]
                   + d.time[6]
                   + " ")
                 .attr('id', "p" + "-" + d.edits + i)
              ;

              if (xPos > w-padding-100){
                div.style('right', (xPos-200)+ "px")
              } else {
                div.style('left', xPos+ "px")
              }

              if (yPos > h-padding-100){
                div.style('bottom', (yPos-100)+ "px")
              } else {
                div.style('top', yPos+ "px")
              }
            })
          //  console.log(div)
              div.style("opacity", 1);
          }
    function handleMouseOut(d, i) {  // Add interactivity
        d3.select(this).attr("fill", getColor);
        d3.select("#p" + "-" + d.edits + i).style('opacity', 0);
    }
});
