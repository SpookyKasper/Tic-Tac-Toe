const displayGame = (function (game, board) {

  const mainEl = document.querySelector('main')
  const infoEl = document.createElement('div')
  const boardEl = document.createElement('div')
  const replayBtnEl = document.createElement('button')

  const getUserNames = () => {
    const dialogEl = document.querySelector('dialog')
    const confirmBtnEl = document.getElementById('confirmBtn')
    const firstPlayerName = document.getElementById('first-player-name')
    const secondPlayerName = document.getElementById('second-player-name')
    confirmBtnEl.addEventListener('click', () => {
      game.setPlayersNames(firstPlayerName.value, secondPlayerName.value)
      setUpInfoBoxEl()
    })
    dialogEl.addEventListener('close', () => {
      setUpInfoBoxEl()
    })
    dialogEl.showModal()
  }

  const setUpInfoBoxEl = () => {
    infoEl.className = 'info-box'
    infoEl.textContent = game.startOfGameMessage()
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

  const populateBoardWithCells = (boardElement) => {
    board.gameBoard.flat().forEach((el) => {
      const gameCellEl = createBoardCellEl(el)
      boardElement.appendChild(gameCellEl)
    })
  }

  const addFunctionalityToCellEl = (cellEl) => {
    addHoverEffect(cellEl)
    handleClickEffect(cellEl)
    cellEl.addEventListener('click', () => {
      handleCellSelection(cellEl)
      if (game.winner() || board.isFull()) handleWin()
    })
  }

  const handleClickEffect = (cellEl) => {
    cellEl.addEventListener('mousedown', () => {
      cellEl.classList.add('scaled')
    })
    cellEl.addEventListener('mouseup', () => {
      cellEl.classList.remove('scaled')
    })
  }

  const handleCellSelection = (cellEl) => {
    const cellNum = cellEl.dataset.cellNum
    const currentP = game.playTurn(+cellNum)
    cellEl.textContent = currentP.marker
    cellEl.classList.add('played')
    infoEl.classList.add('hidden')
    replayBtnEl.classList.add('hidden')
  }

  const handleWin = () => {
    infoEl.classList.remove('hidden')
    infoEl.textContent = game.endOfGame()
    toggleHidden(replayBtnEl)
    document.querySelector('.board').classList.add('played')
  }

  const addHoverEffect = (cell) => {
    const coverEl = document.createElement('div')
    coverEl.className = 'cover'
    coverEl.tabIndex = 0
    cell.appendChild(coverEl)
    coverEl.addEventListener('mouseenter', () => {
      const playingNow = game.getDuePlayer()
      coverEl.textContent = playingNow.marker
    })
    coverEl.addEventListener('mouseleave', () => {
      coverEl.textContent = ""
    })
  }

  const toggleHidden = (el) => {
    el.classList.toggle('hidden')
  }

  const cleanBoard = () => {
    boardEl.classList.remove('played')
    toggleHidden(infoEl)
    toggleHidden(replayBtnEl)
    const gameCells = document.querySelectorAll('.cell')
    gameCells.forEach((cell) => {
      cell.textContent = ''
      addHoverEffect(cell)
      cell.classList.remove('played')
    })
  }

  const launchGame = () => {
    game.initializeGame()
    getUserNames()
    let boardElement = createBoardEl()
    let replayBtnEl = createReplayBtnEl()
    populateBoardWithCells(boardElement)
    mainEl.append(infoEl, boardElement, replayBtnEl)
  }

  return { launchGame };
})(createGame(2, Board), Board);


displayGame.launchGame()
