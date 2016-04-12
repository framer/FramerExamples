# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

# Set background
Framer.Device.screen.backgroundColor = "#2DD7AA"

# Create ScrollComponent
scroll = new ScrollComponent
	backgroundColor: "rgba(255,255,255,0.2)"
	scrollHorizontal: false
	width: 300
	height: 300
	borderRadius: 8

scroll.x = Align.center
scroll.y = Align.center

# Add spacing
scroll.contentInset = 
	bottom: 10
	
# Create 10 layers
for i in [0..6]
	layer = new Layer
		superLayer: scroll.content
		backgroundColor: "#fff"
		borderRadius: 4
		width: 260
		height: 60
		x: 20
		y: 70 * i
	
	if i == 0
		layer.scale = 0
		
# Listen to the Scroll event
scroll.on Events.Scroll, ->
	# When below -10, animate a layer
	if scroll.scrollY > -10
        scroll.content.subLayers[0].animate 
        	properties: {scale: 1}
        	curve: "spring(400,30,0)"
            