# This imports all the layers for "Examples Page - Flow 7" into examplesPageFlow7Layers
examplesPageFlow7Layers = Framer.Importer.load "imported/Examples Page - Flow 7"

# Made with Framer
# by Ed Chao
# www.framerjs.com

# Vars
cardStartPos = 680
imageStartPos = 0
cardHeight = 400
cardWidth = 580
screenMidX = 640
screenHeight = 1136
springVal = 'spring(800,60,0)'
springStiff = 'spring(800,50,0)'
springLoose = 'spring(600,40,0)'
parallaxVal = 6

# BG Layer
bgLayer = new Layer
 x:0, y:0, width:640, height:1136, backgroundColor:'#e9e9e9'
	
bgLayer.clip = true


# Under Layers
info = new Layer
	x:0, y:300, midX:320, width:640, height:188, backgroundColor: 'transparent'
info.html = 'Ed Chao'
info.style = {
	'font-family':'Roboto',
	'font-weight':'400',
	'padding-top':'40px',
	'color': '#777'
	'font-size':'40px',
	'text-align':'center'
}	

logout = new Layer
	x:0, y:390, midX:320, width:640, height:188, backgroundColor: 'transparent'
logout.html = 'Logout'
logout.style = {
	'font-family':'Roboto',
	'font-weight':'400',
	'padding-top':'40px',
	'color': '#777'
	'font-size':'40px',
	'text-align':'center'
}	

profile = new Layer 
	x:0, y:80, midX:320, width:188, height:188, image:"images/profile.png"

info.superLayer = bgLayer
logout.superLayer = bgLayer
profile.superLayer = bgLayer
	
# Main Layers
container = new Layer
 x:0, y:0, width:640, height:1136, backgroundColor:'#000', clip: true
container.shadowColor = 'rgba(0,0,0,0.5)'
container.shadowBlur = 10
container.superLayer = bgLayer
	
imageA = new Layer 
	x:10, y:imageStartPos, midX:screenMidX, width:1709, height:1136, scale:1, superLayer: container, image:"images/3CoEETpvQYO8x60lnZSA_rue.jpg"

imageB = new Layer 
	x:10, y:imageStartPos - screenHeight, midX:screenMidX, scale:1, width:1704, height:1136, superLayer: container, image:"images/EOZpjI3oSqKPNnF2S4Tp_Untitled.jpg"

imageC = new Layer 
	x:10, y:imageStartPos - screenHeight * 2, midX:screenMidX, scale:1, width:1704, height:1136, superLayer: container, image:"images/lUUnN7VGSoWZ3noefeH7_Baker Beach-12.jpg"
	
cardA = new Layer
	x: 0
	y: cardStartPos
	width: cardWidth
	height: cardHeight
	backgroundColor: '#fff'
	opacity: 0.98
	borderRadius: "10px"
	superLayer: container
	image:"images/PA.png"

cardA.centerX()
cardA.shadowColor = 'rgba(0,0,0,0.5)'
cardA.shadowBlur = 20
cardA.draggable.enabled = true
cardA.draggable.speedX = 0
cardA.draggable.speedY = 2

cardB = new Layer
	x: 0
	y: -cardHeight - 40
	width: cardWidth
	height: cardHeight
	backgroundColor: '#fff'
	opacity: 0.98
	borderRadius: "10px"
	superLayer: container
	image:"images/NY.png"

cardB.centerX()
cardB.shadowColor = 'rgba(0,0,0,0.5)'
cardB.shadowBlur = 20
cardB.draggable.enabled = true
cardB.draggable.speedX = 0
cardB.draggable.speedY = 2

cardC = new Layer
	x: 0
	y: -cardHeight - 40
	width: cardWidth
	height: cardHeight
	backgroundColor: '#fff'
	opacity: 0.98
	borderRadius: "10px"
	superLayer: container
	image:"images/SF.png"

cardC.centerX()
cardC.shadowColor = 'rgba(0,0,0,0.5)'
cardC.shadowBlur = 20
cardC.draggable.enabled = true
cardC.draggable.speedX = 0
cardC.draggable.speedY = 2

chevron = new Layer 
	x:500, y:140, width:100, height:90, backgroundColor:'transparent', superLayer: cardC

header = new Layer
	x:0, y:0, width:640, height:200, superLayer: container
header.html = 'Local'
header.style = {
	'font-family':'Roboto',
	'font-weight':'300',
	'background':'linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0) 100%)',
	'padding-top':'40px',
	'color': '#fff'
	'font-size':'40px',
	'text-align':'center'
}

searchModal = new Layer 
	x:0, y:110, width:580,  midX:screenMidX*2, height:995, image:"images/Search.png", superLayer: container
searchModal.shadowColor = 'rgba(0,0,0,0.5)'
searchModal.shadowBlur = 10
	
menu = new Layer 
	x:5, y:10, width:80, height:80, superLayer: container, backgroundColor: 'transparent'

back = new Layer 
	x:40, y:38, width:21, height:35, image:"images/back.png", superLayer: container, 

back.rotationZ = -90
	

# EVENTS 
# ------

