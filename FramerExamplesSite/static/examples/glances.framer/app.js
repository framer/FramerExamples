/* Made with Framer
by Benjamin den Boer
@benjaminnathan
www.framerjs.com */

/* Sketch Import */
var checkIfHome, checkTime, currentIndex, home, i, indicator, indicatorWrapper, j, sketch, startTime, switchIndicators, time;

sketch = Framer.Importer.load("imported/glances");

/* Set device background */

Framer.Device.background.style.background = "#76DDFF";

/* Set-up Pages, Home */

home = new PageComponent({
  size: Screen.size,
  directionLock: true,
  directionLockThreshold: {
    x: 2,
    y: 2
  }
});

home.addPage(sketch.home);

home.addPage(sketch.battery, "bottom");

/* Add weather and calendar glances */

home.addPage(sketch.weather, "right");

home.addPage(sketch.calendar, "right");

sketch.weather.y = Screen.height;

sketch.weather.x = Screen.width;

sketch.calendar.x = Screen.width * 2;

sketch.calendar.y = Screen.height;

/* Bring to front, for indicators */

sketch.battery.bringToFront();

/* Custom animationOptions */

home.animationOptions = {
  curve: "spring(400,50,0)"

  /* Check if the currentPage is home */
};

checkIfHome = function() {
  if (home.currentPage === sketch.home) {
    return home.scrollHorizontal = false;
  } else {
    return home.scrollHorizontal = true;
  }
};

checkIfHome();

/* Time layer */

time = new Layer({
  superLayer: sketch.home,
  backgroundColor: null,
  x: 90,
  y: 32,
  clip: false,
  width: 176
});

time.style.color = "#fff";

time.style.font = "300 68px/1.25 SF UI Display, Helvetica Neue";

time.style.textAlign = "right";

time.style.letterSpacing = "-2px";

/* Check time */

checkTime = function(i) {
  if (i < 10) {
    return "0" + i;
  } else {
    return i;
  }
};

/* Start displaying time */

startTime = function() {
  var date, h, m;
  date = new Date();
  h = checkTime(date.getHours());
  m = checkTime(date.getMinutes());

  /* Set time */
  time.html = h + ":" + m;

  /* Update the time */
  return Utils.delay(0.5, function() {
    return startTime();
  });
};

startTime();

indicatorWrapper = new Layer({
  y: Screen.height - 14,
  backgroundColor: null,
  superLayer: sketch.battery
});

/* Create indictors */

for (i = j = 1; j < 4; i = ++j) {
  indicator = new Layer({
    backgroundColor: "#fff",
    width: 10,
    height: 10,
    x: i * (8 + 10),
    borderRadius: "50%",
    opacity: 0.2,
    superLayer: indicatorWrapper
  });

  /* States */
  indicator.states.add({
    active: {
      opacity: 1
    }
  });
  indicator.states.animationOptions = {
    time: 0.5
  };
}

currentIndex = null;

switchIndicators = function() {
  var indicators, previousIndex;
  indicators = indicatorWrapper.subLayers;
  previousIndex = currentIndex;
  currentIndex = home.horizontalPageIndex(home.currentPage) - 1;
  indicators[currentIndex].states["switch"]("active");
  if (previousIndex !== null) {
    return indicators[previousIndex].states["switch"]("default");
  }
};

home.on(Events.Move, function(event) {

  /* Set max dragging distance */
  if (this.y <= -339) {
    this.y = -340;
  }

  /* Center indicators */
  return indicatorWrapper.x = -home.content.x + (Screen.width / 2 - indicatorWrapper.width / 2);
});

/* On page changes */

home.on("change:currentPage", function() {
  checkIfHome();
  if (home.currentPage === sketch.home) {
    return currentIndex = null;
  } else {
    return switchIndicators();
  }
});
