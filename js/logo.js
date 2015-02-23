

  var cvs = document.getElementById("logo");
var dim = Math.max(cvs.clientWidth, cvs.clientHeight);
context = cvs.getContext("2d");
//background(255);
var center = [cvs.width / 2, cvs.height / 2];

var scafColor = [202, 202, 202];

var fadeOut = null;
var hold = createLogo(ngreenblues, scafColor, 1, center, function() { fadeOut = hold});

var arcColors = ngreenblues;
var scale = 1;

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

function setScale(size){
  if(size === 'small'){
    scale = .5;
  } else if (size === 'medium'){
    scale = 1;
  } else {
    scale = 1.5;
  }
}

function newLogo(){
  if(fadeOut !== null){
    hold = fadeOut;
    fadeOut = null;
    hold(function(){ hold = createLogo(arcColors, scafColor, scale, center, function() { fadeOut = hold})}); 
  }
}
