# Made with Framer
# by Koen Bok
# www.framerjs.com

bg = new BackgroundLayer 
	backgroundColor: "#4DD0E1"

layerA = new Layer backgroundColor: "#fff", borderRadius: 4
layerA.x = Align.center
layerA.y = Align.center

bg.on Events.TouchMove, (event) ->
	delta =
		x: layerA.midX - Events.touchEvent(event).clientX
		y: layerA.midY - Events.touchEvent(event).clientY
	
	dist = Math.abs(delta.x) + Math.abs(delta.y)
	alpha = Utils.modulate dist, [0, 150], [0, .2], true
	
	layerA.shadowX = Utils.modulate delta.x, [0, Screen.width /2], [0, 50]
	layerA.shadowY = Utils.modulate delta.y, [0, Screen.height/2], [0, 50]
	layerA.shadowBlur = Utils.modulate dist, [0, 100], [5, 15]
	layerA.shadowColor = "rgba(0,0,0,#{alpha})"