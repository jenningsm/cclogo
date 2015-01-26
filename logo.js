

function setup(){
  var spot = document.getElementById("logo");
  var dim = Math.max(spot.clientWidth, spot.clientHeight);
  cvs = createCanvas(spot.offsetWidth, spot.offsetHeight);
  cvs.parent("logo");
  background(255);

  var arcs = []

  var circRad = 45;
  var spacing = 10;
  var aRadWidth = 20;

  fill(Math.random() * 255, Math.random() * 255, Math.random() * 255, 128);
  noStroke();
  ellipse(cvs.width / 2, cvs.height / 2, circRad * 2, circRad * 2);

  var numLayers = Math.ceil((dim * .32 - circRad) / (spacing + aRadWidth));

  for(var i = 0; i < numLayers; i++){
    var breaks = [];
    for(var i = 0; i < Math.ceil(radius / 5); i++){
      breaks[i] = Math.random() * Math.PI * 2;
    }
    var radius = circRad + aRadWidth * .5 + spacing + (aRadWidth + spacing) * i;
    arcs = arcs.concat(layer([cvs.width / 2, cvs.height / 2], radius, aRadWidth, breaks, 12.5, myArc));
  }

  for(var i = 0; i < arcs.length; i++){
    arcs[i]([Math.random() * 255, Math.random() * 255, Math.random() * 255, 200]);
  }
}
