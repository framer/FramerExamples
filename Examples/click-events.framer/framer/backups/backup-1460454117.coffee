# Made with Framer
# by Koen Bok
# www.framerjs.com

Framer.Device.screen.backgroundColor = "#2DD7AA"

# Create Layers
layerA = new Layer
	backgroundColor: "#fff"
	borderRadius: 4

layerB = new Layer 
	backgroundColor: "#fff"
	borderRadius: 4

# Staging
layerA.x = Align.center(-90)
layerB.x = Align.center(90)
layerA.x -= 60
layerB.x += 60

# Click Event
layerA.on Events.Click, ->
	layerA.animate 
		properties:
			rotation: this.rotation + 90
		curve: "ease"
		time: 1
		
# Touch Events
layerB.on Events.TouchStart, -> 
	layerB.animate 
		properties:
			rotation: 90
			scale: 0.8
		curve: "ease"
		time: 0.5
		
layerB.on Events.TouchEnd, -> 
	layerB.animate 
		properties:
			rotation: 0
			scale: 1
		curve: "ease"
		time: 0.5