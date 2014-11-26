# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

bg = new BackgroundLayer backgroundColor: "#ABE86A"
	
layerA = new Layer width:150, height:150, backgroundColor:"#fff", borderRadius:100
layerA.center()
originX = layerA.x
originY = layerA.y

window.onresize = ->
	layerA.center()
	originX = layerA.x
	originY = layerA.y

layerA.draggable.enabled = true

# Horizontal dragging resistance
layerA.draggable.speedX = 0.5

# Vertical dragging acceleration
layerA.draggable.speedY = 2

# Snap back to origin
layerA.on Events.DragEnd, ->
	layerA.animate 
		properties:
			x: originX,
			y: originY
		curve: "spring(300,18,10)"