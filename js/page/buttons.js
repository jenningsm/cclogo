function fadeButton(button, start, finish, speed){
  var cancelled = false;
  var pos = 0;

  function cancel() { 
    cancelled = true;
    return {'pos' : pos, 'color' : interpolate(start, finish, pos) };
  }

  function fadeStep(){
    if(!cancelled){
      if(pos === 1){
        button.style.background = cssColor(finish);
      } else {
        button.style.background = cssColorRounded(interpolate(start, finish, pos));
        pos += speed;
        pos = Math.min(1, pos);
        requestAnimationFrame(fadeStep);
      }
    }
  }

  requestAnimationFrame(fadeStep);
  return cancel;
}


function interpolate(start, finish, por){
  var ret = [];
  for(var i = 0; i < start.length; i++){
    ret.push(start[i] * (1 - por) + finish[i] * por);
  }
  return ret;
}
