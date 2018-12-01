// clicked node in information mode, just highlight the node
function highlightClickedNode(d) {
    // hide the tooltip
    tooltipWrapper.style('opacity', 0);

    // show the clicked person's title
    firstClickedName.text(d.name);
    var labelOffset = 10;
    firstClickNodeWrapper
        .attr('transform', 'translate(' + d.x + ',' + (d.y - labelOffset) + ')')
        .style('opacity', 1)
        .transition().duration(400)
        .attr('transform', 'translate(' + d.x + ',' + (d.y - labelOffset - 15) + ')');

    // show rotating circle on the clicked person
    clickedCircle
        .attr('cx', d.x)
        .attr('cy', d.y)
        .transition().duration(300)
        .style('opacity', 1);
}

// clicked node in shortest path mode
function clickedOnNode(d) {
    // hide the tooltip
    tooltipWrapper.style('opacity', 0);

    if(!clickLocked) {
        clickLocked = true;
        startNode = d;

        // show the clicked person's title
        firstClickedName.text(d.name);
        var labelOffset = 10;
        firstClickNodeWrapper
            .attr('transform', 'translate(' + d.x + ',' + (d.y - labelOffset) + ')')
            .style('opacity', 1)
            .transition().duration(400)
            .attr('transform', 'translate(' + d.x + ',' + (d.y - labelOffset - 15) + ')');

        // show rotating circle on the clicked person
        clickedCircle
            .attr('cx', d.x)
            .attr('cy', d.y)
            .transition().duration(300)
            .style('opacity', 1);
    } else {
        // a second person has been clicked
        endNode = d;

        // show rotating circle over them
        clickedCircleEnd
            .attr('cx', d.x)
            .attr('cy', d.y)
            .transition().duration(300)
            .style('opacity', 1);

        // show the clicked person's title
        pathClickedName.text(d.name);
        var labelOffset = 10;
        pathClickNodeWrapper
            .attr('transform', 'translate(' + d.x + ',' + (d.y - labelOffset) + ')')
            .style('opacity', 1)
            .transition().duration(400)
            .attr('transform', 'translate(' + d.x + ',' + (d.y - labelOffset - 15) + ')');

        setTimeout(function() {
            // find the shortest route
            route = findRoute(startNode.id, endNode.id);
            // highlight the route
            highlightRoute(route);
        }, 310);

        pathLocked = true;
    }

    // stop propagation to the svg
    d3.event.stopPropagation();
}

// highlight shortest path route
function highlightRoute(path) {
    var distanceNum = 1;

    // make all nodes in route brighter and make the rest transparent
    var nodesInPath = path.map(function(d) { return d.source; });
    nodesInPath = nodesInPath.concat(path.map(function(d) { return d.target; }));
    nodesInPath = uniq(nodesInPath);
    clearCanvas();

    // highlight the links between the nodes in the path
    linkSave.forEach(function(d) {
        d.inPath = false;
        var closeSource = nodesInPath.indexOf(d.source.id);
        var closeTarget = nodesInPath.indexOf(d.target.id);
        if(closeSource > -1 && closeTarget > -1) {
            d.inPath = true;
        }

        ctxLinks.lineWidth = d.inPath ? 2 : 0.5;
        ctxLinks.globalAlpha = d.inPath ? 0.7 : 0.01;
        ctxLinks.setLineDash(d.lineDash);
        ctxLinks.beginPath();
        drawCircleArc(d.centre, d.r, d.source, d.target, d.sign);
        ctxLinks.stroke();
        ctxLinks.closePath();
    });

    // draw the nodes
    nodesSave.forEach(function(d) {
        ctxNodes.globalAlpha = nodesInPath.indexOf(d.id) > -1 ? opacityScaleHover(distanceNum) : 0.1;
        var col = nodesInPath.indexOf(d.id) > -1 ? colourScale(distanceNum) : colourScale(1000);
        ctxNodes.fillStyle = col;
        ctxNodes.shadowBlur = olympians.indexOf(d.id) > -1 || interestingPeople.indexOf(d.id) > -1 ? 30 : 15;
        ctxNodes.shadowColor = col;

        ctxNodes.beginPath();
        ctxNodes.moveTo(d.x + d.radius, d.y);
        ctxNodes.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
        ctxNodes.fill();
        ctxNodes.closePath();
    });

    ctxNodes.shadowBlur = 0;
    labelWrapper.selectAll('.olympian-label, .interesting-person-label')
        .transition().duration(200)
        .style('opacity', function(d) { return nodesInPath.indexOf(d.id) > -1 ? 1 : 0.1; });
}

// clear click event when user clicks away from a node and resets the appearance
function clearClicks() {
    // remove clicked circle highlights
    d3.selectAll('.node-clicked')
        .transition().duration(300)
        .style('opacity', 0);
    
    // reset mouse events
    clickLocked = false;
    pathLocked = false;

    // hide titles
    firstClickNodeWrapper
        .transition('transp').duration(100)
        .style('opacity', 0);

    pathClickNodeWrapper
        .transition('transp').duration(100)
        .style('opacity', 0);

    // reset the visualisation
    mouseOut();
}