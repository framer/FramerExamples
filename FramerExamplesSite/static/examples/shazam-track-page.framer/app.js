/* Made with Framer
by Alex Steven
www.framerjs.com */

/* Defaults */
var album, androidKeys, androidStatusBar, avatar, back, button, circle, footer, footerBg, header, list, open, shazam;

Framer.Defaults.Animation = {
  curve: "cubic-bezier(0.2, 0.0, 0.2, 1)",
  time: "0.3"
};

/* Layers */

shazam = new Layer({
  width: 1080,
  height: 1920,
  image: "images/app.png"
});

avatar = new Layer({
  x: 48,
  y: 291,
  width: 180,
  height: 180,
  image: "images/avatar.png"
});

list = new Layer({
  x: 0,
  y: 718,
  width: 1080,
  height: 1060,
  backgroundColor: "transparent"
});

circle = new Layer({
  x: 90,
  y: 330,
  width: 100,
  height: 100,
  originX: 0.5,
  originY: 0.5,
  cornerRadius: 100,
  backgroundColor: "#D42543"
});

album = new Layer({
  x: 48,
  y: 1314,
  width: 180,
  height: 180,
  image: "images/album-cover.jpg"
});

footerBg = new Layer({
  x: 0,
  y: 1776,
  width: 1080,
  height: 1005,
  backgroundColor: '#DDD'
});

footer = new Layer({
  x: 0,
  y: 1000,
  opacity: 0,
  width: 1080,
  height: 1005,
  image: "images/footer.png"
});

header = new Layer({
  x: 0,
  y: 126,
  opacity: 0,
  width: 1080,
  height: 650,
  image: "images/header.png"
});

button = new Layer({
  x: 860,
  y: 1560,
  width: 180,
  height: 180,
  image: "images/button.png"
});

androidKeys = new Layer({
  x: 0,
  y: 1776,
  width: 1080,
  height: 144,
  image: "images/android-keys.jpg"
});

androidStatusBar = new Layer({
  width: 1080,
  height: 75,
  image: "images/android-statusbar.png"
});

back = new Layer({
  x: 40,
  y: 75,
  width: 200,
  height: 200,
  backgroundColor: "transparent"
});

/* States */

album.states.add({
  next: {
    y: 248,
    originX: 0,
    originY: 0,
    scale: 1.7
  }
});

circle.states.add({
  next: {
    scale: 35
  },
  hide: {
    opacity: 0
  }
});

header.states.add({
  next: {
    opacity: 1
  }
});

footer.states.add({
  next: {
    y: 771,
    opacity: 1
  }
});

footerBg.states.add({
  next: {
    y: 771
  }
});

/* Interactions */

open = false;

circle.states.switchInstant("hide");

list.on(Events.Click, function() {
  if (!open) {
    circle.states.switchInstant("default");
    album.style.boxShadow = "0 3px 6px rgba(0,0,0,0.25)";
    album.states["switch"]("next");
    circle.states["switch"]("next", {
      curve: "ease",
      time: 0.8
    });
    footerBg.states["switch"]("next", {
      delay: 0.2
    });
    header.states["switch"]("next", {
      delay: 0.4
    });
    footer.states["switch"]("next", {
      delay: 0.4
    });
    return open = true;
  }
});

back.on(Events.Click, function() {
  if (open) {
    album.style.boxShadow = "none";
    album.states["switch"]("default", {
      delay: 0.2
    });
    header.states["switch"]("default", {
      delay: 0
    });
    footer.states["switch"]("default", {
      delay: 0
    });
    footerBg.states["switch"]("default", {
      delay: 0.2
    });
    circle.states["switch"]("hide", {
      delay: 0.6,
      curve: "ease",
      time: 0.8
    });
    return open = false;
  }
});
