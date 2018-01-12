$(document).ready(function() {
  $("#state").hide();
  $(".clickMe").html("Click Me!");
  //for the audio file
  var buzzer = $("#buzzer")[0];
  var sessionCount = parseInt($(".sessionCntr span").html());
  var breakCount = parseInt($(".breakCntr span").html());

  //$(".reset").hide();
  $("#topDown").hide();

  var timerOn = false;
  $("#timer").click(function() {
    $(".clickMe").hide();
    if (timerOn) {
      return;
    }
    
    timerOn = true;
    //$("#timer").prop("disabled", true);
    //$(".reset").hide();
    $("#state").show();
    $("#state").html("Session");
    $(".sessionCntr .minus , .sessionCntr .plus, .breakCntr .minus, .breakCntr .plus").hide();

    var counter = setInterval(timer, 1000);
    sessionCount *= 60;
    breakCount *= 60;

    function timer() {
      
      sessionCount -= 1;
      $('#downUp').animate({
        "marginTop": "-300px",
        "height": '+=300px'
      }, sessionCount * 1000);
      if (sessionCount === 0) {
        buzzer.play();
        clearInterval(counter);
        var startBreak = setInterval(breakTimer, 1000);
        //$(".sessionCntr span").hide();
      }

      if (sessionCount % 60 >= 10) {
        $("#countdown").html(Math.floor(sessionCount / 60) + ":" + sessionCount % 60);
      } else {
        $("#countdown").html(Math.floor(sessionCount / 60) + ":" + "0" + sessionCount % 60);
      }

      function breakTimer() {

        $("#state").html("Break");
        $(".breakCntr span , .breakCntr p").show();
        breakCount -= 1;
        $("#topDown").show();
        $("#topDown").animate({
          height: "100%"
        }, breakCount * 1000);
        if (breakCount === 0) {
          clearInterval(startBreak);
          buzzer.play();
          $(".reset").show();
        }
        if (breakCount % 60 >= 10) {
          $("#countdown").html(Math.floor(breakCount / 60) + ":" + breakCount % 60);
        } else {
          $("#countdown").html(Math.floor(breakCount / 60) + ":" + "0" + breakCount % 60);
        }
      }
    }

  });
  //functions for adding and subtracting minutes for the break and the session

  $(".breakCntr .minus").click(function() {
    if (breakCount > 1) {
      breakCount -= 1;
      $(".breakCntr span").html(breakCount);
    }
  });

  $(".breakCntr .plus").click(function() {
    if (breakCount >= 0) {
      breakCount += 1;
      $(".breakCntr span").html(breakCount);
    }
  });

  $(".sessionCntr .minus").click(function() {
    if (sessionCount > 1) {
      sessionCount -= 1;
      $(".sessionCntr span").html(sessionCount);
    }
  });

  $(".sessionCntr .plus").click(function() {
    if (sessionCount >= 0) {
      sessionCount += 1;
      $(".sessionCntr span").html(sessionCount);
    }
  });

  $(".reset").click(function() {
   // $("#timer").prop("disabled", false);
    
    timerOn = false;
    
    sessionCount = 1;
    breakCount = 1;
    
    $(".clickMe").show();
    $(".sessionCntr span").html(sessionCount);
    $(".breakCntr span").html(breakCount);

    $(".sessionCntr .minus , .sessionCntr .plus, .breakCntr .minus, .breakCntr .plus ").show();
    
    $("#state, #countdown").hide();
    
     
    $("#downUp").stop(true,true).hide();
    $("#topDown").stop(true,true).hide();
    
  });

});