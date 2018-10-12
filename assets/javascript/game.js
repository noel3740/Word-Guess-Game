//Declar global variables
var numGuessRemain = 12;
var words = ["unaccountable", "mom", "type", "rustic", "violet", "receive", "gray", "draw", "read", "fallacious", "advertisement", "government", "umbrella", "sable", "bait", "invite", "bell", "belligerent", "building", "willing"]
var lettersGuessed = [];

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
    //Get the key the user pressed
    var usersGuess = event.key;
    var usersGuessKeyCode = event.keyCode;

    //Get 
    var lettersGuessedText = document.getElementById("lettersGuessedText");
    

    if (//Make sure the key was not already guessed
        lettersGuessed.indexOf(usersGuess.toLowerCase()) < 0 &&
        //Make sure that the key pressed
        (usersGuessKeyCode >= 65 && usersGuessKeyCode <= 90)) {

            //Add guessed letter to the letter guessed array
            lettersGuessed.push(event.key.toLowerCase());

            //Display the letter guesses array in the lettersGuessedText span in the html
            lettersGuessedText.textContent = lettersGuessed.toString();
        }
}