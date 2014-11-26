(function() {
  var Artboard, Card, CardAttach, CardText, Convo, ConvoClose, ConvoPopover, HeartCta, HeartCtaHeart, IntroSlide, PSD, PageControl, RefreshButton, SignupCta, TapPopover, changeScene;

  PSD = Framer.Importer.load("imported/PotluckOnboarding");

  Framer.Defaults.Animation = {
    time: 0.2,
    curve: 'spring',
    curveOptions: {
      tension: 500,
      friction: 35,
      velocity: 10
    }
  };

  Artboard = PSD.artboard;

  IntroSlide = PSD.intro;

  CardAttach = PSD.cardattach;

  Card = PSD.card;

  Convo = PSD.convo;

  ConvoPopover = PSD.convopopover;

  HeartCta = PSD.heartcta;

  HeartCtaHeart = PSD.heartctaheart;

  CardText = PSD.cardtext;

  TapPopover = PSD.tappopover;

  SignupCta = PSD.signupcta;

  PageControl = PSD.pagecontrol;

  RefreshButton = PSD.refreshbutton;

  ConvoClose = PSD.convoclose;

  Convo.originalFrame = Convo.frame;

  CardAttach.style = {
    borderRadius: '18px',
    overflow: 'hidden'
  };

  CardAttach.scale = 280 / 320;

  Card.y = 180 - 45;

  Convo.y = 1136;

  ConvoPopover.opacity = 0;

  HeartCta.opacity = 0;

  CardText.opacity = 0;

  TapPopover.opacity = 0;

  SignupCta.opacity = 0;

  PageControl.opacity = 0;

  Artboard.width = 640;

  Artboard.height = 1136;

  Artboard.clip = true;

  RefreshButton.opacity = 0;

  IntroSlide.draggable.enabled = true;

  IntroSlide.draggable.speedY = 0;

  Layer.prototype.fadeIn = function() {
    return this.animate({
      properties: {
        opacity: 1
      },
      curve: 'ease-in-out',
      time: 0.1
    });
  };

  Layer.prototype.fadeOut = function() {
    return this.animate({
      properties: {
        opacity: 0
      },
      curve: 'ease-in-out',
      time: 0.1
    });
  };

  changeScene = function(scene) {
    switch (scene) {
      case 1:
        TapPopover.fadeIn();
        return CardText.fadeIn();
      case 2:
        CardAttach.animate({
          properties: {
            scale: 1
          }
        });
        CardAttach.animate({
          properties: {
            borderRadius: 0
          }
        });
        Card.animate({
          properties: {
            y: 0
          }
        });
        Convo.animate({
          properties: {
            y: Convo.originalFrame.y
          }
        });
        TapPopover.fadeOut();
        CardText.fadeOut();
        PageControl.fadeIn();
        return Utils.delay(0.6, function() {
          return ConvoPopover.fadeIn();
        });
      case 3:
        CardAttach.style.borderRadius = '18px';
        ConvoPopover.fadeOut();
        PageControl.fadeOut();
        CardAttach.animate({
          properties: {
            scale: 280 / 320
          }
        });
        Card.animate({
          properties: {
            y: 180 - 45
          }
        });
        Convo.animate({
          properties: {
            y: 1136
          }
        });
        return Utils.delay(0.6, function() {
          return HeartCta.fadeIn();
        });
      case 4:
        HeartCta.fadeOut();
        Card.animate({
          properties: {
            x: 640
          }
        });
        SignupCta.fadeIn();
        return Utils.delay(0.6, function() {
          return RefreshButton.animate({
            properties: {
              scale: 1.8,
              opacity: 1
            }
          });
        });
    }
  };

  IntroSlide.on(Events.DragEnd, function() {
    if (IntroSlide.x < -80) {
      IntroSlide.animate({
        properties: {
          x: -640
        },
        time: 0.2,
        curve: 'ease-out'
      });
      return Utils.delay(0.6, function() {
        return changeScene(1);
      });
    } else {
      return IntroSlide.animate({
        properties: {
          x: 0
        },
        time: 0.2,
        curve: 'ease-out'
      });
    }
  });

  Card.on(Events.Click, function() {
    return changeScene(2);
  });

  ConvoClose.on(Events.Click, function() {
    return changeScene(3);
  });

  HeartCtaHeart.on(Events.Click, function() {
    return changeScene(4);
  });

  RefreshButton.on(Events.Click, function() {
    return location.reload();
  });

}).call(this);
