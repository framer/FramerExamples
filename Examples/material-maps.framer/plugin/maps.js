 function initialize() {
  var mapOptions = {
    zoom: 8,
    center: new google.maps.LatLng(-34.397, 150.644)
  };

  var map = new google.maps.Map(document.getElementById('map-canvas'),
      mapOptions);
}

function loadScript() {
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBLUwjNFB3fEP27QyNXNMW2MTA9yizYDnE&' +
      'callback=initialize';
  document.body.appendChild(script);
}

window.onload = loadScript;