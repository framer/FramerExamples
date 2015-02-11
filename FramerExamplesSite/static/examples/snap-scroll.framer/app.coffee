

Framer.Device.screen.on Events.MouseOver, ->
	document.body.style.cursor = "none"
	
Framer.Device.screen.on Events.MouseOut, ->
	document.body.style.cursor = "url(framer/images/cursor2.png) 2 2, auto"

# Made with Framer
# by Floris Verloop
# www.framerjs.com

l = Framer.Importer.load "imported/stream"
Framer.Defaults.Animation = curve: "spring(500, 36, 0)"

screenW = Framer.Device.screen.width
screenH = Framer.Device.screen.height
bezier = "cubic-bezier(0.19, 1, 0.22, 1)"



# Classes
# --------------------
class App
	constructor: (@options) ->		
		# Render views and add imported layers to them
		@views =
			stream: new Stream layer: l.Content
			navigation: new Navigation layer: l.Navigation
			detail: new Detail layer: l.Detail
				
		# Placeholder putting the statusbar on top when opening detail view
		@statusbar =
			new Layer
				height: 40
				width: screenW
				backgroundColor: ""
		
		# Describe custom events
		Events.StreamDragStart = 'streamDragStart'
		Events.StreamDragMove = 'streamDragMove'
		Events.StreamDragEnd = 'streamDragEnd'
		Events.OpenDetail = 'openDetail'
		Events.CloseDetail = 'closeDetail'
		
		# Attach custom events to every view
		for key of @views
			@views[key].on(Events.StreamDragStart, @onStreamDragStart)
			@views[key].on(Events.StreamDragMove, @onStreamDragMove)
			@views[key].on(Events.StreamDragEnd, @onStreamDragEnd)
			@views[key].on(Events.OpenDetail, @onOpenDetail)
			@views[key].on(Events.CloseDetail, @onCloseDetail)
		
	onOpenDetail: (layer) =>
		unless @open
			@views.stream.states.next()
			@views.detail.open(layer)
			@views.navigation.open()
			@open = true
	
	onCloseDetail: =>
		@views.stream.states.next()
		@views.detail.close()
		@views.navigation.close()
		@open = false
		
	onStreamDragStart: =>
		@views.navigation.onDragStart()
		@views.stream.registerStartPosition()
		
	onStreamDragMove: (dragged) =>
		@views.navigation.updatePos(dragged)
	
	onStreamDragEnd: =>
		@views.stream.checkThresholdPassed()
		@views.navigation.moveBack() unless @views.stream.thresholdPassed
		@views.stream.move() 
		

class Stream extends Layer
	constructor: (@options) ->
		super @options
		
		@properties =
			height: @options.layer.height
			width: screenW
		
		@states.add
			hidden: {opacity: .5, x: -200}
			
		@states.animationOptions =
			curve: bezier
			time: .6	
		
		# Add imported layer as sublayer
		@options.layer.superLayer = @
		
		@step = 0
		@_enableDragging()		
		@_startListening()
		
	move: -> @animate properties: {y: @step*-screenH}
	registerStartPosition: -> @positionStart = @y
	
	checkThresholdPassed: ->
		
		# The distance need to be dragged to scroll to next/previous
		threshold = screenH/3
		dragged = Math.abs(@y - @positionStart)
		
		# Check if amount draged exceeds threshold
		if dragged > threshold	
			@step++ if @y < @positionStart
			@step-- if @y > @positionStart
			@thresholdPassed = true
		else @thresholdPassed = false
			
	
	_enableDragging: ->	
		# The amount of distance that can be dragged beyond the last item in the stream
		@dragPastEnd = 100
		
		# Space needed to allow full dragging
		@dragHeight = (@options.layer.height-screenH)+@dragPastEnd
		
		# Define dragframe
		bounds = new Layer
			width: screenW
			height: @options.layer.height+@dragHeight
			y: -@dragHeight
			backgroundColor: ""
			
		@draggable.enabled = true
		@draggable.maxDragFrame = bounds.frame
	
	
	_startListening: ->
		@on Events.DragStart, => @emit(Events.StreamDragStart)
		
		@on Events.DragMove, =>
			value = @y - @positionStart
			@emit(Events.StreamDragMove, value)
			
		@on Events.DragEnd, => @emit(Events.StreamDragEnd)
	
		# Attach event emitter to every post
		for post in @options.layer.subLayers
			post.on Events.Click, (e, layer) =>
				# Only do something when there hasn't been dragged
				if @y is @positionStart 
					@emit(Events.OpenDetail, layer)


class Navigation extends Layer
	constructor: (@options) ->
		super @options
		
		@properties =
			width: screenW
			height: 128
			backgroundColor: ""
			
		@options.layer.superLayer = @
		
		@statBar = @options.layer.subLayersByName("statBar")[0]
		@statBarWhite = @statBar.subLayersByName("statBarWhite")[0]
		@statBarBlack = @statBar.subLayersByName("statBarBlack")[0]
		
		for statBar in [@statBarWhite, @statBarBlack]
			statBar.states.add
				show: {opacity: 1}
				hide: {opacity: 0}
				
			statBar.states.animationOptions =
				curve: bezier
				time: .6	
				
		@statBarBlack.states.switchInstant('hide')
		
		
	onDragStart: ->
		@animateStop()
		@positionStart = @y
	
	moveBack: ->
		@animate
			properties: {y: @positionStart}
			
	updatePos: (offset) ->
		minY = -@height
		@maxY = 0
	
		newY = @positionStart + offset
		newY = @minY if newY < @minY
		newY = @maxY if newY > @maxY
	
		@y = newY
		
	open: ->
	
		@statBar.x = 14
		@statBar.y = 13
		
		# Place statusbar in the topmost layer
		@statBar.superLayer = app.statusbar
		
		@statBarWhite.states.switch('hide')
		@statBarBlack.states.switch('show')


	close: ->
		@y = 0
		
		# Put statusbar back in original container
		@statBar.superLayer = @
		
		@statBarWhite.states.switch('show')
		@statBarBlack.states.switch('hide')
		
						
class Detail extends Layer
	
	constructor: (@options) ->
		super @options
			
		@properties =
			width: screenW
			height: screenH
			x: screenW
			
		@states.animationOptions =
			curve: bezier
			time: .6
		
		@states.add
			open: {x: 0}
			closed: {x: screenW}
		
		@options.layer.superLayer = @
			
		@closeHitarea = new Layer
			width: 88
			height: 88
			y: 36
			superLayer: @
			backgroundColor: 'transparant'
			
		@closeHitarea.on Events.Click, => @emit(Events.CloseDetail)
			
		@shotContainer = new Layer
			width: screenW
			height: 563
			y: 128
			x: 0
			superLayer: @
				
	open: (shot) ->
		@shotContainer.image = shot.subLayers[0].image
		@states.switch('open')
		
	close: -> @states.switch('closed')
				
app = new App