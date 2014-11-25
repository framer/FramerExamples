/* Made with Framer
by Jorn van Dijk
www.framerjs.com */
var HEIGHT, PADDING, WIDTH, boxLayer, colNumber, dribble, n, originValuesX, originValuesY, rowNumber, wrapLayer, _i, _j, _ref, _ref1;

dribble = JSON.parse(Utils.domLoadDataSync("http://jsonp.jit.su/?url=http://api.dribbble.com/shots/popular"));

/* Set up the grid */

WIDTH = 220;

HEIGHT = 220;

PADDING = 40;

/* Set up origin values */

originValuesX = [1, 2, 3];

originValuesY = [1, 2];

/* Draw a layer to center the grid */

wrapLayer = new Layer({
  width: WIDTH * originValuesX.length - 40,
  height: HEIGHT * originValuesY.length - 30,
  backgroundColor: 'null',
  clip: false
});

wrapLayer.center();

window.onresize = function() {
  return wrapLayer.center();
};

n = 0;

/* rowNumber holds the amount of values stored in originValuesX (0, 1, 2, etc.) */

for (rowNumber = _i = 0, _ref = originValuesX.length - 1; 0 <= _ref ? _i <= _ref : _i >= _ref; rowNumber = 0 <= _ref ? ++_i : --_i) {
  for (colNumber = _j = 0, _ref1 = originValuesY.length - 1; 0 <= _ref1 ? _j <= _ref1 : _j >= _ref1; colNumber = 0 <= _ref1 ? ++_j : --_j) {
    n = n + 1;

    /* Create the boxLayer and duplicate them */
    boxLayer = new Layer({
      width: WIDTH - PADDING,
      height: HEIGHT - PADDING,
      x: rowNumber * WIDTH,
      y: colNumber * HEIGHT
    });
    boxLayer.image = dribble.shots[n]["image_url"];

    /* Make boxLayer a subLayer of wrapLayer */
    boxLayer.superLayer = wrapLayer;

    /* Style the box */
    boxLayer.style = {
      border: "4px solid white",
      borderRadius: "100%",
      boxShadow: "0px 3px 14px 0px rgba(0,0,0,0.2)"
    };

    /* Set animationOptions */
    boxLayer.states.animationOptions = {
      curve: "spring(300,10,10)"
    };

    /* Add a state that holds the layers original values */
    boxLayer.states.add("original", {
      x: boxLayer.x,
      y: boxLayer.y,
      scale: 1,
      blur: 0,
      opacity: 1
    });

    /* Store the original X&Y positions */
    boxLayer.originalX = boxLayer.x;
    boxLayer.originalY = boxLayer.y;

    /* DRAG EVENTS -------------------------------------------- */

    /* Drag start - come to front */
    boxLayer.on(Events.DragStart, function(event, boxLayer) {
      return boxLayer.bringToFront();
    });

    /* Drag move */
    boxLayer.on(Events.DragMove, function(event, boxLayer) {
      var distance, distanceX, distanceY;
      distanceX = boxLayer.originalX - boxLayer.x;
      distanceY = boxLayer.originalY - boxLayer.y;
      distance = Math.abs(distanceX) + Math.abs(distanceY);
      boxLayer.scale = Utils.mapRange(distance, 0, 100, 1, 0.5);
      boxLayer.blur = Utils.mapRange(distance, 0, 100, 0, 10);
      return boxLayer.opacity = Utils.mapRange(distance, 0, 100, 1, 0.5);
    });

    /* Drag end - switch to the original state */
    boxLayer.on(Events.DragEnd, function(event, boxLayer) {
      return boxLayer.states["switch"]("original");
    });

    /* Make the layer draggable */
    boxLayer.draggable.enabled = true;
    boxLayer.draggable.speedX = 0.2;
    boxLayer.draggable.speedY = 0.2;
  }
}
