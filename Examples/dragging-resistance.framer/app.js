/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var layerA;

new BackgroundLayer({
  backgroundColor: "#28affa"
});

layerA = new Layer({
  width: 150,
  height: 150,
  backgroundColor: "#fff",
  borderRadius: 100

  /* Centering */
});

layerA.center();

window.onresize = function() {
  return layerA.center();
};

/* Enable dragging with momentum */

layerA.draggable.enabled = true;

/* Horizontal dragging resistance */

layerA.draggable.speedX = 0.5;

/* Vertical dragging resistance */

layerA.draggable.speedY = 0.5;
