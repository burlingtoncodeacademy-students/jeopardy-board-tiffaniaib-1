const buttonToFinal = document.getElementById("next-round-btn").addEventListener("click", function () {
    window.location.href = "final-jeopardy.html";
});
window.addEventListener("load", showPlayersTurn); 

//? Import
// Do not change the import statement
import placeholderQuestions from "./placeholder-questions.js";
console.log({ placeholderQuestions });