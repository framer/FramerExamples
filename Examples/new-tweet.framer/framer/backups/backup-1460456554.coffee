# Made with Framer
# by Claudio Guglieri
# www.framerjs.com

# Importing
psd = Framer.Importer.load "imported/Photoshop_Twitter_Original_150817"
Utils.globalLayers(psd)

# Setup
Framer.Defaults.Animation = 
	curve: "spring(300,30,0)"
	time: 0.4

isHome = true
circles = [Circle0, Circle1, Circle2, Circle3, Circle4]

# Overlay
shadebg = new Layer
	width: Screen.width
	height: Screen.height
	backgroundColor: "black"
	opacity: 0.9

shadebg.placeBehind(Circle0)	

# States
tweet.states.add
	Home: opacity: 1
	Onboard: opacity: 0

BirdX.states.add
	Home: opacity: 0
	Onboard: opacity: 1

shadebg.states.add
	Home: opacity: 0
	Onboard: opacity: 0.8

tweet.states.switchInstant "Home"
BirdX.states.switchInstant "Home"
shadebg.states.switchInstant "Home"

for circle, i in circles

	# Add States
	circle.states.add
		Home:
			opacity: 1
			x: (Screen.width - circle.width) / 2 
			y: tweet.y
			rotationZ: circle.rotationZ

		Onboard:
			opacity: 1
			x: circle.x
			y: circle.y
			rotationZ: circle.rotationZ + 360

	# Switch instant
	circle.states.switchInstant "Home"

# Interaction
bgButton.on Events.Click, ->
	# Switch to onboard
	if isHome	
		tweet.states.switch "Onboard"
		BirdX.states.switch "Onboard"
		shadebg.states.switch "Onboard"

		for circle, i in circles
			circle.states.switch "Onboard", delay: 0.06 * i

		isHome = false

	# Switch back to home
	else	

		tweet.states.switch "Home"
		BirdX.states.switch "Home"
		shadebg.states.switch "Home", delay: 0.3

		for circle, i in circles
			circle.states.switch "Home", delay: 0.06 * i

		isHome = true


