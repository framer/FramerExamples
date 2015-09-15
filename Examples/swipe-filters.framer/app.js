/* Made with Framer
by Giel Cobben
www.framerjs.com */

/* Import the layout from Sketch */
var collection, currentFilter, filter, filterAmount, filterBW, filterDefault, filterWalden, filters, i, imgX, indicator, j, k, len, mask, overlays, photo, photos, ref, ref1, scrollTo, sketch, textOverlay, top, view, viewSize;

sketch = Framer.Importer.load("imported/swipeFilters");

/* Set device background */

Framer.Device.background.style.background = "linear-gradient(45deg, #fff 50%, #CAD7F7 100%)";

/* Variables */

imgX = 0;

photos = [];

overlays = [];

viewSize = Screen.width;

top = sketch.navBar.height;

/* Define filters */

filterDefault = {
  contrast: 100,
  saturate: 120,
  brightness: 100
};

filterWalden = {
  contrast: 100,
  sepia: 30,
  saturate: 120,
  hueRotate: -20,
  brightness: 100
};

filterBW = {
  contrast: 150,
  saturate: 0,
  grayscale: 100,
  brightness: 80

  /* Add each filter to the filters Array */
};

filters = [filterDefault, filterWalden, filterBW];

filterAmount = filters.length - 1;

/* Create a new pageComponent */

view = new PageComponent({
  x: 0,
  y: top,
  width: viewSize,
  height: viewSize,
  scrollVertical: false
});

/* Disable overdrag */

view.content.draggable.overdrag = false;

/* Add each photo to the PageComponent */

for (i = j = 0, ref = filterAmount; 0 <= ref ? j <= ref : j >= ref; i = 0 <= ref ? ++j : --j) {

  /* Filter */
  filter = filters[i];

  /* Create Mask */
  mask = new Layer({
    x: Screen.width * i,
    y: 0,
    width: viewSize,
    height: viewSize,
    backgroundColor: "transparent",
    superLayer: view.content
  });

  /* Create Photo */
  photo = new Layer({
    x: imgX,
    y: 0,
    width: viewSize,
    height: viewSize,
    image: "images/photo.png",
    superLayer: mask,
    sepia: filter.sepia || 0,
    contrast: filter.contrast || 100,
    saturate: filter.saturate || 100,
    grayscale: filter.grayscale || 0,
    hueRotate: filter.hueRotate || 0,
    brightness: filter.brightness || 100
  });

  /* Add the photo to the Array */
  photos.push(photo);

  /* Update the x position */
  imgX = imgX - viewSize;
}

/* When the content in pageComponent is moving */

view.content.on("change:x", function() {

  /* Input is this.x
  	2 steps from 750 
  	The last step is 1500 and the value needs to be 506 
  	Indicator between 20 and 506
   */
  var k, len, results;
  indicator.x = Utils.modulate(Math.abs(this.x), [0, 1500], [32, 511], true);

  /* Update the x position for each photo */
  results = [];
  for (i = k = 0, len = photos.length; k < len; i = ++k) {
    photo = photos[i];
    results.push(photo.x = -(viewSize * i) + Math.abs(this.x));
  }
  return results;
});

/* When someone clicks on one of the filters, snap to the clicked photo */

scrollTo = function(i) {
  return collection.on(Events.Click, function() {
    return view.snapToPage(view.content.subLayers[i]);
  });
};

ref1 = sketch.collection.subLayers;
for (i = k = 0, len = ref1.length; k < len; i = ++k) {
  collection = ref1[i];

  /* Filter */
  filter = filters[i];

  /* Initialize the click event for each photo inside the collection */
  scrollTo(i);

  /* Create a new text overlay */
  textOverlay = new Layer({
    x: 10,
    y: collection.height - 25,
    width: 207,
    height: 30,
    opacity: 0.5,
    superLayer: collection,
    backgroundColor: "#000"
  });

  /* States */
  textOverlay.states.add({
    active: {
      opacity: 0
    }
  });
  textOverlay.states.animationOptions = {
    time: 0.4

    /* Store overlays in an array */
  };
  overlays.push(textOverlay);

  /* Add the same filters to the photo's in the collection */
  collection.sepia = filter.sepia || 0;
  collection.contrast = filter.contrast || 100;
  collection.saturate = filter.saturate || 100;
  collection.grayscale = filter.grayscale || 0;
  collection.hueRotate = filter.hueRotate || 0;
  collection.brightness = filter.brightness || 100;
}

/* Set text overlay for current page */

currentFilter = view.horizontalPageIndex(view.currentPage);

overlays[currentFilter].states["switch"]("active");

/* Animate the text of the active filter */

view.on("change:currentPage", function() {

  /* Switch all text overlays to default */
  var l, len1, overlay;
  for (l = 0, len1 = overlays.length; l < len1; l++) {
    overlay = overlays[l];
    overlay.states["switch"]("default");
  }

  /* Get the index of the current filter */
  currentFilter = view.horizontalPageIndex(view.currentPage);

  /* Switch the text overlay of the current filter to active */
  return overlays[currentFilter].states["switch"]("active");
});

/* Create the indicator bar */

indicator = new Layer({
  x: 32,
  width: 207,
  height: 4,
  y: sketch.collection.height - 4,
  backgroundColor: "#FFF",
  superLayer: sketch.collection
});
