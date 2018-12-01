function mouseOvered(d, nodes) {
    repeatSearch = true;
    mouseOverDone = true;
    clearTimeout(startSearch);
    tooltipExtra.selectAll('tspan').remove();

    // don't show the tooltip on a node that already has a title
    if(!clickLocked || (d.id !== startNode.id && d.id !== endNode.id)) {
        tooltipName.text(d.name);
        tooltipTitle.text(d.roman_name === 'nan' ? '' : d.roman_name);
        var tooltipOffset = d.roman_name === 'nan' ? 12 : 28;
        var isExtra = interestingPeople.indexOf(d.id);
        if(isExtra > -1) {
            tooltipExtra.attr('y', d.roman_name === 'nan' ? 50 : 70)
            .style('opacity', 1)
            .text(interestingPeople[isExtra].roman_name)
            .call(wrap, 200);
        }

        tooltipWrapper.transition('move').duration(100)
            .attr('transform', 'translate(' + d.x + ',' + (d.y - tooltipOffset) + ')');
        tooltipWrapper.transition('transp').duration(100)
            .style('opacity', 1);
    }

    if(!clickLocked) {
        clearTimeout(connectionsLooper);
        startSearch = setTimeout(function() {
            if(repeatSearch) {
                initiateConnectionSearch(d, nodes);
            }
        }, 500);
    }

    // stop propagation to the svg
    d3.event.stopPropagation();
}

function initiateConnectionSearch(d, nodes) {
    doMouseOut = true;

    selectedNodes[d.id] = 0;
    selectedNodeIds = [d.id];
    oldLevelSelectedNodes = [d.id];
    counter = 0;
    findConnections(nodes, selectedNodes, selectedNodeIds, oldLevelSelectedNodes, counter);
}

// loop through related nodes one step further
function findConnections(nodes, selectedNodes, selectedNodeIds, oldLevelSelectedNodes, counter) {
    if(counter === 0) {
        hideAllNodes();
    }

    showNodes(selectedNodeIds[0], oldLevelSelectedNodes, selectedNodeIds, selectedNodes);

    // normally six degrees of separation but the gods are a tight knit community!
    if(repeatSearch && counter < 3) {
        var levelSelectedNodes = [];
        for(var i = 0; i < oldLevelSelectedNodes.length; i++) {
            // get all linked nodes
            var connectedNodes = linkedToId[oldLevelSelectedNodes[i]];
            // remove nodes we already have
            connectedNodes = connectedNodes.filter(function(n) {
                return selectedNodeIds.indexOf(n) === -1;
            });
            for(var j = 0; j < connectedNodes.length; j++) {
                var id = connectedNodes[j];
                selectedNodes[id] = counter + 1;
                selectedNodeIds.push(id);
                levelSelectedNodes.push(id);
            }
        }

        counter += 1;

        oldLevelSelectedNodes = uniq(levelSelectedNodes);
        connectionsLooper = setTimeout(function() {
            findConnections(nodes, selectedNodes, selectedNodeIds, oldLevelSelectedNodes, counter);
        }, 80);
    } else if(repeatSearch && counter >= 3) {

    }
}

function hideAllNodes() {
    clearCanvas();

    // draw the lines
    ctxLinks.globalAlpha = 0.01;
    ctxLinks.lineWidth = 0.5;
    ctxLinks.beginPath();
    linkSave.forEach(function(d) {
        ctxLinks.setLineDash(d.lineDash);
        drawCircleArc(d.centre, d.r, d.source, d.target, d.sign);
    });
    ctxLinks.stroke();
    ctxLinks.closePath();

    // draw the nodes
    ctxNodes.globalAlpha = opacityScaleHover(1000);
    ctxNodes.fillStyle = colourScale(1000);
    ctxNodes.beginPath();
    nodesSave.forEach(function(d) {
        ctxNodes.moveTo(d.x + d.radius, d.y);
        ctxNodes.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
    });
    ctxNodes.fill();
    ctxNodes.closePath();

    labelWrapper.selectAll('.olympian-label, .interesting-person-label')
        .transition('label').duration(0)
        .style('opacity', 0.1);
}

//Highlight the found relatives
function showNodes(id, nodeIDs, allNodeIDs, selectedNodes) {
    // draw the more visible lines
    linkSave.filter(function(d) { return allNodeIDs.indexOf(d.source.id) > -1 && allNodeIDs.indexOf(d.target.id) > -1; })
        .forEach(function(d) {
            d.hoverMin = 1000;
            var closeSource = selectedNodes[d.source.id];
            var closeTarget = selectedNodes[d.target.id];
            if (typeof closeSource !== 'undefined' && typeof closeTarget !== 'undefined') { 
                d.hoverMin = Math.min(closeSource, closeTarget);
            }
    
            ctxLinks.lineWidth = d.hoverMin !== 1000 ? thicknessScaleHover(d.hoverMin) : 0.5; 
            ctxLinks.globalAlpha = Math.min(opacityScaleHover( d.hoverMin ) * 0.1, 0.05);
    
            ctxLinks.setLineDash(d.lineDash);
            ctxLinks.beginPath();
            drawCircleArc(d.centre, d.r, d.source, d.target, d.sign);
            ctxLinks.stroke();
            ctxLinks.closePath();
    });
  
    // draw the more visible nodes
    nodesSave.filter(function(d) { return nodeIDs.indexOf(d.id) > -1; })
        .forEach(function(d) {
            d.closeNode = selectedNodes[d.id];
    
            ctxNodes.globalAlpha = opacityScaleHover(d.closeNode);
            ctxNodes.fillStyle = colourScaleHover(d.closeNode);
            ctxNodes.shadowBlur = olympians.indexOf(d.id) > -1 || interestingPeople.indexOf(d.id) > -1 ? 30 : 15;
            ctxNodes.shadowColor = colourScaleHover(d.closeNode);
    
            ctxNodes.beginPath();
            ctxNodes.moveTo(d.x + d.radius, d.y);
            ctxNodes.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
            ctxNodes.fill();
            ctxNodes.closePath();
    });
    ctxNodes.shadowBlur = 0;
  
    // highlight title if an interesting person
    labelWrapper.selectAll('.olympian-label, .interesting-person-label')
        .filter(function(o) { return nodeIDs.indexOf(o.id) > -1; })
        .transition('label').duration(500)
        .style('opacity', 1);
}

// go back to normal when mouse moved out of a node
function mouseOut() {
    // remove possible tspan created by wrap function
    tooltipExtra.selectAll('tspan').remove();
    tooltipWrapper.transition('transp').duration(100).style('opacity', 0);

    // don't do a mouseout when a node was clicked
    if(clickLocked) {
        return;
    }

    // disrupt the mouseover event so no flashing happens
    repeatSearch = false;
    clearTimeout(connectionsLooper);
    clearTimeout(startSearch);

    //Only run the mouse out the first time you really leave a node that you spend a 
    //significant amount of time hovering over
    if(!doMouseOut) {
        return;
    }

    // redraw the visual
    clearCanvas();
    ctxLinks.strokeStyle = '#d4d4d4';
    ctxLinks.lineWidth = 1.5;
    drawLinks(linkSave);
    drawNodes(nodesSave);

    // reset the opacity
    labelWrapper.selectAll('.olympian-label, .interesting-person-label').style('opacity', null);

    doMouseOut = false;
}