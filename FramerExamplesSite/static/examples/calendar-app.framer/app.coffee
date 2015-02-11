# Made with Framer
# by Kai Daniels
# www.framerjs.com

document.body.style.cursor = "auto"
Framer.Device.background.image = "images/bg.png"
bg = new BackgroundLayer backgroundColor: "#EEEDEF"

uiScale = .5

juneLeft = new Layer 
	x:-45
	y:20
	width:298
	height:38
	scale: uiScale
	image:"images/June.png"

iconsRight = new Layer 
	x:1200
	y:20
	width:252
	height:42
	scale: uiScale
	image:"images/icons.png"

imageActionButton = new Layer 
	x:1235
	width:210
	height:231
	image:"images/Action Button.png"
	scale: uiScale
imageActionButton.centerY()
imageActionButton.y -= -395
	
materialPaperLeft = new Layer
	x: 0
	y: 75
	backgroundColor: "#fff"
	borderRadius: 3
	shadowY: 2
	shadowX: 1
	shadowBlur: 2
	shadowColor: "rgba(0,0,0,0.2)"
	height: 702
	width: 70

materialPaperRight = new Layer 
	x: 1370
	y: 75
	backgroundColor: "#fff"
	borderRadius: 3
	shadowY: 2
	shadowX: 1
	shadowBlur: 2
	shadowColor: "rgba(0,0,0,0.2)"
	height: 702
	width: 70

materialPaperCenter = new Layer 
	x: 150
	y: 75
	backgroundColor: "#fff"
	borderRadius: 3
	shadowY: 2
	shadowX: 1
	shadowBlur: 2
	shadowColor: "rgba(0,0,0,0.2)"
	height: 702
	width: 1140

calendarRight = new Layer 
	x:518
	y:72
	width:774
	height:706
	image:"images/calendarright.png"
	
calendarLeft = new Layer 
	x:40
	y:0
	width:430
	height:1410
	scale: .5
	image: "images/calendarleft.png"
calendarLeft.centerY()
calendarLeft.y -= 25.5

calendarTimes = new Layer 
	x:30
	y:232
	width:26
	height:444
	image:"images/Times.png"
calendarTimes.superLayer = materialPaperRight
	
calendarTimesLine = new Layer
	x:0
	y:153
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarTimesLine.superLayer = materialPaperRight

#Lines on the left becuase I'm bad at for(){} loops and coding :/
calendarLines1 = new Layer
	x:0
	y:153
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines1.superLayer = materialPaperLeft


calendarLines1 = new Layer
	x:0
	y:240
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines1.superLayer = materialPaperLeft

calendarLines2 = new Layer
	x:0
	y:326
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines2.superLayer = materialPaperLeft

calendarLines3 = new Layer
	x:0
	y:410
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines3.superLayer = materialPaperLeft

calendarLines4 = new Layer
	x:0
	y:495
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines4.superLayer = materialPaperLeft

calendarLines5 = new Layer
	x:0
	y:580
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines5.superLayer = materialPaperLeft

calendarLines6 = new Layer
	x:0
	y:666
	width: 70
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarLines6.superLayer = materialPaperLeft


#focus block layers
tuesdayLayer = new Layer
	backgroundColor: "#FFF"
	x: 361
	y: 75
	height: 700
	width: 158

#here we go again, but for the center focus
calendarCenterLines = new Layer
	x:0
	y:153
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines.superLayer = tuesdayLayer

calendarCenterLines1 = new Layer
	x:0
	y:238
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines1.superLayer = tuesdayLayer

calendarCenterLines2 = new Layer
	x:0
	y:324
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines2.superLayer = tuesdayLayer

calendarCenterLines3 = new Layer
	x:0
	y:409
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines3.superLayer = tuesdayLayer

calendarCenterLines4 = new Layer
	x:0
	y:494
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines4.superLayer = tuesdayLayer

calendarCenterLines5 = new Layer
	x:0
	y:580
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines5.superLayer = tuesdayLayer

calendarCenterLines6 = new Layer
	x:0
	y:666
	width: 158
	height: 2
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLines6.superLayer = tuesdayLayer

calendarCenterLinesAlt = new Layer
	x:13
	y:151
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt.superLayer = tuesdayLayer

calendarCenterLinesAlt1 = new Layer
	x:13
	y:250
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt1.superLayer = tuesdayLayer

calendarCenterLinesAlt2 = new Layer
	x:13
	y:314
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt2.superLayer = tuesdayLayer

calendarCenterLinesAlt3 = new Layer
	x:13
	y:383
	width: 437
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt3.superLayer = tuesdayLayer

calendarCenterLinesAlt4 = new Layer
	x:13
	y:517
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt4.superLayer = tuesdayLayer

