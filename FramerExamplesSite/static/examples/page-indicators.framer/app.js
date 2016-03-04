/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Sketch Import */
var allIndicators, amount, card, current, i, indicator, j, page, ref, sketch;

sketch = Framer.Importer.load("imported/page-indicators");

/* Set-up ScrollComponent */

page = new PageComponent({
  width: Screen.width,
  height: Screen.height,
  y: 128,
  scrollVertical: false,
  contentInset: {
    top: 32,
    right: 32
  }
});

/* Array that will store our layers */

allIndicators = [];

amount = 3;

/* Generate card layers */

for (i = j = 0, ref = amount; 0 <= ref ? j < ref : j > ref; i = 0 <= ref ? ++j : --j) {
  card = new Layer({
    backgroundColor: "#fff",
    borderRadius: 8,
    width: page.width - 64,
    height: 950,
    x: (page.width + 32) * (i + 1),
    superLayer: page.content
  });
  card.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)";
  indicator = new Layer({
    backgroundColor: "#222",
    width: 12,
    height: 12,
    x: 28 * i,
    y: 1167,
    borderRadius: "50%",
    opacity: 0.2
  });

  /* Stay centered regardless of the amount of cards */
  indicator.x += (Screen.width / 2) - (12 * amount);

  /* States */
  indicator.states.add({
    active: {
      opacity: 1,
      scale: 1.2
    }
  });
  indicator.states.animationOptions = {
    time: 0.5

    /* Store indicators in our array */
  };
  allIndicators.push(indicator);
}

/* Set indicator for current page */

page.snapToPage(page.content.subLayers[0]);

current = page.horizontalPageIndex(page.currentPage);

allIndicators[current].states["switch"]("active");

/* Define custom animation curve for page switches */

page.animationOptions = {
  curve: "spring(200,22,0)"

  /* Update indicators */
};

page.on("change:currentPage", function() {
  var k, len;
  for (k = 0, len = allIndicators.length; k < len; k++) {
    indicator = allIndicators[k];
    indicator.states["switch"]("default");
  }
  current = page.horizontalPageIndex(page.currentPage);
  allIndicators[current].states["switch"]("active");

  /* Animation of pages fading out */
  page.previousPage.animate({
    properties: {
      scale: 0.75
    },
    curve: "spring",
    curveOptions: {
      tension: 100,
      friction: 50,
      velocity: 0,
      tolerance: 1
    }
  });
  return page.previousPage.once(Events.AnimationEnd, function() {
    return this.scale = 1;
  });
});
