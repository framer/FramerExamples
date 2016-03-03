require=(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({"contacts":[function(require,module,exports){
exports.people = {
  A: {
    names: ["Aaron Carámbula", "Adam Michela", "Adria Jimenez", "Andy Ngo"],
    images: ["images/aaron.png", "images/adam.png", "images/adria.png", "images/andy.png"]
  },
  B: {
    names: ["Ben Adamson", "Benjamin den Boer", "Blaise DiPersia", "Brandon Souba"],
    images: ["images/ben2.png", "images/ben.png", "images/blaise.png", "images/brandon.png"]
  },
  C: {
    names: ["Carlos Albertos", "Cemre Güngör", "Christian Baroni", "Christophe Tauziet"],
    images: ["images/carlos.png", "images/cemre.png", "images/christian.png", "images/christophe.png"]
  },
  D: {
    names: ["Daniël van der Winden", "David Lee", "David van Leeuwen", "Dominik Wiegand"],
    images: ["images/daniel.png", "images/david.png", "images/david2.png", "images/dominik.png"]
  },
  E: {
    names: ["Ed Chao", "Edward Sanchez", "Edwin van Rijkom", "Elliott Kember"],
    images: ["images/ed.png", "images/edward.png", "images/edwin.png", "images/elliott.png"]
  },
  F: {
    names: ["Fabrizio Bellomo", "Florian Ludwig", "Floris Verloop", "Fran Pérez"],
    images: ["images/fabrizio.png", "images/florian.png", "images/floris.png", "images/fran.png"]
  },
  G: {
    names: ["Gavin McFarland", "Geoff Teehan", "George Kedenburg III", "Giel Cobben"],
    images: ["images/gavin.png", "images/geoff.png", "images/george.png", "images/giel.png"]
  }
};


},{}]},{},[])
//# sourceMappingURL=data:application/json;charset:utf-8;base64,eyJ2ZXJzaW9uIjozLCJzb3VyY2VzIjpbIm5vZGVfbW9kdWxlcy9icm93c2VyaWZ5L25vZGVfbW9kdWxlcy9icm93c2VyLXBhY2svX3ByZWx1ZGUuanMiLCIvVXNlcnMvZmxvcmlzL0RvY3VtZW50cy9GcmFtZXJFeGFtcGxlcy9FeGFtcGxlcy9jb250YWN0cy1zY3JvbGwuZnJhbWVyL21vZHVsZXMvY29udGFjdHMuY29mZmVlIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBO0FDQ0EsT0FBTyxDQUFDLE1BQVIsR0FBaUI7RUFDaEIsQ0FBQSxFQUFJO0lBQ0gsS0FBQSxFQUFPLENBQUUsaUJBQUYsRUFBcUIsY0FBckIsRUFBcUMsZUFBckMsRUFBc0QsVUFBdEQsQ0FESjtJQUVILE1BQUEsRUFBUSxDQUFFLGtCQUFGLEVBQXNCLGlCQUF0QixFQUF5QyxrQkFBekMsRUFBNkQsaUJBQTdELENBRkw7R0FEWTtFQUtoQixDQUFBLEVBQUk7SUFDSCxLQUFBLEVBQU8sQ0FBRSxhQUFGLEVBQWlCLG1CQUFqQixFQUFzQyxpQkFBdEMsRUFBeUQsZUFBekQsQ0FESjtJQUVILE1BQUEsRUFBUSxDQUFHLGlCQUFILEVBQXNCLGdCQUF0QixFQUF3QyxtQkFBeEMsRUFBNkQsb0JBQTdELENBRkw7R0FMWTtFQVNoQixDQUFBLEVBQUk7SUFDSCxLQUFBLEVBQU8sQ0FBRSxpQkFBRixFQUFxQixjQUFyQixFQUFxQyxrQkFBckMsRUFBeUQsb0JBQXpELENBREo7SUFFSCxNQUFBLEVBQVEsQ0FBRSxtQkFBRixFQUF1QixrQkFBdkIsRUFBMkMsc0JBQTNDLEVBQW1FLHVCQUFuRSxDQUZMO0dBVFk7RUFhaEIsQ0FBQSxFQUFJO0lBQ0gsS0FBQSxFQUFPLENBQUUsdUJBQUYsRUFBMkIsV0FBM0IsRUFBd0MsbUJBQXhDLEVBQTZELGlCQUE3RCxDQURKO0lBRUgsTUFBQSxFQUFRLENBQUUsbUJBQUYsRUFBdUIsa0JBQXZCLEVBQTJDLG1CQUEzQyxFQUFnRSxvQkFBaEUsQ0FGTDtHQWJZO0VBaUJoQixDQUFBLEVBQUk7SUFDSCxLQUFBLEVBQU8sQ0FBRSxTQUFGLEVBQWEsZ0JBQWIsRUFBK0Isa0JBQS9CLEVBQW1ELGdCQUFuRCxDQURKO0lBRUgsTUFBQSxFQUFRLENBQUUsZUFBRixFQUFtQixtQkFBbkIsRUFBd0Msa0JBQXhDLEVBQTRELG9CQUE1RCxDQUZMO0dBakJZO0VBcUJoQixDQUFBLEVBQUk7SUFDSCxLQUFBLEVBQU8sQ0FBRSxrQkFBRixFQUFzQixnQkFBdEIsRUFBd0MsZ0JBQXhDLEVBQTBELFlBQTFELENBREo7SUFFSCxNQUFBLEVBQVEsQ0FBRSxxQkFBRixFQUF5QixvQkFBekIsRUFBK0MsbUJBQS9DLEVBQW9FLGlCQUFwRSxDQUZMO0dBckJZO0VBeUJoQixDQUFBLEVBQUk7SUFDSCxLQUFBLEVBQU8sQ0FBRSxpQkFBRixFQUFxQixjQUFyQixFQUFxQyxzQkFBckMsRUFBNkQsYUFBN0QsQ0FESjtJQUVILE1BQUEsRUFBUSxDQUFFLGtCQUFGLEVBQXNCLGtCQUF0QixFQUEwQyxtQkFBMUMsRUFBK0QsaUJBQS9ELENBRkw7R0F6QlkiLCJmaWxlIjoiZ2VuZXJhdGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXNDb250ZW50IjpbIihmdW5jdGlvbiBlKHQsbixyKXtmdW5jdGlvbiBzKG8sdSl7aWYoIW5bb10pe2lmKCF0W29dKXt2YXIgYT10eXBlb2YgcmVxdWlyZT09XCJmdW5jdGlvblwiJiZyZXF1aXJlO2lmKCF1JiZhKXJldHVybiBhKG8sITApO2lmKGkpcmV0dXJuIGkobywhMCk7dmFyIGY9bmV3IEVycm9yKFwiQ2Fubm90IGZpbmQgbW9kdWxlICdcIitvK1wiJ1wiKTt0aHJvdyBmLmNvZGU9XCJNT0RVTEVfTk9UX0ZPVU5EXCIsZn12YXIgbD1uW29dPXtleHBvcnRzOnt9fTt0W29dWzBdLmNhbGwobC5leHBvcnRzLGZ1bmN0aW9uKGUpe3ZhciBuPXRbb11bMV1bZV07cmV0dXJuIHMobj9uOmUpfSxsLGwuZXhwb3J0cyxlLHQsbixyKX1yZXR1cm4gbltvXS5leHBvcnRzfXZhciBpPXR5cGVvZiByZXF1aXJlPT1cImZ1bmN0aW9uXCImJnJlcXVpcmU7Zm9yKHZhciBvPTA7bzxyLmxlbmd0aDtvKyspcyhyW29dKTtyZXR1cm4gc30pIiwiIyBQZW9wbGVcbmV4cG9ydHMucGVvcGxlID0ge1xuXHRBIDoge1xuXHRcdG5hbWVzOiBbIFwiQWFyb24gQ2Fyw6FtYnVsYVwiLCBcIkFkYW0gTWljaGVsYVwiLCBcIkFkcmlhIEppbWVuZXpcIiwgXCJBbmR5IE5nb1wiIF1cblx0XHRpbWFnZXM6IFsgXCJpbWFnZXMvYWFyb24ucG5nXCIsIFwiaW1hZ2VzL2FkYW0ucG5nXCIsIFwiaW1hZ2VzL2FkcmlhLnBuZ1wiLCBcImltYWdlcy9hbmR5LnBuZ1wiIF1cblx0fVxuXHRCIDoge1xuXHRcdG5hbWVzOiBbIFwiQmVuIEFkYW1zb25cIiwgXCJCZW5qYW1pbiBkZW4gQm9lclwiLCBcIkJsYWlzZSBEaVBlcnNpYVwiLCBcIkJyYW5kb24gU291YmFcIl1cblx0XHRpbWFnZXM6IFsgIFwiaW1hZ2VzL2JlbjIucG5nXCIsIFwiaW1hZ2VzL2Jlbi5wbmdcIiwgXCJpbWFnZXMvYmxhaXNlLnBuZ1wiLCBcImltYWdlcy9icmFuZG9uLnBuZ1wiXVxuXHR9XG5cdEMgOiB7XG5cdFx0bmFtZXM6IFsgXCJDYXJsb3MgQWxiZXJ0b3NcIiwgXCJDZW1yZSBHw7xuZ8O2clwiLCBcIkNocmlzdGlhbiBCYXJvbmlcIiwgXCJDaHJpc3RvcGhlIFRhdXppZXRcIl1cblx0XHRpbWFnZXM6IFsgXCJpbWFnZXMvY2FybG9zLnBuZ1wiLCBcImltYWdlcy9jZW1yZS5wbmdcIiwgXCJpbWFnZXMvY2hyaXN0aWFuLnBuZ1wiLCBcImltYWdlcy9jaHJpc3RvcGhlLnBuZ1wiIF1cblx0fVxuXHREIDoge1xuXHRcdG5hbWVzOiBbIFwiRGFuacOrbCB2YW4gZGVyIFdpbmRlblwiLCBcIkRhdmlkIExlZVwiLCBcIkRhdmlkIHZhbiBMZWV1d2VuXCIsIFwiRG9taW5payBXaWVnYW5kXCJdXG5cdFx0aW1hZ2VzOiBbIFwiaW1hZ2VzL2RhbmllbC5wbmdcIiwgXCJpbWFnZXMvZGF2aWQucG5nXCIsIFwiaW1hZ2VzL2RhdmlkMi5wbmdcIiwgXCJpbWFnZXMvZG9taW5pay5wbmdcIiBdXG5cdH1cblx0RSA6IHtcblx0XHRuYW1lczogWyBcIkVkIENoYW9cIiwgXCJFZHdhcmQgU2FuY2hlelwiLCBcIkVkd2luIHZhbiBSaWprb21cIiwgXCJFbGxpb3R0IEtlbWJlclwiXVxuXHRcdGltYWdlczogWyBcImltYWdlcy9lZC5wbmdcIiwgXCJpbWFnZXMvZWR3YXJkLnBuZ1wiLCBcImltYWdlcy9lZHdpbi5wbmdcIiwgXCJpbWFnZXMvZWxsaW90dC5wbmdcIl1cblx0fVxuXHRGIDoge1xuXHRcdG5hbWVzOiBbIFwiRmFicml6aW8gQmVsbG9tb1wiLCBcIkZsb3JpYW4gTHVkd2lnXCIsIFwiRmxvcmlzIFZlcmxvb3BcIiwgXCJGcmFuIFDDqXJlelwiXVxuXHRcdGltYWdlczogWyBcImltYWdlcy9mYWJyaXppby5wbmdcIiwgXCJpbWFnZXMvZmxvcmlhbi5wbmdcIiwgXCJpbWFnZXMvZmxvcmlzLnBuZ1wiLCBcImltYWdlcy9mcmFuLnBuZ1wiIF1cblx0fVxuXHRHIDoge1xuXHRcdG5hbWVzOiBbIFwiR2F2aW4gTWNGYXJsYW5kXCIsIFwiR2VvZmYgVGVlaGFuXCIsIFwiR2VvcmdlIEtlZGVuYnVyZyBJSUlcIiwgXCJHaWVsIENvYmJlblwiXVxuXHRcdGltYWdlczogWyBcImltYWdlcy9nYXZpbi5wbmdcIiwgXCJpbWFnZXMvZ2VvZmYucG5nXCIsIFwiaW1hZ2VzL2dlb3JnZS5wbmdcIiwgXCJpbWFnZXMvZ2llbC5wbmdcIiBdXG5cdH1cbn0iXX0=
