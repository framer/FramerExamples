/* Made with Framer
by Kristoffer Lundberg
www.framerjs.com */
var bg, bio, bioReadMore, bioText, i, l, scene1, slideToHome, slidebox, slideshow, slideshowAnimGeneral, slideshowAnimNextSlide, slideshowCurrent, slideshowHeight, slideshowMinDrag, slideshowOverlay, slideshowOverlayBG, slideshowOverlayCountry, slideshowOverlayTxt, slideshowSlideChange, slideshowWidth, slideshowWrap, updateTxt, _i, _ref;

l = Framer.Importer.load("imported/slideshow");

bg = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1136,
  backgroundColor: "#000"
});

scene1 = new Layer({
  x: 0,
  y: 0,
  width: 640,
  height: 1136,
  backgroundColor: "transparent"
});

scene1.states.add({
  inactive: {
    opacity: 0.5,
    scale: 0.85
  }
});

scene1.states.animationOptions = {
  curve: "spring(500, 50, 0)"
};

/* Slideshow functionality */

slideshowWidth = 640;

slideshowHeight = 1136;

slideshowCurrent = 0;

slideshowMinDrag = 100;

slideshowSlideChange = 0.3;

slideshowAnimNextSlide = 'spring(100,10,0)';

slideshowAnimGeneral = 'spring(500, 50, 0)';

slideshow = [
  {
    title: "Leo Tolstoy",
    image: "http://upload.wikimedia.org/wikipedia/commons/4/4d/Tolstoy_1895.jpg",
    country: "Russia",
    bio: "Leo Tolstoy was a Russian novelist, short story writer, philosopher and playwright who primarily wrote novels and short stories. Tolstoy was a master of realistic fiction and is widely considered one of the greatest novelists of all time."
  }, {
    title: "Robert Musil",
    image: "http://images2.corriereobjects.it/gallery/Cultura/2012/11_Novembre/cultura/01/img_01/scri_02_672-458_resize.jpg?v=20121104224530",
    country: "Austria",
    bio: "Robert Musil was an Austrian writer. His unfinished novel The Man Without Qualities (German: Der Mann ohne Eigenschaften) is generally considered to be one of the most important modernist novels. However, the novel has not been widely read both because of its delayed publication and intricate, lengthy plot."
  }, {
    title: "Sylvia Plath",
    image: "http://i.dailymail.co.uk/i/pix/2013/01/19/article-2265000-17051E9F000005DC-349_306x517.jpg",
    country: "America",
    bio: "Sylvia Plath was an American poet, novelist, and short-story writer. Born in Boston, Massachusetts, she studied at Smith College and Newnham College at the University of Cambridge, before receiving acclaim as a poet and writer. Plath suffered from depression for much of her adult life, and in 1963 she committed suicide."
  }
];

slideshowWrap = new Layer({
  x: 0,
  y: 0,
  width: slideshowWidth * slideshow.length,
  height: slideshowHeight,
  superLayer: scene1
});

slideshowWrap.draggable.enabled = true;

slideshowWrap.draggable.speedY = 0;

for (i = _i = 0, _ref = slideshow.length; 0 <= _ref ? _i < _ref : _i > _ref; i = 0 <= _ref ? ++_i : --_i) {
  slidebox = new Layer({
    superLayer: slideshowWrap,
    x: slideshowWidth * i,
    y: 0,
    width: slideshowWidth,
    height: slideshowHeight,
    image: slideshow[i].image
  });
}

updateTxt = function() {
  slideshowOverlayTxt.html = slideshow[slideshowCurrent].title;
  slideshowOverlayCountry.html = slideshow[slideshowCurrent].country;
  bioText.html = slideshow[slideshowCurrent].bio;
  return Utils.delay(1, function() {});
};

slideToHome = function() {
  slideshowCurrent = 0;
  updateTxt();
  return slideshowWrap.animate({
    properties: {
      x: 0
    },
    time: slideshowSlideChange,
    curve: slideshowAnimNextSlide
  });
};

slideshowWrap.on(Events.DragStart, function() {
  return slideshowOverlay.states.next();
});

