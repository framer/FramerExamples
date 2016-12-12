#Setting Up the CameraView
class CameraLayer extends Layer
	
	constructor: (options) ->
		super options
		
		@_video = document.createElement("video")
		@_videoObj = "video":true
		@_canvas = document.createElement("canvas")
		@_canvas.setAttribute("width", @width)
		@_canvas.setAttribute("height", @height)		
		@_ctx = @_canvas.getContext("2d")
		
		@_video.setAttribute("width", @width)
		@_video.setAttribute("height", @height)
		@_video.setAttribute("autoplay", @autoplay)

		@_element.appendChild(@_video)
	
		@_errBack = (error) -> console.log("Video capture Error")
		
		if navigator.webkitGetUserMedia
			
			@_videostream = (localMediaStream) -> 
				
				@_myvideo = document.querySelector("video")
				@_myvideo.src = window.URL.createObjectURL(localMediaStream)

			navigator.webkitGetUserMedia(@_videoObj, @_videostream , @_errBack)

		#Capture Function, Returns Canvas	
		@capture = () ->
			
			@_ctx.drawImage(@_video,0,0,640,480)
			
			return @_canvas

#Basic Layer Setup
bg = new BackgroundLayer backgroundColor:'#eee'
container = new Layer width:640,height:1136, backgroundColor:'#fff', shadowY:5, shadowBlur:15, shadowColor:'rgba(0,0,0,0.5)'
chat1 = new Layer 
	x:0, y:420, width:640, height:122, image:"images/chat2.png"
chat2 = new Layer 
	x:0, y:550, width:640, height:150, image:"images/chat1.png"
chat3 = new Layer 
	x:0, y:726, width:640, height:321, image:"images/chat3.png"
btnsend = new Layer 
	x:0, y:900, width:141, height:140, image:"images/send"
statusbar = new Layer 
	x:0, y:0, width:640, height:128, image:"images/statusbar"
capturecontainer = new Layer x:104,y:15, width:512, height:290, backgroundColor:'transparent'
captureview = new Layer x:0, y:0, width:640, height:480
toolbar = new Layer 
	x:0, y:726, width:640, height:88, image:"images/toolbar"
cameraview = new CameraLayer
	x:0, y:814, width:640, height:480
	
#Relationship of Layers
container.addSubLayer(chat1)
container.addSubLayer(chat2)
container.addSubLayer(chat3)
capturecontainer.addSubLayer(captureview)
chat3.addSubLayer(capturecontainer)
container.addSubLayer(statusbar)
container.addSubLayer(toolbar)
container.addSubLayer(cameraview)
container.addSubLayer(btnsend)
btnsend.centerX()

#Scaling and Positioning
container.scale = 0.5
container.center()

#Event Toggle
captured = ->
	
	chat1.animate
		properties:
		 	y:100
		curve:'spring(100,12,0)'
		
	chat2.animate
		delay:0.05
		properties:
		 	y:230
		curve:'spring(100,12,0)'
	
	chat3.animate
		delay:0.1
		properties:
			y:400
		curve:'spring(100,12,0)'
	
	capturedcanavs = cameraview.capture()
	captureview.image = capturedcanavs.toDataURL('image/webp')

goback = ->
	
	chat1.animate
		properties:
		 	y:420
		curve:'spring(100,12,0)'
		
	chat2.animate
		delay:0.05
		properties:
		 	y:550
		curve:'spring(100,12,0)'
	
	chat3.animate
		delay:0.1
		properties:
			y:800
		curve:'spring(100,12,0)'
	
goback()

toggler = Utils.toggle(captured,goback)

btnsend.on Events.Click, (e) ->
	e.preventDefault()
	movePage = toggler()
	movePage()

