

  var cvs = document.getElementById("logo");
var dim = Math.max(cvs.clientWidth, cvs.clientHeight);
context = cvs.getContext("2d");
//background(255);
var center = [cvs.width / 2, cvs.height / 2];

var logo = composite(1, center);

var scafColor = [202, 202, 202];

var fadeOut = null;
var hold = createLogo(ngreenblues, scafColor, 1, center, function() { fadeOut = hold});

function newLogo(){
  if(fadeOut !== null){
    hold = fadeOut;
    fadeOut = null;
    hold(function(){ hold = createLogo(ngreenblues, scafColor, 1, center, function() { fadeOut = hold})}); 
  }
}
