// Sizing
var margin = {
    top: -100, // pulls the graph up
    right: 0,
    bottom: 0,
    left: 50
};
var totalWidth = 1400;
var totalHeight = 1900;
var width = totalWidth - margin.left - margin.right;
var height = totalHeight - margin.top - margin.bottom;

// Canvas
var canvasLinks = d3.select('#mythos-chart').append('canvas');
var ctxLinks = canvasLinks.node().getContext('2d');
canvasLinks.attr('width', totalWidth)
    .attr('height', totalHeight)
    .style('width', totalWidth + 'px')
    .style('height', totalHeight + 'px');
ctxLinks.translate(margin.left, margin.top);

var canvasNodes = d3.select('#mythos-chart').append('canvas')
    .attr('width', totalWidth)
    .attr('height', totalHeight)
    .style('width', totalWidth + 'px')
    .style('height', totalHeight + 'px');
var ctxNodes = canvasNodes.node().getContext('2d');
ctxNodes.translate(margin.left, margin.top);

// SVG
var svg = d3.select('#mythos-chart').append('svg')
    .attr('width', totalWidth)
    .attr('height', totalHeight)
    .append('g')
    .attr('transform', 'translate(' + (margin.left) + ',' + (margin.top) + ')')
    .style('isolation', 'isolate');

var hoverRect = svg.append('rect')
    .attr('class', 'hoverRect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', totalWidth)
    .attr('height', totalHeight);

// persons of interest
var olympianDetails = [
    {id: 70, name: 'Poseidon', roman_name: 'Neptune', description: 'God of the seas'},
    {id: 69, name: 'Demeter', roman_name: 'Ceres', description: 'Goddess of the harvest'},
    {id: 66, name: 'Aphrodite', roman_name: 'Venus', description: 'Goddess of love, beauty and pleasure'},
    {id: 127, name: 'Ares', roman_name: 'Mars', description: 'God of war'},
    {id: 126, name: 'Hephaestus', roman_name: 'Vulcan', description: 'God of fire, blacksmiths and metalworkers'},
    {id: 71, name: 'Hera', roman_name: 'Juno', description: 'Queen of the gods'},
    {id: 73, name: 'Zeus', roman_name: 'Jupiter', description: 'King of the gods'},
    {id: 138, name: 'Hermes', roman_name: 'Mercury', description: 'God of messengers and trade'},
    {id: 135, name: 'Apollo', roman_name: 'Apollo', description: 'God of logic and reason'},
    {id: 240, name: 'Dionysus', roman_name: 'Bacchus', description: 'God of wine and revelry'},
    {id: 132, name: 'Athena', roman_name: 'Minerva', description: 'Goddess of wisdom and warcraft'},
    {id: 134, name: 'Artemis', roman_name: 'Diana', description: 'Goddess of hunting'}
];
var olympians = olympianDetails.map(function(olympian) {
    return olympian.id;
});
var interestingPeopleDetails = [
    {id: 1, name: 'Chaos', roman_name: 'Khaos', description: 'The void from which spawned the entire Cosmos'},
    {id: 6, name: 'Gaia', roman_name: 'Terra', description: 'Mother Earth'},
    {id: 9, name: 'Ouranos', roman_name: 'Uranus', description: 'Primordial God of the Sky'},
    {id: 16, name: 'Kronos', roman_name: 'Saturn', description: 'Primordial God of earth, sea, sky and time'},
    {id: 36, name: 'Helios', roman_name: 'Sol', description: 'Charioteer of the sun'},
    {id: 40, name: 'Atlas', roman_name: '', description: 'Bearer of the heavens'},
    {id: 42, name: 'Prometheus', roman_name: '', description: 'God of forethought'},
    {id: 67, name: 'Hestia', roman_name: 'Vesta', description: 'Goddess of hospitality or xenia'},
    {id: 68, name: 'Hades', roman_name: 'Pluto', description: 'King of the underworld'},
    {id: 104, name: 'Medusa', roman_name: '', description: 'Gorgon with hair of snakes'},
    {id: 120, name: 'Kerberos', roman_name: 'Cerberus', description: 'The hound of Hades'},
    {id: 125, name: 'Persephone', roman_name: 'Prosperina', description: 'Queen of the underworld, goddess of the seasons'},
    {id: 140, name: 'Pandora', roman_name: '', description: 'Her box would unleash untold suffering on the world'},
    {id: 158, name: 'Human Beings 2.0', roman_name: '', description: 'True civilisation began here'},
    {id: 163, name: 'Sisyphus', roman_name: '', description: 'Fated to push a boulder uphill for eternity'},
    {id: 176, name: 'Eros', roman_name: 'Cupid', description: 'God of physical desire'},
    {id: 254, name: 'Asclepius', roman_name: 'Aesculapius', description: 'God of medicine and healing'},
    {id: 291, name: 'Herakles', roman_name: 'Hercules', description: 'One of the most famous of the Heroes'},
    {id: 356, name: 'Narcissus', roman_name: '', description: 'Fell in love with himself'},
    {id: 391, name: 'Midas', roman_name: '', description: 'Everything he touched turned to gold'},
    {id: 412, name: 'Perseus', roman_name: '', description: 'The destroyer'},
    {id: 514, name: 'Bellerophon', roman_name: '', description: 'The slayer of monsters astride the winged horse Pegasus'},
    {id: 75, name: 'Orpheus', roman_name: '', description: 'Greatest musician of all'},
    {id: 530, name: 'Jason', roman_name: '', description: 'Leader of the Argonauts'},
    {id: 605, name: 'Atalanta', roman_name: '', description: 'The co-equal'},
    {id: 300, name: 'Oedipus', roman_name: '', description: 'Unwittingly married his mother'},
    {id: 645, name: 'Theseus', roman_name: '', description: 'Hero of Athens'},
    {id: 287, name: 'Odysseus', roman_name: 'Ulysses', description: 'Brains before brawn'},
    {id: 129, name: 'Achilles', roman_name: '', description: 'Mighty warrior of the Trojan war'},
    {id: 597, name: 'Hector', roman_name: '', description: 'Mighty warrior of the Trojan war'}
];
var interestingPeople = interestingPeopleDetails.map(function(interestingPerson) {
    return interestingPerson.id;
});

