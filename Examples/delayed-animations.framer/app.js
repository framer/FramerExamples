/* Made with Framer
by Koen Bok
www.framerjs.com */
var ballCurve, cols, margin, rows, size, startDelta, _i, _results;

rows = 4;

cols = 4;

size = 60;

margin = 50;

ballCurve = "spring(300,20,0)";

startDelta = 200;

(function() {
  _results = [];
  for (var _i = 1; 1 <= rows ? _i <= rows : _i >= rows; 1 <= rows ? _i++ : _i--){ _results.push(_i); }
  return _results;
}).apply(this).map(function(a) {
  var _i, _results;
  return (function() {
    _results = [];
    for (var _i = 1; 1 <= cols ? _i <= cols : _i >= cols; 1 <= cols ? _i++ : _i--){ _results.push(_i); }
    return _results;
  }).apply(this).map(function(b) {
    var B1, G1, R1, ball;
    ball = new Layer({
      x: b * (size + margin),
      y: a * (size + margin) + startDelta,
      width: size,
      height: size,
      opacity: 0,
      borderRadius: 100
    });
    R1 = 200 / cols * a;
    G1 = 200 / rows * b;
    B1 = 255;
    ball.style = {
      backgroundColor: "rgba(" + R1 + "," + G1 + "," + B1 + ",1)"
    };
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
