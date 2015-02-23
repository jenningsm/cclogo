

  var cvs = document.getElementById("logo");
var dim = Math.max(cvs.clientWidth, cvs.clientHeight);
context = cvs.getContext("2d");
//background(255);
var center = [cvs.width / 2, cvs.height / 2];

var scafColor = [202, 202, 202];

var fadeOut = null;
var hold = createLogo(ngreenblues, scafColor, 1, center, function() { fadeOut = hold});

var arcColors = ngreenblues;

function setColorSet(id){
  if(id === 'color'){
    arcColors = ngreenblues;
    scafColor = [202, 202, 202];
  } else if (id === 'bw'){
    var b = gs(30);
    arcColors = [b];
    scafColor = b;
  } else {
    arcColors = greys;
    scafColor = gs(160);
  }
}

function newLogo(){
  if(fadeOut !== null){
    hold = fadeOut;
    fadeOut = null;
    hold(function(){ hold = createLogo(arcColors, scafColor, 1, center, function() { fadeOut = hold})}); 
  }
}
