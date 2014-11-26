(function() {
  var bg, canvas, container, count, currentY, items, spinner, _i;

  canvas = new BackgroundLayer({
    backgroundColor: "#f9f9f9"
  });

  bg = Framer.Importer.load("imported/Progress Prototype");

  bg.Screen.superLayer = canvas;

  bg.Screen.center();

  bg.Screen.pixelAlign();

  window.onresize = function() {
    bg.Screen.center();
    return bg.Screen.pixelAlign();
  };

  container = new Layer({
    width: 640,
    height: 1136,
    backgroundColor: "#fff"
  });

  container.superLayer = bg.Background;

  container.style.boxShadow = "0 3px 6px rgba(0,0,0,0.1)";

  spinner = new VideoLayer({
    video: "images/spinner.mov",
    width: 200,
    height: 200,
    backgroundColor: "#fff",
    rotation: 90,
    opacity: 0
  });

  if (Utils.isChrome()) {
    spinner.video = "images/spinner.mp4";
  }

  spinner.superLayer = container;

  spinner.center();

  spinner.y = spinner.y + 100;

  Utils.delay(1, function() {
    spinner.opacity = 1;
    spinner.player.play();
    spinner.player.playbackRate = 0.9;
    spinner.animate({
      properties: {
        rotation: 360. * 3
      },
      time: 5 / 0.9
    });
    Utils.delay(3.6, function() {
      return spinner.animate({
        properties: {
          y: spinner.y - 100
        },
        curve: "spring(100, 70, 0)"
      });
    });
    return Utils.delay(4.2, function() {
      return spinner.animate({
        properties: {
          opacity: 0,
          scale: 0.1
        },
        time: 0.15
      });
    });
  });

  bg.item1.opacity = 0;

  Utils.delay(3.9 + 1, function() {
    var currentY;
    currentY = bg.item1.y;
    bg.item1.y = currentY + 80;
    return bg.item1.animate({
      properties: {
        opacity: 1,
        y: currentY
      },
      curve: "spring(225, 70, 0)"
    });
  });

  for (count = _i = 2; _i <= 8; count = ++_i) {
    items = bg["item" + count];
    currentY = items.y;
    items.states.add({
      hide: {
        y: currentY + 80,
        opacity: 0
      },
      fadein: {
        y: currentY,
        opacity: 1
      }
    });
    items.states.switchInstant("hide");
    items.states.animationOptions = {
      curve: "spring(225, 70, 0)"
    };
    items.states.animationOptions.delay = 4.5 + 1 + (0.08 * count);
    items.states["switch"]('fadein');
  }

  if (window.devicePixelRatio > 1.5) {
    bg.Screen.scale = 0.5;
  }

}).call(this);
