/* Made with Framer
by Min-Sang Choi
www.framerjs.com */

/* Basic Setup */
var animate, appbar, bg, btn_play, btnplaceholder, button, content, frame, goback, materialanimation, metadata, navbar, playcontrol, playerLayers, playercontainer, statusbar, stopall, timer;

bg = new BackgroundLayer({
  backgroundColor: "#eee"
});

playerLayers = Framer.Importer.load("imported/player");

/* Setting Up the Layers */

navbar = playerLayers.navbar;

statusbar = playerLayers.statusbar;

button = playerLayers.button;

btn_play = playerLayers.btn_play;

playcontrol = playerLayers.controller;

metadata = playerLayers.metadata;

content = playerLayers.content;

appbar = playerLayers.appbar;

btnplaceholder = playerLayers.playercontrol;

playercontainer = playerLayers.playercontainer;

timer = playerLayers.timer;

playercontainer.clip = true;

playcontrol.opacity = 0;

/* Setting up the frame */

frame = new Layer({
  x: 0,
  y: 0,
  width: 360,
  height: 640
});

frame.addSubLayer(playerLayers.View);

frame.center();

window.onresize = function() {
  return frame.center();
};

frame.shadowY = 1;

frame.shadowBlur = 6;

frame.shadowColor = "rgba(0,0,0,0.5)";

playcontrol.style.pointerEvents = "none";

playercontainer.style.pointerEvents = "none";

/* Setting Animation */

animate = true;

stopall = function() {
  btn_play.animateStop();
  timer.animateStop();
  playercontainer.animateStop();
  btnplaceholder.animateStop();
  button.animateStop();
  metadata.animateStop();
  playcontrol.animateStop();
  return content.animateStop();
};

materialanimation = function() {
  stopall();
  btn_play.animate({
    properties: {
      opacity: 0
    },
    curve: 'spring(100,12,0)'
  });
  timer.animate({
    properties: {
      x: 360
    },
    curve: 'linear',
    time: 60
  });
  playercontainer.animate({
    properties: {
      y: 362
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.6
  });
  btnplaceholder.animate({
    properties: {
      y: 0,
      rotation: 180
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.6
  });
  button.animate({
    delay: 0.6,
    properties: {
      scale: 10
    },
    curve: 'spring(100,6,0)',
    time: 0.3
  });
  metadata.animate({
    properties: {
      opacity: 0
    },
    curve: 'cubic-bezier(0.4, 0, 1, 1)',
    time: 0.1
  });
  playcontrol.animate({
    delay: 0.6,
    properties: {
      opacity: 1
    },
    curve: 'spring(100,12,0)',
    time: 0.3
  });
  content.animate({
    properties: {
      y: 420
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.6
  });
  return animate = false;
};

goback = function() {
  stopall();
  btn_play.animate({
    delay: 0.8,
    properties: {
      opacity: 1
    },
    curve: 'spring(100,12,0)'
  });
  timer.animate({
    properties: {
      x: 0
    },
    curve: 'linear',
    time: 0
  });
  playercontainer.animate({
    delay: 0.4,
    properties: {
      y: 177
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.6
  });
  btnplaceholder.animate({
    delay: 0.4,
    properties: {
      y: 15,
      rotation: 0
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)',
    time: 0.6
  });
  button.animate({
    properties: {
      scale: 1
    },
    curve: 'spring(75,12,0)',
    time: 0.1
  });
  metadata.animate({
    delay: 0.9,
    properties: {
      opacity: 1
    },
    curve: 'cubic-bezier(0, 0, 0.2, 1)'
  });
  playcontrol.animate({
    properties: {
      opacity: 0
    },
    curve: 'spring(100,12,0)',
    time: 0.3
  });
  content.animate({
    delay: 0.3,
    properties: {
      y: 243
    },
    curve: 'cubic-bezier(0.4, 0, 0.2, 1)'
  });
  return animate = true;
};

/* Firing Event */

frame.on(Events.TouchEnd, function(e) {
  e.preventDefault();
  if (animate === true) {
    return materialanimation();
  } else {
    return goback();
  }
});
