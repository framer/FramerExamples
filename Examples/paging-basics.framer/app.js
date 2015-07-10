/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Set background */
var bg, i, j, layer, page;

bg = new BackgroundLayer({
  backgroundColor: "#7DDD11"
});

/* Create PageComponent */

page = new PageComponent({
  width: 300,
  height: 150,
  scrollVertical: false,
  borderRadius: 6
});

page.center();

/* Create layers in a for-loop */

for (i = j = 0; j < 8; i = ++j) {
  layer = new Layer({
    superLayer: page.content,
    width: 150,
    height: 150,
    backgroundColor: "#fff",
    borderRadius: 6,
    opacity: 0.3,
    x: 160 * i
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
