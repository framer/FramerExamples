# Made with Framer
# by Rıza Selçuk Saydam
# www.framerjs.com

layers = Framer.Importer.load "imported/Framer - WebMagazin"

# Visibility
layers.LogoSmall.opacity = 0
layers.ShortLook.visible = true

# Define some variables
logo = layers.Logo
info = layers.Info
bg = layers.FirstBG
content = layers.Content

# Make the content group scrollable
content.scroll = true
content.bringToFront()

# Define a set of states
logo.states.add
	LongLook: {x:-30, y:-43, scale:0.465}
info.states.add
	LongLook: {opacity:0}
bg.states.add
	LongLook: {opacity:0}
content.states.add
	LongLook: {opacity:0, y:200}
content.states.switchInstant "LongLook"

# Animation options
Framer.Defaults.Animation =
  curve: "spring(500,40,0)"
info.states.animationOptions =
	time: 0.2
bg.states.animationOptions =
	time: 0.2
content.states.animationOptions =
	time: 0.3

# Click Events
layers.Notification.on Events.Click, ->
	logo.states.next()
	info.states.next()
	bg.states.next()
	content.states.next()
	Utils.delay 0.3, ->
		Utils.delay 0 , -> layers.ShortLook.visible = false
		Utils.delay 0 , -> layers.LogoSmall.opacity = 1

layers.LogoSmall.on Events.Click, ->
	layers.ShortLook.visible = true
	layers.LogoSmall.opacity = 0
	logo.states.next()
	info.states.next()
	bg.states.next()
	content.states.next()