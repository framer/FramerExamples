/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Set background */
var constraints, layerA;

Framer.Device.screen.backgroundColor = "#28affa";

/* Constraints layer */

constraints = new Layer({
  width: 300,
  height: 150,
  backgroundColor: "rgba(255,255,255, 0.2)",
  borderRadius: 6
});

/* Create layer */

layerA = new Layer({
  width: 150,
  height: 150,
  backgroundColor: "#fff",
  borderRadius: 4
});

/* Center layers */

constraints.x = Align.center;

constraints.y = Align.center;

layerA.x = Align.center(-75);

layerA.y = Align.center;

/* Enable dragging, set constraints */

layerA.draggable.enabled = true;

layerA.draggable.constraints = constraints;
