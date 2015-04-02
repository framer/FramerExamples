# Made with Framer
# by Jonas Treub
# www.framerjs.com

tableHeader = new Layer
	width:750, height:128
	image:"images/navBar.png"

# The scrollview
scrollView = new ScrollComponent
	y:tableHeader.height
	width:Screen.width, height:Screen.height-tableHeader.height
	backgroundColor:"#eee"
	contentInset:bottom:20
	# The scroll direction is limited to only allow for vertical scrolling
	scrollHorizontal:false

# Variable which will hold all of the section headers
sectionHeaders = []

# The following code will be repeated for as many times as there are sections
numberOfSections = 5
for sectionIndex in [0...numberOfSections]
	
	# We create a section header
	sectionHeader = new Layer
		y: sectionIndex * 800
		width:Screen.width, height:60
		superLayer: scrollView.content
		backgroundColor:"black"
		html:"Section #{sectionIndex}"
		style:
			paddingLeft:"20px", lineHeight:"60px", fontSize:"30px"
			boxShadow:"0px 1px 0px rgba(0,0,0,0.5)"
	
	# The original Y position is saved for later use
	sectionHeader.originalYPosition = sectionHeader.y
	
	# The header is put inside the array which holds all headers
	sectionHeaders.push sectionHeader
	
	# Repeated for each row
	rowsPerSection = 4
	for rowIndex in [0...rowsPerSection]
	
		# A cell is created for the row
		cell = new Layer
			x:20, y:80+(rowIndex*180)+(sectionIndex*800)
			width:Screen.width-40, height:160
			cornerRadius:8, backgroundColor:"white"
			style: boxShadow:"0px 1px 2px rgba(0,0,0,.2)"
			# The cell is put inside the content layer of the scroll component
			superLayer:scrollView.content

# All headers are put in front of the rows
for header in sectionHeaders
	header.bringToFront()

# When the scroll component is moved the following code is triggered
scrollView.on Events.Move, (offset) ->
	yOffset = -offset.y
	
	# We repeat the following checks for each section header
	for header in sectionHeaders
		# Check if we scrolled inside the bounderies pf
		if yOffset >= 0
			# Header is pushed above the scrollview
			if yOffset > header.originalYPosition
				# Header is pushed off the screen by the next header
				if yOffset > header.originalYPosition+740
					header.y = header.originalYPosition+740
				# We stick header to the top of the scrollview
				else
					header.y = header.originalYPosition+(yOffset-header.originalYPosition)
			# Header is below the top of the scrollview, it keeps its original Y position
			else
				header.y = header.originalYPosition
		# The scroll component is pulled down, out of bounds
		else
			# The top most header is sticked to the scroll component
			if header.originalYPosition == 0
				header.y = yOffset
			else
				header.y = header.originalYPosition
