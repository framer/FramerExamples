# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

# Set background
bg = new BackgroundLayer 
	backgroundColor: "#2DD7AA"

# Create ScrollComponent
scroll = new ScrollComponent
	backgroundColor: "rgba(255,255,255,0.2)"
	scrollHorizontal: false
	width: 220
	height: 220
	borderRadius: 8

scroll.center()

# Add spacing
scroll.contentInset = 
	top: 80
	bottom: 10

newLayer = new Layer
		superLayer: scroll.content
		backgroundColor: "#fff"
		borderRadius: 4
		width: 200
		height: 60
		x: 10
		y: 70 * i
# Create 10 layers
for i in [0..6]
	layer = new Layer
		superLayer: scroll.content
		backgroundColor: "#fff"
		borderRadius: 4
		width: 200
		height: 60
		x: 10
		y: 70 * i
		
	# Listen to the Scroll event
	scroll.on Events.Scroll, ->
	
	    # When below -10, animate a layer
	    if scroll.scrollY < -10
	        newLayer.animate 
	            properties: {scale: 1}
	            curve: "spring(400,30,0)"