var oldCityHallMarker;
var waterfrontMarker;
var eatonCentreMarker;

var map;

function initialise() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(43.652665, -79.381811)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({ styles: styles });

    oldCityHallMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(43.652665, -79.381811),
        animation: google.maps.Animation.DROP,
        title: "Old City Hall"
    });

    waterfrontMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(43.638969, -79.384695),
        animation: google.maps.Animation.DROP,
        title: "Waterfront"
    });

    eatonCentreMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(43.656013, -79.380804),
        animation: google.maps.Animation.DROP,
        title: "Eaton Centre"
    });


    google.maps.event.addListener(oldCityHallMarker, 'click', showOldCityHallInfo);
    google.maps.event.addListener(waterfrontMarker, 'click', showWaterfrontInfo);
    google.maps.event.addListener(eatonCentreMarker, 'click', showEatonCentreInfo);
}

function showOldCityHallInfo() {
    document.getElementById('poi-popup-img').src = 'poi/old-city-hall.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Old City Hall';
    document.getElementById('poi-popup-blurb').innerHTML = 'This ornate building, home to the municipal government until 1965, was thankfully not demolished to make way for its replacement. Take a peek inside to see the impressive stained-glass windows that symbolise the city\'s growth.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(43.652665, -79.381811));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showWaterfrontInfo() {
    document.getElementById('poi-popup-img').src = 'poi/toronto-waterfront.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Waterfront';
    document.getElementById('poi-popup-blurb').innerHTML = 'At the edge of Lake Ontario lies a splendid boulevard of quays, shops, galleries, performance spaces and restaurants. Take a stroll along the boardwalk and immerse yourself in the sights and sounds, and maybe even take in a free concert.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(43.638969, -79.384695));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showEatonCentreInfo() {
    document.getElementById('poi-popup-img').src = 'poi/eaton-centre-dundas-square.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Eaton Centre';
    document.getElementById('poi-popup-blurb').innerHTML = 'This is a shopper\'s paradise. Over 230 shops are packed into the centre\'s five stories. But even if you are not shopping, a look inside at the soaring glass roof is well worth it. Make use of the amazing subterranean network called PATH to get around. This 16 mile long underground world links stores, restaurants, offices and hotels from the Eaton Centre to Union Station. The letters P A T H act as coloured guides to help you navigate.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(43.656013, -79.380804));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}


function closePoiPopup() {
    document.getElementById('poi-popup').style.visibility = 'hidden';
    map.setZoom(14);
    map.setCenter(new google.maps.LatLng(43.652665, -79.381811));
    map.setMapTypeId('roadmap');
}

function loadScriptAsync() {
    var script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = 'https://maps.googleapis.com/maps/api/js?v=3.exp&' +
        'callback=initialise&key=AIzaSyBK-MLMYxipGuLE2PQSDeeZIhlhnqxA_v8';
    document.body.appendChild(script);
}

window.onload = loadScriptAsync;

var styles = [
    {
        featureType: "all",
        stylers: [
            { saturation: -80 }
        ]
    },{
        featureType: "road.arterial",
        elementType: "geometry.fill",
        stylers: [
            { hue: "#00ffee" },
            { saturation: 50 }
        ]
    },{
        featureType: "water",
        elementType: "geometry",
        stylers: [
            { hue: "#7AA297" }
        ]
    },{
        featureType: "road.arterial",
        elementType: "geometry.stroke",
        stylers: [
            { color: "#808080" }
        ]
    }
];