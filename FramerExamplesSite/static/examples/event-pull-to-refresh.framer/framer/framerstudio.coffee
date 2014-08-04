window.FramerStudio = {}

FramerStudio.reset = ->
	document.getElementById("FramerRoot")?.innerHTML = ""

FramerStudio.loadScript = (path) ->
	document.addEventListener "DOMContentLoaded", ->
		console.log "script.load #{path}"
		$("body").append($("<script src='#{path}'>"))

FramerStudio.compile = (code) ->
	
	# First try and compile the code. If that doesn't work report
	# a standard error with the line that contains the error.

	try
		result = CoffeeScript.compile(code, {
			sourceMap: true,
			filename: "generated.js"
		})
	catch e

		console.log "Compile error:", e

		if e instanceof SyntaxError

			errorMessage = e.stack

			# if errorMessage.indexOf("error: ") != -1
			# 	errorMessage = errorMessage.split("error: ")

			# console.log e

			err = new SyntaxError "#{errorMessage} (compile)"
			err.line = e.location.first_line + 1
			err.lineNumber = e.location.first_line + 1

			throw err

		else
			throw e

		# if e instanceof SyntaxError

		# 	errorMessage = e.stack

		# 	if errorMessage.indexOf("error: ") != -1
		# 		errorMessage = errorMessage.split("error: ")

		# 	err = new SyntaxError "#{errorMessage} (compile)"
		# 	err.line = e.location.first_line + 1
		# 	err.lineNumber = e.location.first_line + 1

		# 	throw err
		# else
		# 	throw e

	source = result.js

	# Then try and eval the code. Now if we get an error, intercept
	# see what the original line was and throw that error

	try
		eval source
	catch e
		
		console.log "Eval error:", e

		# sourceLines = source.split("\n")

		# compiledErrorLineNumber = e.line
		# compiledErrorLine = sourceLines[compiledErrorLineNumber-1]

		# errorLineNumber = 0
		# errorColNumber = 0

		# for line, lineIndex in sourceLines

		# 	results = []

		# 	for char, charIndex in line
			
		# 		loc = result.sourceMap.sourceLocation(
		# 			[lineIndex+1, charIndex+1])

		# 		if loc
		# 			results.push loc[0]

		# 	console.log lineIndex, line, results.join ","

		# compiledErrorLineNumber = e.line

		# sourceLines = source.split("\n")
		# sourceLinesMax = 0

		# for line, lineIndex in sourceLines

		# 	if lineIndex > compiledErrorLineNumber
		# 		break

		# 	for char, charIndex in line
			
		# 		loc = result.sourceMap.sourceLocation(
		# 			[lineIndex+1, charIndex+1])

		# 		if loc and loc[0] > sourceLinesMax
		# 			sourceLinesMax = loc[0]

		# errorLineNumber = sourceLinesMax

		# err = e.constructor "#{e.message} (eval)"
		# err.lineNumber = errorLineNumber + 1
		# err.line = errorLineNumber + 1

		# throw err
		
		sourceLines = source.split("\n")

		compiledErrorLineNumber = e.line
		compiledErrorLine = sourceLines[compiledErrorLineNumber-1]

		errorLineNumber = 0
		errorColNumber = 0
		
		# Estimate the col number, because safari doesn't give us that
		for i, c of compiledErrorLine

			loc = result.sourceMap.sourceLocation(
				[compiledErrorLineNumber-1, parseInt(i)])

			console.log "Line #{i}, #{loc}"

			if loc[0] > 0
				errorLineNumber = loc[0]
				errorColNumber  = loc[1]

		err = e.constructor "#{e.message} (eval)"
		err.lineNumber = errorLineNumber + 1
		err.line = errorLineNumber + 1

		throw err
