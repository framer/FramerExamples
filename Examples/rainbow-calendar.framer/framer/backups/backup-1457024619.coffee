# Made with Framer
# by Raphael D'Amico 
# www.framerjs.com 

# Set up constants
screenWidth 	= 375*2
screenHeight 	= 667 * 2
listItemHeight 	= 88
listItemHorizontalPadding = 20
listContainerHeight = listItemHeight*5
globalTint = 'rgba(0,0,0,0.75)'
globalLineTint = 'rgba(200,200,200,0.5)'
globalItemBackground = 'none'
globalListItemTextStyle = {
	fontSize: "32px"
	lineHeight: (listItemHeight-4)+"px"		
	fontFamily: "Helvetica Neue"
	fontWeight: "200"
}
globalDividerItemTextStyle = {
	fontSize: "22px"
	lineHeight: (listItemHeight-4)+"px"		
	fontFamily: "Helvetica Neue"
	fontWeight: "200"
	textTransform: 'uppercase'
}

#CALENDAR WIDGET

FancyMonthWidget = (params)->
	
	# Setup variables
	params = params || {}
	_.defaults params,
		enabled: true
		y: 0
		monthCellWidth: 154
		monthCellHeight: 116
		gutter: 16

	year = 2014
	rows = 4
	cols = 3
	dayCellSize = 20
		
	monthAttributes = []
	@days = []
	@highlightedDayIndex = 30
	
	for month in [0..11]
		baseMoment = moment([year, month, 1])
		monthAttributes.push(
			startDayIndex: parseInt(baseMoment.day()) # 0 is Sunday
			daysInMonth: parseInt(baseMoment.endOf("month").format("D"))
		)
	
	@monthWidget = new Layer
		y: params.y
		width: (cols-1)*params.gutter + cols*params.monthCellWidth
		height: (rows-1)*params.gutter + rows*params.monthCellHeight
		backgroundColor: "none"	
		clip: false
	@monthWidget.centerX()
	@monthWidget.perspective = 100
	
	dayIndex = 0
	monthIndex = 0
	for rowIndex in [0..rows-1]
		for colIndex in [0..cols-1]
		
			monthCellLayer = new Layer
				width:  params.monthCellWidth
				height: params.monthCellHeight
				x: colIndex * (params.monthCellWidth + params.gutter)
				y: rowIndex * (params.monthCellHeight + params.gutter)
				clip: false
				superLayer: @monthWidget
				backgroundColor: "none"
	
			dayCellIndex = 0
			for dayCellRow in [0..4]
				for dayCellCol in [0..6]
					ma =  monthAttributes[monthIndex]
					if (dayCellIndex > ma.startDayIndex) and (dayCellIndex < ma.startDayIndex + ma.daysInMonth)
						dayCell = new Layer
							width: dayCellSize
							height: dayCellSize	
							x: dayCellCol * params.monthCellWidth/7
							y: dayCellRow * params.monthCellHeight/5
							originX: 0
							originY: 0.5
							superLayer: monthCellLayer
							backgroundColor: "rgba(0,255,0,1)"
							saturate: 1
							#borderRadius: 14
							scale: 0.2
						@days.push(dayCell)
						dayCell.hueRotate = dayIndex
						
					dayCellIndex++
					dayIndex++
					
			monthIndex++
	
	@days[0].backgroundColor = "white"
	
	# Zero is the first day of the year
	@highlightDay = (dayToHighlightIndex) ->
		dayToHighlight = @days[dayToHighlightIndex]
		dayToFade = @days[@highlightedDayIndex]
		dayToHighlight.animate
			properties:
				saturate: 100
				scale: 1.54
			curve: "spring(350,35,0)"
		dayToFade.animate
			properties:
				saturate: 0
				scale: 0.2
		@highlightedDayIndex = dayToHighlightIndex

	@highlightRange = (dayToHighlightIndex) ->
		dayToHighlightIndex = Math.min(dayToHighlightIndex, @days.length-1)
		for dayIndex in [0..dayToHighlightIndex]
			@days[dayIndex].animate
				properties:
					saturate: 100
					scaleX: 6
				curve: "spring("+(950-750*dayIndex/dayToHighlightIndex)+",10,0)"
		
		if dayToHighlightIndex < @highlightedDayIndex 
			for dayIndex in [(dayToHighlightIndex+1)..@highlightedDayIndex]
				@days[dayIndex].animateStop()
				@days[dayIndex].animate
					properties:
						saturate: 0
						scaleX: 1
					time: 0.1
				
		@highlightedDayIndex = dayToHighlightIndex
		
	return @

