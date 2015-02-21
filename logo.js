

  var cvs = document.getElementById("logo");
var dim = Math.max(cvs.clientWidth, cvs.clientHeight);
context = cvs.getContext("2d");
//background(255);
var center = [cvs.width / 2, cvs.height / 2];

var arcs = []

var scafcolor = [202, 202, 202, 255];

var scale = 1.5;
var spacing = scale * 12 + 1.5 * Math.sqrt(scale);
var gapsize = spacing * .9;
var aRadWidth = 25 * scale;
var lineWidth = Math.sqrt(spacing) * .2 + .15 * spacing;
var numLayers = 3;
var round = 2 * scale;
var circRad = 40 * scale;

/* draw the innermost circle and the surrounding scaffolding */
var insideRad = aRadWidth * 1;
myArc(center, circRad - insideRad / 2, 0, insideRad, 2 * Math.PI, 0)(getColor());
myArc(center, circRad + spacing * .5, 0, lineWidth, 2 * Math.PI, 0)(scafcolor);
myArc(center, circRad - (insideRad + spacing * .2 + aRadWidth * .055 + lineWidth * .5), 0, lineWidth, 2 * Math.PI, 0)(scafcolor);

/*                  -------------------                    */


/* create the arcs and scaffolding */
var radius = circRad + aRadWidth * .5 + spacing;
var breaks = createBreaks(numLayers);
var scaf = [];
radius = circRad + aRadWidth * .5 + spacing;
for(var i = 0; i < numLayers; i++){
  arcs = arcs.concat(layer(center, radius, aRadWidth, breaks[i], gapsize, myArc, round));
  var b = i+1 === breaks.length ? [] : breaks[i+1];
  scaf = scaf.concat(scaffold(center, radius, aRadWidth + spacing, lineWidth, breaks[i], b));

  radius += aRadWidth + spacing;
}
/*         ----------------         */


/* draw */
for(var i = 0; i < scaf.length; i++){
  scaf[i](scafcolor);
}

for(var i = 0; i < arcs.length; i++){
  arcs[i](getColor());
}
/* ---- */

