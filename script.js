const gameController = (() => {

    function createPlayer(number, mark) {

        const getNumber = () => number;

        const getMark = () => mark;

        return {
            getNumber,
            getMark
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

    return {
        getPlayers,
        getGameBoard
    }
})();