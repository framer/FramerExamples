/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Set device background */
var allSliders, j, len, round, showIncrements, sizeSlider, sketch, slider, spacingSlider, text, valueLayer, weightSlider;

Framer.Device.background.style.background = "linear-gradient(45deg, #fff 30%, #caeaf7 100%)";

/* Sketch Import */

sketch = Framer.Importer.load("imported/type-tester");

/* Create & Position sliders */

sizeSlider = new SliderComponent({
  y: 980,
  width: Screen.width - 250,
  height: 6
});

weightSlider = new SliderComponent({
  y: 1100,
  width: Screen.width - 240,
  height: 6
});

spacingSlider = new SliderComponent({
  y: 1220,
  width: Screen.width - 240,
  height: 6
});

/* Round numbers to a set amount */

round = function(number, nearest) {
  return Math.round(number / nearest) * nearest;
};

/* Visualize increments */

showIncrements = function(layer) {
  var dots, i, j, results;
  results = [];
  for (i = j = 0; j < 4; i = ++j) {
    dots = new Layer({
      width: 6,
      height: 6,
      borderRadius: 10,
      x: 120 + (100 * i) - 3,
      superLayer: layer,
      backgroundColor: "rgba(0,0,0,0.2)"
    });
    dots.placeBehind(layer.fill);
    results.push(dots.y = Align.center);
  }
  return results;
};

/* Store them in an array to add default properties */

allSliders = [sizeSlider, weightSlider, spacingSlider];

/* Loop over all sliders */

for (j = 0, len = allSliders.length; j < len; j++) {
  slider = allSliders[j];

  /* Style */
  slider.knob.draggable.momentum = false;
  slider.knob.style.boxShadow = {
    "0 2px 0 rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.3)": "0 2px 0 rgba(0,0,0,0.1), 0 2px 5px rgba(0,0,0,0.3)"
  };
  slider.knob.clip = false;
  slider.knob.borderRadius = 30;
  slider.knobSize = 50;
  slider.x = 196;
  slider.backgroundColor = "rgba(0,0,0,0.1)";
  slider.fill.backgroundColor = "#333";

  /* Visualize the value */
  valueLayer = new Layer({
    width: 100,
    height: 120,
    image: "images/value.png",
    superLayer: slider.knob,
    y: slider.knob.y - 120,
    scale: 0
  });
  valueLayer.x -= 25;

  /* Style the value */
  valueLayer.style = {
    "color": "#fff",
    "font": "bold 34px/" + (valueLayer.height - 20) + "px Helvetica Neue",
    "text-align": "center"
  };

  /* Set origin to animate from bottom */
  valueLayer.originY = 1;

  /* States */
  valueLayer.states.add({
    hide: {
      scale: 0
    },
    show: {
      scale: 0.8
    }
  });
  valueLayer.states.animationOptions = {
    curve: "spring(600,40,0)"

    /* Visualize output */
  };
  slider.knob.on(Events.DragStart, function() {
    return this.subLayers[0].states["switch"]("show");
  });
  slider.knob.on(Events.DragEnd, function() {
    return this.subLayers[0].states["switch"]("hide");
  });
}

/* Default min - max values */

sizeSlider.min = 100;

sizeSlider.max = 400;

sizeSlider.value = 292;

sizeSlider.knob.subLayers[0].html = sizeSlider.value;

weightSlider.min = 100;

weightSlider.max = 600;

weightSlider.value = 222;

weightSlider.knob.subLayers[0].html = round(weightSlider.value, 100);

spacingSlider.min = -20;

spacingSlider.max = 40;

spacingSlider.value = 0;

spacingSlider.knob.subLayers[0].html = spacingSlider.value;

/* Text input */

text = new Layer({
  width: 688,
  height: 688,
  x: 32,
  y: 161,
  backgroundColor: "transparent"
});

text.input = document.createElement("input");

text._element.appendChild(text.input);

text.input.style.font = "200 " + sizeSlider.value + "px Raleway";

text.input.style.backgroundColor = "transparent";

text.input.style.height = text.height + "px";

text.input.style.width = text.width + "px";

text.input.style.textAlign = "center";

text.input.style.color = "#fff";

text.input.value = "Aa";

text.input.onfocus = function() {
  return document.body.scrollTop = 0;
};

/* Drag in increments */

weightSlider.knob.draggable.updatePosition = function(point) {
  point.x = round(point.x, 100);
  return point;
};

showIncrements(weightSlider);

/* Update the text input */

sizeSlider.on("change:value", function() {
  text.input.style.fontSize = this.value + "px";
  return this.knob.subLayers[0].html = "" + (Math.round(this.value));
});

weightSlider.on("change:value", function() {
  text.input.style.fontWeight = "" + (round(this.value, 100));
  return this.knob.subLayers[0].html = round(this.value, 100);
});

spacingSlider.on("change:value", function() {
  text.input.style.letterSpacing = (Math.round(this.value)) + "px";
  return this.knob.subLayers[0].html = Math.round(this.value);
});
