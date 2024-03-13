'use strict';

// Global variables
let highscore = 0;
let attempt = 10;
let theNumber = Math.trunc(Math.random() * 10) + 1; // Number between 1 and 10
console.log(theNumber);

// Function to handle guessing the number
function guessNumber() {
    let guess = Number(document.querySelector(".guess").value);

    // Input validation
    if (!guess) {
        document.querySelector(".heading").textContent = "Input A Number";
    } else {
        // Check guess and update game state
        if (guess > theNumber) {
            if (attempt > 1) {
                document.querySelector(".heading").textContent = "Guess Too High";
                attempt--;
                document.querySelector(".attempt").textContent = attempt;
            } else {
                // Game over (lose)
                endGame("lose");
            }
        } else if (guess < theNumber) {
            if (attempt > 1) {
                document.querySelector(".heading").textContent = "Guess Too Low";
                attempt--;
                document.querySelector(".attempt").textContent = attempt;
            } else {
                // Game over (lose)
                endGame("lose");
            }
        } else {
            // Correct guess
            highscore += attempt; // Add attempts left to highscore
            document.querySelector(".highscore").textContent = highscore;
            document.querySelector(".number").textContent = theNumber;
            document.querySelector(".heading").textContent = "You Win!!!";
            endGame("win");
        }
    }

    // Clear the input field after each guess
    document.querySelector(".guess").value = '';
}

// Play button click event listener
document.querySelector(".play").addEventListener("click", guessNumber);

// Linking Enter key press to guess button click
document.addEventListener('keydown', function(event) {
    if (event.key === 'Enter') {
        guessNumber();
    }
});

// Reset button click event listener
document.querySelector('.reset').addEventListener('click', resetGame);

// Continue button click event listener
document.querySelector('.continue').addEventListener('click', function () {
    newGame();
});

// Helper functions for game state management
function endGame(result) {
    if (result === "win") {
        document.querySelector('.highscore').textContent = highscore;
    } else {
        highscore = 0; // Reset highscore if the guess is wrong
    }
    document.querySelector("body").style.backgroundColor = result === "win" ? "#188351" : "#a90000";
    document.querySelector('.guess').style.pointerEvents = 'none';
}

function resetGame() {
    highscore = 0;
    attempt = 10;
    theNumber = Math.trunc(Math.random() * 10) + 1;
    console.log(theNumber);

    updateGameUI();
}

function newGame() {
    attempt = 10;
    theNumber = Math.trunc(Math.random() * 10) + 1;
    console.log(theNumber);

    updateGameUI();
}

function updateGameUI() {
    document.querySelector("body").style.backgroundColor = "rgb(28, 27, 27)";
    document.querySelector(".highscore").textContent = highscore;
    document.querySelector(".attempt").textContent = attempt;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".heading").textContent = "Play game";
    document.querySelector('.guess').value = '';
    document.querySelector('.guess').style.pointerEvents = 'visible';
}

// Play Music Button 
const playMusicButton = document.querySelector('.play-music');
const audio = document.querySelector('audio');

playMusicButton.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    playMusicButton.textContent = 'Pause Game Music';
  } else {
    audio.pause();
    playMusicButton.textContent = 'Play Game Music';
  }
});

// Link reset button to R key
document.addEventListener('keydown', function(event) {
    if (event.key === 'r' || event.key === 'R') {
        resetGame();
    }
});

// Link continue button to Space key
document.addEventListener('keydown', function(event) {
    if (event.key === ' ' || event.code === 'Space') {
        newGame();
    }
});
