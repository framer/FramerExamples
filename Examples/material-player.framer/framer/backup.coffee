class CanvasLayer extends Layer
	constructor: (options) ->
		super options
		
		@_canvas = document.createElement("canvas")
		
		@_canvas.setAttribute("width", @width)
		@_canvas.setAttribute("height", @height)
		
		@_element.appendChild(@_canvas)
		
		@_ctx = @_canvas.getContext("2d")

		@_ctx.webkitImageSmoothingEnabled = false
		
	@define "pixelate",
		get: -> @_pixelate or 1
		set: (value) ->
			
			@_pixelate = value
			
			return if not @_canvasLoadedImage
			
			w = @width * value
			h = @height * value
			
			@_ctx.drawImage(@_canvasLoadedImage, 0, 0, w, h)
			@_ctx.drawImage(@_canvas, 0, 0, w, h, 0, 0, @width, @height)
	
	@define "canvasImage",
		get: -> @_canvasImage
		set: (value) ->
			
			@_canvasImage = value
			
			@_image = new Image
			@_image.src = value
			
			@_image.onload = =>
			
				@_canvasLoadedImage = @_image
				@_ctx.drawImage(@_canvasLoadedImage, 0, 0, @width, @height)
				updatecolor(currentindex)

	@define "sourceImage",
		get: -> @_canvasLoadedImage
					
# Audiolayer is simple tweak of videolayer by Koen Bok.
class AudioLayer extends Layer

	constructor: (options={}) ->

		super options

		@player = document.createElement("audio")
		@player.style.width = "100%"
		@player.style.height = "100%"

		@player.on = @player.addEventListener
		@player.off = @player.removeEventListener

		@audio = options.audio

		@_element.appendChild(@player)

	@define "audio",
		get: -> @audio.src
		set: (audio) -> @player.src = audio
		
colorThief = new ColorThief()
bg = new BackgroundLayer 
currentindex = 0

albumArts = ["images/albumArt1.jpg","images/albumArt2.jpg","images/albumArt3.jpg","images/albumArt4.jpg","images/albumArt5.jpg"]
songtitle = ["<h2>SuperModel</h2><br><p>Foster The People</p>","<h2>Halcyon Days</h2><br><p>Ellie Goulding</p>","<h2>In a Perfect World</h2><br><p>Kodaline</p>","<h2>No Fear</h2><br><p>Common</p>","<h2>Lights and Camera</h2><br><p>Yuna</p>"]

container = new Layer x:0, y:0, width:360, height:640, backgroundColor:'transparent',shadowY:4,shadowBlur:15,shadowColor:'rgba(0,0,0,0.5)'
thisis = new Layer x:0, y:0, width:360, height:640, backgroundColor:''
player = new CanvasLayer 
	x:0, y:0, width:360, height:360
	
player.canvasImage = albumArts[currentindex]
bg.addSubLayer(container)
container.center()
container.addSubLayer(thisis)
container.addSubLayer(player)

musiccontrol = new AudioLayer width:0, height:0, audio:"audio/music.mp3"

progressbg = new Layer x:0, y:520, width:360, height:4, backgroundColor:'rgba(0,0,0,0.2)'
progressbar = new Layer x:0, y:520, width:0, height:4
metadata = new Layer x:0, y:player.y+player.height, width:360, 
height:160
progressnob = new Layer x:0, y:progressbg.y, width:40,height:30, backgroundColor:'transparent'
metadata.html = songtitle[currentindex]
metadata.style = 
	fontFamily:'Roboto'
	fontSize:'16px'
	color:'#fff'
	padding:'30px 0px 0px 15px'
	lineHeight:'0.8'
	fontWeight:'400'
	
playlist = new Layer x:0, y:progressbar.y+progressbar.height, width:360, height:100, backgroundColor:'#fff'
playlist.html = "Up Next"
playlist.style = 
	fontFamily:'Roboto'
	fontSize:'13px'
	color:'#aaa'
	padding:'20px 0px 0px 15px'
	lineHeight:'0.8'
	fontWeight:'400'

	
