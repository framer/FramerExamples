/* Made with Framer
by Floris Verloop
www.framerjs.com */
var App, Detail, Navigation, Stream, app, bezier, l, screenH, screenW,
  bind = function(fn, me){ return function(){ return fn.apply(me, arguments); }; },
  extend = function(child, parent) { for (var key in parent) { if (hasProp.call(parent, key)) child[key] = parent[key]; } function ctor() { this.constructor = child; } ctor.prototype = parent.prototype; child.prototype = new ctor(); child.__super__ = parent.prototype; return child; },
  hasProp = {}.hasOwnProperty;

l = Framer.Importer.load("imported/stream");

Framer.Defaults.Animation = {
  curve: "spring(500, 36, 0)"
};

screenW = Framer.Device.screen.width;

screenH = Framer.Device.screen.height;

bezier = "cubic-bezier(0.19, 1, 0.22, 1)";

/* Classes
-------------------- */

App = (function() {
  function App(options) {
    var key;
    this.options = options;
    this.onStreamDragEnd = bind(this.onStreamDragEnd, this);
    this.onStreamDragMove = bind(this.onStreamDragMove, this);
    this.onStreamDragStart = bind(this.onStreamDragStart, this);
    this.onCloseDetail = bind(this.onCloseDetail, this);
    this.onOpenDetail = bind(this.onOpenDetail, this);

    /* Render views and add imported layers to them */
    this.views = {
      stream: new Stream({
        layer: l.Content
      }),
      navigation: new Navigation({
        layer: l.Navigation
      }),
      detail: new Detail({
        layer: l.Detail
      })
    };

    /* Placeholder putting the statusbar on top when opening detail view */
    this.statusbar = new Layer({
      height: 40,
      width: screenW,
      backgroundColor: ""
    });

    /* Describe custom events */
    Events.StreamDragStart = 'streamDragStart';
    Events.StreamDragMove = 'streamDragMove';
    Events.StreamDragEnd = 'streamDragEnd';
    Events.OpenDetail = 'openDetail';
    Events.CloseDetail = 'closeDetail';

    /* Attach custom events to every view */
    for (key in this.views) {
      this.views[key].on(Events.StreamDragStart, this.onStreamDragStart);
      this.views[key].on(Events.StreamDragMove, this.onStreamDragMove);
      this.views[key].on(Events.StreamDragEnd, this.onStreamDragEnd);
      this.views[key].on(Events.OpenDetail, this.onOpenDetail);
      this.views[key].on(Events.CloseDetail, this.onCloseDetail);
    }
  }

  App.prototype.onOpenDetail = function(layer) {
    if (!this.open) {
      this.views.stream.states.next();
      this.views.detail.open(layer);
      this.views.navigation.open();
      return this.open = true;
    }
  };

  App.prototype.onCloseDetail = function() {
    this.views.stream.states.next();
    this.views.detail.close();
    this.views.navigation.close();
    return this.open = false;
  };

  App.prototype.onStreamDragStart = function() {
    this.views.navigation.onDragStart();
    return this.views.stream.registerStartPosition();
  };

  App.prototype.onStreamDragMove = function(dragged) {
    return this.views.navigation.updatePos(dragged);
  };

  App.prototype.onStreamDragEnd = function() {
    this.views.stream.checkThresholdPassed();
    if (!this.views.stream.thresholdPassed) {
      this.views.navigation.moveBack();
    }
    return this.views.stream.move();
  };

  return App;

})();

