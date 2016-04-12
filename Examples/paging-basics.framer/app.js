/* Set background */
var bg, i, j, layer, page;

bg = new BackgroundLayer({
  backgroundColor: "#7DDD11"
});

/* Create PageComponent */

page = new PageComponent({
  width: 300,
  height: 200,
  x: Align.center,
  y: Align.center,
  scrollVertical: false,
  borderRadius: 6
});

/* Create layers in a for-loop */

for (i = j = 0; j < 3; i = ++j) {
  layer = new Layer({
    superLayer: page.content,
    width: 200,
    height: 200,
    x: 210 * i,
    backgroundColor: "#fff",
    borderRadius: 6,
    opacity: 0.3
  });
}

/* Staging */

page.snapToNextPage();

page.currentPage.opacity = 1;

/* Update pages */

page.on("change:currentPage", function() {
  page.previousPage.animate({
    properties: {
      opacity: 0.3
    },
    time: 0.4
  });
  return page.currentPage.animate({
    properties: {
      opacity: 1
    },
    time: 0.4
  });
});