fabbtn = new Layer x:0, y:0, width:65,height:65, borderRadius:'40px', backgroundColor:'#f0f0f0',shadowY:4,shadowBlur:15,shadowColor:'rgba(0,0,0,0.5)'
btnshuffle = new Layer x:0, y:0, width:20, height:21, image:'images/btnshuffle.png'

fabbtn.addSubLayer(btnshuffle)
btnshuffle.centerX()
btnshuffle.centerY()

controller = new Layer x:0, width:360, height:54, backgroundColor:'rgba(0,0,0,0.3)'

icnpause = new Layer 
	x:0, y:0, width:48, height:48, image:"images/icnpause.png"
icnplay = new Layer 
	x:0, y:0, width:48, height:48, image:"images/icnplay.png"	
control = new Layer 
	x:0, y:0, width:48, height:48, backgroundColor:'transparent'

btnnext = new Layer 
	x:0, y:0, width:48, height:48, image:"images/icnnext.png"
btnprev = new Layer 
	x:0, y:0, width:48, height:48, image:"images/icnprev.png"	
icnpause.opacity = 0
icnpause.scale = 0

container.addSubLayer(progressnob)
container.addSubLayer(progressbg)
container.addSubLayer(progressbar)
container.addSubLayer(metadata)
container.addSubLayer(playlist)


controller.addSubLayer(control)
controller.addSubLayer(icnpause)
controller.addSubLayer(icnplay)
controller.addSubLayer(btnnext)
controller.addSubLayer(btnprev)
container.addSubLayer(controller)

btnprev.centerY()
btnnext.centerY()
btnnext.x = 260
btnprev.x = 51
control.center()
icnpause.center()
icnplay.center()
controller.y = metadata.y+metadata.height-54
isplaying = false

updatecolor = (e) ->
	player.opacity = 0.5
	
	player.animate
		properties:
			opacity:1
		curve:'spring(100,12,0)'
				
	palette = colorThief.getPalette(player.sourceImage,20)
	colorone = palette[0]
	colortwo = palette[12]
	colorthr = palette[3]
	colorfor = palette[12]
	colorfiv = palette[2]
	
	if colorthr[0]+colorthr[1]+colorthr[2] > 500
		metadata.style = color:'#000'
		
	else 
		metadata.style = color:'#fff'
				
	metadata.opacity = 0.5
		
	metadata.animate
		properties:
			opacity:1
		curve:'ease'
		time:0.6

	bg.backgroundColor = 'rgb('+colorfiv[0]+','+colorfiv[1]+','+colorfiv[2]+')'
	thisis.backgroundColor = 'rgb('+colorone[0]+','+colorone[1]+','+colorone[2]+')'
	progressbar.backgroundColor = 'rgb('+colortwo[0]+','+colortwo[1]+','+colortwo[2]+')'
	metadata.backgroundColor = 'rgb('+colorthr[0]+','+colorthr[1]+','+colorthr[2]+')'
	fabbtn.backgroundColor = 'rgb('+colorfor[0]+','+colorfor[1]+','+colorfor[2]+')'
	
musiccontrol.player.on "timeupdate", ->
	
	progress = musiccontrol.player.currentTime/musiccontrol.player.duration
	progressnob.x = progress*640
	progressbar.width = progressnob.x+progressnob.width

progressnob.draggable.enabled = true
progressnob.draggable.speedY = 0

progressnob.on Events.DragStart, ->
		# musiccontrol.player.pause()
		musiccontrol.player.load()
	
		progressbar.width = Math.round(progressnob.x+progressnob.width)

		
myprogress = 0
progressnob.on Events.DragMove, ->
		myprogress = progressnob.x
		progressbar.width = Math.round(myprogress+progressnob.width)
		progressbar.width = Math.round(myprogress.x+progressnob.width)
		