Stream = (function(superClass) {
  extend(Stream, superClass);

  function Stream(options) {
    this.options = options;
    Stream.__super__.constructor.call(this, this.options);
    this.properties = {
      height: this.options.layer.height,
      width: screenW
    };
    this.states.add({
      hidden: {
        opacity: .5,
        x: -200
      }
    });
    this.states.animationOptions = {
      curve: bezier,
      time: .6
    };

    /* Add imported layer as sublayer */
    this.options.layer.superLayer = this;
    this.step = 0;
    this._enableDragging();
    this._startListening();
  }

  Stream.prototype.move = function() {
    return this.animate({
      properties: {
        y: this.step * -screenH
      }
    });
  };

  Stream.prototype.registerStartPosition = function() {
    return this.positionStart = this.y;
  };

  Stream.prototype.checkThresholdPassed = function() {

    /* The distance need to be dragged to scroll to next/previous */
    var dragged, threshold;
    threshold = screenH / 3;
    dragged = Math.abs(this.y - this.positionStart);

    /* Check if amount draged exceeds threshold */
    if (dragged > threshold) {
      if (this.y < this.positionStart) {
        this.step++;
      }
      if (this.y > this.positionStart) {
        this.step--;
      }
      return this.thresholdPassed = true;
    } else {
      return this.thresholdPassed = false;
    }
  };

  Stream.prototype._enableDragging = function() {

    /* The amount of distance that can be dragged beyond the last item in the stream */
    var bounds;
    this.dragPastEnd = 100;

    /* Space needed to allow full dragging */
    this.dragHeight = (this.options.layer.height - screenH) + this.dragPastEnd;

    /* Define dragframe */
    bounds = new Layer({
      width: screenW,
      height: this.options.layer.height + this.dragHeight,
      y: -this.dragHeight,
      backgroundColor: ""
    });
    this.draggable.enabled = true;
    return this.draggable.maxDragFrame = bounds.frame;
  };

  Stream.prototype._startListening = function() {
    var i, len, post, ref, results;
    this.on(Events.DragStart, (function(_this) {
      return function() {
        return _this.emit(Events.StreamDragStart);
      };
    })(this));
    this.on(Events.DragMove, (function(_this) {
      return function() {
        var value;
        value = _this.y - _this.positionStart;
        return _this.emit(Events.StreamDragMove, value);
      };
    })(this));
    this.on(Events.DragEnd, (function(_this) {
      return function() {
        return _this.emit(Events.StreamDragEnd);
      };
    })(this));

    /* Attach event emitter to every post */
    ref = this.options.layer.subLayers;
    results = [];
    for (i = 0, len = ref.length; i < len; i++) {
      post = ref[i];
      results.push(post.on(Events.Click, (function(_this) {
        return function(e, layer) {

          /* Only do something when there hasn't been dragged */
          if (_this.y === _this.positionStart) {
            return _this.emit(Events.OpenDetail, layer);
          }
        };
      })(this)));
    }
    return results;
  };

  return Stream;

})(Layer);

Navigation = (function(superClass) {
  extend(Navigation, superClass);

  function Navigation(options) {
    var i, len, ref, statBar;
    this.options = options;
    Navigation.__super__.constructor.call(this, this.options);
    this.properties = {
      width: screenW,
      height: 128,
      backgroundColor: ""
    };
    this.options.layer.superLayer = this;
    this.statBar = this.options.layer.subLayersByName("statBar")[0];
    this.statBarWhite = this.statBar.subLayersByName("statBarWhite")[0];
    this.statBarBlack = this.statBar.subLayersByName("statBarBlack")[0];
    ref = [this.statBarWhite, this.statBarBlack];
    for (i = 0, len = ref.length; i < len; i++) {
      statBar = ref[i];
      statBar.states.add({
        show: {
          opacity: 1
        },
        hide: {
          opacity: 0
        }
      });
      statBar.states.animationOptions = {
        curve: bezier,
        time: .6
      };
    }
    this.statBarBlack.states.switchInstant('hide');
  }

  Navigation.prototype.onDragStart = function() {
    this.animateStop();
    return this.positionStart = this.y;
  };

  Navigation.prototype.moveBack = function() {
    return this.animate({
      properties: {
        y: this.positionStart
      }
    });
  };

  Navigation.prototype.updatePos = function(offset) {
    var minY, newY;
    minY = -this.height;
    this.maxY = 0;
    newY = this.positionStart + offset;
    if (newY < this.minY) {
      newY = this.minY;
    }
    if (newY > this.maxY) {
      newY = this.maxY;
    }
    return this.y = newY;
  };

  Navigation.prototype.open = function() {
    this.statBar.x = 14;
    this.statBar.y = 13;

    /* Place statusbar in the topmost layer */
    this.statBar.superLayer = app.statusbar;
    this.statBarWhite.states["switch"]('hide');
    return this.statBarBlack.states["switch"]('show');
  };

  Navigation.prototype.close = function() {
    this.y = 0;

    /* Put statusbar back in original container */
    this.statBar.superLayer = this;
    this.statBarWhite.states["switch"]('show');
    return this.statBarBlack.states["switch"]('hide');
  };

  return Navigation;

})(Layer);

Detail = (function(superClass) {
  extend(Detail, superClass);

  function Detail(options) {
    this.options = options;
    Detail.__super__.constructor.call(this, this.options);
    this.properties = {
      width: screenW,
      height: screenH,
      x: screenW
    };
    this.states.animationOptions = {
      curve: bezier,
      time: .6
    };
    this.states.add({
      open: {
        x: 0
      },
      closed: {
        x: screenW
      }
    });
    this.options.layer.superLayer = this;
    this.closeHitarea = new Layer({
      width: 88,
      height: 88,
      y: 36,
      superLayer: this,
      backgroundColor: 'transparant'
    });
    this.closeHitarea.on(Events.Click, (function(_this) {
      return function() {
        return _this.emit(Events.CloseDetail);
      };
    })(this));
    this.shotContainer = new Layer({
      width: screenW,
      height: 563,
      y: 128,
      x: 0,
      superLayer: this
    });
  }

  Detail.prototype.open = function(shot) {
    this.shotContainer.image = shot.subLayers[0].image;
    return this.states["switch"]('open');
  };

  Detail.prototype.close = function() {
    return this.states["switch"]('closed');
  };

  return Detail;

})(Layer);

app = new App;
