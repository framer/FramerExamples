/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var layerA;

Framer.Device.screen.backgroundColor = "#877DD7";

/* Create Layers */

layerA = new Layer({
  width: 150,
  height: 150,
  backgroundColor: "#fff",
  borderRadius: 4
});

layerA.x = Align.center;

layerA.y = Align.center;

layerA.originX = 1;

layerA.originY = 0;

/* Define animation of layerA */

layerA.animate({
  properties: {
    rotation: 90
  },
  curve: "spring(200,30,0)"
});

layerA.on(Events.AnimationEnd, function() {
  return this.animate({
    properties: {
      rotation: 0
    },
    curve: "spring(200,10,0)"
  });
});