# REUSABLE DATE PICKER
quantize = (input, stepSize) ->
	return Math.floor(input/stepSize) * stepSize

MakeList = (parentDrumLayer, listName, listItems, params) ->
	
	# Setup variables
	@parentDrumLayer = parentDrumLayer
	params = params || {}
	_.defaults params,
		enabled: true
		xPct: 0  				# 0 to 1
		widthPct: 1				# 0 to 1
		textAlign: "center"		# left, center, right
		textPadding: "0"
		textColor: globalTint
	
	# Values derived from params
	listContainerHeight = listItemHeight*5

	# Set up content of list 		
	listItems = listItems
	@name = listName
	@index = 0
	@val = listItems[@index]
	@velocity = 0
	firstTouchAvailable = true    # is this the first touch in a given gesture?
	
	intervalToupdateDrumAppearance = 0
	
	# Calculate height and vertical bounds of the list
	listMinYPos 	= -listItemHeight/2
	listMaxYPos 	= -listItems.length*listItemHeight+listItemHeight/2
	listHeight 		= listItems.length*listItemHeight + listContainerHeight

	@listContainer = new Layer
		x: 					params.xPct * screenWidth
		y: 					0
		width: 				params.widthPct * screenWidth
		height: 			listContainerHeight
		backgroundColor: 	"none"
		superLayer: 		parentDrumLayer
	
	listLayer = new Layer
		x: 					0
		y: 					-listItemHeight/2
		width: 				params.widthPct * screenWidth
		height: 			listHeight
		superLayer: 		@listContainer
		backgroundColor: 	"none"
	
	# listLayer.scroll = true
	listLayer.draggable.enabled = params.enabled
	listLayer.draggable.speedX = 0
	
	for li, i in listItems
		listItemLayer = new Layer
			x: 				0
			y: 				i * listItemHeight + listContainerHeight/2
			width: 			params.widthPct * screenWidth
			height: 		listItemHeight
			superLayer: 	listLayer
			backgroundColor: "none"#Utils.randomColor()
		listItemLayer.html = li
		listItemLayer.style =
			color: 			params.textColor
			fontFamily: 	"Helvetica Neue"
			fontWeight: 	"200"
			fontSize: 		"42px"
			lineHeight: 	listItemHeight+"px"
			textAlign: 		params.textAlign
			padding: 		params.textPadding

		listItemLayer.startY = i * listItemHeight + listContainerHeight/2

	listLayer.on Events.DragMove, =>
		if firstTouchAvailable
			@listContainer.emit("ListStartedMoving", {list: listName, index: @index, value: @val, velocity: 0})
			firstTouchAvailable = false		
			
		updateDrumAppearance()
		
	# To simulate iOS momentum scrolling (which causes the drum to keep spinning 
	# after your finger lifts off it), we trigger an animation the moment you lift
	# your finger. The intensity of this animation is proportional to the speed when
	# of the dragging when your finger was lifted.
	listLayer.on Events.DragEnd, (e, f) =>
		
		# Next touch should trigger ListStartedMoving
		firstTouchAvailable = true
	
		# This calculates the animation
		scrollVelocity = listLayer.draggable.calculateVelocity().y
		timeAfterDrag = (0.5+Math.abs(scrollVelocity*0.2)).toFixed(1)
		finalPositionAfterMomentum = quantize(listLayer.y + scrollVelocity*400, listItemHeight) + listItemHeight/2
		
		# At the top and bottom, the momentum should be adjusted so the 
		# first and last values on the drum don't go too far out of view
		distanceToTravel = finalPositionAfterMomentum - listLayer.y
		listHeightWithoutEndBuffer = -listItems.length*listItemHeight
		bottomOverflow = Math.max(0, listHeightWithoutEndBuffer-finalPositionAfterMomentum )
		topOverflow = Math.max(0, finalPositionAfterMomentum )
		overflowDampening = 10
		
		if bottomOverflow > 0
			finalPositionAfterMomentum = listHeightWithoutEndBuffer - (bottomOverflow / overflowDampening)
			newDistanceToTravel = finalPositionAfterMomentum - listLayer.y
			timeAfterDrag = timeAfterDrag * (newDistanceToTravel/distanceToTravel)

		if topOverflow > 0
			finalPositionAfterMomentum = 40 + (topOverflow / overflowDampening)
			newDistanceToTravel = finalPositionAfterMomentum - listLayer.y
			timeAfterDrag = timeAfterDrag * (newDistanceToTravel/distanceToTravel)

		# Trigger the animation, and schedule an event that will
		# trigger when the drum finally stops spinning.
		listLayer.animate({
				properties: {y: finalPositionAfterMomentum}
				time: timeAfterDrag
				curve: "ease-out"
			})
		Utils.delay timeAfterDrag, ->
			stopDrum()

	# This ensures that during the animation of the list layer, the drum's appearance continues
	# to be updated. Because multiple animations could overlap, we ensure that every new animation
	# ends the interval and starts a new one so that we never have more than one running 
	listLayer.on Events.AnimationStart, ->
		clearInterval(intervalToupdateDrumAppearance)
		intervalToupdateDrumAppearance = Utils.interval 1/30, updateDrumAppearance    

	listLayer.on Events.AnimationEnd, =>		
		clearInterval(intervalToupdateDrumAppearance)

		# Emit after all movement ends in the list
		@listContainer.emit("ListFinishedChanging", {list: listName, index: @index, value: @val})

	updateDrumAppearance = =>
		itemsInDrum = 4
		listPosition = listLayer.y / -listItemHeight - 0.5
		cappedListPosition = Math.max(0, Math.min(listLayer.y / -listItemHeight - 0.5, listItems.length - 1))
		focusItem = Math.round(cappedListPosition)
		distanceFromMiddle = Math.abs(focusItem - cappedListPosition)
		for i in [(focusItem-itemsInDrum)..(focusItem+itemsInDrum)]
			if i >= 0 and i < listItems.length
				listLayer.subLayers[i].opacity = 1 - Math.abs(listPosition - i)/5 - (if (i != focusItem) then 0.3 else 0)
				listLayer.subLayers[i].scaleY = 1 - Math.min(1, Math.abs(listPosition - i)/4)
				listLayer.subLayers[i].y = listLayer.subLayers[i].startY - (i-listPosition)*Math.abs(i-listPosition)*10

		# Update the value of the drum only when a new value is reached
		if (@index != focusItem)
			updateDrumValues(focusItem)
		
	stopDrum = =>
		# Ensure the drum never ends out of bounds
		if listLayer.y > listMinYPos 
			listLayer.animate({
		    	properties: {y:listMinYPos}
		    	curve: "spring(400,50,0)"
			})
		if listLayer.y < listMaxYPos
			listLayer.animate({
				properties: {y: listMaxYPos}
				curve: "spring(400,50,0)"
			})
	
	# Update the values of the drums and invoke the callback 
	updateDrumValues = (newIndex) =>
		@index = newIndex
		@val = listItems[@index]
		@listContainer.emit("ListDidChange", {list: listName, index: @index, value: @val, velocity: listLayer.draggable.calculateVelocity()})
	
	# Render for the first time		
	updateDrumAppearance()
	
	@setIndex = (index) =>
		yPositionForThisIndex = -listItemHeight/2 - (index * listItemHeight)
		listLayer.animate({
				properties: {y: yPositionForThisIndex}
				time: 0.5
				curve: "ease-out"
			})

	@setValue = (val) =>
		index = listItems.indexOf(val)
		if index != -1
			@setIndex(index)

	# Return the drum object so we can access its values
	return @

