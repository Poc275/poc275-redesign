var timesSquareMarker;
var centralParkMarker;
var grandCentralMarker;
var brooklynBridgeMarker;
var chryslerBuildingMarker;
var carnegieHallMarker;
var chinaTownMarker;

var map;

function initialise() {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(40.739437, -73.989855)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({ styles: styles });

    timesSquareMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.759015, -73.985115),
        animation: google.maps.Animation.DROP,
        title: "Times Square"
    });

    centralParkMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.774289, -73.970836),
        animation: google.maps.Animation.DROP,
        title: "Central Park"
    });

    grandCentralMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.752746, -73.977218),
        animation: google.maps.Animation.DROP,
        title: "Grand Central Terminal"
    });

    brooklynBridgeMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.706082, -73.996875),
        animation: google.maps.Animation.DROP,
        title: "Brooklyn Bridge"
    });

    chryslerBuildingMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.751657, -73.975311),
        animation: google.maps.Animation.DROP,
        title: "Chrysler Building"
    });

    carnegieHallMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.765138, -73.979935),
        animation: google.maps.Animation.DROP,
        title: "Carnegie Hall"
    });

    chinaTownMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(40.714859, -73.998033),
        animation: google.maps.Animation.DROP,
        title: "Chinatown"
    });

    google.maps.event.addListener(timesSquareMarker, 'click', showTimesSquareInfo);
    google.maps.event.addListener(centralParkMarker, 'click', showCentralParkInfo);
    google.maps.event.addListener(grandCentralMarker, 'click', showGrandCentralInfo);
    google.maps.event.addListener(brooklynBridgeMarker, 'click', showBrooklynBridgeInfo);
    google.maps.event.addListener(chryslerBuildingMarker, 'click', showChryslerBuildingInfo);
    google.maps.event.addListener(carnegieHallMarker, 'click', showCarnegieHallInfo);
    google.maps.event.addListener(chinaTownMarker, 'click', showChinatownInfo);
}

function showTimesSquareInfo() {
    document.getElementById('poi-popup-img').src = 'poi/times-square.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Times Square';
    document.getElementById('poi-popup-blurb').innerHTML = 'People, lights, adverts and non-stop banner headlines adorn this major commercial intersection. It is no wonder it is nicknamed \'The Crossroads of the World\'. The area is now pedestrianized, making for a much safer visit.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.759015, -73.985115));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showCentralParkInfo() {
    document.getElementById('poi-popup-img').src = 'poi/central-park.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Central Park';
    document.getElementById('poi-popup-blurb').innerHTML = 'Take refuge from the hustle and bustle of Manhattan life inside one of the planet\'s most spectacular parks.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.774289, -73.970836));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showGrandCentralInfo() {
    document.getElementById('poi-popup-img').src = 'poi/grand-central.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Grand Central Terminal';
    document.getElementById('poi-popup-blurb').innerHTML = 'Gaze at the awesome architecture on both the outside and inside, even if you are not catching a train.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.752746, -73.977218));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showBrooklynBridgeInfo() {
    document.getElementById('poi-popup-img').src = 'poi/brooklyn-bridge.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Brooklyn Bridge';
    document.getElementById('poi-popup-blurb').innerHTML = 'This was the world\'s first steel suspension bridge when completed in 1883. It is a wonderful structure that represents the progress of the country at that time. A pedestrian promenade runs across the top making for a pleasant walk and offering fantastic views of Lower Manhattan and Brooklyn. For a view of the bridge itself, make a loop back on yourself across Manhattan Bridge to see the structure in all its glory.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.705915, -73.996868));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showChryslerBuildingInfo() {
    document.getElementById('poi-popup-img').src = 'poi/chrysler-building.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Chrysler Building';
    document.getElementById('poi-popup-blurb').innerHTML = 'Just outside Grand Central Terminal, the Chrysler Building is an art deco masterpiece. Unfortunately visitors cannot go up, but you can go into the lobby. Luckily, the building is best viewed from the outside.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.751657, -73.975311));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showCarnegieHallInfo() {
    document.getElementById('poi-popup-img').src = 'poi/carnegie-hall.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Carnegie Hall';
    document.getElementById('poi-popup-blurb').innerHTML = 'How do you get to Carnegie Hall? It\'s at 57th and 7th.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.765138, -73.979935));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showChinatownInfo() {
    document.getElementById('poi-popup-img').src = 'poi/chinatown.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Chinatown';
    document.getElementById('poi-popup-blurb').innerHTML = 'Chinatown is a bustling community of over 120,000 residents. Take a stroll, eat from street stalls and take in some herbal remedies to experience one of the city\'s best ethnic hoods.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(40.714859, -73.998033));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function closePoiPopup() {
    document.getElementById('poi-popup').style.visibility = 'hidden';
    map.setZoom(13);
    map.setCenter(new google.maps.LatLng(40.739437, -73.989855));
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