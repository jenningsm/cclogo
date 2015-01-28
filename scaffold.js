
function scaffold(center, radius, radWidth, lineWidth, areas, spots){

  var seeds = [];
  var supporting = areas.start;
  for(var i = 0, aTracker = 0; i < spots.length; i++){
    while(aTracker < areas.length && areas[aTracker][1] < spots[i]){
      aTracker++;
    }
    if(aTracker !== areas.length && spots[i] > areas[aTracker][0]){
      seeds.push(spots[i]);
    }
  }

  var nwareas = [];
  for(var j = 0; j < seeds.length; j++){
    var start = seeds[j] - .2;
    var end = seeds[j] + .2;

    nwareas = insertField(nwareas, [start, end]);

    lineout(center, radius, radWidth - lineWidth, lineWidth, seeds[j])([100,100,100, 255]);
    myArc(center, radius + radWidth * .5, seeds[j] - .2, lineWidth, .4, 0)([100,100,100, 255]);
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

  console.log(seeds);
  console.log(nwareas);
  return nwareas;
}

function insertField(arr, field){

  var start = field[0];
  var end = field[1];

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
