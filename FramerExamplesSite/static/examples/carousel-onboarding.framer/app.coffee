# Made with Framer
# by Josh Puckett
# www.framerjs.com

PSD = Framer.Importer.load "imported/carousel-onboarding"

# Make all the imported layers available on the root
for layerGroupName of PSD
  window[layerGroupName] = PSD[layerGroupName]

for layerGroupName of PSD
  PSD[layerGroupName].originalFrame = window[layerGroupName].frame

# Initial view set up, mainly placing views and setting vars
splashPhone.y = 1100
btnContinue.y = 1100
swipeHint.scale = 1.3
swipeHint.opacity = 0

pic = [pic1, pic2, pic3, pic4, pic5, pic6, btnContinue, splashPhone]
pic1.props = {x:-50, y:800, rotation:10 }
pic2.props = {x:200, y:950, scale:1.4 }
pic3.props = {x:420, y:980, rotation: -3, scale:1.5}
pic4.props = {x:250, y:800, rotation:1, scale:1.4}
pic5.props = {x:80, y:790, rotation:-7, scale:1.4}
pic6.props = {x:430, y:800, rotation:7, scale:1.4}

splashCurve = 'spring(60,12,0)'
welcome.scale = 0 
scrollHint.scale = 1.3 
scrollHint.opacity = 0
shareHint.opacity = 0
shareHint.scale = 0
keepHint.scale = 0
keepHint.opacity = 0
chat1.y = chat1.originalFrame.y + 600
chat2.y = chat2.originalFrame.y + 600

# These are used as checks to make sure we don't have  animations left over running in the animator
splashHintRun = true
scrollHintRun = false
shareHintRun = false
keepHintRun = false

# These are used when scrolling is triggered from a click to ensure that we call the animation only once and the other clicks simply return. The technique is simply to set a var to true, and after the first click on a view, immediately set that var to false
c1 = true	
c2 = true

# Set up swipeHintAnimator for the splash swipe hint bobble, including checks to make sure the animation loop doesn't persist

swipeHintAnimatorRunning = false

swipeHintAnimator = ->

	if splashHintRun is false
		return
	
	if swipeHintAnimatorRunning is true
		return
	
	swipeHintAnimatorRunning = true
	
	swipeHint.y = swipeHint.originalFrame.y
	swipeHint.opacity = 0
	swipeHint.scale = 1.3 

	animationsDoneCounter = 0

	fadeInAnimation = swipeHint.animate 
		properties: {scale: 1, opacity: 1}
		curve: 'ease-in'
		time: 0.2

	fadeInAnimation.on "end", ->
		swipeHint.animate 
			properties: {opacity: 0}
			curve: 'ease-in'
			time: 0.2
			delay: 0.4

	swipeHint.animate 
		properties:
			y: swipeHint.originalFrame.y - 300
		curve: 'linear'
		time: 0.8

	swipeHint.on "end", ->

		animationsDoneCounter++

		if animationsDoneCounter is 3
			swipeHintAnimatorRunning = false
			Utils.delay 0.5, swipeHintAnimator

swipeHintAnimator() 

# On click, animate the splash page, and make sure the animations are only called once (c1)
splash.on Events.Click, ->
	if c1
		c1 = false
		splashHintRun = false
		swipeHint.destroy()
		for i in [0 .. 7]
			pic[i].animate 
				properties:
					x: pic[i].originalFrame.x
					y: pic[i].originalFrame.y
					scale: 1 
					rotation: 0
				curve: splashCurve
		logo.animate 
			properties:
				y: -600
			curve:splashCurve		
	else
		return
	
# Set up scrollHintAnimator for the scroll hint bobble

scrollHintAnimatorRunning = false

scrollHintAnimator = ->

	if scrollHintRun is false
		return
	
	if scrollHintAnimatorRunning is true
		return
	
	scrollHintAnimatorRunning = true
	
	scrollHint.y = scrollHint.originalFrame.y
	scrollHint.opacity = 0
	scrollHint.scale = 1.3 

	animationsDoneCounter = 0

	fadeInAnimation = scrollHint.animate 
		properties: {scale: 1, opacity: 1}
		curve: 'ease-in'
		time: 0.2

	fadeInAnimation.on "end", ->
		scrollHint.animate 
			properties: {opacity: 0}
			curve: 'ease-in'
			time: 0.2
			delay: 0.4

	scrollHint.animate 
		properties:
			y: scrollHint.originalFrame.y - 300
		curve: 'linear'
		time: 0.8

	scrollHint.on "end", ->

		animationsDoneCounter++

		if animationsDoneCounter is 3
			scrollHintAnimatorRunning = false
			Utils.delay 0.5, scrollHintAnimator


