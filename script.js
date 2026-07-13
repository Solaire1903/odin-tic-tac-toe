const gameController = (() => {

    const gameboard = (() => {

        const boardArray = [
            ['', '', ''],
            ['', '', ''],
            ['', '', ''],
        ];

        const getBoardArray = () => boardArray;

        const getCell = (row, column) => boardArray[row][column];

        return {
            getBoardArray,
            getCell
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

    const getPlayers = () => [player1, player2];

    const getGameBoard = () => gameboard;

    const debugTest = () => { }

    return {
        debugTest
    }
})();

gameController.debugTest();