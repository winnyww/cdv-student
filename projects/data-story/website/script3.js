  console.log(localStorage.getItem("countryInput"));

  //create option
  let form = document.getElementById('myForm');
  let options = [
    'Death during the year',
    'American idol',
    'Bitcoin',
    'Australian Open',
    'Taiwan',
    'Sociological theory',
    'Super Bowl',
    'Vladimir Putin',
    'The Avengers',
    'Taylor Swift',
    'functional pages: e.g Help_desk, User, Project page',
    'Syrian civil war',
    'KFC',
    'Samsung Galaxy',
    'Franz Kafka',
    'iPhone 5',
    'Korean wave',
    'Star Trek',
    'Edward Snowden',
    'COVID-19 pandemic',
    'Olympic',
    'FIFA',
    'Maya civilization',
    'United States presidential election',
    'Syed Ali Nawab',
    'Minions',
    'Donald Trump',
    'European migrant crisis',
    'David Bowie',
    'Art Nouveau',
    'Hurricane Maria',
    'Elon Musk Tesla Roadster',
    'Deadpool 2',
    'Vietnam War',
    'Captain Marvel',
    'Toy Story 4',
    'Joe Biden'
  ]

    for(let j = 0; j < options.length; j++){
      var opt = document.createElement("option");
      var t = document.createTextNode(options[j]);
      opt.appendChild(t);
      form.appendChild(opt);
    }


