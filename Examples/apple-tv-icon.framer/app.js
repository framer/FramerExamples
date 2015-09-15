/* Made with Framer
by Robert van Klinken
www.framerjs.com */

/* Components */
var bg, gearBottomLayer, gearTopLayer, gearbg, glow, label, settings, settingsLayer;

bg = new BackgroundLayer({
  backgroundColor: "#CCC8C8"
});

settingsLayer = new Layer({
  width: 690,
  height: 590,
  backgroundColor: "transparant"
});

settings = new Layer({
  superLayer: settingsLayer,
  borderRadius: 8,
  y: 170,
  x: 150,
  width: 370,
  height: 230,
  shadowY: 40,
  shadowBlur: 100,
  shadowColor: "rgba(0,0,0,0.6)",
  shadowSpread: -28
});

gearbg = new Layer({
  backgroundColor: "#565457",
  width: 170,
  height: 170,
  borderRadius: 99,
  superLayer: settings,
  y: 30,
  x: 100
});

gearTopLayer = new Layer({
  image: "images/topImage.png",
  width: 150,
  height: 150,
  borderRadius: 99,
  superLayer: settings,
  y: 40,
  x: 110
});

gearBottomLayer = new Layer({
  image: "images/bottomImage.png",
  width: 100,
  height: 100,
  borderRadius: 99,
  superLayer: settings,
  y: 65,
  x: 135
});

label = new Layer({
  width: 180,
  height: 40,
  backgroundColor: "transparant"
});

glow = new Layer({
  width: 800,
  height: 800,
  opacity: 0.4,
  borderRadius: '100%',
  superLayer: settings
});

settings.style = {
  "background": "linear-gradient( #E2E0E0 0%, #979A9E 100%)"
};

label.style = {
  "font": "500 30px SF Compact Text, Helvetica Neue",
  "letter-spacing": "-1px",
  "text-align": "center",
  "text-shadow": "0 2px 6px rgba(0,0,0,0.4)"
};

glow.style = {
  "background": "radial-gradient( rgba(255,255,255,1) 0%, rgba(255,255,255,0) 60%)"
};

/* Position settingsLayer */

settingsLayer.center();

settingsLayer.perspective = 100;

/* Position Label */

label.html = "Settings";

label.center();

label.y += 150;

label.x -= 5;

/* Place small cog behind the larger one */

gearBottomLayer.placeBehind(gearTopLayer);

/* Animate icon */

bg.on(Events.TouchMove, function(event) {
  var delta;
  delta = {
    x: settingsLayer.midX - Events.touchEvent(event).clientX,
    y: settingsLayer.midY - Events.touchEvent(event).clientY
  };
  settings.rotationX = Utils.modulate(delta.y, [0, settingsLayer.midX], [0, 1]);
  settings.rotationY = Utils.modulate(delta.x, [0, settingsLayer.midY], [0, -1]);
  settings.y = Utils.modulate(-delta.y, [0, settingsLayer.midX], [170, 155]);
  settings.x = Utils.modulate(-delta.x, [0, settingsLayer.midY], [150, 140]);
  gearbg.y = Utils.modulate(delta.y, [0, settingsLayer.midY], [30, 26]);
  gearbg.x = Utils.modulate(delta.x, [0, settingsLayer.midX], [100, 92]);
  gearTopLayer.y = Utils.modulate(delta.y, [0, settingsLayer.midY], [40, 38]);
  gearTopLayer.x = Utils.modulate(delta.x, [0, settingsLayer.midX], [110, 106]);
  glow.x = Utils.modulate(delta.x, [0, settings.midX], [-200, 200]);
  glow.y = Utils.modulate(delta.y, [0, settings.midY], [-200, 200]);
  return glow.opacity = Utils.modulate(delta.x, [0, settingsLayer.midX], [0.3, 1]);
});
