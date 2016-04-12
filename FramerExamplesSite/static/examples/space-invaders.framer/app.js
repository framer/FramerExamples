/* Made with Framer
by Balraj Chana
www.framerjs.com */
var bar, barBg, barColours, barHeading, barHeadings, bars, bg, chartBg, chartBgStyle, contentBlock, dialog, fab, fabIcon, i, j, scoreHeading, scoreHeadingStyle, scroll, spaceInFramers, subHeading, subHeadingStyle, ui,
  indexOf = [].indexOf || function(item) { for (var i = 0, l = this.length; i < l; i++) { if (i in this && this[i] === item) return i; } return -1; };

Framer.Device.background.style.background = "#83899E";

/* Create all of the layers and set their properties */

bg = new BackgroundLayer({
  backgroundColor: "#242939"
});

scroll = new ScrollComponent({
  width: Screen.width,
  height: Screen.height,
  scrollVertical: false,
  x: Screen.width + 200,
  clip: false
});

dialog = new Layer({
  backgroundColor: "rgba(36,41,57,.90)",
  superLayer: scroll.content,
  width: scroll.width - 100,
  height: 1100,
  midY: scroll.midY,
  borderRadius: 20,
  shadowY: 5,
  shadowColor: "rgba(0,0,0,.5)",
  shadowSpread: 0,
  shadowBlur: 200,
  x: 50,
  clip: true
});

contentBlock = new Layer({
  height: 650,
  width: Screen.width,
  backgroundColor: "white",
  y: Screen.height,
  borderRadius: 500,
  opacity: 0,
  clip: false
});

fab = new Layer({
  height: 130,
  width: 130,
  borderRadius: "50%",
  x: Screen.width - 200,
  y: Screen.height - contentBlock.height - 60,
  scale: 0,
  backgroundColor: "#F78A55",
  shadowY: 5,
  shadowColor: "rgba(0,0,0,.1)",
  shadowBlur: 5
});

fab.draggable.enabled = false;

fabIcon = new Layer({
  superLayer: fab,
  html: '<i class="material-icons" style="font-size: 100px;">chevron_right</i>',
  height: fab.height,
  width: fab.width,
  backgroundColor: null,
  x: 16,
  y: 15
});

scoreHeadingStyle = {
  superLayer: false,
  y: Screen.height / 5,
  backgroundColor: null,
  maxX: 0,
  opacity: 0,
  height: 400,
  width: Screen.width,
  style: {
    "font": "200 300px/normal 'Titillium Web', sans-serif",
    "text-align": "center"
  }
};

scoreHeading = new Layer(scoreHeadingStyle);

scoreHeading.html = "SF";

subHeadingStyle = {
  y: scoreHeading.maxY,
  x: Screen.width,
  backgroundColor: null,
  opacity: 0,
  height: 100,
  width: Screen.width,
  style: {
    "font": "200 1.1em/normal 'Titillium Web', sans-serif",
    "text-align": "center",
    "letter-spacing": "20px"
  }
};

subHeading = new Layer(subHeadingStyle);

subHeading.html = "SPACE IN <span style='font-weight:700'>FRAMERS</span>";

chartBgStyle = {
  superLayer: contentBlock,
  width: contentBlock.width - 200,
  midX: contentBlock.midX,
  y: 100,
  height: 500,
  backgroundColor: null
};

chartBg = new Layer(chartBgStyle);

bars = [];

barHeadings = ["LEVEL", "TARGETS", "BALLS"];

barColours = ["#F55F6E", "#F89863", "#F9D259"];

for (i = j = 0; j < 3; i = ++j) {
  barBg = new Layer({
    superLayer: chartBg,
    height: 80,
    width: Screen.width - 200,
    y: i * 170 + 50,
    borderColor: "#CADCE6",
    borderRadius: 10,
    clip: false
  });
  bar = new Layer({
    superLayer: barBg,
    y: 30,
    x: 30,
    height: 20,
    borderRadius: 100,
    width: 0,
    backgroundColor: barColours[i]
  });
  barHeading = new Layer({
    superLayer: barBg,
    backgroundColor: null,
    html: barHeadings[i],
    width: Screen.width,
    y: -50,
    style: {
      "font": "700 1em/normal 'Titillium Web', sans-serif",
      "letter-spacing": "10px"
    }
  });
  bars.push(bar);
}

