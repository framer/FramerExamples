/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Set background */
var bg, i, j, layer, scroll;

bg = new BackgroundLayer({
  backgroundColor: "#2DD7AA"
});

/* Create ScrollComponent */

scroll = new ScrollComponent({
  backgroundColor: "rgba(255,255,255,0.2)",
  scrollHorizontal: false,
  width: 220,
  height: 220,
  borderRadius: 8
});

scroll.center();

/* Add spacing */

scroll.contentInset = {
  top: 10,
  bottom: 10
};

/* Create 10 layers */

for (i = j = 0; j <= 6; i = ++j) {
  layer = new Layer({
    superLayer: scroll.content,
    backgroundColor: "#fff",
    borderRadius: 4,
    width: 200,
    height: 60,
    x: 10,
    y: 70 * i
  });
}