//page-3
d3.csv('by-country.csv').then(function(incomingData){

  const w = 1900;
  const h= 800;
  let countryInUse = [];
  let continentInUse = [];
  let countryName = [];

  const center2018 = { x: w/10*2, y: h/2+30};
  const center2019 = { x: w/10*4, y: h/2+30};
  const center2020 = { x: w/10*6, y: h/2+30};
  const center2021 = { x: w/10*8, y: h/2+30};
  const forceStrength = 0.035;

  let bubbles2018 = null;
  let bubbles2019 = null;
  let bubbles2020 = null;
  let bubbles2021 = null;
  let allBubbles = null;

  let node2018 = [];
  let node2019 = [];
  let node2020 = [];
  let node2021 = [];
  let allNode = []

  let year2018 = [];
  let year2019 = [];
  let year2020 = [];
  let year2021 = [];
  let allYear = [];

  let colors = [//7
    "#6b705c",//AF
    "#8ecae6",//NA
    "#b7b7a4",//OC
    "#264653",//AN
    "#ddbea9",//AS
    "#f4a261",//EU
    "#cdb4db",//SA
  ]

  //main canvas
  let viz = d3.select("#container-3").append("svg")
      .style("width", w)
      .style("height", h)
      .style("background-color", "white")
      .style("margin-top", "0px")
      .style("margin-left", "0px")
    ;

  //text note
  var div = d3.select("#container-3").append("div")
      .attr("class", "textNote")
      .style('opacity', 0)
    ;

  //input note
  var div2 = d3.select("#container-3").append("div")
      .attr("class", "input")
      .style('opacity', 1)
    ;

  //map country name with continent
  let items = Object.keys(incomingData[incomingData.length-1]);
  let countryCode = items[4];
  let continent = items[3];
  let year = items[2];
  let countries = items[5];
  let guessCountry;

  for(let j = 0; j < incomingData.length; j++){
    let info = incomingData[j];
    countryInUse.push(info[countryCode]);
    continentInUse.push(info[continent]);
    countryName.push(info[countries]);

    //seperate yeas
      if (info[year] == "2018"){
        year2018.push(info);
      } else if (info[year] == "2019"){
        year2019.push(info);
      } else if (info[year] == "2020"){
        year2020.push(info);
      } else if (info[year] == "2021"){
        year2021.push(info);
      }

      allYear.push(info);

    //input country
      if (countryName[j] == localStorage.getItem("countryInput")){
        guessCountry = countryInUse[j]
        console.log('input')
      }
  }

  //create bubbles - by different years
  node2018 = createNodes(year2018);
  node2019 = createNodes(year2019);
  node2020 = createNodes(year2020);
  node2021 = createNodes(year2021);
  allNode = createNodes(allYear);

  function createNodes(data){
    //console.log(data);
    const maxSize = d3.max(data, d => + d.editors);
    const radiusScale = d3.scaleSqrt()
        .domain([0, maxSize])
        .range([1, 70]);
    const myNodes = data.map(d => ({
        ...d,
            radius: radiusScale(+d.editors),
            x: Math.random() * w,
            y: Math.random() * h
          }))
      return myNodes;
    }

  const elements2018 = viz.selectAll('.bubbles2018')
    .data(node2018, function(d,i){
          return d.country;
      })
    .enter()
    .append('g')
  ;

  bubbles2018 = elements2018
    .append('circle')
      .classed('bubble2018', true)
      .attr('r', d => d.radius)
      .attr('fill', getColor)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut)
  ;

  for (var c = 0; c < node2018.length; c++){
    if (guessCountry == node2018[c].country){
      bubbles2018.text(getText)
    }
  }

  const elements2019 = viz.selectAll('.bubble2019')
    .data(node2019, function(d,i){
          return d.country;
      })
    .enter()
    .append('g')
  ;

  bubbles2019 = elements2019
    .append('circle')
    .classed('bubble2019', true)
    .attr('r', d => d.radius)
    .attr('fill', getColor)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .text(getText)
  ;

  for (var c = 0; c < node2019.length; c++){
    if (guessCountry == node2019[c].country){
      bubbles2019.text(getText)
    }
  }

  const elements2020 = viz.selectAll('.bubble2020')
    .data(node2020, function(d,i){
          return d.country;
      })
    .enter()
    .append('g')
  ;

  bubbles2020 = elements2020
    .append('circle')
    .classed('bubble2020', true)
    .attr('r', d => d.radius)
    .attr('fill', getColor)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .text(getText)
  ;

  for (var c = 0; c < node2020.length; c++){
    if (guessCountry == node2020[c].country){
      bubbles2020.text(getText)
    }
  }

  const elements2021 = viz.selectAll('.bubble2021')
    .data(node2021, function(d,i){
          return d.country;
      })
    .enter()
    .append('g')
  ;

  bubbles2021 = elements2021
    .append('circle')
    .classed('bubble2021', true)
    .attr('r', d => d.radius)
    .attr('fill', getColor)
    .on("mouseover", handleMouseOver)
    .on("mouseout", handleMouseOut)
    .text(getText)
  ;

  for (var c = 0; c < node2021.length; c++){
    if (guessCountry == node2021[c].country){
      bubbles2021.text(getText)
    }
  }

  function getColor(d,i){
      for(let j = 0; j < countryInUse.length; j++){
        if (d.country == guessCountry){
          return 'red'
          console.log('turn red')
        } else
        if (d.country == countryInUse[j]){
        var identifier = continentInUse[j];
        //  console.log(identifier)
          if (identifier == "AF"){
            return colors[0];
          } else if (identifier == "NA"){
            return colors[1];
          } else if (identifier == "OC"){
            return colors[2];
          } else if (identifier == "AN"){
            return colors[3];
          } else if (identifier == "AS"){
            return colors[4];
          } else if (identifier == "EU"){
            return colors[5];
          } else if (identifier == "SA"){
            return colors[6];
          } else {
            return "green";
            console.log(d.country)
          }
        }
      }
    }

    // const allElements = viz.selectAll('.bubbles')
    //   .data(allNode, function(d,i){
    //         return d.country;
    //         console.log(d.country)
    //     })
    //   .enter()
    //   .classed('bubbles', true)
    //   .append('text')
    // ;
    //
    // allBubbles = allElements
    //   .text(getText);

    function getText(d,i){
      // if (guessCountry in d.country){
        div2.html('your guess country is ' + localStorage.getItem("countryInput")
                  + " and it is in red now."
                  + " By the time of March 2005, there were 195 languages registered for Wikipedia; while English Wikipedia remains the largest, followed by German, Japanese and French.")
            .style('top', '68%')
            .style('left', '35%')
            .style('text-align', 'left')
          ;
      //}
    }

    // Wrap every letter in a span
    var textWrapper = document.querySelector('.input');
    textWrapper.innerHTML = textWrapper.textContent.replace(/\S/g, "<span class='letter'>$&</span>");

    anime.timeline({loop: false})
      .add({
        targets: '.input .letter',
        opacity: [0,1],
        easing: "easeInOutQuad",
        duration: 500,
        delay: (el, i) => 500+10 * (i+1)
      });

  //simulate force - by different year
  const simulation2018 = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(charge))
    .force('center', d3.forceCenter(center2018.x, center2018.y))
    .force('x', d3.forceX().strength(forceStrength).x(center2018.x))
    .force('y', d3.forceY().strength(forceStrength).y(center2018.y))
    .force('collision', d3.forceCollide().radius(d => d.radius + 1))
    ;

  simulation2018.nodes(node2018)
    .on('tick', ticked2018)
    .restart(simulation2018)
  ;

  const simulation2019 = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(charge))
    .force('center', d3.forceCenter(center2019.x, center2019.y))
    .force('x', d3.forceX().strength(forceStrength).x(center2019.x))
    .force('y', d3.forceY().strength(forceStrength).y(center2019.y))
    .force('collision', d3.forceCollide().radius(d => d.radius + 1))
    ;

  simulation2019.nodes(node2019)
    .on('tick', ticked2019)
    .restart(simulation2019)
  ;

  const simulation2020 = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(charge))
    .force('center', d3.forceCenter(center2020.x, center2020.y))
    .force('x', d3.forceX().strength(forceStrength).x(center2020.x))
    .force('y', d3.forceY().strength(forceStrength).y(center2020.y))
    .force('collision', d3.forceCollide().radius(d => d.radius + 1))
    ;

  simulation2020.nodes(node2020)
    .on('tick', ticked2020)
    .restart(simulation2020)
  ;

  const simulation2021 = d3.forceSimulation()
    .force('charge', d3.forceManyBody().strength(charge))
    .force('center', d3.forceCenter(center2021.x, center2021.y))
    .force('x', d3.forceX().strength(forceStrength).x(center2021.x))
    .force('y', d3.forceY().strength(forceStrength).y(center2021.y))
    .force('collision', d3.forceCollide().radius(d => d.radius + 1))
    ;

  simulation2021.nodes(node2021)
    .on('tick', ticked2021)
    .restart(simulation2021)
  ;

  function charge(d) {
      return Math.pow(d.radius, 2.0) * 0.01
    }
  function restart(sim){
      sim.stop();
    }
  function ticked2021() {
      bubbles2021
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    }
  function ticked2020() {
      bubbles2020
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    }
  function ticked2019() {
      bubbles2019
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    }
  function ticked2018() {
      bubbles2018
        .attr('cx', d => d.x)
        .attr('cy', d => d.y)
    }
  function handleMouseOver(d, i) {  // Add interactivity
        d3.select(this)
          .attr("fill", "#554a8f")
        ;

        var identifier;
        for(let j = 0; j < countryInUse.length; j++){
          if (d.country == countryInUse[j]){
            identifier = countryName[j];
            }
        }

        document.addEventListener('mousemove', (event) => {
          let xPos, yPos;
            xPos = `${event.clientX}`;
            yPos = `${event.clientY}`;

            div.html("there are " + d.editors
                    + " active editors in " + identifier
                    + " in " + d.year)
               .attr('id', "h" + "-" + d.editors + i)
               .style('top', (yPos) + 'px')
               .style('left', (xPos) + "px")
            ;
          })
        //  console.log(div)
            div.style("opacity", 1);
        }

  function handleMouseOut(d, i) {  // Add interactivity
      d3.select(this).attr("fill", getColor);
      d3.select("#h" + "-" + d.editors + i).style('opacity', 0);
    }

  })
