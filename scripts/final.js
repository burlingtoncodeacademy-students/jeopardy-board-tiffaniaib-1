let categoryDisplay = document.getElementById("final-category");
let betInput = document.getElementById("input-bet");
let betButton = document.getElementById("user-input-btn");

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