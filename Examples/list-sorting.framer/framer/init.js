(function() {

function isFramerStudio() {
	return (navigator.userAgent.indexOf("FramerStudio") != -1)
}

function showAlert() {

	var alertNode = document.createElement("div")

	alertNode.classList.add("framerAlert")
	alertNode.innerHTML  = "Error: Chrome has security restrictions loading local files. Safari works fine.<br>"
	alertNode.innerHTML += " You can get Chrome to work by running this on a small webserver. "
	alertNode.innerHTML += "<a href='https://github.com/koenbok/Framer/wiki/LocalLoading'>Read more here</a>."
	
	console.log(alertNode.innerHTML)

	document.addEventListener("DOMContentLoaded", function(event) {
		document.body.appendChild(alertNode)
	})

}

function init() {

	if (isFramerStudio()) {
		return
	}

	// If no title was set we set it to the project folder name so
	// you get a nice name on iOS if you bookmark to desktop.
	document.addEventListener("DOMContentLoaded", function() {
		if (document.title == "") {
			document.title = window.location.pathname.replace(/\//g, "")
		}
	})

	xhr = new window.XMLHttpRequest()
	xhr.open("GET", "app.coffee", true)
	
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.responseText != "") {
			CoffeeScript.eval(xhr.responseText)
		} else {
			showAlert()
		}
	}
	
	xhr.send(null)

}

init()

})()
