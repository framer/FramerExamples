# Made with Framer
# by Tes Mat
# www.framerjs.com

bg = new BackgroundLayer backgroundColor: "rgba(51, 204, 255, 1)"

#### Splash screen ####
splashScreen = new Layer
	x: 0, y: 0,
	width: 320*2, height: 568*2, 
	image: "images/LaunchImage.png"
	index: 6
	ignoreEvents: false  # disable scrolling or swiping when the splash screen is still visible

# Paging Scrollview
page = new PageComponent
	width: Screen.width, height: Screen.height
	scrollVertical: false
	index: 2

# Pages
amount = 6

# Array for page indicators
allIndicators = []

indicatorsContainer = new Layer 
	backgroundColor: "transparent"
	width: page.width, height: 12
	x: 0, y: 1102
	index: 5

# Generate indicators
for i in [0...amount]				
	indicator = new Layer 
		backgroundColor: "white"
		width: 12, height: 12
		x: 30 * i, y: 0
		borderRadius: "50%", opacity: 0.5
		superLayer: indicatorsContainer
	# Stay centered regardless of the amount of cards
	indicator.x += (page.width / 2) - 9 - (12 * amount)
	# States
	indicator.states.add(active: {opacity: 1})
	indicator.states.animationOptions = time: 0.5
	# Store indicator in array
	allIndicators.push(indicator)


#### PAGE 1 ####
page1 = new Layer 
	backgroundColor: "transparent"
	width: page.width, 
	height: page.height 
	x: 0
	superLayer: page.content

# Page 1 - content
iPhone = new Layer
	y:82*2,
	width:150*2, height:300*2
	image:"images/phone.png"
	superLayer: page1
iPhone.centerX()

IF_lets_you_create = new Layer
	x:42*2, y:402*2, 
	width:470, height:130,
	image:"images/IF_lets_you_create.png"
	superLayer: page1

byIFTTT = new Layer
	x:111*2, y:491*2, 
	width:98*2, height:30*2,
	image:"images/byIFTTT.png"
	superLayer: page1

# Page 1 - content NOT in scrollview
instagram = new Layer
	x: 25*2, y: 199*2, 
	width: 55*2, height: 55*2, 
	image: "images/instagram.png"
	index: 2
rss_feed = new Layer
	x: 45*2, y: 264*2, 
	width: 36*2, height: 36*2, 
	image: "images/rss_feed.png"
	index: 1
weather = new Layer
	x: 37*2, y: 130*2, 
	width: 62*2, height: 62*2,
	image: "images/weather.png"
	index: 1
facebook = new Layer
	x: 241*2, y: 120*2, 
	width: 27*2, height: 27*2,
	image: "images/facebook.png"
	index: 1
gmail = new Layer
	x: 270*2, y: 175*2, 
	width: 31*2, height: 23*2,
	image: "images/gmail.png"
	index: 1
calendar = new Layer
	x: 203*2, y: 165*2, 
	width: 55*2, height: 50*2, 
	image: "images/icon_calendar.png"
	index: 2
stocks = new Layer
	x: 230*2, y: 219*2, 
	width: 61*2, height: 61*2, 
	image: "images/stocks.png"
	index: 1
soundcloud = new Layer
	x: 246*2, y: 292*2,
	width: 40*2, height: 40*2, 
	image: "images/soundcloud.png"
	index: 1


#### PAGE 2 ####
page2 = new Layer 
	backgroundColor: "transparent"
	width: page.width, height: page.height 
	x: page.width
	clip: false
	superLayer: page.content

# Page 2 - content
recipe_marker = new Layer
	x: 25*2, y:90*2,
	width:270*2, height:70*2,
	image:"images/recipe_marker.png"
	superLayer: page2
instagram_to_dropbox = new Layer
	x:17*2, y:168*2, 
	width:285*2, height:132*2,
	image:"images/instagram_to_dropbox.png"
	superLayer: page2
Save_my_Instagram_photos = new Layer
	x:16*2, y:81*2, 
	width:212*2, height:37*2, 
	image:"images/Save_my_Instagram_photos.png"
	superLayer: instagram_to_dropbox
Recipes_are_connections = new Layer
	x:61*2, y:318*2, 
	width:200*2, height:40*2, 
	image:"images/Recipes_are_connections.png"
	superLayer: page2


