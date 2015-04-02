# Made with Framer
# by Jonas Treub
# www.framerjs.com

# This imports all the layers for "medium" into mediumLayers
mediumLayers = Framer.Importer.load "imported/medium"

amountOfPages = 3
bg = new BackgroundLayer
	backgroundColor:"white"

# The page indicator is the bright blue line at the bottom of the navigation bar
pageIndicator = new Layer
	height:2, y:mediumLayers.navigationBar.height-2
	width:mediumLayers.navigationBar.width/amountOfPages
	backgroundColor:"black"

# Variable which will hold all of the tab items
tabItems = []

# This page component holds the horizontally aligned pages
pageComponent = new PageComponent
	y:mediumLayers.navigationBar.height
	height:Screen.height-mediumLayers.navigationBar.height, width:Screen.width
	# The scroll direction is restricted to only allow for horizontal scrolling
	scrollVertical:false
	# The direction lock is enabled to only allow either horizontal or vertical scrolling
	directionLock:true

# The following lines will be repeated as many times as there are pages
for pageIndex in [0...amountOfPages]
	
	# A scroll component is created
	scrollComponent = new ScrollComponent
		size:pageComponent.size, x:pageIndex*pageComponent.width
		contentInset: bottom: 40
		# Only vertical scrolling is allowed and the direction is locked
		scrollHorizontal:false, directionLock:true
	mediumLayers["scroll#{pageIndex+1}"].superLayer = scrollComponent.content
	
	# The scroll component is added as a page for the page component
	pageComponent.addPage scrollComponent
	
	# Create tab item for page
	tabItem = new Layer
		width:Screen.width/amountOfPages, height:86
		x:(Screen.width/amountOfPages)*pageIndex, y:mediumLayers.navigationBar.height-86
		backgroundColor: null, opacity: .5
	
	# The tab item is put inside the array which holds all tabs
	tabItems.push tabItem
	
	# We save the associated page as a property on the tab item
	tabItem.page = scrollComponent
	
	# Add a title to the tab bar item
	tabItem.html = "Story #{pageIndex+1}"
	tabItem.style =
		color:"black", textAlign:"center"
		lineHeight:"92px", fontWeight:"500", fontSize: "28px"
	tabItem.states.add
		current: opacity:1
	tabItem.states.animationOptions = curve:"ease-in-out", time:.3
	
	# When the tab is tapped we snap the page component to the associated page
	tabItem.on Events.Click, ->
		pageComponent.snapToPage @page

# Places the page component behind the navigationbar
pageComponent.placeBehind mediumLayers.navigationBar

# This event gets called When the page component is moved horizontally
pageComponent.on Events.Move, (offset) ->
	maxPageComponentOffset = Screen.width*(amountOfPages-1)
	maxIndicatorOffset = pageIndicator.width*(amountOfPages-1)
	indicatorX = Utils.modulate(-offset.x, [0, maxPageComponentOffset], [0, maxIndicatorOffset], true)
	# The page indicator is moved to match the scroll offset
	pageIndicator.x = indicatorX

tabItems[0].states.switch "current"
pageComponent.on "change:currentPage", (currentPage) ->
	currentPageIndex = pageComponent.horizontalPageIndex(currentPage)
	index = 0
	for tab in tabItems
		if index == currentPageIndex
			tab.states.switch "current"
		else
			tab.states.switch "default"
		index++

# When the navigationbar gets tapped we scroll to the top of the current page
mediumLayers.navigationBar.on Events.Click, ->
	pageComponent.currentPage.scrollToTop()
