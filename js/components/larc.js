
var bodyGen = arcBody();
var cornerGen = corners();

function myArc(center, radius, rotPos, radWidth, rotWidth, round){

  var points = [];

  var rounding = round / radius;

  if(rounding * radius > radWidth / 2){
    rounding = radWidth / (2 * radius);
  }

  //if there's room for a body
  if(rotWidth > 2 * rounding){
    points = points.concat(cornerGen(radius, rotPos, radWidth, rounding, true));
    points = points.concat(bodyGen(radius, rotPos + rounding, radWidth, rotWidth - 2 * rounding));
    points = points.concat(cornerGen(radius, rotPos + rotWidth - rounding, radWidth, rounding, false));  
  } else {
    //else, don't include a body, only the ends (corners)
    points = points.concat(cornerGen(radius, rotPos, radWidth, rotWidth / 2, true));
    points = points.concat(cornerGen(radius, rotPos + rotWidth / 2, radWidth, rotWidth / 2, false));  
  }

  var path = new Path2D();

  if(path){
    path.moveTo(center[0] + points[0], center[1] + points[1]);
    for(var i = 0; i < points.length; i += 4){
      path.lineTo(center[0] + points[i], center[1] + points[i+1]);
    }
    for(var i = points.length - 2; i > 0; i -= 4){
      path.lineTo(center[0] + points[i], center[1] + points[i+1]);
    }
    path.closePath();

    return function(color){
      return function(alpha){
        context.fillStyle = cssColor(color.concat([alpha]));
        context.fill(path);
      }
    }
  } else {
    return function(color){
      return function(alpha){
        context.beginPath();
        context.moveTo(center[0] + points[0], center[1] + points[1]);
        for(var i = 0; i < points.length; i += 4){
          context.lineTo(center[0] + points[i], center[1] + points[i+1]);
        }
        for(var i = points.length - 2; i > 0; i -= 4){
          context.lineTo(center[0] + points[i], center[1] + points[i+1]);
        }
        context.closePath();
  
        context.fillStyle = cssColor(color.concat([alpha]));
        context.fill();
      }
    }
  }
}