// Main x,y scales
var ageSpread = [0, 200, 400, 1000, 1700];
var ageLoc = d3.range(0, height, height / ageSpread.length).concat(height).reverse();
var ageOrdinalScale = d3.scaleOrdinal()
    .range([80, 500, 650, 800, 1000])
    .domain(['Creation', 'Golden', 'Silver', 'Bronze', 'Heroic']);

var ageScale = d3.scaleLinear()
    .range(ageLoc)
    .domain(ageSpread);

svg.append('g')
    .attr('class', 'axis axis--y')
    .attr('transform', 'translate(' + 15 + ',' + 150 + ')')
    .call(d3.axisLeft(ageOrdinalScale));

// Other Scales
var opacityScale = d3.scaleLinear()
    .range([1, 0.5, 0.4, 0.3, 0.2, 0.1])
    .domain([0, 1, 2, 3, 4, 5, 6])
    .clamp(true);

var opacityScaleHover = d3.scaleLinear()
    .range([1, 0.95, 0.7, 0.075])
    .domain([0, 1, 6, 7])
    .clamp(true);

var colourScale = d3.scaleLinear()
    .range(['#fff7b9','#fff196','#ffea72','#ffe348','#fddc18'])
    .domain([0, 1, 2, 4, 6])
    .clamp(true);

var hoverColours = ['#fd150b','#ffc33b', '#2dff57'].reverse();
var colourScaleHover = d3.scaleLinear()
    .range(hoverColours)
    .domain([1, 2, 3])
    .clamp(true);

var thicknessScaleHover = d3.scaleLinear()
    .range([2.5, 1.5])
    .domain([0, 3]);

var interestingPersonColour = '#C6E2E7';

var spreadScale = d3.scaleLinear()
    // .range([186, 301, 360, 463, 500, 550, 600, 700, 800, 900, 1000, 1400])
    .range([100, width - 100])
    .domain([0, olympians.length - 1]);
    // .clamp(true);

// voronoi to aid mouse hover and clicks
var voronoi = d3.voronoi()
    .x(function(d) { return d.x; })
    .y(function(d) { return d.y; })
    .extent([[0, 0], [totalWidth, totalHeight]]);
var diagram;

// create legend
createLegend(hoverColours, colourScale, interestingPersonColour);

// label wrapper
var labelWrapper = svg.append('g').attr('class', 'label-wrapper');

// tooltips
var tooltipWrapper = labelWrapper.append('g')
    .attr('class', 'tooltip-wrapper')
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
    .style('opacity', 0);

var tooltipName = tooltipWrapper.append('text')
    .attr('class', 'tooltip-name')
    .text('Placeholder');

