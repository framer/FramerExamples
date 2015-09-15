/* Made with Framer
by Jonas Treub
www.framerjs.com */
var colors, i, page, pageComponent, pageIndex, pageWrapper, pages;

pages = [];

colors = ["#866ccc", "#28affa", "#2dd7aa", "#ffc22c", "#7ddd11", "#f95faa"];

new BackgroundLayer({
  backgroundColor: "black"
});

pageComponent = new PageComponent({
  size: Screen.size,
  clip: false,
  scrollVertical: false
});

for (pageIndex = i = 0; i < 6; pageIndex = ++i) {

  /* the pagewrapper can be seen as the door frame for the rotated layer */
  pageWrapper = new Layer({
    size: Screen.size,
    perspective: 900,
    backgroundColor: null
  });
  page = new Layer({

    /* nifty trick to get the defined colors in order no matter how many pages */
    backgroundColor: colors[pageIndex % colors.length],
    size: pageWrapper.size,
    superLayer: pageWrapper,
    html: "" + (pageIndex + 1),
    style: {
      lineHeight: Screen.height + "px",
      textAlign: "center",
      fontSize: "240px",
      fontWeight: "100",
      fontFamily: "Helvetica Neue"
    }
  });
  page.index = pageIndex;
  pages.push(page);
  pageComponent.addPage(pageWrapper);
}

pageComponent.on(Events.Move, function(scrollOffset) {
  var currentXOffset, halfScreen, j, len, pageOffset, pageXPosition, results;
  currentXOffset = -scrollOffset.x;
  halfScreen = Screen.width;

  /* we don't want to rotate any layers when the pageComponent is dragged outside of its bounds */
  currentXOffset = Math.min(Math.max(0, currentXOffset), (pages.length - 1) * Screen.width);
  results = [];
  for (j = 0, len = pages.length; j < len; j++) {
    page = pages[j];
    pageXPosition = page.index * Screen.width;
    pageOffset = currentXOffset - pageXPosition;
    page.rotationY = Utils.modulate(pageOffset, [-halfScreen, halfScreen], [113, -113], true);

    /* we change the opacity of the leftside of the cube */
    page.opacity = Utils.modulate(pageOffset, [-halfScreen, halfScreen], [2, .3], true);

    /* depending on the relative offset each page is either rotated around its left or right side */
    if (pageOffset > 0) {
      results.push(page.originX = 1);
    } else {
      results.push(page.originX = 0);
    }
  }
  return results;
});
