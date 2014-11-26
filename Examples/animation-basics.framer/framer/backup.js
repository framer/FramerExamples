(function() {
  var bg, layerA, layerB;

  bg = new BackgroundLayer({
    backgroundColor: "#28AFFA"
  });

  layerA = new Layer({
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 4
  });

  layerA.center();

  layerA.x -= 50;

  layerB = new Layer({
    width: 80,
    height: 80,
    backgroundColor: "#fff",
    borderRadius: 50
  });

  layerB.center();

  layerB.x += 50;

  layerA.animate({
    properties: {
      rotation: 90
    },
    curve: "ease",
    time: 2,
    repeat: 1
  });

  layerB.animate({
    properties: {
      rotation: 180,
      borderRadius: 4
    },
    curve: "spring(200,50,0)",
    delay: 2
  });

}).call(this);
