//Declare global variables
var winAudio = document.getElementById("winAudio");
var winModal = $('#winModal');
var userInputDiv = document.getElementById("userInputDiv");
var guessTextBox = document.getElementById("guess");

//Declare object
var wordGuessGame = {
    numGuessRemain: 12,
    words: [],
    letterGuessed: [],
    lettersGuessedCorrectly: [],
    wins: 0,
    losses: 0,
    currentWord: "",

    //Initialize the words array
    initializeWords: function () {
        this.words = ["ukulele", "aloha", "poke", "mahalo", "hawaii", "maui", "surf", "turtles", "whales", "Oahu", "Honolulu", "Waikiki", "volcano", "beaches", "harbor", "waterfalls", "mountains", "dolphins", "hula", "leis"];
    },

    //Get next word for the user to guess
    getWord: function() {
        //Reset values
        this.currentWord = "";
        this.numGuessRemain = 12;
        this.lettersGuessed = [];
        this.lettersGuessedCorrectly = [];
    
        //Words array has values
        if (this.words.length > 0) {
            //Get random array index number
            var randIndex = Math.floor(Math.random() * this.words.length);
            //Assign the word to the current word variable
            this.currentWord = this.words[randIndex].toLowerCase();
            //Remove the word from the array list so it doesn't get picked again
            this.words.splice(randIndex, 1);
        }
        //words array does not have values 
        else { 
            //Re-initilze the words array
            this.initializeWords();
            //Re-run the get words function to get the next word now that the words array is refreshed
            this.getWord();
        }
    },

    //Function to run when the player wins
    onWin: function () {
        //Show win modal
        winModal.modal('show');
        //Play win audio
        winAudio.play();
        //Increment the wins by 1
        this.wins++;
        //Get a new word
        this.getWord();
        //Refresh the screen fields
        this.refreshScreenFields();
    },

    //Function is run on a loss
    onLoss: function() {
        //increment losses
        this.losses++;
        //Get a new word
        this.getWord();
        //Refresh the screen fields
        this.refreshScreenFields();
    },

    //Function that refreshes all the dynamic html fields
    refreshScreenFields: function () {

        //Set the html element contents to their coresponding variable values
        if (this.lettersGuessed.length >0){
            document.getElementById("lettersGuessedText").textContent = this.lettersGuessed.toString();
        }
        else {
            document.getElementById("lettersGuessedText").textContent = "";
        }

        document.getElementById("winsText").textContent = this.wins;
        document.getElementById("lossesText").textContent = this.losses;
        document.getElementById("numGuessRemainText").textContent = this.numGuessRemain;
        document.getElementById("currentWordText").textContent = this.getCurrentDisplayWord();
    },

    //Get the word to display on the screen (with "_")
    getCurrentDisplayWord: function () {
        //Set the current display word to the current word variable
        var currentDisplayWord = this.currentWord;

        //Create a regular expression search pattern to search for letters that were not guessed correctly
        var searchLetters = this.lettersGuessedCorrectly.join("");
        var searchPattern = new RegExp("[^" + searchLetters + "]", "g");
    
        //Using the regular expression above, replace any letters that have not been guessed yet with "_"
        currentDisplayWord =  currentDisplayWord.replace(searchPattern, "_");

        return currentDisplayWord;
    },

    //Process the user's guess
    processUserGuess: function(usersGuess) {
        //Add the letter guessed by the user to the letterGuessed array
        this.lettersGuessed.push(usersGuess);

        //Current word contains the letter guessed
        if (this.currentWord.indexOf(usersGuess) >=0) {
            //Add letter to array of letters guessed correctly
            this.lettersGuessedCorrectly.push(usersGuess);

            //Get the display word text (with "_")
            var currentDisplayWord = this.getCurrentDisplayWord();

            //If the current display word text does not contain "_" then the user wins
            if (currentDisplayWord.indexOf("_") < 0){
                this.onWin();
            }
        }
        //User guessed incorrectly
        else {
            this.numGuessRemain--;

            if (this.numGuessRemain == 0) {
                //Run the onLoss function
                this.onLoss();
            }
        }
    },

    //Process keyup event
    processKeyUp: function(usersGuess) {
        
        usersGuess = usersGuess.toLowerCase();

        if (//Users key press was not already guessed
            wordGuessGame.lettersGuessed.indexOf(usersGuess) < 0 &&
            //Make sure the guess has only one character and that character is a letter
            usersGuess.length == 1 && usersGuess.match(/[a-z]/i)) {
            //Process the user's guess
            wordGuessGame.processUserGuess(usersGuess);
            //Refresh the screen fields
            wordGuessGame.refreshScreenFields();
        }
    }
};

//If the device has a touchscreen then display a textbox where the usuer can click on and enter the letter they want to guess
if ('ontouchstart' in document.documentElement) {
    //Make the input textbox visible
    userInputDiv.style.display = "block";

    // This function is run whenever the user presses a key on the guess text box. Clear out the users input after the processKeyUp method is run. 
    guessTextBox.oninput = function(event){ wordGuessGame.processKeyUp(event.data); guessTextBox.value = ""; };
}
//There is no touchscreen
else {
    //Make the input textbox not visible
    userInputDiv.style.display = "none";

    // This function is run whenever the user presses a key.
    document.onkeyup = function(event){ wordGuessGame.processKeyUp(event.key) };
}

//Pause the win audio if the user clicked on ok on the modal
winModal.on('hidden.bs.modal', function (e) {
    //Pause the audio
    winAudio.pause(); 
    //Set the current time on the audio back to 0 so if the user wins again the audio plays from the beginning. 
    winAudio.currentTime = 0; 
  });


//Initialize the words array
wordGuessGame.initializeWords();
//Get next word to guess
wordGuessGame.getWord();
//Refresh the screen fields
wordGuessGame.refreshScreenFields();


