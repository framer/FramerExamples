/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var Layers, i, layer, layerA, layerB, len;

Framer.Device.screen.backgroundColor = "#877DD7";

/* Create layers */

layerA = new Layer({
  height: 150,
  width: 150,
  backgroundColor: "#fff",
  borderRadius: 4
});

layerB = new Layer({
  height: 150,
  width: 150,
  backgroundColor: "#fff",
  borderRadius: 4
});

/* Staging */

layerA.x = Align.center(90);

layerA.y = Align.center;

layerB.x = Align.center(-90);

layerB.y = Align.center;

/* Store within array */

Layers = [layerA, layerB];

/* Loop over array */

for (i = 0, len = Layers.length; i < len; i++) {
  layer = Layers[i];
  layer.states.add({
    one: {
      scale: 0.9,
      rotation: 90
    },
    two: {
      scale: 1,
      rotation: 0
    }
  });
  layer.states.animationOptions = {
    curve: "spring(400,30,0)"
  };
  layer.on(Events.Click, function() {
    return this.states.next("one", "two");
  });
}
