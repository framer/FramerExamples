# Made with Framer
# by Balraj Chana
# www.framerjs.com

# Create all of the layers and set their properties
bg = new BackgroundLayer backgroundColor: "#242939"

scroll = new ScrollComponent width: Screen.width, height: Screen.height, scrollVertical: false, x: Screen.width + 200, clip: false
	
dialog = new Layer backgroundColor: "rgba(36,41,57,.90)", superLayer: scroll.content, width: scroll.width - 100, height: 1100,
midY: scroll.midY, borderRadius: 20, shadowY: 5, shadowColor: "rgba(0,0,0,.5)", shadowSpread: 0, shadowBlur: 200, x: 50
	
contentBlock = new Layer height: 650, width: Screen.width, backgroundColor: "white", y: Screen.height, borderRadius: 500, opacity: 0, clip: false

fab = new Layer height: 130, width: 130, borderRadius: "50%", x: Screen.width - 200, y: Screen.height - contentBlock.height - 60, scale: 0,
backgroundColor: "#F78A55", shadowY: 5, shadowColor: "rgba(0,0,0,.1)", shadowBlur: 5
fab.draggable.enabled = false

fabIcon = new Layer superLayer: fab, html: '<i class="material-icons" style="font-size: 100px;">chevron_right</i>', height: fab.height,
width: fab.width, backgroundColor: null, x: 16, y: 15

scoreHeadingStyle = superLayer: false, y: Screen.height / 5, backgroundColor: null, maxX: 0, opacity: 0, html: "SF", height: 400,
width: Screen.width, style: "font" : "200 300px/normal 'Titillium Web', sans-serif", "text-align" : "center"
scoreHeading = new Layer scoreHeadingStyle

subHeadingStyle = y: scoreHeading.maxY, x: Screen.width, backgroundColor: null, opacity: 0,
html: "SPACEIN<span style='font-weight:700'>FRAMERS</span>", height: 100, width: Screen.width,
style: "font" : "200 1.1em/normal 'Titillium Web', sans-serif", "text-align" : "center", "letter-spacing" : "20px"
subHeading = new Layer subHeadingStyle
	
chartBgStyle = superLayer: contentBlock, width: contentBlock.width - 200, midX: contentBlock.midX, y: 100, height: 500, backgroundColor: null
chartBg = new Layer chartBgStyle

bars = []
barHeadings = ["LEVEL", "TARGETS", "BALLS"]
barColours = ["#F55F6E", "#F89863", "#F9D259"]
	
for i in [0...3]
	barBg = new Layer superLayer: chartBg, height: 80, width: Screen.width - 200, y: i * 170 + 50, borderColor: "#CADCE6", 
	borderRadius: 10, clip: false
		
	bar = new Layer superLayer: barBg, y: 30, x: 30, height: 20, borderRadius: 100, width: 0, backgroundColor: barColours[i]

	barHeading = new Layer superLayer: barBg, backgroundColor: null, html: barHeadings[i], width: Screen.width, y: - 50,
	style: "font" : "700 1em/normal 'Titillium Web', sans-serif", "letter-spacing" : "10px"
	
	bars.push bar

# Initiate common states for generated layers
contentBlock.states.add slideIn: {y: Screen.height - contentBlock.height, borderRadius: 0, opacity: 1}
contentBlock.states.animationOptions = curve: "spring(300,25,0)"
fab.states.add slideIn: {scale: 1, x: Screen.width - 200}, expand: {scale: 25}, shrinkDown: {scale: 0, y: Screen.height - 200}
fab.states.animationOptions = curve: "spring(300,15,0)", delay: .3
fabIcon.states.add {fadeOut: opacity: 0}
fabIcon.states.animationOptions = time: .5
subHeading.states.add slideIn: {x: 0, opacity: 1}, slideOut: {maxX: 0, opacity: 0}
subHeading.states.animationOptions = curve: "spring(100,15,0)", delay: .1
scoreHeading.states.add slideIn: {x: 0, opacity: 1}, slideOut: {x: Screen.width, opacity: 0}
scoreHeading.states.animationOptions = curve: "spring(100,15,0)"
scroll.states.add slideIn: {x: 0}
scroll.states.animationOptions = curve: "spring(100,15,0)"

