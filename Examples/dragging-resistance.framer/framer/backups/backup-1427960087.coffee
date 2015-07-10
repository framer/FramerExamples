# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

new BackgroundLayer backgroundColor: "#ABE86A"
	
layerA = new Layer width:150, height:150, backgroundColor:"#fff", borderRadius:100
layerA.center()

window.onresize = ->
	layerA.center()

layerA.draggable.enabled = true

# Horizontal dragging resistance
layerA.draggable.speedX = 0.5

# Vertical dragging resistance
layerA.draggable.speedY = 0.5