#### PAGE 3 ####
page3 = new Layer 
	backgroundColor: "transparent"
	width: page.width, height: page.height 
	x: page.width * 2
	superLayer: page.content

# Page 3 - content
recipe_descr = new Layer
	x: 10*2, y: 219*2, 
	width: 300*2, height: 214*2, 
	image: "images/recipe_description.png"
	superLayer: page3


#### PAGE 4 ####
page4 = new Layer 
	backgroundColor: "transparent"
	width: page.width, height: page.height 
	x: page.width * 3
	superLayer: page.content

# Page 4 - content
Unlock_the_power_of = new Layer
	x: 25*2, y: 83*2, 
	width: 269*2, height: 45*2, 
	image: "images/Unlock_the_power_of.png"
	superLayer: page4

# Page 4 - content NOT in scrollview
bottom_phone = new Layer
	x: 0, y: 860*2,
	width: 320*2, height:174*2,
	image: "images/bottom_phone.png"
	index: 3

trail_left_ =
	page3:
		y: (259*2) + page.height
	page4:
		y: 259*2
trail_left = new Layer
	x: 30*2, 
	y: trail_left_.page3.y, 
	width: 125*2, 
	height: 215*2, 
	image: "images/trail_left.png"
	originY: 0
	index: 3
	
ios_photos_ =
	page3:
		y: (250*2) + page.height
	page4:
		w: 91*2
		h: 91*2
		x: 26*2
		y: 250*2
	page5:
		w: 40*2
		h: 40*2
		x: 82*2
		y: 244*2
ios_photos = new Layer
	x: 26*2, 
	y: ios_photos_.page3.y, 
	width: 91*2, 
	height: 91*2,
	image: "images/ios_photos.png"
	originY: 0
	index: 3

trail_c_left_ =
	page3:
		y: (205*2) + page.height
	page4:
		y: 205*2
trail_center_left = new Layer
	x: 86*2,
	y: trail_c_left_.page3.y, 
	width: 80*2, 
	height: 254*2,
	image: "images/trail_center_left.png"
	originY: 0
	index: 2

ios_notif_ =
	page3:
		y: (160*2) + page.height
	page4:
		y: 160*2
ios_notif = new Layer
	x: 79*2,
	y: ios_notif_.page3.y,
	width: 91*2,
	height: 91*2,
	image: "images/ios_notifications.png"
	originY: 0
	index: 2

trail_c_right_ =
	page3:
		y: (207*2) + page.height
	page4:
		y: 207*2
trail_center_right = new Layer
	x: 168*2,
	y: trail_c_right_.page3.y,
	width: 96*2,
	height: 226*2,
	image: "images/trail_center_right.png"
	originY: 0
	index: 2

ios_loca_ =
	page3:
		y: (161*2) + page.height
	page4:
		w: 91*2
		h: 91*2
		x: 176*2
		y: 161*2
	page5:
		w: 40*2
		h: 40*2
		x: 84*2
		y: 114*2
ios_location = new Layer
	x: 176*2, 
	y: ios_loca_.page3.y, 
	width: 91*2, 
	height: 91*2, 
	image: "images/ios_location.png"
	originY: 0
	index: 2

trail_right_ =
	page3:
		y: (293*2) + page.height
	page4:
		y: 293*2
trail_right = new Layer
	x: 180*2,
	y: trail_right_.page3.y,
	width: 120*2,
	height: 165*2,
	image: "images/trail_right.png"
	originY: 0
	index: 3

ios_contacts_ =
	page3:
		y: (286*2) + page.height
	page4:
		w: 91*2
		h: 91*2
		x: 211*2
		y: 286*2
	page5:
		w: 40*2
		h: 40*2
		x: 82*2
		y: 373*2
ios_contacts = new Layer
	x: 211*2, 
	y: ios_contacts_.page3.y, 
	width: 91*2, 
	height: 91*2, 
	image: "images/ios_contacts.png"
	originY: 0
	index: 3


#### PAGE 5 ####
page5 = new Layer 
	backgroundColor: "transparent"
	width: page.width, height: page.height 
	x: page.width * 4
	superLayer: page.content

# Page 5 - content
Some_example_Recipes = new Layer
	x: 63*2, y: 55*2,
	width: 193*2, height: 20*2,
	image: "images/Some_example_Recipes.png"
	superLayer: page5
