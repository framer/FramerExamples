(function() {
  var HEIGHT, PADDING, WIDTH, boxLayer, colNumber, dribble, n, originValuesX, originValuesY, rowNumber, wrapLayer, _i, _j, _ref, _ref1;

  dribble = JSON.parse(Utils.domLoadDataSync("http://jsonp.jit.su/?url=http://api.dribbble.com/shots/popular"));

  WIDTH = 220;

  HEIGHT = 220;

  PADDING = 40;

  originValuesX = [1, 2, 3];

  originValuesY = [1, 2];

  wrapLayer = new Layer({
    width: WIDTH * originValuesX.length - 40,
    height: HEIGHT * originValuesY.length - 30,
    backgroundColor: 'null',
    clip: false
  });

  wrapLayer.center();

  n = 0;

  for (rowNumber = _i = 0, _ref = originValuesX.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; rowNumber = 0 <= _ref ? ++_i : --_i) {
    for (colNumber = _j = 0, _ref1 = originValuesY.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; colNumber = 0 <= _ref1 ? ++_j : --_j) {
      n = n + 1;
      boxLayer = new Layer({
        width: WIDTH - PADDING,
        height: HEIGHT - PADDING,
        x: rowNumber * WIDTH,
        y: colNumber * HEIGHT
      });
      boxLayer.image = dribble.shots[n]["image_url"];
      boxLayer.superLayer = wrapLayer;
      boxLayer.style = {
        border: "4px solid white",
        borderRadius: "100%",
        boxShadow: "0px 3px 14px 0px rgba(0,0,0,0.2)"
      };
      boxLayer.states.animationOptions = {
        curve: "spring(300,10,10)"
      };
      boxLayer.states.add("original", {
        x: boxLayer.x,
        y: boxLayer.y,
        scale: 1,
        blur: 0,
        opacity: 1
      });
      boxLayer.originalX = boxLayer.x;
      boxLayer.originalY = boxLayer.y;
      boxLayer.on(Events.DragStart, function(event, boxLayer) {
        return boxLayer.bringToFront();
      });
      boxLayer.on(Events.DragMove, function(event, boxLayer) {
        var distance, distanceX, distanceY;
        distanceX = boxLayer.originalX - boxLayer.x;
        distanceY = boxLayer.originalY - boxLayer.y;
        distance = Math.abs(distanceX) + Math.abs(distanceY);
        boxLayer.scale = Utils.mapRange(distance, 0, 100, 1, 0.5);
        boxLayer.blur = Utils.mapRange(distance, 0, 100, 0, 10);
        return boxLayer.opacity = Utils.mapRange(distance, 0, 100, 1, 0.5);
      });
      boxLayer.on(Events.DragEnd, function(event, boxLayer) {
        return boxLayer.states["switch"]("original");
      });
      boxLayer.draggable.enabled = true;
      boxLayer.draggable.speedX = 0.2;
      boxLayer.draggable.speedY = 0.2;
    }
  }

}).call(this);
