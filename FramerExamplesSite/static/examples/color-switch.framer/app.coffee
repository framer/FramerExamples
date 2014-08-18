bg = new BackgroundLayer
canvas = new Layer(width:584, height:400, backgroundColor:"#00497F").center()

# Animation
Framer.Defaults.Animation = curve: "spring(260,30,0,0)"

# Card
card = new Layer(width:240, height:240, backgroundColor:"#A8E5FE").center()
card.shadowY = 5
card.shadowBlur = 20
card.shadowColor = "rgba(0,0,0,0.6)"

# Banners
red = new Layer width:240, height:60, backgroundColor:"#F14445", superLayer:card
green = new Layer width:240, height:60, y:-60, backgroundColor:"#98B035", superLayer:card

# Images
error = new Layer(width:86, height:86, image:"images/error.png").centerX().centerY(+20)
check = new Layer(width:86, height:86, image:"images/check.png").centerX().centerY(+20)

# States
red.states.add
	up: {y:-60}
green.states.add
	down: {y:0}
error.states.add
	big: {scale:1}
	small: {scale:0}
check.states.add
	big: {scale:1}
	small: {scale:0}
check.states.switchInstant "small"

# Place behind statement
red.states.on Events.StateWillSwitch, (stateA, stateB) ->
	if stateB is "up"
		red.placeBehind(green)
		error.placeBehind(check)
	else
		green.placeBehind(red)
		check.placeBehind(error)

bg.on Events.Click, ->
	red.states.next()
	green.states.next()
	error.states.next("small", "big")
	check.states.next("big", "small")