## GENERATE DATE PICKER DRUM
Picker = (params) ->
	
	params = params || {}
	_.defaults params,
		y: 		0
		width:	screenWidth
		defaultText: ""
		textColor: globalTint

	listContainerHeight = listItemHeight*5

	@pickerContainer = new Layer
		x: 		0
		y:		params.y
		width: 	params.width
		height: listContainerHeight+listItemHeight
		backgroundColor: 	globalItemBackground
			
	@drum = new Layer
		x: 		0
		y: 		listItemHeight
		width: 	params.width
		height: listContainerHeight
		backgroundColor: "none"
		superLayer: @pickerContainer		
		
	@selectedItem = new Layer
		x: 		0
		y: 		listContainerHeight/2 - listItemHeight/2
		width: 	params.width
		height: listItemHeight
		backgroundColor: "none"
		superLayer: @drum

	@pickerContainer.pickerHeader = new Layer
		x: 		0
		y: 		0
		width: 	params.width
		height:	listItemHeight
		backgroundColor: globalItemBackground
		superLayer: @pickerContainer
		
	# Styles
	@drum.style =
		pointerEvents: "none"
# 		borderTop: "1px solid " + globalLineTint
# 		borderBottom: "1px solid " + globalLineTint
	
	@selectedItem.style =
		pointerEvents: "none"
		borderTop: "1px solid rgba(0,0,0,0.3)"
		borderBottom: "1px solid rgba(0,0,0,0.3)"
		
	@pickerContainer.pickerHeader.style = globalListItemTextStyle
	@pickerContainer.pickerHeader.style = 
		color: params.textColor
		paddingLeft: "20px"
		borderTop: "1px solid " + globalLineTint
		borderBottom: "1px solid " + globalLineTint			
	@pickerContainer.pickerHeader.html = params.defaultText
		
		
	# Add lists
	@pickerContainer.lists = []
	@pickerContainer.listsByName = {}
	
	pickerStartedMoving = ()=>
		listValues = {}
		newValues = for list in @pickerContainer.lists
			listValues[list.name] = {index: list.index, val: list.val, velocity: 0}	
		@pickerContainer.emit("PickerStartedMoving" )
		
	pickerDidChange = (e)=>
		listValues = {}
		newValues = for list in @pickerContainer.lists
			listValues[list.name] = {index: list.index, val: list.val, velocity: e.velocity.y}
		@pickerContainer.emit("PickerDidChange", listValues )
	
	pickerFinishedChanging = ()=>
		listValues = {}
		newValues = for list in @pickerContainer.lists
			listValues[list.name] = {index: list.index, val: list.val, velocity: 0}

		@pickerContainer.emit("PickerFinishedChanging", listValues )	
	if (params.lists and params.lists.length > 0)
		for list in params.lists
			newList = new MakeList(@drum, list.name, list.items, list.params)

			## Store lists inside the picker
			@pickerContainer.lists.push(newList)
			@pickerContainer.listsByName[list.name] = newList 

			## Ensure that changes to the list bubble up to the picker
			newList.listContainer.on "ListDidChange", pickerDidChange
			
			## Emit an event when lists stop moving altogether
			newList.listContainer.on "ListFinishedChanging", pickerFinishedChanging

			## Emit an event when lists stop moving altogether
			newList.listContainer.on "ListStartedMoving", pickerStartedMoving

	return @pickerContainer	

