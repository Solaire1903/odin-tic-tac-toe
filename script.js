const gameController = (() => {

    function createPlayer(number, mark) {

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

    const printBoard = () => {
        for (let row of gameboard.getBoardArray()) {
            console.log(row);
        }
    };

    const getPlayers = () => [player1, player2];

    const getGameBoard = () => gameboard;

    const debugTest = () => {
        player1.placeMark(1, 1);
        player2.placeMark(2, 1);
        player1.placeMark(0, 1);
        player2.placeMark(0, 0);

        console.log(printBoard());
    }

    return {
        getPlayers,
        getGameBoard,
        debugTest
    }
})();

gameController.debugTest();