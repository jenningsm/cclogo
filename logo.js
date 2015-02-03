

function setup(){
  var spot = document.getElementById("logo");
  var dim = Math.max(spot.clientWidth, spot.clientHeight);
  cvs = createCanvas(spot.offsetWidth, spot.offsetHeight);
  cvs.parent("logo");
  background(255);
  var center = [cvs.width / 2, cvs.height / 2];

  var arcs = []

  var scale = 1.5;
  var circRad = 45 * scale;
  var spacing = 11 * scale;
  var gapsize = 12.5;
  var aRadWidth = 25 * scale;
  var lineWidth = 2.5 * scale;
  var numLayers = 3;

  var cl = getColor();
  fill(cl[0], cl[1], cl[2], cl[3]);
  noStroke();
  var insideRad = aRadWidth * 1.25;
  myArc(center, circRad - insideRad / 2, 0, insideRad, 2 * Math.PI, 0)(getColor());
  myArc(center, circRad + spacing * .5, 0, lineWidth, 2 * Math.PI, 0)(scafcolor);
  myArc(center, circRad - (insideRad + spacing * .5), 0, lineWidth, 2 * Math.PI, 0)(scafcolor);

  var areas;
  var radius = circRad + aRadWidth * .5 + spacing;
  var breaks = [];

  for(var i = 0; i < numLayers; i++){
    var nextbreak = [];

    var numbreaks = Math.floor((i+2) * (1.5 + Math.random() * .7));
    var offset = 2 * Math.PI * Math.random();
    for(var j = 0; j < numbreaks; j++){
      var br = offset + j * (Math.PI * 2 / numbreaks) + (Math.random() - .5) * 3 / numbreaks;
      br = (br + Math.PI * 4) % (Math.PI * 2);
      nextbreak.push(br);
    }    

    breaks.push(nextbreak);
    radius += aRadWidth + spacing;
  }

  radius = circRad + aRadWidth * .5 + spacing;
  for(var i = 0; i < numLayers; i++){

    arcs = arcs.concat(layer(center, radius, aRadWidth, breaks[i], gapsize, myArc));
    var b = i+1 === breaks.length ? [] : breaks[i+1];
    areas = scaffold(center, radius, aRadWidth + spacing, lineWidth, breaks[i], b);

    radius += aRadWidth + spacing;
  }

  for(var i = 0; i < arcs.length; i++){
    arcs[i](getColor());
  }
}
