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
  if (i === 0) {
    layer.scale = 0;
  }
}

/* Listen to the Scroll event */

scroll.on(Events.Scroll, function() {

  /* When below -10, animate a layer */
  if (scroll.scrollY > -10) {
    return scroll.content.subLayers[0].animate({
      properties: {
        scale: 1
      },
      curve: "spring(400,30,0)"
    });
  }
});
