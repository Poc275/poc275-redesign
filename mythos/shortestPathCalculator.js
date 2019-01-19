// The implementation is in another script and is ran beforehand to 
// generate the distance table which we then read here to speed 
// up the display of the visualisation.
var distancesTable = [];

function shortestPathInit() {
    // read the pre-calculated distance table data
    d3.json("dijkstra-distance-table.json").then(function(data) {
        distancesTable = data;
    });
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