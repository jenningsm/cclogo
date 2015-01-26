

function setup(){
  var spot = document.getElementById("logo");
  var dim = Math.max(spot.clientWidth, spot.clientHeight);
  cvs = createCanvas(spot.offsetWidth, spot.offsetHeight);
  cvs.parent("logo");
  background(255);
  var center = [cvs.width / 2, cvs.height / 2];

  var arcs = []

  var circRad = 45;
  var spacing = 10;
  var aRadWidth = 20;

  fill(Math.random() * 255, Math.random() * 255, Math.random() * 255, 128);
  noStroke();
  ellipse(center[0], center[1], circRad * 2, circRad * 2);

  var numLayers = Math.ceil((dim * .32 - circRad) / (spacing + aRadWidth));

  for(var i = 0; i < numLayers; i++){
    var radius = circRad + aRadWidth * .5 + spacing + (aRadWidth + spacing) * i;

    var breaks = [];
    for(var j = 0; j < Math.ceil(radius / 5); j++){
      breaks[j] = Math.random() * Math.PI * 2;
    }
    arcs = arcs.concat(layer(center, radius, aRadWidth, breaks, 12.5, myArc));

    for(var j = 0; j < breaks.length; j++){
      lineout(center, radius, aRadWidth, 3, breaks[j])([0, 0, 0, 100]);
    }

  }

  for(var i = 0; i < arcs.length; i++){
    arcs[i]([Math.random() * 255, Math.random() * 255, Math.random() * 255, 200]);
  }
}