calendarCenterLinesAlt5 = new Layer
	x:13
	y:580
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt5.superLayer = tuesdayLayer

calendarCenterLinesAlt6 = new Layer
	x:13
	y:743
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt6.superLayer = tuesdayLayer

calendarCenterLinesAlt7 = new Layer
	x:13
	y:810
	width: 435
	height: 2
	opacity: 0
	backgroundColor: "rgba(0,0,0,.05)"
calendarCenterLinesAlt7.superLayer = tuesdayLayer

timeIndicator = new Layer
	x:0
	y:283
	width: 158
	height: 2
	backgroundColor: "#E73A4C"
timeIndicator.superLayer = tuesdayLayer

timeIndicatorCircle = new Layer
	x:-10
	y:300
	width: 7
	height: 7
	borderRadius: 5
	backgroundColor: "#E73A4C"
timeIndicatorCircle.superLayer = tuesdayLayer

#Garbage Out	
garbageOut = new Layer
	borderRadius: 3
	x: 370
	y: 237
	height: 71
	width: 139
	backgroundColor: "#F38169"

garbageText = new Layer 
	x:-35
	y:-5
	width:176
	height:50
	scale: .5
	image:"images/garbageText.png"
garbageText.superLayer = garbageOut

#Concept Review
conceptReview = new Layer
	borderRadius: 3
	x: 370
	y: 408
	height: 110
	width: 139
	backgroundColor: "#FAB653"

conceptText = new Layer
	x:-35
	y:-5
	width:170
	height:50
	scale: .5
	image:"images/conceptText.png"
conceptText.superLayer = conceptReview

#Drop off Car
dropOffCar = new Layer
	borderRadius: 3
	x: 370
	y: 580
	height: 135
	width: 139
	backgroundColor: "#59DCE1"

dropText1 = new Layer
	x:-39
	y:-10
	width:194
	height:82
	image:"images/DropText1.png"
	scale: .5
dropText1.superLayer = dropOffCar

threeRegular = new Layer 
	x:7
	y:17
	scale: .5
	width:52
	height:82
	image:"images/3regular.png"
threeRegular.superLayer = tuesdayLayer
	
tueLayer = new Layer 
	x:6
	y:10
	scale: .5
	width:46
	height:24
	image:"images/Tue.png"
tueLayer.superLayer = tuesdayLayer
	
tuesdayTextLayer = new Layer 
	x:-30
	y:9
	width:178
	height:28
	scale: uiScale
	opacity: 0
	image:"images/Tuesday, June.png"
tuesdayTextLayer.superLayer = tuesdayLayer

threeLight = new Layer 
	x:-13
	y:-24
	width:102
	height:168
	scale: .25
	opacity: 0
	image:"images/3light.png"
threeLight.superLayer = tuesdayLayer

nineA = new Layer 
	x:20
	y:270
	width:34
	height:28
	scale: .5
	opacity: 0
	image:"images/9a.png"
nineA.superLayer = tuesdayLayer

twoP = new Layer 
	x:20
	y:765
	width:34
	height:28
	scale: .5
	opacity: 0
	image:"images/2p.png"
twoP.superLayer = tuesdayLayer
	
#states
imageActionButton.on Events.Click, ->
	materialPaperCenter.states.next("two","one")
	materialPaperLeft.states.next("two","one")
	materialPaperRight.states.next("two","one")
	calendarLeft.states.next("two","one")
	calendarRight.states.next("two","one")
	tuesdayLayer.states.next("two","one")
	dropOffCar.states.next("two","one")
	conceptReview.states.next("two","one")
	garbageOut.states.next("two","one")
	tueLayer.states.next("two","one")
	tuesdayTextLayer.states.next("two","one")
	threeLight.states.next("two","one")
	threeRegular.states.next("two","one")
	calendarCenterLines.states.next("two","one")
	calendarCenterLines1.states.next("two","one")
	calendarCenterLines2.states.next("two","one")
	calendarCenterLines3.states.next("two","one")
	calendarCenterLines4.states.next("two","one")
	calendarCenterLines5.states.next("two","one")
	calendarCenterLines6.states.next("two","one")
	calendarCenterLinesAlt.states.next("two","one")
	calendarCenterLinesAlt1.states.next("two","one")
	calendarCenterLinesAlt2.states.next("two","one")
	calendarCenterLinesAlt3.states.next("two","one")
	calendarCenterLinesAlt4.states.next("two","one")
	calendarCenterLinesAlt5.states.next("two","one")
	calendarCenterLinesAlt6.states.next("two","one")
	calendarCenterLinesAlt7.states.next("two","one")
	timeIndicator.states.next("two","one")
	timeIndicatorCircle.states.next("two","one")
	twoP.states.next("two","one")
	nineA.states.next("two","one")


