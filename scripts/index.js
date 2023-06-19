// Players
const player1 = "Player One";
const player2 = "Player Two";

let currentPlayer = player1;
let originalPlayer = player1; // Original player who chose the question

function switchPlayer() {
    if (currentPlayer === player1) {
        return player2;
    } else {
        return player1;
    }
}

// Scores
let scoreDisplay1 = document.getElementById("scoreP1");
let scoreDisplay2 = document.getElementById("scoreP2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;

//? These are our containers to store our data:
const tableCells = document.querySelectorAll(".clickable-item");
const modal = document.querySelector("#modal");
const guessButton = document.querySelector("#guess-btn");
const passButton = document.querySelector("#pass-btn");
const nextRoundButton = document.querySelectorAll("#next-round-btn")
let inputAnswer = document.querySelector("#input-answer");
let inputBet = document.getElementById("input-bet");
let currentQuestion;
let offSet;

//? Imports
// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });
import { showPlayersTurn } from "./functions.js"


window.addEventListener("load", () => showPlayersTurn(currentPlayer)); // notification for player's turn

//? Questions
// Questions are organized by categoy using the .filter() method 
// it works because we have them in an array
const questionsNature = placeholderQuestions
    //We get all the questions in the "Nature" category using the filter() method
    .filter((question) => question.category === "Nature");

const questionsAnimals = placeholderQuestions
    .filter((question) => question.category === "Animals");

const questionsComputers = placeholderQuestions
    .filter((question) => question.category === "Computers");

const questionsMythology = placeholderQuestions
    .filter((question) => question.category === "Mythology");

const questionsHistory = placeholderQuestions
    .filter((question) => question.category === "History");

const questionsGeneral = placeholderQuestions
    .filter((question) => question.category === "General");

const questionFinal = placeholderQuestions
    .filter((question) => question.category === "Final");

//This object is a map that takes the categories (strings) and maps them to the various array of questions
//this way we can look up the category and we will get the questions associated to it
const qmap = {
    nature: questionsNature,
    animals: questionsAnimals,
    computers: questionsComputers,
    mythology: questionsMythology,
    history: questionsHistory,
    general: questionsGeneral,
    final: questionFinal
}

//? CELLS AND CORRISPONDING OF QUESTIONS
// We add an event listener to each cell of the table
tableCells.forEach(c => c.addEventListener("click", function () { //every time we click on c this function is going to run

    //We destructured the classList to get these two values
    const [category, value] = c.classList
    //The category will help us undertand which category of questions we have to pull out,
    //the value will determine what number is that question inside the category

    offSet = value[1];

    //Let's turn the offSet into a number calling parseInt, so we can use it to see how far we to go into the array
    const offSetToNumber = parseInt(offSet) - 1; //Since the index counting starts from 0 in order to get the right number we have to subtract 1

    //This will create a pop up that will display the category and worth of the cell that we click on
    alert(`Category ${category}, Worth $${offSet + '00'}`)
    modal.style.display = "block";

    currentQuestion = qmap[category][offSetToNumber]; //first we go look at qmap and go to the category to get the questions that we want; 
    // then we go inside the array of questions and find the offSet that we want.

    const questionDisplay = document.querySelector("#question");
    questionDisplay.textContent = currentQuestion.question;

})
)

guessButton.addEventListener("click", function () {
    const playerAnswer = inputAnswer.value;
    const points = parseInt(offSet) * 100;
    if (playerAnswer === currentQuestion.answer) {
        switch (currentPlayer) {
            case player1:
                scorePlayer1 += points;
                scoreDisplay1.textContent = scorePlayer1;
                break;
            case player2:
                scorePlayer2 += points;
                scoreDisplay2.textContent = scorePlayer2;
                break;
        }
    } else {
        switch (currentPlayer) {
            case player1:
                scorePlayer1 -= points;
                scoreDisplay1.textContent = scorePlayer1;
                break;
            case player2:
                scorePlayer2 -= points;
                scoreDisplay2.textContent = scorePlayer2;
                break;
        }

        if (currentPlayer !== originalPlayer) {
            // Allow the other player to answer the question
            alert(`The original player answered incorrectly. It's now ${currentPlayer}'s turn to answer.`);
            switchPlayer(currentPlayer); // Call the switchPlayer function to handle the turn switching
        } else {
            // If no one answered correctly, the original player gets to choose a new question
            alert("Neither player answered correctly. Original player can choose a new question.");
        }
    }
    modal.style.display = "none";
});

passButton.addEventListener("click", function () {
    currentPlayer = switchPlayer();
    alert(`${currentPlayer}, it's your turn to answer.`);
    console.log(currentPlayer);
    modal.style.display = "none";
});

