/* Made with Framer
by Benjamin den Boer
www.framerjs.com */

/* Set-up & Sketch Import */
var allAvatars, allImages, allLabels, allLetters, allNames, avatar, contacts, i, indicator, j, k, l, label, len, len1, letter, name, nameLayer, nearest, people, ref, ref1, round, scroll, showSections, sketch, slider;

sketch = Framer.Importer.load("imported/contacts");

Framer.Device.background.backgroundColor = "#F3F9FF";

new BackgroundLayer({
  backgroundColor: "#fff"

  /* Create ScrollComponent */
});

scroll = ScrollComponent.wrap(sketch.content);

scroll.scrollHorizontal = false;

scroll.contentInset = {
  bottom: 320
};

/* Require the module */

contacts = require("contacts");

/* Store arrays in variables */

allNames = [];

allLetters = [];

allImages = [];

allLabels = [];

allAvatars = [];

/* Concatenate & store the names and images
Push the letters to the array */

ref = contacts.people;
for (letter in ref) {
  people = ref[letter];
  allNames = allNames.concat(people.names);
  allImages = allImages.concat(people.images);
  allLetters.push(letter);
}

/* Create the labels of the scroller */

for (i = j = 0, len = allLetters.length; j < len; i = ++j) {
  letter = allLetters[i];
  label = new Layer({
    x: 80,
    y: 72 + (720 * i),
    height: 120,
    backgroundColor: "transparent",
    superLayer: scroll.content
  });
  label.style = {
    "font": "400 72px/1 Roboto, Helvetica Neue",
    "line-height": (label.height / 2) + "px",
    "color": "#EF4481"
  };
  label.html = letter;
  label.position = label.y;
  allLabels.push(label);
}

/* All names */

for (i = k = 0, len1 = allNames.length; k < len1; i = ++k) {
  name = allNames[i];
  nameLayer = new Layer({
    x: 340,
    y: 64 + (168 * i),
    width: 540,
    backgroundColor: "#fff",
    superLayer: scroll.content,
    clip: false
  });
  nameLayer.html = name;
  nameLayer.style = {
    "font": "400 48px/0.75 Roboto, Helvetica Neue",
    "-webkit-font-smoothing": "antialiased",
    "color": "#666",
    "padding": "24px"
  };

  /* Avatar images */
  avatar = new Layer({
    x: -148,
    y: -100 + 20,
    width: 120,
    height: 120,
    borderRadius: 120,
    backgroundColor: "#BDBDBD",
    superLayer: nameLayer
  });

  /* Spacing per group */
  if (i >= 4 && i < 8) {
    nameLayer.y += 48;
  }
  if (i >= 8 && i < 12) {
    nameLayer.y += 48 * 2;
  }
  if (i >= 12 && i < 16) {
    nameLayer.y += 48 * 3;
  }
  if (i >= 16 && i < 20) {
    nameLayer.y += 48 * 4;
  }
  if (i >= 20 && i < 24) {
    nameLayer.y += 48 * 5;
  }
  if (i >= 24 && i < 28) {
    nameLayer.y += 48 * 6;
  }
  allAvatars.push(avatar);
}

/* Match the avatar with the name */

for (i = l = 0, ref1 = allNames.length; 0 <= ref1 ? l < ref1 : l > ref1; i = 0 <= ref1 ? ++l : --l) {
  if (allImages[i] != null) {
    allAvatars[i].image = allImages[i];
  }
}

/* Set-up the scroller */

slider = new SliderComponent({
  width: 96,
  height: 1200,
  x: Screen.width - 96,
  y: 400,
  min: 0,
  max: 100,
  value: 0,
  backgroundColor: "#fff",
  clip: false
});

slider.style.boxShadow = "inset 0 0 0 20px #fff";

slider.fill.backgroundColor = "transparent";

slider.knob.draggable.momentum = false;

/* Style the knob of the slider */

slider.knob.props = {
  width: 10,
  height: 180,
  backgroundColor: "#666",
  borderRadius: 50,
  clip: false
};

/* Indicator of scrollbar */

indicator = new Layer({
  width: 240,
  height: 240,
  image: "images/indicator.png",
  superLayer: slider.knob,
  x: slider.knob.x - 320,
  y: slider.knob.y - 120,
  scale: 0
});

/* Style the value */

indicator.style = {
  "color": "#fff",
  "font": "400 120px/" + indicator.height + "px Roboto",
  "text-align": "center"
};

indicator.html = "A";

/* Set origin to animate from the bottom-right corner */

indicator.originY = indicator.originX = 1;

/* States */

indicator.states.add({
  hide: {
    scale: 0,
    opacity: 0
  },
  show: {
    scale: 1,
    opacity: 1
  }
});

indicator.states.animationOptions = {
  curve: "spring(600,40,0)"

  /* Visualize the letters */
};

slider.knob.on(Events.DragStart, function() {
  this.backgroundColor = "#3E50B4";
  this.subLayers[0].states["switch"]("show");
  if (slider.knob.y < 0) {
    return indicator.y = -slider.knob.y - 150;
  }
});

slider.knob.on(Events.DragEnd, function() {
  this.backgroundColor = "#666";
  return this.subLayers[0].states["switch"]("hide");
});

/* Round numbers to a set amount */

round = function(number, nearest) {
  return Math.round(number / nearest) * nearest;
};

nearest = 720;

showSections = function() {

  /* Sections by letter */
  if (scroll.scrollY >= 0) {
    indicator.html = "A";
  }
  if (scroll.scrollY >= nearest) {
    indicator.html = "B";
  }
  if (scroll.scrollY >= nearest * 2) {
    indicator.html = "C";
  }
  if (scroll.scrollY >= nearest * 3) {
    indicator.html = "D";
  }
  if (scroll.scrollY >= nearest * 4) {
    indicator.html = "E";
  }

  /* When scrolled to bottom */
  if (slider.value > 92) {
    indicator.html = "F";
  }
  if (slider.value > 97) {
    return indicator.html = "G";
  }
};

/* Connect scrolling to the slider */

slider.on("change:value", function() {

  /* Scroll to the correct sections */
  var scrollValue;
  scrollValue = Utils.modulate(this.value, [0, 100], [0, scroll.content.height - scroll.height + 320], true);
  scroll.scrollY = round(scrollValue, nearest);
  showSections();

  /* When sliding all the way to the top */
  if (slider.knob.y < 0) {
    return indicator.y = -slider.knob.y - 150;
  } else {
    return indicator.y = -150;
  }
});

/* Connect the slider to the scroll event */

scroll.on(Events.Move, function() {
  slider.value = slider.valueForPoint(scroll.scrollY / 3);
  return showSections();
});

/* Sticky Labels */

scroll.content.on("change:y", function() {
  var len2, m, results, scrollY;
  scrollY = scroll.scrollY;
  results = [];
  for (m = 0, len2 = allLabels.length; m < len2; m++) {
    label = allLabels[m];
    if (scrollY > label.position - 72) {
      label.y = label.position + scrollY;
      if (scrollY > label.position + (495 - 72)) {
        results.push(label.y = label.position + 495);
      } else {
        results.push(label.y = label.position + (scrollY - label.position + 72));
      }
    } else {
      results.push(label.y = label.position);
    }
  }
  return results;
});
