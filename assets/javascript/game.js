// set screen pointer vars
var winsId = document.getElementById("nbrWins");
var lossesId = document.getElementById("nbrLosses");
var artistId = document.getElementById("artist");
var lettersGuessedId = document.getElementById("lettersGuessed");
var guessesRemainingId = document.getElementById("nbrGuessesRemaining");
var msgId = document.getElementById("msg");
var sndId = document.getElementById("myAudio");
var srcId = document.getElementById("audioSrc");


// integers
var wins=0, losses=0, guessesRemaining;

// objects 
var artist;

// arrays
var lettersGuessed = [], correctLetters = []; 

// strings 
var msg, artistStr,
    winMsg = "Congratz! - You Win! <p> Press ";

// booleans
var cont = true; gameComplete = true;

// ===================================================================



function initGame() {

    guessesRemaining = 12;
    lettersGuessed = [];
    correctLetters = [];

    gameComplete = false;

    // computer gets random artist 
    artist = artists[Math.floor(Math.random() * artists.length)];
    
    updateScreen();
}

function playGame(guess) {
    // user guesses letter in artist name (ensure not one previously selected)
    // check if letter is in name
    //   if so, add letter to correctLetters array
    //   if length of correctLetters == length of unique letters in artist name
    //     wins++
    //     game-end

    msg = "";

    if (checkGuess(guess)) {
        correctLetters.push(guess);
        msg = "Correct!!";
        if (correctLetters.length == artist.uniqueLtrs.length) {
            wins++;
            gameComplete = true;
            msg = "Congratz - you win !!";
        }
    }

    // add letter to guessedLetters array
    lettersGuessed.push(guess);

    // decrement guessesRemaining
    guessesRemaining--;

    // if attempts exceeds max
    //     losses++
    //     game-end
    if (guessesRemaining < 1) {
        losses++;
        gameComplete = true;
        msg = "You have run out of guesses - You Lose!!";
    }

}

function updateScreen () {
    artistStr = makeArtistPresentable();

    // send values to screen
    artistId.textContent = artistStr;
    winsId.textContent = wins;
    lossesId.textContent = losses;
    guessesRemainingId.textContent = guessesRemaining;
    lettersGuessedId.textContent = lettersGuessed;
    msgId.textContent = msg;

    if (gameComplete) {
        srcId.src = artist.song;
        sndId.load();
        sndId.play();
    }
}

// return str, using artist name and replacing unknown characters with '_' (underscore)
function makeArtistPresentable () {

    if (gameComplete) return artist.name;

    var str = "";

    for (i = 0; i < artist.name.length; i++) {
        if (artist.name.charAt(i) == " ") continue;
        else if (correctLetters.includes(artist.name.charAt(i).toLowerCase())) {
            str += artist.name.charAt(i).toLowerCase() + " ";
        } else {
            str += "_ ";
        }
    }
    return str;
}

function checkGuess (ltr) {
    // return boolean whether ltr is found in artist unique letters or not
    return (artist.uniqueLtrs.includes (ltr));
}

document.onkeyup = function (event) { 
    var guess = event.key;
    guess = guess.toLowerCase();
    
    if (gameComplete) initGame();

    if (/[a-z]/.test(guess)) {
        if (guess.length > 1) {
            msg = guess + " is not a valid character"; 
        } else if (lettersGuessed.includes(guess)) { 
            msg = "letter already guessed"; 
        } else {
            playGame(guess);
        }
    } else { 
        msg = guess + " is not a valid character"; 
    }

    updateScreen();
}

