const displayGame = (function (game, board) {

  const mainEl = document.querySelector('main')
  const infoEl = document.createElement('div')
  const boardEl = document.createElement('div')
  const replayBtnEl = document.createElement('button')

  const toggleHidden = (el) => {
    el.classList.toggle('hidden')
  }

  const setUpInfoBoxEl = () => {
    infoEl.className = 'info-box'
    infoEl.textContent = game.initializeGame()
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
    let infoElement = setUpInfoBoxEl()
    let boardElement = createBoardEl()
    let replayBtnEl = createReplayBtnEl()
    populateBoardWithCells(boardElement)
    mainEl.appendChild(infoElement)
    mainEl.appendChild(boardElement)
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
      cellEl.classList.add('played')
      cellEl.textContent = game.playTurn(+cellNum)
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
