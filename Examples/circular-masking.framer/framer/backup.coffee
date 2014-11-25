# Made with Framer
# by Min-Sang Choi
# www.framerjs.com

bg = new BackgroundLayer backgroundColor:'#7DB6E6'

container = new Layer width:320, height:568, backgroundColor:'#fff',shadowY:1, shadowBlur:6, shadowColor:'rgba(0,0,0,0.2)'

imageLayer = new Layer 
	width:320, height:320, image:"images/1737623_597000450410327_1600827515_n.jpg"
	
circle = new Layer 
	width:100, height:100, backgroundColor:'transparent'

container.addSubLayer(imageLayer)
container.addSubLayer(circle)
circle.center()
circle.style =
	borderRadius:"50%"

circle.addSubLayer(imageLayer)
imageLayer._prefer2d = true
imageLayer.center()

textlabel = new Layer x:0, y:circle.y+circle.height+20, width:200, height:40, backgroundColor:'transparent'

textlabel.html = "Sapporo"
textlabel.style =
	textAlign:'center'
	fontFamily:'Roboto'
	color:'#000'

container.addSubLayer(textlabel)
textlabel.centerX()
		
myspring = 'cubic-bezier(0.4, 0, 0.2, 1)'
moveup = 500

scalemask = () ->
	textlabel.destroy()
	
	circle.animate
		properties:
			width:moveup
			height:moveup
			x:Math.floor(container.width/2-moveup/2)
			y:Math.floor(container.height/2-moveup/2)-150
		curve:myspring
		time:0.6
	
	imageLayer.animate
		properties:
			x:Math.floor(moveup/2-imageLayer.width/2)
			y:Math.floor(moveup/2-imageLayer.height/2)
		curve:myspring
		time:0.6
	
textarea = new Layer y:290, width:320, height:568, backgroundColor:'transparent', opacity:0
textarea.html ='Sapporo (札幌市 Sapporo-shi?) About this sound listen (help·info) is the fourth-largest city in Japan by population, and the largest city on the northern Japanese island of Hokkaido. Located in Ishikari Subprefecture, it is the capital of Hokkaido Prefecture, and an ordinance-designated city of Japan.

Sapporo is known outside Japan for having hosted the 1972 Winter Olympics, the first ever held in Asia, and for the city'

textarea.style = 
	color:'#666'
	fontSize:'16px'
	padding:'24px'
	
container.addSubLayer(textarea)
textarea.y = 280

circle.on Events.Click,->
	scalemask()
	
	textarea.animate
		delay:0.1
		properties:
			y:290
			opacity:1
		curve:myspring

container.center()
window.onresize = -> container.center()