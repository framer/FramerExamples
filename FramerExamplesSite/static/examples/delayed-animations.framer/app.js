/* Made with Framer
by Koen Bok
www.framerjs.com */
var ballCurve, bg, cols, container, i, margin, results, rows, size, startDelta;

bg = new BackgroundLayer({
  backgroundColor: "#A793E8"
});

container = new Layer({
  backgroundColor: "transparent",
  clip: false,
  width: 600,
  height: 600
});

container.center();

window.onresize = function() {
  return container.center();
};

rows = 4;

cols = 4;

size = 60;

margin = 50;

ballCurve = "spring(300,20,0)";

startDelta = 200;

(function() {
  results = [];
  for (var i = 1; 1 <= rows ? i <= rows : i >= rows; 1 <= rows ? i++ : i--){ results.push(i); }
  return results;
}).apply(this).map(function(a) {
  var i, results;
  return (function() {
    results = [];
    for (var i = 1; 1 <= cols ? i <= cols : i >= cols; 1 <= cols ? i++ : i--){ results.push(i); }
    return results;
  }).apply(this).map(function(b) {
    var B1, G1, R1, ball;
    ball = new Layer({
      x: b * (size + margin),
      y: a * (size + margin) + startDelta,
      backgroundColor: "white",
      width: size,
      height: size,
      opacity: 0,
      borderRadius: 100,
      superLayer: container
    });
    R1 = 200 / cols * a;
    G1 = 200 / rows * b;
    B1 = 255;
    return ball.animate({
      properties: {
        y: a * (size + margin),
        opacity: 1
      },
      curve: ballCurve,
      delay: 0.05 * a + 0.05 * b
    });
  });
});
