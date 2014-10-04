# Variables
# -----------------------------------

screenMidX = 640
screenMidY = 1136
screenWidth = screenMidX
screenHeight = screenMidY
cardHeight= screenHeight/5
cardWidth= screenWidth

# Model
# -----------------------------------

model_a = {
	title: "My Todos"
	keys: ['a','b','c','d','e']
}

model_b = [	{
	key:'a' 
	description: 'Go to the market'
	done: true
	color: "rgb(200,210,200)"
	},{
	key: 'b'
	description: 'Eat a strawberry'
	done: false
	color: "rgb(200,110,200)"
	},{
	key: 'c'
	description: 'Tune a guitar'
	done: false
	color: "rgb(200,110,100)"
	},{
	key: 'd'
	description: 'Make a snowman'
	done: false
	color: "rgb(100,210,200)"
	},{
	key: 'e'
	description: 'Watch Bloodsport'
	done: false
	color: "rgb(200,210,100)"
}]


# Layers
# -----------------------------------

bgLayer = new Layer
	x: 0
	y: 0
	width: screenWidth
	height: screenHeight
	backgroundColor: '#e9e9e9'

view_a = new Layer
	x:0
	y:0
	width: screenWidth
	height: screenHeight	
view_a.states.add 
	active:
		x:0
	passive_right: 
		x: screenWidth
	passive_left: 
		x: -screenWidth

view_b = new Layer
	x:screenWidth
	y:0
	width: screenWidth
	height: screenHeight	
view_b.states.add 
	active:
		x:0
	passive_right: 
		x: screenWidth
	passive_left: 
		x: -screenWidth
view_b.states.animationOptions = 
view_a.states.animationOptions = 
	curve:"spring(800,80,0)"


[0..model_a.keys.length-1].map (i) ->
	
	R1 = 240 / i
	G1 = 220 / i
	B1 = 200	

	key = model_a.keys[i]
	layer = new Layer
		superLayer: view_a
		width: cardWidth
		height: cardHeight
		x: 0
		backgroundColor: model_b[i].color
		
	layer.y= i * layer.height
	Utils.labelLayer layer, "Card #{key}"
	
	Utils.labelLayer layer.style = {"font-size":"30px"}
	
	
	layer.on Events.Click, ->
		if model_b[i].key = key
			description = model_b[i].description
			view_b.backgroundColor = model_b[i].color
			view_b.states.switch "active"
			view_a.states.switch "passive_left"
			Utils.labelLayer view_b, "Viewing Card #{key}, #{description}"			
			Utils.labelLayer view_b.style = {"font-size":"24px"}
					
	
		backButton = new Layer
			x: 20
			y: 20
			opacity: 0
			height: 80
			width: 80
			backgroundColor: "#fff"
			borderRadius: 50
			image:"images/back.png"
		
		backButton.animate
			properties:
				opacity: 1
			curve: "spring(600,80,0)"
			
		backButton.on Events.Click, ->
			view_b.states.switch "passive_right"
			view_a.states.switch "active"
			backButton.animate
				properties:
					opacity: 0
				curve: "spring(800,80,0)"
			Utils.delay 0.5,->
				backButton.destroy()
