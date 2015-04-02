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
week = sketch.week

# Today scroll component
todayScroll = ScrollComponent.wrap(today)
todayScroll.scrollVertical = false
todayScroll.originalY = todayScroll.y

# Weather scroll component
weatherScroll = ScrollComponent.wrap(weather)
weatherScroll.scrollHorizontal = false

# Week scroll component
weekScroll = ScrollComponent.wrap(week)
weekScroll.scrollHorizontal = false
weekScroll.clip = true
# weekScroll.backgroundColor = "red"

# States to animate
amsterdam.states.add
	reset:	{y:160, opacity:1}
	top:	{y:80, opacity:1}
chrome.states.add
	reset:	{opacity:1}
	top:	{opacity:0}
temperature.states.add
	reset:	{opacity:1, y:300}
	top:	{opacity:0, y:200}
todayScroll.states.add
	reset:	{y:60}
	top:	{y:70}
weatherScroll.content.states.add
	reset:	{y:0}
	top:	{y:-360}
weekScroll.content.states.add
	reset:	{y:0}
	top:	{y:-360}

# On scroll 
weatherScroll.on Events.Scroll, ->
	
	amsterdam.animateStop()
	amsterdam.y = Utils.modulate(weatherScroll.scrollY, [0, 370], [160, 80], false)
	
	chrome.animateStop()	
	chrome.opacity = Utils.modulate(weatherScroll.scrollY, [0, 150], [1, 0], true)

	temperature.animateStop()
	temperature.y = Utils.modulate(weatherScroll.scrollY, [-150, 150], [500, 100], false)

	if weatherScroll.scrollY > 0
		amsterdam.opacity = Utils.modulate(weatherScroll.scrollY, [500, 700], [1, 0], true)
		temperature.opacity = Utils.modulate(weatherScroll.scrollY, [0, 60], [1, 0], true)
	else
		amsterdam.opacity = Utils.modulate(weatherScroll.scrollY, [0, -300], [1, 0], true)
		temperature.opacity = Utils.modulate(weatherScroll.scrollY, [0, -150], [1, 0], true)
	
	todayScroll.animateStop()
	if weatherScroll.scrollY > 350
		todayScroll.y = todayScroll.originalY + (weatherScroll.scrollY - 350)
		
	weekScroll.animateStop()

# On scroll end
weatherScroll.on Events.ScrollEnd, ->
	if weatherScroll.scrollY < 250
		amsterdam.states.switch("reset")
		chrome.states.switch("reset")
		temperature.states.switch("reset")
		todayScroll.states.switch("reset")
		weatherScroll.content.states.switch("reset")
		weekScroll.content.states.switch("reset")
	else
		amsterdam.states.switch("top")
		chrome.states.switch("top")
		temperature.states.switch("top")
		todayScroll.states.switch("top")
		weekScroll.content.states.switch("top")
		
	






