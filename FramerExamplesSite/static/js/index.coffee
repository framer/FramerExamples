loadExample = (loadExampleName) ->
	if ga?
		ga("send", "pageview", "/examples/#{loadExampleName}")

	$("#code").attr "src", "code.html?name=#{loadExampleName}"
	$("#example").attr "src", "example.html?name=#{loadExampleName}"
	$("a.download").attr "href", "/static/examples/#{loadExampleName}.zip"

$(window).load ->
	loadExampleName = window.location.hash[1..]
	loadExample loadExampleName

$(document).ready ->

	showExample = (exampleName) ->
		if ga?
			ga("send", "pageview", "/examples/#{exampleName}")

		$("#code").attr "src", "code.html?name=#{exampleName}"
		$("#example").attr "src", "example.html?name=#{exampleName}"
		$("a.download").attr "href", "/static/examples/#{exampleName}.zip"

	if not window.location.hash[1..]
		window.location.hash = "animation-basics.framer"
		loadExample "animation-basics.framer"

	$(".navigation ul li a").click ->

		exampleName = $(@).attr("href")[1..]
		showExample exampleName

		$(".navigation ul li").removeClass "active"
		$(@).parent().addClass "active"

		$(".navigation").removeClass "appear"
		$('#topbar').removeClass "active"


	$('#topbar img').click ->
	    $(".navigation").toggleClass "appear"
	    $('#topbar').toggleClass "active"








