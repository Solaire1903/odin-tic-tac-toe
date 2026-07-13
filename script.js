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