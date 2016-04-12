/* Set background */
var i, j, layer, scroll;

Framer.Device.screen.backgroundColor = "#2DD7AA";

/* Create ScrollComponent */

scroll = new ScrollComponent({
  width: 300,
  height: 300,
  x: Align.center,
  y: Align.center,
  backgroundColor: "rgba(255,255,255,0.2)",
  scrollHorizontal: false,
  borderRadius: 8
});

/* Add spacing */

scroll.contentInset = {
  top: 20,
  bottom: 20
};

/* Create 10 layers */

for (i = j = 0; j <= 10; i = ++j) {
  layer = new Layer({
    width: 260,
    height: 80,
    x: 20,
    y: 90 * i,
    superLayer: scroll.content,
    backgroundColor: "#fff",
    borderRadius: 6
  });
}
