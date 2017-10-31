var timer = null;
var time = 30 * 60;//45 min
var sec = 0;
var pause = false;
var reset = true;
var lastChecked = new Date().getTime();
var breaks = 3;
var rinks = 1;

var colorList = [
  "rgb(168, 40, 40)",
  "rgb(83, 208, 32)",
  "rgb(38, 142, 217)",
  "rgb(244, 139, 43)"
]


var bell = new Audio('bell.mp3');
var buzz = new Audio('buzz.mp3');

window.onload = function(){
  timer = setInterval(timeup,1);
  $('.count').click(function(e){
    $(this).html(parseInt($(this).html())+1);
  });

  $('.name').click(function(e){
    var newColor = colorList[colorList.indexOf($(this).css('background-color')) + 1];
    if(newColor == undefined){
      newColor = colorList[0];
    }
    $(this).css('background-color',newColor);
    $(this).parent().find('.minus').css('background-color',newColor);
  });

  $('.minus').click(function(e){
    var value = parseInt($(this).parent().children('.count').html())-1;
    if( value < 0 ){
      value = 0;
    }
    $(this).parent().children('.count').html(value);
  });

  $(document).keypress(function(e){
    if(e.which == 32){
      if(pause == false){
        pauseTimer();
      } else {
        startTimer();
      }
    } else if(e.which == 114) {
      resetTimer();
    } else if(e.which == 49){ //1
      if(rinks == 1){
        $('.count:eq(0)').html(parseInt($('.count:eq(0)').html())+1);
      } else {
        $('.count:eq(2)').html(parseInt($('.count:eq(2)').html())+1);
      }
    } else if(e.which == 33){ //!
      if(rinks == 1){
        var value = parseInt($('.count:eq(0)').parent().children('.count').html())-1;
        if( value < 0 ){
          value = 0;
        }
        $('.count:eq(0)').parent().children('.count').html(value);
      } else {
        var value = parseInt($('.count:eq(2)').parent().children('.count').html())-1;
        if( value < 0 ){
          value = 0;
        }
        $('.count:eq(2)').parent().children('.count').html(value);
      }
    } else if(e.which == 50){//2
      if(rinks == 1){
        $('.count:eq(1)').html(parseInt($('.count:eq(1)').html())+1);
      } else {
        $('.count:eq(3)').html(parseInt($('.count:eq(3)').html())+1);
      }
    } else if(e.which == 64){ //@
      if(rinks == 1){
        var value = parseInt($('.count:eq(1)').parent().children('.count').html())-1;
        if( value < 0 ){
          value = 0;
        }
        $('.count:eq(1)').parent().children('.count').html(value);
      } else {
        var value = parseInt($('.count:eq(3)').parent().children('.count').html())-1;
        if( value < 0 ){
          value = 0;
        }
        $('.count:eq(3)').parent().children('.count').html(value);
      }
    } else if(e.which == 51){//3
      if(rinks == 1){
        //nothing
      } else {
        $('.count:eq(4)').html(parseInt($('.count:eq(4)').html())+1);
      }
    } else if(e.which == 35){//#
      if(rinks == 1){
        //nothing
      } else {
        var value = parseInt($('.count:eq(4)').parent().children('.count').html())-1;
        if( value < 0 ){
          value = 0;
        }
        $('.count:eq(4)').parent().children('.count').html(value);
      }
    } else if(e.which == 52){//4
      if(rinks == 1){
        //nothing
      } else {
        $('.count:eq(5)').html(parseInt($('.count:eq(5)').html())+1);
      }
    } else if(e.which == 36){//$
      if(rinks == 1){
        //nothing
      } else {
        var value = parseInt($('.count:eq(5)').parent().children('.count').html())-1;
        if( value < 0 ){
          value = 0;
        }
        $('.count:eq(5)').parent().children('.count').html(value);
      }
    }
  });
}

function help(){
  alert('Click the scores to increase score. Click the minus to descrease score.');
  alert('You can use they 1-4 keys on your keyboard to increase, and Shift + 1-4 to decrease as well');
  alert('Click the top part of a scorecard to change the color of the team.');
  alert('Click the play or pause button to start or stop the timer. Space works as well.');
  alert('Press the gear to change the time and number of breaks in the game.');
  alert('Press r or click the refresh icon to reset timer to default and scores to zero.');
  alert('Click the fullscreen button to make the gameboard full screen.');
  alert('Click the hastag to change number of rinks.');
}

function startTimer(){
  buzz.play();
  pause = false;
}

function timeup(){
  if((!pause && (new Date().getTime() - lastChecked) > 1000) || reset){
    //set new time
    lastChecked = new Date().getTime();

    if(reset){
      sec = time;
      reset = false;
      pause = true;
      $('.time').html(toTwo(time/60) + ":00");
    } else {
      //DECREASE
      sec--;

      if((sec % Math.floor(time/breaks)) == 0 && sec != 0){
        $('.time').html("Break");
        bell.play();
        pause = true;
      } else {
        $('.time').html(toTwo(sec/60) + ":" + toTwo(sec%60));
      }

      //check for end of game
      if(sec < 0){
        $('.time').html("Game");
        reset = true;
        buzz.play();
      }
    }
  }
}

function resetTimer(){
  reset = true;
  timeup();
  $(".count").html("0")
}

function pauseTimer(){
  pause = true;

}

function moreRinks(){
  if(rinks == 2){
    $('.twoRinks').hide();
    $('.oneRinks').show();
    rinks = 1;
  } else if(rinks == 1){
    $('.twoRinks').show();
    $('.oneRinks').hide();
    rinks = 2;
  }
}

function changeTimer(){
  time = prompt('Time in minutes');
  time = time * 60;
  $('.time').html(toTwo(time/60) + ":00");

  breaks = prompt('Number of breaks');
  breaks ++;
  reset = true;
  timeup();
}

function toTwo(number){
  var value = Math.floor(number).toString();
  if(value[1] == null){
    value = "0" + value;
  }

  return value;
}

//fullscreen
var fullscreenActive = false;

function fullscreen() {
  var element = document.documentElement;

  if(!fullscreenActive){
    fullscreenActive = true;
    if(element.requestFullscreen) {
      element.requestFullscreen();
    } else if(element.mozRequestFullScreen) {
      element.mozRequestFullScreen();
    } else if(element.webkitRequestFullscreen) {
      element.webkitRequestFullscreen();
    } else if(element.msRequestFullscreen) {
      element.msRequestFullscreen();
    }
  } else {
    if(document.exitFullscreen) {
      document.exitFullscreen();
    } else if(document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if(document.webkitExitFullscreen) {
      document.webkitExitFullscreen();
    }
    fullscreenActive = false;
  }
}
