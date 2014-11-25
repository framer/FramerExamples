/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var bg, layerA, layerB;

bg = new BackgroundLayer({
  backgroundColor: "#28AFFA"
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
  borderRadius: 50
});

layerB.center();

layerB.x += 50;

/* Easing Curve Animation with Timing & Repeat
Ease, Ease-in, Ease-Out, Ease-In-Out */

layerA.animate({
  properties: {
    rotation: 90
  },
  curve: "ease",
  time: 2,
  repeat: 1
});

/* Spring Curve Animation with Delay
Tension, Friction, Velocity (Bounciness, Weight, Wind-Up) */

layerB.animate({
  properties: {
    rotation: 180,
    borderRadius: 4
  },
  curve: "spring(200,50,0)",
  delay: 2
});
