# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

bg = new BackgroundLayer backgroundColor: "#fff"
	
layerA = new Layer width:200, height: 200, image:"images/avatar.png", borderRadius: 150
layerA.style.border = "4px solid #fff"
layerA.style.boxShadow = "0 4px 12px rgba(0,0,0,0.2)"
layerA.center()
originX = layerA.x
originY = layerA.y

window.onresize = ->
	layerA.center()
	originX = layerA.x
	originY = layerA.y

layerA.draggable.enabled = true

# Horizontal dragging resistance
layerA.draggable.speedX = 0.25

# Vertical dragging acceleration
layerA.draggable.speedY = 2

# Snap back to origin
layerA.on Events.DragEnd, ->
	layerA.animate 
		properties:
			x: originX,
			y: originY
		curve: "spring(300,18,10)"