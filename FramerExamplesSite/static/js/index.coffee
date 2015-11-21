loadExample = (loadExampleName) ->
	if ga?
		ga("send", "pageview", "/examples/#{loadExampleName}")

	$("#example").attr "src", "/static/examples/#{loadExampleName}"
	$("a.download").attr "href", "/static/examples/#{loadExampleName}.zip"

$(window).load ->
	loadExampleName = window.location.hash[1..]
	loadExample loadExampleName

$(document).ready ->

	showExample = (exampleName) ->
		if ga?
			ga("send", "pageview", "/examples/#{exampleName}")

		$("#example").attr "src", "/static/examples/#{exampleName}"
		$("a.download").attr "href", "/static/examples/#{exampleName}.zip"

	if not window.location.hash[1..]
		window.location.hash = "voice-onboarding.framer"
		loadExample "voice-onboarding.framer"

	$(".navigation figure a").click ->

		exampleName = $(@).attr("href")[1..]
		showExample exampleName

		$(".navigation figure").removeClass "active"
		$(@).parent().addClass "active"

		$(".navigation").removeClass "appear"
		$('#topbar').removeClass "active"


	$('#topbar img').click ->
	    $(".navigation").toggleClass "appear"
	    $('#topbar').toggleClass "active"