location_to_twitter_background = new Layer
	x: 17*2, y: 90*2, 
	width: 285*2, height: 132*2, 
	image: "images/location_to_twitter_background.png"
	superLayer: page5
Nearly_home_Direct = new Layer
	x:15*2, y:81*2, 
	width:220*2, height:37*2, 
	image:"images/Nearly_home_Direct.png"
	superLayer: location_to_twitter_background
camera_to_email_background = new Layer
	x: 17*2, y: 219*2, 
	width: 285*2, height: 132*2, 
	image: "images/camera_to_email_background.png"
	superLayer: page5
Email_your_new_iPhone = new Layer
	x: 15*2, y: 81*2, 
	width: 222*2, height: 37*2, 
	image:"images/Email_your_new_iPhone.png"
	superLayer: camera_to_email_background
contacts_to_gdrive_background = new Layer
	x: 17*2, y: 348*2, 
	width: 285*2, height:132*2, 
	image: "images/contacts_to_gdrive_background.png"
	superLayer: page5
Backup_your_contacts = new Layer
	x: 15*2, y: 81*2, 
	width: 248*2, height: 37*2, 
	image: "images/Backup_your_contacts.png"
	superLayer: contacts_to_gdrive_background


#### PAGE 6 ####
page6 = new Layer 
	backgroundColor: "transparent"
	width: page.width, height: page.height 
	x: page.width * 5
	clip: false
	superLayer: page.content

# Page 6 - content
big_IF = new Layer
	x: 111*2, y:115*2, 
	width: 97*2, height: 81*2, 
	image: "images/Big IF.png"
	superLayer: page6


placeholders_signUp = new Layer
	x: 41*2, y: 245*2, 
	width: 77*2, height: 104*2, 
	image: "images/placeholders_signUp.png"
	superLayer: page6
	
placeholders_signIn = new Layer
	x: 41*2, y: 245*2,
	width: 144*2, height: 59*2, 
	image: "images/placeholders_signIn.png"
	superLayer: page6
	opacity: 0
	
placeholder_resetPassword = new Layer
	x: 41*2, y: 246*2, 
	width: 40*2, height: 14*2, 
	image:"images/placeholder_resetPassword.png"
	superLayer: page6
	opacity: 0


inputFieldsTop = new Layer
	x: 25*2, y: 457, 
	width: 270*2, 
	height: 5*2, 
	image:"images/FormFlexTop.png"
	superLayer: page6

inputFieldsMask = new Layer
	backgroundColor: "transparent"
	x: 25*2, y: 467, 
	width: 270*2, 
	height: 132*2
	superLayer: page6, clip: true

inputFields = new Layer
	x: 0, y: 0, 
	width: 270*2, 
	height: 132*2, 
	image: "images/FormFlexBottom.png"
	superLayer: inputFieldsMask, clip: true
inputFields.states.add 
	signup: { y: 0 }
	signin: { y: -45*2 }
	resetpassw: { y: -88*2 }
inputFields.states.animationOptions = 
	curve: "spring(1000,40,0)"


reset_password_small = new Layer
	x: 106*2, y: (338*2)-1, 
	width: 108*2, height: 24*2, 
	image: "images/Reset Password small.png"
	superLayer: page6
	opacity: 0
	ignoreEvents = true
reset_password_small.on Events.Click, ->
	switchToState("resetpassw")
	
cancel_small = new Layer
	x: 133*2, 
	y: 285*2, 
	width: 53*2, height: 24*2, 
	image: "images/Cancel small.png"
	superLayer: page6
	opacity: 0
	ignoreEvents = true
cancel_small.on Events.Click, ->
	switchToState("signin")


whiteButton = new Layer 
	backgroundColor: "white"
	width: 270*2, height: 61*2
	x: 25*2, y: 382*2
	borderRadius: 3*2
	superLayer: page6
whiteButton.on Events.TouchStart, ->
	this.animate
		properties: {opacity:0.75}
		time: 0.2
whiteButton.on Events.TouchEnd, ->
	this.animate
		properties: {opacity:1}
		time: 0.2

buttonLabel_createAccount = new Layer
	y: 20*2, width: 151*2, height: 18*2,
	image: "images/Create Account.png"
	superLayer: whiteButton
buttonLabel_createAccount.centerX()

