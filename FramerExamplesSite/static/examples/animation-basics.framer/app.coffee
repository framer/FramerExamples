Framer.Device.screen.backgroundColor = "#877DD7"

# Create Layers
layerA = new Layer
	width: 150
	height: 150
	x: Align.center(-90)
	y: Align.center
	backgroundColor: "#fff"
	borderRadius: 6

layerB = new Layer
	width: 150
	height: 150
	x: Align.center(90)
	y: Align.center
	backgroundColor: "#fff"
	borderRadius: 75

# Add states
layerA.states.add
	rotated:
		rotationX: 180
		
layerB.states.add
	rotated:
		borderRadius: 6
		rotation: 90
		
# Every two seconds switch between states
Utils.interval 2, ->
	layerA.states.next()
	
	# Delay the animation for layerB	
	Utils.delay 1, ->
		layerB.states.next()