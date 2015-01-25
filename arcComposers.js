
var angRes = .03;
var roundRes = .001;

function arcBody(){
  var points = [];

  for(var i = 0; i < 2 * Math.PI; i += angRes){
    points.push(Math.cos(i));
    points.push(Math.sin(i));
  }
  points.push(1);
  points.push(0);

  return function(radius, rotPos, radWidth, rotWidth){
    var newPoints = [];
    for(var i = 0; i <= rotWidth / angRes; i++){
      newPoints.push(points[i * 2] * (radius - radWidth / 2));
      newPoints.push(points[i * 2 + 1] * (radius - radWidth / 2));
      newPoints.push(points[i * 2] * (radius + radWidth / 2));
      newPoints.push(points[i * 2 + 1] * (radius + radWidth / 2));
    }
    var cos = Math.cos(rotWidth);
    var sin = Math.sin(rotWidth);
    newPoints.push(cos * (radius - radWidth / 2));
    newPoints.push(sin * (radius - radWidth / 2));
    newPoints.push(cos * (radius + radWidth / 2));
    newPoints.push(sin * (radius + radWidth / 2));
 
    var rotate = [Math.cos(rotPos), Math.sin(rotPos)];
    var hold = [];
    for(var i = 0; i < newPoints.length; i += 2){
      hold[0] = newPoints[i] * rotate[0] - newPoints[i+1] * rotate[1];
      hold[1] = newPoints[i] * rotate[1] + newPoints[i+1] * rotate[0];
      newPoints[i] = hold[0];
      newPoints[i+1] = hold[1];
    }
    return newPoints;
  }
}

function corners(){

  var roundedCorner = [];
  var cornerSamples = 50;
  var cornerSweeper = [1, 0];
  var rotators = [Math.cos((Math.PI / 2) / (cornerSamples-1)), Math.sin((Math.PI / 2) / (cornerSamples-1))];
  var hold = [];

  var trigs = [];

  for(var i = 0; i < Math.PI / 8; i += roundRes){
    trigs.push(Math.cos(i));
    trigs.push(Math.sin(i));
  }

  //create the model corner which is used to create each of the 4 rounded corners
  for(var i = 0; i < cornerSamples; i++){
    roundedCorner.push(cornerSweeper[0]);
    roundedCorner.push(cornerSweeper[1]);

    hold[0] = cornerSweeper[0] * rotators[0] - cornerSweeper[1] * rotators[1];
    hold[1] = cornerSweeper[0] * rotators[1] + cornerSweeper[1] * rotators[0];

    cornerSweeper[0] = hold[0];
    cornerSweeper[1] = hold[1];
  }
  roundedCorner[roundedCorner.length - 2] = 0;
  roundedCorner[roundedCorner.length - 1] = 1;

  return function(radius, rotPos, radWidth, rounding, dir){
    var points = [];
    //create the first two rounded corners
    var cornerSpot =  dir ? 0 : cornerSamples - 1;
    for(var i = 0; i + 1 < rounding / roundRes; i++){
  
      if(dir){
        while((1 - roundedCorner[cornerSpot * 2]) * rounding < i * roundRes){
          cornerSpot++;
        }
      } else {
        while(roundedCorner[cornerSpot * 2] * rounding < i * roundRes){
          cornerSpot--;
        }
      }
  
      var effectiveRadWidth = radWidth - radius * 2 *  rounding * (1 - roundedCorner[cornerSpot * 2 + 1]);
 
      points.push((radius - effectiveRadWidth / 2) * trigs[2 * i]);
      points.push((radius - effectiveRadWidth / 2) * trigs[2 * i + 1]);
      points.push((radius + effectiveRadWidth / 2) * trigs[2 * i]);
      points.push((radius + effectiveRadWidth / 2) * trigs[2 * i + 1]);
  
    }
    
    var cos = Math.cos(rounding);
    var sin = Math.sin(rounding);
    var effectiveRadWidth = dir ? radWidth : radWidth - radius * 2 *  rounding; 
    points.push((radius - effectiveRadWidth / 2) * cos);
    points.push((radius - effectiveRadWidth / 2) * sin);
    points.push((radius + effectiveRadWidth / 2) * cos);
    points.push((radius + effectiveRadWidth / 2) * sin);

    var rotate = [Math.cos(rotPos), Math.sin(rotPos)];
    var hold = [];
    for(var i = 0; i < points.length; i += 2){
      hold[0] = points[i] * rotate[0] - points[i+1] * rotate[1];
      hold[1] = points[i] * rotate[1] + points[i+1] * rotate[0];
      points[i] = hold[0];
      points[i+1] = hold[1];
    }
    return points;
  }

}
