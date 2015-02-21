

function setup(){
  var spot = document.getElementById("logo");
  var dim = Math.max(spot.clientWidth, spot.clientHeight);
  cvs = createCanvas(spot.offsetWidth, spot.offsetHeight);
  cvs.parent("logo");
  background(255);
  var center = [cvs.width / 2, cvs.height / 2];

  var arcs = []

  var scafcolor = [202, 202, 202, 255];

  var scale = 1.5;
  var spacing = scale * 12 + 1.5 * Math.sqrt(scale);
  var gapsize = spacing * .9;
  var aRadWidth = 25 * scale;
  var lineWidth = sqrt(spacing) * .2 + .15 * spacing;
  var numLayers = 3;
  var round = 2 * scale;
  var circRad = 40 * scale;

  /* draw the innermost circle and the surrounding scaffolding */
  var cl = getColor();
  fill(cl[0], cl[1], cl[2], cl[3]);
  noStroke();
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
}


function createBreaks(numLayers){
  var breaks = [];
  for(var i = 0; i < numLayers; i++){

    var numbreaks = 3 + i * 2;
    var nextbreak;
    var apart;

    do {
      apart = true;
      nextbreak = [];
      var offset = 2 * Math.PI * Math.random();
      for(var j = 0; j < numbreaks; j++){
        var br = offset + j * (Math.PI * 2 / numbreaks) + (Math.random() - .5) * .5; 
        br = (br + Math.PI * 4) % (Math.PI * 2);
        nextbreak.push(br);
      }
      nextbreak.sort();

      /*
         We don't want the breaks of different layers to line up.
         This part checks if any of the breaks for this layer line up with any of the breaks
         from the last layer, and if they do, sets apart to false, so that a new set
         of breaks will be created for this layer.
      */
      if(i != 0){
        for(var j = 0, k = 0; j < nextbreak.length; j++){
          while(breaks[i-1][k] < nextbreak[j] && k !== breaks[i-1].length){
            k++;
          }
          for(var l = 0; l < 2; l++){
            var dist = Math.abs(breaks[i-1][(k + breaks[i-1].length - l) % breaks[i-1].length] - nextbreak[j]);
            dist = Math.min(dist, 2 * Math.PI - dist);
            if(dist < .15){
              apart = false;
            }
          }
        }
      }
    } while (!apart);
    breaks.push(nextbreak);
  }
  return breaks;
}