# Drill in to Card
chevron.on Events.Click, ->
	searchModal.animate	
		properties: 
			midX: 320
		curve: springLoose
	cardC.animate
		properties:
			midX: -screenMidX*2
		curve: springLoose
	menu.animate
		properties:
			x: -100
		curve: springVal
	back.animate	
		properties: 
			rotationZ: 0
		curve: springVal

# Drill back to Carousel
back.on Events.Click, ->
	searchModal.animate	
		properties: 
			midX: screenMidX*2
		curve: springLoose
	cardC.animate
		properties:
			midX: screenMidX / 2
		curve: springLoose
	menu.animate
		properties:
			x: 10
		curve: springVal
	back.animate	
		properties: 
			rotationZ: -90
		curve: springVal
		
# Card Carousel
cardA.on Events.DragMove, ->
	imageA.animate
		properties:
			y: imageStartPos + (this.y - cardStartPos)/parallaxVal
		time: 0
	imageB.animate
		properties:
			y: imageStartPos - screenHeight + (this.y - cardStartPos)/parallaxVal
		time: 0

cardB.on Events.DragMove, ->
	imageB.animate
		properties:
			y: imageStartPos + (this.y - cardStartPos)/parallaxVal
		time: 0
	imageA.animate
		properties:
			y: screenHeight + (this.y - cardStartPos)/parallaxVal
		time: 0
	imageC.animate
		properties:
			y: imageStartPos - screenHeight + (this.y - cardStartPos)/parallaxVal
		time: 0

cardC.on Events.DragMove, ->
	imageC.animate
		properties:
			y: imageStartPos + (this.y - cardStartPos)/parallaxVal
		time: 0
	imageB.animate
		properties:
			y: screenHeight + (this.y - cardStartPos)/parallaxVal
		time: 0

cardA.on Events.DragEnd, ->
	if this.y < 800
		# Bounce back
		this.animate
			properties:
				y: cardStartPos
			curve: springVal
		cardB.animate
			properties:
				y: -cardHeight - 40
			curve: springVal
		imageA.animate
			properties:
				y: imageStartPos
			curve: springStiff
		imageB.animate
			properties:
				y: imageStartPos - screenHeight
			curve: springStiff		
	else
		# Go up one
		this.animate
			properties:
				y: screenHeight + cardStartPos
			curve: springVal
		cardB.animate
			properties:
				y: cardStartPos
			curve: springVal
		imageA.animate
			properties:
				y: screenHeight + imageStartPos
			curve: springStiff
		imageB.animate
			properties:
				y: imageStartPos
			curve: springStiff

cardB.on Events.DragEnd, ->
	if this.y < 800
		# Bounce back
		if this.y > 400
			this.animate
				properties:
					y: cardStartPos
				curve: springVal
			imageB.animate
				properties:
					y: imageStartPos
				curve: springStiff
			imageA.animate
				properties:
					y: screenHeight
				curve: springStiff
			imageC.animate
				properties:
					y: -screenHeight
				curve: springStiff
		
		else	
			# Go down one
			this.animate
				properties:
					y: -cardHeight - 40
				curve: springVal
			cardA.animate
				properties:
					y: cardStartPos
				curve: springVal
			imageA.animate
				properties:
					y: imageStartPos
				curve: springStiff
			imageB.animate
				properties:
					y: imageStartPos - screenHeight
				curve: springStiff

	else
		# Go up one
		this.animate
			properties:
				y: screenHeight + cardStartPos
			curve: springVal
		cardC.animate	
			properties:
				y: cardStartPos
			curve: springVal
		imageA.animate
			properties:
				y: screenHeight + imageStartPos
			curve: springVal
		imageB.animate
			properties:
				y: screenHeight
			curve: springVal
		imageC.animate
			properties:
				y: imageStartPos
			curve: springStiff

cardC.on Events.DragEnd, ->
	if this.y < 800
		if this.y > 400
			# Bounce back
			this.animate
				properties:
					y: cardStartPos
				curve: springVal
			imageC.animate
				properties:
					y: imageStartPos
				curve: springStiff
			imageB.animate
				properties:
					y: screenHeight
				curve: springStiff
		
		else	
			# Go down one
			this.animate
				properties:
					y: -cardHeight - 40
				curve: springVal
			cardB.animate
				properties:
					y: cardStartPos
				curve: springVal
			imageB.animate
				properties:
					y: imageStartPos
				curve: springStiff
			imageC.animate
				properties:
					y: imageStartPos - screenHeight
				curve: springStiff

	else
			this.animate
				properties:
					y: cardStartPos
				curve: springVal
			imageC.animate
				properties:
					y: imageStartPos
				curve: springStiff	
		
menu.on Events.Click, ->
	if container.scale is 1
		container.draggable.enabled = true
		container.draggable.speedY = 0
		container.originX = 0.5
		container.animate
			properties:
				scale: 0.80
				y: 500
			curve: springVal
		back.animate
			properties:
				rotationZ: 90
			curve: springVal
	else
		container.draggable.enabled = false
		container.animate
			properties:
				scale: 1
				y: 0
			curve: springVal
		back.animate
			properties:
				rotationZ: -90
			curve: springVal
			
# CONTAINER - WHEN SHRUNK 
# ----------------


container.on Events.DragEnd, ->
	container.animate
		properties:
			x: 0
		curve: springVal


