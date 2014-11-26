(function() {
  var applyCSS, backBtn, backImg, bg, container, containerSpacer, currentCard, dataStub, detailContent, detailView, exitDetailView, header, setupCard, toDetailView;

  dataStub = [
    {
      title: "Interstellar",
      date: "November 7, 2014",
      clipURL: "images/interstellar.mov"
    }, {
      title: "The Hunger Games: Mockingjay, Part 1",
      date: "November 21, 2014",
      clipURL: "images/hungergames.mov",
      shortTitle: "The Hunger Games"
    }, {
      title: "The Hobbit: Battle of<br/>Five Armies",
      date: "December 19, 2014",
      clipURL: "images/hobbit.mov",
      shortTitle: "The Hobbit"
    }, {
      title: "Dracula Untold",
      date: "December 26, 2014",
      clipURL: "images/dracula.mov"
    }
  ];

  currentCard = null;

  applyCSS = function(layer) {
    var container, h1, h3;
    h1 = layer.querySelector("h1");
    h1.style.font = "300 52px/62px Helvetica Neue";
    h3 = layer.querySelector("h3");
    h3.style.font = "bold 30px/42px Helvetica Neue";
    h3.style.marginBottom = "12px";
    container = layer.querySelector(".content");
    container.style.position = "absolute";
    return container.style.bottom = "6px";
  };

  bg = new BackgroundLayer({
    backgroundColor: "#ffffff"
  });

  container = new Layer({
    x: 0,
    y: 0,
    width: 640,
    height: 1136,
    backgroundColor: null
  });

  containerSpacer = new Layer({
    x: 0,
    y: 0,
    width: 640,
    height: 10 + (630 * dataStub.length),
    backgroundColor: null
  });

  containerSpacer.superLayer = container;

  detailView = new Layer({
    x: 0,
    y: 0,
    width: 640,
    height: 2100,
    backgroundColor: null
  });

  detailView.sendToBack();

  detailContent = new Layer({
    x: 0,
    y: 1000,
    width: 640,
    height: 1200,
    image: "images/detail-content.png"
  });

  detailContent.superLayer = detailView;

  detailContent.visible = false;

  backBtn = new Layer({
    x: 0,
    y: 0,
    width: 88,
    height: 88,
    backgroundColor: null
  });

  backImg = new Layer({
    x: 35,
    y: 30,
    width: 17,
    height: 30,
    image: "images/backbtn.png"
  });

  backImg.superLayer = backBtn;

  backBtn.visible = false;

  backBtn.on(Events.Click, function() {
    currentCard.video.player.pause();
    backBtn.visible = false;
    return exitDetailView(currentCard);
  });

  header = new Layer({
    x: 0,
    y: -47,
    width: 640,
    height: 60,
    backgroundColor: null
  });

  header.visible = false;

  header.style = {
    font: "300 36px/42px Helvetica Neue",
    textAlign: "center"
  };

  setupCard = function(dataObj, index) {
    var card, cardVideo, overlay, yPos;
    yPos = 10 + (630 * index);
    card = new Layer({
      x: 10,
      y: yPos,
      width: 620,
      height: 630,
      backgroundColor: null,
      name: "card" + index
    });
    card.containerY = yPos;
    card.titleData = dataObj.shortTitle ? dataObj.shortTitle : dataObj.title;
    card.superLayer = container;
    cardVideo = new VideoLayer({
      x: 0,
      y: 0,
      width: 620,
      height: 620,
      video: dataObj.clipURL,
      name: "video"
    });
    cardVideo.player.autoplay = false;
    Events.wrap(cardVideo.player).on("ended", function() {
      return cardVideo.player.play();
    });
    cardVideo.superLayer = card;
    card.video = cardVideo;
    overlay = new Layer({
      x: 20,
      y: 20,
      width: 580,
      height: 580,
      backgroundColor: null,
      name: "overlay"
    });
    overlay.html = "<div class='content'><h3>" + dataObj.date + "</h3><h1>" + dataObj.title + "</h1></div>";
    applyCSS(overlay);
    overlay.superLayer = card;
    card.overlay = overlay;
    card.isSelected = false;
    return card.on(Events.Click, function() {
      return toDetailView(this);
    });
  };

  Utils.domComplete(function() {
    var index, item, _i, _len;
    for (index = _i = 0, _len = dataStub.length; _i < _len; index = ++_i) {
      item = dataStub[index];
      setupCard(item, index);
    }
    return container.scrollVertical = true;
  });

  detailView.on(Events.DragMove, function() {
    if (this.y > 0) {
      container.opacity = 0 + (this.y / 500);
      detailContent.visible = false;
      this.scale = 1 - (this.y / 5000);
      backBtn.visible = false;
      return header.visible = false;
    } else {
      currentCard.overlay.opacity = 1 + (this.y / 300);
      detailContent.visible = true;
      backBtn.visible = true;
      header.y = -47 + (67 * -this.y / 880);
      return header.visible = true;
    }
  });

  detailView.on(Events.DragEnd, function() {
    var newY;
    if (this.y > 200) {
      currentCard.video.player.pause();
      backBtn.visible = false;
      exitDetailView(currentCard);
    } else {
      backBtn.visible = true;
    }
    newY = -910;
    if (detailView.y > -300) {
      newY = 0;
      header.y = -47;
      if (currentCard.isSelected) {
        detailContent.visible = true;
      }
      currentCard.overlay.opacity = 1;
      currentCard.video.player.play();
    } else {
      header.animate({
        properties: {
          y: 20
        },
        time: .1
      });
      backBtn.visible = false;
      currentCard.video.player.pause();
    }
    return detailView.animate({
      properties: {
        y: newY,
        scale: 1
      },
      curve: "spring-rk4",
      curveOptions: {
        tension: 200,
        friction: 25,
        velocity: 10
      }
    });
  });

  toDetailView = function(sender) {
    var toDetail;
    if (sender.isSelected === false) {
      currentCard = sender;
      container.animate({
        properties: {
          opacity: 0
        },
        time: .25
      });
      sender.x = sender.screenFrame.x;
      sender.y = sender.screenFrame.y;
      sender.originalFrame = sender.frame;
      sender.superLayer = detailView;
      detailView.bringToFront();
      toDetail = new Animation({
        layer: sender,
        properties: {
          x: 0,
          y: 0,
          width: 640,
          height: 1000
        },
        curve: "spring-rk4",
        curveOptions: {
          tension: 200,
          friction: 25,
          velocity: 10
        }
      });
      sender.video.animate({
        properties: {
          x: 0,
          y: 0,
          width: 1000,
          height: 1000
        },
        curve: "spring-rk4",
        curveOptions: {
          tension: 200,
          friction: 25,
          velocity: 10
        }
      });
      sender.overlay.animate({
        properties: {
          height: 960
        },
        curve: "spring-rk4",
        curveOptions: {
          tension: 200,
          friction: 25,
          velocity: 10
        }
      });
      detailContent.y += 136;
      detailContent.visible = true;
      detailContent.animate({
        properties: {
          y: 1000
        },
        curve: "spring-rk4",
        curveOptions: {
          tension: 200,
          friction: 25,
          velocity: 10
        }
      });
      Utils.delay(.1, function() {
        sender.video.player.play();
        container.scrollVertical = false;
        backBtn.visible = true;
        backBtn.opacity = 0;
        backBtn.animate({
          properties: {
            opacity: 1
          },
          time: .2
        });
        backBtn.bringToFront();
        header.bringToFront();
        detailView.draggable.enabled = true;
        return detailView.draggable.speedX = 0;
      });
      toDetail.start();
      header.html = sender.titleData;
      return sender.isSelected = true;
    }
  };

  exitDetailView = function(sender) {
    var toFeed;
    detailContent.visible = false;
    container.animate({
      properties: {
        opacity: 1
      },
      time: .25
    });
    sender.video.animate({
      properties: {
        x: 0,
        y: 0,
        width: 640,
        height: 640
      },
      curve: "spring-rk4",
      curveOptions: {
        tension: 200,
        friction: 25,
        velocity: 10
      }
    });
    sender.overlay.animate({
      properties: {
        height: 580
      },
      curve: "spring-rk4",
      curveOptions: {
        tension: 200,
        friction: 25,
        velocity: 10
      }
    });
    toFeed = new Animation({
      layer: sender,
      properties: {
        x: sender.originalFrame.x,
        y: sender.originalFrame.y,
        width: 620,
        height: 620
      },
      curve: "spring-rk4",
      curveOptions: {
        tension: 200,
        friction: 25,
        velocity: 10
      }
    });
    toFeed.on(Events.AnimationEnd, function() {
      sender.superLayer = container;
      sender.x = sender.originalFrame.x;
      sender.y = sender.containerY;
      container.scrollVertical = true;
      return detailView.sendToBack();
    });
    toFeed.start();
    return sender.isSelected = false;
  };

}).call(this);
