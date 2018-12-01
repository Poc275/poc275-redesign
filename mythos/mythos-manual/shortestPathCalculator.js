// implementation of Dijkstra's shortest path finder algorithm
var distancesTable = [];

function shortestPathCalculator(nodes, links) {
    for(var i = 0; i < nodes.length; i++) {
        var distanceTable = [];
        nodes.map(function(node) {
            // initialise distance table which will store the shortest path details
            // Dijkstra's algorithm stores the shortest distance from all nodes 
            // to a specific starting node
            distanceTable.push({
                nodeId: node.id,
                shortestDistanceFromFirstNode: Infinity,
                previousNodeId: 0,
                visited: false
            });
        });

        // initialise the starting node with a shortest distance of zero 
        // because this is the node we will be starting at
        distanceTable[i].shortestDistanceFromFirstNode = 0;

        // start traversing the graph
        var currentNode = getNextUnvisitedNode(distanceTable);
        while(currentNode !== null) {
            // get the node's connections
            var connections = getConnectedNodes(currentNode, links);
            // update the distanceTable
            connections.forEach(function(connection) {
                // retrieve connected node from the distance table
                var connectedNodeIdx = distanceTable.findIndex(dt => dt.nodeId === connection.connectedNodeId);
                // if the connected node has already been visited then ignore it
                if(!distanceTable[connectedNodeIdx].visited) {
                    // check the shortest distance, note this is the distance that starts 
                    // from the root node, to the currentNode and then to the connected node
                    var totalDistance = currentNode.shortestDistanceFromFirstNode + connection.distance;
                    if(totalDistance < distanceTable[connectedNodeIdx].shortestDistanceFromFirstNode) {
                        // we have a shorter path, update the table
                        distanceTable[connectedNodeIdx].shortestDistanceFromFirstNode = totalDistance;
                        // update previous node id
                        distanceTable[connectedNodeIdx].previousNodeId = currentNode.nodeId;
                    }
                }
            });

            // finished with this node, mark it as visited
            var idx = distanceTable.findIndex(dt => dt.nodeId === currentNode.nodeId);
            distanceTable[idx].visited = true;

            // get the next node
            currentNode = getNextUnvisitedNode(distanceTable);
        }

        // add to overall distances table
        distancesTable.push({
            nodeId: distanceTable[i].nodeId,
            distanceTable: distanceTable
        });
    }

    // console.log(distancesTable);
}

// this function returns the next unvisited node with the shortest distance from our root node
function getNextUnvisitedNode(distanceTable) {
    var nextUnvisitedNode = null;
    var currentShortestDistance = Infinity;
    
    distanceTable.forEach(function(node) {
        if(node.visited === false && node.shortestDistanceFromFirstNode < currentShortestDistance) {
            // we've found a closer unvisited node, update the flags
            currentShortestDistance = node.shortestDistanceFromFirstNode;
            nextUnvisitedNode = node;
        }
    });

    return nextUnvisitedNode;
}

// this function returns all connected nodes to a given node
function getConnectedNodes(node, links) {
    var connections = [];

    links.forEach(function(link) {
        // is the node the source of any connections?
        if(link.source.id === node.nodeId) {
            connections.push({
                // connected node is the target of a source
                connectedNodeId: link.target.id,
                distance: getConnectionDistance(link.type)
            });
        }

        // is the node the target of any connections
        if(link.target.id === node.nodeId) {
            connections.push({
                // connected node is the source of a target
                connectedNodeId: link.source.id,
                distance: getConnectionDistance(link.type)
            });
        }
    });

    return connections;
}

// function that returns the distance of a connection based on the type of relationship
function getConnectionDistance(linkType) {
    // we'll assume that a person is closest to their parents, then spouse etc.
    switch(linkType) {
        case 'parent':
            return 1;
        case 'spouse':
            return 2;
        case 'sibling':
            return 3;
        case 'acquaintance':
            return 4;
        default:
            return 5;
    }
}

// function that returns the shortest route between two nodes
function findRoute(startNodeId, endNodeId) {
    var route = [];
    // get the specific distance table for the starting node
    var distancesTableIdx = distancesTable.findIndex(dt => dt.nodeId === startNodeId);
    var distanceTable = distancesTable[distancesTableIdx].distanceTable;

    // use a stack to find the shortest route, so start from the end and work backwards
    var endNodeIdx = distanceTable.findIndex(dt => dt.nodeId === endNodeId);
    var endNode = distanceTable[endNodeIdx];
    route.push({
        source: endNode.nodeId,
        target: endNode.previousNodeId
    });

    var nextNodeId = endNode.previousNodeId;
    while(nextNodeId !== startNodeId) {
        var nextNodeIdx = distanceTable.findIndex(dt => dt.nodeId === nextNodeId);
        var nextNode = distanceTable[nextNodeIdx];
        route.push({
            source: nextNode.nodeId,
            target: nextNode.previousNodeId
        });

        // update the latest id
        nextNodeId = nextNode.previousNodeId;
    }

    // we must now pop from the route stack to return the correct order
    var correctOrderRoute = [];
    while(route.length > 0) {
        correctOrderRoute.push(route.pop());
    }

    return correctOrderRoute;
}