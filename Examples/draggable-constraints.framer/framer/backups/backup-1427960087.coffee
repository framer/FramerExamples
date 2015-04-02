# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

new BackgroundLayer backgroundColor: "#97E345"
	
# Create layer
layerA = new Layer y:100, backgroundColor:"#fff", borderRadius:4
layerA.draggable.enabled = true
layerA.center()

# Visualize the constraints
contraints = new Layer width:400, height:400, backgroundColor: "rgba(255,255,255,0.3)", borderRadius:4
contraints.center()

# Set the constraints frame (x, y, width, height)
layerA.draggable.constraints = contraints.frame