var tooltipTitle = tooltipWrapper.append('text')
    .attr('class', 'tooltip-title')
    .attr('y', 15)
    .text('Placeholder');

var tooltipExtra = tooltipWrapper.append('text')
    .attr('class', 'tooltip-extra-info')
    .attr('x', 0)
    .attr('y', 50)
    .attr('dy', 0)
    .style('opacity', 0)
    .text('');

// add y axis label
labelWrapper.append('text')
    .attr('class', 'age-label')
    .attr('transform', 'translate(' + 0 + ',' + ageScale(1850) + ') rotate(-90)')
    .text('(Ages of Man)');

// add labels
var olympianTextWrapper = labelWrapper.selectAll('.olympian-label')
    .data(olympianDetails)
    .enter().append('g')
    .attr('class', 'olympian-label')
    .attr('transform', function(d, i) {
        // return 'translate(' + (spreadScale(i)) + ',' + ageScale(1400) + ')';
        // 50px to account for top margin
        return 'translate(' + (spreadScale(i)) + ',' + 150 + ')';
    });

olympianTextWrapper.append('text')
    .attr('class', 'olympian-name')
    .text(function(d) { return d.name; });

olympianTextWrapper.append('text')
    .attr('class', 'olympian-roman-name')
    .attr('y', 15)
    .text(function(d) { return d.roman_name; });

var interestingPersonTextWrapper = labelWrapper.selectAll('.interesting-person-label')
    .data(interestingPeopleDetails)
    .enter().append('g')
    .attr('class', 'interesting-person-label')
    .style('opacity', 0);

interestingPersonTextWrapper.append('text')
    .attr('class', 'olympian-name interesting-person-name')
    .attr('y', 23)
    .text(function(d) { return d.name; });

// Mouse events
var repeatSearch;
var connectionsLooper;
var startSearch;
var doMouseOut = true;
var stopMouseOut;
var counter = 0;
var mouseOverDone = false;
var selectedNodes = {};
var selectedNodeIds = [];
var oldLevelSelectedNodes;

// Click events
var clickLocked = false;
var pathLocked = false;
var startNode = {};
var endNode = {};
startNode.id = 0;
endNode.id = 0;
var route;

// clicked node appearance
var clickedCircle = svg.append('circle')
    .attr('class', 'node-clicked')
    .attr('r', 16)
    .style('opacity', 0);

var clickedCircleEnd = svg.append('circle')
    .attr('class', 'node-clicked')
    .attr('r', 16)
    .style('opacity', 0);

// first person clicked label
var firstClickNodeWrapper = labelWrapper.append('g')
    .attr('class', 'tooltip-wrapper')
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
    .style('opacity', 0);

var firstClickedName = firstClickNodeWrapper.append('text')
    .attr('class', 'tooltip-name')
    .text('');

// second person clicked label
var pathClickNodeWrapper = labelWrapper.append('g')
    .attr('class', 'tooltip-wrapper')
    .attr('transform', 'translate(' + 0 + ',' + 0 + ')')
    .style('opacity', 0);

var pathClickedName = pathClickNodeWrapper.append('text')
    .attr('class', 'tooltip-name')
    .text('');

// Read in the data
var linkedByIndex = {};
var linkedToId = {};
var nodeById = {};

var nodesSave;
var linkSave;
var files = ['node-links-by-age.json', 'node-positions-by-age.json'];
var promises = [];
files.forEach(function(filepath) {
    promises.push(d3.json(filepath));
});

