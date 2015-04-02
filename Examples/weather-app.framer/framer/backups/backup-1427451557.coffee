Framer.Defaults.Animation = curve: "spring(500,30,0)"

# Import
sketch = Framer.Importer.load "imported/weather"
today = sketch.today
weather = sketch.weather
chrome = sketch.chrome
amsterdam = sketch.amsterdam
temperature = sketch.temperature

# Today Scroll
todayScroll = ScrollComponent.wrap(today)
todayScroll.scrollVertical = false

# Weather Scroll
weatherScroll = ScrollComponent.wrap(weather)
weatherScroll.scrollHorizontal = false

# weatherScroll.states.add
# 	move: {y:400}

# Modulate 
weatherScroll.on Events.Scroll, ->
	
	temperature.animateStop()
	chrome.animateStop()
	amsterdam.animateStop()
	
	chrome.opacity = Utils.modulate(weatherScroll.scrollY, [0, 150], [1, 0], true)
	amsterdam.y = Utils.modulate(weatherScroll.scrollY, [100, 150], [170, 100], true)

	temperature.y = Utils.modulate(weatherScroll.scrollY, [-150, 150], [500, 100], false)
	if weatherScroll.scrollY > 0
		temperature.opacity = Utils.modulate(weatherScroll.scrollY, [0, 60], [1, 0], true)
	else
		temperature.opacity = Utils.modulate(weatherScroll.scrollY, [0, -150], [1, 0], true)
	
 	

# 	print weatherScroll.scrollY


weatherScroll.on Events.ScrollEnd, ->

	if weatherScroll.scrollY < 240
		weatherScroll.content.animate
			properties:
				y:0
		chrome.animate
			properties:
				opacity:1
		temperature.animate
			properties:
				opacity: 1
				y: 300
	else
		weatherScroll.content.animate
			properties:
				y:-360
		chrome.animate
			properties:
				opacity:0
		temperature.animate
			properties:
				opacity: 0
				y: 200


# 	print weatherScroll.scrollY






