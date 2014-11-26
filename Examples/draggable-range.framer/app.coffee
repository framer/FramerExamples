# Made with Framer
# by Brandon Souba
# www.framerjs.com

bg = new BackgroundLayer 
	backgroundColor: "#A7CAE7"
	
layerA = new Layer y:100, backgroundColor:"#fff", borderRadius:4
layerA.draggable.enabled = true
layerA.draggable.speedY = 0

# Set the thresholds to cross and show them with lines
leftThreshold = 160
rightThreshold = Screen.width - leftThreshold
leftLine = new Layer width:2, x:leftThreshold, height:140, backgroundColor: "#D3E5F3"
rightLine = new Layer width:2, x:rightThreshold, height:140, backgroundColor: "#D3E5F3"

# Add states for left and right & set animation curve
layerA.states.add
	left: {x:80}
	right: {x:Screen.width - layerA.width - 80}
	
layerA.states.switchInstant("left")
layerA.states.animationOptions = 
	curve: "spring(200,20,10)"

# When dragging ends, save the direction it was heading as a variable (via calculateVelocity), stored as strings that match the state names. Then set a boolean variable to true if it has crossed a threshold based on its starting state. If it has crossed a threshold and is still going that direction, switch the state to send it the rest of the way; otherwise, send it back.
layerA.draggable.on Events.DragEnd, ->
	velocityDirection = if layerA.draggable.calculateVelocity().x < 0 then "left" else "right"
	
	thresholdBroken = if layerA.states.current is "left" and layerA.x > leftThreshold then true else false
	
	thresholdBroken = if layerA.states.current is "right" and layerA.maxX < rightThreshold then true else thresholdBroken
	
	if thresholdBroken and velocityDirection isnt layerA.states.current
		layerA.states.switch(velocityDirection)
	else
		layerA.states.switch(layerA.states.current)


# Centering
layerA.centerY()
leftLine.centerY()
rightLine.centerY()

window.onresize = ->
	layerA.centerY()
	leftLine.centerY()
	rightLine.centerY()	
