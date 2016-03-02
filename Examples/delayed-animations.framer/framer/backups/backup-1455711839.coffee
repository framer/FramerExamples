# Made with Framer
# by Koen Bok
# www.framerjs.com

Screen.backgroundColor = "#7DDD11"

container = new Layer 
	backgroundColor: "transparent"
	width: 600
	height: 600
	clip:false
	
container.center()
window.onresize = -> container.center()
	
# Variables
rows = 4
cols = 4

size = 60
margin = 50
ballCurve = "spring(300,20,0)"
startDelta = 200

# Mapping
[1..rows].map (a) ->
	[1..cols].map (b) ->
		ball = new Layer
			x: b * (size + margin)
			y: a * (size + margin) + startDelta
			backgroundColor: "white"
			size: size
			opacity: 0
			borderRadius: 100
			superLayer: container

		R1 = 200 / cols * a 
		G1 = 200 / rows * b 
		B1 = 255 
		
		ball.animate 
			properties:
				y: a * (size + margin)
				opacity: 1
			curve: ballCurve
			delay: 0.05 * a + 0.05 * b