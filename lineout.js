
function lineout(center, radius, height, width, rotPos){
  var unitvec = [Math.cos(rotPos), Math.sin(rotPos)];
  var perp = [-unitvec[1], unitvec[0]];
  
  return function(color){
    fill(color[0], color[1], color[2], color[3]);
    var xcen = center[0] + radius * unitvec[0];
    var ycen = center[1] + radius * unitvec[1];
  
    var radDiff = [.5 * height * unitvec[0], .5 * height * unitvec[1]];
    var angDiff = [.5 * width * perp[0], .5 * width * perp[1]];

    beginShape();
    vertex(xcen - radDiff[0] - angDiff[0], ycen - radDiff[1] - angDiff[1]);
    vertex(xcen + radDiff[0] - angDiff[0], ycen + radDiff[1] - angDiff[1]);
    vertex(xcen + radDiff[0] + angDiff[0], ycen + radDiff[1] + angDiff[1]);
    vertex(xcen - radDiff[0] + angDiff[0], ycen - radDiff[1] + angDiff[1]);
    endShape(CLOSE);
  }
}
