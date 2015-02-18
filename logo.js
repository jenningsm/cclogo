

function setup(){
  var spot = document.getElementById("logo");
  var dim = Math.max(spot.clientWidth, spot.clientHeight);
  cvs = createCanvas(spot.offsetWidth, spot.offsetHeight);
  cvs.parent("logo");
  background(255);
  var center = [cvs.width / 2, cvs.height / 2];

  var arcs = []

  var scafcolor = [180, 180, 180, 180];

  var scale = 1;
  var circRad = 45 * scale;
  var spacing = 12.5 * Math.sqrt(scale);
  var gapsize = spacing * .9;
  var aRadWidth = 25 * scale;
  var lineWidth = spacing * .25;
  var numLayers = 3;
  var round = 1.5;

  var cl = getColor();
  fill(cl[0], cl[1], cl[2], cl[3]);
  noStroke();
  var insideRad = aRadWidth * 1.25;
  myArc(center, circRad - insideRad / 2, 0, insideRad, 2 * Math.PI, 0)(getColor());
  myArc(center, circRad + spacing * .5, 0, lineWidth, 2 * Math.PI, 0)(scafcolor);
  myArc(center, circRad - (insideRad + spacing * .42), 0, lineWidth, 2 * Math.PI, 0)(scafcolor);

  var radius = circRad + aRadWidth * .5 + spacing;
  var breaks = [];

  for(var i = 0; i < numLayers; i++){
    var nextbreak = [];

    var numbreaks = 3 + i * 2;

    var offset = 2 * Math.PI * Math.random();
    for(var j = 0; j < numbreaks; j++){
      var br = offset + j * (Math.PI * 2 / numbreaks) + (Math.random() - .5) * .5; 
      br = (br + Math.PI * 4) % (Math.PI * 2);
      nextbreak.push(br);
    }    

    breaks.push(nextbreak);
    radius += aRadWidth + spacing;
  }

  var scaf = [];
  radius = circRad + aRadWidth * .5 + spacing;
  for(var i = 0; i < numLayers; i++){

    arcs = arcs.concat(layer(center, radius, aRadWidth, breaks[i], gapsize, myArc, round));
    var b = i+1 === breaks.length ? [] : breaks[i+1];
    scaf = scaf.concat(scaffold(center, radius, aRadWidth + spacing, lineWidth, breaks[i], b));

    radius += aRadWidth + spacing;
  }

  for(var i = 0; i < scaf.length; i++){
    scaf[i](scafcolor);
  }

  for(var i = 0; i < arcs.length; i++){
    arcs[i](getColor());
  }
}