# Animate splash view away when Continue is clicked, and bring in scrollarama, and show scrollHintAnimator after the view enters
btnContinue.on Events.Click, ->

	scrollHintRun = true
	
	splashAnimation = splash.animate 
		properties: {y: -1000}
		curve: 'cubic-bezier'
		time: 0.5

	splashAnimation.on 'end', ->
		Utils.delay 0.2, ->
			welcome.animate 
				properties: 
					scale: 1 
				curve: splashCurve
		Utils.delay 3, ->
			welcome.animate 
				properties: 
					scale: 0
					opacity: 0
				curve: splashCurve 
		Utils.delay 3.5, ->
			scrollarama.x = scrollarama.originalFrame.x - 640
			scrollarama.y = scrollarama.originalFrame.y - 1136
			scrollaramEnterAnimation = scrollarama.animate 
				properties:
					y: scrollarama.originalFrame.y
				curve: splashCurve	
			scrollaramEnterAnimation.on 'end', ->
				scrollHintAnimator()
				
# Set up shareHintAnimator for the pulsing bobble over the share button
shareHintAnimator = ->
	if shareHintRun
		shareGrow = shareHint.animate
			properties:
				scale: .8
			curve: 'ease-out'
			time: 1
		shareShrink = shareHint.animate
			properties:
				scale: 1
			curve: 'ease-out'
			time: 1
		shareGrow.on 'end', ->
			if shareHintRun
				shareShrink.start()
			else
				return
		shareShrink.on 'end', ->
			if shareHintRun
				shareGrow.start()
			else
				return
		shareGrow.start()
		
# Scroll all the photos! On click, but only the first click. Also bring in shareHintAnimator when the photo scroll is done.
scrollarama.on Events.Click, ->
	if c2
		c2 = false
		scrollHintRun = false
		shareHintRun = true
		scrollHint.destroy()
		scrollPhotosAnimation = scrollPhotos.animate 
			properties:
				y: scrollPhotos.originalFrame.y - 5234
			# This used to be a spring, but it was buggy, probably because of the huge distance traveled 'spring(22,10,0)'
			curve: 'cubic-bezier'
			time: 3
		scrollDates.animate 
			properties:
				x: scrollDates.originalFrame.x - 1100
			curve: 'cubic-bezier'
			time: 3
		scrollPhotosAnimation.on 'end', ->
			scrollText.animate 
				properties:
					x: scrollText.originalFrame.x - 640
				curve: splashCurve
			shareText.animate 
				properties:
					x: shareText.originalFrame.x - 620
				curve: splashCurve
			shareHint.animate
				properties:
					scale: 1
					opacity: 1
				curve: 'spring(100,10,0)'
			Utils.delay .3, ->
				shareHintAnimator()
	else
		return
	
# Set up keepHintAnimator for the pulsing bobble over the keep button
keepHintAnimator = ->
	if keepHintRun
		keepGrow = keepHint.animate
			properties:
				scale: .8
			curve: 'ease-out'
			time: 1
		keepShrink = keepHint.animate
			properties:
				scale: 1
			curve: 'ease-out'
			time: 1
		keepGrow.on 'end', ->
			if keepHintRun
				keepShrink.start()
			else
				return
		keepShrink.on 'end', ->
			if keepHintRun
				keepGrow.start()
			else
				return
			
# When the share hint is clicked, animate to the next view
shareHint.on Events.Click, ->
	shareHintRun = false
	shareHint.destroy()
	keepHintRun = true
	scrollarama.animate 
		properties:
			x: -640
		curve: splashCurve
	conversations.x = scrollarama.originalFrame.x
	conversations.animate 
		properties:
			x: conversations.x - 640
		curve: splashCurve
	Utils.delay 1.5, ->
		chat1.animate 
			properties:
				y: chat1.originalFrame.y
			curve: splashCurve
	Utils.delay 1.65, ->
		chat2.animate 
			properties:
				y: chat2.originalFrame.y
			curve: splashCurve
	Utils.delay 3, ->
		keepHint.animate
			properties:
				scale: 1
				opacity: 1
			curve: 'spring(100,10,0)'
	Utils.delay 3.3, ->
		keepHintAnimator()

# Go to the final view when the keep hint is clicked
keepHint.on Events.Click, ->
	keepHintRun = false
	keepHint.destroy()
	conversations.animate 
		properties:
			x: -640
		curve: splashCurve
	safe.x = scrollarama.originalFrame.x
	safe.animate 
		properties:
			x: safe.x - 680
		curve: splashCurve	
		

	
