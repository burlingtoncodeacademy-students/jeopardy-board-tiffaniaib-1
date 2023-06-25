let categoryDisplay = document.getElementById("final-category");
let betButton = document.getElementById("user-input-btn");
let inputBet = document.getElementById("input-bet");

  //? Import
// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });
const questionFinal = placeholderQuestions
    .filter((question) => question.category === "Final");

// Display the category to the players
const displayCategory = (category) => {
    categoryDisplay.textContent = `Final Question`;
  };