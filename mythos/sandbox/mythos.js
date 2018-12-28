var svg = d3.select("svg");
var margin = 0.8;
var width = +svg.attr("width");
var height = +svg.attr("height");
// var width = window.innerWidth * margin;
// var height = window.innerHeight * margin;


// the twelve olympians (dodecatheon)
// var olympians = [73, 71, 70, 69, 132, 135, 134, 127, 66, 126, 138, 240];
var olympians = [70, 69, 127, 66, 126, 73, 71, 138, 135, 132, 240, 134];
// interesting people worth highlighting
var interestingPeople = [1, 6, 9, 11, 21, 16, 42, 67, 68, 104, 120, 125, 140, 158, 163, 176, 254, 291, 356, 391];

// var xCentres = [50, 150, 250, 350, 450, 550, 650, 750, 850, 950, 1050, 1150];
var xCentres = [100, 200, 300, 400, 500, 600, 700, 800, 900, 1000, 1100, 1200];
var yCentres = [0, 200, 400, 1000, 1700];

var simulation = d3.forceSimulation()
    .force("link", d3.forceLink().id(function(d) { return d.id; }).distance(10))
    .force("charge", d3.forceManyBody().strength(-15))
    .force("collision", d3.forceCollide().radius(function(d) { return 12; }))
    // .force("x", d3.forceX().x(function(d) { return d.nearest_olympian * d.distance_to_olympian; }))
    // .force("x", d3.forceX().x(function(d) { return xPosGenerator(d); }))
    .force("x", d3.forceX().x(function(d) { return xCentres[d.nearest_olympian]; }))
    // .force("y", d3.forceY().y(function(d) { return d.home_pos; }))
    .force("y", d3.forceY().y(function(d) { return yPosGenerator(d.age); }))
    // .force("x", d3.forceX())
    // .force("y", d3.forceY())
    // .force("radial", d3.forceRadial().radius(function(d) { return 200; }))
    .force("center", d3.forceCenter(width / 2, height / 2));


var color = d3.scaleOrdinal(d3.schemeCategory10);

var opacityScale = d3.scaleLinear()
    .range([ 1, 0.5, 0.4, 0.3, 0.2, 0.1])
    .domain([0, 1, 2, 3, 4, 5, 6])
    .clamp(true);

var yAxisScale = d3.scaleLinear()
    .range([0, 200, 300, 600])
    .domain([0, 200, 400, 600]);


function xPosGenerator(d) {
    if(olympians.indexOf(d.id) > -1) {
        return olympians.indexOf(d.id) * 150;
    }

    return d.nearest_olympian * 150;
}

function yPosGenerator(age) {
    switch(age) {
        case "Creation":
            return yCentres[0];
        case "Golden":
            return yCentres[1];
        case "Silver":
            return yCentres[2];
        case "Bronze":
            return yCentres[3];
        case "Heroic":
            return yCentres[4];
        default:
            return yCentres[3];
    }
}


d3.json("mythos.json").then(function(graph) {
    // var link = svg.append("g")
    //     .attr("class", "links")
    //     .selectAll("line")
    //     .data(graph.links)
    //     .enter().append("line")
    //     // .attr("stroke-width", function(d) { return Math.sqrt(d.value); });
    //     .attr("stroke-width", function(d) { return Math.sqrt(1); });

    var link = svg.append("svg:g").selectAll("path")
        .data(graph.links)
        .enter().append("svg:path")
        .attr("stroke-opacity", function(d) { return opacityScale(d.distance_to_olympian) * 0.5; })
        .attr("class", "link");

    var node = svg.append("g")
        .attr("class", "nodes")
        .selectAll("g")
        .data(graph.nodes)
        .enter().append("g")
        .on("click", function(d) {
            console.log(d);
        });

    // console.log(node);
        
    var circles = node.append("circle")
        .attr("r", function(d) {
            if(olympians.indexOf(d.id) > -1) {
                return 10;
            }
            if(interestingPeople.indexOf(d.id) > -1) {
                return 6;
            }
            return 4;
        })
        .attr("fill", function(d) { return color(d.age); })
        .call(d3.drag()
            .on("start", dragstarted)
            .on("drag", dragged)
            .on("end", dragended));

    // node.append("text")
    //     .text(function(d) {
    //         if(d.group === "Olympians") {
    //             return d.name;
    //         } else {
    //             return "";
    //         }
    //     })
    //     .attr('x', 6)
    //     .attr('y', 3);

    node.append("title")
        .text(function(d) { return d.name; });

    simulation
        .nodes(graph.nodes)
        .on("tick", ticked);

    simulation.force("link")
        .links(graph.links);

    simulation.on("end", function() {
        // export nodes and links with x,y positions
        var a = document.createElement("a");
        var nodesFile = new Blob([JSON.stringify(simulation.nodes())], {type: 'application/json'});
        a.href = URL.createObjectURL(nodesFile);
        a.download = 'node-positions-by-age.json';
        a.click();

        var a2 = document.createElement("a");
        var linksFile = new Blob([JSON.stringify(simulation.force("link").links())], {type: 'application/json'});
        a2.href = URL.createObjectURL(linksFile);
        a2.download = 'node-links-by-age.json';
        a2.click();
    });

    function ticked() {
        // link
        //     .attr("x1", function(d) { return d.source.x; })
        //     .attr("y1", function(d) { return d.source.y; })
        //     .attr("x2", function(d) { return d.target.x; })
        //     .attr("y2", function(d) { return d.target.y; });

        link.attr("d", function(d, i) {
            var dx = d.target.x - d.source.x;
            var dy = d.target.y - d.source.y;

            dr = Math.sqrt(dx * dx + dy * dy);

            return "M" + 
                d.source.x + "," + 
                d.source.y + "A" + 
                dr + "," + dr + " 0 0,1 " +
                d.target.x + "," + 
                d.target.y;
        });

        node
            .attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
    }
});



function dragstarted(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0.3).restart();
    }
    d.fx = d.x;
    d.fy = d.y;
}

function dragged(d) {
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}

function dragended(d) {
    if (!d3.event.active) {
        simulation.alphaTarget(0);
    }
    // return to original position when drag ended
    // to fix position it moves to set to d3.event.x/y
    // d.fx = null;
    // d.fy = null;
    d.fx = d3.event.x;
    d.fy = d3.event.y;
}