# MAKE YOUR STUFF
drumValues = [
	"1 day",
	"2 days",
	"3 days",
	"4 days",
	"5 days",
	"6 days",
	"1 week",
	"2 weeks",
	"3 weeks",
	"4 weeks",
	"5 weeks",
	"6 weeks",
	"7 weeks",
	"8 weeks",
	"9 weeks",
	"10 weeks",
	"11 weeks",
	"12 week",
	"3 months",
	"4 months",
	"5 months",
	"6 months",
	"7 months",
	"8 months",
	"9 months",
	"10 months",
	"11 months",
	"12 months"	
]

pickerY = screenHeight / 1.61803398875
background = new BackgroundLayer
	backgroundColor: 'white'

calendarBackground = new Layer
	width: screenWidth
	height: pickerY
	backgroundColor: "rgba(0,255,0,1)" #'hsla(0,100%,45%,1)'
calendarBackground.brightness = 15
calendarBackground.saturate = 0

fancyMonthWidget = new FancyMonthWidget
	y: 132
	monthCellWidth: 154
	monthCellHeight: 116
	gutter: 26
		
# Second picker
datePicker = new Picker
	y: pickerY
	defaultText: "How long will this take?"
	lists: [
		{items: drumValues, name: "date", params: {textAlign: "center"}}
	]

