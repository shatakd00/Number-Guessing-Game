'use strict';

// Global variables
let highscore = 0;
let theNumber = Math.trunc(Math.random() * 100) + 1; // Increased range
console.log(theNumber);

// Countdown timer
let timeLeft = 20; // Initial time (seconds)
const countdown = document.querySelector(".countdown");
let timer;

// Function to update the countdown timer
function updateTimer() {
    if (timeLeft === 0) {
        clearInterval(timer);
        countdown.textContent = `Time Left: 0`; // Update to display "Time Left: 0" before clearing the interval
        endGame("lose");
    } else {
        countdown.textContent = `Time Left: ${timeLeft}`;
        timeLeft--;
    }
}

// Function to start the timer
function startTimer() {
    if (!timer) { // Check if timer is already running
        timer = setInterval(updateTimer, 1000);
    }
}

// Function to handle guessing the number
function guessNumber() {
    let guess = Number(document.querySelector(".guess").value);

    // Input validation
    if (!guess) {
        document.querySelector(".heading").textContent = "Input A Number";
    } else {
        // Check guess and update game state
        if (guess > theNumber) {
            document.querySelector(".heading").textContent = "Guess Too High";
        } else if (guess < theNumber) {
            document.querySelector(".heading").textContent = "Guess Too Low";
        } else {
            // Calculate score based on time left
            const score = timeLeft + 1;
            highscore += score; // Add current score to highscore
            document.querySelector(".highscore").textContent = highscore;
            document.querySelector(".number").textContent = theNumber;
            document.querySelector(".heading").textContent = "You Win!!!";
            clearInterval(timer);
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
    } else if (event.key === 'r' || event.key === 'R') { // Link reset button to R key
        resetGame();
    } else if (event.key === ' ' || event.code === 'Space') { // Link continue button to space key
        newGame();
        startTimer(); // Start the timer when continuing
    }
});

// Guess input field focus event listener
document.querySelector(".guess").addEventListener("focus", function () {
    startTimer(); // Start the timer when the user clicks on the input field
});

// Reset button click event listener
document.querySelector('.reset').addEventListener('click', resetGame);

// Continue button click event listener
document.querySelector('.continue').addEventListener('click', function () {
    newGame();
    startTimer(); // Start the timer when continuing
});

// Helper functions for game state management
function endGame(result) {
    document.querySelector("body").style.backgroundColor = result === "win" ? "#188351" : "#a90000";
    document.querySelector('.guess').style.pointerEvents = 'none';
    if (result === "lose") {
        document.querySelector(".heading").textContent = "You Lose!!!"; // Change header text to "You Lose!!!"
        highscore = 0; // Reset highscore if user loses
        document.querySelector(".highscore").textContent = highscore;
    }
}

function resetGame() {
    highscore = 0;
    theNumber = Math.trunc(Math.random() * 100) + 1; // Reset number
    console.log(theNumber);
    timeLeft = 20; 
    clearInterval(timer); // Stop the timer
    timer = null; // Reset the timer variable
    startTimer(); // Start the timer
    updateGameUI();
}

function newGame() {
    theNumber = Math.trunc(Math.random() * 100) + 1; // New random number
    console.log(theNumber);
    timeLeft = 20; 
    clearInterval(timer); // Stop the timer
    timer = null; // Reset the timer variable
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
