    
/*
/*
*    Rutas.js
*    Tarea Visual Analytics
*/


var margin = { left:10, right:10, top:10, bottom:10 },
    height = 600 - margin.top - margin.bottom, 
    width = 1000 - margin.left - margin.right;

var svg = d3.select("#chart-area")
    .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)

var g = svg.append("g")
        .attr("transform", "translate(" + margin.left + 
            ", " + margin.top + ")");

var color = d3.scaleOrdinal(d3.schemeCategory10);

var graph;

//var continentColor = d3.scaleOrdinal(d3.schemePastel1);

// Add "forces" to the simulation here
var simulation = d3.forceSimulation()
    .force("center", d3.forceCenter(width / 2, height / 2))
    .force("charge", d3.forceManyBody().strength(-100))
    .force("collide", d3.forceCollide(20).strength(1))
    .force("link", d3.forceLink().id(function(d) { return d.id; }));

d3.json("data/RutasCol2.json").then(function(graph){
     
    update(graph);

});

/*$("#lista-grupos")
    .on("change", function(){
        update(graph);
    });*/

function update(data) {

    //console.log(graph);

    var group = $("#lista-grupos").val();

    console.log(group);

    /*var datafiltered = data.nodes.filter(function(d){
        if (group == "0") { return true; }
        else {
            return d.group == +group;
        }
    })*/

    console.log(datafiltered)

    // Add lines for every link in the dataset
    var link = g.append("g")
        .attr("class", "links")
        .selectAll("line")
        .data(data.links)
        .enter().append("line")
            .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

    // Add circles for every node in the dataset
    var node = g.append("g")
        .attr("class", "nodes")
        .selectAll("circle")
        .data(data.nodes)
        .enter().append("circle")
            .attr("r", 7)
            .attr("fill", function(d) { return color(d.group);})
            .call(d3.drag()
                .on("start", dragstarted)
                .on("drag", dragged)
                .on("end", dragended)
            );

    // Basic tooltips
    node.append("title")
        .text(function(d) { return d.id; });

    // Attach nodes to the simulation, add listener on the "tick" event
    simulation
        .nodes(data.nodes)
        .on("tick", ticked);

    // Associate the lines with the "link" force
    simulation.force("link")
        .links(data.links)

    // Dynamically update the position of the nodes/links as time passes
    function ticked() {
        link
            .attr("x1", function(d) { return d.source.x; })
            .attr("y1", function(d) { return d.source.y; })
            .attr("x2", function(d) { return d.target.x; })
            .attr("y2", function(d) { return d.target.y; });

        node
            .attr("cx", function(d) { return d.x; })
            .attr("cy", function(d) { return d.y; });
    }

// Change the value of alpha, so things move around when we drag a node
function dragstarted(d) {
if (!d3.event.active) simulation.alphaTarget(0.7).restart();
    d.fx = d.x;
    d.fy = d.y;
}

// Fix the position of the node that we are looking at
function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

// Let the node do what it wants again once we've looked at it
function dragended(d) {
if (!d3.event.active) simulation.alphaTarget(0);
    d.fx = null;
    d.fy = null;
}

}

/*    

    var svg = d3.select("svg"),
        width = +svg.attr("width"),
        height = +svg.attr("height");

    var color = d3.scaleOrdinal(d3.schemeCategory20);

    // Add "forces" to the simulation here
    var simulation = d3.forceSimulation()
        .force("center", d3.forceCenter(width / 2, height / 2))
        .force("charge", d3.forceManyBody().strength(-100))
        .force("collide", d3.forceCollide(20).strength(1))
        .force("link", d3.forceLink().id(function(d) { return d.id; }));

    d3.json("data/RutasCol2.json", function(error, graph) {
        if (error) throw error;

        console.log(graph);

        // Add lines for every link in the dataset
        var link = svg.append("g")
            .attr("class", "links")
            .selectAll("line")
            .data(graph.links)
            .enter().append("line")
                .attr("stroke-width", function(d) { return Math.sqrt(d.value); });

        // Add circles for every node in the dataset
        var node = svg.append("g")
            .attr("class", "nodes")
            .selectAll("circle")
            .data(graph.nodes)
            .enter().append("circle")
                .attr("r", 7)
                .attr("fill", function(d) { return color(d.group); })
                .call(d3.drag()
                    .on("start", dragstarted)
                    .on("drag", dragged)
                    .on("end", dragended)
                );

        // Basic tooltips
        node.append("title")
            .text(function(d) { return d.id; });

        // Attach nodes to the simulation, add listener on the "tick" event
        simulation
            .nodes(graph.nodes)
            .on("tick", ticked);

        // Associate the lines with the "link" force
        simulation.force("link")
            .links(graph.links)

        // Dynamically update the position of the nodes/links as time passes
        function ticked() {
            link
                .attr("x1", function(d) { return d.source.x; })
                .attr("y1", function(d) { return d.source.y; })
                .attr("x2", function(d) { return d.target.x; })
                .attr("y2", function(d) { return d.target.y; });

            node
                .attr("cx", function(d) { return d.x; })
                .attr("cy", function(d) { return d.y; });
        }
    });

    // Change the value of alpha, so things move around when we drag a node
    function dragstarted(d) {
    if (!d3.event.active) simulation.alphaTarget(0.7).restart();
        d.fx = d.x;
        d.fy = d.y;
    }

    // Fix the position of the node that we are looking at
    function dragged(d) {
        d.fx = d3.event.x;
        d.fy = d3.event.y;
    }

    // Let the node do what it wants again once we've looked at it
    function dragended(d) {
    if (!d3.event.active) simulation.alphaTarget(0);
        d.fx = null;
        d.fy = null;
    }*/