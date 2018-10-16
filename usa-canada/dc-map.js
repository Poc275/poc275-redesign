var ww2Marker;
var washingtonMonumentMarker;
var lincolnMemorialMarker;
var whiteHouseMarker;
var capitolMarker;
var pentagonMarker;

var map;

function initialise() {
    var mapOptions = {
        zoom: 13,
        center: new google.maps.LatLng(38.889455, -77.040555)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({ styles: styles });

    ww2Marker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(38.889455, -77.040555),
        animation: google.maps.Animation.DROP,
        title: "National World War II Memorial"
    });

    washingtonMonumentMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(38.889488, -77.035297),
        animation: google.maps.Animation.DROP,
        title: "Washington Monument"
    });

    lincolnMemorialMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(38.889238, -77.050146),
        animation: google.maps.Animation.DROP,
        title: "Lincoln Memorial"
    });

    whiteHouseMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(38.897738, -77.036506),
        animation: google.maps.Animation.DROP,
        title: "The White House"
    });

    capitolMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(38.889783, -77.009184),
        animation: google.maps.Animation.DROP,
        title: "US Capitol"
    });

    pentagonMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(38.871860, -77.056198),
        animation: google.maps.Animation.DROP,
        title: "The Pentagon"
    });

    google.maps.event.addListener(ww2Marker, 'click', showWW2Info);
    google.maps.event.addListener(washingtonMonumentMarker, 'click', showWashingtonMonumentInfo);
    google.maps.event.addListener(lincolnMemorialMarker, 'click', showLincolnMemorialInfo);
    google.maps.event.addListener(whiteHouseMarker, 'click', showWhiteHouseInfo);
    google.maps.event.addListener(capitolMarker, 'click', showUSCapitolInfo);
    google.maps.event.addListener(pentagonMarker, 'click', showPentagonInfo);
}

function showWW2Info() {
    document.getElementById('poi-popup-img').src = 'poi/national-ww2-memorial.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'National World War II Memorial';
    document.getElementById('poi-popup-blurb').innerHTML = 'One of many monuments and memorials that line the National Mall, the National World War II memorial honours the nation\'s soldiers that served in the world\'s longest war. The central location of the memorial along the Mall makes it especially poignant. Two arcs on each side of a central fountain represent the two major theatres of battle, Atlantic and Pacific. The curved walls contain four thousand golden stars to honour the 400,000 fallen US soldiers.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(38.889455, -77.040555));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showWashingtonMonumentInfo() {
    document.getElementById('poi-popup-img').src = 'poi/the-washington-monument.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Washington Monument';
    document.getElementById('poi-popup-blurb').innerHTML = 'The centrepiece of the Mall, this huge marble obelisk is the structure that symbolises DC. Turn up early for a free ticket at the 15th Street Kiosk to take a trip to the top.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(38.889488, -77.035297));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showLincolnMemorialInfo() {
    document.getElementById('poi-popup-img').src = 'poi/lincoln-memorial.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Lincoln Memorial';
    document.getElementById('poi-popup-blurb').innerHTML = 'Climbing the steps of the Lincoln Memorial and being greeted with the man himself, seated, but with a steely gaze, is surely one of the most profound experiences you can partake in as a visitor to DC. It is here that you get a real sense for the history and politics of the country, either by reading the inscriptions of Lincoln\'s two most celebrated speeches, or by looking out over the reflecting pool and imagining the numerous gatherings that have forged the nation\'s historical identity.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(38.889238, -77.050146));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showWhiteHouseInfo() {
    document.getElementById('poi-popup-img').src = 'poi/white-house.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'The White House';
    document.getElementById('poi-popup-blurb').innerHTML = 'One of the most famous residences in the world, this huge Georgian mansion has been home to every US president and is an enduring symbol of American power. Unfortunately tours are hard to arrange these days. US citizens must arrange tours through their senator, whereas for foreign visitors, it must be arranged with the appropriate embassy months in advance.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(38.897738, -77.036506));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showUSCapitolInfo() {
    document.getElementById('poi-popup-img').src = 'poi/us-capitol.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'US Capitol';
    document.getElementById('poi-popup-blurb').innerHTML = 'This towering dome is the political centre of the country. It houses the Senate and House of Representatives, the two legislative bodies of Congress. Visit the underground visitor centre to find out about the political history of the nation.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(38.889783, -77.009184));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showPentagonInfo() {
    document.getElementById('poi-popup-img').src = 'poi/pentagon.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'The Pentagon';
    document.getElementById('poi-popup-blurb').innerHTML = 'One of the largest buildings in the world, this is home to the US Department of Defense. In the wake of terror attacks tours are almost impossible to arrange.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(38.871860, -77.056198));
    map.setMapTypeId('hybrid');
    map.setZoom(17);
}


function closePoiPopup() {
    document.getElementById('poi-popup').style.visibility = 'hidden';
    map.setZoom(13);
    map.setCenter(new google.maps.LatLng(38.889646, -77.022978));
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