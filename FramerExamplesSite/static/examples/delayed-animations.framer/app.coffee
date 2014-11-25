# Made with Framer
# by Koen Bok
# www.framerjs.com

rows = 4
cols = 4

size = 60
margin = 50
ballCurve = "spring(300,20,0)"
startDelta = 200

[1..rows].map (a) ->
	[1..cols].map (b) ->
		ball = new Layer
			x: b * (size + margin)
			y: a * (size + margin) + startDelta
			width:  size 
			height: size
			opacity: 0
			borderRadius: 100

		R1 = 200 / cols * a 
		G1 = 200 / rows * b 
		B1 = 255 
		
		ball.style = backgroundColor: "rgba(#{R1},#{G1},#{B1},1)"

		ball.animate 
			properties:
				y: a * (size + margin)
				opacity: 1
			curve: ballCurve
			delay: 0.05 * a + 0.05 * b