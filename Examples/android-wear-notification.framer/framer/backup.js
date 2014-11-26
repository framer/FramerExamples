(function() {
  var Sketch, a, bg, mask;

  bg = new BackgroundLayer({
    backgroundColor: "#313D4D"
  });

  mask = new Layer({
    width: 390,
    height: 410,
    backgroundColor: "null"
  });

  mask.center();

  window.onresize = function() {
    return mask.center();
  };

  mask.shadowY = 3;

  mask.shadowBlur = 15;

  mask.shadowColor = "rgba(0,0,0,0.2)";

  Sketch = Framer.Importer.load("imported/OnTime");

  Sketch.Group.superLayer = mask;

  Sketch.Group.y = -120;

  Framer.Defaults.Animation = {
    curve: "spring(260, 30, 0, 0.1)"
  };

  Sketch.Green.states.add({
    move: {
      y: 120
    }
  });

  Sketch.Delayed.states.add({
    fade: {
      y: 180,
      opacity: 0
    }
  });

  Sketch.OnTime.states.add({
    start: {
      y: 90,
      opacity: 0
    }
  });

  Sketch.OnTime.states.switchInstant("start");

  Sketch.Time.states.add({
    hide: {
      y: 220,
      opacity: 0
    }
  });

  Sketch.TimeNew.states.add({
    hide: {
      y: 180,
      opacity: 0
    }
  });

  Sketch.TimeNew.states.switchInstant("hide");

  Sketch.Departure.states.add({
    move: {
      x: 128
    }
  });

  Sketch.Mark.states.add({
    hide: {
      scale: 0,
      originY: 1.5,
      opacity: 0
    }
  });

  Sketch.LegUp.states.add({
    hide: {
      scale: 0,
      originY: 1,
      opacity: 0
    }
  });

  Sketch.LegUp.states.switchInstant("hide");

  Sketch.LegDown.states.add({
    rotate: {
      opacity: 0,
      rotationZ: -135
    }
  });

  Sketch.LegDown.states.switchInstant("rotate");

  a = true;

  bg.on(Events.Click, function() {
    var timeA, timeB, timeC, timeD;
    if (a === true) {
      timeA = 0;
      timeB = 0.3;
      timeC = 0.5;
      timeD = 0.6;
      a = false;
    } else {
      timeA = 0.6;
      timeB = 0.5;
      timeC = 0.3;
      timeD = 0;
      a = true;
    }
    Utils.delay(timeA, function() {
      return Sketch.Green.states.next();
    });
    Utils.delay(timeA, function() {
      return Sketch.Delayed.states.next();
    });
    Utils.delay(timeA, function() {
      return Sketch.OnTime.states.next();
    });
    Utils.delay(timeB, function() {
      return Sketch.Time.states.next();
    });
    Utils.delay(timeB, function() {
      return Sketch.TimeNew.states.next();
    });
    Utils.delay(timeB, function() {
      return Sketch.Departure.states.next();
    });
    Utils.delay(timeB, function() {
      return Sketch.Mark.states.next();
    });
    Utils.delay(timeC, function() {
      return Sketch.LegUp.states.next();
    });
    return Utils.delay(timeD, function() {
      return Sketch.LegDown.states.next();
    });
  });

}).call(this);
