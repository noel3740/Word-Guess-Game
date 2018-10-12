//Declare global variables
var numGuessRemain = 12;
var words = [];
var lettersGuessed = [];
var lettersGuessedCorrectly = [];
var wins = 0;
var currentWord = "";
var currentDisplayWord = "";

//Initialize the words array
function initializeWords(){
    words = ["unaccountable", "mom", "type", "rustic", "violet", "receive", "gray", "draw", "read", "fallacious", "advertisement", "government", "umbrella", "sable", "bait", "invite", "bell", "belligerent", "building", "willing"];
}

//Get next word for the user to guess
function getWord() {
    //Reset values
    currentWord = "";
    numGuessRemain = 12;
    lettersGuessed = [];
    lettersGuessedCorrectly = [];

    //Words array has values
    if (words.length > 0) {
        //Get random array index number
        var randIndex = Math.floor(Math.random() * words.length);
        //Assign the word to the current word variable
        currentWord = words[randIndex];
        //Remove the word from the array list so it doesn't get picked again
        words.splice(randIndex, 1);

        //Debugging. Need to remove
        console.log("Current Word: " + currentWord);
        console.log("Words left: " + words.length);
    }
    //words array does not have values 
    else { 
        //Re-initilze the words array
        initializeWords();
        //Re-run the get words function to get the next word now that the words array is refreshed
        getWord();
    }
}

//Get an array of index locations in the current word that the user guessed correctly
function getIndexOfCorrectLetters (letterGuessed) {
    var correctLetterIndexes = [];

    //Loop through each letter in the current word
    for (var i=0; i < currentWord.length; i++){
        //If the current character in the current word is equal to the letter guessed then add it to the array
        if (currentWord[i].toLowerCase() == letterGuessed.toLowerCase()) {
            correctLetterIndexes.push(i);
        }
    }

    return correctLetterIndexes;
}

//Function to run when the player wins
function onWin() {
    //Increment the wins by 1
    wins++;
    //Get a new word
    getWord();
    //Refresh the screen fields
    refreshScreenFields();
}

//Function that refreshes all the dynamic html fields
function refreshScreenFields(){
    //Set the current display word
    setCurrentDisplayWord();

    //Set the html element contents to their coresponding variable values
    if (lettersGuessed.length >0){
        document.getElementById("lettersGuessedText").textContent = lettersGuessed.toString();
    }
    else {
        document.getElementById("lettersGuessedText").textContent = "";
    }

    document.getElementById("winsText").textContent = wins;
    document.getElementById("numGuessRemainText").textContent = numGuessRemain;
    document.getElementById("currentWordText").textContent = currentDisplayWord;
}

//Get the word to display on the screen (with "_")
function setCurrentDisplayWord () {

    currentDisplayWord = currentWord;

    var searchLetters = lettersGuessedCorrectly.toString().replace(",", "");
    var searchPattern = new RegExp("[^" + searchLetters + "]", "g");

    currentDisplayWord = currentDisplayWord.replace(searchPattern, "_");
}

// This function is run whenever the user presses a key.
document.onkeyup = function(event) {
    //Get the key the user pressed
    var usersGuess = event.key;
    var usersGuessKeyCode = event.keyCode;

    if (//Users key press was not already guessed
        lettersGuessed.indexOf(usersGuess.toLowerCase()) < 0 &&
        //Key pressed is a letter
        (usersGuessKeyCode >= 65 && usersGuessKeyCode <= 90)) {

            //Add the letter guessed by the user to the letterGuessed array
            lettersGuessed.push(usersGuess);

            //Current word contains the letter guessed
            if (currentWord.indexOf(usersGuess) >=0) {
                //Add letter to array of letters guessed correctly
                lettersGuessedCorrectly.push(usersGuess);

                //Set the display word text (with "_")
                setCurrentDisplayWord();

                //If the current display word text does not contain "_" then the user wins
                if (currentDisplayWord.indexOf("_") < 0){
                    onWin();
                }
            }
            //User guessed incorrectly
            else {
                numGuessRemain--;

                if (numGuessRemain == 0) {
                    //Get a new word
                    getWord();
                }
            }


            //Refresh the screen fields
            refreshScreenFields();
        }
}

//Initialize the words array
initializeWords();
//Get next word to guess
getWord();
//Refresh the screen fields
refreshScreenFields();


