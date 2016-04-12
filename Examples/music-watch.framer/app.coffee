# Made with Framer
# by Benjamin den Boer
# @benjaminnathan
# www.framerjs.com

# Sketch import
sketch = Framer.Importer.load "imported/music"

# Include audio module 
{AudioPlayer} = require "audio"

# Audio
audio = new AudioPlayer 
	audio: "local-forecast.mp3"
	size: 64
	y: 150
	x: 110

# Selection effect
select = new Layer 
	width: 100
	height: 100
	borderRadius: 50
	backgroundColor: "rgba(255,180,190,0.1)"
	scale: 0.8
	opacity: 0
	
select.x = Align.center 
select.y = Align.center(12)

select.superLayer = sketch.screen 
select.placeBehind(audio.controls)

# States
select.states.add 
	show: 
		scale: 1 
		opacity: 1 
	grow:  
		scale: 1.1
		opacity: 0
	
# Variable to weak animation duration
selectTime = 0.2

select.states.animationOptions = 
	curve: "ease", time: selectTime

audio.controls.on Events.Click, ->
	this.scale = 0.8
	
	this.animate 
		properties:
			scale: 1
		curve: "spring(400,30,0)"
		
	select.states.switch("show", time: selectTime)
		
	Utils.delay selectTime, ->
		select.states.switch("grow")
		
		Utils.delay selectTime, -> 
			select.states.switch("default")
	
# Title
title = new Layer 
	width: Screen.width
	backgroundColor: "transparent"
	y: 46
	
title.style = 
	"font" : "500 30px/1.2 SF Compact Text"
	"letter-spacing" : "-1px"
	"text-align" : "center"

title.html = "The Curtain Rises"

# Time
time = new Layer 
	backgroundColor: null
	x: Screen.width - 92
	width: 80, height: 32
	clip: false

timeStyle = 
	"font" : "400 30px/1.2 SF Compact Text"
	"letter-spacing" : "-1px"
	"color" : "#AEB4BF"
	
time.style = timeStyle 
time.style.textAlign = "right"

# Check time
checkTime = (i) ->
	if i < 10 then "0" + i else i
	
# Start displaying time
startTime = ->
	date = new Date()
	h = checkTime(date.getHours())
	m = checkTime(date.getMinutes())
	
	# Set time
	time.html = h + ":" + m
	
	# Update the time
	Utils.delay 0.5, ->
		startTime()

startTime()

# Icon scaling functions
scaleUpDown = (layer) -> 	
	layer.animate 
		properties:
			scale: 0.8
		time: 0.1
			
	layer.on Events.AnimationEnd, ->
		this.animate 
			properties:
				scale: 1
			curve: "spring(400,30,0)"
			
# Volume 
audio.player.volume = 0.5

# Volume bar
audio.showVolume = true
audio.volumeBar.frame = sketch.volume.frame
audio.volumeBar.knob.visible = false

# Volume color
audio.volumeBar.backgroundColor = "#330311"
audio.volumeBar.fill.backgroundColor = "#FB1650"

# Increase volume
sketch.plus.on Events.Click, ->
	value = audio.player.volume
	audio.volumeBar.animateToValue(value + 0.1, curve: "spring(300,20,0)")
	scaleUpDown(this)
	
# Decrease volume
sketch.min.on Events.Click, ->
	value = audio.player.volume
	audio.volumeBar.animateToValue(value - 0.1, curve: "spring(300,20,0)")
	scaleUpDown(this)
	
# Time
audio.showTime = true
audio.time.x = 18
audio.time.style = timeStyle
audio.time.style.color = "#FB1650"