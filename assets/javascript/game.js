// set screen pointer vars
var winsId             = document.getElementById("nbrWins"),
    lossesId           = document.getElementById("nbrLosses"),
    artistId           = document.getElementById("artist"),
    playboardId        = document.getElementById("playboard"),
    lettersGuessedId   = document.getElementById("lettersGuessed"),
    guessesRemainingId = document.getElementById("nbrGuessesRemaining"),
    msgId              = document.getElementById("msg"),
    contMsgId          = document.getElementById("contMsg"),
    sndId              = document.getElementById("myAudio"),
    srcId              = document.getElementById("audioSrc");

// messages
var msg = "", 
    goodGuess = "Correct!  Good guess.";
    winMsg = "<strong> Congratz - you win !! </strong> ",
    lossMsg = "<strong> You have run out of guesses - You Lose!! </strong>",
    contMsg = "Press any key to play again";

// integers
var wins=0, 
    losses=0, 
    guessesRemaining;

// objects 
var artist;

// arrays
var lettersGuessed = [], 
    correctLetters = []; 

// strings 
var artistStr;

// booleans
var gameComplete = true;

// ===================================================================


function initGame() {
    msg = ""; 
    
    contMsgId.style     = "display: none";
    contMsgId.textContent = contMsg;

    playboardId.style   = "display: block";

    guessesRemaining = 15;
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

    if (gameComplete) {
        initGame();
    } else {

        if (checkGuess(guess)) {
            correctLetters.push(guess);
            msg = goodGuess;
            if (correctLetters.length == artist.uniqueLtrs.length) {
                wins++;
                msg = winMsg;
                endGame();
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
            msg = lossMsg;
            endGame();
        }
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
    if (msg.length > 1)  msgId.innerHTML = msg;
    if (contMsg.length > 1)  contMsgId.innerHTML = contMsg;

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

function endGame() {
    gameComplete = true;
       
    srcId.src = artist.song;
    sndId.load();
    sndId.play();

    contMsgId.style = "display: block";
}

document.onkeyup = function (event) { 
    var guess = event.key;
    guess = guess.toLowerCase();
    
    if (gameComplete) {         // if game is complete - accept any letter to start the game
        playGame(); 
    } else if (/[a-z]/.test(guess)) {
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
