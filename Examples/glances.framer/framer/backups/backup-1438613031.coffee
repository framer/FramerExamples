# Sketch Import
sketch = Framer.Importer.load "imported/glances"

# Set device background 
Framer.Device.background.style.background = "#fff"

# Set-up Pages, Home
home = new PageComponent
	size: Screen.size 
	directionLock: true

home.addPage(sketch.home)
home.addPage(sketch.battery, "bottom")

# Add weather and calendar glances
home.addPage(sketch.weather)
home.addPage(sketch.calendar)

sketch.weather.y = Screen.height 
sketch.weather.x = Screen.width

sketch.calendar.x = Screen.width * 2
sketch.calendar.y = Screen.height 

# Custom animationOptions
home.animationOptions = curve: "spring(400,50,0)"

# Check if the currentPage is home
checkIfHome = ->
	if home.currentPage is sketch.home 
		home.scrollHorizontal = false
	else
		home.scrollHorizontal = true 
		
checkIfHome()

# Time layer
time = new Layer 
	superLayer: sketch.home
	backgroundColor: null
	x: 112, y: 32
	clip: false
	
time.style.color = "#fff"
time.style.font = "300 68px/1.25 SF UI Display, Helvetica Neue"
time.style.textAlign = "right"
time.style.letterSpacing = "-2px"

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
	Utils.interval 30, ->
		startTime()

startTime()


allIndicators = []

# Create indictors
for i in [1...4]

	
	indicator = new Layer 
		backgroundColor: "#fff"
		width: 10, height: 10
		x: 18 * i, y: Screen.height 
		borderRadius: "50%", opacity: 0.2
		
	# Stay centered regardless of the amount of cards
	indicator.x += (Screen.width / 2) - 40
	
	# States
	indicator.states.add(active: { opacity: 1 })
	indicator.states.animationOptions = time: 0.5
	
	# Store indicators in our array
	allIndicators.push(indicator)

# Set indicator for current page
switchIndicators = ->
	current = home.horizontalPageIndex(home.currentPage)
	allIndicators[current - 1].states.switch("active")

home.content.on "change:y", ->
	for indicator in allIndicators
		indicator.y = this.y + (Screen.height * 2) - 14
	
# Set boundaries on dragging distance	
home.content.on Events.DragMove, ->
	if this.y <= -340 then this.y = -340
		
# On page changes
home.on "change:currentPage", ->
	checkIfHome()
	sketch.home.x = home.currentPage.x
	
	unless home.currentPage is sketch.home
		indicator.states.switch("default") for indicator in allIndicators
		switchIndicators()
