/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var layerA;

Framer.Device.screen.backgroundColor = "#28affa";

layerA = new Layer({
  width: 150,
  height: 150,
  backgroundColor: "#fff",
  borderRadius: 100

  /* Centering */
});

layerA.x = Align.center;

layerA.y = Align.center;

window.onresize = function() {
  layerA.x = Align.center;
  return layerA.y = Align.center;
};

/* Enable dragging with momentum */

layerA.draggable.enabled = true;

/* Horizontal dragging resistance */

layerA.draggable.speedX = 0.5;

/* Vertical dragging resistance */

layerA.draggable.speedY = 0.5;
