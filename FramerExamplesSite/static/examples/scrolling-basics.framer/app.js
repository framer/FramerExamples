var allLayers, height, i, layer, margin, scroll;

new BackgroundLayer({
  backgroundColor: "#2DD7AA"
});

/* Set-up ScrollComponent */

scroll = new ScrollComponent({
  width: 320,
  height: 430,
  scrollHorizontal: false,
  borderRadius: 4,
  clip: true
});

/* Center the ScrollComponent, also on resize */

window.onresize = function() {
  return scroll.center();
};

scroll.center();

/* Set force2d to allow for clipping with borderRadius */

scroll.content.force2d = true;

/* Define height and margins */

height = 100;

margin = 10;

/* Create layers in a for-loop */

allLayers = (function() {
  var _i, _results;
  _results = [];
  for (i = _i = 0; _i < 80; i = ++_i) {
    _results.push(layer = new Layer({
      backgroundColor: "#fff",
      width: scroll.width,
      height: height,
      y: (height + margin) * i,
      superLayer: scroll.content,
      borderRadius: 4,
      force2d: true
    }));
  }
  return _results;
})();
