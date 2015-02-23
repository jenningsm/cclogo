
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
