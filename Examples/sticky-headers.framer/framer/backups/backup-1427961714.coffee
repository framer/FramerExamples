# Made with Framer
# by Jonas Treub
# www.framerjs.com

contactsChrome = new Layer
	width:750, height:1334
	backgroundColor: "white", image:"images/contacts.png"

# The scrollview
scrollView = new ScrollComponent
	y:216
	width:Screen.width, height:Screen.height-216
	backgroundColor:null
	# The scroll direction is limited to only allow for vertical scrolling
	scrollHorizontal:false
scrollView.mouseWheelEnabled = true

# Variable which will hold all of the section headers
sectionHeaders = []

characters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")

# The following code will be repeated for as many times as there are sections
numberOfSections = characters.length
for sectionIndex in [0...numberOfSections]
	
	# We create a section header
	sectionHeader = new Layer
		y: sectionIndex * 800
		width:Screen.width - 26, height:60
		superLayer: scrollView.content
		backgroundColor:"#F8F8F8"
		html:"#{characters[sectionIndex]}"
		style:
			paddingLeft:"32px", fontWeight: "500"
			lineHeight:"60px", fontSize:"30px", color: "black"
	
	# The header its original Y position is saved for later use
	sectionHeader.originalYPosition = sectionHeader.y
	
	# The header is put inside the array which holds all headers
	sectionHeaders.push sectionHeader
	
	# Repeated for each row
	rowsPerSection = 6
	for rowIndex in [0...rowsPerSection]
	
		# A cell is created for the row
		cell = new Layer
			x:32, y:62+(rowIndex*124)+(sectionIndex*800)
			width:Screen.width - 58, height:120
			backgroundColor:null
			style: borderBottom: "1px solid #E1E1E1"
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