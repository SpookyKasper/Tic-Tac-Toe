const Board = (function () {
  let gameBoard = [
    [1, 2, 3],
    [4, 5, 6],
    [7, 8, 9]
  ];

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

  return { isFull, writeToCell, logBoard, getAllPossibleTrios};
})();

const createPlayer = (name, marker) => {
  return { name, marker }
}

const createGame = (numPlayers, board) => {
  const players = []
  let turns = 0
  const askName = (num) => prompt(`Hello player ${num} what is your name?`)
  const askMove = (player) => prompt(`Hello ${player.name} where would you like to play ? (type a cell number)`)

  const setPlayersNames = () => {
    for (let i = 1; i < numPlayers + 1; i++) {
      // Making a temporary faster version
      // players.push(createPlayer(askName(i)))
      players.push(createPlayer(`player${i}`))
    }
  }

  const setPlayersMarkers = () => {
    players[0].marker = 'X'
    players[1].marker = 'O'
  }

  const logInitialInfo = () => {
    [player1, player2] = players
    console.log(`
                 Hello ${player1.name} and ${player2.name} :) Ready for rumble ?
                 ${player1.name} you'll be playing first and with the ${player1.marker} marker,
                 whereas you ${player2.name} will be playing with the ${player2.marker} marker. Let's Go!`)
  }

  const initializeGame = () => {
    setPlayersNames()
    setPlayersMarkers()
    logInitialInfo()
    board.logBoard()
  }

  const isWinner = (player) => {
    const winningPattern = player.marker.repeat(3)
    return board.getAllPossibleTrios().some(trio => trio === winningPattern)
  }

  const winner = () => players.find(player => isWinner(player))

  const getDuePlayer = () => {
    [player1, player2] = players
    return turns % 2 === 0 ? player1 : player2
  }

  const playTurn = () => {
    let currentPlayer = getDuePlayer()
    let move = askMove(currentPlayer)
    if (!board.writeToCell(+move, currentPlayer.marker)) {
      return
    }

    turns++
  }

  const gameLoop = () => {
    initializeGame()
    while(!winner()){
      board.logBoard()
      playTurn()
    }
    board.logBoard()
  }

  return { gameLoop }
}

const myGame = createGame(2, Board)
myGame.gameLoop()


