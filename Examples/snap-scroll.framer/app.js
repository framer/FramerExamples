/* Made with Framer
by Floris Verloop
www.framerjs.com */
var DetailBack, DetailPost, fn, i, j, len, post, ref, sketch, stream;

sketch = Framer.Importer.load("imported/stream");

Utils.globalLayers(sketch);

Screen.backgroundColor = "#fff";

/* Detail page */

Detail.index = 100;

Detail.x = Screen.width;

Detail.states.add({
  shown: {
    x: 0
  }
});

Detail.states.animationOptions = {
  curve: "cubic-bezier(0.19, 1, 0.22, 1)"
};

DetailBack = new Layer({
  height: 128,
  width: 100,
  x: 0,
  y: 0,
  backgroundColor: null,
  superLayer: Detail.subLayersByName("navbarDetail")[0]
});

DetailBack.on(Events.Click, function() {
  return Detail.states["switch"]("default");
});

DetailPost = new Layer({
  height: 578,
  width: Screen.width,
  x: 0,
  y: 128,
  superLayer: Detail.subLayersByName("detailContent")[0]
});

/* Stream */

stream = new PageComponent({
  width: Screen.width,
  height: Content.subLayers[0].height,
  index: 70,
  clip: false,
  scrollHorizontal: false
});

stream.animationOptions = {
  curve: "spring(500, 36, 17)"
};

/* Nav */

Navigation.index = 80;

Navigation.superLayer = stream;

Navigation.subLayersByName("statBar")[0].subLayers[1].visible = false;

Navigation.states.add({
  hidden: {
    maxY: 0
  }
});

Navigation.states.animationOptions = {
  curve: "spring(500, 36, 17)"
};

/* on page change hide navigation */

stream.on("change:currentPage", function(event) {
  if (stream.direction === "down" && stream.currentPage !== stream.content.subLayers[stream.content.subLayers.length - 2]) {
    if (stream.scrollY + Screen.height >= stream.content.height) {
      stream.snapToPreviousPage();
      stream.direction = "up";
    }
    return Navigation.states["switch"]("hidden");
  } else {
    return Navigation.states["switch"]("default");
  }
});

/* put all the posts in the pageComponent */

ref = Content.subLayers.reverse();
fn = function(post) {
  return post.on(Events.Click, function() {
    Detail.states["switch"]("shown");
    return DetailPost.image = post.subLayers[0].image;
  });
};
for (i = j = 0, len = ref.length; j < len; i = ++j) {
  post = ref[i];
  post.y = i * post.height;
  post.superLayer = stream.content;
  fn(post);
}