/* Initiate common states for generated layers */

contentBlock.states.add({
  slideIn: {
    y: Screen.height - contentBlock.height,
    borderRadius: 0,
    opacity: 1
  }
});

contentBlock.states.animationOptions = {
  curve: "spring(300,25,0)"
};

fab.states.add({
  slideIn: {
    scale: 1,
    x: Screen.width - 200
  },
  expand: {
    scale: 25
  },
  shrinkDown: {
    scale: 0,
    y: Screen.height - 200
  }
});

fab.states.animationOptions = {
  curve: "spring(300,15,0)",
  delay: .3
};

fabIcon.states.add({
  fadeOut: {
    opacity: 0
  }
});

fabIcon.states.animationOptions = {
  time: .5
};

subHeading.states.add({
  slideIn: {
    x: 0,
    opacity: 1
  },
  slideOut: {
    maxX: 0,
    opacity: 0
  }
});

subHeading.states.animationOptions = {
  curve: "spring(100,15,0)",
  delay: .1
};

scoreHeading.states.add({
  slideIn: {
    x: 0,
    opacity: 1
  },
  slideOut: {
    x: Screen.width,
    opacity: 0
  }
});

scoreHeading.states.animationOptions = {
  curve: "spring(100,15,0)"
};

scroll.states.add({
  slideIn: {
    x: 0
  }
});

scroll.states.animationOptions = {
  curve: "spring(100,15,0)"

  /* This module defines how the UI is displayed and controlled. The mechanics of the game will dictate the difficulty for each level */
};

