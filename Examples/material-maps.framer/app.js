/* Made with Framer
by Min-Sang Choi
www.framerjs.com */

/* Setting up default values */
var bg, buttonhome, callback, cancelicn, container, createMarker, detailcallback, fabbtns, goback, gosearch, infowindow, initialize, isup, locationadds, locationlayers, locationphones, locationratings, locationratingstars, locationtitles, locationwindow, map, marker, mycenter, mymap, myquery, myzoom, noresults, overflowicn, searchbg, searchfield, searchicn, searchtexts, service, textSearch;

myzoom = 16;

mycenter = new google.maps.LatLng(37.783944, -122.401289);

service = 0;

infowindow = 0;

map = 0;

marker = 0;

infowindow.style = {
  color: '#000'
};

myquery = null;

/* Flag to determine whether window is up / down */

isup = false;

/* To Control Layers outside functions */

locationlayers = [];

locationtitles = [];

locationratings = [];

locationadds = [];

locationphones = [];

locationratingstars = [];

fabbtns = [];

/* Load up the map */

initialize = function() {
  var mapOptions;
  mapOptions = {
    zoom: myzoom,
    center: mycenter,
    disableDefaultUI: true
  };
  map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
  return infowindow = new google.maps.InfoWindow();
};

/* Fire up Search */

textSearch = function() {
  var request;
  request = {
    location: mycenter,
    radius: '2000',
    query: document.getElementById('_searchfield').value
  };
  service = new google.maps.places.PlacesService(map);
  return service.textSearch(request, callback);
};

/* Callback Method (Locating Pins) */

callback = function(results, status) {
  var place;
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    place = results[0];
    createMarker(results[0]);
    map.setZoom(20);
    map.setCenter(results[0].geometry.location);
    return locationwindow(place);
  } else {
    return noresults();
  }
};

/* When there's no result. */

noresults = function() {
  var alertbg, alertdismiss, alertlayer;
  alertbg = new Layer({
    x: 0,
    y: 0,
    width: 640,
    height: 1136,
    backgroundColor: 'rgba(0,0,0,0.5)'
  });
  alertlayer = new Layer({
    x: 0,
    y: 0,
    width: 540,
    height: 400,
    scale: 0,
    backgroundColor: '#fff'
  });
  container.addSubLayer(alertbg);
  container.addSubLayer(alertlayer);
  alertlayer.x = Align.center;
  alertlayer.y = Align.center;
  alertlayer.animate({
    properties: {
      scale: 1
    },
    curve: 'spring(100,12,0)'
  });
  alertbg.on(Events.Click, function() {
    return alertdismiss();
  });
  alertlayer.on(Events.Click, function() {
    return alertdismiss();
  });
  return alertdismiss = function() {
    alertbg.animate({
      properties: {
        opacity: 0
      },
      curve: 'spring(100,12,0)'
    });
    Utils.delay(0.6, function() {
      return alertbg.y = 1400;
    });
    alertlayer.animate({
      properties: {
        scale: 0.5,
        opacity: 0
      },
      curve: 'spring(50,12,0)'
    });
    return Utils.delay(0.6, function() {
      return alertlayer.scale = 0;
    });
  };
};

/* Making Marker */

createMarker = function(place) {
  var placeLoc;
  placeLoc = place.geometry.location;
  return marker = new google.maps.Marker({
    map: map,
    position: placeLoc
  });
};

/* Intentional delay, to make sure everything is loaded */

Utils.delay(0.3, function() {
  return initialize();
});

/* Setup the basic layers */

bg = new BackgroundLayer({
  backgroundColor: '#e9e9e9'
});

container = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1136,
  backgroundColor: 'transparent',
  shadowY: 4,
  shadowBlur: 15,
  shadowColor: 'rgba(0,0,0,0.3)'
});

mymap = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1136,
  backgroundColor: '#fff'
});

