
window.requestAnimationFrame = window.requestAnimationFrame
 || window.mozRequestAnimationFrame
 || window.webkitRequestAnimationFrame
 || window.msRequestAnimationFrame
 || function(f){setTimeout(f, 1000/60)};

function oneTimeListener(target, type, callback){
  function oneTimeCallback(e){
    target.removeEventListener(type, oneTimeCallback);
    callback(e);
  }
  target.addEventListener(type, oneTimeCallback);
}
