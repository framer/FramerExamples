# Made with Framer
# by Jorn van Dijk
# www.framerjs.com

Screen.scale = .1

# Sketch Import
bg = new BackgroundLayer backgroundColor: "#fff"
sketch = Framer.Importer.load "imported/twitter-feed"

# Set the imported layers as global layers, allowing us to target layers directly.
# We can now write "userName" instead of "sketch.userName"
Utils.globalLayers(sketch)
userName.opacity = 0

# Wrap the feed in a new ScrollComponent
scroll = ScrollComponent.wrap(feed)
scroll.frame = Screen.frame
scroll.contentInset = top: 210
scroll.height -= tabBar.height

feed.visible = false

# Only allow for vertical scrolling
scroll.scrollHorizontal = false

# On scroll, we adjust the properties of imported layers
scroll.on Events.Move, ->

	# Pull-down to scale and blur the profile image
	photo.scale = Utils.modulate(scroll.scrollY, [0, -300], [1, 3], true)
	photo.blur = Utils.modulate(scroll.scrollY, [-150, -300], [0, 30], true)

	# Limit the distance we can pull upwards to scale the image
	if scroll.content.y > 510
		scroll.content.y = 510

	# When pulling up:
	# 1. Transition the avatar
	avatar.scale = Utils.modulate(scroll.scrollY, [0, 100], [1, 0.6], true)
	avatar.y = Utils.modulate(scroll.scrollY, [0, 100], [0, 20], true)
	avatar.originX = 0
	
	# 2. Set the photo position
	photo.y = Utils.modulate(scroll.scrollY, [0, 100], [-100, -200], true)
	
	# 3. Fade-in the username
	userName.y = Utils.modulate(scroll.scrollY, [200, 400], [137, 55], true)
	userName.opacity = Utils.modulate(scroll.scrollY, [300, 400], [0, 1], true)
	
	# Re-arrange the hierarchy after a set distance
	if scroll.content.y < 90
		photo.placeBefore scroll
		userName.placeBefore photo
		photo.height = 334
	else
		scroll.placeBefore photo
		photo.height = 500