
var radialGap = .01;

function layer(center, radius, radWidth, breaks, gapSize, arcGen){

  breaks.sort();

  var gap = gapSize / radius;

  var settled = false;
  while(!settled) {
    settled = true;
    for(var i = 0; i < breaks.length - 1; i++){
      if((breaks[i+1] - breaks[i]) < gap * 2){
        breaks.splice(i, 1);
        i--;
        settled = false;
      }
    }
    var lastSpot = (Math.PI * 2 - breaks[breaks.length - 1]) + breaks[0];
    if(lastSpot < gap * 2){
      breaks.splice(breaks.length - 1, 1);
      settled = false;
    }
  }

  var arcs = [];
  for(var i = 0; i < breaks.length - 1; i++){
    var startAt = breaks[i] + gap * .5;
    var rotWidth = (breaks[i+1] - breaks[i]) - gap;
    arcs.push(arcGen(center, radius, startAt, radWidth, rotWidth, 4));
  }

  var lastSpot = (Math.PI * 2 - breaks[breaks.length - 1]) + breaks[0];
  var startAt = breaks[breaks.length-1] + gap * .5;
  arcs.push(arcGen(center, radius, startAt, radWidth, lastSpot - gap, 4));

  return arcs;

}
