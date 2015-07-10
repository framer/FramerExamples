# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

# Sketch Import
sketch = Framer.Importer.load "imported/swipe-n-scroll"

# Set-up ScrollComponent
scroll = new ScrollComponent
	y: 128, superLayer: sketch.content
	width: Screen.width, 
	height: 1334 - 128 - 98
	scrollHorizontal: false
	contentInset: {top:32, bottom:32}
	
scroll.content.draggable.bounceOptions = 
	friction: 40, tension: 300, tolerance: 1

# Define Scroll Content
height = 400
margin = 32

# Array that will store our layers
allLayers = []

# Generate a set of layers
for i in [0...8]
	layer = new Layer 
		backgroundColor: "#fff", borderRadius: 8
		width: scroll.width - 48, height: height 
		x: 24, y: (height + margin) * i 
		superLayer: scroll.content
		
	layer.style = "font-size":"48px", "font-weight":"300", "color":"#333", "lineHeight":"#{height}px", "box-shadow":"0 1px 6px rgba(0,0,0,0.2)"
	
	allLayers.push(layer)

# Set directionLock and threshold
scroll.content.draggable.directionLock = true
scroll.content.draggable.directionLockThreshold = {x:25, y:25}

# Determine horizontal dragging based on direction
scroll.content.draggable.on Events.DirectionLockDidStart, (event) ->
	for layer in allLayers
		if event.x then layer.draggable.enabled = false
		if event.y then layer.draggable.enabled = true
			
# Define dragging properties & events for all layers
for layer in allLayers	
	layer.draggable.vertical = false
	remove = endAnimation = false
	directionFactor = 1
		
	layer.on Events.DragMove, -> 	
		if Math.abs(this.x) > 300 or Math.abs(this.draggable.velocity.x) > 3
			remove = true
			if this.draggable.direction is "left" then directionFactor = -1
			if this.draggable.direction is "right" then directionFactor = 1
			
	layer.on Events.DragEnd, (event) ->	
		# Detect if we're at the bottom of the page
		bottomOfPage = scroll.scrollY > (scroll.content.height - Screen.height)
		endAnimation = if bottomOfPage then true else false
		
		# If we've dragged far enough, remove the layer
		if remove is true
			# Animate & Destroy the layer
			this.animate 
				properties: {x: Screen.width * directionFactor}
				time: 0.2
			
			Utils.delay 0.2, => this.destroy()
					
			for layer in allLayers	
				# If we're removing one of the last layers
				if endAnimation
					Utils.delay 0.2, ->
						scroll.scrollToPoint
							x: 0, y: scroll.scrollY - height - margin*2, true, 
							curve: "spring"	
							curveOptions: {tension:400, friction:30, tolerance:0.01}
							
						scroll.content.once Events.AnimationEnd, ->
							scrollY = scroll.scrollY
							scroll.updateContent()
							scroll.scrollY = scrollY
					
				# Update the position of other layers
				if layer.index > this.index
					layer.animate 
						properties: {y: layer.y - height - margin}
						curve: "spring"
						curveOptions: {tension:400, friction:30, tolerance:0.01}
						delay: 0.2
					
					unless endAnimation
						layer.once Events.AnimationEnd, =>
							scrollY = scroll.scrollY
							scroll.updateContent()
							scroll.scrollY = scrollY
					
			# Reset the remove variable
			return remove = false
			
		# If we haven't dragged far enough, snap back
		else
			this.animate 
				properties: {x: 24}
				curve: "spring(200,40,0)"