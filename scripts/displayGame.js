const displayGame = (function (game, board) {

  const addBoardToDOM = () => {
    const boardEl = document.createElement('div')
    boardEl.className = 'board'
    board.gameBoard.flat().forEach((el) => {
      const gameCellEl = createBoardSquare()
      gameCellEl.textContent = el
      boardEl.appendChild(gameCellEl)
    })
    const mainEl = document.querySelector('main')
    mainEl.appendChild(boardEl)
  }

  const createBoardSquare = () => {
    const squareEl = document.createElement('div')
    squareEl.className = 'square'
    return squareEl
  }

  return { addBoardToDOM };
})(createGame(2, Board), Board);


displayGame.addBoardToDOM()
