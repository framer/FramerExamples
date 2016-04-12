# Made with Framer
# by Benjamin den Boer
# www.framerjs.com 

# Set-up & Sketch Import
sketch = Framer.Importer.load "imported/contacts"
Framer.Device.background.backgroundColor = "#F3F9FF"
Framer.Device.screen.backgroundColor = "#fff"
	
# Create ScrollComponent
scroll = ScrollComponent.wrap(sketch.content)
scroll.scrollHorizontal = false
scroll.contentInset =  {bottom: 200}
	
# Require the module
contacts = require "contacts"

# Store arrays in variables
allNames = []
allLetters = []
allImages = []
allLabels = []
allAvatars = []

# Concatenate & store the names and images
# Push the letters to the array
for letter, people of contacts.people 
	allNames = allNames.concat(people.names)
	allImages = allImages.concat(people.images)
	allLetters.push(letter)

# Create the labels of the scroller
for letter, i in allLetters 
	label = new Layer 	
		x: 80, y: 72 + (720 * i)
		height: 120
		backgroundColor: "transparent"
		superLayer: scroll.content
		
	label.style = 
		"font": "400 72px/1 Roboto, Helvetica Neue"
		"line-height": "#{label.height/2}px"
		"color": "#EF4481"
	
	label.html = letter
	label.position = label.y
	allLabels.push(label)	
	
# All names
for name, i in allNames
	nameLayer = new Layer 
		x: 340
		y: 64 + (168 * i)
		width: 540
		backgroundColor: "#fff"
		superLayer: scroll.content
		clip: false
		
	nameLayer.html = name
	
	nameLayer.style = 
		"font": "400 48px/0.75 Roboto, Helvetica Neue"
		"-webkit-font-smoothing": "antialiased"
		"color": "#666"
		"padding": "24px"
	
	# Avatar images
	avatar = new Layer 
		x: -148, y: -40 + 20
		width: 120, height: 120
		borderRadius: 120
		backgroundColor: "#BDBDBD"
		superLayer: nameLayer 
	
	# Spacing per group
	if i >= 4 and i < 8 then nameLayer.y += 48
	if i >= 8 and i < 12 then  nameLayer.y += (48 * 2)
	if i >= 12 and i < 16 then nameLayer.y += (48 * 3)
	if i >= 16 and i < 20 then nameLayer.y += (48 * 4)
	if i >= 20 and i < 24 then nameLayer.y += (48 * 5)
	if i >= 24 and i < 28 then nameLayer.y += (48 * 6)
	
	allAvatars.push(avatar)
	scroll.updateContent()
	
# Match the avatar with the name
for i in [0...allNames.length]
	if allImages[i]? then allAvatars[i].image = allImages[i]

# Set-up the scroller
slider = new SliderComponent 
	width: 96, height: 1200
	x: Screen.width - 96, y: 400
	min: 0, max: 100, value: 0
	backgroundColor: "#fff"
	clip: false

slider.style.boxShadow = "inset 0 0 0 20px #fff"
slider.fill.backgroundColor = "transparent"
slider.knob.draggable.momentum = false

# Style the knob of the slider
slider.knob.props = 
	width: 10, height: 180
	backgroundColor: "#666"
	borderRadius: 50
	clip: false

# Indicator of scrollbar
indicator = new Layer 
	width: 240, height: 240, image: "images/indicator.png"
	superLayer: slider.knob
	x: slider.knob.x - 320
	y: slider.knob.y - 120
	scale: 0
	
# Style the value
indicator.style = 
	"color" : "#fff"
	"font" : "400 120px/#{indicator.height}px Roboto"
	"text-align" : "center"
	
indicator.html = "A"

# Set origin to animate from the bottom-right corner
indicator.originY = indicator.originX = 1

# States
indicator.states.add(hide: {scale: 0, opacity: 0}, show: {scale: 1, opacity: 1})
indicator.states.animationOptions = curve: "spring(600,40,0)"

# Visualize the letters
slider.knob.on Events.DragStart, ->
	this.backgroundColor = "#3E50B4"
	this.subLayers[0].states.switch "show"
	if slider.knob.y < 0 then indicator.y = - slider.knob.y - 150
		
slider.knob.on Events.DragEnd, ->
	this.backgroundColor = "#666"
	this.subLayers[0].states.switch "hide"
		
# Round numbers to a set amount
round = (number, nearest) -> Math.round(number / nearest) * nearest
nearest = 720

showSections = ->
	# Sections by letter
	if scroll.scrollY >= 0 then indicator.html = "A"
	if scroll.scrollY >= nearest then indicator.html = "B"
	if scroll.scrollY >= nearest * 2 then indicator.html = "C"
	if scroll.scrollY >= nearest * 3 then indicator.html = "D"
	if scroll.scrollY >= nearest * 4 then indicator.html = "E"
	
	# When scrolled to bottom
	if slider.value > 92 then indicator.html = "F"
	if slider.value > 97 then indicator.html = "G"


# Connect scrolling to the slider
activeSlider = false
slider.onTapStart -> activeSlider = true
slider.onTapEnd -> activeSlider = false

slider.on "change:value", ->			
	scrollValue = Utils.modulate(this.value, [0, 100], [0, scroll.content.height - scroll.height + 320], true)
	if activeSlider then scroll.scrollY = round(scrollValue, nearest)
	showSections()

	# When sliding all the way to the top
	if slider.knob.y < 0 then indicator.y = - slider.knob.y - 150
	else indicator.y = - 150

# Connect the slider to the scroll event
scroll.on Events.Move, ->
	slider.value = slider.valueForPoint(scroll.scrollY / 3)
	showSections()
	
# Sticky Labels	
scroll.content.on "change:y", ->
	scrollY = scroll.scrollY
	for label in allLabels 
		
		if scrollY > label.position - 72
			label.y = label.position + scrollY
			
			if scrollY > label.position + (495 - 72) then label.y = label.position + 495
			else label.y = label.position + (scrollY - label.position + 72)
		
		else label.y = label.position	