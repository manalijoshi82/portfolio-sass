$(document).ready(function() {

  var count = 1;
  var i = 0;
  var compArr = [];
  var userArr = [];
  var colors = ['red', 'blue', 'yellow', 'green'];
  var error = false;
  var strictMode = false;

  reset();
  createStartHandler();
  createStrictHandler();
  
  // click handlers
  function createStartHandler() {
    $(".start").click(function() {
      reset();
      setTimeout(computersTurn, 200);
      disableButtons();
    });
  }

  $(".reset").click(function() {
    resetButton();
  });

  function createStrictHandler() {
    $(".strict").click(function() {
      console.log("Strict click handler")

      strictMode = true;
      //compArr= [];
      //console.log("Comp Arr "+ compArr);
      reset();
      computersTurn();

      $(".onOff").css("background-color", "#D00000");
      disableButtons();

    });

  }

  // user click handler
  $('[class*=Btn]').on("click", function() {
    var colorName = this.className.match(/green|red|blue|yellow/).join();
    playAudio(colorName);
    switch (colorName) {
      case 'red':
        userArr.push(0);
        break;
      case 'blue':
        userArr.push(1);
        break;
      case 'yellow':
        userArr.push(2);
        break;
      case 'green':
        userArr.push(3);
        break;
    }

    // check if error
    for (var j = 0; j < userArr.length; j++) {
      //console.log("entering the loop");
      if (userArr[j] !== compArr[j]) {
        $(".display").html(" ! ! ");
        error = true;
        var audio = document.getElementById("error");
        audio.play();
      }

    }
    console.log(userArr);

    // check if its computers turn
    if (userArr.length == compArr.length && userArr.length == 10 && !error) {
      win();
    } else if (userArr.length == compArr.length || error) {
      //console.log("length matched");
      setTimeout(computersTurn, 1500);
    }

  }); // end of user click

  // Functions

  function disableButtons() {
    $(".start").attr("disabled", "disabled").off("click");
    $(".strict").attr("disabled", "disabled").off("click");
  }

  function playAudio(colorName, i) {
    //console.log("playAudio with " + colorName);

    setTimeout(function() {
      $("." + colorName + "Btn").fadeToggle('200');
      $("." + colorName + "Btn").fadeIn("slow");

      var idSound = colorName + "Sound";
      document.getElementById(idSound).play();

    }, 1000 * i);

  }

  function reset() {
    count = 1;
    compArr = [];
    userArr = [];
    $(".display").text("- -");
    error = false;
  }

  function resetButton() {
    $(".start").removeAttr("disabled");
    $(".strict").removeAttr("disabled");
    createStartHandler();
    createStrictHandler();

    reset();
    strictMode = false;
    $(".onOff").css("background-color", "#fff");
  }

  function kount() {
    if (count < 10) {
      $('.display').html('0' + count);
      count++;
    } else {
      $('.display').html(count);
      count++;
    }
  }

  function randomPick() {
    console.log("calling random pick ");
    var index = Math.floor(Math.random() * colors.length);
    //console.log("New color " + colors[colorName]);
    compArr.push(index);
    play();
  }

  function computersTurn() {
    if (error && strictMode == true) {
      reset();
      randomPick();

      console.log("comp arr after push " + compArr);
      console.log("user arr " + userArr);
      kount();
    } else if (!error) {
      // normal mode with no error
      randomPick();
      userArr = [];
      kount();
    } else if (error) {
      // normal mode with error
      //console.log("comp Arr " + compArr);
      userArr = [];
      play();
      error = false;
      count--;
      kount();
    }
  }

  // part of user click function

  function win() {
    $('.display').html("win");
    setTimeout(resetButton, 3000);
  }

  function play() {

    for (var i = 0; i < compArr.length; i++) {
      var c = colors[compArr[i]];
      //console.log("Playing " + c);

      playAudio(c, i);
    }
  }

});