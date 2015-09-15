/* Made with Framer
by Ed Chao
www.framerjs.com */

/* Variables */
var backdrop, convoWrapper, inputElement, keyboard, msgCount, msgHeight, screenHeight, screenWidth, statusBar, textInputLayer;

screenWidth = 640;

screenHeight = 1136;

msgCount = 0;

msgHeight = 150;

/* Layer Setup */

backdrop = new BackgroundLayer({
  backgroundColor: "#fff"
});

statusBar = new Layer({
  x: 14,
  y: 10,
  width: 616,
  height: 26,
  image: "images/statusbar.png"
});

convoWrapper = new Layer({
  x: 0,
  y: 70,
  width: screenWidth,
  height: 2000,
  backgroundColor: "transparent"
});

keyboard = new Layer({
  x: 0,
  y: 704,
  width: 640,
  height: 432,
  image: "images/keyboard.png"
});

/* Text input - Koen Bok
This creates a layer and tells it to listen to mouse events */

textInputLayer = new Layer({
  x: 0,
  y: 603,
  width: 640,
  height: 100
});

textInputLayer.ignoreEvents = false;

textInputLayer.style = {
  "border-top": "1px solid #c9c9c9"
};

/* This creates a text input and adds some styling in plain JS */

inputElement = document.createElement("input");

inputElement.style["width"] = textInputLayer.width + "px";

inputElement.style["height"] = textInputLayer.height + "px";

inputElement.style["font"] = "34px/1.35em Helvetica";

inputElement.style["-webkit-user-select"] = "text";

inputElement.style["padding-left"] = "20px";

inputElement.style["outline"] = "none";

/* Set the value, focus and listen for changes */

inputElement.placeholder = "Type a comment";

inputElement.value = "";

inputElement.focus();

inputElement.onkeyup = function(e) {

  /* Draw the message */
  var msgAuthor, msgAvatar, msgBubble, msgPreBubble, msgText, msgWrapper, textVal;
  if (e.keyCode === 13) {

    /* Set the textvalue */
    textVal = inputElement.value;

    /* Clear the value */
    inputElement.value = "";

    /* Message setup */
    msgWrapper = new Layer({
      superLayer: convoWrapper,
      y: 800,
      width: 640,
      height: 140,
      backgroundColor: "transparent"
    });
    msgWrapper.states.add({
      origin: {
        y: 800
      },
      dest: {
        y: msgCount * msgWrapper.height
      }
    });
    msgAvatar = new Layer({
      superLayer: msgWrapper,
      x: 30,
      y: 0,
      width: 80,
      height: 80,
      image: "images/profile_Ed.png"
    });
    msgBubble = new Layer({
      superLayer: msgWrapper,
      x: 130,
      width: 480,
      height: 114,
      borderRadius: 20,
      backgroundColor: "#EBF2FB",
      cut: false
    });
    msgPreBubble = new Layer({
      superLayer: msgBubble,
      width: 480,
      height: 114,
      borderRadius: 20,
      backgroundColor: "#FFF"
    });
    msgPreBubble.style = {
      "border": "2px solid #d9d9d9"
    };
    msgPreBubble.states.add({
      hide: {
        opacity: 0
      }
    });
    msgPreBubble.states.animationOptions = {
      curve: "spring(800,80,0)"
    };
    msgAuthor = new Layer({
      superLayer: msgBubble,
      x: 20,
      y: 20,
      width: 205,
      height: 24,
      backgroundColor: "transparent"
    });
    msgAuthor.html = "Ed Chao";
    msgAuthor.style = {
      "font-weight": "bold",
      "color": "#000"
    };
    msgText = new Layer({
      superLayer: msgBubble,
      x: 20,
      y: 60,
      width: 420,
      height: 80,
      backgroundColor: "transparent"
    });
    msgText.html = textVal;
    msgText.style = {
      "color": "#000"
    };

    /* Message Animations */
    msgWrapper.states["switch"]("dest", {
      curve: "spring(800,80,0)"
    });
    msgCount++;
    return Utils.delay(.5, function() {
      return msgPreBubble.states["switch"]("hide");
    });
  }
};

/* Place input layer on screen */

textInputLayer._element.appendChild(inputElement);
