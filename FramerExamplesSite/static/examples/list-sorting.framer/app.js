/* Made with Framer
by Benjamin den Boer & Koen Bok
www.framerjs.com */

/* Variables */
var Layers, bg, canvas, getFrameByIndex, getIndexByFrame, i, layer, layerAtIndex, listHeight, listWidth, yDistance, _i;

listWidth = 320;

listHeight = 90;

yDistance = listHeight + 10;

bg = new BackgroundLayer({
  backgroundColor: "#eee"
});

canvas = new Layer({
  width: listWidth,
  height: 400,
  backgroundColor: "transparent",
  clip: false
});

canvas.center();

window.onresize = function() {
  return canvas.center();
};

/* Container for our Array */

Layers = [];

/* Retreive the y position of a layer by reading its index */

getFrameByIndex = function(index) {
  return {
    y: index * yDistance,
    height: listHeight
  };
};

/* Retreive the index of a layer by reading its y position */

getIndexByFrame = function(frame) {
  var index;
  return index = parseInt((frame.y + (frame.height / 2)) / yDistance);
};

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

/* Create list items */

for (i = _i = 0; _i <= 3; i = ++_i) {
  layer = new Layer({
    width: listWidth,
    height: listHeight,
    y: i * yDistance,
    clip: false,
    borderRadius: 4,
    superLayer: canvas
  });

  /* Assign indeces */
  layer.listIndex = i;

  /* Make draggable */
  layer.draggable.enabled = true;
  layer.draggable.speedX = 0;
  layer.draggable.speedY = 1;

  /* Style layers */
  layer.backgroundColor = "rgba(255,255,255,1)";
  layer.html = layer.listIndex + 1;
  layer.style.color = "#999";
  layer.style.lineHeight = listHeight + 6 + "px";
  layer.style.paddingLeft = "32px";
  layer.style.fontSize = "24px";
  layer.style.fontWeight = "400";
  layer.shadowY = 1;
  layer.shadowBlur = 2;
  layer.style.boxShadow = "0 1px 3px rgba(0,0,0,0.2)";

  /* Push into array for us to loop over all layers (like in layerAtIndex) */
  Layers.push(layer);
  layer.on(Events.DragMove, function(event, layer) {

    /* Get the index of the layer being dragged */
    var currentIndex, hoveredLayer;
    currentIndex = getIndexByFrame(layer.frame);

    /* When dragged at enough index... */
    if (currentIndex !== layer.listIndex && currentIndex >= 0 && currentIndex <= 3) {

      /* When the index of the dragged layer equals that of another layer */
      hoveredLayer = layerAtIndex(currentIndex);

      /* Switch indeces of said layers */
      hoveredLayer.listIndex = layer.listIndex;
      layer.listIndex = currentIndex;

      /* Label layers */
      layer.html = layer.listIndex + 1;
      hoveredLayer.html = hoveredLayer.listIndex + 1;

      /* Stop previous animation */
      hoveredLayer.animateStop();

      /* Animate to new position */
      return hoveredLayer.animate({
        properties: getFrameByIndex(hoveredLayer.listIndex),
        curve: "spring(300,40,0)"
      });
    }
  });

  /* On DragStart */
  layer.on(Events.DragStart, function(event, layer) {
    var currentIndex;
    currentIndex = getIndexByFrame(layer.frame);
    layer.bringToFront();
    layer.shadowColor = "rgba(0,0,0,0.2)";
    layer.animate({
      properties: {
        shadowY: 16,
        shadowBlur: 32
      },
      curve: "ease",
      time: 0.4
    });
    return layer.animate({
      properties: {
        scale: 1.1
      },
      curve: "spring(600,50,0)"
    });
  });

  /* On DragEnd */
  layer.on(Events.DragEnd, function(event, layer) {
    var currentIndex;
    layer.animateStop();
    layer.animate({
      properties: {
        scale: 1
      },
      curve: "spring(300,50,0)"
    });

    /* Reset index when dragging too far out of array */
    currentIndex = getIndexByFrame(layer.frame);
    if (currentIndex < 0) {
      currentIndex = 0;
    }
    if (currentIndex > 3) {
      currentIndex = 3;
    }
    layer.animate({
      properties: {
        shadowY: 1,
        shadowBlur: 2,
        y: currentIndex * yDistance
      },
      curve: "spring(300,40,0)"
    });

    /* Reset index, delayed to prevent shadow cut-off */
    return Utils.delay(0.4, function() {
      return layer.shadowColor = "rgba(0,0,0,0.2)";
    });
  });
}
