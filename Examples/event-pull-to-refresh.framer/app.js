/* Pull to Refresh Example */

/* This example shows how to implement pull to fresh, as seen in the
Twitter for iOS app. To get started, take a look at the PSD
to see how the layers and groups are set up. The pull to refresh 
control in Twitter features an arrow that changes direction if
you've pulled enough, and then a spinner to indicate loading status. */

/* Initial set up. Import our PSD, set up global variables. We want to 
hide our spinner layer until you let go (and have pulled enough) */
var PSD, animating, deltaY, springCurve, startY, timelineStartY;

PSD = Framer.Importer.load("imported/Pull to refresh");

PSD.spinner.scale = 0;

deltaY = 0;

startY = 0;

timelineStartY = PSD.timeline.y;

animating = false;

springCurve = "spring(200,20,0)";

PSD.timeline.draggable.enabled = true;

PSD.timeline.draggable.speedX = 0;

PSD.timeline.superLayer = PSD.bg;

PSD.bg.clip = true;

/* When you click (or taps), we need to grab the y position of 
that click so that we can use it when you drag (to see how far 
they have pulled. We also want to reset values for our refresh 
control so everything is correct in case you pull to refresh 
more than once. */

PSD.timeline.on(Events.DragStart, function(event) {
  console.log(event);
  startY = event.pageY;
  PSD.spinner.scale = 0;
  PSD.spinner.rotation = 0;
  PSD.arrow.scale = 1;
  return PSD.arrow.rotation = 0;
});

/* When you drag, several things should happen. The first is that
the timeline should follow your mouse/finger. The arrow should
also animate once you have pulled enough, letting you know you
can release to refresh. */

PSD.timeline.on(Events.DragMove, function(event) {

  /* Figure out how far you have pulled, and then move the timeline
  	and refresh controls that amount
   */
  deltaY = startY - event.pageY;
  PSD.timeline.y = timelineStartY - deltaY;
  PSD.refreshControl.y = PSD.timeline.y - 70;

  /* If you have pulled enough (in this case more than 100 pixels)
  	and if the arrow is not animating, then flip the arrow and
  	set animating to true. We do this so that the arrow doesn't 
  	try and animate each time you move, which would be very janky.
  	By using an animating variable, the animation only gets called
  	once, and is very smooth.
   */
  if (deltaY < -100) {
    if (animating === false) {
      PSD.arrow.animate({
        properties: {
          rotation: -180
        },
        curve: springCurve
      });
      return animating = true;
    }
  } else {

    /* If you have pulled more than 100px, but then drag back up, 
    		flip the arrow back. We use the same animating variable to 
    		make sure we only try and animate if you already pulled 
    		past 100px, and we only call animate once.
     */
    if (animating === true) {
      PSD.arrow.animate({
        properties: {
          rotation: 0
        },
        curve: springCurve
      });
      return animating = false;
    }
  }
});

/* On touch end, if you pulled and released past 100px, then 
we hide the arrow, bring back the spinner, and animate it,
and then after a delay, animate back to the starting position.
If you pulled and released under 100px, then just animate 
back to the starting position. */

PSD.timeline.on(Events.DragEnd, function() {
  if (deltaY < -100) {
    PSD.refreshControl.animate({
      properties: {
        y: timelineStartY + 25
      },
      curve: springCurve
    });
    PSD.arrow.animate({
      properties: {
        scale: 0
      },
      curve: springCurve
    });
    PSD.spinner.animate({
      properties: {
        scale: 1
      },
      curve: springCurve
    });
    PSD.spinner.animate({
      properties: {
        rotation: 720
      },
      time: 2
    });
    PSD.timeline.animate({
      properties: {
        y: timelineStartY + 100
      },
      curve: springCurve
    });

    /* We use Utils.delay to set a 2 second delay, and then
    		call our animations
     */
    return Utils.delay(2, function() {
      PSD.refreshControl.animate({
        properties: {
          y: timelineStartY - 70
        },
        curve: springCurve
      });
      PSD.spinner.animate({
        properties: {
          scale: 0
        },
        curve: springCurve
      });
      return PSD.timeline.animate({
        properties: {
          y: timelineStartY
        },
        curve: springCurve
      });
    });
  } else {
    PSD.refreshControl.animate({
      properties: {
        y: timelineStartY - 70
      },
      curve: springCurve
    });
    return PSD.timeline.animate({
      properties: {
        y: timelineStartY
      },
      curve: springCurve
    });
  }
});
