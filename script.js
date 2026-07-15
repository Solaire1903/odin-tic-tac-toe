const displayController = (() => {

    const gameController = (() => {

        const gameboard = (() => {

            const boardArray = [
                ['', '', ''],
                ['', '', ''],
                ['', '', ''],
            ];

            const getBoardArray = () => boardArray;

            const getCell = (row, col) => boardArray[row][col];

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

            return {
                getBoardArray,
                getCell,
                cellIsEmpty,
                checkForWinner
            };
        })();

        const createPlayer = (number, mark) => {

            const getNumber = () => number;

            const getMark = () => mark;

            const placeMark = (row, col) => {
                gameboard.getBoardArray()[row][col] = mark;
            };

            return {
                getNumber,
                getMark,
                placeMark
            }
        }

        const player1 = createPlayer(1, 'X');
        const player2 = createPlayer(2, 'O');

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

    const gameGrid = document.querySelector(".game-grid");

    const removeClickableGrid = () => {
        gameGrid.removeEventListener("click", playTurn);
        const gameCells = document.querySelectorAll(".game-cell");
        gameCells.forEach((cell) => cell.style.cursor = "default");
    }

    let player1Name;
    let player2Name;

    let activePlayerNumber = 1;
    let activePlayerName = player1Name;
    let turn = 0;
    const gameNotification = document.querySelector(".game-notification");

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
            results.firstChild.textContent = `Player ${activePlayerNumber} (${activePlayerName}) wins!`;
            removeClickableGrid();
            return;
        }
        else if (turn >= 9) {
            results.showModal();
            results.firstChild.textContent = "It's a tie";
            removeClickableGrid();
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

    const nameForm = document.querySelector(".name-form");
    const results = document.querySelector(".results");

    const registerPlayerNames = (event) => {
        event.preventDefault();

        player1Name = document.getElementById("player-one-name").value;
        player2Name = document.getElementById("player-two-name").value;

        gameNotification.textContent = `Player 1 (${player1Name}) turn`;

        nameForm.close();
    }

    const startNewGame = () => {

        nameForm.showModal();

        const form = document.querySelector("form");
        form.addEventListener("submit", registerPlayerNames);

        gameGrid.addEventListener("click", playTurn);
    }

    const debugTest = () => {
        startNewGame();
    }

    return {
        debugTest
    }
})();

displayController.debugTest()