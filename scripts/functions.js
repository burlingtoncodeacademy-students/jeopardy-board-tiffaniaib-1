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

function switchPlayer() {
    newPlayer = playersStates[currentPlayer];
    currentPlayer = newPlayer;
}


export { showPlayersTurn, switchPlayer };
