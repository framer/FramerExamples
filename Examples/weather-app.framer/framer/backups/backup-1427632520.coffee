# Set up
Framer.Defaults.Animation = curve: "spring(500,30,0)"

# Import
sketch = Framer.Importer.load "imported/weather"

# Rename
today = sketch.today
weather = sketch.weather
chrome = sketch.chrome
amsterdam = sketch.amsterdam
temperature = sketch.temperature

# Today scroll component
todayScroll = ScrollComponent.wrap(today)
todayScroll.scrollVertical = false

# Weather scroll component
weatherScroll = ScrollComponent.wrap(weather)
weatherScroll.scrollHorizontal = false

# States to animate
amsterdam.states.add
	reset:	{y:170, opacity:1}
	top:	{y:100}
chrome.states.add
	reset:	{opacity:1}
	top:	{opacity:0}
temperature.states.add
	reset:	{opacity:1, y:300}
	top:	{opacity:0, y:200}
weatherScroll.content.states.add
	reset:	{y:0}
	top:	{y:-360}

# Modulate 
weatherScroll.on Events.Scroll, ->
	
	# Stop all running animations

	amsterdam.animateStop()
	amsterdam.y = Utils.modulate(weatherScroll.scrollY, [-50, 150], [170, 100], false)
	
	chrome.animateStop()	
	chrome.opacity = Utils.modulate(weatherScroll.scrollY, [0, 150], [1, 0], true)

	temperature.animateStop()
	temperature.y = Utils.modulate(weatherScroll.scrollY, [-150, 150], [500, 100], false)

	if weatherScroll.scrollY > 0
		temperature.opacity = Utils.modulate(weatherScroll.scrollY, [0, 60], [1, 0], true)
	else
		amsterdam.opacity = Utils.modulate(weatherScroll.scrollY, [0, -150], [1, 0], true)
		temperature.opacity = Utils.modulate(weatherScroll.scrollY, [0, -150], [1, 0], true)
	
weatherScroll.on Events.ScrollEnd, ->
	if weatherScroll.scrollY < 240
		amsterdam.states.switch("reset")
		chrome.states.switch("reset")
		temperature.states.switch("reset")
		weatherScroll.content.states.switch("reset")
	else
		amsterdam.states.switch("top")
		chrome.states.switch("top")
		temperature.states.switch("top")
		weatherScroll.content.states.switch("top")
		







