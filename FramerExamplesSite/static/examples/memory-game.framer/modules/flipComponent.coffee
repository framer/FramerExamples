# Utils = require "../Utils"
# {Layer} = require "../Layer"
# {Events} = require "../Events"

"""
FlipComponent

frontLayer <layer>
backLayer <layer>

flip()
flipToFront()
flipToBack()
"""

class exports.FlipComponent extends Layer

	States =
		Front: "frontState"
		Back:  "backState"
		
	FlipDirection =
		Right:	"right"
		Left:	"left"
		Top:	"top"
		Bottom: "bottom"
		
	constructor: (options = {}) ->
		super
		options = _.defaults options, 
			x: 0
			y: 0
			width: 100
			height: 100
			flipDirection: FlipDirection.Right
			curve: "spring(300, 50, 0)"
			autoFlip: true
			perspective: 1000

		@width = options.width
		@height = options.height

		options.front ?= new Layer(backgroundColor: "white")
		options.back  ?= new Layer(backgroundColor: "#2dd7aa")

		@front = options.front
		@back = options.back

		@perspective = options.perspective
		@style["-webkit-transform-style"] = "preserve-3d"
		@_state = States.Front

		@flipDirection = options.flipDirection

		@autoFlip = options.autoFlip
		@curve = options.curve
		@backgroundColor = null
		@clip = false

		@on Events.Click, ->
			if @autoFlip
				@flip()

		@on "change:width", =>
			@_front.width = @width
			@_back.width = @width
		@on "change:height", =>
			@_front.height = @height
			@_back.height = @height
	
	state: -> return @_state

	@define "front",
		get: -> @_front
		set: (layer) ->
			@_front?.destroy()
			@_front = layer
			@_front.point = {x:0, y:0}
			@_front.width = @width
			@_front.height = @height
			@_front.superLayer = @
			@_front.style.webkitBackfaceVisibility = "hidden"

	@define "back",
		get: -> @_back
		set: (layer) ->
			@_back?.destroy()
			@_back = layer
			@_back.point = {x:0, y:0}
			@_back.width = @width
			@_back.height = @height
			@_back.superLayer = @
			@_back.style.webkitBackfaceVisibility = "hidden"
 	
	@define "flipDirection",
		get: -> @_flipDirection
		set: (direction) ->
			@_flipDirection = direction
			@_back.rotationY = 0
			@_back.rotationX = 0
			@_front.rotationY = 0
			@_front.rotationX = 0
			if @_state == States.Front
				if direction == FlipDirection.Right
					@_back.rotationY = 180
				else if direction == FlipDirection.Left
					@_back.rotationY = -180
				else if direction == FlipDirection.Top
					@_back.rotationX = 180
				else
					@_back.rotationX = -180
			else
				if direction == FlipDirection.Right
					@_front.rotationY = -180
				else if direction == FlipDirection.Left
					@_front.rotationY = 180
				else if direction == FlipDirection.Top
					@_front.rotationX = -180
				else
					@_front.rotationX = 180


	flip: ->
		if @_state == States.Front
			@flipToBack()
		else
			@flipToFront()
		
	flipToFront: ->
		if @_state == States.Back
			@_state = States.Front
			props = {}
			if @flipDirection == FlipDirection.Right
				props.rotationY = 180
			else if @flipDirection == FlipDirection.Left
				props.rotationY = -180
			else if @flipDirection == FlipDirection.Top
				props.rotationX = 180
			else if @flipDirection == FlipDirection.Bottom
				props.rotationX = -180
			@_front.animate
				properties:
					rotationY: 0
					rotationX: 0
				curve: @curve
			@_back.animate
				properties:
					props
				curve: @curve
	
	flipToBack: ->
		if @_state == States.Front
			@_state = States.Back
			props = {}
			if @flipDirection == FlipDirection.Right
				props.rotationY = -180
			else if @flipDirection == FlipDirection.Left
				props.rotationY = 180
			else if @flipDirection == FlipDirection.Top
				props.rotationX = -180
			else if @flipDirection == FlipDirection.Bottom
				props.rotationX = 180
			@_front.animate
				properties:
					props
				curve: @curve
			@_back.animate
				properties:
					rotationY: 0
					rotationX: 0
				curve: @curve