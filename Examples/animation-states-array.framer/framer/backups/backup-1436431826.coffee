# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

bg = new BackgroundLayer 
	backgroundColor: "#28AFFA"

layerA = new Layer 
	backgroundColor: "#fff"
	borderRadius: 4

layerB = new Layer 
	backgroundColor: "#fff"
	
layerA.center()	
layerB.center()
layerA.x += 60
layerB.x -= 60

Layers = [layerA, layerB]

for layers in Layers
	layers.states.add 
		one: 
			scale: 0.8
		two: 
			scale: 1
			
	layers.states.animationOptions = 
		curve: "spring(400,10,0)"
		
layerA.on Events.Click, ->
	this.states.next("one","two")
	
layerB.on Events.Click, ->
	this.states.next("one","two")