# Made with Framer
# by Jorn van Dijk & Jonas Treub
# www.framerjs.com

# Import
sketch = Framer.Importer.load "imported/weather"

# We put sketch layers in equally named variables
amsterdam = sketch.amsterdam
temperature = sketch.temperature
today = sketch.today
week = sketch.week
weather = sketch.weather
chrome = sketch.chrome

# Today scroll component
todayScroll = ScrollComponent.wrap(today)
todayScroll.scrollVertical = false
todayScroll.originalY = todayScroll.y
todayScroll.propagateEvents = false

# Weather scroll component
weatherScroll = ScrollComponent.wrap(weather)
weatherScroll.scrollHorizontal = false
weatherScroll.directionLock = true

# We create a mask for the week days so it's hidden behind the city name
weekMask = new Layer
	y: week.frame.y + 360
	width: week.frame.width
	height: week.frame.height
	backgroundColor: null
	superLayer: weatherScroll.content

# We put the week layer inside the mask and align it at the top
week.y = 0
week.superLayer = weekMask

# We save the original Y value of the following layers as a property on the layer itself
amsterdam.originalY = amsterdam.y
temperature.originalY = temperature.y
weekMask.originalY = weekMask.y

# A function to snap the main scrollview either to the top or to the position of the today layer
snapToClosestEdge = ->
	yOffset = -weatherScroll.content.y
	if 419 - yOffset > 208
		weatherScroll.scrollToTop()
	else
		weatherScroll.scrollToPoint y:420, x:0

# When the scrollview scrolls the y position of its content layer changes
weatherScroll.content.on "change:y", ->
	
	# The amount scrolled in the y position
	yOffset = -weatherScroll.content.y
	
	# Both the temperature and Amsterdam layer are moved to the top during the first 420 pixels of the Y offset
	amsterdam.y = amsterdam.originalY - Utils.modulate(yOffset, [0, 420], [0, 100], true)
	temperature.y = temperature.originalY - Utils.modulate(yOffset, [0, 420], [0, 100], true)
	
	# The opacity of the temperature and chrome layers change during the first 100 pixels of the Y offset
	temperature.opacity = Utils.modulate(yOffset, [0, 100], [1, 0], true)
	chrome.opacity = Utils.modulate(yOffset, [0, 100], [1, 0], true)
	
	# If the y offset is bigger then 418 we fix the week layermask and move the week layers
	if yOffset > 418
		todayScroll.y = todayScroll.originalY + (yOffset - 418)
		weekMask.y = weekMask.originalY + (yOffset - 418)
		week.y = - yOffset + 419
	# When the y offset is smaller then 418 the today, weekmask and week layers all keep their original y position
	else
		todayScroll.y = todayScroll.originalY
		weekMask.y = weekMask.originalY
		week.y = 0

# When the scrollview is released after a drag the following code is being executed
weatherScroll.content.draggable.on Events.DragEnd, ->
	
	# We check if the scrollview is released before passing the first 419 pixels
	yOffset = -weatherScroll.content.y
	if yOffset > 0 && yOffset < 419
		
		# If we have no velocity we snap to the closest edge
		yVelocity = weatherScroll.velocity.y
		if yVelocity == 0
			snapToClosestEdge()
		# The scrollview has velocity and we want it to snap to the edge it is moving towards
		else if Math.abs(yVelocity) < .8
			if yVelocity < 0
				weatherScroll.scrollToPoint y: 420, x:0
			else
				weatherScroll.scrollToTop()

# When the scrollview stops scrolling and it has not pased the top 419 pixels we snap to the closest edge
weatherScroll.content.on Events.AnimationEnd, ->
	if weatherScroll.velocity.y == 0
		yOffset = -weatherScroll.content.y
		if yOffset > 0 && yOffset < 419
			snapToClosestEdge()