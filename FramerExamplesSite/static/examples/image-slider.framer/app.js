/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Set-up */
var Layers, allowed, bg, container, currentIndex, currentLayer, height, i, layer, layerAtIndex, margin, midIndex, newBG, nextLayer, nextLayerThree, nextLayerTwo, originLayer, prevLayer, prevLayerThree, prevLayerTwo, random, screenWidth, setBackground, switchBackground, switchStates, updateIndex, url, width, _i, _j, _len;

bg = new BackgroundLayer({
  backgroundColor: "transparent"
});

document.body.style.cursor = "auto";

width = 150;

height = 200;

margin = width;

screenWidth = Screen.width;

currentLayer = nextLayer = prevLayer = prevLayerTwo = prevLayerThree = nextLayerTwo = nextLayerThree = originLayer = null;

/* Container */

container = new Layer({
  backgroundColor: "transparent",
  width: screenWidth,
  height: height,
  clip: false
});

container.center();

window.onresize = function() {
  container.width = screenWidth;
  return container.center();
};

/* Layer Array */

Layers = [];

/* Retreive the layer by reading an index */

layerAtIndex = function(index) {
  var layer, _i, _len;
  for (_i = 0, _len = Layers.length; _i < _len; _i++) {
    layer = Layers[_i];
    if (layer.listIndex === index) {
      return layer;
    }
  }
};

newBG = new BackgroundLayer({
  backgroundColor: "transparent"
});

/* Background switching function */

setBackground = function() {
  newBG.properties = {
    image: currentLayer.image,
    scale: 1.5,
    blur: 40,
    opacity: 0
  };
  newBG.animate({
    properties: {
      opacity: 1
    },
    time: 0.75
  });
  return Utils.delay(0.75, function() {
    return bg.image = currentLayer.image;
  });
};

/* Create layers */

for (i = _i = 0; _i <= 10; i = ++_i) {
  random = 20 + parseInt(Math.random() * 10);
  url = "https://unsplash.it/" + width + "/" + height + "?image=" + i * random;
  url = "images/img" + i + ".png";
  layer = new Layer({
    width: width,
    height: height,
    image: "" + url,
    borderRadius: 4,
    x: container.midX - width / 2,
    y: 0,
    superLayer: container
  });
  layer.listIndex = i;
  layer.states.add({
    current: {
      scale: 1,
      opacity: 1,
      x: layer.x
    },
    nextA: {
      scale: 0.6,
      opacity: 1,
      x: layer.x + width
    },
    nextB: {
      scale: 0.4,
      opacity: 1,
      x: layer.x + (width / 0.6666666) + 30
    },
    prevA: {
      scale: 0.6,
      opacity: 1,
      x: layer.x - width
    },
    prevB: {
      scale: 0.4,
      opacity: 1,
      x: layer.x - (width / 0.6666666) - 30
    },
    restA: {
      scale: 0.0,
      opacity: 0,
      x: layer.x + width * 2.5
    },
    restB: {
      scale: 0.0,
      opacity: 0,
      x: layer.x - width * 2.5
    }
  });
  layer.states.animationOptions = {
    curve: "spring(300,40,0)"
  };
  Layers.push(layer);
}

/* Staging */

midIndex = (Layers.length - 1) / 2;

currentIndex = nextLayer = prevLayer = 0;

currentLayer = layerAtIndex(currentIndex);

currentIndex = midIndex;

updateIndex = function() {
  currentLayer = layerAtIndex(currentIndex);
  nextLayer = layerAtIndex(currentIndex + 1);
  nextLayerTwo = layerAtIndex(currentIndex + 2);
  prevLayer = layerAtIndex(currentIndex - 1);
  return prevLayerTwo = layerAtIndex(currentIndex - 2);
};

/* Delay the background switches */

switchBackground = _.debounce(setBackground, 1000);

switchStates = function() {
  var _j, _len;
  updateIndex();
  switchBackground();
  for (_j = 0, _len = Layers.length; _j < _len; _j++) {
    layer = Layers[_j];
    if (layer.listIndex < currentIndex) {
      layer.states["switch"]("restB");
    }
    if (layer.listIndex > currentIndex) {
      layer.states["switch"]("restA");
    }
  }
  if (nextLayer) {
    nextLayer.states["switch"]("nextA");
    nextLayer.placeBefore(nextLayerTwo);
  }
  if (nextLayerTwo) {
    nextLayerTwo.states["switch"]("nextB");
  }
  if (prevLayer) {
    prevLayer.states["switch"]("prevA");
  }
  if (prevLayerTwo) {
    prevLayerTwo.states["switch"]("prevB");
  }
  if (currentLayer) {
    currentLayer.states["switch"]("current");
  }
  return currentLayer.bringToFront();
};

switchStates(0);

bg = new BackgroundLayer({
  backgroundColor: "transparent",
  image: currentLayer.image,
  scale: 1.5,
  blur: 40
});

/* Click */

for (_j = 0, _len = Layers.length; _j < _len; _j++) {
  layer = Layers[_j];
  layer.on(Events.Click, function() {
    currentIndex = this.listIndex;
    return switchStates();
  });
}

/* Arrow Keys */

allowed = true;

document.addEventListener('keydown', function(event, layer) {
  var keyCode;
  if (!allowed) {
    return;
  }
  allowed = false;
  keyCode = event.which;
  if (event.keyCode === 39 && currentIndex < Layers.length - 1) {
    currentIndex += 1;
    switchStates();
  }
  if (event.keyCode === 37 && currentIndex > 0) {
    currentIndex -= 1;
    return switchStates();
  }
});

document.addEventListener('keyup', function() {
  return allowed = true;
});
