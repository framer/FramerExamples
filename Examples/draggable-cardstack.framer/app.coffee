
#General Variables
scaleVal = 1
screenWidth = 640
screenHeight = 1136
screenMidX = screenWidth / 2
screenMidY = screenHeight / 2


# Card Settings
cardHeight= 800 * scaleVal
cardWidth= 600 * scaleVal

#Debug Layer
debug = new Layer
	width: screenWidth
	height: 100
	backgroundColor: "transparent"
debug.style = {"text-align" : "center", "padding-top" : "30px"}

#Stack
Stack = []
opacityVal = 0.15
zOffset = -80
yOffset = 50

[0..20].map (i) ->

	Card = new Layer
		midX: screenMidX
		midY: screenMidY + (i * yOffset)
		z: zOffset * i
		opacity: 1 - (i * opacityVal)
		width: cardWidth
		height: cardHeight
		backgroundColor: "#fff"
		borderRadius: 20
		shadowBlur: 8
		shadowColor: "rgba(0,0,0,0.4)"
	Card.draggable.enabled = true
	Card.draggable.speedY = 0
	
	Stack[i] = Card
	
	# When Drag ends, figure out whether to slide away or slide back
	# if slide away, then re-position each element in the stack
	Stack[i].on Events.DragEnd, ->
		if Stack[i].midX > (screenWidth * 0.75)
			Stack[i].animate
				properties:
					x: screenMidX * 2.2
				curve: "spring(800,80,0)"
			
			Utils.delay 0.5, ->
				debug.html = "Now on card #{i + 1}"
				[i..Stack.length-1].map (index) ->
					Stack[index].animate
						properties:
							z : ((index-1) * zOffset) + (i * -zOffset)
							midY : screenMidY + ((index-1) * yOffset) - (i * yOffset)
							opacity : (1 - (index * opacityVal) + ((i + 1) * opacityVal))
						curve: "spring(800,80,0)"
		else
			Stack[i].animate
				properties:
					midX: screenMidX
					rotationZ: 0
				curve: "spring(800,80,0)"		
			
	# Add some light rotation behavior			
	Stack[i].on Events.TouchStart, (event) ->
		startX = event.x
		Stack[i].on Events.DragMove, (e) ->
			delta = e.x - startX
			Stack[i].rotationZ = Utils.modulate(delta, [-screenMidX,screenMidX], [-10,10], true)

