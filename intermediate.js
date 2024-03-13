'use strict';

// Global variables
let highscore = 0;
let attemptsLeft = 10; // Number of attempts allowed
let theNumber = Math.trunc(Math.random() * 50) + 1; // Number range from 1 to 20
console.log(theNumber);

// Function to handle guessing the number
function guessNumber() {
    let guess = Number(document.querySelector(".guess").value);

    // Input validation
    if (!guess) {
        document.querySelector(".heading").textContent = "Input A Number";
    } else {
        attemptsLeft--; // Decrease attempts left
        document.querySelector(".attempt").textContent = attemptsLeft; // Update attempts left display

        // Check if attempts are exhausted
        if (attemptsLeft === 0) {
            endGame("lose");
            return;
        }

        // Check guess and update game state
        if (guess > theNumber) {
            document.querySelector(".heading").textContent = "Guess Too High";
        } else if (guess < theNumber) {
            document.querySelector(".heading").textContent = "Guess Too Low";
        } else {
            highscore += attemptsLeft; // Add attempts left to highscore
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
    } else if (event.key === ' ') { // Link continue button to space key
        newGame();
    } else if (event.key === 'r' || event.key === 'R') { // Link reset button to R key
        resetGame();
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
    highscore = 0; // Reset highscore
    attemptsLeft = 10; // Reset attempts left
    theNumber = Math.trunc(Math.random() * 50) + 1; // Reset number
    console.log(theNumber);
    document.querySelector(".highscore").textContent = highscore; // Update highscore display
    document.querySelector(".attempt").textContent = attemptsLeft; // Update attempts left display
    updateGameUI();
}

function newGame() {
    attemptsLeft = 10; // Reset attempts left
    theNumber = Math.trunc(Math.random() * 50) + 1; // New random number
    console.log(theNumber);
    document.querySelector(".attempt").textContent = attemptsLeft; // Update attempts left display
    updateGameUI();
}

function updateGameUI() {
    document.querySelector("body").style.backgroundColor = "rgb(28, 27, 27)";
    document.querySelector(".highscore").textContent = highscore;
    document.querySelector(".number").textContent = "?";
    document.querySelector(".heading").textContent = "Play game";
    document.querySelector('.guess').value = '';
    document.querySelector('.guess').style.pointerEvents = 'visible';
}

// Play Music Button functionality
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

