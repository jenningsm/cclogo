function shuffle(arr){
  var ret = arr.slice(0);
  
  for(var i = ret.length - 1; i > 0; i--){
    var j = Math.floor(Math.random() * (i + 1));
    var temp = ret[i];
    ret[i] = ret[j];
    ret[j] = temp;
  }

  return ret;
}
