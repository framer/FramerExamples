# Made with Framer
# by Jorn van Dijk
# www.framerjs.com

bg = new BackgroundLayer backgroundColor:"#673EBA"

layerGroup = Framer.Importer.load "imported/AlbumAnimation"
layerGroup.View.shadowY = 3
layerGroup.View.shadowBlur = 15
layerGroup.View.shadowColor = "rgba(0, 0, 0, 0.6)"
layerGroup.View.clip = true
layerGroup.View.center()
window.onresize = -> layerGroup.View.center()
	
Framer.Defaults.Animation =
	curve: "spring"
	curveOptions:
		tension: 260
		friction: 30
		velocity: 0
		tolerance: 0.01

# Album & Color Start States ––––––––––––––––––––––––––––––––––––––––––––

for count in [1..6]
	albums = layerGroup["Album" + count]
	albums.states.add
		start: {y:640, opacity:0}
	albums.states.switchInstant "start"

for count in [1..4]
	colors = layerGroup["Color" + count]
	colors.states.add
		start: {opacity:0}
	colors.states.switchInstant "start"

# Album Animation –––––––––––––––––––––––––––––––––––––––––––––––––––––––

Utils.delay 1, ->
	timeFactor = 0.1
	Utils.delay 1 * timeFactor, -> layerGroup.Album1.states.next()
	Utils.delay 0 * timeFactor, -> layerGroup.Album2.states.next()
	Utils.delay 3 * timeFactor, -> layerGroup.Album3.states.next()
	Utils.delay 2 * timeFactor, -> layerGroup.Album4.states.next()
	Utils.delay 5 * timeFactor, -> layerGroup.Album5.states.next()
	Utils.delay 4 * timeFactor, -> layerGroup.Album6.states.next()

	Utils.delay 7 * timeFactor, -> layerGroup.Color1.states.next()
	Utils.delay 6 * timeFactor, -> layerGroup.Color2.states.next()
	Utils.delay 9 * timeFactor, -> layerGroup.Color3.states.next()
	Utils.delay 8 * timeFactor, -> layerGroup.Color4.states.next()
	
# Retina scaling
if window.devicePixelRatio > 1.5
	layerGroup.View.scale = 0.75