Promise.all(promises).then(function(values) {
    var links = values[0];
    var nodes = values[1];

    // add interesting people's text labels
    interestingPersonTextWrapper.attr('transform', function(d, i) {
        var chosenNode = nodes.filter(function(n) { return n.id === d.id; })[0];
        return 'translate(' + chosenNode.x + ',' + chosenNode.y + ')';
    })
    .style('opacity', null);

    // create links
    links.forEach(function(d) {
        linkedByIndex[d.source.id + ',' + d.target.id] = true;

        // build adjacency list
        if(!linkedToId[d.source.id]) {
            linkedToId[d.source.id] = [];
        }
        if(!linkedToId[d.target.id]) {
            linkedToId[d.target.id] = [];
        }
        linkedToId[d.source.id].push(d.target.id);
        linkedToId[d.target.id].push(d.source.id);

        d.opacity = opacityScale(d.distance_to_olympian) * 0.2;
        d.sign = Math.random() > 0.5;

        // radius of link
        d.r = Math.sqrt(sq(d.target.x - d.source.x) + sq(d.target.y - d.source.y)) * 2;
        // find centre of arc
        var centres = findCentres(d.r, d.source, d.target);
        d.centre = d.sign ? centres.c2 : centres.c1;
        switch(d.type) {
            case 'spouse':
                d.lineDash = [3,3];
                break;
            
            case 'acquaintance':
                d.lineDash = [10,10];
                break;
            
            default:
                d.lineDash = [];
        }
    });

    linkSave = links;
    ctxLinks.strokeStyle = '#d4d4d4';
    ctxLinks.lineWidth = 1.5;
    drawLinks(links);

    // create nodes
    nodes.forEach(function(d) {
        d.radius = 4;
        if(olympians.indexOf(d.id) > -1) {
            d.radius = 10;
        }
        if(interestingPeople.indexOf(d.id) > -1) {
            d.radius = 6;
        }

        d.fill = colourScale(d.distance_to_olympian);
        if(interestingPeople.indexOf(d.id) > -1) {
            d.fill = interestingPersonColour;
        }

        d.opacity = opacityScale(d.distance_to_olympian);
        if(interestingPeople.indexOf(d.id) > -1) {
            d.opacity = 1;
        }

        nodeById[d.id] = d;
    });

    diagram = voronoi(nodes);
    nodesSave = nodes;
    drawNodes(nodes);

    // hover mouse event
    var currentHover = null;

    hoverRect.on('mousemove', function() {
        d3.event.stopPropagation();

        // find the nearest person to the mouse (within 10px)
        var m = d3.mouse(this);
        var found = diagram.find(m[0], m[1], 10);

        if(currentHover === found) {
        }
        else if(found) {
            d3.event.preventDefault();
            mouseOvered(found.data, nodes);
        } else {
            mouseOut();
        }

        currentHover = found;
    });

    // click event
    hoverRect.on('click', function() {
        d3.event.stopPropagation();

        // find the nearest person to the mouse
        var m = d3.mouse(this);
        var found = diagram.find(m[0], m[1], 20);

        if(found) {
            // check if we are in investigate mode or shortest path mode
            if(document.getElementById('information-btn').checked) {
                // investigate mode
                highlightClickedNode(found.data);
                showPersonInfoWindow(found.data);
            } else {
                // shortest path mode
                clickedOnNode(found.data);
            }
        } else {
            clearClicks();
        }
    });

    // initialise shortest paths
    shortestPathInit();

}).catch(function(err) {
    throw err;
});

function drawLinks(links) {
    links.forEach(function(d) {
        ctxLinks.setLineDash(d.lineDash);
        ctxLinks.globalAlpha = d.opacity;
        ctxLinks.beginPath();
        drawCircleArc(d.centre, d.r, d.source, d.target, d.sign);
        ctxLinks.stroke();
    });
}

function drawCircleArc(c, r, p1, p2, side) {
    var ang1 = Math.atan2(p1.y - c.y, p1.x - c.x);
    var ang2 = Math.atan2(p2.y - c.y, p2.x - c.x);
    ctxLinks.arc(c.x, c.y, r, ang1, ang2, side);
}

function drawNodes(nodes, opacity, fill) {
    nodes.forEach(function(d) {
        ctxNodes.beginPath();
        ctxNodes.moveTo(d.x + d.radius, d.y);
        ctxNodes.arc(d.x, d.y, d.radius, 0, 2 * Math.PI);
        ctxNodes.globalAlpha = opacity ? opacity : d.opacity;
        ctxNodes.fillStyle = fill ? fill : d.fill;
        ctxNodes.shadowBlur = olympians.indexOf(d.id) > -1 || interestingPeople.indexOf(d.id) > -1 ? 30 : 15;
        ctxNodes.shadowColor = d.fill;
        ctxNodes.fill();
        ctxNodes.closePath();
    });

    ctxNodes.shadowBlur = 0;
}

