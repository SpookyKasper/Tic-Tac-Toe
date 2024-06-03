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

  const playGame = () => {
    initializeGame()
    gameLoop()
    board.logBoard()
  }

  const endOfGame = () => {
    let gameWinner = winner()
    if (gameWinner) {
      console.log(`Congratulations ${gameWinner.name}! you won this game :)`)
      return
    }
    console.log(`It's a draw this time!`)
  }

  const gameLoop = () => {
    while(!winner() && !board.isFull()){
      board.logBoard()
      playTurn()
    }
    board.logBoard()
    endOfGame()
  }

  return { playGame }
}
