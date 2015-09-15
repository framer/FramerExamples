/* Made with Framer
by Andreas Wahlstrom
www.framerjs.com */

/* Import a scrollable feed, a tab-bar and a semi-transparent blue navbar */
var blurredImg, doc;

doc = Framer.Importer.load("imported/blurredbg");

/* Only vertically scrollable */

doc.scroll.scrollHorizontal = false;

/* Blurred feed within navbar */

blurredImg = new Layer({
  image: doc.feed.image,
  width: doc.feed.width,
  height: doc.feed.height,
  superLayer: doc.navbar,
  blur: 20
});

/* Masking the blurred feed */

doc.navbar.clip = true;

/* Bring navbars text & icons to front */

doc.text.bringToFront();

doc.scroll.on(Events.Scroll, function() {

  /* Reverse blurred feed position on scroll */
  blurredImg.y = doc.scroll.scrollY * -1;

  /* Offset by navbar height (130px) */
  return blurredImg.y = blurredImg.y + doc.navbar.height;
});
