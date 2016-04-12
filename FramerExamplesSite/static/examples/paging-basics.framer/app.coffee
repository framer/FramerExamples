# Set background
bg = new BackgroundLayer 
	backgroundColor: "#7DDD11"

# Create PageComponent
page = new PageComponent 
	width: 300
	height: 200
	x: Align.center
	y: Align.center	
	scrollVertical: false
	borderRadius: 6

# Create layers in a for-loop
for i in [0...3]
	layer = new Layer 
		superLayer: page.content
		width: 200
		height: 200
		x: 210 * i
		backgroundColor: "#fff"
		borderRadius: 6
		opacity: 0.3
	
# Staging
page.snapToNextPage()
page.currentPage.opacity = 1

# Update pages
page.on "change:currentPage", ->
	page.previousPage.animate 
		properties:
			opacity: 0.3
		time: 0.4
		
	page.currentPage.animate 
		properties:
			opacity: 1
		time: 0.4