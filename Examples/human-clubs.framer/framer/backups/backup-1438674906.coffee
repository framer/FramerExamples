


# Slowmotion trigger
# Framer.Loop.delta = 1 / 60 / 10

# This imports all the layers
sketch = Framer.Importer.load "imported/show-badges-prototype-9"

# Use "userName" instead of "sketch.userName"
Utils.globalLayers(sketch)

# Titlebar reset
titlebarbg.opacity = 0
pagetitle.opacity = 1
expandedmembers.opacity = 0
personcopy.opacity = 0
pagetitle.opacity = 0
writepost.opacity = 0

newlike.opacity = 0
newlike.scale = 0.4
threelikes.opacity = 0
newlikebottom.opacity = 0
newlikebottom.scale = 0.4

oneliked.opacity = 0

# Set origin of scale animation
expandedmembers.originX = 0
expandedmembers.scaleX = 0.1

# Background Color
bg = new BackgroundLayer 
	backgroundColor: "#1A1C1D"

# Animation Curve
buttonanimation = "spring(400,20,0)"
showstatsanimation = "spring(500,35,0)"
likeanimation = "spring(500,24,0)"

# Scroll content
scroll = ScrollComponent.wrap(copy)
scroll.frame = Screen.frame
scroll.contentInset = top: 619, left: 30

# No to horziontal scrolling
scroll.scrollHorizontal = false

# Scroll triggers background
scroll.on Events.Move, ->
	scrolltoY(scroll.scrollY)

scrolltoY = (y) ->
	coverphoto.y = Utils.modulate(y, [0, 280], [0, -280], true)
	coverphoto.blur = Utils.modulate(y, [0, 400], [0, 40], true)
	coverphoto.opacity = Utils.modulate(y, [0, 600], [1, 0.9], true)
	title.opacity = Utils.modulate(y, [0, 300], [1, 0], true)
	title.y = Utils.modulate(y, [0, 600], [475, -125], true)
	divider.y = Utils.modulate(y, [0, 600], [583, -17], true)
	pagetitle.opacity = Utils.modulate(y, [426, 456], [0, 1], true)
	pagetitle.y = Utils.modulate(y, [406, 456], [105, 65], true)
	titlebarbg.opacity = Utils.modulate(y, [454, 456 ], [0, 1], true)
	

# Add states
bottomcontent.states.add
	expand: {y: 220}
	collapse: {y: 0}
	expanded2: {y: 220}

newmember.states.add
	clear: {x: 770}

expandedmembers.states.add
	inactive: {opacity:1, x:400, scaleX:1}
	
othermembers.states.add
	darken: {opacity:0.4}
	lighten: {opacity:1}
	donker: {opacity:0.4}
	
personcopy.states.add
	show: {opacity:1}
	hide: {opacity:0}
	reshow: {opacity:1}
	
dude2.states.add
	darken: {opacity:0.4}
	lighten: {opacity:1}
	
dude1.states.add
	darken: {opacity:0.4}
	lighten: {opacity:1}

progress.states.add
	freddy: {x:132}
	sarah: {x:55}
	
freddycopy.states.add
	hide: {opacity:0}
	show: {opacity:1}

zlatancopy.states.add
	hide: {opacity:0}
	hoi: {opacity:1}

twolikes.states.add
	dissappear: {opacity: 0}
	
threelikes.states.add	
	appear: {opacity:1}
	
newlike.states.add
	liked: {opacity:1, scale: 1}
	hidden: {opacity:0, scale:0.4}
	
lastpost.states.add
	move: {y: lastpost.y+88}
	
newlikebottom.states.add
	liked: {opacity:1, scale: 1}
	
oneliked.states.add
	like: {opacity:1}
	
zeroliked.states.add
	unlike: {opacity:0}

# Animation connect
bottomcontent.states.animationOptions =
	curve: showstatsanimation
newmember.states.animationOptions =
	curve: showstatsanimation
expandedmembers.states.animationOptions =
	curve: showstatsanimation
othermembers.states.animationOptions =
	curve: showstatsanimation
personcopy.states.animationOptions =
	curve: showstatsanimation
dude2.states.animationOptions =
	curve: showstatsanimation
dude1.states.animationOptions =
	curve: showstatsanimation
progress.states.animationOptions =
	curve: showstatsanimation
freddycopy.states.animationOptions =
	curve: showstatsanimation
zlatancopy.states.animationOptions =
	curve: showstatsanimation
	
#like animation
newlike.states.animationOptions =
	curve: showstatsanimation
threelikes.states.animationOptions =
	curve: showstatsanimation
twolikes.states.animationOptions =
	curve: showstatsanimation
	
newlike.states.animationOptions =
	curve: likeanimation
newlikebottom.states.animationOptions =
	curve: likeanimation
	
oneliked.states.animationOptions =
	curve: likeanimation
zeroliked.states.animationOptions =
	curve: likeanimation
	
lastpost.states.animationOptions =
	curve: showstatsanimation


dude1.on Events.TouchStart, ->
	dude1.animate
		properties:
			scale: 0.9
		curve: buttonanimation

# Show leaderboard
dude1.on Events.TouchEnd, ->
	dude1.animate
		properties:
			scale: 1
		curve: buttonanimation
		
	bottomcontent.states.next(["expand", "collapse"])
	othermembers.states.next(["donker", "lighten"])
	personcopy.states.next(["show", "hide"])
	dude2.states.next(["darken", "lighten"])
	dude1.states.next("lighten")
	progress.states.next("freddy")
	freddycopy.states.next("show")
	zlatancopy.states.next("hide")
	
# Show second person
dude2.on Events.TouchStart, ->
	dude2.animate
		properties:
			scale: 0.9
		curve: buttonanimation
		
dude2.on Events.TouchEnd, ->
	dude2.animate
		properties:
			scale: 1
		curve: buttonanimation
		
	bottomcontent.states.next(["expanded2", "collapse"])
	othermembers.states.next(["darken", "lighten"])
	personcopy.states.next(["reshow", "hide"])
	dude2.states.next("lighten")
	dude1.states.next("darken", "lighten")
	progress.states.next("sarah")
	freddycopy.states.next("hide")
	zlatancopy.states.next("hoi")
		
# Newmember bounce
newmember.on Events.TouchStart, ->
	newmember.animate
		properties:
			scale: 0.9
		curve: buttonanimation
		
newmember.on Events.TouchEnd, ->
	newmember.animate
		properties:
			scale: 1
		curve: buttonanimation
		
	newmember.states.next()
	expandedmembers.states.next()

# Open comment sheet
newpost.on Events.Click, ->
	
	keyboard.animate
		properties:
			y: 902
		curve: "ease-in-out"
		time: 0.35


# New Like
toplikebutton.on Events.TouchStart, ->
	toplikebutton.animate
		properties:
			scale: 0.8
		curve: buttonanimation
		
toplikebutton.on Events.TouchEnd, ->
	toplikebutton.animate
		properties:
			scale: 1
		curve: buttonanimation
	
	threelikes.states.next()
	twolikes.states.next()
	newlike.states.next("liked", "hidden")
	

# New Like
likebuttonbottom.on Events.TouchStart, ->
	likebuttonbottom.animate
		properties:
			scale: 0.8
		curve: buttonanimation
		
likebuttonbottom.on Events.TouchEnd, ->
	likebuttonbottom.animate
		properties:
			scale: 1
		curve: buttonanimation
		
	lastpost.states.next()
	newlikebottom.states.next()
	oneliked.states.next()
	zeroliked.states.next()

	