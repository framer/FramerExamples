# Global Values 
mdelay = 0.1
originposition = 800
originposition2 = 1400
animatedposition = 840

canvas = new BackgroundLayer backgroundColor: "#263238"

# Setting up the Layers
bglayer = new Layer x:0, y:0, width:540, height:970, backgroundColor:'#e5e5e5', shadowY:5, shadowBlur:10, shadowColor:'rgba(0,0,0,0.4)'

topbar = new Layer 
	x:0, y:0, width:540, height:232, image:"images/Top Bar.png"
	
contentcard = new Layer 
	x:15, y:250, width:508, height:510, image:"images/card.png"

for count in [0...4]
	smallcard = new Layer 
	x:15+count*129, y:originposition, width:118, height:118, 
	image:"images/card_small.png"
	bglayer.addSubLayer(smallcard)
	
overlaylayer = new Layer width:540, height:970, backgroundColor:'#e5e5e5', opacity:0
container = new Layer x:-205, y:552, width:540, height:300, backgroundColor:'transparent'
documentlayer = new Layer width:540, height:970,backgroundColor:'transparent'
newcard = new Layer x:15, y:980, width:508, height:510, image:"images/card_new.png", rotation:3				
logobase = new Layer width:228, height:228, image:"images/logo.png", scale:0.22
nytlogo = new Layer width:80, height:107, image:"images/nytlogo.png", scale:0.25	

logobase.style.border = "2px solid rgba(0,0,0,0.5)"
logobase.borderRadius = "50%"

# Positioning layers
canvas.addSubLayer(bglayer)
bglayer.addSubLayer(topbar)
bglayer.addSubLayer(contentcard)
bglayer.addSubLayer(overlaylayer)
bglayer.addSubLayer(container)
bglayer.addSubLayer(documentlayer)
bglayer.center()
container.addSubLayer(logobase)
container.addSubLayer(nytlogo)
logobase.center()
nytlogo.center()
documentlayer.addSubLayer(newcard)

smallcards = []

for count in [5...9]
	newsmallcard = new Layer 
		x: 15+(count-5)*129, y:originposition2, width:118, height:118, 
		rotation:8, image:"images/card_small.png"
	smallcards.push newsmallcard
	documentlayer.addSubLayer(newsmallcard)
		
# Animations
clickAmounts = 0
contentcard.on Events.Click,->	
	logobase.animate
		delay: mdelay
		properties:
			x:190
			y:-20
			scale:5
		curve:'spring(50,18,0)'

	nytlogo.animate
		delay:mdelay
		properties:
			x:220
			y:100
			scale:0.5
		curve:'spring(100,12,0)'

	overlaylayer.animate
		properties:
			opacity:1
		curve:'spring(100,12,0)'

	newcard.animate
		properties:
			y:320
			rotation:0
		curve:'spring(50,12,0)'		
			
	container.animate
		delay:mdelay
		properties:
			x:0
			y:0
		curve:'easeInOutCubic'	
		time:0.3
		
	for index, newsmallcard of smallcards
		newsmallcard.animate
			delay: (index * 0.05) + 0.1
			properties:
				y:animatedposition
				rotation:0
			curve:'spring(50,12,0)'

	
			