## IMPORT 
psd = Framer.Importer.load "imported/Photoshop_Twitter_Original_150817"
Utils.globalLayers(psd)

## VARS
isHome=true
fwidth=Framer.Device.screen.width
fheight=Framer.Device.screen.height
Framer.Defaults.Animation = 
	curve: "spring(300,30,0)"
	time: 0.4

shadebg = new Layer
	width: fwidth
	height: fheight
	backgroundColor:"black"
	opacity:0.8

shadebg.placeBehind(Circle0)	



## STATES 
OptionCircles = [Circle0, Circle1, Circle2, Circle3, Circle4];
# Options
for i in [0...OptionCircles.length]
	OptionCircles[i].opacity=1
	OptionCircles[i].states.add
		Home:{opacity:1, x: (fwidth-OptionCircles[i].width)/2, y:tweet.y, rotationZ: OptionCircles[i].rotationZ}
		Onboard:{opacity:1,x: OptionCircles[i].x, y:OptionCircles[i].y,rotationZ: OptionCircles[i].rotationZ+360}
	OptionCircles[i].states.animationOptions=
		delay:0.06*i
	OptionCircles[i].states.switchInstant("Home")

# Main button
tweet.states.add
	Home:{opacity: 1}
	Onboard:{opacity: 0}
BirdX.states.add
	Home:{opacity: 0}
	Onboard:{opacity: 1}
shadebg.states.add
	Home:{opacity: 0}
	Onboard:{opacity: 0.8}

# Initial State	
tweet.states.switchInstant("Home")
BirdX.states.switchInstant("Home")
shadebg.states.switchInstant("Home")	


##  EVENTS
bgButton.on Events.TouchStart, ->
	if isHome	
		for i in [0...OptionCircles.length]
			OptionCircles[i].states.switch("Onboard")
		tweet.states.switch(["Onboard"])
		BirdX.states.switch(["Onboard"])
		shadebg.states.switch(["Onboard"])

		isHome = false
	else
		for i in [0...OptionCircles.length]
			OptionCircles[i].states.switch("Home")
		tweet.states.switch(["Home"])
		BirdX.states.switch(["Home"])
		shadebg.states.switch(["Home"])
		
		isHome = true


