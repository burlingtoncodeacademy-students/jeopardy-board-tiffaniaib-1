//? Import
// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });

const buttonToRound2 = document.getElementById("next-round-btn");

window.addEventListener("load", function () {
    alert(`It's ${currentPlayer}'s turn!`);
});

//? These are our containers to store our data:
const tableCells = document.querySelectorAll(".clickable-item");
const guessButton = document.querySelector("#guess-btn");
const passButton = document.querySelector("#pass-btn");
const nextRoundButton = document.querySelectorAll("#next-round-btn")
let inputAnswer = document.querySelector("#input-answer");

//--------------------------------------------------------------------
const modal = document.querySelector("#modal");
// let currentQuestion;

//? Function
function changePlayer() {
    currentPlayer = currentPlayer === player1 ? player2 : player1;
    playersTurnDisplay.textContent = currentPlayer;
    return currentPlayer;
}

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
tableCells.forEach(cell => {
    cell.addEventListener("click", function () {
        if (cell.dataset.selected === "true") {
            alert("Please pick a question.");
            return;
        }

        const [category, value] = cell.classList;
        offSet = value[1];

        const offSetToNumber = parseInt(offSet) - 1;

        alert(`Category ${category}, Worth $${offSet + '00'}`);
        modal.style.display = "block";

        let currentQuestion = qmap[category][offSetToNumber];


        const questionDisplay = document.querySelector("#question");
        questionDisplay.textContent = currentQuestion.question;
        guessButton.disabled = false;
        passButton.disabled = false;


        // Update the selected state of the cell
        cell.dataset.selected = "true";
        cell.style.backgroundColor = "rgba(103, 4, 4, 0.8)";


        guessButton.addEventListener("click", function () {
            // RIGHT ANSWER
            if (inputAnswer.value.toLowerCase().trim() == currentQuestion.answer.toLowerCase().trim()) {
                console.log(inputAnswer.value, currentQuestion.answer)
                switch (currentPlayer) {
                    case player1:
                        scorePlayer1 += Number(cell.textContent);
                        console.log(scoreDisplay1)
                        scoreDisplay1.textContent = scorePlayer1;
                        break;
                    case player2:
                        scorePlayer2 += Number(cell.textContent);
                        scoreDisplay2.textContent = scorePlayer2;
                        break;
                }
                // Check if either player has reached 15,000 points
                if (scorePlayer1 >= 15000 || scorePlayer2 >= 15000) {
                    alert("Congratulations! Move on to Round 2.");
                    nextRoundButton.disabled = false;
                }
                // To disable the cell
                // currentQuestion = null;
                // modal.style.display = "none";
                // c.innerHTML = "";
                // c.classList.remove("clickable-item");

                // Check if the board has been cleared
                const allCellsSelected = Array.from(tableCells).every(
                    cell => cell.dataset.selected === "true"
                );
                if (allCellsSelected) {
                    alert("Board cleared! Move on to Round 2.");
                    nextRoundButton.disabled = false;
                }
                // WRONG ANSWER
            } else if (inputAnswer.value.toLowerCase().trim() != currentQuestion.answer.toLowerCase().trim()) {
                switch (currentPlayer) {
                    case player1:
                        scorePlayer1 -= Number(cell.textContent);
                        scoreDisplay1.textContent = scorePlayer1;
                        break;
                    case player2:
                        scorePlayer2 -= Number(cell.textContent);
                        scoreDisplay2.textContent = scorePlayer2;
                        break;
                }
                changePlayer();
                alert(`The original player answered incorrectly. It's now ${currentPlayer}'s turn to answer.`);
                
                if (inputAnswer.value.toLowerCase().trim() == currentQuestion.answer.toLowerCase().trim()) {
                    switch (currentPlayer) {
                        case player1:
                            scorePlayer1 += Number(cell.textContent);
                            scoreDisplay1.textContent = scorePlayer1;
                            break;
                        case player2:
                            scorePlayer2 += Number(cell.textContent);
                            scoreDisplay2.textContent = scorePlayer2;
                            break;
                    }
                
                    // Check if either player has reached 15,000 points
                    if (scorePlayer1 >= 15000 || scorePlayer2 >= 15000) {
                        console.log(`this line`)
                        alert("Congratulations! Move on to Round 2.");
                        nextRoundButton.disabled = false;
                    }
                    // To disable the cell
                    // currentQuestion = null;
                    // modal.style.display = "none";
                    // c.innerHTML = "";
                    // c.classList.remove("clickable-item");

                    // Check if the board has been cleared
                    const allCellsSelected = Array.from(tableCells).every(
                        cell => cell.dataset.selected === "true"
                    );
                    if (allCellsSelected) {
                        alert("Board cleared! Move on to Round 2.");

                        nextRoundButton.disabled = false; // Enable the "Round 2" button
                    }
                    // WRONG ANSWER
                } else {
                    switch (currentPlayer) {
                        case player1:
                            scorePlayer1 -= Number(cell.textContent);
                            scoreDisplay1.textContent = scorePlayer1;
                            break;
                        case player2:
                            scorePlayer2 -= Number(cell.textContent);
                            scoreDisplay2.textContent = scorePlayer2;
                            break;
                    }
                    currentPlayer = changePlayer(); // Change player only if the other player's answer is wrong
        alert(`Both players answered incorrectly.${currentPlayer} gets to pick another question.`);

                }
                
            }
            inputAnswer.value = "";
            modal.style.display = "none";
        });



        passButton.addEventListener("click", function () {
            console.log(currentPlayer)
            switch (currentPlayer) {
                case player1:
                    scorePlayer1 -= Number(cell.textContent);
                    scoreDisplay1.textContent = scorePlayer1;
                    break;
                case player2:
                    scorePlayer2 -= Number(cell.textContent);
                    scoreDisplay2.textContent = scorePlayer2;
                    break;
            }
            console.log("before the change this is the current player:" + currentPlayer)
            currentPlayer = changePlayer();
            console.log("after the change this is the current player:" + currentPlayer)
            alert(`${currentPlayer}, it's your turn to answer.`);
        });

    });
});

buttonToRound2.addEventListener("click", function () {
    window.location.href = `round-2.html?scorePlayer1=${scorePlayer1}&scorePlayer2=${scorePlayer2}`; // this way we are passing data to the next page
})


