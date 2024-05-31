const Board = (function () {
  let gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const getCellValue = (cell) => gameBoard[cell[0]][cell[1]]
  const isNumber = (value) => Number.isFinite(value)
  const getFlatBoard = () => gameBoard.flat()
  const numExistsInBoard = (num) => getFlatBoard().includes(num)
  const convertNumToCell = (num) => {
    let rowIndex = gameBoard.findIndex(row => row.includes(num))
    let colIndex = gameBoard[rowIndex].indexOf(num)
    return [rowIndex, colIndex]
  }

  const displayBoard = () => console.log(gameBoard)

  const isFree = (cell) => isNumber(getCellValue(cell))
  const isFull = () => getFlatBoard().every(value => !isNumber(value))
  const writeToCell = (num, marker) => {
    if (!numExistsInBoard(num)) {
      console.log('Not an available cell')
      return
    }

    const [row, col] = convertNumToCell(num)
    gameBoard[row][col] = marker
  }

  return { isFree, isFull, writeToCell, displayBoard };
})();

Board.writeToCell(10, 'X')
Board.writeToCell(3, 'X')
Board.displayBoard()
