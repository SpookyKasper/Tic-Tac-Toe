const Board = (function () {
  let gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

  const resetBoard = () => {
    gameBoard[0] = [1, 2, 3]
    gameBoard[1] = [4, 5, 6]
    gameBoard[2] = [7, 8, 9]
    return gameBoard
  }
  const isNumber = (value) => Number.isFinite(value)
  const logBoard = () => console.table(gameBoard)
  const getFlatBoard = () => gameBoard.flat()
  const numExistsInBoard = (num) => getFlatBoard().includes(num)
  const convertNumToCell = (num) => {
    let rowIndex = gameBoard.findIndex(row => row.includes(num))
    let colIndex = gameBoard[rowIndex].indexOf(num)
    return [rowIndex, colIndex]
  }
  const transposeBoard = () => {
    let firstCol = []
    let secondCol = []
    let thirdCol = []
    for (let row of gameBoard) {
      firstCol.push(row[0])
      secondCol.push(row[1])
      thirdCol.push(row[2])
    }
    return [firstCol, secondCol, thirdCol]
  }
  const getDiagonals = () => {
    let firstDiago = []
    let secondDiago = []
    let supIndex = 2
    for (let i = 0; i < 3; i++) {
      firstDiago.push(gameBoard[i][i])
      secondDiago.push(gameBoard[i][supIndex])
      supIndex--
    }
    return [firstDiago, secondDiago]
  }

  const convertToStrings = (matrix) => matrix.map(array => array.join(''))

  const getRowsToStrings = () => convertToStrings(gameBoard)
  const getColsToStrings = () => convertToStrings(transposeBoard())
  const getDiagonalsToStrings = () => convertToStrings(getDiagonals())
  const getAllPossibleTrios = () => [getRowsToStrings(), getColsToStrings(), getDiagonalsToStrings()].flat()
  // The following methods are not necessary anymore as writeToCell already do their job
  // const isFree = (cell) => isNumber(getCellValue(cell))
  // const getCellValue = (cell) => gameBoard[cell[0]][cell[1]]

  const isFull = () => getFlatBoard().every(value => !isNumber(value))
  const writeToCell = (num, marker) => {
    if (!numExistsInBoard(num)) {
      console.log('Not an available cell')
      return
    }

    const [row, col] = convertNumToCell(num)
    return gameBoard[row][col] = marker
  }

  return { gameBoard, isFull, writeToCell, logBoard, getAllPossibleTrios, resetBoard};
})();


