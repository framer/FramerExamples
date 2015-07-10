# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

# Sketch Import
sketch = Framer.Importer.load "imported/scroll-n-click"

# Set up a new ScrollComponent
# We only allow for vertical scrolling and inset the content 
scroll = new ScrollComponent 
	width: Screen.width
	height: Screen.height - 128 - 98
	y: 128, superLayer: sketch.content
	scrollHorizontal: false
	contentInset: {top: 32, bottom: 32}

# Our layers will be stored here
allLayers = []

# Create and style the cards within a for-loop
for i in [0...10]
	layer = new Layer 
		backgroundColor: "#fff", 
		width: scroll.width - 48, height: 400 
		x: 24, y: (400 + 32) * i 
		borderRadius: 6, superLayer: scroll.content
		
	layer.style.boxShadow = "0 1px 6px rgba(0,0,0,0.2)"
	
	# Stars
	fav = new Layer image: "images/fav.png", superLayer: layer
	favActive = new Layer image: "images/favActive.png", superLayer: layer, opacity: 0, scale: 0.5
	
	# States
	fav.states.add(active: {opacity: 0})
	favActive.states.add(active: {opacity: 1, scale: 1})
	
	fav.states.animationOptions = time: 0.05
	favActive.states.animationOptions = curve: "spring(600,30,0)"
	
	fav.center()
	favActive.center()
	
	# Store layers in our array
	allLayers.push(layer)
	
# Ignore events when scrolling
scroll.on Events.ScrollMove, ->
	layer.ignoreEvents = true for layer in allLayers
	
scroll.on Events.ScrollAnimationDidEnd, -> 
	this.on Events.TouchEnd, ->
		layer.ignoreEvents = false for layer in allLayers
			
# Switch states
for layer in allLayers			
	layer.on Events.TouchEnd, ->
		unless scroll.isMoving
			fav = this.subLayers[0]
			favActive = this.subLayers[1]
			fav.states.next()
			favActive.states.next()