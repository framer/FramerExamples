# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

bg = new BackgroundLayer 
	backgroundColor: "#28AFFA"

# Create Layers
layerA = new Layer width:80, height:80, 
backgroundColor: "#fff", borderRadius:4
layerA.center()

layerA.originX = 1
layerA.originY = 0

# Define animation of layerA
layerA.animate 
	properties:
		rotation: 90
	curve: "spring(200,30,0)"

layerA.on Events.AnimationEnd, ->
	this.animate 
		properties:
			rotation: 0
		curve: "spring(200,10,0)"