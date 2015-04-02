/* Made with Framer
by Francis Cortez
www.framerjs.com */

/* Learn more about this prototype:
http://franciscortez.com/framer-layered-animation/ */
var PSD, controls, prepDot, resetStates, setVerticalOffset, setupScaleAnimation, setupVertical, setupVertical2, verticalOffset;

PSD = Framer.Importer.load("imported/dots");

/* Add original frame information to each layer */

tools.storeOriginal(PSD);

PSD.dotActive.states.animationOptions = {
  curve: "bezier-curve",
  curveOptions: "ease-in-out",
  time: 1
};

resetStates = function() {
  return PSD.dotActive.states.add({
    dot1: {
      x: PSD.dot1.x,
      y: PSD.dot1.y
    },
    dot2: {
      x: PSD.dot2.x,
      y: PSD.dot2.y
    },
    dot3: {
      x: PSD.dot3.x,
      y: PSD.dot3.y
    }
  });
};

prepDot = function(view) {
  view.draggable.enabled = true;
  return view.on(Events.DragMove, resetStates);
};

PSD.gear.style.pointerEvents = "all";

PSD.dotActive.sendToBack();

PSD.dotActive.placeBefore(PSD.background);

PSD.bg.sendToBack();

prepDot(PSD.dot1);

prepDot(PSD.dot2);

prepDot(PSD.dot3);

resetStates();

PSD.dotActive.on(Events.AnimationEnd, function() {
  switch (PSD.dotActive.states.current) {
    case "dot3":
      return PSD.dotActive.states["switch"]("dot1");
    case "dot1":
      return PSD.dotActive.states["switch"]("dot2");
    default:
      return PSD.dotActive.states["switch"]("dot3");
  }
});

PSD.dotActive.states["switch"]("dot1");

/* Enable dragging & disable horizontal dragging */

PSD.distancedot1.draggable.enabled = true;

PSD.distancedot1.draggable.speedX = 0;

PSD.distancedot2.draggable.enabled = true;

PSD.distancedot2.draggable.speedX = 0;

verticalOffset = PSD.distancedot1.y - PSD.distancedot2.y;

setVerticalOffset = function() {
  verticalOffset = PSD.distancedot1.y - PSD.distancedot2.y;
  PSD.dotInside.states.add({
    top: {
      y: PSD.dotInside.originalFrame.y + verticalOffset
    },
    bottom: {
      y: PSD.dotInside.originalFrame.y - verticalOffset
    }
  });
  return PSD.distancedotbackforth.states.add({
    top: {
      y: PSD.distancedot2.y
    },
    bottom: {
      y: PSD.distancedot1.y + 21
    }
  });
};

PSD.distancedot1.on(Events.DragEnd, setVerticalOffset);

PSD.distancedot2.on(Events.DragEnd, setVerticalOffset);

setupVertical = function(view) {
  view.states.add({
    top: {
      y: view.originalFrame.y + verticalOffset
    },
    bottom: {
      y: view.originalFrame.y - verticalOffset
    }
  });
  view.states.animationOptions = {
    curve: "bezier-curve",
    curveOptions: "ease-in-out",
    time: 0.5
  };
  view.on(Events.AnimationEnd, function() {
    if (view.states.current === "top") {
      return view.states["switch"]("bottom");
    } else {
      return view.states["switch"]("top");
    }
  });
  return view.states["switch"]("top");
};

setupVertical(PSD.dotInside);

setupVertical2 = function(view) {
  view.states.add({
    top: {
      y: PSD.distancedot2.y
    },
    bottom: {
      y: PSD.distancedot1.y
    }
  });
  view.states.animationOptions = {
    curve: "bezier-curve",
    curveOptions: "ease-in-out",
    time: 0.5
  };
  view.on(Events.AnimationEnd, function() {
    if (view.states.current === "top") {
      return view.states["switch"]("bottom");
    } else {
      return view.states["switch"]("top");
    }
  });
  return view.states["switch"]("bottom");
};

setupVertical2(PSD.distancedotbackforth);

PSD.dotScale.states.add({
  big: {
    scale: 1.5
  },
  small: {
    scale: 0.5
  }
});

PSD.dotScale.states.animationOptions = {
  curve: 'spring(150,20,0)'
};

PSD.dotScale.on(Events.AnimationEnd, function() {
  if (PSD.dotScale.states.current === "big") {
    return PSD.dotScale.states["switch"]("small");
  } else {
    return PSD.dotScale.states["switch"]("big");
  }
});

PSD.dotScale.states["switch"]("small");

PSD.scalecontrol.states.add({
  big: {
    scale: 1.5
  },
  small: {
    scale: 0.5
  }
});

PSD.scalecontrol.states.animationOptions = {
  curve: 'spring(150,20,0)'
};

(setupScaleAnimation = function() {
  return PSD.scalecontrol.on(Events.AnimationEnd, function() {
    if (PSD.scalecontrol.states.current === "big") {
      return PSD.scalecontrol.states["switch"]("small");
    } else {
      return PSD.scalecontrol.states["switch"]("big");
    }
  });
})();

PSD.scalecontrol.states["switch"]("small");

PSD.plus.on(Events.TouchEnd, function() {
  PSD.dotScale.states.add({
    big: {
      scale: PSD.scalecontrol.states._states.big.scale + 0.1
    }
  });
  PSD.scalecontrol.states.add({
    big: {
      scale: PSD.scalecontrol.states._states.big.scale + 0.1
    }
  });
  PSD.dotScale.animateStop();
  PSD.dotScale.states["switch"]("big");
  PSD.scalecontrol.animateStop();
  return PSD.scalecontrol.states["switch"]("big");
});

PSD.minus.on(Events.TouchEnd, function() {
  PSD.dotScale.states.add({
    big: {
      scale: PSD.scalecontrol.states._states.big.scale + 0.1
    }
  });
  PSD.scalecontrol.states.add({
    big: {
      scale: PSD.scalecontrol.states._states.big.scale - 0.1
    }
  });
  PSD.dotScale.animateStop();
  PSD.dotScale.states["switch"]("big");
  PSD.scalecontrol.animateStop();
  return PSD.scalecontrol.states["switch"]("big");
});

controls = [PSD.minus, PSD.plus, PSD.scalecontrol, PSD.distancedotbackforth, PSD.distancedot2, PSD.distancedot1, PSD.dot3, PSD.dot2, PSD.dot1];

PSD.gear.on(Events.TouchEnd, function() {
  var i, layer, len, results;
  results = [];
  for (i = 0, len = controls.length; i < len; i++) {
    layer = controls[i];
    results.push((function(layer) {
      if (layer.opacity > 0) {
        PSD.gear.opacity = 0.25;
        return layer.opacity = 0;
      } else {
        PSD.gear.opacity = 1;
        return layer.opacity = 1;
      }
    })(layer));
  }
  return results;
});
