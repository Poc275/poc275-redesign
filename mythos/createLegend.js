function createLegend(hoverColours, colorScale, interestingPersonColour) {
    var svg = d3.select('#legend')
        .append('svg')
        .attr('width', 500)
        .attr('height', 260)
        .append('g')
        .attr('transform', 'translate(' + 0 + ',' + 0 + ')');

    // nodes legend
    var circleLegendData = [
        { radius: 10, radiusStroke: 18, colour: colorScale(0), offset: 20, label: 'Olympian'},
        { radius: 6, radiusStroke: 14, colour: interestingPersonColour, offset: 60, label: 'Person of interest'},
        { radius: 4, radiusStroke: 0, colour: colorScale(2), offset: 100, label: 'Person'}
    ];

    svg.selectAll('.node-legend')
        .data(circleLegendData)
        .enter().append('circle')
        .attr('class', 'node-legend')
        .attr('cx', 10)
        .attr('cy', function(d) { return d.offset; })
        .attr('r', function(d) { return d.radius; })
        .style('fill', function(d) { return d.colour; });

    svg.selectAll('.legend-node-text')
        .data(circleLegendData)
        .enter().append('text')
        .attr('class', 'legend-node-text')
        .attr('x', 45)
        .attr('y', function(d) { return d.offset; })
        .attr('dy', '0.4em')
        .text(function(d) { return d.label; });

    // links legend
    var linkDistance = 90;

    // left link legend (parent-child)
    var linkLegendLeft = svg.append('g')
        .attr('class', 'link-legend-wrapper')
        .attr('transform', 'translate(' + 10 + ',' + 150 + ')');

    linkLegendLeft.selectAll('.link-circle-legend.left')
        .data([0, 1])
        .enter().append('circle')
        .attr('class', 'link-circle-legend left')
        .attr('cx', function(d, i) { return i * linkDistance; })
        .attr('r', 4)
        .style('fill', colourScale(2));

    linkLegendLeft.append('path')
        .attr('class', 'link-path-legend')
        .attr('d', function (d) {
              var dr = linkDistance;
              return ['M', 0, 0, 'A', dr, dr, '0 0 1', linkDistance, 0].join(' ');
            });
    
    linkLegendLeft.append('text')
        .attr('class', 'legend-link-text')
        .attr('x', 0)
        .attr('y', 30)
        .text('parent - child');

    // centre link legend (spouse)
    var linkLegendCentre = svg.append('g')
        .attr('class', 'link-legend-wrapper')
        .attr('transform', 'translate(' + 150 + ',' + 150 + ')');
    
    linkLegendCentre.selectAll('.link-circle-legend.centre')
        .data([0,1])
        .enter().append('circle')
        .attr('class', 'link-circle-legend centre')
        .attr('cx', function(d, i) { return i * linkDistance; })
        .attr('r', 4)
        .style('fill', colorScale(2));
    
    linkLegendCentre.append('path')
        .attr('class', 'link-path-legend link-couple')
        .attr('d', function (d) {
              var dr = linkDistance;
              return ['M', 0, 0, 'A', dr, dr, '0 0 1', linkDistance, 0].join( ' ' );
            });
    
    linkLegendCentre.append('text')
        .attr('class', 'legend-link-text')
        .attr('x', 22)
        .attr('y', 30)
        .text('spouse');

    

    // right link legend (acquaintance)
    var linkLegendRight = svg.append('g')
        .attr('class', 'link-legend-wrapper')
        .attr('transform', 'translate(' + 300 + ',' + 150 + ')');
    
    linkLegendRight.selectAll('.link-circle-legend.right')
        .data([0,1])
        .enter().append('circle')
        .attr('class', 'link-circle-legend right')
        .attr('cx', function(d, i) { return i * linkDistance; })
        .attr('r', 4)
        .style('fill', colorScale(2));
    
    linkLegendRight.append('path')
        .attr('class', 'link-path-legend link-acquaintance')
        .attr('d', function (d) {
              var dr = linkDistance;
              return ['M', 0, 0, 'A', dr, dr, '0 0 1', linkDistance, 0].join( ' ' );
            });
    
    linkLegendRight.append('text')
        .attr('class', 'legend-link-text')
        .attr('x', 0)
        .attr('y', 30)
        .text('acquaintance');




    // hover colour legend
    var defs = svg.append('defs');

    defs.append('linearGradient')
        .attr('id', 'gradient-color')
        .attr('gradientUnits', 'userSpaceOnUse')
        .attr('x1', 20)
        .attr('y1', '0%')
        .attr('x2', 120)
        .attr('y2', '0%')
        .selectAll('stop')
        .data(hoverColours)
        .enter().append('stop')
        .attr('offset', function(d, i) { return i / (hoverColours.length - 1); })
        .attr('stop-color', function(d, i) { return d; });

    var colourHoverLegendWrapper = svg.append('g')
        .attr('class', 'colour-legend-wrapper')
        .attr('transform', 'translate(' + 10 + ',' + 220 + ')');

    svg.append('path')
        .attr('class', 'legend-colour-path')
        .attr('d', 'M' + 10 + ',' + 210 + ' L ' + 120 + ',' + 210)
        .style('stroke', 'url(#gradient-color)')
        .style('stroke-dasharray', '0 16')
        .style('stroke-width', 8);

    colourHoverLegendWrapper.append('text')
        .attr('class', 'legend-color-text')
        .attr('x', 140)
        .attr('y', 0)
        .text('(degrees of separation on hover)');

    colourHoverLegendWrapper.append('text')
        .attr('class', 'legend-color-value')
        .attr('x', 0)
        .attr('y', 20)
        .text('1');

    colourHoverLegendWrapper.append('text')
        .attr('class', 'legend-color-value')
        .attr('x', 100)
        .attr('y', 20)
        .style('text-anchor', 'end')
        .text('3');
}