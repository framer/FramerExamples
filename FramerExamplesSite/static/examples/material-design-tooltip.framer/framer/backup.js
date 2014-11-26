(function() {
  var button, buttonMorph, canvas, print, printer;

  canvas = new BackgroundLayer({
    backgroundColor: "#fff"
  });

  button = new Layer({
    width: 192,
    height: 96,
    backgroundColor: "none",
    borderRadius: "12px"
  });

  button.style["-webkit-mask"] = "url(images/button.png)";

  button.center();

  button.y = button.y + 20;

  buttonMorph = new Layer({
    width: 100,
    height: 100,
    backgroundColor: "#7E7E7E",
    borderRadius: "50%",
    scale: 0.5,
    opacity: 0
  });

  buttonMorph.superLayer = button;

  buttonMorph.center();

  buttonMorph.y = -60;

  print = new Layer({
    image: "images/print.png",
    width: 103,
    height: 36,
    opacity: 0
  });

  print.superLayer = button;

  print.center();

  printer = new Layer({
    image: "images/printer.png",
    width: 90,
    height: 82
  });

  printer.center();

  printer.y = printer.y - 100;

  buttonMorph.animate({
    properties: {
      opacity: 1,
      scale: 1,
      height: 600,
      width: 600,
      x: -200,
      y: -300
    },
    curve: "ease",
    time: 0.6
  });

  button.animate({
    properties: {
      y: button.y + 40
    },
    curve: "ease",
    time: 0.4
  });

  Utils.delay(0.11, function() {
    return print.animate({
      properties: {
        opacity: 1
      },
      curve: "ease",
      time: 0.2
    });
  });

  buttonMorph.on(Events.AnimationEnd, function() {
    return Utils.delay(1.5, function() {
      return button.animate({
        properties: {
          y: button.y - 20,
          opacity: 0
        },
        time: 0.2,
        curve: "ease"
      });
    });
  });

}).call(this);
