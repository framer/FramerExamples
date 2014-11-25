/* Made with Framer
by Noah Levin
www.framerjs.com */
var animateInCurve, animateOutCurve, goHome, gotoNow, myLayers, noBounceCurve, noBounceCurveSpeed, toggler;

myLayers = Framer.Importer.load("imported/GoogleNow");

/* Settings */

animateInCurve = "spring(400,30,0)";

animateOutCurve = "spring(350,35,0)";

noBounceCurve = "cubic-bezier";

noBounceCurveSpeed = "0.22";

gotoNow = function() {
  myLayers.ColorLogo.animate({
    properties: {
      y: 65,
      scale: 0.662,
      opacity: 0
    },
    curve: animateInCurve
  });
  myLayers.WhiteLogo.animate({
    properties: {
      y: 90,
      scale: 1,
      opacity: 1
    },
    curve: animateInCurve
  });
  myLayers.StatusBar.animate({
    properties: {
      opacity: 1
    },
    curve: animateInCurve
  });
  myLayers.Searchbox.animate({
    properties: {
      y: 205,
      scaleY: 0.90,
      scaleX: 1.0425
    },
    curve: animateInCurve
  });
  myLayers.TrafficCard.animate({
    properties: {
      y: -560,
      scale: 1
    },
    curve: animateInCurve
  });
  myLayers.MovieCard.animate({
    properties: {
      y: -74,
      scale: 1
    },
    curve: animateInCurve
  });
  myLayers.TimeCard.animate({
    properties: {
      y: 840,
      scale: 1
    },
    curve: animateInCurve
  });
  myLayers.Context.animate({
    properties: {
      opacity: 1,
      y: -20
    },
    curve: noBounceCurve,
    time: noBounceCurveSpeed
  });
  myLayers.Mic.animate({
    properties: {
      x: 550,
      y: 242
    },
    curve: animateInCurve
  });
  myLayers.Top.animate({
    properties: {
      y: -20,
      opacity: 0
    },
    curve: noBounceCurve,
    time: noBounceCurveSpeed
  });
  return myLayers.Background.animate({
    properties: {
      brightness: 100
    },
    curve: noBounceCurve,
    time: noBounceCurveSpeed
  });
};

goHome = function() {
  myLayers.ColorLogo.animate({
    properties: {
      y: 301,
      scale: 1,
      opacity: 1
    },
    curve: animateOutCurve
  });
  myLayers.WhiteLogo.animate({
    properties: {
      y: 321,
      scale: 1.5,
      opacity: 0
    },
    curve: animateOutCurve
  });
  myLayers.StatusBar.animate({
    properties: {
      opacity: 0
    },
    curve: animateOutCurve
  });
  myLayers.Searchbox.animate({
    properties: {
      y: 470,
      scaleY: 0.99,
      scaleX: 0.99
    },
    curve: animateOutCurve
  });
  myLayers.TrafficCard.animate({
    properties: {
      y: 0,
      scale: .953
    },
    curve: animateOutCurve
  });
  myLayers.MovieCard.animate({
    properties: {
      y: -36,
      scale: .92
    },
    curve: animateOutCurve
  });
  myLayers.TimeCard.animate({
    properties: {
      y: -20,
      scale: .88
    },
    curve: animateOutCurve
  });
  myLayers.Top.animate({
    properties: {
      y: 22,
      opacity: 1
    },
    curve: animateOutCurve
  });
  myLayers.Context.animate({
    properties: {
      opacity: 0,
      y: 0
    },
    curve: noBounceCurve,
    time: noBounceCurveSpeed
  });
  myLayers.Mic.animate({
    properties: {
      x: 534,
      y: 508
    },
    curve: animateOutCurve
  });
  return myLayers.Background.animate({
    properties: {
      brightness: 104
    },
    curve: noBounceCurve,
    time: noBounceCurveSpeed
  });
};

/* Hide cards that fall off the screen */

myLayers.Content.style.overflow = "hidden";

myLayers.Content.height = 1136;

/* Set Stage */

goHome();

toggler = Utils.toggle(gotoNow, goHome);

myLayers.Content.on(Events.TouchStart, function(e) {
  var movePage;
  e.preventDefault();
  movePage = toggler();
  return movePage();
});