ui = (function() {
  var animateAway, animateBgCircles, checkLevel, circles, currentLevel, endState, mechanics, openState, rippleEffect, startCountDown, styleHeading, styleState, sumResults;
  currentLevel = 0;
  mechanics = {
    level: [1, 2, 3, 4, 5],
    speed: [15, 12, 9, 6, 3],
    limit: [25, 28, 31, 34, 37],
    balls: [10, 13, 16, 19, 22],
    targets: [5, 6, 7, 8, 9]
  };
  circles = [];

  /* Generate circles in the background to animate and destroy */
  animateBgCircles = function() {
    var circle, colIndex, doAgain, k, l, rowIndex;
    for (rowIndex = k = 0; k < 3; rowIndex = ++k) {
      for (colIndex = l = 0; l < 5; colIndex = ++l) {
        circle = new Layer({
          width: 200,
          height: 200,
          borderRadius: "50%",
          backgroundColor: "hsla(" + (Utils.randomNumber() * 360) + ",50%,50%,1)",
          scale: Utils.randomNumber(.2, 1),
          x: colIndex * (200 + Screen.width / 5 - 200) + Screen.width / 5 - 200,
          y: -250,
          brightness: 150,
          blur: Utils.randomNumber(0, 40),
          opacity: Utils.randomNumber(.3, 1),
          superLayer: bg,
          clip: false
        });
        circles.push(circle);
        circle.animate({
          curve: "linear",
          time: Utils.randomNumber(5, 20),
          delay: Utils.randomNumber(.1, 20),
          properties: {
            y: Screen.height + 200
          }
        });
        circle.on("change:y", function() {
          if (this.y > Screen.height) {
            spaceInFramers.deleteObjects(this, circles);
          }
          if (circles.length === 10) {
            return doAgain();
          }
        });
      }
    }
    return doAgain = Utils.throttle(1, function() {
      return animateBgCircles();
    });
  };

  /* Blow circles away from view before the game begins */
  animateAway = function() {
    var k, layer, len, results;
    results = [];
    for (i = k = 0, len = circles.length; k < len; i = ++k) {
      layer = circles[i];
      layer.animate({
        time: .4,
        curve: "ease-in",
        delay: i * .02,
        properties: {
          maxX: -200,
          scale: 0,
          opacity: 0
        }
      });
      results.push(Utils.delay(1, function() {
        var l, len1;
        for (l = 0, len1 = circles.length; l < len1; l++) {
          layer = circles[l];
          layer.destroy();
        }
        return circles.length = 0;
      }));
    }
    return results;
  };

  /* 	Display, animate and style the UI elements on launch/restart. Level, targets and balls are calculated based on current level */
  openState = function() {
    var k, layer, len, ref, results;
    styleState(sumResults(mechanics.limit[currentLevel], [mechanics.limit[currentLevel], mechanics.limit[4]], [mechanics.balls[currentLevel], mechanics.balls[4]]));
    ref = [fab, contentBlock, scoreHeading, subHeading];
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      layer = ref[k];
      results.push(layer.states["switch"]("slideIn"));
    }
    return results;
  };
  styleState = function(subHeadingOptions, chartBgOptions, scoreHeadingOptions, barBgOptions, textOptions, barOptions) {
    var barBgDefaultOptions, barDefaultOptions, chartBgDefaultOptions, k, l, layer, len, len1, options, ref, results, scoreHeadingDefaultOptions, subHeadingDefaultOptions, text, textDefaultOptions;
    options = [
      subHeadingDefaultOptions = subHeadingStyle, chartBgDefaultOptions = chartBgStyle, scoreHeadingDefaultOptions = scoreHeadingStyle, barDefaultOptions = {
        x: 30
      }, barBgDefaultOptions = {
        borderWidth: 1,
        backgroundColor: "rgba(246,250,252,1)"
      }, textDefaultOptions = {
        style: {
          "color": "#6296B2"
        }
      }
    ];
    ref = [subHeading, chartBg, scoreHeading];
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      layer = ref[i];
      layer.props = arguments[i] != null ? arguments[i] : arguments[i] = options[i];
    }
    results = [];
    for (l = 0, len1 = bars.length; l < len1; l++) {
      bar = bars[l];
      bar.props = barOptions != null ? barOptions : barOptions = barDefaultOptions;
      bar.superLayer.props = barBgOptions != null ? barBgOptions : barBgOptions = barBgDefaultOptions;
      results.push((function() {
        var len2, m, ref1, results1;
        ref1 = bar.siblingLayers;
        results1 = [];
        for (m = 0, len2 = ref1.length; m < len2; m++) {
          text = ref1[m];
          results1.push(text.props = textOptions != null ? textOptions : textOptions = textDefaultOptions);
        }
        return results1;
      })());
    }
    return results;
  };
  styleHeading = function(color, icon) {
    return "<span style='border-radius: 50%; text-align: center; height: 300px; width: 300px; border: 5px solid " + color + "; \ndisplay: inline-block; margin-left: -100px; line-height: 220px'><i class=\"material-icons\" style=\"font-size: 120px;\">" + icon + "</i></span>";
  };

  /* Display the results after the current level is completed */
  endState = function(timeHeading, levelHeading) {
    var k, layer, len, ref;
    styleState({
      y: Screen.height - 150
    }, {
      superLayer: dialog,
      width: dialog.width - 200,
      maxY: dialog.height - 50
    }, {
      superLayer: dialog,
      width: dialog.width,
      y: 125,
      style: {
        "line-height": "3",
        "font-size": "100px"
      }
    }, {
      borderWidth: 0,
      backgroundColor: null,
      width: chartBg.width
    }, {
      style: {
        "color": "white"
      }
    }, {
      x: 0
    });
    animateBgCircles();
    ref = [scroll, timeHeading, levelHeading];
    for (k = 0, len = ref.length; k < len; k++) {
      layer = ref[k];
      layer.states["switch"]("slideIn");
    }
    timeHeading.html = currentLevel > 0 ? styleHeading("#78D17B", "done") : styleHeading("#D05050", "clear");
    levelHeading.html = "&#8250; SLIDE TO CONTINUE";
    timeHeading.superLayer = scroll.content.subLayers[0];
    timeHeading.x = Align.center;
    timeHeading.y = Align.center;
    levelHeading.maxY = Screen.height - 100;

    /* Determine whether the scroll position is large enough to progress on to the next screen */
    return scroll.on(Events.Move, function(event) {
      if (scroll.scrollX < -200) {
        scroll.states["switch"]("default");
        return Utils.delay(.5, function() {
          var l, len1, ref1;
          ref1 = [timeHeading, levelHeading];
          for (l = 0, len1 = ref1.length; l < len1; l++) {
            layer = ref1[l];
            layer.states.switchInstant("default");
          }
          subHeading.html = "LEVEL " + mechanics.level[currentLevel];
          return openState();
        });
      }
    });
  };

  /* Chain animate the UI elements before the game starts */
  startCountDown = function() {
    var levelHeading, timerHeading;
    fab.animate({
      time: .3,
      curve: "bezier-curve",
      properties: {
        midY: Screen.height / 2
      }
    });
    fab.animate({
      time: .3,
      properties: {
        midX: Screen.width / 2
      }
    });
    fabIcon.states["switch"]("fadeOut", {
      time: .1
    });
    timerHeading = new Layer(scoreHeadingStyle);
    levelHeading = new Layer(subHeadingStyle);
    levelHeading.states.add({
      slideIn: {
        x: 0,
        opacity: 1
      },
      slideOut: {
        maxX: 0,
        opacity: 0
      }
    });
    levelHeading.states.animationOptions = {
      curve: "spring(100,15,0)",
      delay: .1
    };
    timerHeading.states.add({
      slideIn: {
        x: 0,
        opacity: 1
      },
      slideOut: {
        x: Screen.width,
        opacity: 0
      }
    });
    timerHeading.states.animationOptions = {
      curve: "spring(100,15,0)"
    };
    Utils.delay(.2, function() {
      timerHeading.html = null;
      timerHeading.html = "3";
      levelHeading.html = "LEVEL <span style='font-weight:700'>" + mechanics.level[currentLevel] + "</span>";
      return fab.states["switch"]("expand", {
        time: .6,
        curve: "ease"
      });
    });
    return Utils.delay(.8, function() {
      var k, layer, len, ref, timing;
      ref = [timerHeading, levelHeading];
      for (k = 0, len = ref.length; k < len; k++) {
        layer = ref[k];
        layer.states["switch"]("slideIn");
      }
      return timing = Utils.interval(1, function() {
        var shrinkFab;
        timerHeading.html = "" + (parseInt(timerHeading.html, 10) - 1);

        /* Start the game when the counter reaches 0 */
        if (timerHeading.html < 1) {
          shrinkFab = fab.states["switch"]("shrinkDown", {
            curve: "ease",
            time: .4
          });
          shrinkFab.on("end", function() {
            var l, len1, ref1, results;
            ref1 = [fab, fabIcon];
            results = [];
            for (l = 0, len1 = ref1.length; l < len1; l++) {
              layer = ref1[l];
              results.push(layer.states.switchInstant("default"));
            }
            return results;
          });
          clearInterval(timing);
          return spaceInFramers.startGame(timerHeading, levelHeading, mechanics.speed[currentLevel], mechanics.balls[currentLevel], mechanics.targets[currentLevel], mechanics.limit[currentLevel]);
        }
      });
    });
  };

  /* Determine whether the score is sufficient in order to progress onto the next level, or restart the game from the beginning */
  checkLevel = function(hits) {
    return currentLevel = hits >= mechanics.limit[currentLevel] - 10 ? currentLevel + 1 : 0;
  };

  /* Calculate the pre-score results (targets to reach) and post-score results (targets hit) */
  sumResults = function(hits, misses, balls, callback, chartBgWidth) {
    var ballsBar, k, len, levelBar, ref, targetsBar, width;
    if (chartBgWidth == null) {
      chartBgWidth = chartBg.width - 60;
    }
    levelBar = Utils.modulate(mechanics.level[currentLevel], [0, mechanics.level[4]], [10, chartBgWidth], true);
    targetsBar = Utils.modulate(misses[0], [0, misses[1]], [10, chartBgWidth], true);
    ballsBar = Utils.modulate(balls[0], [0, balls[1]], [10, chartBgWidth], true);
    ref = [levelBar, targetsBar, ballsBar];
    for (i = k = 0, len = ref.length; k < len; i = ++k) {
      width = ref[i];
      bars[i].width = 0;
      bars[i].animate({
        curve: "spring(100,15,0)",
        delay: i * .2 + .6,
        properties: {
          width: width
        }
      });
    }
    if (callback) {
      return callback(hits);
    }
  };

  /* Generate the ripple effect when the FAB is pressed. Mobile and desktop enabled */
  rippleEffect = function(ev, layer) {
    var cursorX, cursorY, ripple, rippleAnimation;
    cursorX = !Utils.isDesktop() ? layer.draggable.layerCursorOffset.x : ev.offsetX;
    cursorY = !Utils.isDesktop() ? layer.draggable.layerCursorOffset.y : ev.offsetY;
    ripple = new Layer({
      borderRadius: "50%",
      scale: 0,
      opacity: 1,
      superLayer: layer,
      backgroundColor: layer.backgroundColor,
      brightness: 150,
      midX: cursorX,
      midY: cursorY,
      force2d: true,
      index: 0
    });
    rippleAnimation = ripple.animate({
      time: 1,
      properties: {
        scale: layer.width / 50,
        clip: true,
        opacity: 0
      }
    });
    return rippleAnimation.on("end", function() {
      return ripple.destroy();
    });
  };
  fab.on(Events.Click, function() {
    rippleEffect(event, this, animateAway());
    this.ignoreEvents = true;
    return Utils.delay(.6, function() {
      var k, layer, len, ref, results;
      startCountDown();
      ref = [contentBlock, scoreHeading, subHeading];
      results = [];
      for (k = 0, len = ref.length; k < len; k++) {
        layer = ref[k];
        results.push(layer.states["switch"]("default"));
      }
      return results;
    });
  });
  openState(animateBgCircles());
  return {
    sumResults: sumResults,
    endState: endState,
    checkLevel: checkLevel
  };
})();

