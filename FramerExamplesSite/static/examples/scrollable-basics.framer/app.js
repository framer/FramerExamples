/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Sketch file included */
var bg, container, list;

list = Framer.Importer.load("imported/list");

bg = new BackgroundLayer({
  backgroundColor: "#2DD7AA"
});

container = new Layer({
  backgroundColor: "transparent",
  height: 128,
  width: 128,
  borderRadius: 4
});

container.center();

window.onresize = function() {
  return container.center();
};

/* Make content subLayer of our container */

list.content.superLayer = container;

list.content.x = 4;

list.content.y = 4;

/* Imported content exceeds height of container
Enable scrolling */

container.scroll = true;
