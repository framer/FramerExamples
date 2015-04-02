(function() {
  var getParameterByName, loadScript;

  getParameterByName = function(name) {
    var regex, results;
    name = name.replace(/[\[]/, "\\[").replace(/[\]]/, "\\]");
    regex = new RegExp("[\\?&]" + name + "=([^&#]*)");
    results = regex.exec(location.search);
    if (results == null) {
      return "";
    } else {
      return decodeURIComponent(results[1].replace(/\+/g, " "));
    }
  };

  loadScript = function(path, callback) {
    return $.ajax({
      url: path,
      dataType: "text",
      success: function(data) {
        eval(data);
        return callback(data);
      },
      error: function(err) {
        console.log("err", err);
        return callback(err);
      }
    });
  };

  $(document).ready(function() {
    var exampleName;
    exampleName = getParameterByName("name");
    $("head").append($("<base href=\"/static/examples/" + exampleName + "/\">"));
    $('head').append($("<link rel=\"stylesheet\" type=\"text/css\" href=\"/static/examples/" + exampleName + "/framer/style.css\">"));
    return loadScript("framer/framer.js", function() {
      return loadScript("app.js", function() {});
    });
  });

}).call(this);