slideshowWrap.on(Events.DragEnd, function() {
  if (slideshowWrap.x < -((slideshowWidth * slideshowCurrent) + slideshowMinDrag) && slideshowWrap.x > -(slideshowWidth * (slideshowCurrent + 1))) {
    if ((slideshowCurrent + 1) < slideshow.length) {
      slideshowCurrent += 1;
      updateTxt();
      slideshowWrap.animate({
        properties: {
          x: -(slideshowWidth * slideshowCurrent)
        },
        time: slideshowSlideChange,
        curve: slideshowAnimNextSlide
      });
    } else {
      slideshowWrap.animate({
        properties: {
          x: -(slideshowWidth * slideshowCurrent)
        },
        time: slideshowSlideChange,
        curve: slideshowAnimNextSlide
      });
    }
  } else {
    if (slideshowCurrent === 0) {
      slideToHome();
    } else {
      if (slideshowWrap.x > -((slideshowWidth * slideshowCurrent) - slideshowMinDrag)) {
        slideshowWrap.animate({
          properties: {
            x: -(slideshowWidth * (slideshowCurrent - 1))
          },
          time: slideshowSlideChange,
          curve: slideshowAnimNextSlide
        });
        slideshowCurrent -= 1;
        updateTxt();
      } else {
        slideshowWrap.animate({
          properties: {
            x: -(slideshowWidth * slideshowCurrent)
          },
          time: slideshowSlideChange,
          curve: slideshowAnimNextSlide
        });
        updateTxt();
      }
    }
  }
  return Utils.delay(0.1, function() {
    return slideshowOverlay.states.next();
  });
});

slideshowOverlay = new Layer({
  x: 0,
  y: 0,
  superLayer: scene1,
  width: slideshowWidth,
  height: slideshowHeight,
  backgroundColor: "transparent"
});

slideshowOverlay.states.add({
  faded: {
    opacity: 0
  }
});

slideshowOverlay.states.animationOptions = {
  time: 0.2
};

slideshowOverlayBG = new Layer({
  superLayer: slideshowOverlay,
  x: 0,
  y: 0,
  width: slideshowWidth,
  height: slideshowHeight,
  backgroundColor: "#000",
  opacity: 0.5
});

slideshowOverlayCountry = new Layer({
  superLayer: slideshowOverlay,
  x: 0,
  y: (slideshowHeight / 2) + 20,
  width: slideshowWidth,
  height: 26
});

slideshowOverlayCountry.states.add({
  active: {
    y: (slideshowHeight / 2) + 100
  }
});

slideshowOverlayCountry.states.animationOptions = {
  curve: slideshowAnimGeneral
};

slideshowOverlayCountry.html = slideshow[slideshowCurrent].country;

slideshowOverlayCountry.style = {
  fontSize: "22px",
  fontFamily: "Helvetica, Arial",
  fontWeight: "bold",
  textTransform: "uppercase",
  letterSpacing: "4px",
  textAlign: "center",
  paddingTop: "0px",
  paddingLeft: "20px",
  backgroundColor: "transparent"
};

slideshowOverlayTxt = new Layer({
  superLayer: slideshowOverlay,
  x: 0,
  y: (slideshowHeight / 2) - 100,
  width: slideshowWidth
});

slideshowOverlayTxt.html = slideshow[slideshowCurrent].title;

slideshowOverlayTxt.style = {
  fontSize: "90px",
  fontFamily: "'Adobe Garamond Pro', Georgia",
  textAlign: "center",
  paddingTop: "40px",
  paddingLeft: "20px",
  height: "100px",
  backgroundColor: "transparent"
};

slideshowOverlayTxt.states.add({
  active: {
    y: 220
  }
});

slideshowOverlayTxt.states.animationOptions = {
  curve: slideshowAnimGeneral
};

bio = new Layer({
  x: 0,
  y: 1030,
  width: slideshowWidth,
  height: 740,
  backgroundColor: "#000"
});

bio.states.add({
  active: {
    y: 500
  }
});

bio.states.animationOptions = {
  curve: slideshowAnimGeneral
};

bioReadMore = new Layer({
  superLayer: bio,
  x: 0,
  y: 0,
  width: slideshowWidth,
  height: 100,
  backgroundColor: "transparent"
});

bioReadMore.style = {
  fontSize: "22px",
  textTransform: "uppercase",
  letterSpacing: "3px",
  textAlign: "center",
  paddingTop: "43px"
};

bioReadMore.html = "Read more";

bioText = new Layer({
  superLayer: bio,
  x: 0,
  y: 180,
  width: slideshowWidth,
  height: 500,
  backgroundColor: "transparent"
});

bioText.style = {
  fontFamily: "'Adobe Garamond Pro', Georgia",
  fontSize: "34px",
  lineHeight: "40px",
  paddingLeft: "44px",
  paddingRight: "44px"
};

bioText.html = slideshow[slideshowCurrent].bio;

bio.on(Events.Click, function() {
  scene1.states.next();
  bio.states.next();
  slideshowOverlayTxt.states.next();
  return slideshowOverlayCountry.states.next();
});

l.statusbar.superLayer = scene1;
