# Made with Framer
# by Jay Stakelon
# www.framerjs.com

# Data for each of the video cards
dataStub = [
		title: "Interstellar"
		date: "November 7, 2014"
		clipURL: "images/interstellar.mov"
	,
		title: "The Hunger Games: Mockingjay, Part 1"
		date: "November 21, 2014"
		clipURL: "images/hungergames.mov"
		shortTitle: "The Hunger Games"
	,
		title: "The Hobbit: Battle of<br/>Five Armies"
		date: "December 19, 2014"
		clipURL: "images/hobbit.mov"
		shortTitle: "The Hobbit"
	,
		title: "Dracula Untold"
		date: "December 26, 2014"
		clipURL: "images/dracula.mov"	
]

# Global reference to currently-selected card
currentCard = null

# Apply format and positioning to a card's overlay text HTML
applyCSS = (layer)->
	h1 = layer.querySelector("h1")
	h1.style.font = "300 52px/62px Helvetica Neue"
	h3 = layer.querySelector("h3")
	h3.style.font = "bold 30px/42px Helvetica Neue"
	h3.style.marginBottom = "12px"
	container = layer.querySelector(".content")
	container.style.position = "absolute"
	container.style.bottom = "6px"
		
# Background setup
bg = new BackgroundLayer
	backgroundColor: "#ffffff"
	
# Feed container setup
container = new Layer
	x: 0, y: 0, width: 640, height: 1136, backgroundColor: null
# Spacer is needed to maintain consistent feed scroll height
containerSpacer = new Layer
	x: 0, y: 0, width: 640, height: 10+(630*dataStub.length), backgroundColor: null
containerSpacer.superLayer = container

# Detail view setup
detailView = new Layer
	x: 0, y: 0, width: 640, height: 2100, backgroundColor: null
detailView.sendToBack()
# Add a placeholder image for detail view content
detailContent = new Layer 
	x:0, y:1000, width:640, height: 1200, image:"images/detail-content.png"
detailContent.superLayer = detailView
detailContent.visible = false
# Create a back button that only shows when detail view is showing
backBtn = new Layer
	x:0, y:0, width: 88, height: 88, backgroundColor: null
backImg = new Layer 
	x:35, y:30, width:17, height:30, image:"images/backbtn.png"
backImg.superLayer = backBtn
backBtn.visible = false
# Tap the back button to transition back to feed from detail view
backBtn.on Events.Click, ()->	
	currentCard.video.player.pause()
	backBtn.visible = false
	exitDetailView(currentCard)
# Create a top bar header only visible when detail view is scrolled up
header = new Layer 
	x:0, y:-47, width:640, height:60, backgroundColor: null
header.visible = false
header.style = 
	font: "300 36px/42px Helvetica Neue"
	textAlign: "center"

# Feed cards setup
setupCard = (dataObj, index)->
	# Create the card layer
	yPos = 10+(630*index)
	card = new Layer
		x: 10, y: yPos, width: 620, height: 630, backgroundColor: null, name: "card"+index
	card.containerY = yPos
	card.titleData = if dataObj.shortTitle then dataObj.shortTitle else dataObj.title
	card.superLayer = container
	# Create and add a video layer to the card 
	cardVideo = new VideoLayer 
 		x:0, y:0, width:620, height:620, video: dataObj.clipURL, name: "video"
 	cardVideo.player.autoplay = false
 	Events.wrap(cardVideo.player).on "ended", ()->
 		cardVideo.player.play()
	cardVideo.superLayer = card
	card.video = cardVideo
	# Create and add the title and date text to the card
	overlay = new Layer
		x: 20, y: 20, width: 580, height: 580, backgroundColor: null, name: "overlay"
	overlay.html = "<div class='content'><h3>"+dataObj.date+"</h3><h1>"+dataObj.title+"</h1></div>"
	applyCSS(overlay)
	overlay.superLayer = card
	card.overlay = overlay
	# Set selected state and bind click handler
	card.isSelected = false
	card.on Events.Click, ()->
		toDetailView @
# For each card object, create a card
Utils.domComplete ->
	setupCard(item, index) for item, index in dataStub 
	container.scrollVertical = true
	
