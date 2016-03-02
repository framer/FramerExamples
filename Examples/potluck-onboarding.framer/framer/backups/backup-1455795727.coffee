PSD = Framer.Importer.load("imported/PotluckOnboarding")

Framer.Defaults.Animation = 
	time: 0.2
	curve: 'spring'
	curveOptions:
		tension: 500
		friction: 35
		velocity: 10

# Set up views to access them later
Artboard = PSD.artboard
IntroSlide = PSD.intro
CardAttach = PSD.cardattach
Card = PSD.card
Convo = PSD.convo
ConvoPopover = PSD.convopopover
HeartCta = PSD.heartcta
HeartCtaHeart = PSD.heartctaheart
CardText = PSD.cardtext
TapPopover = PSD.tappopover
SignupCta = PSD.signupcta
PageControl = PSD.pagecontrol
RefreshButton = PSD.refreshbutton
ConvoClose = PSD.convoclose


# Set up the initial states
Convo.originalFrame = Convo.frame
CardAttach.style =
	borderRadius: '18px'
	overflow: 'hidden'
CardAttach.scale = 280/320
Card.y = 180 - 45
Convo.y = 1136
ConvoPopover.opacity = 0
HeartCta.opacity = 0
CardText.opacity = 0
TapPopover.opacity = 0
SignupCta.opacity = 0
PageControl.opacity = 0
Artboard.width = 640
Artboard.height = 1136
Artboard.clip = true
RefreshButton.opacity = 0

# Intro slide only draggable horizontally
IntroSlide.draggable.enabled = true
IntroSlide.draggable.speedY = 0

# A couple shortcut functions
Layer::fadeIn = ->
	this.animate
		properties: 
			opacity: 1
		curve: 'ease-in-out'
		time: 0.1

Layer::fadeOut = ->
	this.animate
		properties: 
			opacity: 0
		curve: 'ease-in-out'
		time: 0.1

changeScene = (scene) ->			
	switch scene
		when 1 
			# Fade in instructional text
			TapPopover.fadeIn()
			CardText.fadeIn()
		when 2 
			CardAttach.animate properties: scale: 1 # zoom in the attachment
			CardAttach.animate properties: borderRadius: 0 # un-round the borders
			Card.animate properties: y: 0
			Convo.animate properties: y: Convo.originalFrame.y
			TapPopover.fadeOut()
			CardText.fadeOut()
			PageControl.fadeIn()
			Utils.delay 0.6, ->
				ConvoPopover.fadeIn()
		when 3 
			CardAttach.style.borderRadius = '18px'
			ConvoPopover.fadeOut()
			PageControl.fadeOut()
			CardAttach.animate properties: scale: 280/320
			Card.animate properties: y: 180-45
			Convo.animate properties: y: 1136
			Utils.delay 0.6, ->
				HeartCta.fadeIn()
		when 4 
			HeartCta.fadeOut()
			Card.animate properties: x: 640
			SignupCta.fadeIn()
			Utils.delay 0.6, ->
				RefreshButton.animate properties: scale: 1.8, opacity: 1


IntroSlide.on Events.DragEnd, ->

	if IntroSlide.x < -80 
		# Dragged enough, move to the next slide after a delay
		IntroSlide.animate
			properties:
				x: -640
			time: 0.2
			curve: 'ease-out'

		Utils.delay 0.6, ->
			changeScene(1)

	else
		# Not dragged enough, move it back
		IntroSlide.animate
			properties:
				x: 0
			time: 0.2
			curve: 'ease-out'


Card.on Events.Click, -> changeScene(2)
ConvoClose.on Events.Click, -> changeScene(3)
HeartCtaHeart.on Events.Click, -> changeScene(4)
RefreshButton.on Events.Click, -> location.reload()
