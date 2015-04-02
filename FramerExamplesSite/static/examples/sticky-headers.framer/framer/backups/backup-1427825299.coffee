# Made with Framer
# by Jonas Treub
# www.framerjs.com

# Set number of rows and section
numberOfSections = 5
rowsPerSection = 4

# Sizes for header, rows and margin
headerHeight = 80
rowHeight = 160
defaultMargin = 10

tableHeader = new Layer
	width:750
	height:128
	image:"images/navBar.png"

# Calculated Sizes
screenWidth = Framer.Device.screen.width
headerContentHeight = headerHeight - (2 * defaultMargin)
cellHeight = rowHeight - (2 * defaultMargin)
sectionOffset = (rowHeight * rowsPerSection) + headerHeight

# Variable which will hold all headers
headers = []

# Create the scrollview
scrollView = new ScrollComponent
	width: Screen.width
	height: Screen.height - tableHeader.height
	y: tableHeader.height
	
	scrollHorizontal: false
	backgroundColor: "#eee"

# We add negative margin above the scrollview content to have the first header stick to the top
scrollView.contentInset = {top: -defaultMargin, bottom: defaultMargin}

# Iterate through sections
for sectionIndex in [0...numberOfSections]
	
	# Calculate section offset for both header and content
	sectionHeaderOffset = sectionIndex * sectionOffset
	sectionContentOffset = sectionHeaderOffset + headerHeight
	
	# Create a section header layer for current section
	sectionHeader = new Layer
		width: screenWidth
		height: headerHeight
		superLayer: scrollView.content
		y: sectionHeaderOffset
		backgroundColor: null
	
	# Create a header content layer
	sectionHeaderContent = new Layer
		width: sectionHeader.width
		y: defaultMargin
		height: headerContentHeight
		superLayer: sectionHeader
		backgroundColor: "#28AFFA"
		html: "#{sectionIndex}"
	sectionHeaderContent.style.boxShadow = "0px 1px 2px rgba(0,0,0,.5)"
	sectionHeaderContent.style.lineHeight = "#{sectionHeaderContent.height}px"
	sectionHeaderContent.style.fontSize = "#{sectionHeaderContent.height * .5}px"
	sectionHeaderContent.style.paddingLeft = "20px"
	
	# Save the original Y position of each header for later use
	sectionHeader.originalY = sectionHeader.y
	
	# Put the created header inside of the headers array
	headers.push sectionHeader
	
	# Iterate through rows in section
	for rowIndex in [0...rowsPerSection]
	
		# Create a cell layer for current row
		cell = new Layer
			width: screenWidth
			height: rowHeight
			y: (rowIndex * rowHeight) + sectionContentOffset
			backgroundColor: null
			superLayer: scrollView.content
		
		# Create cell content layer
		cellContent = new Layer
			superLayer: cell
			width: cell.width - (4 * defaultMargin)
			y: defaultMargin
			x: defaultMargin * 2
			height: cellHeight
			cornerRadius: 8
			backgroundColor: "white"
		cellContent.style.boxShadow = "0px 1px 2px rgba(0,0,0,.2)"

# Put all headers in front of rows
for header in headers
	header.bringToFront()

# Calculate header positions based on scroll offset
scrollView.on Events.Move, ->
	contentOffset = scrollView.scrollY 
	for header in headers
	
		# Check if header is pushed above the scrollview
		if header.originalY < contentOffset
		
			# Check if header should be pushed away by next header
			if header.originalY < (contentOffset + headerContentHeight - sectionOffset)
				header.y = header.originalY + sectionOffset - headerContentHeight
			
			# Stick header to top of scrollview
			else
				header.y = contentOffset
		
		# If header is below top of scrollview keep original Y position
		else
			header.y = header.originalY

tableHeader = new Layer
	width:750
	height:128
	image:"images/navBar.png"
