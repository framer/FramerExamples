/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var Layers, bg, container, currentIndex, currentLayer, getIndexByFrame, i, j, layer, layerAtIndex, nextLayer, nextSlide, prevLayer, prevSlide, screenHeight, screenWidth, updateIndex;

screenWidth = Screen.width;

screenHeight = Screen.height;

bg = new BackgroundLayer({
  backgroundColor: "#FBA145"
});

container = new Layer({
  backgroundColor: "transparent",
  width: 470,
  height: 100,
  clip: false
});

container.center();

window.onresize = function() {
  return container.center();
};

/* Container for our Array */

Layers = [];

/* Retreive the index of a layer by reading its y position */

getIndexByFrame = function(frame) {
  var index;
  return index = parseInt(((frame.x - frame.width) / frame.width) + 1);
};

/* Retreive the layer by reading an index */

layerAtIndex = function(index) {
  var j, layer, len;
  for (j = 0, len = Layers.length; j < len; j++) {
    layer = Layers[j];
    if (layer.listIndex === index) {
      return layer;
    }
  }
};

for (i = j = 0; j <= 3; i = ++j) {
  layer = new Layer({
    width: 100,
    height: 100,
    backgroundColor: "#fff",
    borderRadius: 4,
    x: 124 * i,
    y: 0,
    superLayer: container,
    shadowColor: "rgba(0,0,0,0.15)",
    shadowY: 1,
    shadowBlur: 3
  });
  layer.listIndex = i;
  layer.states.add({
    active: {
      scale: 1.2,
      shadowY: 6,
      shadowBlur: 16,
      x: layer.x,
      opacity: 1
    },
    inactive: {
      scale: 1,
      shadowY: 1,
      shadowBlur: 3,
      opacity: .5
    }
  });
  layer.states.animationOptions = {
    curve: "spring(400,20,0)"
  };
  Layers.push(layer);
}

currentIndex = nextLayer = prevLayer = 0;

currentLayer = layerAtIndex(currentIndex);

updateIndex = function() {
  currentLayer = layerAtIndex(currentIndex);
  nextLayer = layerAtIndex(currentIndex + 1);
  return prevLayer = layerAtIndex(currentIndex - 1);
};

nextSlide = function() {
  var k, layers, len;
  for (k = 0, len = Layers.length; k < len; k++) {
    layers = Layers[k];
    layers.states["switch"]("inactive");
  }
  if (currentLayer) {
    currentLayer.states["switch"]("active");
  }
  currentIndex += 1;
  return updateIndex();
};

prevSlide = function() {
  var k, layers, len;
  currentIndex -= 1;
  updateIndex();
  for (k = 0, len = Layers.length; k < len; k++) {
    layers = Layers[k];
    layers.states["switch"]("inactive");
  }
  if (prevLayer) {
    return prevLayer.states["switch"]("active");
  }
};

Events.wrap(document).addEventListener("keydown", function(event) {
  var key, keyCode;
  keyCode = event.which;
  key = String.fromCharCode(keyCode);
  switch (key) {
    case "'":
      if (currentIndex < Layers.length) {
        return nextSlide();
      }
      break;
    case "%":
      if (currentIndex > 1) {
        return prevSlide();
      }
  }
});
