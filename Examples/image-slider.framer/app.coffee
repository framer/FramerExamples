# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

# Set-up
Framer.Device.screen.backgroundColor = "transparent"
document.body.style.cursor = "auto"
width = 150
height = 200
margin = width 	
screenWidth = Screen.width
currentLayer = nextLayer = prevLayer = prevLayerTwo = prevLayerThree = nextLayerTwo = nextLayerThree = originLayer = null

# Container
container = new Layer backgroundColor: "transparent", width: screenWidth, height:height, clip:false
container.x = Align.center 
container.y = Align.center

window.onresize = -> 
	container.width = screenWidth
	container.x = Align.center 
	container.y = Align.center
	
# Layer Array
Layers = []
	
# Retreive the layer by reading an index		
layerAtIndex = (index) ->
	for layer in Layers
		if layer.listIndex is index
			return layer		
		
newBG = new BackgroundLayer backgroundColor: "transparent"

# Background switching function	
setBackground = ->
	newBG.properties = image: currentLayer.image, scale:1.5, blur:40, opacity:0

	newBG.animate 
		properties: 
			opacity: 1
		time: 0.75
		
	Utils.delay 0.75, ->
		bg.image = currentLayer.image
		
# Create layers
for i in [0..10]
	random = 20 + parseInt(Math.random() * 10)
	url = "https://unsplash.it/" + width + "/" + height + "?image=" + i * random
	url = "images/img" + i + ".png"
	layer = new Layer
		width: width	
		height: height
		image: "#{url}"
		borderRadius: 4
		x: container.midX - width/2 
		y: 0 
		superLayer: container
		
	layer.listIndex = i

	layer.states.add 
		current: {scale:1, opacity:1, x:layer.x}
		nextA: {scale:0.6, opacity:1, x:layer.x + width}
		nextB: {scale:0.4, opacity:1, x:layer.x + (width / 0.6666666) + 30}
		prevA: {scale:0.6, opacity:1, x:layer.x - width }
		prevB: {scale:0.4, opacity:1, x:layer.x - (width / 0.6666666) - 30}
		restA: {scale:0.0, opacity:0, x:layer.x + width*2.5}
		restB: {scale:0.0, opacity:0, x:layer.x - width*2.5}
		
	layer.states.animationOptions = curve: "spring(300,40,0)"
				
	Layers.push(layer)
	
# Staging	
midIndex = (Layers.length-1) / 2
currentIndex = nextLayer = prevLayer = 0
currentLayer = layerAtIndex(currentIndex)
currentIndex = midIndex

updateIndex = ->
	currentLayer = layerAtIndex(currentIndex)
	nextLayer = layerAtIndex(currentIndex+1)
	nextLayerTwo = layerAtIndex(currentIndex+2)
	prevLayer = layerAtIndex(currentIndex-1)
	prevLayerTwo = layerAtIndex(currentIndex-2)

# Delay the background switches	
switchBackground = _.debounce(setBackground, 1000)

switchStates = ->
	updateIndex()
	switchBackground()

	for layer in Layers
		if layer.listIndex < currentIndex 
			layer.states.switch "restB"
		if layer.listIndex > currentIndex 
			layer.states.switch "restA"
	
	if nextLayer 
		nextLayer.states.switch "nextA" 
		nextLayer.placeBefore(nextLayerTwo)
	if nextLayerTwo then nextLayerTwo.states.switch "nextB"
	if prevLayer then prevLayer.states.switch "prevA"
	if prevLayerTwo then prevLayerTwo.states.switch "prevB"
	if currentLayer then currentLayer.states.switch "current"
	
	currentLayer.bringToFront()

switchStates(0)

bg = new BackgroundLayer backgroundColor: "transparent", image: currentLayer.image, scale:1.5, blur:40

# Click
for layer in Layers
	layer.on Events.Click, ->
		currentIndex = this.listIndex
		switchStates()

# Arrow Keys
allowed = true
document.addEventListener 'keydown', (event, layer) ->
	if not allowed then return
		
	allowed = false
	keyCode = event.which
	  
	if event.keyCode is 39 && currentIndex < Layers.length-1
		currentIndex += 1
		switchStates()		
	if event.keyCode is 37 && currentIndex > 0
		currentIndex -= 1
		switchStates()

document.addEventListener 'keyup', ->
  allowed = true
  