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

        return {
            getBoardArray,
            getCell,
            cellIsEmpty
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

    const debugTest = () => {
        console.log(gameboard.cellIsEmpty(1, 1));
        player1.placeMark(1, 1);
        console.log(gameboard.cellIsEmpty(1, 1));
    }

    return {
        debugTest
    }
})();

gameController.debugTest();