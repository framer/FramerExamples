# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

bg = new BackgroundLayer 
	backgroundColor: "#917BDF"

# Create Layers
layerA = new Layer width:80, height:80, 
backgroundColor: "#fff", borderRadius:4
layerA.x = Align.center(-50)
layerA.y = Align.center

layerB = new Layer width:80, height:80, 
backgroundColor: "#fff", borderRadius: 4
layerB.x = Align.center(50)
layerB.y = Align.center

# Define animation of layerA
layerA.animate 
	properties:
		rotation: 90
	curve: "ease"
	time: 0.5

# Animate layerB when layerA is done animating
layerA.on Events.AnimationEnd, ->
	layerB.animate 
		properties:
			rotation: 90
		curve: "ease"
		time: 0.5