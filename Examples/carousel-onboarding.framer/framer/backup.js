(function() {
  var PSD, c1, c2, keepHintAnimator, keepHintRun, layerGroupName, pic, scrollHintAnimator, scrollHintAnimatorRunning, scrollHintRun, shareHintAnimator, shareHintRun, splashCurve, splashHintRun, swipeHintAnimator, swipeHintAnimatorRunning;

  PSD = Framer.Importer.load("imported/carousel-onboarding");

  for (layerGroupName in PSD) {
    window[layerGroupName] = PSD[layerGroupName];
  }

  for (layerGroupName in PSD) {
    PSD[layerGroupName].originalFrame = window[layerGroupName].frame;
  }

  splashPhone.y = 1100;

  btnContinue.y = 1100;

  swipeHint.scale = 1.3;

  swipeHint.opacity = 0;

  pic = [pic1, pic2, pic3, pic4, pic5, pic6, btnContinue, splashPhone];

  pic1.properties = {
    x: -50,
    y: 800,
    rotation: 10
  };

  pic2.properties = {
    x: 200,
    y: 950,
    scale: 1.4
  };

  pic3.properties = {
    x: 420,
    y: 980,
    rotation: -3,
    scale: 1.5
  };

  pic4.properties = {
    x: 250,
    y: 800,
    rotation: 1,
    scale: 1.4
  };

  pic5.properties = {
    x: 80,
    y: 790,
    rotation: -7,
    scale: 1.4
  };

  pic6.properties = {
    x: 430,
    y: 800,
    rotation: 7,
    scale: 1.4
  };

  splashCurve = 'spring(60,12,0)';

  welcome.scale = 0;

  scrollHint.scale = 1.3;

  scrollHint.opacity = 0;

  shareHint.opacity = 0;

  shareHint.scale = 0;

  keepHint.scale = 0;

  keepHint.opacity = 0;

  chat1.y = chat1.originalFrame.y + 600;

  chat2.y = chat2.originalFrame.y + 600;

  splashHintRun = true;

  scrollHintRun = false;

  shareHintRun = false;

  keepHintRun = false;

  c1 = true;

  c2 = true;

  swipeHintAnimatorRunning = false;

  swipeHintAnimator = function() {
    var animationsDoneCounter, fadeInAnimation;
    if (splashHintRun === false) {
      return;
    }
    if (swipeHintAnimatorRunning === true) {
      return;
    }
    swipeHintAnimatorRunning = true;
    swipeHint.y = swipeHint.originalFrame.y;
    swipeHint.opacity = 0;
    swipeHint.scale = 1.3;
    animationsDoneCounter = 0;
    fadeInAnimation = swipeHint.animate({
      properties: {
        scale: 1,
        opacity: 1
      },
      curve: 'ease-in',
      time: 0.2
    });
    fadeInAnimation.on("end", function() {
      return swipeHint.animate({
        properties: {
          opacity: 0
        },
        curve: 'ease-in',
        time: 0.2,
        delay: 0.4
      });
    });
    swipeHint.animate({
      properties: {
        y: swipeHint.originalFrame.y - 300
      },
      curve: 'linear',
      time: 0.8
    });
    return swipeHint.on("end", function() {
      animationsDoneCounter++;
      if (animationsDoneCounter === 3) {
        swipeHintAnimatorRunning = false;
        return Utils.delay(0.5, swipeHintAnimator);
      }
    });
  };

  swipeHintAnimator();

  splash.on(Events.Click, function() {
    var i, _i;
    if (c1) {
      c1 = false;
      splashHintRun = false;
      swipeHint.destroy();
      for (i = _i = 0; _i <= 7; i = ++_i) {
        pic[i].animate({
          properties: {
            x: pic[i].originalFrame.x,
            y: pic[i].originalFrame.y,
            scale: 1,
            rotation: 0
          },
          curve: splashCurve
        });
      }
      return logo.animate({
        properties: {
          y: -600
        },
        curve: splashCurve
      });
    } else {

    }
  });

  scrollHintAnimatorRunning = false;

  scrollHintAnimator = function() {
    var animationsDoneCounter, fadeInAnimation;
    if (scrollHintRun === false) {
      return;
    }
    if (scrollHintAnimatorRunning === true) {
      return;
    }
    scrollHintAnimatorRunning = true;
    scrollHint.y = scrollHint.originalFrame.y;
    scrollHint.opacity = 0;
    scrollHint.scale = 1.3;
    animationsDoneCounter = 0;
    fadeInAnimation = scrollHint.animate({
      properties: {
        scale: 1,
        opacity: 1
      },
      curve: 'ease-in',
      time: 0.2
    });
    fadeInAnimation.on("end", function() {
      return scrollHint.animate({
        properties: {
          opacity: 0
        },
        curve: 'ease-in',
        time: 0.2,
        delay: 0.4
      });
    });
    scrollHint.animate({
      properties: {
        y: scrollHint.originalFrame.y - 300
      },
      curve: 'linear',
      time: 0.8
    });
    return scrollHint.on("end", function() {
      animationsDoneCounter++;
      if (animationsDoneCounter === 3) {
        scrollHintAnimatorRunning = false;
        return Utils.delay(0.5, scrollHintAnimator);
      }
    });
  };

  btnContinue.on(Events.Click, function() {
    var splashAnimation;
    scrollHintRun = true;
    splashAnimation = splash.animate({
      properties: {
        y: -1000
      },
      curve: 'cubic-bezier',
      time: 0.5
    });
    return splashAnimation.on('end', function() {
      Utils.delay(0.2, function() {
        return welcome.animate({
          properties: {
            scale: 1
          },
          curve: splashCurve
        });
      });
      Utils.delay(3, function() {
        return welcome.animate({
          properties: {
            scale: 0,
            opacity: 0
          },
          curve: splashCurve
        });
      });
      return Utils.delay(3.5, function() {
        var scrollaramEnterAnimation;
        scrollarama.x = scrollarama.originalFrame.x - 640;
        scrollarama.y = scrollarama.originalFrame.y - 1136;
        scrollaramEnterAnimation = scrollarama.animate({
          properties: {
            y: scrollarama.originalFrame.y
          },
          curve: splashCurve
        });
        return scrollaramEnterAnimation.on('end', function() {
          return scrollHintAnimator();
        });
      });
    });
  });

  shareHintAnimator = function() {
    var shareGrow, shareShrink;
    if (shareHintRun) {
      shareGrow = shareHint.animate({
        properties: {
          scale: .8
        },
        curve: 'ease-out',
        time: 1
      });
      shareShrink = shareHint.animate({
        properties: {
          scale: 1
        },
        curve: 'ease-out',
        time: 1
      });
      shareGrow.on('end', function() {
        if (shareHintRun) {
          return shareShrink.start();
        } else {

        }
      });
      shareShrink.on('end', function() {
        if (shareHintRun) {
          return shareGrow.start();
        } else {

        }
      });
      return shareGrow.start();
    }
  };

  scrollarama.on(Events.Click, function() {
    var scrollPhotosAnimation;
    if (c2) {
      c2 = false;
      scrollHintRun = false;
      shareHintRun = true;
      scrollHint.destroy();
      scrollPhotosAnimation = scrollPhotos.animate({
        properties: {
          y: scrollPhotos.originalFrame.y - 5234
        },
        curve: 'cubic-bezier',
        time: 3
      });
      scrollDates.animate({
        properties: {
          x: scrollDates.originalFrame.x - 1100
        },
        curve: 'cubic-bezier',
        time: 3
      });
      return scrollPhotosAnimation.on('end', function() {
        scrollText.animate({
          properties: {
            x: scrollText.originalFrame.x - 640
          },
          curve: splashCurve
        });
        shareText.animate({
          properties: {
            x: shareText.originalFrame.x - 620
          },
          curve: splashCurve
        });
        shareHint.animate({
          properties: {
            scale: 1,
            opacity: 1
          },
          curve: 'spring(100,10,0)'
        });
        return Utils.delay(.3, function() {
          return shareHintAnimator();
        });
      });
    } else {

    }
  });

  keepHintAnimator = function() {
    var keepGrow, keepShrink;
    if (keepHintRun) {
      keepGrow = keepHint.animate({
        properties: {
          scale: .8
        },
        curve: 'ease-out',
        time: 1
      });
      keepShrink = keepHint.animate({
        properties: {
          scale: 1
        },
        curve: 'ease-out',
        time: 1
      });
      keepGrow.on('end', function() {
        if (keepHintRun) {
          return keepShrink.start();
        } else {

        }
      });
      return keepShrink.on('end', function() {
        if (keepHintRun) {
          return keepGrow.start();
        } else {

        }
      });
    }
  };

  shareHint.on(Events.Click, function() {
    shareHintRun = false;
    shareHint.destroy();
    keepHintRun = true;
    scrollarama.animate({
      properties: {
        x: -640
      },
      curve: splashCurve
    });
    conversations.x = scrollarama.originalFrame.x;
    conversations.animate({
      properties: {
        x: conversations.x - 640
      },
      curve: splashCurve
    });
    Utils.delay(1.5, function() {
      return chat1.animate({
        properties: {
          y: chat1.originalFrame.y
        },
        curve: splashCurve
      });
    });
    Utils.delay(1.65, function() {
      return chat2.animate({
        properties: {
          y: chat2.originalFrame.y
        },
        curve: splashCurve
      });
    });
    Utils.delay(3, function() {
      return keepHint.animate({
        properties: {
          scale: 1,
          opacity: 1
        },
        curve: 'spring(100,10,0)'
      });
    });
    return Utils.delay(3.3, function() {
      return keepHintAnimator();
    });
  });

  keepHint.on(Events.Click, function() {
    keepHintRun = false;
    keepHint.destroy();
    conversations.animate({
      properties: {
        x: -640
      },
      curve: splashCurve
    });
    safe.x = scrollarama.originalFrame.x;
    return safe.animate({
      properties: {
        x: safe.x - 680
      },
      curve: splashCurve
    });
  });

}).call(this);
