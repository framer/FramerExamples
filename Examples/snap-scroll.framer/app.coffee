# Made with Framer
# by Floris Verloop
# www.framerjs.com
sketch = Framer.Importer.load "imported/stream"
Utils.globalLayers(sketch)
Screen.backgroundColor = "#fff"
	
# Detail page
Detail.index = 100
Detail.x = Screen.width

Detail.states.add
	shown:
		x: 0
		
Detail.states.animationOptions =
	curve: "cubic-bezier(0.19, 1, 0.22, 1)"

DetailBack = new Layer
	height: 128, width: 100
	x: 0, y: 0
	backgroundColor: null
	superLayer: Detail.subLayersByName("navbarDetail")[0]

DetailBack.on Events.Click, ->
	Detail.states.switch("default")
	
DetailPost = new Layer
	height: 578, width: Screen.width
	x: 0, y: 128
	superLayer: Detail.subLayersByName("detailContent")[0]

# Stream
stream = new PageComponent
	width: Screen.width, height: Content.subLayers[0].height
	index: 70, clip: false
	scrollHorizontal: false
	
stream.animationOptions =
	curve: "spring(500, 36, 17)"
	
# Nav
Navigation.index = 80
Navigation.superLayer = stream
Navigation.subLayersByName("statBar")[0].subLayers[1].visible = false
Navigation.states.add
	hidden:
		maxY: 0
Navigation.states.animationOptions =
	curve: "spring(500, 36, 17)"
			
# on page change hide navigation
stream.on "change:currentPage", (event) ->
	if stream.direction is "down"
		Navigation.states.switch("hidden")
	else
		Navigation.states.switch("default")
	
# put all the posts in the pageComponent
for post, i in Content.subLayers.reverse()
	post.superLayer = stream.content
	post.y = i*(post.height-2)
	
	do (post) ->
		post.on Events.Click, ->
			Detail.states.switch("shown")
			DetailPost.image = post.subLayers[0].image
