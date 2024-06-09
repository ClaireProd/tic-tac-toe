class TicTacToe {

  board = document.getElementById('board');
  cases = document.getElementsByClassName('case');
  score = document.getElementById('score');
  currentPlayer = 'X';
  boardState = ['', '', '', '', '', '', '', '', ''];
  gameEnded = true;

  start() {
    this.gameEnded = false;
    this.boardState = ['', '', '', '', '', '', '', '', ''];
    this.currentPlayer = 'X';
    this.score.innerHTML = `<p>Player ${this.currentPlayer} turn</p>`;
    console.log(this.cases);

    for (let i = 0; i < this.cases.length; i++) {
      this.cases[i].addEventListener('click', () => {
        this.play(this.cases[i]);
      });
    }

    document.getElementById('restart').addEventListener('click', () => {
      this.start();
      for (let i = 0; i < this.cases.length; i++) {
        this.cases[i].innerHTML = '';
      }
    });
  }

  play(element) {
    if (this.gameEnded) {
      return;
    }

    const index = element.id;
    if (this.boardState[index] !== '') {
      return;
    }

    this.boardState[index] = this.currentPlayer === 'X' ? 1 : -1;



    element.innerHTML = this.currentPlayer === 'X' ? this.iconX : this.iconO;


    if (this.checkWin()) {
      this.gameEnded = true;
      this.score.innerHTML = `<p>Player ${this.currentPlayer} wins!</p>
      <small>Restart with button (Ctrl + r)</small>`;
      return;
    }

    if (this.checkDraw()) {
      this.gameEnded = true;
      this.score.innerHTML = `<p>Draw!</p>`;
      return;
    }
    
    this.score.innerHTML = `<p>Player ${this.currentPlayer === 'X' ? 'O' : 'X'} turn</p>`;
    this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X';
  }

  checkWin() {
    const winningCombinations = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // columns
      [0, 4, 8], [2, 4, 6] // diagonals
    ];

    for (const combination of winningCombinations) {
      const [a, b, c] = combination;

      const sum = this.boardState[a] + this.boardState[b] + this.boardState[c];
      if (sum === 3 || sum === -3) {
        return true;
      }
    }

    return false;
  }

  checkDraw() {
    return this.boardState.filter(cell => cell === '').length === 0;
  }

  get iconX() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 384 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M342.6 150.6c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L192 210.7 86.6 105.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3L146.7 256 41.4 361.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L192 301.3 297.4 406.6c12.5 12.5 32.8 12.5 45.3 0s12.5-32.8 0-45.3L237.3 256 342.6 150.6z"/></svg>`;
  }

  get iconO() {
    return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><!--!Font Awesome Free 6.5.2 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2024 Fonticons, Inc.--><path fill="white" d="M464 256A208 208 0 1 0 48 256a208 208 0 1 0 416 0zM0 256a256 256 0 1 1 512 0A256 256 0 1 1 0 256z"/></svg>`;
  }
}

function main() {
  // Create a new game
  const game = new TicTacToe();
  game.start();
}

main();