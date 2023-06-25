//? Import
// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

//? These are our containers to store our data:
const tableCells = document.querySelectorAll(".clickable-item");
const guessButton = document.querySelector("#guess-btn");
const passButton = document.querySelector("#pass-btn");
const nextRoundButton = document.querySelectorAll("#next-round-btn")
let inputAnswer = document.querySelector("#input-answer");

//? Players
const player1 = "Player One";
const player2 = "Player Two";
const playersTurnDisplay = document.getElementById("players-turn-display");
let currentPlayer = player1;

//? Scores
let scoreDisplay1 = document.getElementById("scoreP1");
let scoreDisplay2 = document.getElementById("scoreP2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;



const buttonToFinal = document.getElementById("next-round-btn");
if (buttonToFinal) {
    buttonToFinal.addEventListener("click", function () {
        window.location.href = "final-jeopardy.html";
    });
} 

window.addEventListener("load", function() {
    alert(`It's ${currentPlayer}'s turn!`);
});