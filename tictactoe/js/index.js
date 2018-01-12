//User Story: I can play a game of Tic Tac Toe with the computer.
//User Story: My game will reset as soon as it's over so I can play again.
//User Story: I can choose whether I want to play as X or O.

var box = $(".box");
box.text("");
var button = $("#newGame");
var p = $(".temp");
var numMoves = 0;
var winningArray = [];
var winScenarios = [
  [0, 1, 2], // first row across
  [3, 4, 5], // second ""
  [6, 7, 8], // third ""
  [0, 3, 6], // first column down
  [1, 4, 7], // second ""
  [2, 5, 8], // third ""
  [0, 4, 8], // diagonal from left
  [6, 4, 2] // diagonal from right
];

var player = "X";
var machine = "O";
var firstPlayer = true;
var machinePlayer = false;
var available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
var firstPlayerArray = [];
var machineArray = [];
$(".choice").addClass("show");

//sets up the players choice as x or o
function setPlayerChoice(choice) {
  if (choice === 'X') {
    player = 'X';
    machine = 'O';
  } else if (choice === 'O') {
    player = 'O';
    machine = 'X';
  }
}

//fires up the function setPlayerChoice() on the click
$("#x").click(function() {
  setPlayerChoice('X');
  boxClick();
});

$("#o").click(function() {
  setPlayerChoice('O');
  boxClick();
});

//prints x or o on the boxes on clicking the div
function boxClick() {
  box.click(function() {
    $(".question").hide();
    $(".choice").hide();
    var currentIndex = box.index(this);
    var playerIndex = available.indexOf(currentIndex);
    available.splice(playerIndex, 1);

    if ($(this).text() === "") {
      if (firstPlayer) {
        //console.log("First player at " + currentIndex);
        $(box[currentIndex]).text(player);
        numMoves++;
        firstPlayerArray.push(currentIndex);

        firstPlayer = false;
        machinePlayer = true;
      }
    } else {
      return;
    }
    //check if the player is the winner
    function playerWon(winScenarios, firstPlayerArray) {
      for (var i = 0; i < winScenarios.length; i++) {
        var match = true;
        for (var j = 0; j < winScenarios[i].length; j++) {
          if (!(firstPlayerArray.includes(winScenarios[i][j]))) {
            match = false;

          }
        }
        if (match) {
          //disables the boxes so that no one can click after the match is found and delay before announcing the winner 

          setTimeout(function() {
            box.attr("disabled", "disabled").off("click");

            gameEnd("You Won!!")
          }, 1000);
          return true;
        }
      }
    }

    var winner = playerWon(winScenarios, firstPlayerArray);
    if (winner) {
      return;
    }

    // check if the computer is the winner
    function ifComputerWon(winScenarios, machineArray) {
      for (var i = 0; i < winScenarios.length; i++) {
        var match = true;
        for (var j = 0; j < winScenarios[i].length; j++) {
          if (!(machineArray.includes(winScenarios[i][j]))) {
            match = false;
          }
        }
        if (match) {
          //disables the boxes so that no one can click after the match is found and delay before announcing the winner
          box.attr("disabled", "disabled").off("click");

          setTimeout(function() {
            gameEnd("Computer Won!!")
          }, 1000);
        }
      }
    }

    // let computer make a move
    var computersTurn = Math.floor(Math.random() * available.length);
    var computerPos = available[computersTurn];

    available.splice(computersTurn, 1);

    setTimeout(function() {
      $(box[computerPos]).text(machine)
    }, 1000);

    setTimeout(function() {
      numMoves++;
      console.log(numMoves);
    }, 1000);

    machineArray.push(computerPos);

    firstPlayer = true;
    machinePlayer = false;

    //calling the function to check if computer is the winner
    ifComputerWon(winScenarios, machineArray);

    if (numMoves == 9) {
      //check if all the boxes are filled and no match found then show message draw
      setTimeout(function() {
        gameEnd("Draw!!!")
      }, 1000);
    }
  });
}

//start new game button
button.on("click", function() {
  $(this).removeClass("show");
  p.removeClass("show");
  box.removeClass("hide").text("");
  firstPlayer = true;
  machinePlayer = false;
  firstPlayerArray = [];
  machineArray = [];
  $(".question").show();
  $(".choice").show();
  //box.prop('disabled',false);
  //box.removeAttr("disabled");
  box.attr("disabled", "disabled").off("click");
});

//clear out after match is found or the draw happened
function gameEnd(words) {

  button.addClass("show");
  p.addClass("show").text(words);
  numMoves = 0;
  available = [0, 1, 2, 3, 4, 5, 6, 7, 8];
}