/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var bg, layerA, layerB;

bg = new BackgroundLayer({
  backgroundColor: "#917BDF"
});

/* Create Layers */

layerA = new Layer({
  width: 80,
  height: 80,
  backgroundColor: "#fff",
  borderRadius: 4
});

layerA.center();

layerA.x -= 50;

layerB = new Layer({
  width: 80,
  height: 80,
  backgroundColor: "#fff",
  borderRadius: 4
});

layerB.center();

layerB.x += 50;

/* Define animation of layerA */

layerA.animate({
  properties: {
    rotation: 90
  },
  curve: "ease",
  time: 0.5
});

/* Animate layerB when layerA is done animating */

layerA.on(Events.AnimationEnd, function() {
  return layerB.animate({
    properties: {
      rotation: 90
    },
    curve: "ease",
    time: 0.5
  });
});
