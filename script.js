const displayController = (() => {

    let player1Name;
    let player2Name;

    let activePlayerNumber;
    let activePlayerName;

    let turn;

    const nameForm = document.querySelector(".name-form");
    const gameNotification = document.querySelector(".game-notification");
    const gameGrid = document.querySelector(".game-grid");
    const results = document.querySelector(".results");
    const resultText = document.querySelector(".result-text");
    const newGameButton = document.querySelector(".new-game-button");
    
    const gameController = (() => {

        const gameboard = (() => {

            const boardArray = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];

            const getBoardArray = () => boardArray;

            const cellIsEmpty = (row, col) => boardArray[row][col] === '';

            const checkForWinner = () => {
                let winner;

                //Check rows
                for (let row = 0; row < 3; ++row) {
                    if (!cellIsEmpty(row, 0)) {
                        winner = boardArray[row][0];
                        if (boardArray[row][1] === winner && boardArray[row][2] === winner) {
                            return winner;
                        }

                    }
                }

                //Check columns
                for (let col = 0; col < 3; ++col) {
                    if (!cellIsEmpty(0, col)) {
                        winner = boardArray[0][col];
                        if (boardArray[1][col] === winner && boardArray[2][col] === winner) {
                            return winner;
                        }
                    }
                }

                //Check diagonal
                if (!cellIsEmpty(0, 0)) {
                    winner = boardArray[0][0];
                    if (boardArray[1][1] === winner && boardArray[2][2] === winner) {
                        return winner;
                    }
                }

                //Check reverse diagonal
                if (!cellIsEmpty(0, 2)) {
                    winner = boardArray[0][2];
                    if (boardArray[1][1] === winner && boardArray[2][0] === winner) {
                        return winner;
                    }
                }

                return "No winner found";
            };

            const resetBoard = () => {
                boardArray.forEach((row, rowIndex) => row.forEach((cell, colIndex) => boardArray[rowIndex][colIndex] = ''));
            }

            return {
                getBoardArray,
                cellIsEmpty,
                checkForWinner,
                resetBoard
            };
        })();

        const createPlayer = (mark) => {

            const placeMark = (row, col) => {
                gameboard.getBoardArray()[row][col] = mark;
            };

            return {
                placeMark
            }
        }

        const player1 = createPlayer('X');
        const player2 = createPlayer('O');

        const printBoard = () => {
            for (const row of gameboard.getBoardArray()) {
                console.log(row);
            }
        };

        const getGameboard = () => gameboard;

        const playTurn = (playerNumber, row, col) => {
            let activePlayer;

            if (playerNumber === 1)
                activePlayer = player1;
            else
                activePlayer = player2;

            activePlayer.placeMark(row, col);

            return gameboard.checkForWinner();
        }

        return {
            getGameboard,
            playTurn
        }
    })();

    const updateBoard = () => {
        const boardArray = gameController.getGameboard().getBoardArray();
        const gameCellList = document.querySelectorAll(".game-cell");

        let arrayIndex = 0;
        for (const gameCell of gameCellList) {
            const row = Math.floor(arrayIndex / 3);
            const col = arrayIndex % 3;
            const boardContent = boardArray[row][col];

            if (boardContent === 'X') gameCell.style.color = "#2309a3";
            else if (boardContent === 'O') gameCell.style.color = "#d51010";

            gameCell.textContent = boardContent;

            ++arrayIndex;

        }
    }

    const removeClickableGrid = () => {
        gameGrid.removeEventListener("click", playTurn);
    }

    const playTurn = (event) => {
        const clickedCell = event.target;

        if (clickedCell === gameGrid)
            return;

        const row = clickedCell.dataset.row;
        const col = clickedCell.dataset.col;

        if (!gameController.getGameboard().cellIsEmpty(row, col))
            return;

        const winner = gameController.playTurn(activePlayerNumber, row, col);
        ++turn;

        updateBoard();

        if (winner !== "No winner found") {
            results.showModal();
            resultText.textContent = `Player ${activePlayerNumber} (${activePlayerName}) wins!`;
            removeClickableGrid();
            gameNotification.textContent = '';
            return;
        }
        else if (turn >= 9) {
            results.showModal();
            resultText.textContent = "It's a tie!";
            removeClickableGrid();
            gameNotification.textContent = '';
            return;
        }

        if (activePlayerNumber === 1) {
            activePlayerNumber = 2;
            activePlayerName = player2Name;
        }
        else {
            activePlayerNumber = 1;
            activePlayerName = player1Name;
        }

        gameNotification.textContent = `Player ${activePlayerNumber} (${activePlayerName}) turn`;
    }

    const registerPlayerNames = (event) => {
        event.preventDefault();

        const player1Input = document.getElementById("player-one-name");
        const player2Input = document.getElementById("player-two-name");

        player1Name = player1Input.value;
        player2Name = player2Input.value;

        player1Input.value = '';
        player2Input.value = '';

        gameNotification.textContent = `Player 1 (${player1Name}) turn`;

        nameForm.close();
    }

    const startNewGame = () => {

        activePlayerNumber = 1;
        activePlayerName = player1Name;
        turn = 0;

        gameController.getGameboard().resetBoard();
        updateBoard();

        results.close();

        nameForm.showModal();

        const form = document.querySelector("form");
        form.addEventListener("submit", registerPlayerNames);

        gameGrid.addEventListener("click", playTurn);

        newGameButton.addEventListener("click", startNewGame);
    }

    return {
        startNewGame
    }
})();

displayController.startNewGame()