
var myblue = [12, 36, 180];
var myteal = [0, 255, 101];
var mytan = [232, 213, 62];
var mypink = [255, 42, 102];
var myorg = [255, 61, 13];

var g1 = [11, 197, 222];
var g2 = [12, 232, 199];
var g3 = [0, 209, 120];
var g4 = [12, 232, 76];
var g5 = [69, 222, 71];
var g6 = [222, 222, 37];

var h1 = [26, 202, 222];
var h2 = [21, 232, 195];
var h3 = [9, 209, 117];
var h4 = [21, 232, 75];
var h5 = [30, 222, 22];

var whats = [myblue, myteal, mytan, mypink, myorg];
var greenblues = [g1, g2, g3, g4, g5 ];
var grey = [[160, 160, 160]];
var gy = [[225, 215, 170]];
var black = [[0, 0, 0]];

var ngreenblues = [h1, h2, h3, h4, h5];

var last = 0;
function getColor(){
  var rand = Math.random();
  var variance = 0;

  var options = ngreenblues;

  for(var i = 0, j = 0; i < options.length; i++){
   if(i != last){
      if(rand < (j+1) / (options.length -1)){
        var r = (Math.random() - .5) * variance + options[i][0];
        var g = (Math.random() - .5) * variance + options[i][1];
        var b = (Math.random() - .5) * variance + options[i][2];
        last = i;
        return [r,g,b,180];
      }
      j++;
    }
  }
}

function gs(alpha){
  return [alpha, alpha, alpha, 255];
}
