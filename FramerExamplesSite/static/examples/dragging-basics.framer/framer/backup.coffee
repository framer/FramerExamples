bg = new BackgroundLayer backgroundColor: "#97E345"
	
layerA = new Layer 
	width:100, height:100, backgroundColor:"#fff", borderRadius:3
	shadowY:1, shadowBlur:3, shadowColor:"rgba(0,0,0,0.15)"
	
layerA.center()

# Enable dragging
layerA.draggable.enabled = true

# Store current x & y positions
originX = layerA.x
originY = layerA.y

# Add states
layerA.states.add 
	start: {scale:1.2, shadowY:8, shadowBlur:20}
	end: {scale:1, x:originX, y:originY, shadowY:1, shadowBlur:3}

layerA.states.animationOptions = 
	curve: "spring(400,30,0)"

# Switch states
layerA.on Events.DragStart, ->
	this.states.switch "start"
	
layerA.on Events.DragEnd, ->
	this.states.switch "end"