
var buttonColours = ["red", "blue", "green", "yellow"];  //array of all the colors
var gamePattern = [];                                    //array which holds game pattern
var userClickedPattern = [];                             //array which holds user clicked pattern
var started = false;                                     //stores game's state
var level = 0;                                           //stores the level number

//starting the game when player presses any key
$(document).keypress(function() {
  if (!started) {                               //checking game state
    $("#level-title").text("Level " + level);   //displaying level on html
    nextSequence();                             //to move to next level
    started = true;                             //changing game state
  }
});

//when player clicks a button
$(".btn").click(function() {
  var userChosenColour = $(this).attr("id");
  userClickedPattern.push(userChosenColour);             //adding it to user pattern
  playSound(userChosenColour);                           //playing the sound
  animatePress(userChosenColour);                        //adding pressed effect
  checkAnswer(userClickedPattern.length-1);              //checking the answer
});

// function to check the user's answer
function checkAnswer(currentLevel) {
     //if the answer is right                                                                 
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {
      if (userClickedPattern.length === gamePattern.length){
        setTimeout(function () {
          nextSequence();
        }, 1000);
      }
      //if the answer is wrong
    } else {                                                          
      playSound("wrong");                                             
      $("body").addClass("game-over");                                //adding game over effect
      setTimeout(function () {                                        //by adding and removing
        $("body").removeClass("game-over");                           //game over class after some delay
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");  //displaying game over text in html
      startOver();                                
    }
}

function nextSequence() {
  userClickedPattern = [];
  level++;                                                          //updating the game level
  $("#level-title").text("Level " + level);                         //updating the game level in html

  var randomNumber = Math.floor(Math.random() * 4);                 //generating random number
  var randomChosenColour = buttonColours[randomNumber];             //generating random color
  gamePattern.push(randomChosenColour);                             //adding random color to game pattern

  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100); //displaying colors from game pattern
  playSound(randomChosenColour);                                    //playing sound
}

//function to play sound
function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

//function to add the pressed effect on buttons
function animatePress(currentColor) {
  $("#" + currentColor).addClass("pressed");          //adding pressed css class to the button
  setTimeout(function () {
    $("#" + currentColor).removeClass("pressed");     //removing the css class from the button
  }, 100);                                            //after some delay
}

//function to reset or stop the game
function startOver() {
  level = 0;              //setting level back to zero
  gamePattern = [];       //deleting previous game pattern
  started = false;        //setting game state to false
}
