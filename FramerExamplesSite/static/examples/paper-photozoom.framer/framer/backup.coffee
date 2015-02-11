# Made with Framer
# by Wahlström
# www.framerjs.com

new BackgroundLayer backgroundColor: "black"
doc = Framer.Importer.load "imported/facebookpaper"
doc.darkfade = new Layer
	width: 640
	height: 1136
	backgroundColor: "black"
	opacity: 0
doc.photo.bringToFront()
doc.photo.draggable.enabled = true
doc.photo.orgframe = doc.photo.frame
doc.photo.originX = 0.5
doc.photo.originY = 0.5
doc.photo.shadowColor = "rgba(0,0,0,0.5)"
zoomed = false

doc.photo.on Events.DragStart, ->
	if zoomed is false
		doc.photo.animate
			properties:
				shadowY: 60
				shadowSpread: 10
				shadowBlur: 70
			time: 0.3
		doc.bg.animateStop()
		doc.bg.animate
			properties:
				scale: 0.97
			curve: "bezier-curve"
			curveOptions: "ease-out"
			time: 0.3
			
doc.photo.on Events.DragEnd, ->
	doc.bg.animateStop()
	doc.bg.animate
		properties:
			scale: 1
		curve: "bezier-curve"
		curveOptions: "ease-out"
		time: 0.3
	speed = doc.photo.draggable.calculateVelocity()
	if zoomed is false
		doc.darkfade.animate
			properties:
				opacity: 1
			curve: "bezier-curve"
			curveOptions: "ease-out"
			time: 0.3
		up = doc.photo.animate
			properties:
				y: @y+(speed.y*60)
				x: @x+(speed.x*60)
				scale: 1+(Math.abs(speed.y)/10)
			time: 0.1
			curve: "bezier-curve"
			curveOptions: "ease-in-out"
		up.on Events.AnimationEnd, -> doc.photo.animate
			properties:
				y: 250
				scale: 1
				x: 0
				width: 640
				height: 640
			curve: "spring(250,25,0)"
		zoomed = 1
	else # zoomed is true
		doc.photo.animateStop()
		doc.photo.animate
			properties:
				shadowY: 0
				shadowBlur: 0
				shadowSpread: 0
			curve: "spring(100,15)"
		doc.darkfade.animate
			properties:
				opacity: 0
			curve: "bezier-curve"
			curveOptions: "ease-out"
			time: 0.3
		down = doc.photo.animate
			properties:
				y: doc.photo.y+(speed.y*60)
				x: doc.photo.x+(speed.x*60)
				scale: 1-(Math.abs(speed.y)/10)
			time: 0.1
			curve: "bezier-curve"
			curveOptions: "ease-in-out"
		down.on Events.AnimationEnd, ->
			doc.photo.animate
				properties:
					x: doc.photo.orgframe.x
					y: doc.photo.orgframe.y
					width: doc.photo.orgframe.width
					height: doc.photo.orgframe.height
					scale: 1
				curve: "spring(200,23,0)"
		zoomed = false