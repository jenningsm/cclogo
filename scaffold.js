
var scafcolor = gs(180);
var scafcolor = [240, 240, 200, 255];
//var scafcolor = [160, 160, 160, 200];

function scaffold(center, radius, radWidth, lineWidth, areas, spots, targets){

  var seeds = [];
  var grew = []
  for(var i = 0, aTracker = 0; i < spots.length; i++){
    while(aTracker < areas.length && areas[aTracker][1] < spots[i]){
      aTracker++;
    }
    if(aTracker !== areas.length && areas[aTracker][0] < spots[i]){
      seeds.push(spots[i]);
      grew.push(false);
    }
  }

  targets.sort();
  var nwareas = [];
  if(targets.length === 0){
    nwareas = insertField(nwareas, [0, Math.PI * 2]);
  }

  var j = 0;
  for(; targets[j] < seeds[0]; j++){
    var s;
    var e;
    var dists = [Math.PI * 2 - Math.abs(seeds[seeds.length - 1] - targets[j]), Math.abs(seeds[0] - targets[j])];
    if(Math.random() > dists[0] / (dists[0] + dists[1])){
      s = seeds[seeds.length-1] - .1;
      e = targets[j] + .1;
      grew[seeds.length-1] = true;
    } else {
      s = targets[j] - .1;
      e = seeds[0] + .1;
      grew[0] = true;
    }
    nwareas = insertField(nwareas, [s, e]);
  }
  var i = 0;
  for(; i < seeds.length - 1; i++){
    while(targets[j] < seeds[i]){
      j++;
    }
    for(; targets[j] < seeds[i+1]; j++){
      var s;
      var e;
      var dists = [Math.abs(seeds[i] - targets[j]), Math.abs(seeds[i+1] - targets[j])];
      if(Math.random() > dists[0] / (dists[0] + dists[1])){
        s = seeds[i] - .1;
        e = targets[j] + .1;
        grew[i] = true;
      } else {
        s = targets[j] - .1;
        e = seeds[i+1] + .1;
        grew[i+1] = true;
      }
      nwareas = insertField(nwareas, [s, e]);
    }
  }

  for(; j < targets.length; j++){
    var s;
    var e;
    var dists = [Math.abs(seeds[seeds.length - 1] - targets[j]), Math.PI * 2 - Math.abs(seeds[0] - targets[j])];
    if(Math.random() > dists[0] / (dists[0] + dists[1])){
      s = seeds[seeds.length-1] - .1;
      e = targets[j] + .1;
      grew[seeds.length-1] = true;
    } else {
      s = targets[j] - .1;
      e = seeds[0] + .1;
      grew[0] = true;
    }
    nwareas = insertField(nwareas, [s, e]);
  }

  for(var i = 0; i < seeds.length; i++){
    if(!grew[i]){
      nwareas = insertField(nwareas, [seeds[i] - (.03 + Math.random() * .2), seeds[i] + .03 + Math.random() * .2]);
    }
  }

  if(nwareas.length > 0 && nwareas[nwareas.length-1][1] > Math.PI * 2){
    start = 0;
    end = nwareas[nwareas.length-1][1] - Math.PI * 2;

    nwareas[nwareas.length-1][1] = Math.PI * 2;    

    nwareas = insertField(nwareas, [start, end]);
  }
  if(nwareas.length > 0 && nwareas[0][0] < 0){
    start = nwareas[0][0] + Math.PI * 2;
    end = Math.PI * 2;

    nwareas[0][0] = 0;

    nwareas = insertField(nwareas, [start, end]);
  }

  for(var i = 0; i < seeds.length; i++){
    lineout(center, radius, radWidth - lineWidth, lineWidth, seeds[i])(scafcolor);
  }
  for(var i = 0; i < nwareas.length; i++){
    myArc(center, radius + radWidth * .5, nwareas[i][0], lineWidth, nwareas[i][1] - nwareas[i][0], 1)(scafcolor);
  }

  return nwareas;
}

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
