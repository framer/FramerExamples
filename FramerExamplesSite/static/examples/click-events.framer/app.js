/* Made with Framer
by Koen Bok
www.framerjs.com */
var layerA, layerB;

Framer.Device.screen.backgroundColor = "#2DD7AA";

/* Create Layers */

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

layerA.y = Align.center;

layerA.x = Align.center(-90);

layerB.y = Align.center;

layerB.x = Align.center(90);

/* Click Event */

layerA.on(Events.Click, function() {
  return layerA.animate({
    properties: {
      rotation: this.rotation + 90
    },
    curve: "ease",
    time: 1
  });
});

/* Touch Events */

layerB.on(Events.TouchStart, function() {
  return layerB.animate({
    properties: {
      rotation: 90,
      scale: 0.8
    },
    curve: "ease",
    time: 0.5
  });
});

layerB.on(Events.TouchEnd, function() {
  return layerB.animate({
    properties: {
      rotation: 0,
      scale: 1
    },
    curve: "ease",
    time: 0.5
  });
});
