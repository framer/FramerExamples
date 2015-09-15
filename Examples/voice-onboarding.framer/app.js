/* Made with Framer
By Noah Levin & Michael Oh
www.framerjs.com */

/* Setup */
var Circle, CircleSmall, MaterialCurve, MaterialTime, delayedElements, el, elements, i, isHome, j, k, layerGroupName, len, len1, len2, ref, ref1, sketch;

sketch = Framer.Importer.load("imported/VoiceOnboarding");

/* Shortcut Layer Names from sketch["myLayer"] -> sketch */

for (layerGroupName in sketch) {
  window[layerGroupName] = sketch[layerGroupName];

  /* Store original position of all elements from PSD/Sketch file */
  sketch[layerGroupName].originalFrame = window[layerGroupName].frame;
}

/* The blue circle that will animate to become the background
Uses scale instead of width to avoid pixelation */

Circle = new Layer({
  width: 1200,
  height: 1200,
  backgroundColor: '#01A9F4',
  y: -184,
  x: -178,
  scale: 0.125
});

Circle.style = {
  borderRadius: "50%"
};

Circle.superLayer = Tout;

/* This circle is to mask the aliasing from the scaled circle */

CircleSmall = new Layer({
  width: 152,
  height: 152,
  y: 24,
  x: 31,
  opacity: 0,
  backgroundColor: '#01A9F4'
});

CircleSmall.style = {
  borderRadius: "50%"
};

CircleSmall.superLayer = Tout;

/* Track all elements being animated to save time later on */

elements = [LogoWhite, Logo, SearchBox, Top, WhiteBg, Mic, Header, Body, GetStarted, BigMic, VoiceGirl, LightCircle, Circle, Divider, ToutText, CircleSmall];

/* Track all elements with stagger animation specifically */

delayedElements = [BigMic, LightCircle, Body, Header, Divider, GetStarted];

/* Hide blue background from the sketch file */

BlueBg.opacity = 0;

/* Animation Timing */

MaterialCurve = "cubic-bezier(0.2, 0.0, 0.2, 1)";

MaterialTime = "0.6";

/* The curve above is eyeballed to fit this particular case.
The recommended material curves from google.com/design/spec are:
	MaterialCurveFastOutSlowIn = "cubic-bezier(0.4, 0.0, 0.2, 1)"
	MaterialCurveLinearOutSlowIn = "cubic-bezier(0.0, 0.0, 0.2, 1)"
	MaterialCurveFastOutLinearIn = "cubic-bezier(0.4, 0.0, 1, 1)"
	MaterialCurveSpringSimulation = "spring(260,30,0,0.01)" */

Framer.Defaults.Animation = {
  curve: MaterialCurve,
  time: MaterialTime
};

/* States */

ref = [SearchBox, Top, Mic, Logo];
for (i = 0, len = ref.length; i < len; i++) {
  el = ref[i];
  el.states.add({
    "Home": {
      opacity: 1,
      y: el.originalFrame.y
    },
    "Onboard": {
      opacity: 0,
      y: el.originalFrame.y - 20
    }
  });
}

LogoWhite.states.add({
  "Home": {
    opacity: 0
  },
  "Onboard": {
    opacity: 1
  }
});

LightCircle.states.add({
  "Home": {
    scale: 0,
    y: LightCircle.originalFrame.y + 350
  },
  "Onboard": {
    scale: 1,
    y: LightCircle.originalFrame.y
  }
});

VoiceGirl.states.add({
  "Home": {
    scale: 0.38,
    y: 1062,
    x: -8,
    originX: -.5,
    originY: -.5
  },
  "Onboard": {
    scale: 1,
    y: VoiceGirl.originalFrame.y,
    x: VoiceGirl.originalFrame.x,
    originX: 0.5,
    originY: 0.5
  }
});

WhiteBg.states.add({
  "Home": {
    height: ToutBg.height,
    y: 640
  },
  "Onboard": {
    height: WhiteBg.originalFrame.height,
    y: WhiteBg.originalFrame.y,
    opacity: 1
  }
});

BigMic.states.add({
  "Home": {
    y: BigMic.originalFrame.y + 200,
    opacity: 0,
    scale: 0.8
  },
  "Onboard": {
    y: BigMic.originalFrame.y,
    opacity: 1,
    scale: 1
  }
});

Circle.states.add({
  "Home": {
    y: -184,
    x: -178,
    scale: 0.125,
    originX: 0.2,
    originY: 0.2
  },
  "Onboard": {
    y: -1360,
    x: -220,
    scale: 1,
    originX: 0.5,
    originY: 0.5
  }
});

Divider.states.add({
  "Home": {
    y: Divider.originalFrame.y + 600
  },
  "Onboard": {
    y: Divider.originalFrame.y
  }
});

ToutText.states.add({
  "Home": {
    opacity: 1
  },
  "Onboard": {
    opacity: 0
  }
});

CircleSmall.states.add({
  "Home": {
    opacity: 1
  },
  "Onboard": {
    opacity: 0
  }
});

ref1 = [Header, Body, GetStarted];
for (j = 0, len1 = ref1.length; j < len1; j++) {
  el = ref1[j];
  el.states.add({
    "Home": {
      y: el.originalFrame.y + 600
    },
    "Onboard": {
      y: el.originalFrame.y
    }
  });
}

/* Start the app from the Home Position */

for (k = 0, len2 = elements.length; k < len2; k++) {
  el = elements[k];
  el.states.switchInstant(["Home"]);
}

/* Click Events */

isHome = true;

VoiceOnboarding.on(Events.TouchStart, function() {
  var l, len3, len4, len5, len6, m, n, o, ref2;
  if (isHome) {

    /* Stagger animations using delays, with some custom timings as needed */
    Header.states.animationOptions = {
      curve: MaterialCurve,
      time: MaterialTime,
      delay: "0.06"
    };
    Body.states.animationOptions = {
      curve: MaterialCurve,
      time: MaterialTime,
      delay: "0.105"
    };
    BigMic.states.animationOptions = {
      curve: MaterialCurve,
      time: MaterialTime - "0.1",
      delay: "0.12"
    };
    LightCircle.states.animationOptions = {
      curve: MaterialCurve,
      time: MaterialTime - "0.12",
      delay: "0.13"
    };
    ref2 = [Divider, GetStarted];
    for (l = 0, len3 = ref2.length; l < len3; l++) {
      el = ref2[l];
      el.states.animationOptions = {
        curve: MaterialCurve,
        time: MaterialTime,
        delay: "0.14"
      };
    }
    CircleSmall.states.animationOptions = {
      time: "0",
      delay: "0"
    };
    for (m = 0, len4 = elements.length; m < len4; m++) {
      el = elements[m];
      el.states["switch"](["Onboard"]);
    }
    return isHome = false;
  } else {

    /* Don't stagger during the delayed animation */
    for (n = 0, len5 = delayedElements.length; n < len5; n++) {
      el = delayedElements[n];
      el.states.animationOptions = {
        delay: "0",
        curve: "ease-out",
        time: 0.1
      };
    }

    /* Bring back in the aliasing cover up */
    CircleSmall.states.animationOptions = {
      time: "0",
      delay: "0.5"
    };
    for (o = 0, len6 = elements.length; o < len6; o++) {
      el = elements[o];
      el.states["switch"](["Home"]);
    }
    return isHome = true;
  }
});
