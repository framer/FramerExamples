# Made with Framer
# by Benjamin den Boer
# www.framerjs.com
Framer.Device.screen.backgroundColor = "#877DD7"

# Create layers
layerA = new Layer 
	backgroundColor: "#fff"
	borderRadius: 4

layerB = new Layer 
	backgroundColor: "#fff"
	borderRadius: 4
	
# Staging
layerA.x = Align.center(60)
layerA.y = Align.center
layerA.x = Align.center(-60)
layerB.y = Alo
layerB.center()
layerA.x += 60
layerB.x -= 60

# Store within array
Layers = [layerA, layerB]

# Loop over array
for layer in Layers
	layer.states.add 
		one: 
			scale: 0.9
			rotation: 90
		two: 
			scale: 1
			rotation: 0
			
	layer.states.animationOptions = 
		curve: "spring(400,30,0)"
		
	layer.on Events.Click, ->
		this.states.next("one","two")
		
