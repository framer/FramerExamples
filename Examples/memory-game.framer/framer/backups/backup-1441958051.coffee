# Made with Framer
# by Jonas Treub
# www.framerjs.com

# Import the Flip component
{FlipComponent} = require 'flipComponent'

# Setup
amountOfColumns = 4
amountOfRows = 4
tableWidth = 560
tableHeight = 560
backgroundColor = "RGB(255, 194, 44)"
cardFrontColor = "white"
cardBackColor = "black"
characterColor = "white"

# We set a background color
bg = new BackgroundLayer
	backgroundColor: backgroundColor

# Create audio objects
shuffleAudio = new Audio "shuffle.mp3"
flip1Audio = new Audio "flip.mp3"
flip2Audio = new Audio "flip.mp3"

# Global variables
cards = []
pickedCard1 = null
pickedCard2 = null

# Create a table to put cards on
table = new Layer
	width: tableWidth
	height: tableHeight
	backgroundColor: "transparent"
	perspective: 900
	clip: false

# We center the table, also on resize
table.center()
window.onresize = ->
	table.center()

# Function to scale card, used on mouse over
scaleUp = (card) ->
	card.animate
		properties:
			opacity: 1
			scale: .8
		curve: "spring(120, 10, 0)"

# Funtion to tilt card, used on mouse movement
tilt = (card, x, y) ->
	card.animate
		properties:
			rotationX: Utils.modulate(y, [0,1], [-25,25])
			rotationY: Utils.modulate(x, [0,1], [15,-15])
			originX: Utils.modulate(x, [0,1], [.7, .3])
			originY: Utils.modulate(y, [0,1], [.7, .3])
		curve: "ease-out"
		time: .3
	maxShadowOffset = 14
	card.front.animate
		properties:
			shadowY: Utils.modulate(y, [0,1], [maxShadowOffset, -maxShadowOffset])
			shadowX: Utils.modulate(x, [0,1], [maxShadowOffset, -maxShadowOffset])
			shadowBlur: 16
		curve: "ease-out"
		time: .3

# Function to reset card tilt and scale
reset = (card) ->
	card.animate
		properties:
			scale: .7
			rotationX: 0
			rotationY: 0
			originX: .5
			originY: .5
		curve: "ease-out"
		time: .3
	card.front.animate
		properties:
			shadowY: 1
			shadowX: 0
			shadowBlur: 2
		curve: "ease-out"
		time: .3

# Function to remove card from the table
removePickedCards = ->
	for card in [pickedCard1, pickedCard2]
		card.removed = true
		card.animate
			properties:
				scale: .1
				opacity: 0
			curve: "spring(300, 40, 0)"
	pickedCard1 = null
	pickedCard2 = null

