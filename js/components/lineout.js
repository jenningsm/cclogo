/*
   creates a line that goes out radially, for the scaffolding

   center: center from which it radiates
   radius: radius at its midpoint
   radWidth: the radial width of the line
   width: the angular width of the line, in pixels
   rotPos: the angle of the line
*/
function lineout(center, radius, radWidth, width, rotPos){
  var unitvec = [Math.cos(rotPos), Math.sin(rotPos)];
  var perp = [-unitvec[1], unitvec[0]];
  
  var path = new Path2D();

  if(path){
    var xcen = center[0] + radius * unitvec[0];
    var ycen = center[1] + radius * unitvec[1];
  
    var radDiff = [.5 * radWidth * unitvec[0], .5 * radWidth * unitvec[1]];
    var angDiff = [.5 * width * perp[0], .5 * width * perp[1]];

    path.moveTo(xcen - radDiff[0] - angDiff[0], ycen - radDiff[1] - angDiff[1]);
    path.lineTo(xcen + radDiff[0] - angDiff[0], ycen + radDiff[1] - angDiff[1]);
    path.lineTo(xcen + radDiff[0] + angDiff[0], ycen + radDiff[1] + angDiff[1]);
    path.lineTo(xcen - radDiff[0] + angDiff[0], ycen - radDiff[1] + angDiff[1]);
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
        var xcen = center[0] + radius * unitvec[0];
        var ycen = center[1] + radius * unitvec[1];
      
        var radDiff = [.5 * radWidth * unitvec[0], .5 * radWidth * unitvec[1]];
        var angDiff = [.5 * width * perp[0], .5 * width * perp[1]];
    
        context.beginPath();
        context.moveTo(xcen - radDiff[0] - angDiff[0], ycen - radDiff[1] - angDiff[1]);
        context.lineTo(xcen + radDiff[0] - angDiff[0], ycen + radDiff[1] - angDiff[1]);
        context.lineTo(xcen + radDiff[0] + angDiff[0], ycen + radDiff[1] + angDiff[1]);
        context.lineTo(xcen - radDiff[0] + angDiff[0], ycen - radDiff[1] + angDiff[1]);
        context.closePath();
        context.fillStyle = cssColor(color.concat([alpha]));
        context.fill();
      }
    }
  }
}
