# Made with Framer
# by Benjamin den Boer
# www.framerjs.com

# Import
sketch = Framer.Importer.load "imported/video-player"
new BackgroundLayer backgroundColor: "#000"
width = Screen.width - 240

# Video wrapper
vidWrapper = new Layer 
	x: 0, y: 128, width: 750, height: 720
	backgroundColor: "transparent"
	
# Video
vid = new VideoLayer 
	width: 750, height: 720, video: "balloons.mp4"
	x: 0, backgroundColor: "transparent"
	superLayer: vidWrapper

# Functions for controls
showPlay = ->
	sketch.play.visible = true
	sketch.pause.visible = false
	vid.player.pause()
	 
showPause = ->
	sketch.pause.visible = true
	sketch.play.visible = false
	vid.player.play()

# Trick to make it load with a thumbnail on mobile
vid.player.play()
Utils.delay 0.25, -> showPlay()	
		
# Define & position sliders
progress = new SliderComponent 
	min: 0, max: 17
	x: 104, y: vidWrapper.maxY - 55, width: 520
	backgroundColor: "rgba(255,255,255,0.4)"
	borderRadius: 4
	height: 10
	
progress.fill.backgroundColor = "#fff"
progress.fill.borderRadius = 4

# Disable momentum, hide knob
progress.knob.draggable.momentum = false
wasPlaying = false

# Scrubbing interaction
progress.knob.on Events.DragStart, -> 
	wasPlaying = true unless vid.player.paused
	vid.player.pause()

progress.knob.on Events.DragEnd, -> 
	vid.player.currentTime = progress.value
	if wasPlaying then showPause()
	return wasPlaying = false
	
progress.on "change:value", ->
	vid.player.currentTime = Utils.round(this.value, 1)
	
time = new Layer
	superLayer: vidWrapper
	x: vidWrapper.maxX - 90
	y: vidWrapper.maxY - 200
	backgroundColor: "transparent"
	
time.html = "0:00"
time.style = { "font" : "400 30px/1.4 Helvetica" }
	
vidBackground = new Layer 
	superLayer: vidWrapper
	width: vidWrapper.width
	height: 116, backgroundColor: "transparent"
	y: vidWrapper.height - 116
	
vidBackground.style.background = "linear-gradient(to bottom, rgba(0,0,0,0) 0%,rgba(0,0,0,0.75) 100%)"

# Controls
sketch.play.placeBefore(vidWrapper)
sketch.pause.placeBefore(sketch.play)
sketch.pause.visible = false
time.bringToFront()
progress.bringToFront()

Events.wrap(vid.player).addEventListener "timeupdate", ->
	progress.knob.midX = progress.pointForValue(this.currentTime)
	time.html = "0:0" + Math.round(this.currentTime)
	if Math.round(this.currentTime) > 9 then time.html = "0:" + Math.round(this.currentTime)

# Video player interactions
sketch.play.on Events.Click, -> 
	
	showPause()
	
	if vid.player.currentTime is vid.player.duration
		vid.player.currentTime = 0
		showPause()

sketch.pause.on Events.Click, -> showPlay()
vid.player.onplaying = -> showPause()
vid.player.onended = -> showPlay()