# This module defines how the UI is displayed and controlled. The mechanics of the game will dictate the difficulty for each level
ui = do ->
	currentLevel = 0
	mechanics = level: [1,2,3,4,5], speed: [15,12,9,6,3], limit: [25, 28, 31, 34, 37], balls: [10,13,16,19,22], targets: [5,6,7,8,9]
	circles = []
	
	# Generate circles in the background to animate and destroy
	animateBgCircles = ->
		for rowIndex in [0...3]
			for colIndex in [0...5]
				circle = new Layer width: 200, height: 200, borderRadius: "50%", backgroundColor: "hsla(#{Utils.randomNumber()*360},50%,50%,1)", 
				scale: Utils.randomNumber(.2,1), x: colIndex * (200 + Screen.width / 5 - 200) + Screen.width / 5 - 200, y: -250, brightness: 150,
				blur: Utils.randomNumber(0, 40), opacity: Utils.randomNumber(.3, 1), superLayer: bg, clip: false
				
				circles.push circle
					
				circle.animate curve: "linear", time: Utils.randomNumber(5, 20), delay: Utils.randomNumber(.1, 20), 
				properties: y: Screen.height + 200
				
				circle.on "change:y", ->
					spaceInFramers.deleteObjects(@, circles) if @y > Screen.height
					doAgain() if circles.length is 10
				
		doAgain = Utils.throttle 1, -> animateBgCircles()
	
	# Blow circles away from view before the game begins
	animateAway = ->
		for layer, i in circles
			layer.animate time: .4, curve: "ease-in", delay: i * .02, properties: maxX: - 200, scale: 0, opacity: 0
			
			Utils.delay 1, ->
				layer.destroy() for layer in circles
				circles.length = 0
	
	# 	Display, animate and style the UI elements on launch/restart. Level, targets and balls are calculated based on current level
	openState = ->
		styleState(sumResults(mechanics.limit[currentLevel], [mechanics.limit[currentLevel], mechanics.limit[4]],
		[mechanics.balls[currentLevel], mechanics.balls[4]]))
		layer.states.switch "slideIn" for layer in [fab, contentBlock, scoreHeading, subHeading]
	
	styleState = (subHeadingOptions, chartBgOptions, scoreHeadingOptions, barBgOptions, textOptions, barOptions) ->
		options = [ subHeadingDefaultOptions = subHeadingStyle, chartBgDefaultOptions = chartBgStyle, 
		scoreHeadingDefaultOptions = scoreHeadingStyle, barDefaultOptions = x: 30, 
		barBgDefaultOptions = borderWidth: 1, backgroundColor: "rgba(246,250,252,1)", textDefaultOptions = style: "color" : "#6296B2"]
		
		layer.props = arguments[i] ?= options[i] for layer, i in [subHeading, chartBg, scoreHeading]
		
		for bar in bars
			bar.props = barOptions ?= barDefaultOptions
			bar.superLayer.props = barBgOptions ?= barBgDefaultOptions
			text.props = textOptions ?= textDefaultOptions for text in bar.siblingLayers
	
	styleHeading = (color, icon) -> """<span style= 'border-radius: 50%; height: 300px; width: 300px; border: 5px solid #{color}; 
	display: inline-block; line-height: 3.4'><i class="material-icons" style="font-size: 120px;">#{icon}</i></span>"""
	
	# Display the results after the current level is completed
	endState = ->
		styleState(
			{ y: Screen.height - 150 }, { superLayer: dialog, width: dialog.width - 200, maxY: dialog.height - 50 }
			{ superLayer: dialog, width: dialog.width, y: 125, style: "line-height" : "3", "font-size" : "100px" }
			{ borderWidth: 0, backgroundColor: null, width: chartBg.width }, { style: "color" : "white" }, { x: 0 })
		
		animateBgCircles()
		layer.states.switch "slideIn" for layer in [scroll, scoreHeading, subHeading]
		scoreHeading.html = if currentLevel > 0 then styleHeading("#78D17B", "done") else styleHeading("#D05050", "clear")
		subHeading.html = "&#8250; SLIDE TO CONTINUE"
		
		# Determine whether the scroll position is large enough to progress on to the next screen
		scroll.on Events.TouchEnd, ->
			if @scrollX < -200
				@.states.switch "default"
				
				Utils.delay .5, ->
					layer.states.switchInstant("default") for layer in [scoreHeading, subHeading] 
					subHeading.html = "LEVEL #{mechanics.level[currentLevel]}"
					openState()
	
	# Chain animate the UI elements before the game starts
	startCountDown = ->
		fab.animate time: .3, curve: "bezier-curve", properties: midY:Screen.height / 2
		fab.animate time: .3, properties: midX: Screen.width / 2
		fabIcon.states.switch "fadeOut", time: .1
		
		Utils.delay .2, ->
			fab.states.switch "expand", time: .6, curve: "ease"
			scoreHeading.html = 3
			subHeading.html = "LEVEL #{mechanics.level[currentLevel]}"
			
		Utils.delay .5, ->
			layer.states.switch "slideIn" for layer in [scoreHeading, subHeading]

			timing = Utils.interval 1, ->
				scoreHeading.html--
				
				# Start the game when the counter reaches 0
				if scoreHeading.html < 1
					shrinkFab = fab.states.switch "shrinkDown", curve: "ease", time: .4
					shrinkFab.on "end", -> layer.states.switchInstant("default") for layer in [fab, fabIcon]
					
					clearInterval(timing)
					spaceInFramers.startGame(mechanics.speed[currentLevel], mechanics.balls[currentLevel], mechanics.targets[currentLevel],
					mechanics.limit[currentLevel])

	# Determine whether the score is sufficient in order to progress onto the next level, or restart the game from the beginning
	checkLevel = (hits) -> currentLevel = if hits >= mechanics.limit[currentLevel] - 10 then currentLevel + 1 else 0
	
	# Calculate the pre-score results (targets to reach) and post-score results (targets hit)
	sumResults = (hits, misses, balls, callback, chartBgWidth) ->
		chartBgWidth ?= chartBg.width - 60
		levelBar = Utils.modulate(mechanics.level[currentLevel], [0, mechanics.level[4]], [10, chartBgWidth], true)
		targetsBar = Utils.modulate(misses[0], [0, misses[1]], [10, chartBgWidth], true)
		ballsBar = Utils.modulate(balls[0], [0, balls[1]], [10, chartBgWidth], true)
		
		for width, i in [levelBar, targetsBar, ballsBar]
			bars[i].width = 0
			bars[i].animate curve: "spring(100,15,0)", delay: i * .2 + .6, properties: width: width
			
		callback(hits) if callback
	
	# Generate the ripple effect when the FAB is pressed. Mobile and desktop enabled
	rippleEffect = (ev, layer) ->
		cursorX = if not Utils.isDesktop() then layer.draggable.layerCursorOffset.x else ev.offsetX
		cursorY = if not Utils.isDesktop() then layer.draggable.layerCursorOffset.y else ev.offsetY
		
		ripple = new Layer borderRadius: "50%", scale: 0, opacity: 1, superLayer: layer, backgroundColor: layer.backgroundColor, 
		brightness: 150, midX: cursorX, midY: cursorY, force2d: true, index: 0
	
		rippleAnimation = ripple.animate time: 1, properties: scale: layer.width / 50, clip: true, opacity: 0
		rippleAnimation.on "end", -> ripple.destroy()

	fab.on Events.Click, ->
		rippleEffect(event, @, animateAway())
		@ignoreEvents = true
		
		Utils.delay .6, ->
			startCountDown()
			layer.states.switch "default" for layer in [contentBlock, scoreHeading, subHeading]
		
	openState(animateBgCircles())
	sumResults : sumResults, endState : endState, checkLevel : checkLevel

