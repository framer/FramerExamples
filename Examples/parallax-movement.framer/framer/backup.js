(function() {
  var bg, lastYPosition, layer1, layer2, layer3;

  bg = new BackgroundLayer({
    backgroundColor: "#C0C5CF"
  });

  layer3 = new Layer({
    superLayer: bg,
    x: -35,
    y: 574,
    width: 634,
    height: 1718,
    image: "images/layer3.png"
  });

  layer2 = new Layer({
    superLayer: bg,
    x: -62,
    y: -55,
    width: 750,
    height: 2222,
    image: "images/layer2.png"
  });

  layer1 = new Layer({
    superLayer: bg,
    x: -62,
    y: 86,
    width: 750,
    height: 1751,
    image: "images/layer1.png"
  });

  lastYPosition = 0;

  bg.on(Events.TouchStart, function(event) {
    return lastYPosition = Events.touchEvent(event).clientY;
  });

  bg.on(Events.TouchMove, function(event) {
    var yDelta;
    yDelta = lastYPosition - Events.touchEvent(event).clientY;
    lastYPosition = Events.touchEvent(event).clientY;
    layer1.y += yDelta;
    layer2.y -= yDelta * 0.3;
    return layer3.y -= yDelta * 2;
  });

}).call(this);
