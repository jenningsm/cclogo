
var layerrnd = 2.65;

/*
   creates a layer of core arcs

   center: center points around which the layer is oriented
   radius: radius of the layer at its midpoint
   radWidth: the radial width of the layer
   breaks: the points (in radians) at which there should be a gap in the layer
   gapSize: the width of those gaps, in pixels
   arcGen: the function to use to generate arcs

*/
function layer(center, radius, radWidth, breaks, gapSize, arcGen){

  breaks.sort();

  //convert from pixels to radians
  var gap = gapSize / radius;


  /*
     no two breaks (or gaps) should be closer to each other than 2 * gap
       (2 * gap was a somewhat arbitary choice)

     this part of the code goes through finding gaps that are closer than
      2 * gap to each other, removing one gap from each such pair
  */
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

  //add all the painters for the arcs to the arcs array
  var arcs = [];
  for(var i = 0; i < breaks.length - 1; i++){
    var startAt = breaks[i] + gap * .5;
    var rotWidth = (breaks[i+1] - breaks[i]) - gap;
    arcs.push(arcGen(center, radius, startAt, radWidth, rotWidth, layerrnd));
  }

  //add the painter for the last arc that goes over the 0 radians line
  var lastSpot = (Math.PI * 2 - breaks[breaks.length - 1]) + breaks[0];
  var startAt = breaks[breaks.length-1] + gap * .5;
  arcs.push(arcGen(center, radius, startAt, radWidth, lastSpot - gap, layerrnd));

  return arcs;

}
