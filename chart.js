// Set up the SVG canvas dimensions
const width = 800;
const height = 600;
const margin = { top: 50, right: 50, bottom: 50, left: 50 };

const svg = d3.select("svg")
    .attr("width", width)
    .attr("height", height);

// Define the scales
const xScale = d3.scaleLinear()
    .domain([0, 1000])
    .range([margin.left, width - margin.right]);

const yScale = d3.scaleLinear()
    .domain([0, 1000])
    .range([height - margin.bottom, margin.top]);

// Data (sample data based on your image)
const data = [
    { age: 65, cholesterol: 400, gender: 'Male', income: '$25,000+' },
    { age: 65, cholesterol: 300, gender: 'Male', income: '$0-$24,999' },
    { age: 65, cholesterol: 200, gender: 'Male', income: '$0-$24,999' },
    { age: 65, cholesterol: 400, gender: 'Female', income: '$25,000+' },
    { age: 65, cholesterol: 500, gender: 'Female', income: '$25,000+' },
    { age: 65, cholesterol: 700, gender: 'Female', income: '$0-$24,999' },
];

// Define the axis
const xAxis = d3.axisBottom(xScale);
const yAxis = d3.axisLeft(yScale);

svg.append("g")
    .attr("transform", `translate(0, ${height - margin.bottom})`)
    .call(xAxis);

svg.append("g")
    .attr("transform", `translate(${margin.left}, 0)`)
    .call(yAxis);

// Draw horizontal and vertical lines
svg.selectAll("line.horizontal")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", d => xScale(d.cholesterol))
    .attr("x2", d => xScale(0))
    .attr("y1", d => yScale(d.age))
    .attr("y2", d => yScale(d.age))
    .attr("stroke", "black")
    .attr("stroke-width", 1)
    .attr("stroke-dasharray", d => d.income === '$25,000+' ? "5, 5" : null);

svg.selectAll("line.vertical")
    .data(data)
    .enter()
    .append("line")
    .attr("x1", d => xScale(d.cholesterol))
    .attr("x2", d => xScale(d.cholesterol))
    .attr("y1", d => yScale(d.age))
    .attr("y2", d => yScale(d.age))
    .attr("stroke", "black")
    .attr("stroke-width", 1);

// Draw circles
svg.selectAll("circle")
    .data(data)
    .enter()
    .append("circle")
    .attr("cx", d => xScale(d.cholesterol))
    .attr("cy", d => yScale(d.age))
    .attr("r", 10)
    .attr("fill", "white")
    .attr("stroke", "black")
    .attr("stroke-width", 2)
    .on("mouseover", function(event, d) {
        d3.select(this).attr("fill", "lightblue");
    })
    .on("mouseout", function(event, d) {
        d3.select(this).attr("fill", "white");
    });
