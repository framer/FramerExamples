/* Made with Framer
by Giel Cobben
@gielcobben
www.framerjs.com */
var bag, bg, closed, curve, hamburger, i, item, j, k, line, logo, nav, scroll, scrollLayer, titles;

bg = new BackgroundLayer({
  backgroundColor: "#FFF"
});

/* ScrollComponent */

scroll = new ScrollComponent({
  x: 0,
  y: 96,
  width: Screen.width,
  height: Screen.height - 96,
  scrollHorizontal: false
});

/* Layers */

scrollLayer = new Layer({
  width: 750,
  height: 3542,
  image: "images/bg.jpg",
  superLayer: scroll.content
});

nav = new Layer({
  x: 0,
  y: 0,
  width: Screen.width,
  height: 96,
  opacity: 0.81,
  backgroundColor: "#000"
});

bag = new Layer({
  x: Screen.width - 68,
  y: 26,
  width: 34,
  height: 44,
  image: "images/bag.png"
});

logo = new Layer({
  y: 24,
  width: 36,
  height: 42,
  image: "images/apple.png"
});

logo.centerX();

hamburger = new Layer({
  x: 34,
  y: 34,
  width: 96,
  height: 96,
  backgroundColor: "none"
});

/* States */

nav.states.add({
  open: {
    opacity: 1,
    height: Screen.height
  }
});

bag.states.add({
  close: {
    x: bag.x + 100
  }
});

bag.states.animationOptions = {
  curve: "spring(200, 25, 0)"
};

/* Nav Icon */

for (i = j = 0; j < 2; i = ++j) {
  line = new Layer({
    x: 0,
    y: i * 24,
    width: 42,
    height: 4,
    originX: 0.5,
    originY: 0.5,
    backgroundColor: "#FFF",
    superLayer: hamburger
  });
  line.states.animationOptions = {
    curve: "spring(200, 25, 0)"
  };
  if (i === 0) {
    line.states.add({
      close: {
        y: 24,
        rotation: 225
      }
    });
  } else {
    line.states.add({
      close: {
        y: 24,
        rotation: 315
      }
    });
  }
}

/* Nav Items */

titles = ["Mac", "iPad", "iPhone", "Watch", "Music", "Support", "Search"];

for (i = k = 0; k < 7; i = ++k) {
  item = new Layer({
    y: i * 95 + 100,
    width: 600,
    height: 60,
    originY: 3,
    scale: 1.1,
    opacity: 0,
    superLayer: nav,
    backgroundColor: "none"
  });
  item.style = {
    "border-bottom": "2px solid rgba(255, 255, 255, 0.3)",
    "font-size": "35px",
    "font-family": "Helvetica Neue",
    "font-weight": "200"
  };
  item.html = titles[i];
  item.centerX();
  item.states.add({
    open: {
      y: item.y + 100,
      opacity: 1,
      scale: 1
    }
  });
}

/* Interaction */

closed = true;

curve = "spring(200, 25, 0)";

hamburger.on(Events.Click, function() {
  var delay, l, len, len1, m, ref, ref1;
  if (closed) {
    delay = 0;
    nav.states["switch"]("open", {
      curve: curve,
      delay: delay
    });
  } else {
    delay = 0.7;
    nav.states["switch"]("default", {
      curve: curve,
      delay: delay
    });
  }
  ref = nav.subLayers;
  for (l = 0, len = ref.length; l < len; l++) {
    item = ref[l];
    if (closed) {
      delay = delay + 0.1;
      item.states["switch"]("open", {
        curve: curve,
        delay: delay
      });
    } else {
      delay = delay - 0.1;
      item.states["switch"]("default", {
        curve: curve,
        delay: delay
      });
    }
  }
  ref1 = hamburger.subLayers;
  for (m = 0, len1 = ref1.length; m < len1; m++) {
    line = ref1[m];
    line.states.next();
  }
  bag.states.next();
  if (closed) {
    return closed = false;
  } else {
    return closed = true;
  }
});
