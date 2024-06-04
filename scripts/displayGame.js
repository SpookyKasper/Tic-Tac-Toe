const displayGame = (function (game, board) {

  const mainEl = document.querySelector('main')
  const infoEl = document.createElement('div')

  const initialDisplay = () => {
    infoEl.className = 'info-box'
    infoEl.textContent = game.initializeGame()
    mainEl.appendChild(infoEl)
  }

  const addReplayBtn = () => {
    const replayBtn = document.createElement('button')
    replayBtn.className = 'replay-button'
    replayBtn.classList.add('hidden')
    replayBtn.textContent = 'Replay'
    replayBtn.addEventListener('click', function() {
      infoEl.textContent = 'Back to it!'
      game.restartGame()
      cleanBoard()
      this.classList.toggle('hidden')
    })
    mainEl.appendChild(replayBtn)
  }

  const cleanBoard = () => {
    const gameCells = document.querySelectorAll('.square')
    gameCells.forEach((cell) => {
      cell.textContent = ''
      cell.classList.remove('played')
    })
  }

  const addGameToDOM = () => {
    initialDisplay()
    const boardElement = createBoardEl()
    populateBoardWithCells(boardElement)
    mainEl.appendChild(boardElement)
    addReplayBtn()
  }

  const populateBoardWithCells = (boardElement) => {
    board.gameBoard.flat().forEach((el) => {
      const gameCellEl = createCellEl(el)
      boardElement.appendChild(gameCellEl)
    })
  }

  const createCellEl = (el) => {
    const cellEl = createBoardSquare()
    cellEl.dataset.cellNum = el
    addFunctionalityToCellEl(cellEl)
    return cellEl
  }

  const addFunctionalityToCellEl = (cellEl) => {
    cellEl.addEventListener('click', () => {
      const cellNum = cellEl.dataset.cellNum
      cellEl.classList.add('played')
      cellEl.textContent = game.playTurn(+cellNum)
      if (game.winner() || board.isFull()){
        infoEl.textContent = game.endOfGame()
        document.querySelector('.board').classList.add('played')
        document.querySelector('.replay-button').classList.remove('hidden')
      }
    })
  }

  const createBoardEl = () => {
    const boardEl = document.createElement('div')
    boardEl.className = 'board'
    return boardEl
  }

  const createBoardSquare = () => {
    const squareEl = document.createElement('div')
    squareEl.className = 'square'
    return squareEl
  }

  return { addGameToDOM };
})(createGame(2, Board), Board);


displayGame.addGameToDOM()
