/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Sketch Import */
var allSliders, brightnessSlider, contrastSlider, i, len, saturateSlider, sketch, slider, width;

sketch = Framer.Importer.load("imported/photo-filter");

width = Screen.width - 240;

/* Define & Position sliders */

contrastSlider = new SliderComponent({
  x: 196,
  y: 980,
  width: width,
  height: 6
});

brightnessSlider = new SliderComponent({
  x: 196,
  y: 1100,
  width: width,
  height: 6
});

saturateSlider = new SliderComponent({
  x: 196,
  y: 1220,
  width: width,
  height: 6
});

/* Store them in an array to add default properties */

allSliders = [contrastSlider, brightnessSlider, saturateSlider];

for (i = 0, len = allSliders.length; i < len; i++) {
  slider = allSliders[i];

  /* Style */
  slider.knobSize = 45;
  slider.knob.scale = 0.8;
  slider.knob.borderRadius = 30;
  slider.backgroundColor = "rgba(255,255,255,0.1)";
  slider.fill.backgroundColor = "rgba(255,255,255,1)";

  /* Default min - max values */
  slider.min = 50;
  slider.max = 150;
  slider.value = 100;
  slider.knob.on(Events.DragStart, function() {
    return this.animate({
      properties: {
        scale: 1
      },
      curve: "spring(400,30,0)"
    });
  });
  slider.knob.on(Events.DragEnd, function() {
    return this.animate({
      properties: {
        scale: 0.8
      },
      curve: "spring(400,30,0)"
    });
  });
}

saturateSlider.min = 0;

saturateSlider.max = 200;

saturateSlider.value = 100;

/* Set-up */

sketch.photo.contrast = contrastSlider.value;

sketch.photo.brightness = brightnessSlider.value;

sketch.photo.saturate = saturateSlider.value;

contrastSlider.on("change:value", function() {
  return sketch.photo.contrast = this.value;
});

brightnessSlider.on("change:value", function() {
  return sketch.photo.brightness = this.value;
});

saturateSlider.on("change:value", function() {
  return sketch.photo.saturate = this.value;
});