# This module defines the mechanics of the game
spaceInFramers = do ->
	hits = []; activeTargets = []; misses = []; bullets = []; balls = []; allTargets = []
	bulletActive = flag = interval = false
	height = width = Utils.round(Screen.width/7, 0)
	gutter = Screen.width / 5 - width
	
	# Empty arrays and reset layers to their default values. Called after each level is completed
	resetGame = ->
		clearInterval(interval)
		fab.ignoreEvents = flag = false
		fab.backgroundColor = "hsla(#{Utils.randomNumber()*360},50%,50%,1)"
		for arrays in [allTargets, activeTargets, balls, hits, misses, bullets]
			array.destroy() for array in arrays
			arrays.length = 0
	
	# Set the first ball in the array to active and enable draggable constraints
	setActiveBall = (ball) ->
		if balls.length > 1
			ball.props = backgroundColor: "white", shadowY: 10, shadowBlur: 25, shadowColor: "rgba(0,0,0,.7)" unless flag is true
			ball.draggable.props = enabled: true, overdrag: true, constraints: width:Screen.width, height:Screen.height
	
			for inactiveBalls, i in balls[1..balls.length]
				inactiveBalls.animate time: .5, delay: i * .1, properties: x: inactiveBalls.x - 150, scale: (5 - i) / 5, opacity: (5 - i) / 5
	
	pushArray = (layer, array) -> array.push layer if layer not in array
	
	# Delete and remove layer from its associated array
	deleteObjects = (layer, array) ->
		pos = array.indexOf(layer)
		array.splice(pos, 1)
		layer.destroy()
	
	# Calculate the square root of the ball and target positions to determine whether a collision has occured. Animate after impact
	collisionDetection = (target, ball) ->
		dx = (target.x + target.width) - (ball.x + ball.width)
		dy = (target.y + target.width) - (ball.y + ball.width)
		distance = Math.sqrt(dx * dx + dy * dy)
		
		if distance < width
			target.animateStop()
			checkActiveBullet() if target.name is "activeBullet"
			animateBallEnd(ball) if ball.name is "ball"
			animateTargetEnd(target, activeTargets)
			pushArray(target, hits)
	
	# After a collision has occured or the ball is beyond its contraints, animate, destroy and then set the next ball to active
	animateBallEnd = Utils.throttle 1, (ball) ->
		setActiveBall(balls[balls.indexOf(ball) + 1])
		shrinkBall = ball.animate time: .5, properties: scale: 0
		shrinkBall.on Events.AnimationEnd, -> deleteObjects(ball, balls)
	
	# After a collision has occured between the ball and target, animate the target before destroying it
	animateTargetEnd = (target, array) ->
		target.animateStop()
		shrinkTarget = target.animate time: .2, properties: scale: 1.5, opacity: 0
		shrinkTarget.on Events.AnimationEnd, -> deleteObjects(target, array)
	
	# If a collision between a ball and the bullet has occured, change the style of the corresponding ball and enable flag for bullet blast
	checkActiveBullet = ->
		flag = true
		balls[1].props = backgroundColor: "#F55F6E" if balls.length > 1

	# Transform one of the targets into a bullet to enable the bullet blast
	activateBulletBall = _.debounce((-> activeTargets[4].props = 
		borderRadius: "50%", borderWidth: 10, borderColor: "white", backgroundColor: "#F55F6E", brightness: 100, name: "activeBullet"), 5000, true)

	startGame = (mSpeed, mBalls, mTargets, mLimit) ->
		for rowIndex in [0...mTargets]
			for colIndex in [0...5]
				target = new Layer width: width, height: height, borderRadius: "50%", backgroundColor: Utils.randomColor(), 
				scale: Utils.randomNumber(.2,1), x: colIndex * (width + gutter) + gutter / 2, y: - height, brightness: 150
				
				pushArray(target, allTargets)
				target.animate curve: "ease", time: Utils.randomNumber(mSpeed, mSpeed / 2), delay: Utils.randomNumber(1,10),
				properties: y: rowIndex * (height + gutter) + Screen.height
				
				target.on "change:point", ->
					scoreHeading.html = hits.length
					totalScore = hits.length + misses.length
					
					# Listen to objects for collisions and push targets into array when target is visible on screen
					activateBulletBall() if activeTargets.length > 5
					collisionDetection(@, ball) for ball in balls
					collisionDetection(@, bullet) for bullet in bullets if bullets.length > 0
					pushArray(@, activeTargets) if @maxY > 0
					pushArray(@, misses, animateTargetEnd(@, activeTargets)) if @maxY > Screen.height - 500
					
					# End the game if the target score has been reached, pass the score to be displayed and reset the game
					if totalScore >= mLimit - 1
						ui.sumResults(hits.length, [hits.length, mLimit], [balls.length, mBalls],
						ui.checkLevel, chartBg.width - 100)
						layer.states.switch "slideOut" for layer in [scoreHeading, subHeading]
						Utils.delay .5, -> ui.endState()
						resetGame()

		for i in [0...mBalls]
			ball = new Layer x: Screen.width - 100, y: Screen.height - 200, backgroundColor: null, borderWidth: 10, borderColor: "white", 
			name: "ball", borderRadius: "50%", opacity: 0, scale: 0

			pushArray(ball, balls)
			ball.animate curve: "spring(100,15,0)", delay: i * .1, properties: midX: i * 150 + bg.midX, opacity: (5 - i) / 5, scale: (5 - i) / 5
			
			# Delete ball after 1 second after drag start. If activeBullet is set then enable the bulletActive flag for .5 seconds only
			ball.on Events.DragStart, ->
				Utils.delay 1, => animateBallEnd(@)
				if flag
					interval = Utils.interval .5, => 
						bulletActive = true
						@props = backgroundColor: "#78D17B", scale: 1.5
					flag = false
			
			# If the user releases the ball before .5 seconds and the bulletActive is still on, then generate the bullet blast
			ball.on Events.DragEnd,->
				clearInterval(interval)
				@ignoreEvents = true
				
				if bulletActive and @backgroundColor is "#78D17B"
					bulletActive = false
					for i in [0...Math.ceil(activeTargets.length / 2)]
						bullet = new Layer borderRadius: "50%", borderColor: activeTargets[i].backgroundColor, backgroundColor: null, 
						borderWidth: 10, name: "bullet", x: @x, y: @y

						pushArray(bullet, bullets)
						bullet.animate delay: i * .1, properties: x: activeTargets[i].x, y: activeTargets[i].y
						bullet.on Events.AnimationEnd, -> animateTargetEnd(@, bullets)
				
		setActiveBall(balls[0])
	startGame : startGame, deleteObjects: deleteObjects

# UI styling for desktop only
if Utils.isDesktop()
	Framer.DeviceView.Devices["custom"] = "deviceType": "desktop", "screenWidth": 1080, "screenHeight": 1920,
	"deviceImage" : "https://dl.dropboxusercontent.com/u/81188152/Framer/shadow.png",
	"deviceImageWidth": 1280, "deviceImageHeight": 2120; Framer.Device.deviceType = "custom";
	Framer.Device.background.backgroundColor = "#1A1E2A"; Framer.Device.deviceScale = 0.4