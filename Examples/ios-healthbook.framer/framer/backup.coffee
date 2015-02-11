# Made with Framer
# by Jayaprasad Mohanan
# www.framerjs.com

Healthbook = Framer.Importer.load "imported/tryout2"
    
# Initial notification animation
Healthbook.Notification.y= -500
Healthbook.Notification.animate
	properties:
		x: 0; y:0
	curve:"spring(200,30)"

# Placing the cards off screen
Healthbook.Welcome.y = -1136
Healthbook.Emergencycard.y = -1136
Healthbook.Activity.y = -1136
Healthbook.Cholestrol.y = -1136
Healthbook.Respiratoryrate.y = -1136
Healthbook.Heartrate.y = -1136
Healthbook.Sleep.y = -1136
Healthbook.Nutrition.y = -1136
Healthbook.Healthbookicon.visible = true
Healthbook.Watch.visible = false

# On clicking the healthbook icon from the home screen
Healthbook.Healthbookicon.on Events.Click, ->
	Healthbook.Notification.animate
		properties:
			y: -200
		curve:"spring(200,30)"
	Healthbook.Springboard.visible= false
	Healthbook.Healthbookicon.visible= false
	Healthbook.Welcome.animate
		properties:
			y: 90
		curve: "spring(180,30,150)"

# On clicking the notification, the welcome card slides in
Healthbook.Notification.on Events.Click, ->
	Healthbook.Notification.animate
		properties:
			x: 0; y: -200
		curve:"spring(200,30)"
	Healthbook.Springboard.visible= false
	Healthbook.Welcome.animate
		properties:
			y: 90
		curve:"spring(180,30,150)"
	Healthbook.Healthbookicon.visible= false
		
# On click of the Start Using Healthbook
Healthbook.Start.on Events.Click, ->
	Healthbook.Watch.visible= true
	Healthbook.Welcome.animate
		properties:
			x: 0; y :-1000
		curve:"spring(200,30)"
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:140
		curve:"spring(180,30,150)"
	Healthbook.Activity.animate
		properties:
			x: 0, y:280
		curve:"spring(180,30,150)"
		delay: .1
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y:420
		curve:"spring(180,30,150)"
		delay: .2
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y:560
		curve:"spring(180,30,150)"
		delay: .3
	Healthbook.Heartrate.animate
		properties:
			x: 0, y:700
		curve:"spring(180,30,150)"
		delay: .4
	Healthbook.Sleep.animate
		properties:
			x: 0, y:840
		curve:"spring(180,30,150)"
		delay: .5
	Healthbook.Nutrition.animate
		properties:
			x: 0, y:980
		curve:"spring(180,30,150)"
		delay: .6

# On click of the the watch icon
Healthbook.Watch.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:140
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y:280
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y:420
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y:560
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y:700
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y:840
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y:980
		curve:"spring(200,30)"

# On click of the Emergency Card
Healthbook.Emergencycard.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"

# On click of the Activity card
Healthbook.Activity.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"

# On click of the Cholestrol card
Healthbook.Cholestrol.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"
		
# On click of the Repiratory Rate card
Healthbook.Respiratoryrate.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"
		
# On click of the Heartrate card
Healthbook.Heartrate.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"
		
# On click of the Sleep card
Healthbook.Sleep.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"
		
# On click of the Nutrition card
Healthbook.Nutrition.on Events.Click, ->
	Healthbook.Emergencycard.animate
		properties:
			x: 0, y:1010
		curve:"spring(200,30)"
	Healthbook.Activity.animate
		properties:
			x: 0, y: 1030
		curve:"spring(200,30)"
	Healthbook.Cholestrol.animate
		properties:
			x: 0, y: 1050
		curve:"spring(200,30)"
	Healthbook.Respiratoryrate.animate
		properties:
			x: 0, y: 1070
		curve:"spring(200,30)"
	Healthbook.Heartrate.animate
		properties:
			x: 0, y: 1090
		curve:"spring(200,30)"
	Healthbook.Sleep.animate
		properties:
			x: 0, y: 1110
		curve:"spring(200,30)"
	Healthbook.Nutrition.animate
		properties:
			x: 0, y: 140
		curve:"spring(200,30)"