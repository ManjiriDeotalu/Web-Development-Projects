document.addEventListener("DOMContentLoaded", function () {
    const board = document.getElementById("board");
    const gameOptions = document.getElementById("gameOptions");
    const playWithAIBtn = document.getElementById("playWithAI");
    const playWithFriendBtn = document.getElementById("playWithFriend");
    const resetBtn = document.getElementById("resetBtn");
    const resultMessage = document.getElementById("result");

    const cells = [];
    let currentPlayer = "X";
    let gameOver = false;
    let isAI = false;

    // Hide the board and reset button initially
    board.style.display = "none";
    resetBtn.style.display = "none";

    // Function to handle cell clicks
    function handleCellClick(index) {
        if (!gameOver && cells[index].innerHTML === "") {
            cells[index].innerHTML = currentPlayer;
            if (checkForWin()) {
                displayResult(`${currentPlayer} wins!`);
            } else {
                currentPlayer = currentPlayer === "X" ? "O" : "X";
                checkForTie();

                if (isAI && !gameOver && currentPlayer === "O") {
                    setTimeout(makeAIMove, 500);
                }
            }
        }
    }

    // Function to check for a win
    function checkForWin() {
        // Check rows
        for (let i = 0; i < 3; i++) {
            if (
                cells[i * 3].innerHTML !== "" &&
                cells[i * 3].innerHTML === cells[i * 3 + 1].innerHTML &&
                cells[i * 3].innerHTML === cells[i * 3 + 2].innerHTML
            ) {
                return true;
            }
        }

        // Check columns
        for (let i = 0; i < 3; i++) {
            if (
                cells[i].innerHTML !== "" &&
                cells[i].innerHTML === cells[i + 3].innerHTML &&
                cells[i].innerHTML === cells[i + 6].innerHTML
            ) {
                return true;
            }
        }

        // Check diagonals
        if (
            cells[0].innerHTML !== "" &&
            cells[0].innerHTML === cells[4].innerHTML &&
            cells[0].innerHTML === cells[8].innerHTML
        ) {
            return true;
        }

        if (
            cells[2].innerHTML !== "" &&
            cells[2].innerHTML === cells[4].innerHTML &&
            cells[2].innerHTML === cells[6].innerHTML
        ) {
            return true;
        }

        return false;
    }

    // Function to check for a tie
    function checkForTie() {
        if (!cells.some((cell) => cell.innerHTML === "")) {
            displayResult("It's a tie!");
        }
    }

    // Function to display the game result
    function displayResult(message) {
        resultMessage.textContent = message;
        gameOver = true;
        resetBtn.style.display = "block";
    }

    // Function to reset the game
    function resetGame() {
        cells.forEach((cell) => {
            cell.innerHTML = "";
        });
        resultMessage.textContent = "";
        currentPlayer = "X";
        gameOver = false;
        resetBtn.style.display = "none";
        isAI = false;
    }

    // Event listener for the reset button
    resetBtn.addEventListener("click", resetGame);

    // Event listener for the "Play with AI" button
    playWithAIBtn.addEventListener("click", function () {
        isAI = true;
        startGame();
    });

    // Event listener for the "Play with a Friend" button
    playWithFriendBtn.addEventListener("click", function () {
        isAI = false;
        startGame();
    });

    // Function to start the game
    function startGame() {
        gameOptions.style.display = "none";
        board.style.display = "grid";

        // Create the Tic-Tac-Toe board
        for (let i = 0; i < 9; i++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            cell.addEventListener("click", () => handleCellClick(i));
            cells.push(cell);
            board.appendChild(cell);
        }

        // If playing with AI and AI's turn, make AI move
        if (isAI && currentPlayer === "O") {
            setTimeout(makeAIMove, 500);
        }
    }

    // Function to make a move for the AI
    function makeAIMove() {
        if (!gameOver) {
            let emptyCells = cells.filter((cell) => cell.innerHTML === "");
            if (emptyCells.length > 0) {
                const randomIndex = Math.floor(Math.random() * emptyCells.length);
                const aiMove = emptyCells[randomIndex].dataset.index;
                cells[aiMove].innerHTML = currentPlayer;
                if (checkForWin()) {
                    displayResult(`${currentPlayer} wins!`);
                } else {
                    currentPlayer = currentPlayer === "X" ? "O" : "X";
                }
            }
        }
    }
});
