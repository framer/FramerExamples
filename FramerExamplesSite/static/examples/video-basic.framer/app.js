/* Basic video example */
var videoLayer;

videoLayer = new VideoLayer({
  video: "http://techslides.com/demos/sample-videos/small.mp4"
});

videoLayer.width = 560 / 2;

videoLayer.height = 320 / 2;

/* Start playing the video, you can find all docs for the player here: https://developer.mozilla.org/en/docs/Web/HTML/Element/video */

videoLayer.player.play();

/* Listen to video events like play, ended. You can find all the listenable events here: https://developer.mozilla.org/en-US/docs/Web/Guide/Events/Media_events */

videoLayer.player.on("play", function() {
  return print("video.play");
});

videoLayer.player.on("ended", function() {
  videoLayer.player.play();
  return print("video.ended");
});

/* Bounce the video on a click */

videoLayer.on(Events.Click, function() {
  videoLayer.scale = 0.8;
  return videoLayer.animate({
    properties: {
      scale: 1
    },
    curve: "spring"
  });
});
