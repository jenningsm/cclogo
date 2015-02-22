function action(colorSet, scafcolor, scale, center){
  var logo = composite(scale, center);
  var arcColors = colorGen(ngreenblues);
  
  var arcs = logo.arcs;
  var scaffolding = logo.scaffolding;

  for(var i = 0; i < logo.arcs.length; i++){
    arcs[i] = arcs[i](arcColors());
  }
  for(var i = 0; i < logo.scaffolding.length; i++){
    scaffolding[i] = scaffolding[i](scafColor);
  }



  var pieces = shuffle(arcs.concat(scaffolding));

  fullFade(pieces, true, .01, 30);

}

function getFadeFunction(piece, dir, speed, start, totalTime){
  var curr = (dir ? 0 : 1);
  return function(frame){
    if(frame > start){
      curr = Math.max(0, Math.min(1, (frame - start) * speed));
      curr = (dir ? curr : 1 - curr);
    }
    if(curr !== 0){
      piece(curr * 255);
    }
  }
}

function fullFade(pieces, dir, speed, totalTime){
  var painters = [];
  for(var j = 0; j < pieces.length; j++){
    painters.push(getFadeFunction(pieces[j], true, speed, j * totalTime / pieces.length,  totalTime));
  }

  function run(frame){
     context.clearRect(0, 0, cvs.width, cvs.height);
     for(var i = 0; i < painters.length; i++){
       painters[i](frame);
     }
     if(frame <= Math.ceil(totalTime + 1 / speed)){
       requestAnimationFrame(function() { run(frame+1) });
     }
  }

  requestAnimationFrame(function() { run(0) });
}

