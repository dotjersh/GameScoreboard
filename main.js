var timer = null;
var time = 30 * 60;//45 min
var sec = 0;
var pause = false;
var reset = true;
var lastChecked = new Date().getTime();
var breaks = 3;

var bell = new Audio('bell.mp3');
var buzz = new Audio('buzz.mp3');

window.onload = function(){
  timer = setInterval(timeup,1);
  $('.count').click(function(e){
    $(this).html(parseInt($(this).html())+1);
  });

  $('.minus').click(function(e){
    $(this).parent().children('.count').html(parseInt($(this).parent().children('.count').html())-1);
  });
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
