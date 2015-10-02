/* Made with Framer
by Robert van Klinken
www.framerjs.com */

/* This imports all the layers for "show-badges-prototype-9" into showBadgesPrototype9Layers */
var bg, buttonanimation, progressbar, scroll, scrolltoY, sketch;

sketch = Framer.Importer.load("imported/humanprototype");

/* "Group" instead of "sketch.Group" */

Utils.globalLayers(sketch);

/* Setup scroll copy group */

scroll = ScrollComponent.wrap(copy);

scroll.frame = Screen.frame;

scroll.contentInset = {
  top: 619,
  left: 30
};

scroll.scrollHorizontal = false;

/* Setup start states */

titlebarbg.opacity = 0;

pagetitle.opacity = 1;

expandedmembers.opacity = 0;

personcopy.opacity = 0;

pagetitle.opacity = 0;

writepost.opacity = 0;

/* Set origin of scale animation for members list */

expandedmembers.originX = 0;

expandedmembers.scaleX = 0.1;

/* Background Color */

bg = new BackgroundLayer({
  backgroundColor: "#1A1C1D"
});

/* Animation curves */

buttonanimation = "spring(400,20,0)";

Framer.Defaults.Animation = {
  curve: "spring(500,35,0)"

  /* Scroll trigger */
};

scroll.on(Events.Move, function() {
  return scrolltoY(scroll.scrollY);
});

scrolltoY = function(y) {
  coverphoto.y = Utils.modulate(y, [0, 280], [0, -280], true);
  coverphoto.blur = Utils.modulate(y, [0, 400], [0, 40], true);
  coverphoto.opacity = Utils.modulate(y, [0, 600], [1, 0.9], true);
  title.opacity = Utils.modulate(y, [0, 300], [1, 0], true);
  title.y = Utils.modulate(y, [0, 600], [475, -125], true);
  divider.y = Utils.modulate(y, [0, 600], [583, -17], true);
  pagetitle.opacity = Utils.modulate(y, [426, 456], [0, 1], true);
  pagetitle.y = Utils.modulate(y, [406, 456], [105, 65], true);
  return titlebarbg.opacity = Utils.modulate(y, [454, 456], [0, 1], true);
};

/* Setup progressbar */

progressbar = new Layer({
  width: 327,
  height: 8,
  borderRadius: 3,
  backgroundColor: "#0DC4D3",
  y: 121,
  x: 0
});

/* Set progressbar in scroll group & behind 'avg' indicator */

progressbar.superLayer = personcopy;

progressbar.placeBehind(avg);

/* Layer States */

progressbar.states.add({
  fred: {
    width: 327
  },
  zlatan: {
    width: 227
  }
});

bottomcontent.states.add({
  expand: {
    y: 220
  },
  collapse: {
    y: 0
  },
  expanded2: {
    y: 220
  }
});

newmember.states.add({
  clear: {
    x: 770
  }
});

expandedmembers.states.add({
  inactive: {
    opacity: 1,
    x: 400,
    scaleX: 1
  }
});

othermembers.states.add({
  darken: {
    opacity: 0.4
  },
  lighten: {
    opacity: 1
  },
  donker: {
    opacity: 0.4
  }
});

personcopy.states.add({
  show: {
    opacity: 1
  },
  hide: {
    opacity: 0
  },
  reshow: {
    opacity: 1
  }
});

user2.states.add({
  darken: {
    opacity: 0.4
  },
  lighten: {
    opacity: 1
  }
});

user1.states.add({
  darken: {
    opacity: 0.4
  },
  lighten: {
    opacity: 1
  }
});

stijn.states.add({
  hide: {
    opacity: 0
  },
  show: {
    opacity: 1
  }
});

robert.states.add({
  hide: {
    opacity: 0
  },
  show: {
    opacity: 1
  }
});

/* Scale avatar1 down on touch */

user1.on(Events.TouchStart, function() {
  return user1.animate({
    properties: {
      scale: 0.9
    },
    curve: buttonanimation
  });
});

/* Scale back up then switch states */

user1.on(Events.TouchEnd, function() {
  return user1.animate({
    properties: {
      scale: 1
    },
    curve: buttonanimation
  }, bottomcontent.states.next(["expand", "collapse"]), othermembers.states.next(["donker", "lighten"]), personcopy.states.next(["show", "hide"]), user2.states.next(["darken", "lighten"]), user1.states.next("lighten"), progressbar.states.next("fred"), stijn.states.next("show"), robert.states.next("hide"));
});

/* Scale avatar2 down on touch */

user2.on(Events.TouchStart, function() {
  return user2.animate({
    properties: {
      scale: 0.9
    },
    curve: buttonanimation
  });
});

/* Scale back then switch states */

user2.on(Events.TouchEnd, function() {
  return user2.animate({
    properties: {
      scale: 1
    },
    curve: buttonanimation
  }, bottomcontent.states.next(["expanded2", "collapse"]), othermembers.states.next(["darken", "lighten"]), personcopy.states.next(["reshow", "hide"]), user2.states.next("lighten"), user1.states.next("darken", "lighten"), progressbar.states.next("zlatan"), stijn.states.next("hide"), robert.states.next("show"));
});

/* Scale down '+' button */

newmember.on(Events.TouchStart, function() {
  return newmember.animate({
    properties: {
      scale: 0.9
    },
    curve: buttonanimation
  });
});

/* Scale up and show avatars */

newmember.on(Events.TouchEnd, function() {
  return newmember.animate({
    properties: {
      scale: 1
    },
    curve: buttonanimation
  }, newmember.states.next(), expandedmembers.states.next());
});
