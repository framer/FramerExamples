/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Import */
var progress, showPause, showPlay, sketch, time, vid, vidBackground, vidWrapper, wasPlaying, width;

sketch = Framer.Importer.load("imported/video-player");

Framer.Device.screen.backgroundColor = "#000";

width = Screen.width - 240;

/* Video wrapper */

vidWrapper = new Layer({
  x: 0,
  y: 128,
  width: 750,
  height: 720,
  backgroundColor: "transparent"
});

/* Video */

vid = new VideoLayer({
  width: 750,
  height: 720,
  video: "balloons.mp4",
  x: 0,
  backgroundColor: "transparent",
  superLayer: vidWrapper
});

/* Functions for controls */

showPlay = function() {
  sketch.play.visible = true;
  sketch.pause.visible = false;
  return vid.player.pause();
};

showPause = function() {
  sketch.pause.visible = true;
  sketch.play.visible = false;
  return vid.player.play();
};

/* Trick to make it load with a thumbnail on mobile */

vid.player.play();

Utils.delay(0.25, function() {
  return showPlay();
});

/* Define & position sliders */

progress = new SliderComponent({
  min: 0,
  max: 17,
  x: 104,
  y: vidWrapper.maxY - 55,
  width: 520,
  backgroundColor: "rgba(255,255,255,0.4)",
  borderRadius: 4,
  height: 10
});

progress.fill.backgroundColor = "#fff";

progress.fill.borderRadius = 4;

/* Disable momentum, hide knob */

progress.knob.draggable.momentum = false;

wasPlaying = false;

/* Scrubbing interaction */

progress.knob.on(Events.DragStart, function() {
  if (!vid.player.paused) {
    wasPlaying = true;
  }
  return vid.player.pause();
});

progress.knob.on(Events.DragEnd, function() {
  vid.player.currentTime = progress.value;
  if (wasPlaying) {
    showPause();
  }
  return wasPlaying = false;
});

progress.on(Events.SliderValueChange, function() {
  var currentTime, newTime;
  newTime = Utils.round(this.value, 1);
  currentTime = Utils.round(vid.player.currentTime, 1);

  /* Only update if needed, to prevent ‘timeupdate’ events from 
  	slightly changing the time, causing playback to stutter
   */
  if (newTime !== currentTime) {
    return vid.player.currentTime = newTime;
  }
});

time = new Layer({
  superLayer: vidWrapper,
  x: vidWrapper.maxX - 90,
  y: vidWrapper.maxY - 200,
  backgroundColor: "transparent"
});

time.html = "0:00";

time.style = {
  "font": "400 30px/1.4 Helvetica"
};

vidBackground = new Layer({
  superLayer: vidWrapper,
  width: vidWrapper.width,
  height: 116,
  backgroundColor: "transparent",
  y: vidWrapper.height - 116
});

vidBackground.style.background = "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 100%)";

/* Controls */

sketch.play.placeBefore(vidWrapper);

sketch.pause.placeBefore(sketch.play);

sketch.pause.visible = false;

time.bringToFront();

progress.bringToFront();

Events.wrap(vid.player).addEventListener("timeupdate", function() {
  progress.knob.midX = progress.pointForValue(this.currentTime);
  time.html = "0:0" + Math.round(this.currentTime);
  if (Math.round(this.currentTime) > 9) {
    return time.html = "0:" + Math.round(this.currentTime);
  }
});

/* Video player interactions */

sketch.play.on(Events.Click, function() {
  showPause();
  if (vid.player.currentTime === vid.player.duration) {
    vid.player.currentTime = 0;
    return showPause();
  }
});

sketch.pause.on(Events.Click, function() {
  return showPlay();
});

vid.player.onplaying = function() {
  return showPause();
};

vid.player.onended = function() {
  return showPlay();
};
