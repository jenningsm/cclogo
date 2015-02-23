var backcolor = [198, 247, 257, 255];
var altcolor = [175, 255, 195, 255];
var white = [255, 255, 255, 255];

var transback = backcolor.slice();
transback[3] = 0;

var fadeSpeed = .05;
var mouseSpeed = .1;

function buttonHandler(button, startOn, clickcb){

  var start;
  var clicked;
  if(startOn){
    start = white;
    clicked = true;
  } else {
    start = transback;
    clicked = false;
  }

  button.style.background = cssColor(start);
  var cancel = function() { return {'color' : start}};

  function newColor(color, speed){
    var pos = 1;
    var v = cancel();
    pos = v.pos;
    currColor = v.color;

    if(color === null){
      cancel = fadeButton(button, currColor, transback, speed / pos);
    } else {
      cancel = fadeButton(button, currColor, color, speed);
    }
  }

  function click(){

  }

  function mouseOver(){
    if(!clicked){
      newColor(altcolor, mouseSpeed);
    }
  }

  function mouseOut(){
    if(!clicked){
      newColor(null, mouseSpeed);
    }
  }

  function click(){
    if(!clicked){
      clicked = true;
      cancel = fadeButton(button, cancel().color, white, fadeSpeed);
      clickcb();
    }
  }

  function otherClick(){
    if(clicked){
      clicked = false;
      cancel = fadeButton(button, cancel().color, transback, fadeSpeed);
    }
  }

  button.addEventListener('mouseenter', mouseOver);
  button.addEventListener('mouseleave', mouseOut);
  button.addEventListener('click', click);

  return otherClick;
}

function buttonGroup(buttons, start){
  var clickInformers = [];

  function onClick(i){
    return function(){
      for(var j = 0; j < clickInformers.length; j++){
        if(j !== i){
          clickInformers[j]();
        }
      }
    }
  }

  for(var i = 0; i < buttons.length; i++){
    var oc = onClick(i);
    clickInformers[i] = buttonHandler(buttons[i], i === start,  oc);
  }
}


var sizeButtons = [];
sizeButtons.push(document.getElementById("small"));
sizeButtons.push(document.getElementById("medium"));
sizeButtons.push(document.getElementById("large"));

var colorButtons = [];
colorButtons.push(document.getElementById("color"));
colorButtons.push(document.getElementById("black-white"));
colorButtons.push(document.getElementById("grayscale"));

buttonGroup(sizeButtons, 1);
buttonGroup(colorButtons, 0);
