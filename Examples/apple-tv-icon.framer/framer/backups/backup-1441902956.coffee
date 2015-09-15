Framer.Defaults.Animation = curve: "spring(500,35,0)"

bg = new BackgroundLayer
	backgroundColor: "#CCC8C8"
	
settingsLayer = new Layer
	width: 570
	height: 490
# 	backgroundColor: "transperant"

settingsLayer.perspective = 100

settings = new Layer
	superLayer: settingsLayer
	borderRadius: 8
	y: 130
	x: 100
	width: 370
	height: 230
	shadowY: 40
	shadowBlur: 100
	shadowColor: "rgba(0,0,0,0.6)"
	shadowSpread: - 28

gearbg = new Layer
	backgroundColor: "#565457"
	width: 170
	height: 170
	borderRadius: 99
	superLayer: settings
	y: 30
	x: 100
	
gearTopLayer = new Layer
	backgroundColor: "red"
	width: 150
	height: 150
	borderRadius: 99
	superLayer: settings
	y: 40
	x: 110

gearBottomLayer = new Layer
	image: "images/bottomImage.png"
	width: 100
	height: 100
	borderRadius: 99
	superLayer: settings
	y: 65
	x: 135

label = new Layer
	superLayer: settingsLayer
	width: 200
	height: 40
	backgroundColor: "transperant"
	y: 380
	
label.placeBefore	
	
settings.style =
	"background": "linear-gradient( #E2E0E0 0%, #979A9E 100%)"
	
# label.style =
# 	"font": "500 30px SF Compact Text, Helvetica Neue"
# 	"letter-spacing": "-1px"
# 	"text-align": "center"
# 	"text-shadow": "0 2px 6px rgba(0,0,0,0.4)"
# 	
# label.html = "Settings" 

settingsLayer.centerY()
settingsLayer.centerX()
label.centerX()

bg.on Events.TouchMove, (event) ->
	
	delta =
		x: settingsLayer.midX - Events.touchEvent(event).clientX
		y: settingsLayer.midY - Events.touchEvent(event).clientY
	
	settings.rotationX = Utils.modulate delta.y, [0, settingsLayer.midX], [0, 3]
	settings.rotationY = Utils.modulate delta.x, [0, settingsLayer.midY], [0, -3]
	
	settings.y = Utils.modulate delta.y, [0, settingsLayer.midX], [130, 110]
	settings.x = Utils.modulate delta.x, [0, settingsLayer.midY], [100, 90]
	
	gearbg.y = Utils.modulate delta.y, [0, settingsLayer.midY], [30, 26]
	gearbg.x = Utils.modulate delta.x, [0, settingsLayer.midX], [100, 92]
	
	gearBottomLayer.y = Utils.modulate delta.y, [0, settingsLayer.midY], [65, 70]
	gearBottomLayer.x = Utils.modulate delta.x, [0, settingsLayer.midX], [135, 140]
			

	
	


# y: 65
# 	x: 135

