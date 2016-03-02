# Made with Framer
# by George Kedenburg III
# www.framerjs.com

# Learn more about this prototype on Medium:
# "Using Parse to power up your Framer prototypes"
# http://bit.ly/1wZnFnv

# Adding some google fonts so we can have pretty type
Utils.insertCSS('@import url(http://fonts.googleapis.com/css?family=Oswald);')

new BackgroundLayer backgroundColor:'#000'

# Initialize Parse with the app keys corresponding to your app
Parse.initialize("TnfSqLwCmUhKyLEIG6Queyvfeh7JbPyGDmfXWA2Y", "THCk5uKPxQJlTIXgYmbJBTbwSVemu5TPoMQweCHJ");	
# Create an object that extends the class you want to pull data from
Locations = Parse.Object.extend("Locations")

# Create a query against the object you just created
queryLocations = new Parse.Query(Locations)

# We're looking for rows that have show set to true and we're going to sort them by name
queryLocations.equalTo "show", true

# Sort the response by state and then by city
queryLocations.ascending "state", "city"

# Creating an element to wrap up all of our locations and making it scrollable
locationList = new Layer width: 750, height: 1334, backgroundColor: 'transparent'
locationList.scroll = true

# Empty array that will hold all our locations
locationWrap = []

# Now we query the Parse class and do something with the data when we get it
queryLocations.find
	success: (results) ->
		# If the query is a success, we'll get back a results object. 
		# Let's go through each item recieved and set up a UI element for it
		for result, i in results
		
			# Create the containing element for each location
			locationWrap[i] = new Layer width: 750, height: 300, y: 300 * i, backgroundColor: '#333', superLayer: locationList
			
			# Set some styling
			locationWrap[i].style =
				fontFamily: 'Oswald'
				textTransform: 'uppercase'
				fontSize: '40px'
				letterSpacing: '5px'
				lineHeight: '100px'
				
			# This step below is critical if you plan on 
			# interacting and saving any of the data you've just gotten. 
			# We need to keep the Parse ID associated with the UI element so we can reference it later
			locationWrap[i].name = result.id
			
			# This prevents scrolling from triggering the like
			scrolling = false;
			locationWrap[i].on Events.TouchStart, ->
				scrolling = false;
			locationWrap[i].on Events.TouchMove, ->
				scrolling = true;	
			locationWrap[i].on Events.TouchEnd, ->
				if scrolling
					return false
				for subLayer in @.subLayers
					# check to see the state of the heart, and like or unlike
					if subLayer.name is 'heart'
						if subLayer.states.current is 'default'
							like(@)
						else
							unlike(@)
	
	# Let's make a photo layer for the background
			locationPhoto = new Layer width: 750, height: 300, backgroundColor: 'transparent', superLayer: locationWrap[i]
			locationPhoto.style = backgroundPosition: 'center center'
				
			# Set the image
			locationPhoto.image = result.attributes.image
	
	# Making a gradient to help the text be readable
			locationGradient = new Layer width: 750, height: 300, superLayer: locationWrap[i]
			locationGradient.style = 
				background: 'linear-gradient(to top, rgba(20,20,20,0.9) 5%,rgba(0,0,0,0) 100%)'
			
			# Creating the heart
			heart = new Layer x:0, y:0, width:220, height: 200, image:"images/heart-liked.png", superLayer: locationWrap[i], scale: 0, opacity: 0, name: 'heart', brightness: 1, invert: 100
			heart.center()
			
			# Adding states for like animation
			heart.states.add
				'liked':
					opacity: 1
					brightness: 100
					invert: 0
					scale: .15
					x: 595
					y: 141  		
				'like':
					opacity: .6
					scale: 1
				'fade':
					opacity: 0
					scale: 0
	
			heart.states.animationOptions =
				time: .3
				curve: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)'
			
			# Making the small heart
			heartHolder = new Layer width:220, height: 200, image:"images/heart-liked.png", superLayer: locationWrap[i], brightness: 1, invert: 100, scale: .15, x: 595, y: 141, opacity: .2 
			
			# Adding the city name
			locationName = new Layer width: 750, height: 100, backgroundColor: 'transparent', superLayer: locationWrap[i], x:30, y: 190
			
			# Create the location name from the returned city and state
			locationName.html = result.attributes.city + ', ' + result.attributes.state
			
			# Adding the likes
			locationLikes = new Layer width: 75, height: 75, maxX: 675,y: 190, superLayer: locationWrap[i], name: 'likeCount', backgroundColor: 'transparent'
			locationLikes.style =
				textAlign: 'right'
				
			# Setting the like count
			locationLikes.html = result.attributes.likes
	
	error: (error) ->
		# If there was an error, we'd print it
		print error		

# This is our like function, which we will call on 
# Double tap. we'll use it to increment the like count in our database
like = (target) ->
	# Same as when we initially pulled the location list,
	# we want to get the item we want to increment from 
	# Parse so we will need to query the Locations class
	likeGet = new Parse.Query(Locations)
	
	# Remember on line 32 when we saved the Parse ID to 
	# the layer name? this is where we use it. We tell 
	# Parse we want to get the object we just tapped on
	likeGet.get target.name,
	# If our call is successful, we'll get back a single 
	# row which I've called 'location'
	 success: (location) ->
	 	# We'll use this handy Parse helper called increment which 
	 	# will take the specific column 'likes' of our 'location' and increment it by 1
	 	location.increment('likes')
	 	# Now all we have to do is call save() on our location and the new like count is stored
	 	location.save()
	 	# Then we show a visual to the user with their new count
		for subLayer in target.subLayers
			# Find the like count and add 1 to it
			if subLayer.name is 'likeCount'
				likeCount = subLayer
				current = likeCount.html
				current++
				likeCount.html = current
			# animate the heart
			if subLayer.name is 'heart'
				heart = subLayer
				heart.states.switch('like')
				Utils.delay 0.5, ->
					heart.states.switch('liked',
						time: .1
					)

unlike = (target) ->
	likeGet = new Parse.Query(Locations)

	likeGet.get target.name,
		success: (location) ->
			# This function is the same as like, but we increment by a negative 1 which subtracts from the like count
			location.increment('likes', -1)
			location.save()

		for subLayer in target.subLayers
			if subLayer.name is 'likeCount'
				likeCount = subLayer
				current = likeCount.html
				current--
				likeCount.html = current
				
			if subLayer.name is 'heart'
				heart = subLayer
				heart.states.switch('fade')
				Utils.delay 0.5, ->
					heart.states.switchInstant('default')
