
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

var greenblues = [g1, g2, g3, g4, g5 ];
var grey = [[160, 160, 160]];
var gy = [[225, 215, 170]];
var black = [[0, 0, 0]];

var ngreenblues = [h1, h2, h3, h4, h5];
ngreenblues = lighten(ngreenblues, 1 - 180 / 255);

function colorGen(colorSet){
  var last = 0;
  return function(){
    var rand = Math.random();
  
    for(var i = 0, j = 0; i < colorSet.length; i++){
     if(i != last){
        if(rand < (j+1) / (colorSet.length -1)){
          var rgb = [];
          for(var k = 0; k < 3; k++){
            rgb[k] = Math.round(colorSet[i][k]);
          }
          last = i;
          return rgb;
        }
        j++;
      }
    }
  }
}

function cssColor(color){
  return 'rgba(' + color[0] + ',' +  color[1] + ',' +  color[2] + ',' + (color[3] / 255) + ')';
}
function cssColorRounded(color){
  return 'rgba(' + Math.round(color[0]) + ',' +  Math.round(color[1]) + ',' +  Math.round(color[2]) + ',' + (color[3] / 255) + ')';
}

function gs(alpha){
  return [alpha, alpha, alpha, 255];
}

function lighten(colorSet, alpha){
  var ret = [];
  for(var i = 0; i < colorSet.length; i++){
    ret.push([]);
    for(var k = 0; k < 3; k++){
      ret[i].push(colorSet[i][k] + alpha * (255 - colorSet[i][k]));
    }
  }
  return ret;
}
