var oldStateHouseMarker;
var oldCityHallMarker;
var stateHouseMarker;
var oldGranaryBuryingGroundMarker;
var bostonHarborMarker;
var bostonCommonMarker;
var cheersBarMarker;
var charlesRiverEsplanadeMarker;
var faneuilHallMarker;

var map;

function initialise() {
    var mapOptions = {
        zoom: 14,
        center: new google.maps.LatLng(42.358729, -71.057459)
    };

    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    map.setOptions({ styles: styles });

    oldStateHouseMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.358729, -71.057459),
        animation: google.maps.Animation.DROP,
        title: "Old State House"
    });

    oldCityHallMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.358115, -71.059344),
        animation: google.maps.Animation.DROP,
        title: "Old City Hall"
    });

    stateHouseMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.358780, -71.063817),
        animation: google.maps.Animation.DROP,
        title: "Massachusetts State House"
    });

    oldGranaryBuryingGroundMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.357476, -71.061717),
        animation: google.maps.Animation.DROP,
        title: "Old Granary Burying Ground"
    });

    bostonHarborMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.359086, -71.049960),
        animation: google.maps.Animation.DROP,
        title: "Boston Waterfront"
    });

    bostonCommonMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.355043, -71.065667),
        animation: google.maps.Animation.DROP,
        title: "Boston Common"
    });

    cheersBarMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.355959, -71.071234),
        animation: google.maps.Animation.DROP,
        title: "Cheers Bar"
    });

    charlesRiverEsplanadeMarker = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.356366, -71.076109),
        animation: google.maps.Animation.DROP,
        title: "Charles River Esplanade"
    });

    faneuilHallMarker  = new google.maps.Marker({
        map: map,
        position: new google.maps.LatLng(42.360099, -71.056151),
        animation: google.maps.Animation.DROP,
        title: "Faneuil Hall"
    });


    google.maps.event.addListener(oldStateHouseMarker, 'click', showOldStateHouseInfo);
    google.maps.event.addListener(oldCityHallMarker, 'click', showOldCityHallInfo);
    google.maps.event.addListener(stateHouseMarker, 'click', showStateHouseInfo);
    google.maps.event.addListener(oldGranaryBuryingGroundMarker, 'click', showOldGranaryBuryingGroundInfo);
    google.maps.event.addListener(bostonHarborMarker, 'click', showBostonWaterfrontInfo);
    google.maps.event.addListener(bostonCommonMarker, 'click', showBostonCommonInfo);
    google.maps.event.addListener(cheersBarMarker, 'click', showCheersBarInfo);
    google.maps.event.addListener(charlesRiverEsplanadeMarker, 'click', showCharlesRiverEsplanadeInfo);
    google.maps.event.addListener(faneuilHallMarker, 'click', showFaneuilHallInfo);
}

function showOldStateHouseInfo() {
    document.getElementById('poi-popup-img').src = 'poi/old-state-house.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Old State House';
    document.getElementById('poi-popup-blurb').innerHTML = 'This graceful building was the centre of British rule for Massachusetts, later serving as Boston City Hall. The incongruous site of the building, with skyscrapers surrounding it, magnifies its colonial past. The site houses a small but comprehensive museum explaining the city\'s role in the revolution.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.358729, -71.057459));
    map.setMapTypeId('hybrid');
    map.setZoom(19);
}

function showOldCityHallInfo() {
    document.getElementById('poi-popup-img').src = 'poi/boston-old-city-hall.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Old City Hall';
    document.getElementById('poi-popup-blurb').innerHTML = 'The Old City Hall was home to Boston City Council from 1865 to 1969. The French inspired architecture is one of the few remaining buildings of that style that remains in the country.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.358115, -71.059344));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showStateHouseInfo() {
    document.getElementById('poi-popup-img').src = 'poi/massachusetts-state-house.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Massachusetts State House';
    document.getElementById('poi-popup-blurb').innerHTML = 'The unmistakable gold dome of the Massachusetts State House represents the confidence that independence had given to the country. Free tours run until 3.30pm and take approximately 40 minutes.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.358780, -71.063817));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showOldGranaryBuryingGroundInfo() {
    document.getElementById('poi-popup-img').src = 'poi/old-granary-burying-ground.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Old Granary Burying Ground';
    document.getElementById('poi-popup-blurb').innerHTML = 'One of the more peaceful stops along the Freedom Trail, this is the final resting place for many leaders of the revolution, including James Otis, Samuel Adams, Paul Revere and John Hancock.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.357476, -71.061717));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showBostonWaterfrontInfo() {
    document.getElementById('poi-popup-img').src = 'poi/boston-waterfront.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Boston Waterfront and Long Wharf';
    document.getElementById('poi-popup-blurb').innerHTML = 'Thanks to the Big Dig road construction program, the waterfront area is no longer divided by a huge expressway. This has led to a regeneration of the whole area. Take a pleasant stroll along the wharf to escape the busy historical sites. The New England Aquarium is a popular destination for little ones, and boat tours to the Harbor Islands depart from here.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.359086, -71.049960));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showBostonCommonInfo() {
    document.getElementById('poi-popup-img').src = 'poi/boston-common.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Boston Common';
    document.getElementById('poi-popup-blurb').innerHTML = 'The Common is a good central location from which to familiarise yourself with the downtown area. Most of the popular tourist attractions can be easily reached from here, and the Freedom Trail starts within the Common itself.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.355043, -71.065667));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showCheersBarInfo() {
    document.getElementById('poi-popup-img').src = 'poi/cheers-bar.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Cheers';
    document.getElementById('poi-popup-blurb').innerHTML = 'Along Beacon Street, one of Boston\'s most picturesque streets, sits the inspiration for the hit TV series Cheers. Be warned however, if you do venture inside, it is almost certain no one will know your name, and the interior bears little resemblance to the actual set used in the show.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.355959, -71.071234));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showCharlesRiverEsplanadeInfo() {
    document.getElementById('poi-popup-img').src = 'poi/charles-river-esplanade.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Charles River Esplanade';
    document.getElementById('poi-popup-blurb').innerHTML = 'Following the Charles River, the Esplanade is a nine mile public space that makes for scenic walks away from the chaos of the city. Free concerts are a common occurrence on summer evenings at the Hatch Shell, just along the Esplanade.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.356366, -71.076109));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function showFaneuilHallInfo() {
    document.getElementById('poi-popup-img').src = 'poi/faneuil-hall.jpg';
    document.getElementById('poi-popup-title').innerHTML = 'Faneuil Hall';
    document.getElementById('poi-popup-blurb').innerHTML = 'Nicknamed the &ldquo;Cradle of Liberty&rdquo;, this building was where the revolution took hold. It was here that Samuel Adams and James Otis stirred support for independence by opposing British tax legislation. It was also home for the war meetings during the Revolution. The marketplace around the hall is a bustling gathering place that\'s good for a bite to eat and a bit of history. Oh, and in case you wondering, it rhymes with &ldquo;flannel&rdquo;.';
    document.getElementById('poi-popup').style.visibility = 'visible';

    // tilt view
    map.panTo(new google.maps.LatLng(42.360099, -71.056151));
    map.setMapTypeId('hybrid');
    map.setZoom(19);

    if (map.getTilt()) {
        map.setTilt(45);
    }
}

function closePoiPopup() {
    document.getElementById('poi-popup').style.visibility = 'hidden';
    map.setZoom(14);
    map.setCenter(new google.maps.LatLng(42.358729, -71.057459));
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