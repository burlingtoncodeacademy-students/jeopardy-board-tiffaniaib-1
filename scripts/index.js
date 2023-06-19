//? Functions
function switchPlayer() {
    if (currentPlayer === player1) {
        currentPlayer = player2;
    } else {
        currentPlayer = player1;
    }
    playersTurnDisplay.textContent = currentPlayer; // Update the text content of the playersTurnDisplay (h2 element)
    return currentPlayer;
}

// Function to display the alert
function showPlayersTurn(currentPlayer) {
    // We want for the alert to be displayed in all the pages but the index.html
    // const urlIndexHTML = window.location.href --> http://127.0.0.1:5501/
    // when at this URL we won't show the alert

    let currentPageURL = window.location.href;
    if (currentPageURL === "http://127.0.0.1:5501/") {
        return;
    } else {
        alert(`It's ${currentPlayer}'s turn!`);
        // To disable the buttons:
        const userButtons = document.getElementsByClassName("user-buttons"); // first we select all the buttons and wrap them in one variable
        userButtons.disabled = true;
    }
}


//? Players
const player1 = "Player One";
const player2 = "Player Two";
const playersTurnDisplay = document.getElementById("players-turn-display");
let currentPlayer = player1;
let originalPlayer = player1; // Original player who chose the question

//? Scores
let scoreDisplay1 = document.getElementById("scoreP1");
let scoreDisplay2 = document.getElementById("scoreP2");
let scorePlayer1 = 0;
let scorePlayer2 = 0;

//? These are our containers to store our data:
const playButton = document.getElementById("button-play");
const guessButton = document.querySelector("#guess-btn");
const passButton = document.querySelector("#pass-btn");
const nextRoundButton = document.querySelectorAll("#next-round-btn")
let inputAnswer = document.querySelector("#input-answer");
let inputBet = document.getElementById("input-bet");
//--------------------------------------------------------------------
const tableCells = document.querySelectorAll(".clickable-item");
const modal = document.querySelector("#modal");
let currentQuestion;
let offSet;

//? Import
// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

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


playButton.addEventListener("click", function () {
    window.location.href = "round-1.html";
});
window.addEventListener("load", () => showPlayersTurn(currentPlayer)); // notification for player's turn

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

    c.disabled = true;

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
});

