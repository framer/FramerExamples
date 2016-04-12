/* Made with Framer
By Jorn van Dijk
www.framerjs.com */

/* Import & Defaults */
var cancel, chrome, handleBottom, handleBottomY, handleTop, handleTopY, home, lock, mask, sketch, swipe, wallpaper, wallpaperBlur;

sketch = Framer.Importer.load("imported/lockscreen");

Framer.Device.screen.backgroundColor = {
  backgroundColor: "black"
};

Framer.Defaults.Animation = {
  curve: "spring(50,30,0)"

  /* Rename */
};

wallpaper = sketch.wallpaper;

swipe = sketch.swipe;

chrome = sketch.chrome;

mask = sketch.mask;

handleTop = sketch.handleTop;

handleBottom = sketch.handleBottom;

home = sketch.home;

lock = sketch.lock;

cancel = sketch.cancel;

/* Wallpaper intro fade */

wallpaper.scale = 0.9;

wallpaper.opacity = 0;

wallpaper.animate({
  properties: {
    opacity: 1,
    scale: 1
  },
  delay: .5
});

/* WallpaperBlur */

wallpaperBlur = new Layer({
  image: wallpaper.image,
  width: wallpaper.width,
  height: wallpaper.height,
  blur: 50,
  superLayer: lock
});

wallpaperBlur.style["-webkit-mask"] = "url(images/keypadMask.png)";

/* Chrome intro fade */

chrome.opacity = 0;

chrome.animate({
  properties: {
    opacity: 1
  },
  delay: 1
});

/* Slide to unlock repeating fade */

mask.states.add({
  move: {
    x: 720
  }
});

Utils.interval(2.4, function() {
  mask.states.next("move");
  return mask.on(Events.AnimationStop, function() {
    if (mask.states.current === "move") {
      return mask.states.switchInstant("default");
    }
  });
});

/* Draggable */

swipe.draggable.enabled = true;

swipe.draggable.speedY = 0;

swipe.draggable.speedX = 0.6;

handleTopY = handleTop.minY;

handleBottomY = handleBottom.minY;

/* Drag events */

swipe.on(Events.DragMove, function() {

  /* Stop previous animations */
  wallpaper.animateStop();
  handleTop.animateStop();
  handleBottom.animateStop();
  home.animateStop();
  lock.animateStop();

  /* Set up ranges */
  wallpaper.blur = Utils.modulate(Math.abs(swipe.x), [0, 750], [0, 80], true);
  wallpaper.scale = Utils.modulate(Math.abs(swipe.x), [0, 750], [1, 0.9], true);
  wallpaper.opacity = Utils.modulate(Math.abs(swipe.x), [0, 750], [1, 0.6], true);
  wallpaperBlur.opacity = Utils.modulate(Math.abs(swipe.x), [0, 750], [-1, 1], true);
  handleTop.y = Utils.modulate(Math.abs(swipe.x), [0, 750], [handleTopY, handleTopY - 60], true);
  handleTop.opacity = Utils.modulate(Math.abs(swipe.x), [0, 750], [1, 0], true);
  handleBottom.y = Utils.modulate(Math.abs(swipe.x), [0, 750], [handleBottomY, handleBottomY + 60], true);
  handleBottom.opacity = Utils.modulate(Math.abs(swipe.x), [0, 750], [1, 0], true);
  home.opacity = Utils.modulate(Math.abs(swipe.x), [0, 375], [1, 0], true);
  return lock.opacity = Utils.modulate(Math.abs(swipe.x), [0, 375], [-1, 1], true);
});

swipe.on(Events.DragEnd, function() {
  if (swipe.x < 375) {
    swipe.animate({
      properties: {
        x: 0
      },
      curve: "spring(500,50,0)"
    });
    wallpaper.animate({
      properties: {
        blur: 0,
        scale: 1,
        opacity: 1
      },
      curve: "spring(500,50,0)"
    });
    wallpaperBlur.animate({
      properties: {
        opacity: -1
      },
      curve: "spring(500,50,0)"
    });
    handleTop.animate({
      properties: {
        y: handleTopY,
        opacity: 1
      },
      curve: "spring(500,50,0)"
    });
    handleBottom.animate({
      properties: {
        y: handleBottomY,
        opacity: 1
      },
      curve: "spring(500,50,0)"
    });
    return home.animate({
      properties: {
        opacity: 1
      },
      curve: "spring(500,50,0)"
    });
  } else {
    swipe.animate({
      properties: {
        x: 750
      },
      curve: "spring(500,50,0)"
    });
    wallpaper.animate({
      properties: {
        opacity: .6,
        scale: .9,
        blur: 80
      },
      curve: "spring(500,50,0)"
    });
    wallpaperBlur.animate({
      properties: {
        opacity: 1
      },
      curve: "spring(500,50,0)"
    });
    return lock.animate({
      properties: {
        opacity: 1
      },
      curve: "spring(500,50,0)"
    });
  }
});

/* Toggle wallpapers with 1, 2 and 3 */

document.addEventListener('keydown', function(event, layer) {
  var key;
  key = event.which;
  if (key === 49) {
    wallpaper.image = sketch.wallpaper0.image;
    wallpaperBlur.image = sketch.wallpaper0.image;
  }
  if (key === 50) {
    wallpaper.image = sketch.wallpaper1.image;
    wallpaperBlur.image = sketch.wallpaper1.image;
  }
  if (key === 51) {
    wallpaper.image = sketch.wallpaper2.image;
    return wallpaperBlur.image = sketch.wallpaper2.image;
  }
});
