(function() {
  var bg, layerA, leftLine, leftThreshold, rightLine, rightThreshold;

  bg = new BackgroundLayer({
    backgroundColor: "#A7CAE7"
  });

  layerA = new Layer({
    y: 100,
    backgroundColor: "#fff",
    borderRadius: 4
  });

  layerA.draggable.enabled = true;

  layerA.draggable.speedY = 0;

  leftThreshold = 160;

  rightThreshold = Screen.width - leftThreshold;

  leftLine = new Layer({
    width: 2,
    x: leftThreshold,
    height: 140,
    backgroundColor: "#D3E5F3"
  });

  rightLine = new Layer({
    width: 2,
    x: rightThreshold,
    height: 140,
    backgroundColor: "#D3E5F3"
  });

  layerA.states.add({
    left: {
      x: 80
    },
    right: {
      x: Screen.width - layerA.width - 80
    }
  });

  layerA.states.switchInstant("left");

  layerA.states.animationOptions = {
    curve: "spring(200,20,10)"
  };

  layerA.draggable.on(Events.DragEnd, function() {
    var thresholdBroken, velocityDirection;
    velocityDirection = layerA.draggable.calculateVelocity().x < 0 ? "left" : "right";
    thresholdBroken = layerA.states.current === "left" && layerA.x > leftThreshold ? true : false;
    thresholdBroken = layerA.states.current === "right" && layerA.maxX < rightThreshold ? true : thresholdBroken;
    if (thresholdBroken && velocityDirection !== layerA.states.current) {
      return layerA.states["switch"](velocityDirection);
    } else {
      return layerA.states["switch"](layerA.states.current);
    }
  });

  layerA.centerY();

  leftLine.centerY();

  rightLine.centerY();

  window.onresize = function() {
    layerA.centerY();
    leftLine.centerY();
    return rightLine.centerY();
  };

}).call(this);
