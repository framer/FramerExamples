# Made with Framer
# by Alex Steven
# www.framerjs.com

# Framer.Device.background.backgroundColor = "#0088ff"

# Defaults
Curve = "cubic-bezier(0.2, 0.0, 0.2, 1)"
Time = "0.3"

Framer.Defaults.Animation = 
  curve: Curve
  time: Time

#Layers
circle = new Layer
	x: 100, y: 400
	width: 100, height: 100
	originX: 0.5, originY: 0.5
	cornerRadius: 100
	superLayer: calvinArt
	backgroundColor: "#D42543"
circle.sendToBack()

myShazam = new Layer
	width: 1080, height: 1920
	image: "images/4_Android_My_Shazam_4_en.fw.png"

trackListHit = new Layer
	x: 0, y: 718
	width: 1080, height: 1060
	backgroundColor: "transparent"

calvinArt = new Layer
	x: 48, y: 1314
	width: 180, height: 180
	image: "images/t275855418-i1001677305_s400.jpg"

trackFooterBg = new Layer
	x: 0, y: 1776
	width: 1080, height: 1005
	backgroundColor: '#DDD'

trackFooter = new Layer
	x: 0, y: 1000, opacity: 0
	width: 1080, height: 1005
	image: "images/trackFooter.png"
	
trackHeader = new Layer
	x: 0, y: 126, opacity: 0
	width: 1080, height: 650
	image: "images/trackHeader.png"

fab = new Layer
	x: 860,	y: 1560
	width: 180, height: 180
	image: "images/fab.png"

hardKeys = new Layer
	x: 0, y: 1776
	width: 1080, height: 144
	image: "images/hard_keys.jpg"

status = new Layer
	width: 1080, height: 75
	image: "images/Android_status.png"

back = new Layer
	x: 40, y: 75
	width:200, height: 200
	backgroundColor:'transparent'

# States
calvinArt.states.add
	next:
		y: 248
		scale:

calvinArt.states.add
	two: y: 248, scale: 1.68, originX: 0, originY: 0, 
calvinArt.states.animationOptions = curve: "Curve"
calvinArt.states.animationOptions = delay: "-.8"

circle.states.add
	two: scale: 28, opacity: 1, x: 48, backgroundColor: "#D42543"
circle.states.animationOptions = curve: "Curve"
circle.states.animationOptions = delay: "3"
circle.states.animationOptions = time: ".6"

trackFooter.states.add
	two: y: 771, opacity: 1
trackFooter.states.animationOptions = curve: 'Curve'
trackFooter.states.animationOptions = delay: ".8"

trackFooterBg.states.add
	two: y: 771
trackFooterBg.states.animationOptions = curve: 'Curve'
trackFooterBg.states.animationOptions = delay: "0.2"

trackHeader.states.add
	two: opacity: 1
trackHeader.states.animationOptions = delay: ".6"


# Interactions
trackListHit.on Events.Click, ->
	calvinArt.states.switch('two')
	calvinArt.style.boxShadow = "0 3px 6px rgba(0,0,0,0.25)"
	circle.placeBehind(calvinArt)
	circle.states.switch('two')
	trackFooterBg.states.switch('two')
	trackFooter.states.switch('two')
	trackHeader.states.switch('two')

back.on Events.Click, ->
	circle.states.switch('default')
	trackFooterBg.states.switch('default')
	trackFooter.states.switch('default')
	trackHeader.states.switch('default')
	calvinArt.states.switch('default')
	
	


