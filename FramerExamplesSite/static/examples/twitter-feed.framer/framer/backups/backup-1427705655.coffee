# Import
bg = new BackgroundLayer backgroundColor:"#FFF"
sketch = Framer.Importer.load "imported/twitter-feed"

# Name
feed = sketch.feed
photo = sketch.photo
pic = sketch.pic
tweets = sketch.tweets
tweets.opacity = 0

# Scroll
scroll = ScrollComponent.wrap(feed)
scroll.height -= sketch.tabbar.height
scroll.scrollHorizontal = false

# Modulate
scroll.on Events.Scroll, ->

	# Pull down
	photo.scale = Utils.modulate(scroll.scrollY, [0, -600], [1, 3], true)
	photo.blur = Utils.modulate(scroll.scrollY, [-150, -600], [0, 30], true)

	# Reset
	if scroll.content.y > 300
		scroll.content.y = 300

	# Pull up
	pic.scale = Utils.modulate(scroll.scrollY, [0, 100], [1, 0.6], true)
	pic.x = Utils.modulate(scroll.scrollY, [0, 100], [19, 0], true)
	pic.y = Utils.modulate(scroll.scrollY, [0, 100], [0, 20], true)
	photo.y = Utils.modulate(scroll.scrollY, [0, 100], [-100, -200], true)
	tweets.y = Utils.modulate(scroll.scrollY, [200, 400], [137, 55], true)
	tweets.opacity = Utils.modulate(scroll.scrollY, [300, 400], [0, 1], true)

	if scroll.content.y < -115
		photo.index = 4
		photo.height = 334
		tweets.index = 5
	else
		photo.index = 0
		photo.height = 500