# Detail view drag event setup
# Listen for whether the detail view is dragged up or down
detailView.on Events.DragMove, ()->
	if @y > 0
		# If it's moving down, start animating back to feed
		container.opacity = 0+(@y/500) 
		detailContent.visible = false
		@scale = 1-(@y/5000)
		backBtn.visible = false
		header.visible = false
	else
		# If it's moving up, start animating into text details
		currentCard.overlay.opacity = 1+(@y/300)
		detailContent.visible = true
		backBtn.visible = true
		header.y = -47 + (67 * -@y/880)
		header.visible = true
		
# Determine which state to send detail view into
detailView.on Events.DragEnd, ()->	
	newY = -910
	if @y > 200
		# If it's dragged back toward feed, bail from detail view
		currentCard.video.player.pause()
		backBtn.visible = false
		exitDetailView(currentCard)
	else
		# Otherwise, keep going without exiting
		backBtn.visible = true
		
	# Get ready to snap the detail view one way or another
	if detailView.y > -300
		# If it's pulled down, snap to poster view
		newY = 0
		header.y = -47
		detailContent.visible = true if currentCard.isSelected
		currentCard.overlay.opacity = 1
		currentCard.video.player.play()
	else
		# Or if it's scrolled up, snap into text details
		header.animate
			properties:
				y: 20
			time: .1
		backBtn.visible = false
		currentCard.video.player.pause()
	# Run detail view animation
	detailView.animate
		properties:
			y: newY
			scale: 1
		curve: "spring-rk4"
		curveOptions:
			tension:  200, friction: 25, velocity: 10
	
# Show the detail view	for a card, when selected
toDetailView = (sender)->
	if sender.isSelected == false
		# Set currentCard variable globally
		currentCard = sender
		# Hide the other cards in the scroller
		container.animate
			properties:
				opacity: 0
			time: .25
		# Move the selected card to the frontmost layer, preserving coordinates
		sender.x = sender.screenFrame.x
		sender.y = sender.screenFrame.y
		sender.originalFrame = sender.frame
		sender.superLayer = detailView
		detailView.bringToFront()
		# And animate the detail view in
		toDetail = new Animation
			layer: sender
			properties:
				x: 0
				y: 0
				width: 640
				height: 1000
			curve: "spring-rk4"
			curveOptions:
				tension:  200, friction: 25, velocity: 10
		sender.video.animate
			properties:
				x: 0
				y: 0
				width: 1000
				height: 1000
			curve: "spring-rk4"
			curveOptions:
				tension:  200, friction: 25, velocity: 10
		sender.overlay.animate
			properties:
				height: 960
			curve: "spring-rk4"
			curveOptions:
				tension:  200, friction: 25, velocity: 10
		detailContent.y += 136
		detailContent.visible = true
		detailContent.animate
			properties:
				y: 1000
			curve: "spring-rk4"
			curveOptions:
				tension:  200, friction: 25, velocity: 10
		# Then play the background video
		Utils.delay .1, ()->
			sender.video.player.play()
			container.scrollVertical = false
			backBtn.visible = true
			backBtn.opacity = 0
			backBtn.animate
				properties:
					opacity: 1
				time: .2
			backBtn.bringToFront()
			header.bringToFront()
			detailView.draggable.enabled = true
			detailView.draggable.speedX = 0
		# Start animation, change state, store stuff
		toDetail.start()		
		header.html = sender.titleData		
		sender.isSelected = true
		
# Hide the detail view
exitDetailView = (sender)->
	# Toggle visibilties of content placeholder and feed
	detailContent.visible = false
	container.animate
		properties:
			opacity: 1
		time: .25
	# Resize video back to card-sized
	sender.video.animate
		properties:
			x: 0
			y: 0
			width: 640
			height: 640
		curve: "spring-rk4"
		curveOptions:
			tension:  200, friction: 25, velocity: 10
	# Reset the overlay to initial dimensions
	sender.overlay.animate
		properties:
			height: 580
		curve: "spring-rk4"
		curveOptions:
			tension:  200, friction: 25, velocity: 10
	# Animate the transition back to feed view
	toFeed = new Animation
		layer: sender
		properties:
			x: sender.originalFrame.x
			y: sender.originalFrame.y
			width: 620
			height: 620
		curve: "spring-rk4"
		curveOptions:
			tension:  200, friction: 25, velocity: 10
	toFeed.on Events.AnimationEnd, ()->
		sender.superLayer = container
		sender.x = sender.originalFrame.x
		sender.y = sender.containerY
		container.scrollVertical = true
		detailView.sendToBack()
	toFeed.start()
	sender.isSelected = false