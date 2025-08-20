const cells = document.querySelectorAll('[data-cell]');
const modal = document.getElementById('resultModal');
const resultMessage = document.getElementById('resultMessage');
const restartBtn = document.getElementById('restartBtn');

let currentPlayer = 'X';
let board = Array(9).fill(null);

const winPatterns = [
  [0,1,2],[3,4,5],[6,7,8],
  [0,3,6],[1,4,7],[2,5,8],
  [0,4,8],[2,4,6]
];

cells.forEach((cell, index) => {
  cell.addEventListener('click', () => handleClick(index, cell), { once: true });
});

restartBtn.addEventListener('click', restartGame);

function handleClick(index, cell) {
  if (board[index]) return;
  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin(currentPlayer)) {
    endGame(`${currentPlayer} Wins!`);
  } else if (board.every(cell => cell)) {
    endGame("It's a Draw!");
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
  }
}

function checkWin(player) {
  return winPatterns.some(pattern => 
    pattern.every(idx => board[idx] === player)
  );
}

function endGame(message) {
  resultMessage.textContent = message;
  modal.style.display = 'flex';
}

function restartGame() {
  board.fill(null);
  currentPlayer = 'X';
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken');
    cell.replaceWith(cell.cloneNode(true)); // reset event listener
  });
  modal.style.display = 'none';
  // Re-bind events
  const newCells = document.querySelectorAll('[data-cell]');
  newCells.forEach((cell, index) => {
    cell.addEventListener('click', () => handleClick(index, cell), { once: true });
  });
}