buttonLabel_SignIn = new Layer
	y: 20*2, width: 65*2, height: 22*2, 
	image: "images/Sign in.png"
	superLayer: whiteButton
	visible: false
buttonLabel_SignIn.centerX()

buttonLabel_resetPassword = new Layer
	y: 20*2, width: 152*2, height: 23*2, 
	image: "images/Reset password.png"
	superLayer: whiteButton
	visible: false
buttonLabel_resetPassword.centerX()


text_SignIn = new Layer
	x: 25*2, y: 481*2,
	width: 539, height: 95, 
	image: "images/text_SignIn.png"
	superLayer: page6
text_SignIn.on Events.Click, ->
	switchToState("signin")

text_SignUp = new Layer
	x: 35*2, y: 482*2, 
	width: 250*2, 
	height: 95, 
	image: "images/text_SignUp.png"
	superLayer: page6
	visible: false
text_SignUp.on Events.Click, ->
	switchToState("signup")

# Set indicator for current page
current = page.horizontalPageIndex(page.currentPage)
allIndicators[current].states.switch("active")


#### Events ####
currentState = "signup"

switchToState = (state) ->
	if state == "signup"
	
		# hide ‘Sign in’ elements
		placeholders_signIn.animate
			properties: { opacity:0 }
			time: 0.25

		reset_password_small.animate
			properties: { opacity:0 }
			time: 0.25
			delay: 0.25
		reset_password_small.ignoreEvents = true
		
		Utils.delay 0.25, ->
			buttonLabel_SignIn.visible = false
			text_SignUp.visible = false

		# show ‘Sign up’ elements
		Utils.delay 0.25, ->
			inputFields.states.switch("signup")

		placeholders_signUp.animate
			properties: { opacity:1 }
			time: 0.25
			delay: 0.50
		
		Utils.delay 0.25, ->
			buttonLabel_createAccount.visible = true
			text_SignIn.visible = true

	else if state == "signin"
	
		if currentState == "resetpassw"

			# hide ‘Reset password’ elements
			placeholder_resetPassword.animate
				properties: { opacity:0 }
				time: 0.25
	
			Utils.delay 0.25, ->
				buttonLabel_resetPassword.visible = false
				
			# small ‘reset password’ text replaces ‘Cancel’ and animates down
			cancel_small.opacity = 0
			cancel_small.ignoreEvents = true
			reset_password_small.visible = true
			reset_password_small.y = 285*2
			reset_password_small.animate
				properties: { opacity:1 }
				time: 0
				delay: 0.25
			reset_password_small.animate
				properties: { y:(338*2)-1 }
				time: 0.20
				delay: 0.25
			reset_password_small.ignoreEvents = false
			
			# ‘Dont‘t have an account’ text fades in when returning from Reset Password 
			text_SignUp.visible = true
			text_SignUp.animate
				properties: { opacity:1 }
				time: 0.25
				delay: 0.25
			text_SignUp.ignoreEvents = false

		else
			# hide ‘Sign Up’ elements
			placeholders_signUp.animate
				properties: { opacity:0 }
				time: 0.25
			
			Utils.delay 0.25, ->
				buttonLabel_createAccount.visible = false
				text_SignIn.visible = false
			
			# small ‘reset password’ text just appears
			reset_password_small.visible = true
			reset_password_small.animate
				properties: { opacity:1 }
				time: 0.50
				delay: 0.25
			reset_password_small.ignoreEvents = false

		# show ‘Sign in’ elements
		Utils.delay 0.25, ->
			inputFields.states.switch("signin")
		
		placeholders_signIn.animate
			properties: { opacity:1 }
			time: 0.25
			delay: 0.50
		
		Utils.delay 0.25, ->
			buttonLabel_SignIn.visible = true
			text_SignUp.visible = true

	else if state == "resetpassw"
	
		# hide ‘Sign in’ elements
		placeholders_signIn.animate
			properties: { opacity:0 }
			time: 0.25
		
		Utils.delay 0.25, ->
			reset_password_small.visible = false
			buttonLabel_SignIn.visible = false
		
		text_SignUp.animate
			properties: { opacity:0 }
			time: 0.25
			delay: 0.25
		text_SignUp.ignoreEvents = true
	
		# show ‘Reset password’ elements
		Utils.delay 0.25, ->
			inputFields.states.switch("resetpassw")
		
		placeholder_resetPassword.animate
			properties: { opacity:1 }
			time: 0.25
			delay: 0.50

		cancel_small.y = 338*2
		cancel_small.animate
			properties: { opacity:1 }
			time: 0
			delay: 0.25
		cancel_small.animate
			properties: { y:285*2 }
			time: 0.20
			delay: 0.25
		cancel_small.ignoreEvents = false

		Utils.delay 0.25, ->
			buttonLabel_resetPassword.visible = true
			text_SignUp.visible = false

	currentState = state 


