const Board = (function () {
  let gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const getCellValue = (cell) => gameBoard[cell[0]][cell[1]]
  const isNumber = (value) => Number.isFinite(value)
  const getFlatBoard = () => gameBoard.flat()

  const isFree = (cell) => isNumber(getCellValue(cell))
  const isFull = () => getFlatBoard().every(value => !isNumber(value))

  return { isFree, isFull };
})();

console.log(Board)
