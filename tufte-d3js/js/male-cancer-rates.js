var container = document.getElementById("male-cancer-rates");
var w = container.clientWidth;
var h = 1000;

var projection = d3.geoAlbersUsa()
                    .translate([w / 2, h / 2])
                    .scale([w]);

var path = d3.geoPath(projection);

var svg = d3.select("#male-cancer-rates").append("svg")
    .attr("width", w)
    .attr("height", h);

// RGB range colour scheme from color brewer
// note we haven't applied the domain yet as we haven't got the data
var colourDomain = d3.scaleLinear()
                    .range(['rgb(247,247,247)','rgb(204,204,204)','rgb(150,150,150)','rgb(99,99,99)','rgb(37,37,37)']);

d3.csv("https://poc275.me/tufte-d3js/data/Male Mortality Rate All Cancers.csv").then(function(data) {
    // now we have the data we can apply the domain to the colour range scale
    var min = d3.min(data, function(d) { return parseFloat(d.AGE_ADJUSTED_RATE); });
    var max = d3.max(data, function(d) { return parseFloat(d.AGE_ADJUSTED_RATE); });

    // colourDomain.domain([min, max]);
    colourDomain.domain(d3.ticks(min, max, 7));

    d3.json("https://poc275.me/tufte-d3js/data/gz_2010_us_050_00_5m.json").then(function(json) {
        // join csv data to json data
        for(var i = 0; i < data.length; i++) {
            var area = data[i].AREA;
            // grab area code (contained in parentheses)
            var areaCode = area.split(/[()]/)[1];
            var areaRate = parseFloat(data[i].AGE_ADJUSTED_RATE);

            for(var j = 0; j < json.features.length; j++) {
                // combine state and county code to get a unique code for matching
                var countyCode = json.features[j].properties.STATE + json.features[j].properties.COUNTY;
                if(areaCode == countyCode) {
                    // matches, assign value to this JSON property for use in colouring later
                    json.features[j].properties.value = areaRate;
                    break;
                }
            }
        }

        //add tooltip
        var mapTooltip = d3.select("body").append("div")   
                .attr("class", "tooltip")               
                .attr("id", "mapTooltip")
                .style("opacity", 0);

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("stroke", "#333")
            .attr("stroke-width", "0.25")
            .style("fill", function(d) {
                // now we can grab the value property
                var value = d.properties.value;
                if(value) {
                    return colourDomain(value);
                } else {
                    return "#fff";
                }
            })
            .on("mouseover", function(d) {
                mapTooltip.transition()
                    .duration(500)      
                    .style("opacity", .9);

                var valueText = !Number.isNaN(d.properties.value) ? d.properties.value : "No Data Available";
                var tip = "<strong class='sans'>" + d.properties.NAME + "</strong><br/>"
                var tip = tip + "<strong class='sans' >Mortality Rate: </strong>" + valueText + "<br/>";

                mapTooltip.html(tip)  
                    .style("left", (d3.event.pageX + 28) + "px")
                    .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                mapTooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
        });
        
        // using custom legend ticks as opposed to using the data itself
        var legendData = [0, 149.5, 188.4, 227.7, 607.3];

        // add color legend
        svg.selectAll("rect")		                        	
            .data(legendData)
            .enter()
            .append("rect")
            .attr("x", function(d, i) {return i * 25;})
            .attr("y", h - 140)
            .attr("width", 25)
            .attr("height", 10)
            .attr("stroke", "#aaa")
            .attr("stroke-width", "0.25")
            .attr("fill", function(d) { return colourDomain(d); });

        svg.selectAll("text")
            .data([legendData[0], legendData[legendData.length - 1]])
            .enter()
            .append("text")
            .text(function(d){ return d; })
            .attr("x", function(d,i){ return (i * (25 * 5));})
            .attr("y", h - 150)
            .attr("font-size", "12px")
            .attr("font-family", "sans-serif")
            .attr("class", "sans");
    });
});