const displayGame = (function (game, board) {

  const mainEl = document.querySelector('main')
  const infoEl = document.createElement('div')

  const initialDisplay = () => {
    infoEl.className = 'info-box'
    infoEl.textContent = game.initializeGame()
    mainEl.appendChild(infoEl)
  }

  const addBoardToDOM = () => {
    initialDisplay()
    const boardElement = createBoardEl()
    populateBoardWithCells(boardElement)
    mainEl.appendChild(boardElement)
  }

  const populateBoardWithCells = (boardElement) => {
    board.gameBoard.flat().forEach((el) => {
      const gameCellEl = createCellEl(el)
      boardElement.appendChild(gameCellEl)
    })
  }

  const createCellEl = (el) => {
    const cellEl = createBoardSquare()
    cellEl.textContent = el
    addFunctionalityToCellEl(cellEl)
    return cellEl
  }

  const addFunctionalityToCellEl = (cellEl) => {
    cellEl.addEventListener('click', () => {
      const cellNum = cellEl.textContent
      cellEl.classList.add('played')
      cellEl.textContent = game.playTurn(+cellNum)
      if (game.winner() || board.isFull()){
        infoEl.textContent = game.endOfGame()
        document.querySelector('.board').classList.add('played')
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

  return { addBoardToDOM };
})(createGame(2, Board), Board);


displayGame.addBoardToDOM()