/* This module defines the mechanics of the game */

spaceInFramers = (function() {
  var activateBulletBall, activeTargets, allTargets, animateBallEnd, animateTargetEnd, balls, bulletActive, bullets, checkActiveBullet, collisionDetection, deleteObjects, flag, gutter, height, hits, interval, misses, pushArray, resetGame, setActiveBall, startGame, width;
  hits = [];
  activeTargets = [];
  misses = [];
  bullets = [];
  balls = [];
  allTargets = [];
  bulletActive = flag = interval = false;
  height = width = Utils.round(Screen.width / 7, 0);
  gutter = Screen.width / 5 - width;

  /* Empty arrays and reset layers to their default values. Called after each level is completed */
  resetGame = function() {
    var array, arrays, k, l, len, len1, ref, results;
    clearInterval(interval);
    fab.ignoreEvents = flag = false;
    fab.backgroundColor = "hsla(" + (Utils.randomNumber() * 360) + ",50%,50%,1)";
    ref = [allTargets, activeTargets, balls, hits, misses, bullets];
    results = [];
    for (k = 0, len = ref.length; k < len; k++) {
      arrays = ref[k];
      for (l = 0, len1 = arrays.length; l < len1; l++) {
        array = arrays[l];
        array.destroy();
      }
      results.push(arrays.length = 0);
    }
    return results;
  };

  /* Set the first ball in the array to active and enable draggable constraints */
  setActiveBall = function(ball) {
    var inactiveBalls, k, len, ref, results;
    if (balls.length > 1) {
      if (flag !== true) {
        ball.props = {
          backgroundColor: "white",
          shadowY: 10,
          shadowBlur: 25,
          shadowColor: "rgba(0,0,0,.7)"
        };
      }
      ball.draggable.props = {
        enabled: true,
        overdrag: true,
        constraints: {
          width: Screen.width,
          height: Screen.height
        }
      };
      ref = balls.slice(1, +balls.length + 1 || 9e9);
      results = [];
      for (i = k = 0, len = ref.length; k < len; i = ++k) {
        inactiveBalls = ref[i];
        results.push(inactiveBalls.animate({
          time: .5,
          delay: i * .1,
          properties: {
            x: inactiveBalls.x - 150,
            scale: (5 - i) / 5,
            opacity: (5 - i) / 5
          }
        }));
      }
      return results;
    }
  };
  pushArray = function(layer, array) {
    if (indexOf.call(array, layer) < 0) {
      return array.push(layer);
    }
  };

  /* Delete and remove layer from its associated array */
  deleteObjects = function(layer, array) {
    var pos;
    pos = array.indexOf(layer);
    array.splice(pos, 1);
    return layer.destroy();
  };

  /* Calculate the square root of the ball and target positions to determine whether a collision has occured. Animate after impact */
  collisionDetection = function(target, ball) {
    var distance, dx, dy;
    dx = (target.x + target.width) - (ball.x + ball.width);
    dy = (target.y + target.width) - (ball.y + ball.width);
    distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < width) {
      target.animateStop();
      if (target.name === "activeBullet") {
        checkActiveBullet();
      }
      if (ball.name === "ball") {
        animateBallEnd(ball);
      }
      animateTargetEnd(target, activeTargets);
      return pushArray(target, hits);
    }
  };

  /* After a collision has occured or the ball is beyond its contraints, animate, destroy and then set the next ball to active */
  animateBallEnd = Utils.throttle(1, function(ball) {
    var shrinkBall;
    setActiveBall(balls[balls.indexOf(ball) + 1]);
    shrinkBall = ball.animate({
      time: .5,
      properties: {
        scale: 0
      }
    });
    return shrinkBall.on(Events.AnimationEnd, function() {
      return deleteObjects(ball, balls);
    });
  });

  /* After a collision has occured between the ball and target, animate the target before destroying it */
  animateTargetEnd = function(target, array) {
    var shrinkTarget;
    target.animateStop();
    shrinkTarget = target.animate({
      time: .2,
      properties: {
        scale: 1.5,
        opacity: 0
      }
    });
    return shrinkTarget.on(Events.AnimationEnd, function() {
      return deleteObjects(target, array);
    });
  };

  /* If a collision between a ball and the bullet has occured, change the style of the corresponding ball and enable flag for bullet blast */
  checkActiveBullet = function() {
    flag = true;
    if (balls.length > 1) {
      return balls[1].props = {
        backgroundColor: "#F55F6E"
      };
    }
  };

  /* Transform one of the targets into a bullet to enable the bullet blast */
  activateBulletBall = _.debounce((function() {
    return activeTargets[4].props = {
      borderRadius: "50%",
      borderWidth: 10,
      borderColor: "white",
      backgroundColor: "#F55F6E",
      brightness: 100,
      name: "activeBullet"
    };
  }), 5000, true);
  startGame = function(timerHeading, levelHeading, mSpeed, mBalls, mTargets, mLimit) {
    var ball, colIndex, k, l, m, ref, ref1, rowIndex, target;
    for (rowIndex = k = 0, ref = mTargets; 0 <= ref ? k < ref : k > ref; rowIndex = 0 <= ref ? ++k : --k) {
      for (colIndex = l = 0; l < 5; colIndex = ++l) {
        target = new Layer({
          width: width,
          height: height,
          borderRadius: "50%",
          backgroundColor: Utils.randomColor(),
          scale: Utils.randomNumber(.2, 1),
          x: colIndex * (width + gutter) + gutter / 2,
          y: -height,
          brightness: 150
        });
        pushArray(target, allTargets);
        target.animate({
          curve: "ease",
          time: Utils.randomNumber(mSpeed, mSpeed / 2),
          delay: Utils.randomNumber(1, 10),
          properties: {
            y: rowIndex * (height + gutter) + Screen.height
          }
        });
        target.on("change:point", function() {
          var ball, bullet, layer, len, len1, len2, m, n, o, ref1, totalScore;
          timerHeading.html = hits.length;
          totalScore = hits.length + misses.length;

          /* Listen to objects for collisions and push targets into array when target is visible on screen */
          if (activeTargets.length > 5) {
            activateBulletBall();
          }
          for (m = 0, len = balls.length; m < len; m++) {
            ball = balls[m];
            collisionDetection(this, ball);
          }
          if (bullets.length > 0) {
            for (n = 0, len1 = bullets.length; n < len1; n++) {
              bullet = bullets[n];
              collisionDetection(this, bullet);
            }
          }
          if (this.maxY > 0) {
            pushArray(this, activeTargets);
          }
          if (this.maxY > Screen.height - 500) {
            pushArray(this, misses, animateTargetEnd(this, activeTargets));
          }

          /* End the game if the target score has been reached, pass the score to be displayed and reset the game */
          if (totalScore >= mLimit - 1) {
            ui.sumResults(hits.length, [hits.length, mLimit], [balls.length, mBalls], ui.checkLevel, chartBg.width - 100);
            ref1 = [timerHeading, levelHeading];
            for (o = 0, len2 = ref1.length; o < len2; o++) {
              layer = ref1[o];
              layer.states["switch"]("slideOut");
            }
            Utils.delay(.5, function() {
              return ui.endState(timerHeading, levelHeading);
            });
            return resetGame();
          }
        });
      }
    }
    for (i = m = 0, ref1 = mBalls; 0 <= ref1 ? m < ref1 : m > ref1; i = 0 <= ref1 ? ++m : --m) {
      ball = new Layer({
        x: Screen.width - 100,
        y: Screen.height - 200,
        backgroundColor: null,
        borderWidth: 10,
        borderColor: "white",
        name: "ball",
        borderRadius: "50%",
        opacity: 0,
        scale: 0
      });
      pushArray(ball, balls);
      ball.animate({
        curve: "spring(100,15,0)",
        delay: i * .1,
        properties: {
          midX: i * 150 + bg.midX,
          opacity: (5 - i) / 5,
          scale: (5 - i) / 5

          /* Delete ball after 1 second after drag start. If activeBullet is set then enable the bulletActive flag for .5 seconds only */
        }
      });
      ball.on(Events.DragStart, function() {
        Utils.delay(1, (function(_this) {
          return function() {
            return animateBallEnd(_this);
          };
        })(this));
        if (flag) {
          interval = Utils.interval(.5, (function(_this) {
            return function() {
              bulletActive = true;
              return _this.props = {
                backgroundColor: "#78D17B",
                scale: 1.5
              };
            };
          })(this));
          return flag = false;
        }
      });

      /* If the user releases the ball before .5 seconds and the bulletActive is still on, then generate the bullet blast */
      ball.on(Events.DragEnd, function() {
        var bullet, n, ref2, results;
        clearInterval(interval);
        this.ignoreEvents = true;
        if (bulletActive && this.backgroundColor === "#78D17B") {
          bulletActive = false;
          results = [];
          for (i = n = 0, ref2 = Math.ceil(activeTargets.length / 2); 0 <= ref2 ? n < ref2 : n > ref2; i = 0 <= ref2 ? ++n : --n) {
            bullet = new Layer({
              borderRadius: "50%",
              borderColor: activeTargets[i].backgroundColor,
              backgroundColor: null,
              borderWidth: 10,
              name: "bullet",
              x: this.x,
              y: this.y
            });
            pushArray(bullet, bullets);
            bullet.animate({
              delay: i * .1,
              properties: {
                x: activeTargets[i].x,
                y: activeTargets[i].y
              }
            });
            results.push(bullet.on(Events.AnimationEnd, function() {
              return animateTargetEnd(this, bullets);
            }));
          }
          return results;
        }
      });
    }
    return setActiveBall(balls[0]);
  };
  return {
    startGame: startGame,
    deleteObjects: deleteObjects
  };
})();
