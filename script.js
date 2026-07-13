const gameController = (() => {

    const gameboard = (() => {

        const boardArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];

        const getBoardArray = () => boardArray;

        const getCell = (row, column) => boardArray[row][column];

        const cellIsEmpty = (row, column) => boardArray[row][column] === '';

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

        const placeMark = (row, column) => {
            gameboard.getBoardArray()[row][column] = mark;
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

    const playGame = () => {
        let activePlayer;

        for (let turn = 0; turn < 9; ++turn) {
            if (turn % 2 === 0) {
                activePlayer = player1;
            }
            else {
                activePlayer = player2;
            }

            console.log(`Player ${activePlayer.getNumber()} turn`);
            activePlayer.placeMark(1, 1);
            printBoard();
            const winner = gameboard.checkForWinner();
            if (winner !== "No winner found") {
                console.log(`${winner} won the game!`);
                return;
            }
        }

        console.log("It's a tie!");
    }

    return {
        playGame
    }
})();

gameController.playGame();