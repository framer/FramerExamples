# Made with Framer
# by Tisho Georgiev
# www.framerjs.com

bg = new BackgroundLayer 
	backgroundColor: "#C0C5CF"
	
layer3 = new Layer superLayer: bg, x:-35, y:574, width:634, height:1718, image:"images/layer3.png"
layer2 = new Layer superLayer: bg, x:-62, y:-55, width:750, height:2222, image:"images/layer2.png"
layer1 = new Layer superLayer: bg, x:-62, y:86, width:750, height:1751, image:"images/layer1.png"

# Storing the y position of the last touch on the screen
lastYPosition = 0

# Record y position
bg.on Events.TouchStart, (event) ->
	lastYPosition = Events.touchEvent(event).clientY

# As we slide, we update the lastYPosition and calculate the distance
bg.on Events.TouchMove, (event) ->
	yDelta = lastYPosition - Events.touchEvent(event).clientY
	lastYPosition = Events.touchEvent(event).clientY

	# On every movement, we update the y property
	# Move in opposite direction
	layer1.y += yDelta
	
	# Move in 0.3 times the normal speed
	layer2.y -= yDelta * 0.3
	
	# Move twice as fast
	layer3.y -= yDelta * 2 