progressnob.on Events.DragEnd, ->
			newpositon = progressnob.x/640*musiccontrol.player.duration
			
			musiccontrol.player.currentTime = newpositon
			# musiccontrol.player.play()
						
			progressbar.animate
				properties:
					width:Math.round(progressnob.x+progressnob.width)
				curve:'spring(100,12,0)'

				icnpause.animate
					properties:
						scale:1
						opacity:1
					curve:'spring(200,12,0)'

				icnplay.animate
					properties:
						scale:0
						opacity:0
					curve:'spring(100,12,0)'
	
btnprev.on Events.Click, ->
	btnprev.scale = 0.8
	btnprev.animate
		properties:
			scale:1
		curve:'spring(100,12,0)'
	
	if currentindex > 0
		currentindex = currentindex-1
	else 
		currentindex = 0
	
	player.canvasImage = albumArts[currentindex]
	metadata.html = songtitle[currentindex]

	progressnob.animate
		properties:	
			x:0
		curve:'spring(100,12,0)'
		
	progressbar.animate
		properties:
			width:0		
		curve:'spring(100,12,0)'
	
btnnext.on Events.Click, ->
	btnnext.scale = 0.8
	btnnext.animate
		properties:
			scale:1
		curve:'spring(100,12,0)'

	if currentindex >= 4
		currentindex = 4
	else
		currentindex++

	player.canvasImage = albumArts[currentindex]
	metadata.html = songtitle[currentindex]

control.on Events.TouchStart, ->
	
	if isplaying == true
		# musiccontrol.player.pause()
		
		icnpause.animate
			properties:
				scale:0
				opacity:0
			curve:'spring(200,12,0)'
		
		icnplay.animate
			properties:
				scale:1
				opacity:1
			curve:'spring(100,12,0)'
		
		isplaying = false
	
	else
		# musiccontrol.player.play()
		icnpause.animate
			properties:
				scale:1
				opacity:1
			curve:'spring(100,12,0)'
		
		icnplay.animate
			properties:
				scale:0
				opacity:0
			curve:'spring(200,12,0)'
			
		isplaying = true
		
statusbar = new Layer 
	x:0, y:0, width:360, height:23, image:"images/statusbar.png"
navand = new Layer 
	x:0, y:0, width:360, height:48, image:"images/navbar-and.png"
	
touchripple = new Layer x:0, y:0, width:65, height:65, backgroundColor:'rgba(255,255,255,0.5)', borderRadius:'40px',opacity:0
fabbtn.addSubLayer(touchripple)
fabbtn.clip = yes

fabbtn.on Events.Click, ->
	shufflenumber = Math.floor(Math.random()*(1+4 - 1))+1
	currentindex = shufflenumber
	player.canvasImage = albumArts[shufflenumber]
	metadata.html = songtitle[shufflenumber]
	
	touchripple.opacity = 1
	touchripple.scale = 0
	
	touchripple.animate
		properties:
			scale:1
			opacity:0
		curve:'ease'
		time:0.2

	btnshuffle.rotation = 180
	
	btnshuffle.animate
		properties:
			rotation:0
		curve:'spring(100,12,0)'
		
	fabbtn.shadowY = 2
	fabbtn.shadowBlur = 8
	fabbtn.shadowColor = 'rgba(0,0,0,0.3)'
	fabbtn.scale = 0.95
		
	Utils.delay 0.3, -> fabbtn.shadowColor = 'rgba(0,0,0,0.5)'
	
	fabbtn.animate
		properties:
			scale:1
			shadowY:4
			shadowBlur:15
		curve:'spring(100,12,0)'

actionbar = new Layer 
	x:15, y:40, width:161, height:20, image:"images/nowplaying.png"		
container.addSubLayer(statusbar)
container.addSubLayer(navand)
container.addSubLayer(actionbar)
container.addSubLayer(fabbtn)
fabbtn.y = 334
fabbtn.x = 288
navand.y = 592