materialPaperCenter.states.add 
	one: {x: 150, width: 1140}
	two: {x:0, width: 1440}
	
materialPaperCenter.states.animationOptions =
	curve: "ease"
	time:0.2
	
calendarLeft.states.add	
	one: {x: 40}
	two: {x: -110}
	
calendarLeft.states.animationOptions =
	curve: "ease"
	time: 0.2

calendarRight.states.add
	one: {x:518, width:774, height:706}
	two: {x:669, width:774, height:706}
	
calendarRight.states.animationOptions =
	curve: "ease"
	time: 0.2

materialPaperLeft.states.add
	one: {x: 0}
	two: {x: -70}

materialPaperLeft.states.animationOptions =
	curve: "ease"
	delay: 0.02
	time: 0.2
	
materialPaperRight.states.add
	one: {x: 1370}
	two: {x: 1440}

materialPaperRight.states.animationOptions =
	curve: "ease"
	delay: 0.02
	time: 0.2
	
garbageOut.states.add
	one: {x: 370, y: 237, width: 139}
	two: {x: 224, y: 200, width: 435}

garbageOut.states.animationOptions =
	curve: "ease"
	time: 0.2
	
conceptReview.states.add
	one:{x: 370, y: 408, width: 139}
	two:{x: 224, y: 430, width: 435}

conceptReview.states.animationOptions =
	curve: "ease"
	time: 0.2
	
dropOffCar.states.add
	one:{x: 370, y: 580, width: 139}
	two:{x: 224, y: 630, width: 435}

dropOffCar.states.animationOptions =
	curve: "ease"
	time: 0.2
	
tuesdayLayer.states.add
	one: {x: 361, y: 75, height: 700, width: 158, shadowY: 0, shadowX: 0, shadowBlur: 0, shadowColor: "rgba(0,0,0,0)"}
	two: {x: 212, y: 35, height: 866, width: 459, shadowY: 2, shadowX: 1, shadowBlur: 4, shadowColor: "rgba(0,0,0,0.24)"}

tuesdayLayer.states.animationOptions =
	curve: "ease"
	time: 0.2
	
tuesdayTextLayer.states.add
	one: {opacity: 0}
	two: {opacity: 1}
	
tuesdayTextLayer.states.animationOptions =
	curve: "ease"
	time: 0.1

threeLight.states.add
	one: {opacity: 0, scale: .25, x:-13, y:-24}
	two: {opacity: 1, scale: uiScale, x: 2, y:7 }
	
threeLight.states.animationOptions =
	curve: "ease"
	time: 0.2
	
threeRegular.states.add
	two: {opacity: 0, x:27.5, y:50, scale: 1.07}
	one: {opacity: 1, x:7, y:17, scale: uiScale}	
threeRegular.states.animationOptions =
	curve: "ease"
	time: 0.2
	
calendarCenterLines.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines.states.animationOptions =
	curve: "ease"
	time: 0.2
	
calendarCenterLines1.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines1.states.animationOptions =
	curve: "ease"
	time: 0.2
	
calendarCenterLines2.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines2.states.animationOptions =
	curve: "ease"
	time: 0.2
	
calendarCenterLines3.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines3.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLines4.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines4.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLines5.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines5.states.animationOptions =
	curve: "ease"
	time: .2

calendarCenterLines6.states.add
	one: {opacity: 1}
	two: {opacity: 0}

calendarCenterLines6.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt1.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt1.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt2.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt2.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt3.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt3.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt4.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt4.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt5.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt5.states.animationOptions =
	curve: "ease"
	time: .2
	
calendarCenterLinesAlt6.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt6.states.animationOptions =
	curve: "ease"
	time: .2

calendarCenterLinesAlt7.states.add
	one: {opacity: 0}
	two: {opacity: 1}

calendarCenterLinesAlt7.states.animationOptions =
	curve: "ease"
	time: .2
	
timeIndicator.states.add	
	one: {x:0, y:283, width: 158}
	two: {x:10, y:350, width: 460}
	
timeIndicator.states.animationOptions =
	curve: "ease"
	time: .2
	
timeIndicatorCircle.states.add
	one: {x:-10, y: 280}
	two: {x: 5, y: 347.7}

timeIndicatorCircle.states.animationOptions =
	curve: "ease"
	time: .2

tueLayer.states.add
	one: {opacity: 1}
	two: {opacity: 0}
	
tueLayer.states.animationOptions =
	curve: "ease"
	time: .2

nineA.states.add
	one: {y: 240, opacity: 0}
	two: {y: 270, opacity: 1}

nineA.states.animationOptions =
	curve: "ease"
	time: .2
	
twoP.states.add
	one: {y: 630, opacity: 0}
	two: {y: 765, opacity: 1}

twoP.states.animationOptions =
	curve: "ease"
	time: .2