# Variables to keep track of the picker's speed
# Eventually I'd move these into the picker itself
previousDaysSinceStart = 0
lastTimeThereWasAChange = new Date().getTime()
cumulativeMovesInOneDirection = 0
cumulativeVelocityInOneDirection = 0
pickerDirection = 0
newPickerDirection = 0

elasticZoom = Utils.throttle 1/60, (scale)->
	fancyMonthWidget.monthWidget.animate
		properties:
			scale: 1 + Math.min(0.25, scale) * pickerDirection
		curve: 'spring(200,30,0)'
			
datePickerDidChange = (lists, layer, e) ->

	# Get the date shown in the picker
	# It always starts on the 1st January 2015
	splitDate = lists["date"].val.split(" ")
	today = moment([2015, 0, 1])
	endTime = moment(today).add(splitDate[0], splitDate[1])
	daysSinceStart = endTime.diff(today, "days")
	dayIndex = endTime.dayOfYear()-1
	
	# Calculate how fast picker is moving
	millisecondsSinceLastChange = new Date().getTime() - lastTimeThereWasAChange
	lastTimeThereWasAChange = new Date().getTime()
	pickerVelocity = 1000 / millisecondsSinceLastChange
	
	# Check direction picker is moving to calculate elastic zoom
	newPickerDirection = if daysSinceStart < previousDaysSinceStart then -1 else 1
	if newPickerDirection == pickerDirection
		cumulativeMovesInOneDirection++
		cumulativeVelocityInOneDirection += (pickerVelocity / Math.pow(cumulativeMovesInOneDirection,1.5))
	else 
		cumulativeMovesInOneDirection = 0
		cumulativeVelocityInOneDirection = 0
	pickerDirection = newPickerDirection
	previousDaysSinceStart = daysSinceStart
	
	# Do the elastic zoom
	elasticZoom(cumulativeVelocityInOneDirection/1000)

	date = switch
		when daysSinceStart == 0 then lists["date"].val
		when daysSinceStart < 7 then "By " + endTime.format("dddd")
		when daysSinceStart < 14 then "By next " + endTime.format("dddd")
		when daysSinceStart < 12*7 then "By " + endTime.format("MMMM D, YYYY")
		when daysSinceStart < 366 then "By sometime in " + endTime.format("MMMM, YYYY")
		else "By this time in " + endTime.format("YYYY")
	
	calendarBackground.animate
		properties:
			hueRotate: dayIndex
		curve: 'ease-in-out'
		time: 0.2

	datePicker.pickerHeader.html = date
	fancyMonthWidget.highlightRange(daysSinceStart)


datePickerStartedMoving = ->
	# Brighten background of calendar area
	calendarBackground.animate
		properties:
			brightness: 20
			saturate: 20
		curve: 'spring(100,20,5)'


datePickerFinishedChanging = (lists, layer) ->
	# Put things back where they were
	fancyMonthWidget.monthWidget.animate
		properties:
			scale: 1
		curve: 'spring(100,20,5)'
	calendarBackground.animate
		properties:
			brightness: 15
			saturate: 0
		curve: 'ease-in-out'
		time: 0.4
	

# Set up event listeners
datePicker.on "PickerStartedMoving", datePickerStartedMoving
datePicker.on "PickerDidChange", datePickerDidChange
datePicker.on "PickerFinishedChanging", datePickerFinishedChanging

# Start list on the 6th item
datePicker.listsByName["date"].setIndex(5)