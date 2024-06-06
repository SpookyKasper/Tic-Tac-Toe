const displayGame = (function (game, board) {

  const mainEl = document.querySelector('main')
  const infoEl = document.createElement('div')
  const boardEl = document.createElement('div')
  const replayBtnEl = document.createElement('button')
  const gameInfoEl = document.createElement('div')
  const currentPlayerNameTextEl = document.createElement('p')
  const currentPlayerMarkerTextEl = document.createElement('p')
  gameInfoEl.appendChild(currentPlayerNameTextEl)
  gameInfoEl.appendChild(currentPlayerMarkerTextEl)

  const displayNextPlayer = (currentPlayer) => {
    [first, second] = game.players
    nextPlayer = currentPlayer === first ? second : first
    currentPlayerNameTextEl.textContent = `Current Player: ${nextPlayer.name}`
    currentPlayerMarkerTextEl.textContent = `Marker: ${nextPlayer.marker}`
  }

  const toggleHidden = (el) => {
    el.classList.toggle('hidden')
  }

  const getUserNames = () => {
    const dialogEl = document.querySelector('dialog')
    const confirmBtnEl = document.getElementById('confirmBtn')
    const firstPlayerName = document.getElementById('first-player-name')
    const secondPlayerName = document.getElementById('second-player-name')
    confirmBtnEl.addEventListener('click', () => {
      game.setPlayersNames(firstPlayerName.value, secondPlayerName.value)
      setUpInfoBoxEl()
      displayNextPlayer(game.players[1])
    })
    dialogEl.addEventListener('close', () => {
      setUpInfoBoxEl()
    })
    dialogEl.showModal()
  }

  const setUpInfoBoxEl = () => {
    infoEl.className = 'info-box'
    infoEl.textContent = game.logInitialInfo()
    return infoEl
  }

  const createBoardEl = () => {
    boardEl.className = 'board'
    return boardEl
  }

  const createBoardCellEl = (el) => {
    const cellEl = document.createElement('div')
    cellEl.className = 'cell'
    cellEl.dataset.cellNum = el
    addFunctionalityToCellEl(cellEl)
    return cellEl
  }

  const createReplayBtnEl = () => {
    replayBtnEl.classList.add('replay-button', 'hidden')
    replayBtnEl.textContent = 'Replay'
    replayBtnEl.addEventListener('click',() => {
      game.restartGame()
      cleanBoard()
    })
    return replayBtnEl
  }

  const cleanBoard = () => {
    boardEl.classList.remove('played')
    toggleHidden(infoEl)
    toggleHidden(replayBtnEl)
    const gameCells = document.querySelectorAll('.cell')
    gameCells.forEach((cell) => {
      cell.textContent = ''
      cell.classList.remove('played')
    })
  }

  const addGameToDOM = () => {
    game.initializeGame()
    getUserNames()
    let boardElement = createBoardEl()
    let replayBtnEl = createReplayBtnEl()
    populateBoardWithCells(boardElement)
    mainEl.appendChild(infoEl)
    mainEl.appendChild(boardElement)
    mainEl.appendChild(gameInfoEl)
    mainEl.appendChild(replayBtnEl)
  }

  const populateBoardWithCells = (boardElement) => {
    board.gameBoard.flat().forEach((el) => {
      const gameCellEl = createBoardCellEl(el)
      boardElement.appendChild(gameCellEl)
    })
  }

  const addFunctionalityToCellEl = (cellEl) => {
    cellEl.addEventListener('click', () => {
      const cellNum = cellEl.dataset.cellNum
      const currentPlayer = game.playTurn(+cellNum)
      displayNextPlayer(currentPlayer)
      cellEl.textContent = currentPlayer.marker
      cellEl.classList.add('played')
      infoEl.classList.add('hidden')
      replayBtnEl.classList.add('hidden')
      if (game.winner() || board.isFull()){
        infoEl.classList.remove('hidden')
        infoEl.textContent = game.endOfGame()
        toggleHidden(replayBtnEl)
        document.querySelector('.board').classList.add('played')
      }
    })
  }

  return { addGameToDOM };
})(createGame(2, Board), Board);


displayGame.addGameToDOM()
