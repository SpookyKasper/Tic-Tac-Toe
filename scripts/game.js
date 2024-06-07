const createGame = (numPlayers, board) => {
  const players = []
  let turns = 0

  const createPlayers = () => {
    for (let i = 1; i < numPlayers + 1; i++) {
      players.push(createPlayer(`Player ${i}`))
    }
  }

  const setPlayersNames = (first, second) => {
    [player1, player2] = players
    if (first) player1.name = first
    if (second) player2.name = second
  }

  const setPlayersMarkers = () => {
    players[0].marker = 'X'
    players[1].marker = 'O'
  }

  const startOfGameMessage = () => {
    [player1, player2] = players
    let initialInfo = `Hello ${player1.name} and ${player2.name} :) Ready for rumble ?
      ${player1.name} you'll be playing first and with the ${player1.marker} marker,
      whereas you ${player2.name} will be playing with the ${player2.marker} marker. Let's Go!`
    return initialInfo
  }

  const initializeGame = () => {
    createPlayers()
    setPlayersMarkers()
  }

  const isWinner = (player) => {
    const winningPattern = player.marker.repeat(3)
    return board.getAllPossibleTrios().some(trio => trio === winningPattern)
  }

  const winner = () => players.find(player => isWinner(player))
  const getDuePlayer = () => turns % 2 === 0 ? players[0]: players[1]
  const nextPlayer = (currentP) => currentP === players[0] ? players[1] : players[0]

  const playTurn = (move) => {
    let duePlayer = getDuePlayer()
    let currentMarker = duePlayer.marker
    if (!board.writeToCell(move, currentMarker)) {
      return
    }
    turns++
    return duePlayer
  }

  const endOfGame = () => {
    let gameWinner = winner()
    if (gameWinner) {
      return `Congratulations ${gameWinner.name}! you won this game :)`
    }

    return `It's a draw this time!`
  }

  const restartGame = function() {
    this.turns = 0
    this.board = board.resetBoard()
  }

  return { startOfGameMessage, setPlayersNames, initializeGame, playTurn, getDuePlayer, winner, endOfGame, restartGame }
}
