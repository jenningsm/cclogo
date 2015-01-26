
var bodyGen = arcBody();
var cornerGen = corners();

function myArc(center, radius, rotPos, radWidth, rotWidth, round){

  var points = [];

  var rounding = round / radius;

  if(rounding * radius > radWidth / 2){
    rounding = radWidth / (2 * radius);
  }

  if(rotWidth > 3 * rounding){
    points = points.concat(cornerGen(radius, rotPos, radWidth, rounding, true));
    points = points.concat(bodyGen(radius, rotPos + rounding, radWidth, rotWidth - 2 * rounding));
    points = points.concat(cornerGen(radius, rotPos + rotWidth - rounding, radWidth, rounding, false));  
  } else {
    points = points.concat(cornerGen(radius, rotPos, radWidth, rotWidth / 3, true));
    points = points.concat(cornerGen(radius, rotPos + 2 * rotWidth / 3, radWidth, rotWidth / 3, false));  
  }

  //return the drawing function
  return function(color){
    noStroke();
    fill(color[0], color[1], color[2], color[3]);
    
    beginShape();
    for(var i = 0; i < points.length; i += 4){
      vertex(center[0] + points[i], center[1] + points[i+1]);
    }
    for(var i = points.length - 2; i > 0; i -= 4){
      vertex(center[0] + points[i], center[1] + points[i+1]);
    }
    endShape(CLOSE);
  }
}
