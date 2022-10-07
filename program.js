// First, we need a frame  
const FRAME_HEIGHT = 200;
const FRAME_WIDTH = 500; 
const MARGINS = {left: 50, right: 50, top: 50, bottom: 50};

const FRAME1 = d3.select("#vis1") 
                  .append("svg") 
                    .attr("height", FRAME_HEIGHT)   
                    .attr("width", FRAME_WIDTH)
                    .attr("class", "frame"); 


        
function build_interactive_plot() {

    d3.csv("data/data.csv").then((data) => {
  
      // Build plot inside of .then 
      // find max X
      const MAX_X3 = d3.max(data, (d) => { return parseInt(d.x); });
      
      // Define scale functions that maps our data values 
      // (domain) to pixel values (range)
      const X_SCALE3 = d3.scaleLinear() 
                        .domain([0, (MAX_X3 + 10000)]) // add some padding  
                        .range([0, VIS_WIDTH]); 
  
      // Use X_SCALE to plot our points
      FRAME3.selectAll("points")  
          .data(data) // passed from .then  
          .enter()       
          .append("circle")  
            .attr("cx", (d) => { return (X_SCALE3(d.x) + MARGINS.left); }) 
            .attr("cy", MARGINS.top) 
            .attr("r", 20)
            .attr("class", "point");
  
      // Add an axis to the vis  
      FRAME3.append("g") 
            .attr("transform", "translate(" + MARGINS.left + 
                  "," + (VIS_HEIGHT + MARGINS.top) + ")") 
            .call(d3.axisBottom(X_SCALE3).ticks(4)) 
              .attr("font-size", '20px'); 
  
  
    });
  }
  build_interactive_plot();