// https://stackoverflow.com/questions/26030023/draw-arc-initial-point-radius-and-final-point-in-javascript-canvas
// http://jsbin.com/jutidigepeta/3/edit?html,js,output
function findCentres(r, p1, p2) {
    // pm is middle point of p1 and p2
    var pm = { x: 0.5 * (p1.x + p2.x), y: 0.5 * (p1.y + p2.y) };
    var perpABdx = -(p2.y - p1.y);
    var perpABdy = p2.x - p1.x;
    var norm = Math.sqrt(sq(perpABdx) + sq(perpABdy));
    perpABdx /= norm;
    perpABdy /= norm;

    // distance from pm to p1
    var dpmp1 = Math.sqrt(sq(pm.x - p1.x) + sq(pm.y - p1.y));
    var sin = dpmp1 / r;

    // can a circle be drawn?
    if(sin < -1 || sin > 1) {
        return null;
    }
    // yes, compute the two centres
    var cos = Math.sqrt(1 - sq(sin));
    var d = r * cos;
    var res1 = { x: pm.x + perpABdx * d, y: pm.y + perpABdy * d };
    var res2 = { x: pm.x - perpABdx * d, y: pm.y - perpABdy * d };

    return { c1: res1, c2: res2};
}

// canvas functions
function clearCanvas() {
    ctxLinks.clearRect(0, -margin.top, totalWidth, totalHeight);
    ctxNodes.clearRect(0, -margin.top, totalWidth, totalHeight);
}

// information window functions
function showPersonInfoWindow(person) {
    // complete placeholder with person's details
    document.getElementById('pic').style.backgroundImage = 
        'linear-gradient(to bottom, rgba(44, 62, 80, 0.22) 0%, rgba(44, 62, 80, 1) 100%), url(images/' + person.id + '.jpg)';
    document.getElementById('name').innerText = person.name === 'nan' ? '' : person.name;
    document.getElementById('god-of').innerText = person.god_of === 'nan' ? '' : person.god_of;
    document.getElementById('roman-name').innerHTML = person.roman_name === 'nan' ? '' : '&mdash; ' + person.roman_name + ' &mdash;';

    var gender = '';
    switch(person.gender) {
        case 'Male':
            gender = '<i class="fas fa-mars"></i>';
            break;
        case 'Female':
            gender = '<i class="fas fa-venus"></i>';
            break;
        case 'Male and Female':
            gender = '<i class="fas fa-venus-mars"></i>';
            break;
        case 'Intersex':
            gender = '<i class="fas fa-transgender"></i>';
            break;
        default:
            break;
    }

    var home = '<i class="fas fa-home"></i> ' + person.home;

    var group = person.group === 'nan' ? '' : person.group;
    var secondaryInfo = gender + ' | ' + home + ' | ' + '<i class="far fa-clock"></i> ' + person.age + ' age | ' + '<i class="fas fa-tags"></i> ' + group;
    document.getElementById('secondary-info').innerHTML = secondaryInfo;

    if(person.notes === 'nan') {
        // hide bio title
        document.getElementById('bio-title').style.display = 'none';
        document.getElementById('bio').innerText = '';
    } else {
        document.getElementById('bio-title').style.display = 'block';
        document.getElementById('bio').innerText = person.notes;
    }
    
    // darken background of main content
    var canvii = document.getElementsByTagName('canvas');
    for (let i = 0; i < canvii.length; i++) {
        canvii[i].style.opacity = 0.2;
    }

    // show window
    document.getElementById('info-window').style.width = "500px";
}

function closeInfoWindow() {
    // reset background colour of main content
    var canvii = document.getElementsByTagName('canvas');
    for (let i = 0; i < canvii.length; i++) {
        canvii[i].style.opacity = 1;
    }

    // hide window
    document.getElementById('info-window').style.width = "0";
}

// Helper functions
function sq(x) {
    return x * x;
}

function uniq(a) {
    return a.sort().filter(function(item, pos, ary) {
        return !pos || item != ary[pos - 1];
    });
}

// wrap text in an svg
function wrap(text, width, heightLine) {
    text.each(function() {
        var text = d3.select(this);
        var words = text.text().split(/\s+/).reverse();
        var word;
        var line = [];
        var lineNumber = 0;
        var lineHeight = (typeof heightLine === 'undefined' ? 1.6 : heightLine);
        var y = text.attr('y');
        var x = text.attr('x');
        var dy = parseFloat(text.attr('dy'));
        var tspan = text.text(null).append('tspan').attr('x', x).attr('y', y).attr('dy', dy + 'em');

        while(word = words.pop()) {
            line.push(word);
            tspan.text(line.join(' '));
            if(tspan.node().getComputedTextLength() > width) {
                line.pop();
                tspan.text(line.join(' '));
                line = [word];
                tspan = text.append('tspan').attr('x', x).attr('y', y).attr('dy', ++lineNumber * lineHeight + dy + 'em').text(word);
            }
        }
    });
}