mymap.html = "<div id='map-canvas' style='height:1136px'></div>";

searchtexts = "";

searchbg = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1136,
  backgroundColor: '#eee',
  opacity: 0
});

buttonhome = new Layer({
  x: 20,
  y: 20,
  width: 600,
  height: 100,
  backgroundColor: '#fff',
  shadowY: 4,
  shadowBlur: 8,
  shadowColor: 'rgba(0,0,0,0.3)'
});

buttonhome.style = {
  borderRadius: '3px'
};

searchfield = new Layer({
  x: buttonhome.width * 0.1,
  y: 30,
  width: buttonhome.width * 0.7,
  backgroundColor: 'transparent'
});

searchfield.style = {
  color: '#7D7D7D',
  fontFamily: 'Roboto',
  outline: "none"
};

searchicn = new Layer({
  x: 20,
  y: 0,
  width: 34,
  height: 34,
  image: "images/searchicon.png"
});

overflowicn = new Layer({
  x: 530,
  y: 0,
  width: 44,
  height: 44,
  image: "images/overflow.png"
});

cancelicn = new Layer({
  x: 570,
  y: 0,
  width: 44,
  height: 44,
  image: "images/btncancel.png",
  scale: 0
});

buttonhome.addSubLayer(searchicn);

buttonhome.addSubLayer(overflowicn);

buttonhome.addSubLayer(cancelicn);

cancelicn.y = Align.center;

searchicn.y = Align.center;

overflowicn.y = Align.center;

/* Search Box */

buttonhome.addSubLayer(searchfield);

buttonhome.html = "<input id='_searchfield' type='text' style='width:70%;padding:18px;margin-top:13px;margin-left:60px;margin-bottom:14px;font-size:30px;color:#7D7D7D' placeholder='Search'></input>";

searchfield.html = "";

myquery = "";

searchfield.ignoreEvents = false;

/* Key Functions 
-------------
Search Mode */

