const displayGame = (function (game, board) {

  const mainEl = document.querySelector('main')

  const addBoardToDOM = () => {
    const boardElement = createBoardEl()
    populateBoardElement(boardElement)
    mainEl.appendChild(boardElement)
  }

  const populateBoardElement = (boardElement) => {
    board.gameBoard.flat().forEach((el) => {
      const gameCellEl = createBoardSquare()
      gameCellEl.textContent = el
      boardElement.appendChild(gameCellEl)
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
