# Changing layer properties

# A new layer has a set of default properties: a width and 
# height of 100 and a blue color. You can change these, see
# the example Framer Defaults.

layerA = new Layer

# A layer has many properties like width, height,
# backgroundColor, opacity etc. You can find them all in the
# documentation here: http://www.framerjs.com

# You can set any of them on creation like this
layerB = new Layer width:50, height:50, x:50, y:150, backgroundColor:"red"

# You can also set them at any time afterwards
layerC = new Layer width:50, height:50, x:50, y:250, backgroundColor:"green"
layerC.rotation = 10

# Here are some more properties to play with, and you can
# also see how to set multiple properties at once.
layerD = new Layer width:100, height:100, x:150, y:350, backgroundColor:"orange"
layerD.properties = 
	opacity: .50
	scale: 1.2
	rotationX: 45
	rotationZ: 45
	blur: 5
