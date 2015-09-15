/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Sketch Import */
var allLayers, fav, favActive, i, j, k, layer, len, scroll, sketch;

sketch = Framer.Importer.load("imported/scroll-n-click");

/* Set up a new ScrollComponent
We only allow for vertical scrolling and inset the content */

scroll = new ScrollComponent({
  width: Screen.width,
  height: Screen.height - 128 - 98,
  y: 128,
  superLayer: sketch.content,
  scrollHorizontal: false,
  contentInset: {
    top: 32,
    bottom: 32
  }
});

/* Our layers will be stored here */

allLayers = [];

/* Create and style the cards within a for-loop */

for (i = j = 0; j < 10; i = ++j) {
  layer = new Layer({
    backgroundColor: "#fff",
    width: scroll.width - 48,
    height: 400,
    x: 24,
    y: (400 + 32) * i,
    borderRadius: 6,
    superLayer: scroll.content
  });
  layer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)";

  /* Stars */
  fav = new Layer({
    image: "images/fav.png",
    superLayer: layer
  });
  favActive = new Layer({
    image: "images/favActive.png",
    superLayer: layer,
    opacity: 0,
    scale: 0.5

    /* States */
  });
  fav.states.add({
    active: {
      opacity: 0
    }
  });
  favActive.states.add({
    active: {
      opacity: 1,
      scale: 1
    }
  });
  fav.states.animationOptions = {
    time: 0.05
  };
  favActive.states.animationOptions = {
    curve: "spring(600,30,0)"
  };
  fav.center();
  favActive.center();

  /* Store layers in our array */
  allLayers.push(layer);
}

/* Ignore events when scrolling */

scroll.on(Events.ScrollMove, function() {
  var k, len, results;
  results = [];
  for (k = 0, len = allLayers.length; k < len; k++) {
    layer = allLayers[k];
    results.push(layer.ignoreEvents = true);
  }
  return results;
});

scroll.on(Events.ScrollAnimationDidEnd, function() {
  return this.on(Events.TouchEnd, function() {
    var k, len, results;
    results = [];
    for (k = 0, len = allLayers.length; k < len; k++) {
      layer = allLayers[k];
      results.push(layer.ignoreEvents = false);
    }
    return results;
  });
});

/* Switch states */

for (k = 0, len = allLayers.length; k < len; k++) {
  layer = allLayers[k];
  layer.on(Events.TouchEnd, function() {
    if (!scroll.isMoving) {
      fav = this.subLayers[0];
      favActive = this.subLayers[1];
      fav.states.next();
      return favActive.states.next();
    }
  });
}
