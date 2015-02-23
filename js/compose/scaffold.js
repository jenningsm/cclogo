
/*
   SCAFFOLD: creates the thin 'scaffolding' lines that run between
   the larger arcs. The function called once for each layer. It returns
   an array of painters for the radial lines and the outer angular lines.

   center: [x,y] coordinate around which scaffold is centered
   radius: the radius at the halfway point (radially) of the layer
   radWidth: the radial width of the layer
   linesWidth: the width the scaffolding lines are to be made
   spots: where in this layer, the larger arcs break. the scaffolding must run
          throught these points.
   targets: the points in the next layer at which the larger arcs break. angular arcs
            must be laid such that there is scaffolding at the base of each these points.
            If this is an empty array, then the whole outer layer should be scaffolded.
*/
function scaffold(center, radius, radWidth, lineWidth, spots, targets){

  targets.sort();

  //coverage represents the portion of the outer layer that is currently
  //  covered by scaffolding as an array of start-end pairs
  var coverage = [];

  if(targets.length === 0){//if this is the outermost layer, cover whole area
    coverage = insertField(coverage, [0, Math.PI * 2]);
  } else {//else, create coverage
    coverage = connectBreaks(spots, targets);
  }

  //add some coverage to each growth spot and each target
  //this makes it so spots that didn't grow aren't naked
  // and spots that did grow have natural, random endpoints
  for(var i = 0; i < spots.length; i++){
    coverage = insertField(coverage, leafCoverage(spots[i]));
  }
  for(var i = 0; i < targets.length; i++){
    coverage = insertField(coverage, leafCoverage(targets[i]));
  }

  //wrap coverage around if it extends past 2 * PI or below 0
  coverage = wrapCoverage(coverage);

  //painters to be returned
  var ret = [];

  //add the radial lines
  for(var i = 0; i < spots.length; i++){
    ret.push(lineout(center, radius, radWidth - lineWidth, lineWidth, spots[i]));
  }
  //add the coverage
  for(var i = 0; i < coverage.length; i++){
    ret.push(myArc(center, radius + radWidth * .5, coverage[i][0], lineWidth, coverage[i][1] - coverage[i][0], 1));
  }

  return ret;
}



/* HELPER FUNCTIONS */

/*
  Creates the coverage connecting breaks.

  spots: the breaks of the current layer
  targets: the breaks of the next layer
 
  returns the coverage
*/
function connectBreaks(spots, targets){

  /*
     each of the targets is connected to one of the two spots on either
     side of it. Which of the two it is connected to is decided randomly
     but weighted by the distance of each spot from the target.
  */

  var coverage = [];
  var j = 0;
  //all targets between 0 radians and the spot with the smallest position (in radians)
  for(; targets[j] < spots[0]; j++){
    var dists = [Math.PI * 2 - Math.abs(spots[spots.length - 1] - targets[j]), Math.abs(spots[0] - targets[j])];
    coverage = insertField(coverage, pickSpot(targets[j], dists));
  }
  var i = 0;
  //all targets between the smallest spot and largets spot
  for(; i < spots.length - 1; i++){
    for(; targets[j] < spots[i+1]; j++){
      var dists = [Math.abs(spots[i] - targets[j]), Math.abs(spots[i+1] - targets[j])];
      coverage = insertField(coverage, pickSpot(targets[j], dists));
    }
  }
  //all targets between the largets spot and 2 * PI radians
  for(; j < targets.length; j++){
    var dists = [Math.abs(spots[spots.length - 1] - targets[j]), Math.PI * 2 - Math.abs(spots[0] - targets[j])];
    coverage = insertField(coverage, pickSpot(targets[j], dists));
  }
  return coverage;
}

/*
  arr is an array of two member arrays, each representing a start and end
  field is a two member array, representing a start and end

  insertField() returns arr with field inserted into it.
  if field overlaps with any of arr's existing elements, then those
  start-end pairs are combined into one start-end pair.
*/
function insertField(arr, field){

  var start = field[0];
  var end = field[1];

  if(start > end){
    end += 2 * Math.PI;
  }

  for(var k = 0; k < arr.length && start > arr[k][0]; k++);

  if(k === 0 || start > arr[k-1][1]){
    arr.splice(k, 0, [start, end]);
  } else {
    k--;
    arr[k][1] = Math.max(arr[k][1], end);
  }
  while(k+1 < arr.length && end > arr[k+1][0]){
    if(end < arr[k+1][1]){
      arr[k][1] = arr[k+1][1];
    }
    arr.splice(k+1, 1);
  }

  return arr;
}

/*
  returns coverage given a target and the distances to
    each of the two nearest spots. randomly selects from
    the two spots weighted by the distances

  target: the target's location
  d: a two member array containing the two distances
*/
function pickSpot(target, d){
  var extras = [];
  for(var i = 0; i < 2; i++){
    extras.push(.05 + Math.random() * .2);
  }
  if(Math.random() > d[0] / (d[0] + d[1])){
    return [target - d[0] * (1 + extras[0]) , target + d[0] * extras[1]];
  } else {
    return [target - d[1] * extras[0], target + d[1] * (1 + extras[1])];
  }
}


/*
   Returns coverage for leaf breaks that don't connect to another break

   spot: the location of the leaf break.
*/
var growMin = .03;
var growBreadth = 0.12;
function leafCoverage(spot){
  var growShift = Math.random();
  return [spot - (growMin + growShift * growBreadth), spot + growMin + (1 - growShift) * growBreadth];
}

/*
  wraps coverage if it extends beyond 2 * PI or below 0
*/
function wrapCoverage(coverage){
  //if coverage extends past PI * 2, wrap it around
  if(coverage.length > 0 && coverage[coverage.length-1][1] > Math.PI * 2){
    start = 0;
    end = coverage[coverage.length-1][1] - Math.PI * 2;
    coverage[coverage.length-1][1] = Math.PI * 2;    
    coverage = insertField(coverage, [start, end]);
  }
  //if coverage extends below 0, wrap it around
  if(coverage.length > 0 && coverage[0][0] < 0){
    start = coverage[0][0] + Math.PI * 2;
    end = Math.PI * 2;
    coverage[0][0] = 0;
    coverage = insertField(coverage, [start, end]);
  }
  return coverage;
}


