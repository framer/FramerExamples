/* Made with Framer
by Benjamin den Boer
www.framerjs.com */
var allSpinners, bg, count, i, spinGradient, spinMask;

bg = Framer.Importer.load("imported/Pull to Refresh");

bg.Content.draggable.enabled = true;

bg.Content.draggable.speedX = 0;

bg.Content.draggable.speedY = 0.525;

bg.Content.draggable.maxDragFrame = bg.Content.frame;

bg.Content.draggable.maxDragFrame.height = 1136;

spinMask = new Layer({
  height: 54,
  width: 52,
  backgroundColor: "transparent",
  opacity: 0
});

spinMask.style["-webkit-mask"] = "url(images/mask.png) no-repeat";

spinGradient = new Layer({
  height: 54,
  width: 54,
  image: "images/spinGradient.png"
});

spinGradient.superLayer = spinMask;

spinMask.superLayer = bg.Spinner;

[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(function(a) {
  var rotateSpin;
  return rotateSpin = spinGradient.animate({
    properties: {
      rotation: 30 * a
    },
    curve: "linear",
    time: 0.8,
    repeat: 1000
  });
});

allSpinners = null;

bg.Content.opacity = 1;

for (count = i = 1; i <= 12; count = ++i) {
  allSpinners = bg["spin" + count];
  allSpinners.states.add({
    hide: {
      opacity: 0
    },
    show: {
      opacity: 1
    }
  });
  allSpinners.states.switchInstant("hide");
  allSpinners.states.animationOptions = {
    curve: "ease",
    time: 0
  };
}

bg.Content.on(Events.DragMove, function() {
  var calculateOpacity, yPos;
  yPos = parseInt(bg.Content.y - 380 + -40);
  calculateOpacity = Utils.modulate(yPos, [-10, 20], [0, 1], true);
  bg.spin1.opacity = calculateOpacity;
  if (yPos >= 20) {
    bg.spin2.states["switch"]("show");
  }
  if (yPos >= 28) {
    bg.spin3.states["switch"]("show");
  }
  if (yPos >= 36) {
    bg.spin4.states["switch"]("show");
  }
  if (yPos >= 44) {
    bg.spin5.states["switch"]("show");
  }
  if (yPos >= 52) {
    bg.spin6.states["switch"]("show");
  }
  if (yPos >= 60) {
    bg.spin7.states["switch"]("show");
  }
  if (yPos >= 68) {
    bg.spin8.states["switch"]("show");
  }
  if (yPos >= 76) {
    bg.spin9.states["switch"]("show");
  }
  if (yPos >= 84) {
    bg.spin10.states["switch"]("show");
  }
  if (yPos >= 92) {
    bg.spin11.states["switch"]("show");
  }
  if (yPos >= 100) {
    bg.spin12.states["switch"]("show");
    bg.Spinner.animate({
      properties: {
        rotation: 140
      },
      curve: "ease",
      time: 0.4
    });
    Utils.delay(0.4, function() {
      bg.allSpins.opacity = 0;
      return spinMask.opacity = 1;
    });
    bg.Content.on(Events.DragEnd, function() {
      this.animate({
        properties: {
          y: 500
        },
        curve: "spring(600,50,0)"
      });
      return Utils.delay(2, function() {
        bg.Content.animate({
          properties: {
            y: 380
          },
          curve: "ease",
          time: 0.1
        });
        return bg.Spinner.animate({
          properties: {
            scale: 0.1,
            rotation: -45
          },
          curve: "ease",
          time: 0.4
        });
      });
    });
  }
  if (yPos < 100) {
    bg.allSpins.opacity = 1;
    spinMask.opacity = 0;
    bg.Spinner.rotation = 0;
    bg.Spinner.scale = 1;
    bg.Content.on(Events.DragEnd, function() {
      return this.animate({
        properties: {
          y: 380
        },
        curve: "spring(600,50,0)"
      });
    });
  }
  if (yPos < 20) {
    bg.spin2.states["switch"]("hide");
  }
  if (yPos < 28) {
    bg.spin3.states["switch"]("hide");
  }
  if (yPos < 36) {
    bg.spin4.states["switch"]("hide");
  }
  if (yPos < 44) {
    bg.spin5.states["switch"]("hide");
  }
  if (yPos < 52) {
    bg.spin6.states["switch"]("hide");
  }
  if (yPos < 60) {
    bg.spin7.states["switch"]("hide");
  }
  if (yPos < 68) {
    bg.spin8.states["switch"]("hide");
  }
  if (yPos < 76) {
    bg.spin9.states["switch"]("hide");
  }
  if (yPos < 84) {
    bg.spin10.states["switch"]("hide");
  }
  if (yPos < 92) {
    bg.spin11.states["switch"]("hide");
  }
  if (yPos < 100) {
    return bg.spin12.states["switch"]("hide");
  }
});
