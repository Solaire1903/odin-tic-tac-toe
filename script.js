const gameboard = (() => {

    const board = [
        ['', '', ''],
        ['', '', ''],
        ['', '', ''],
    ];

    const getBoard = () => board;

    const getCell = (row, column) => board[row][column];

    return {
        getBoard,
        getCell
    };
})();

function createPlayer(number, mark) {

    const getNumber = () => number;

    const getMark = () => mark;

    return {
        getNumber,
        getMark
    }
}