# Listen to the Move event
page.on Events.Move, ->

	# from page 1 to page 2
	weather.x		= 37*2	+ ( page.scrollX * 1.7 )
	instagram.x	= 25*2	+ ( page.scrollX * 1.5 )
	rss_feed.x		= 45*2	+ ( page.scrollX * 0.9 )
	facebook.x		= 241*2	+ ( page.scrollX * 0.55 )
	calendar.x		= 203*2	+ ( page.scrollX * 1.3 )
	gmail.x			= 270*2	+ ( page.scrollX * 0.4 )
	stocks.x		= 230*2	+ ( page.scrollX * 1.5 )
	soundcloud.x	= 246*2	+ ( page.scrollX * 1 )
	
	# from page 2 to page 3
	recipe_marker.x = Utils.modulate(page.scrollX, [page.width*1, page.width*2], 
						[25*2, (25*2) + page.width], true)
	instagram_to_dropbox.x = Utils.modulate(page.scrollX, [page.width*1, page.width*2], 
						[17*2, (17*2) + page.width], true)

	# from page 3 to page 4
	recipe_descr.x 	= Utils.modulate(page.scrollX, [page.width*2, page.width*3], 
							[10*2, -page.width*1.5], true)

	bottom_phone.y	= Utils.modulate(page.scrollX, [page.width*2, page.width*3], 
							[860*2, 308*2], true)

	trail_left.scaleX		= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[0.1, 1], true)
	trail_left.y 			= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[trail_left_.page3.y, trail_left_.page4.y], true)
	trail_left.opacity	= Utils.modulate(page.scrollX, [page.width*2.4, page.width*3], 
							[0, 1], true)
	
	ios_photos.scale 	= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[0.50, 1], true)
	ios_photos.y		= Utils.modulate(page.scrollX, [page.width*2, page.width*3], 
							[ios_photos_.page3.y, ios_photos_.page4.y], true)

	trail_center_left.scaleX	= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
								[0.1, 1], true)
	trail_center_left.y      = Utils.modulate(page.scrollX, [page.width*2, page.width*3],
								[trail_c_left_.page3.y, trail_c_left_.page4.y], true)
	trail_center_left.opacity	= Utils.modulate(page.scrollX, [page.width*2.4, page.width*3], 
								[0, 1], true)

	ios_notif.scale 		= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[0.50, 1], true)
	ios_notif.y			= Utils.modulate(page.scrollX, [page.width*2, page.width*3], 
							[ios_notif_.page3.y, ios_notif_.page4.y], true)

	trail_center_right.scaleX 	= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
									[0.1, 1], true)
	trail_center_right.y			= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
									[trail_c_right_.page3.y, trail_c_right_.page4.y], true)
	trail_center_right.opacity 	= Utils.modulate(page.scrollX, [page.width*2.4, page.width*3], 
									[0, 1], true)

	ios_location.scale 	= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[0.50, 1], true)
	ios_location.y			= Utils.modulate(page.scrollX, [page.width*2, page.width*3], 
							[ios_loca_.page3.y, ios_loca_.page4.y], true)

	trail_right.scaleX 	= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[0.1, 1], true)
	trail_right.y			= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[trail_right_.page3.y, trail_right_.page4.y], true)
	trail_right.opacity	= Utils.modulate(page.scrollX, [page.width*2.4, page.width*3], 
							[0, 1], true)

	ios_contacts.scale 	= Utils.modulate(page.scrollX, [page.width*2, page.width*3],
							[0.50, 1], true)
	ios_contacts.y			= Utils.modulate(page.scrollX, [page.width*2, page.width*3], 
							[ios_contacts_.page3.y, ios_contacts_.page4.y], true)

	# from page 4 to page 5
	bottom_phone.x			= Utils.modulate(page.scrollX, [page.width*3, page.width*4],
							[0, -page.width], true)
	
	trail_left.x				= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[30*2, 30*2 - page.width], true)
	trail_center_left.x		= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[86*2, (86*2) - page.width], true)
	trail_center_right.x		= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[168*2, (168*2) - page.width], true)
	trail_right.x				= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[180*2, (180*2) - page.width], true)
	
	ios_notif.x				= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[79*2, (79*2) - page.width], true)
	ios_notif.opacity			= Utils.modulate(page.scrollX, [page.width*3,(page.width*3)+(50*2)], 
								[1,0], true)

	if page.scrollX >= page.width*3  # without this limitation Utils.modulate will override earlier calls
		
		trail_left.opacity	= Utils.modulate(page.scrollX, [page.width*3,(page.width*3)+(20*2)], 
								[1,0], true)
		trail_center_left.opacity = Utils.modulate(page.scrollX, [page.width*3,(page.width*3)+(20*2)], 
								[1,0], true)
		trail_center_right.opacity = Utils.modulate(page.scrollX, [page.width*3,(page.width*3)+(20*2)], 
								[1,0], true)
		trail_right.opacity	= Utils.modulate(page.scrollX, [page.width*3,(page.width*3)+(20*2)], 
								[1,0], true)

		ios_photos.width		= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_photos_.page4.w, ios_photos_.page5.w], true)
		ios_photos.height		= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_photos_.page4.h, ios_photos_.page5.h], true)
		ios_photos.x			= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_photos_.page4.x, ios_photos_.page5.x], true)
		ios_photos.y			= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_photos_.page4.y, ios_photos_.page5.y], true)

		ios_location.width	= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_loca_.page4.w, ios_loca_.page5.w], true)
		ios_location.height	= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_loca_.page4.h, ios_loca_.page5.h], true)
		ios_location.x			= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_loca_.page4.x, ios_loca_.page5.x], true)
		ios_location.y			= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_loca_.page4.y, ios_loca_.page5.y], true)

		ios_contacts.width	= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_contacts_.page4.w, ios_contacts_.page5.w], true)
		ios_contacts.height	= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_contacts_.page4.h, ios_contacts_.page5.h], true)
		ios_contacts.x			= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_contacts_.page4.x, ios_contacts_.page5.x], true)
		ios_contacts.y			= Utils.modulate(page.scrollX, [page.width*3, page.width*4], 
								[ios_contacts_.page4.y, ios_contacts_.page5.y], true)

	# from page 5 to page 6
	if page.scrollX >= page.width*4 # without this limitation Utils.modulate will override earlier calls
		ios_photos.x 		= Utils.modulate(page.scrollX, [page.width*4, page.width*5], 
								[ios_photos_.page5.x, ios_photos_.page5.x - page.width], true)
		ios_location.x		= Utils.modulate(page.scrollX, [page.width*4, page.width*5], 
								[ios_loca_.page5.x, ios_loca_.page5.x - page.width], true)
		ios_contacts.x		= Utils.modulate(page.scrollX, [page.width*4, page.width*5], 
								[ios_contacts_.page5.x, ios_contacts_.page5.x - page.width], true)

	whiteButton.x	= Utils.modulate(page.scrollX, [page.width*4, page.width*6], 
								[(25*2)+(page.width*1),(25*2)-(page.width*1)], true)

	text_SignIn.x	= Utils.modulate(page.scrollX, [page.width*4, page.width*6], 
								[(25*2)+(page.width*0.5),(25*2)-(page.width*0.5)], true)
	text_SignUp.x	= Utils.modulate(page.scrollX, [page.width*4, page.width*6], 
								[(35*2)+(page.width*0.5),(35*2)-(page.width*0.5)], true)

	indicatorsContainer.x	= Utils.modulate(page.scrollX, [page.width*4, page.width*5], 
								[0,-page.width*2], true)

# set page indicator on page change
page.on "change:currentPage", ->
	indicator.states.switch("default") for indicator in allIndicators
	current = page.horizontalPageIndex(page.currentPage)
	allIndicators[current].states.switch("active")


Utils.delay 2.0, ->
	splashScreen.animate
		properties: { opacity: 0.0, scale: 2 }
		time: 0.5
	splashScreen.ignoreEvents = true  # so PageComponent can react to events 
