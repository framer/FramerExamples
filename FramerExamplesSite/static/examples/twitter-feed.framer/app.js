/* Sketch Import */
var bg, scroll, sketch;

bg = new BackgroundLayer({
  backgroundColor: "#fff"
});

sketch = Framer.Importer.load("imported/twitter-feed");

/* Set the imported layers as global layers, allowing us to target layers directly.
We can now write "userName" instead of "sketch.userName" */

Utils.globalLayers(sketch);

userName.opacity = 0;

/* Wrap the feed in a new ScrollComponent */

scroll = ScrollComponent.wrap(feed);

scroll.height -= sketch.tabBar.height;

/* Only allow for vertical scrolling */

scroll.scrollHorizontal = false;

/* On scroll, we adjust the properties of imported layers */

scroll.on(Events.Scroll, function() {

  /* Pull-down to scale and blur the profile image */
  photo.scale = Utils.modulate(scroll.scrollY, [0, -600], [1, 3], true);
  photo.blur = Utils.modulate(scroll.scrollY, [-150, -600], [0, 30], true);

  /* Limit the distance we can pull upwards to scale the image */
  if (scroll.content.y > 300) {
    scroll.content.y = 300;
  }

  /* When pulling up:
  	1. Transition the avatar
   */
  avatar.scale = Utils.modulate(scroll.scrollY, [0, 100], [1, 0.6], true);
  avatar.y = Utils.modulate(scroll.scrollY, [0, 100], [0, 20], true);
  avatar.originX = 0;

  /* 2. Set the photo position */
  photo.y = Utils.modulate(scroll.scrollY, [0, 100], [-100, -200], true);

  /* 3. Fade-in the username */
  userName.y = Utils.modulate(scroll.scrollY, [200, 400], [137, 55], true);
  userName.opacity = Utils.modulate(scroll.scrollY, [300, 400], [0, 1], true);

  /* Re-arrange the hierarchy after a set distance */
  if (scroll.content.y < -115) {
    photo.index = 4;
    userName.index = 5;
    return photo.height = 334;
  } else {
    photo.index = 0;
    return photo.height = 500;
  }
});