gosearch = function() {
  buttonhome.animate({
    properties: {
      width: container.width,
      height: 100,
      x: 0,
      y: 0
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.3
  });
  buttonhome.borderRadius = '0px';
  cancelicn.animate({
    properties: {
      scale: 1,
      opacity: 1
    },
    curve: 'spring(60,12,0)'
  });
  if (locationlayers[0] !== void 0) {
    locationlayers[0].animate({
      properties: {
        y: 1500
      },
      curve: 'cubic-bezier(0.4, 0, 1, 1)',
      time: 0.2
    });
    fabbtns[0].animate({
      properties: {
        y: 1500
      },
      curve: 'cubic-bezier(0.4, 0, 1, 1)',
      time: 0.2
    });
    Utils.delay(0.2, function() {
      locationlayers[0].destroy();
      locationtitles[0].destroy();
      locationratings[0].destroy();
      locationadds[0].destroy();
      locationphones[0].destroy();
      return fabbtns[0].destroy();
    });
  }
  overflowicn.animate({
    properties: {
      opacity: 0
    },
    curve: 'spring(100,12,0)'
  });
  searchbg.animate({
    properties: {
      opacity: 1
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.3
  });
  document.getElementById('_searchfield').focus();
};

/* Transition back to Home */

goback = function() {
  searchbg.animate({
    properties: {
      opacity: 0
    },
    curve: 'spring(100,12,0)'
  });
  overflowicn.animate({
    delay: 0.3,
    properties: {
      opacity: 1
    },
    curve: 'spring(100,12,0)'
  });
  cancelicn.animate({
    properties: {
      scale: 0,
      opacity: 0
    },
    curve: 'spring(60,12,0)'
  });
  buttonhome.animate({
    properties: {
      width: 600,
      height: 100,
      x: 20,
      y: 20
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.3
  });
  buttonhome.borderRadius = '3px';
  return document.getElementById('_searchfield').blur();
};

/* Triggering Events */

buttonhome.on(Events.Click, function() {
  cancelicn.animateStop();
  overflowicn.animateStop();
  return gosearch();
});

searchbg.on(Events.Click, function() {
  cancelicn.animateStop();
  overflowicn.animateStop();
  return goback();
});

/* Cancel */

cancelicn.on(Events.Click, function() {
  return document.getElementById('_searchfield').value = '';
});

/* When "Enter" Key is pressed. */

buttonhome._element.addEventListener("keydown", (function(e) {
  if (e.keyCode === 13 && document.getElementById('_searchfield').value !== '') {
    cancelicn.animateStop();
    overflowicn.animateStop();
    textSearch();
    goback();
  }
}), false);

/* Making Location Window */

locationwindow = function(place) {
  var driveicn, fabbtn, locationaddress, locationlayer, locationphone, locationrating, locationratingbg, locationratingstar, locationtitle, request, starmask;
  request = {
    placeId: place.place_id
  };
  service = new google.maps.places.PlacesService(map);
  service.getDetails(request, detailcallback);

  /* Setting up Location Window */
  locationlayer = new Layer({
    x: 0,
    y: 1136,
    width: 640,
    height: 1136,
    backgroundColor: '#fff',
    shadowY: 4,
    shadowBlur: 15,
    shadowColor: 'rgba(0,0,0,0.3)'
  });
  locationtitle = new Layer({
    x: 0,
    y: 0,
    width: 640,
    height: 140,
    backgroundColor: 'transparent'
  });
  locationrating = new Layer({
    x: 268,
    y: locationtitle.height,
    width: 640,
    height: 80,
    backgroundColor: 'transparent'
  });
  locationtitle.style = {
    padding: '50px',
    color: '#333',
    fontFamily: 'Roboto',
    fontWeight: '500',
    fontSize: '50px',
    lineHeight: '1.2'
  };
  locationrating.style = {
    paddingLeft: '50px',
    paddingTop: '26px',
    color: '#aaa',
    fontFamily: 'Roboto',
    fontSize: '28px',
    lineHeight: '1.2'
  };
  locationratingbg = new Layer({
    x: 20,
    y: locationrating.y + 2,
    width: 268,
    height: 84,
    backgroundColor: '#ccc'
  });
  locationratingstar = new Layer({
    x: 20,
    y: locationrating.y + 2,
    width: 0,
    height: 84,
    backgroundColor: '#F5CB5B'
  });
  locationratingstars[0] = locationratingstar;
  starmask = new Layer({
    x: 20,
    y: locationrating.y,
    width: 268,
    height: 87,
    image: "images/stars.png"
  });
  locationaddress = new Layer({
    x: 0,
    y: locationratingbg.y + 87,
    width: 640,
    height: 140,
    backgroundColor: 'transparent'
  });
  locationaddress.style = {
    paddingLeft: '50px',
    paddingTop: '24px',
    color: '#7D7D7D',
    fontFamily: 'Roboto',
    fontSize: '28px',
    lineHeight: '1.2'
  };
  locationphone = new Layer({
    x: 0,
    y: locationaddress.y + 60,
    width: 640,
    height: 80,
    backgroundColor: 'transparent'
  });
  locationphone.style = {
    paddingLeft: '50px',
    paddingTop: '24px',
    color: '#7D7D7D',
    fontFamily: 'Roboto',
    fontSize: '28px',
    lineHeight: '1.2'
  };
  locationlayer.addSubLayer(locationrating);
  locationlayer.addSubLayer(locationtitle);
  locationlayer.addSubLayer(locationratingbg);
  locationlayer.addSubLayer(locationratingstar);
  locationlayer.addSubLayer(starmask);
  locationlayer.addSubLayer(locationaddress);
  locationlayer.addSubLayer(locationphone);

  /* Fab button (not interactive) */
  fabbtn = new Layer({
    x: 480,
    y: 1800,
    width: 130,
    height: 130,
    borderRadius: '65px',
    backgroundColor: '#4285f4',
    shadowY: 4,
    shadowBlur: 8,
    shadowColor: 'rgba(0,0,0,0.3)',
    scale: 0
  });
  driveicn = new Layer({
    x: 0,
    y: 0,
    width: 44,
    height: 44,
    image: "images/car.png"
  });
  fabbtn.addSubLayer(driveicn);
  driveicn.y = Align.center;
  driveicn.x = Align.center;
  locationlayer.y = 1136;
  locationlayer.animate({
    properties: {
      y: 736
    },
    curve: 'cubic-bezier(0, 0, 0.2, 1)',
    time: 0.3
  });
  fabbtn.y = 660;
  fabbtn.animate({
    delay: 0.2,
    properties: {
      scale: 1
    },
    curve: 'cubic-bezier(0, 0, 0.2, 1)',
    time: 0.2
  });
  locationlayers[0] = locationlayer;
  locationtitles[0] = locationtitle;
  locationratings[0] = locationrating;
  locationadds[0] = locationaddress;
  locationphones[0] = locationphone;
  fabbtns[0] = fabbtn;
  container.addSubLayer(locationlayer);
  container.addSubLayer(fabbtn);
  return locationlayer.on(Events.Click, function() {
    if (isup === false) {
      locationlayer.animate({
        properties: {
          y: 0
        },
        curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
        time: 0.6
      });
      fabbtn.animate({
        properties: {
          y: 140
        },
        curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
        time: 0.6
      });
      return isup = true;
    } else {
      locationlayer.animate({
        properties: {
          y: 736
        },
        curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
        time: 0.6
      });
      fabbtn.animate({
        properties: {
          y: 660
        },
        curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
        time: 0.6
      });
      return isup = false;
    }
  });
};

/* Detail Callback */

detailcallback = function(place, status) {
  var i, j, locationphoto, myimage, number, ref, results1;
  locationtitles[0].html = place.name;
  locationadds[0].html = place.vicinity;
  if (place.rating !== void 0) {
    locationratings[0].html = place.rating + ' (' + place.user_ratings_total + ')';
    locationphones[0].html = place.formatted_phone_number;
    locationratingstars[0].animate({
      delay: 0.2,
      properties: {
        width: place.rating * 49
      },
      curve: 'cubic-bezier(0, 0, 0.2, 1)'
    });
  } else {
    locationratings[0].html = 'no ratings';
    locationratingstars[0].animate({
      delay: 0.2,
      properties: {
        width: 0
      },
      curve: 'cubic-bezier(0, 0, 0.2, 1)'
    });
  }
  if (status === google.maps.places.PlacesServiceStatus.OK) {
    if (place.photos !== void 0) {
      if (place.photos.length > 4) {
        number = 3;
      } else {
        number = place.photos.length;
      }
      results1 = [];
      for (i = j = 0, ref = number; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
        myimage = place.photos[i].getUrl({
          'maxWidth': 500,
          'maxHeight': 500
        });
        locationphoto = new Layer({
          x: 0,
          y: i * 650 + locationtitles[0].height + locationratings[0].height + 200,
          width: 640,
          height: 640,
          backgroundColor: '#000',
          image: myimage
        });
        locationphoto.y = i * 650 + locationtitles[0].height + locationratings[0].height + 300;
        locationphoto.animate({
          delay: 0.2,
          properties: {
            y: i * 650 + locationtitles[0].height + locationratings[0].height + 200
          },
          curve: 'cubic-bezier(0, 0, 0.2, 1)'
        });
        locationlayers[0].height = 1136 + (640 * number);
        results1.push(locationlayers[0].addSubLayer(locationphoto));
      }
      return results1;
    }
  }
};

container.addSubLayer(mymap);

container.addSubLayer(searchbg);

container.addSubLayer(buttonhome);

container.addSubLayer(locationwindow);
