(function() {
  var bg, layerA, originX, originY;

  bg = new BackgroundLayer({
    backgroundColor: "#ABE86A"
  });

  layerA = new Layer({
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 100
  });

  layerA.center();

  originX = layerA.x;

  originY = layerA.y;

  window.onresize = function() {
    layerA.center();
    originX = layerA.x;
    return originY = layerA.y;
  };

  layerA.draggable.enabled = true;

  layerA.draggable.speedX = 0.5;

  layerA.draggable.speedY = 2;

  layerA.on(Events.DragEnd, function() {
    return layerA.animate({
      properties: {
        x: originX,
        y: originY
      },
      curve: "spring(300,18,10)"
    });
  });

}).call(this);
