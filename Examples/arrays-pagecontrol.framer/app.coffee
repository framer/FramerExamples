# Page Control Prototype
# Ed Chao

cards = []
dots = []
dotSize = 20
dotMargin = 20
dotOffOpacity = 0.1
scaleVal = 1
screenWidth = 640
screenHeight = 1136
screenMidX = screenWidth/2

# Stack of cards stored in an object
# We'll use the array index to set the dots
stack = [
	{
		title: "First Card"
		color: "#333"
	},{
		title: "Second Card!"
		color: "#444"
	},{
		title: "Third Card"
		color: "#555"
	},{
		title: "Fourthies"
		color: "#666"
	}
]


# Contain card Layers to handle clipping
container = new Layer
	x:0
	y:0
	width:640
	height:1136
	backgroundColor: "#000"
	clip:true

#PAGE DOTS HOLDER
dotWrapper = new Layer
	y: screenHeight * 0.85
	width: stack.length * (dotSize + dotMargin) - dotMargin
	height: dotSize
	backgroundColor: "transparent"
dotWrapper.centerX()

# layout the cards and the dots
[0..stack.length-1].map (i) ->
	
	#PAGE DOTS
	dot = new Layer
		superLayer: dotWrapper
		width: dotSize
		height: dotSize
		borderRadius: 100
		x: i * (dotSize + dotMargin)
		backgroundColor: "#fff"
		opacity: dotOffOpacity
	dot.states.add 
		off: 
			opacity: dotOffOpacity
		on:
			opacity: 1
	dot.states.animationOptions = curve:"spring(900,90,0)"
	dots[i] = dot	
	
	# set first dot
	if i == 0
		dots[i].states.switch "on"
	
	# CARDS
	# set the first card's midX to the screenMidX
	# for cards that aren't the first, set their midX to the right of screen	
	cardMidX = screenMidX
	
	if i > 0
		cardMidX = (screenWidth + screenWidth/2)
	
	card = new Layer
		superLayer: container
		width: 640
		height: 1136
		midX: cardMidX
		backgroundColor: stack[i].color
	card.states.add 
		left:
			midX: -(screenWidth + screenWidth/2)
		mid:
			midX: screenWidth / 2
		right:
			midX: screenWidth + screenWidth/2
	card.states.animationOptions = curve:"spring(800,80,0)"
	card.draggable.enabled = true
	card.draggable.speedY = 0
	Utils.labelLayer card, "card #{i}"
	Utils.labelLayer card.style = {"font-size" : "44px"}
	cards[i] = card

		

	# Card DragEnd sets currentIndex
	cards[i].on Events.DragEnd, ->
		
		#set the current index
		currentIndex = 0
				
		if i == 0
			if cards[i].midX < screenWidth * 0.5
				cards[i].states.switch "left"
				cards[i+1].states.switch "mid"
				currentIndex = i + 1
			if cards[i].midX > screenWidth * 0.5
				cards[i].states.switch "mid"
				currentIndex = i
				
		if i is cards.length - 1
			if cards[i].midX < screenWidth * 0.5
				cards[i].states.switch "mid"
				currentIndex = i
			if cards[i].midX > screenWidth * 0.5
				cards[i].states.switch "right"
				cards[i-1].states.switch "mid"
				currentIndex = i - 1
				
		if i > 0 && i < cards.length - 1
			if cards[i].midX < screenWidth * 0.5
				cards[i].states.switch "left"
				cards[i+1].states.switch "mid"
				currentIndex = i+1
			if cards[i].midX > screenWidth * 0.5
				cards[i].states.switch "right"
				cards[i-1].states.switch "mid"
				currentIndex = i-1
		
		# Color the dot for the current index	
		for dot in dots
			dot.states.switch "off"	
		dots[currentIndex].states.switch "on"	
			
		# change the message according to the current index
		message.html = stack[currentIndex].title

message = new Layer
	x: 100
	y: 40
	midX: screenWidth/2
	width: 400
	height: 100
	backgroundColor: "transparent"
message.html = "This is a page control demo"
message.style = {"text-align": "center", "font-size":"44px", "font-weight":"300", "color": "#c9c9c9", "line-height":"1.2"}
