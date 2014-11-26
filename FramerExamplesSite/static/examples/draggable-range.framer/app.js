/* Made with Framer
by Brandon Souba
www.framerjs.com */
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

/* Set the thresholds to cross and show them with lines */

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

/* Add states for left and right & set animation curve */

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

/* When dragging ends, save the direction it was heading as a variable (via calculateVelocity), stored as strings that match the state names. Then set a boolean variable to true if it has crossed a threshold based on its starting state. If it has crossed a threshold and is still going that direction, switch the state to send it the rest of the way; otherwise, send it back. */

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

/* Centering */

layerA.centerY();

leftLine.centerY();

rightLine.centerY();

window.onresize = function() {
  layerA.centerY();
  leftLine.centerY();
  return rightLine.centerY();
};
