var AudioLayer, CanvasLayer, actionbar, albumArts, bg, btnnext, btnprev, btnshuffle, colorThief, container, control, controller, currentindex, fabbtn, icnpause, icnplay, isplaying, metadata, musiccontrol, myprogress, navand, player, playlist, progressbar, progressbg, progressnob, songtitle, statusbar, thisis, touchripple, updatecolor,
  __hasProp = {}.hasOwnProperty,
  __extends = function(child, parent) { for (var key in parent) { if (__hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; };

CanvasLayer = (function(_super) {
  __extends(CanvasLayer, _super);

  function CanvasLayer(options) {
    CanvasLayer.__super__.constructor.call(this, options);
    this._canvas = document.createElement("canvas");
    this._canvas.setAttribute("width", this.width);
    this._canvas.setAttribute("height", this.height);
    this._element.appendChild(this._canvas);
    this._ctx = this._canvas.getContext("2d");
    this._ctx.webkitImageSmoothingEnabled = false;
  }

  CanvasLayer.define("pixelate", {
    get: function() {
      return this._pixelate || 1;
    },
    set: function(value) {
      var h, w;
      this._pixelate = value;
      if (!this._canvasLoadedImage) {
        return;
      }
      w = this.width * value;
      h = this.height * value;
      this._ctx.drawImage(this._canvasLoadedImage, 0, 0, w, h);
      return this._ctx.drawImage(this._canvas, 0, 0, w, h, 0, 0, this.width, this.height);
    }
  });

  CanvasLayer.define("canvasImage", {
    get: function() {
      return this._canvasImage;
    },
    set: function(value) {
      this._canvasImage = value;
      this._image = new Image;
      this._image.src = value;
      return this._image.onload = (function(_this) {
        return function() {
          _this._canvasLoadedImage = _this._image;
          _this._ctx.drawImage(_this._canvasLoadedImage, 0, 0, _this.width, _this.height);
          return updatecolor(currentindex);
        };
      })(this);
    }
  });

  CanvasLayer.define("sourceImage", {
    get: function() {
      return this._canvasLoadedImage;
    }
  });

  return CanvasLayer;

})(Layer);

/* Audiolayer is simple tweak of videolayer by Koen Bok. */

AudioLayer = (function(_super) {
  __extends(AudioLayer, _super);

  function AudioLayer(options) {
    if (options == null) {
      options = {};
    }
    AudioLayer.__super__.constructor.call(this, options);
    this.player = document.createElement("audio");
    this.player.style.width = "100%";
    this.player.style.height = "100%";
    this.player.on = this.player.addEventListener;
    this.player.off = this.player.removeEventListener;
    this.audio = options.audio;
    this._element.appendChild(this.player);
  }

  AudioLayer.define("audio", {
    get: function() {
      return this.audio.src;
    },
    set: function(audio) {
      return this.player.src = audio;
    }
  });

  return AudioLayer;

})(Layer);

colorThief = new ColorThief();

bg = new BackgroundLayer;

currentindex = 0;

albumArts = ["images/albumArt1.jpg", "images/albumArt2.jpg", "images/albumArt3.jpg", "images/albumArt4.jpg", "images/albumArt5.jpg"];

songtitle = ["<h2>SuperModel</h2><br><p>Foster The People</p>", "<h2>Halcyon Days</h2><br><p>Ellie Goulding</p>", "<h2>In a Perfect World</h2><br><p>Kodaline</p>", "<h2>No Fear</h2><br><p>Common</p>", "<h2>Lights and Camera</h2><br><p>Yuna</p>"];

container = new Layer({
  x: 0,
  y: 0,
  width: 360,
  height: 640,
  backgroundColor: 'transparent',
  shadowY: 4,
  shadowBlur: 15,
  shadowColor: 'rgba(0,0,0,0.5)'
});

thisis = new Layer({
  x: 0,
  y: 0,
  width: 360,
  height: 640,
  backgroundColor: ''
});

player = new CanvasLayer({
  x: 0,
  y: 0,
  width: 360,
  height: 360
});

player.canvasImage = albumArts[currentindex];

bg.addSubLayer(container);

container.center();

container.addSubLayer(thisis);

container.addSubLayer(player);

musiccontrol = new AudioLayer({
  width: 0,
  height: 0,
  audio: "audio/music.mp3"
});

progressbg = new Layer({
  x: 0,
  y: 520,
  width: 360,
  height: 4,
  backgroundColor: 'rgba(0,0,0,0.2)'
});

progressbar = new Layer({
  x: 0,
  y: 520,
  width: 0,
  height: 4
});

metadata = new Layer({
  x: 0,
  y: player.y + player.height,
  width: 360,
  height: 160
});

progressnob = new Layer({
  x: 0,
  y: progressbg.y,
  width: 40,
  height: 30,
  backgroundColor: 'transparent'
});

metadata.html = songtitle[currentindex];

metadata.style = {
  fontFamily: 'Roboto',
  fontSize: '16px',
  color: '#fff',
  padding: '30px 0px 0px 15px',
  lineHeight: '0.8',
  fontWeight: '400'
};

playlist = new Layer({
  x: 0,
  y: progressbar.y + progressbar.height,
  width: 360,
  height: 100,
  backgroundColor: '#fff'
});

playlist.html = "Up Next";

playlist.style = {
  fontFamily: 'Roboto',
  fontSize: '13px',
  color: '#aaa',
  padding: '20px 0px 0px 15px',
  lineHeight: '0.8',
  fontWeight: '400'
};

fabbtn = new Layer({
  x: 0,
  y: 0,
  width: 65,
  height: 65,
  borderRadius: '40px',
  backgroundColor: '#f0f0f0',
  shadowY: 4,
  shadowBlur: 15,
  shadowColor: 'rgba(0,0,0,0.5)'
});

btnshuffle = new Layer({
  x: 0,
  y: 0,
  width: 20,
  height: 21,
  image: 'images/btnshuffle.png'
});

fabbtn.addSubLayer(btnshuffle);

btnshuffle.centerX();

btnshuffle.centerY();

controller = new Layer({
  x: 0,
  width: 360,
  height: 54,
  backgroundColor: 'rgba(0,0,0,0.3)'
});

icnpause = new Layer({
  x: 0,
  y: 0,
  width: 48,
  height: 48,
  image: "images/icnpause.png"
});

icnplay = new Layer({
  x: 0,
  y: 0,
  width: 48,
  height: 48,
  image: "images/icnplay.png"
});

control = new Layer({
  x: 0,
  y: 0,
  width: 48,
  height: 48,
  backgroundColor: 'transparent'
});

btnnext = new Layer({
  x: 0,
  y: 0,
  width: 48,
  height: 48,
  image: "images/icnnext.png"
});

btnprev = new Layer({
  x: 0,
  y: 0,
  width: 48,
  height: 48,
  image: "images/icnprev.png"
});

icnpause.opacity = 0;

icnpause.scale = 0;

container.addSubLayer(progressnob);

container.addSubLayer(progressbg);

container.addSubLayer(progressbar);

container.addSubLayer(metadata);

container.addSubLayer(playlist);

controller.addSubLayer(control);

controller.addSubLayer(icnpause);

controller.addSubLayer(icnplay);

controller.addSubLayer(btnnext);

controller.addSubLayer(btnprev);

container.addSubLayer(controller);

btnprev.centerY();

btnnext.centerY();

btnnext.x = 260;

btnprev.x = 51;

control.center();

icnpause.center();

icnplay.center();

controller.y = metadata.y + metadata.height - 54;

isplaying = false;

updatecolor = function(e) {
  var colorfiv, colorfor, colorone, colorthr, colortwo, palette;
  player.opacity = 0.5;
  player.animate({
    properties: {
      opacity: 1
    },
    curve: 'spring(100,12,0)'
  });
  palette = colorThief.getPalette(player.sourceImage, 20);
  colorone = palette[0];
  colortwo = palette[12];
  colorthr = palette[3];
  colorfor = palette[12];
  colorfiv = palette[2];
  if (colorthr[0] + colorthr[1] + colorthr[2] > 500) {
    metadata.style = {
      color: '#000'
    };
  } else {
    metadata.style = {
      color: '#fff'
    };
  }
  metadata.opacity = 0.5;
  metadata.animate({
    properties: {
      opacity: 1
    },
    curve: 'ease',
    time: 0.6
  });
  bg.backgroundColor = 'rgb(' + colorfiv[0] + ',' + colorfiv[1] + ',' + colorfiv[2] + ')';
  thisis.backgroundColor = 'rgb(' + colorone[0] + ',' + colorone[1] + ',' + colorone[2] + ')';
  progressbar.backgroundColor = 'rgb(' + colortwo[0] + ',' + colortwo[1] + ',' + colortwo[2] + ')';
  metadata.backgroundColor = 'rgb(' + colorthr[0] + ',' + colorthr[1] + ',' + colorthr[2] + ')';
  return fabbtn.backgroundColor = 'rgb(' + colorfor[0] + ',' + colorfor[1] + ',' + colorfor[2] + ')';
};

musiccontrol.player.on("timeupdate", function() {
  var progress;
  progress = musiccontrol.player.currentTime / musiccontrol.player.duration;
  progressnob.x = progress * 640;
  return progressbar.width = progressnob.x + progressnob.width;
});

progressnob.draggable.enabled = true;

progressnob.draggable.speedY = 0;

progressnob.on(Events.DragStart, function() {

  /* musiccontrol.player.pause() */
  musiccontrol.player.load();
  return progressbar.width = Math.round(progressnob.x + progressnob.width);
});

myprogress = 0;

progressnob.on(Events.DragMove, function() {
  myprogress = progressnob.x;
  progressbar.width = Math.round(myprogress + progressnob.width);
  return progressbar.width = Math.round(myprogress.x + progressnob.width);
});

progressnob.on(Events.DragEnd, function() {
  var newpositon;
  newpositon = progressnob.x / 640 * musiccontrol.player.duration;
  musiccontrol.player.currentTime = newpositon;

  /* musiccontrol.player.play() */
  return progressbar.animate({
    properties: {
      width: Math.round(progressnob.x + progressnob.width)
    },
    curve: 'spring(100,12,0)'
  }, icnpause.animate({
    properties: {
      scale: 1,
      opacity: 1
    },
    curve: 'spring(200,12,0)'
  }), icnplay.animate({
    properties: {
      scale: 0,
      opacity: 0
    },
    curve: 'spring(100,12,0)'
  }));
});

btnprev.on(Events.Click, function() {
  btnprev.scale = 0.8;
  btnprev.animate({
    properties: {
      scale: 1
    },
    curve: 'spring(100,12,0)'
  });
  if (currentindex > 0) {
    currentindex = currentindex - 1;
  } else {
    currentindex = 0;
  }
  player.canvasImage = albumArts[currentindex];
  metadata.html = songtitle[currentindex];
  progressnob.animate({
    properties: {
      x: 0
    },
    curve: 'spring(100,12,0)'
  });
  return progressbar.animate({
    properties: {
      width: 0
    },
    curve: 'spring(100,12,0)'
  });
});

btnnext.on(Events.Click, function() {
  btnnext.scale = 0.8;
  btnnext.animate({
    properties: {
      scale: 1
    },
    curve: 'spring(100,12,0)'
  });
  if (currentindex >= 4) {
    currentindex = 4;
  } else {
    currentindex++;
  }
  player.canvasImage = albumArts[currentindex];
  return metadata.html = songtitle[currentindex];
});

control.on(Events.TouchStart, function() {
  if (isplaying === true) {

    /* musiccontrol.player.pause() */
    icnpause.animate({
      properties: {
        scale: 0,
        opacity: 0
      },
      curve: 'spring(200,12,0)'
    });
    icnplay.animate({
      properties: {
        scale: 1,
        opacity: 1
      },
      curve: 'spring(100,12,0)'
    });
    return isplaying = false;
  } else {

    /* musiccontrol.player.play() */
    icnpause.animate({
      properties: {
        scale: 1,
        opacity: 1
      },
      curve: 'spring(100,12,0)'
    });
    icnplay.animate({
      properties: {
        scale: 0,
        opacity: 0
      },
      curve: 'spring(200,12,0)'
    });
    return isplaying = true;
  }
});

statusbar = new Layer({
  x: 0,
  y: 0,
  width: 360,
  height: 23,
  image: "images/statusbar.png"
});

navand = new Layer({
  x: 0,
  y: 0,
  width: 360,
  height: 48,
  image: "images/navbar-and.png"
});

touchripple = new Layer({
  x: 0,
  y: 0,
  width: 65,
  height: 65,
  backgroundColor: 'rgba(255,255,255,0.5)',
  borderRadius: '40px',
  opacity: 0
});

fabbtn.addSubLayer(touchripple);

fabbtn.clip = true;

fabbtn.on(Events.Click, function() {
  var shufflenumber;
  shufflenumber = Math.floor(Math.random() * (1 + 4 - 1)) + 1;
  currentindex = shufflenumber;
  player.canvasImage = albumArts[shufflenumber];
  metadata.html = songtitle[shufflenumber];
  touchripple.opacity = 1;
  touchripple.scale = 0;
  touchripple.animate({
    properties: {
      scale: 1,
      opacity: 0
    },
    curve: 'ease',
    time: 0.2
  });
  btnshuffle.rotation = 180;
  btnshuffle.animate({
    properties: {
      rotation: 0
    },
    curve: 'spring(100,12,0)'
  });
  fabbtn.shadowY = 2;
  fabbtn.shadowBlur = 8;
  fabbtn.shadowColor = 'rgba(0,0,0,0.3)';
  fabbtn.scale = 0.95;
  Utils.delay(0.3, function() {
    return fabbtn.shadowColor = 'rgba(0,0,0,0.5)';
  });
  return fabbtn.animate({
    properties: {
      scale: 1,
      shadowY: 4,
      shadowBlur: 15
    },
    curve: 'spring(100,12,0)'
  });
});

actionbar = new Layer({
  x: 15,
  y: 40,
  width: 161,
  height: 20,
  image: "images/nowplaying.png"
});

container.addSubLayer(statusbar);

container.addSubLayer(navand);

container.addSubLayer(actionbar);

container.addSubLayer(fabbtn);

fabbtn.y = 334;

fabbtn.x = 288;

navand.y = 592;
