const buttonToRound2 = document.getElementById("next-round-btn").addEventListener("click", function () {
    window.location.href = "round-2.html";
});
window.addEventListener("load", showPlayersTurn); 

//? These are our containers to store our data:
const tableCells = document.querySelectorAll(".clickable-item");
const guessButton = document.querySelector("#guess-btn");
const passButton = document.querySelector("#pass-btn");
const nextRoundButton = document.querySelectorAll("#next-round-btn")
let inputAnswer = document.querySelector("#input-answer");
let inputBet = document.getElementById("input-bet");
//--------------------------------------------------------------------
const modal = document.querySelector("#modal");
let currentQuestion;


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
function showPlayersTurn() {
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
let offSet = 0;

//? CELLS AND CORRISPONDING OF QUESTIONS
// We add an event listener to each cell of the table
tableCells.forEach(c => {
    c.addEventListener("click", function () {
        if (c.dataset.selected === "true") {
            alert("Please pick a question.");
            return;
        }

        const [category, value] = c.classList;
        offSet = value[1];

        const offSetToNumber = parseInt(offSet) - 1;

        alert(`Category ${category}, Worth $${offSet + '00'}`);
        modal.style.display = "block";

        currentQuestion = qmap[category][offSetToNumber];

        const questionDisplay = document.querySelector("#question");
        questionDisplay.textContent = currentQuestion.question;
        guessButton.disabled = false;
        passButton.disabled = false;


        // Update the selected state of the cell
        c.dataset.selected = "true";
        c.style.backgroundColor = "rgba(103, 4, 4, 0.8)";

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
                // Check if either player has reached 15,000 points
                if (scorePlayer1 >= 15000 || scorePlayer2 >= 15000) {
                    alert("Congratulations! Move on to Round 2.");
                    // Enable the "Round 2" button
                    buttonToRound2.disabled = false;
                }
                // To disable the cell
                currentQuestion = null;
                modal.style.display = "none";
                c.innerHTML = "";
                c.classList.remove("clickable-item");
        
                // Check if the board has been cleared
                const allCellsSelected = Array.from(tableCells).every(
                    cell => cell.dataset.selected === "true"
                );
                if (allCellsSelected) {
                    alert("Board cleared! Move on to Round 2.");
                    // Enable the "Round 2" button
                    buttonToRound2.disabled = false;
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
            inputAnswer.value = "";
            modal.style.display = "none";
        });
    });
    
    passButton.addEventListener("click", function () {
        currentPlayer = switchPlayer();
        alert(`${currentPlayer}, it's your turn to answer.`);
    });
});