# Start memory game function
startGame = ->
	
	# We determine the amount of grid-tiles, if uneven we subtract one so we are left with an even number
	amountOfCards = amountOfColumns * amountOfRows
	if amountOfCards % 2 != 0
		amountOfCards--
	characterString = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"
	charactersArray = characterString.split("")
	characters = []
	for char in charactersArray
		characters.push char
		characters.push char
	characters = characters[0...amountOfCards]
	
	# Determine cards size, depending on table size and amount of rows and columns
	cardHeight = table.height / amountOfRows
	cardWidth = table.width / amountOfColumns
	
	for column in [0...amountOfColumns]
		for row in [0...amountOfRows]
			
			# Get random character from array with random characters
			randomIndex = Math.floor(Math.random() * characters.length)
			randomCharacter = characters.splice(randomIndex, 1)
			character = randomCharacter[0]
			
			# Check if there are any characters left
			if typeof character is "string"
				memoryCard = new FlipComponent
					width: cardWidth
					height: cardHeight
					x: column * cardWidth
					y: row * cardHeight
					scale: .1
					superLayer: table
					opacity: 0
					autoFlip: false
				memoryCard.front.backgroundColor = cardFrontColor
				memoryCard.back.backgroundColor = cardBackColor
					
				# Add memory card to the global cards array
				cards.push(memoryCard)
					
				# Tag the card
				memoryCard.tag = character
				
				# Add shadow to the flipcomponent it's front and back layers
				for layer in [memoryCard.front, memoryCard.back]
					layer.shadowY = 1
					layer.shadowBlur = 2
					layer.shadowColor = "rgba(0,0,0,0.125)"
					layer.borderRadius = 4
				
				# Make cards appear on the table
				shuffleAudio.play()
				memoryCard.animate
					properties:
						scale: .7
						opacity: 1
					delay: ((column + row) / 6) - (Utils.randomNumber() / 5)
					curve: "spring(140, 12, 0)"
				
				# Put character on the back of the flipcomponent
				memoryCard.back.style.textAlign = "center"
				memoryCard.back.style.lineHeight = "#{memoryCard.height}px"
				memoryCard.back.style.fontSize = "#{memoryCard.height * .66}px"
				memoryCard.back.html = memoryCard.tag
				memoryCard.back.style.fontFamily = "Helvetica Neue"
				memoryCard.back.style.fontWeight = 200
				memoryCard.back.color = characterColor
	
	# Add events listeners for all cards
	for layerTile in cards
		
		# Flip logic
		layerTile.on Events.Click, (event, card) ->
			
			# Determine flip direction based on click position and closest edge
			x = event.x - card.screenFrame.x
			y = event.y - card.screenFrame.y
			leftSpace = x / card.width
			rightSpace = 1 - leftSpace
			topSpace = y / card.height
			bottomSpace = 1 - topSpace
			smallest = leftSpace
			cardDir = "left"
			if rightSpace < smallest
				smallest = rightSpace
				cardDir = "right"
			if topSpace < smallest
				smallest = topSpace
				cardDir = "top"
			if bottomSpace < smallest
				smallest = bottomSpace
				cardDir = "bottom"
			
			# Check if pickedCard slot is available and frontside visible, if so flip card
			if pickedCard1 == null && card.state() == "frontState"
				pickedCard1 = card
				pickedCard1.flipDirection = cardDir
				pickedCard1.flipToBack()
				flip1Audio.play()
				reset(card)
			
			# Check if picked card slot available and fronside visible, if so flip card
			else if pickedCard2 == null && card.state() == "frontState"
				pickedCard2 = card
				pickedCard2.flipDirection = cardDir
				pickedCard2.flipToBack()
				flip2Audio.play()
				reset(card)
				
				# Two cards have been picked, after a delay we check if they are equal
				Utils.delay 1, ->
					# Check if cards have the same character
					if pickedCard1.tag == pickedCard2.tag
						removePickedCards()
						
						# Check if all cards are removed
						allCardsRemoved = true
						for card in cards
							if card.removed != true
								allCardsRemoved = false
								continue
						
						if allCardsRemoved
							# Destroy all layers and restart the game
							Utils.delay 2, ->
								for card in cards
									card.destroy()
								cards = []
								startGame()
								
					else
						# Cards don't have equal character so we flip them back
						pickedCard1.flipToFront()
						flip1Audio.play()
						Utils.delay .1, =>
							pickedCard2.flipToFront()
							flip2Audio.play()
							pickedCard1 = null
							pickedCard2 = null

		# If card is not removed, we scale the card
		layerTile.on Events.MouseOver, (event, card) ->
			if card.removed != true
				if card.state() == "frontState"
					scaleUp(card)

		# Reset card style on mouse out
		layerTile.on Events.MouseOut, (event, card) ->
			if card.removed != true
				reset(card)

		# If front of card visible we tilt the card
		layerTile.on Events.MouseMove, (event, card) ->
			if card.state() == "frontState"
				x = event.x - card.screenFrame.x
				y = event.y - card.screenFrame.y
				relX = x / card.width
				relY = y / card.height
				tilt(card, relX, relY)

# On load, we start the game after a 2 second delay
Utils.delay 2, ->
	startGame()
