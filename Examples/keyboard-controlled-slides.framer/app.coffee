# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

screenWidth = Screen.width
screenHeight = Screen.height

Framer.Device.screen.backgroundColor = "#FBA145"
container = new Layer backgroundColor:"transparent", width: 470, height:100, clip:false
container.x = Align.center 
container.y = Align.center

window.onresize = ->
	container.x = Align.center 
	container.y = Align.center
	
# Container for our Array
Layers = []
	
# Retreive the index of a layer by reading its y position
getIndexByFrame = (frame) ->
	index = parseInt(((frame.x - frame.width) / frame.width)+1)

# Retreive the layer by reading an index		
layerAtIndex = (index) ->
	for layer in Layers
		if layer.listIndex is index
			return layer
						
for i in [0..3]
	layer = new Layer
		width: 100	
		height: 100
		backgroundColor: "#fff"
		borderRadius: 4
		x: 124 * i
		y: 0 
		superLayer: container
		shadowColor: "rgba(0,0,0,0.15)"
		shadowY: 1
		shadowBlur: 3
		
	layer.listIndex = i
	
	layer.states.add 
		active: {scale:1.2, shadowY:6, shadowBlur:16, x:layer.x, opacity:1}
		inactive: {scale:1, shadowY:1, shadowBlur:3, opacity:.5}
		
	layer.states.animationOptions = 
		curve: "spring(400,20,0)"
		
	Layers.push(layer)

currentIndex = nextLayer = prevLayer = 0
currentLayer = layerAtIndex(currentIndex)

updateIndex = ->
	currentLayer = layerAtIndex(currentIndex)
	nextLayer = layerAtIndex(currentIndex+1)
	prevLayer = layerAtIndex(currentIndex-1)	
	
nextSlide = ->	
	for layers in Layers
		layers.states.switch "inactive"	
			
	if currentLayer
		currentLayer.states.switch "active"
	
	currentIndex += 1
	updateIndex()
			
prevSlide = ->	
	currentIndex -= 1
	updateIndex()
	
	for layers in Layers
		layers.states.switch "inactive"
		
	if prevLayer
		prevLayer.states.switch "active"
	
						
Events.wrap(document).addEventListener "keydown", (event) ->
	keyCode = event.which
	key = String.fromCharCode(keyCode)
	switch key
		when "'"
			if currentIndex < Layers.length
				nextSlide()			
		when "%"
			if currentIndex > 1
				prevSlide()