class TicTacToe {
    constructor() {
      this.currentPlayer = "X";
      this.gameActive = true;
      this.gameState = ["", "", "", "", "", "", "", "", ""];
      this.winningConditions = [
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [2, 4, 6]
      ];
    }
  
    handleCellClick(clickedCellEvent) {
      const clickedCell = clickedCellEvent.target;
      const clickedCellIndex = parseInt(clickedCell.getAttribute("id"));
  
      if (this.gameState[clickedCellIndex] !== "" || !this.gameActive) {
        return;
      }
  
      this.handleCellPlayed(clickedCell, clickedCellIndex);
      this.handleResultValidation();
    }
  
    handleCellPlayed(clickedCell, clickedCellIndex) {
      this.gameState[clickedCellIndex] = this.currentPlayer;
      clickedCell.innerHTML = this.currentPlayer;
    }
  
    handleResultValidation() {
      let roundWon = false;
      for (let i = 0; i < this.winningConditions.length; i++) {
        const winCondition = this.winningConditions[i];
        let a = this.gameState[winCondition[0]];
        let b = this.gameState[winCondition[1]];
        let c = this.gameState[winCondition[2]];
        if (a == "" || b == "" || c == "") {
          continue;
        }
        if (a == b && b == c) {
          roundWon = true;
          break;
        }
      }
  
      if (roundWon) {
        this.gameActive = false;
        this.showGameResult(`${this.currentPlayer} wins!`);
        return;
      }
  
      let roundDraw = !this.gameState.includes("");
      if (roundDraw) {
        this.gameActive = false;
        this.showGameResult("Draw!");
        return;
      }
  
      this.handlePlayerChange();
    }
  
    handlePlayerChange() {
      this.currentPlayer = this.currentPlayer == "X" ? "O" : "X";
    }
  
    showGameResult(message) {
      const messageElement = document.getElementById("message");
      messageElement.innerHTML = message;
    }
  
    restartGame() {
      this.currentPlayer = "X";
      this.gameActive = true;
      this.gameState = ["", "", "", "", "", "", "", "", ""];
      document.querySelectorAll(".cell").forEach(cell => (cell.innerHTML = ""));
      this.showGameResult("");
    }
  }
  
  const ticTacToe = new TicTacToe();
  
  document.querySelectorAll(".cell").forEach(cell => {
    cell.addEventListener("click", event => {
      ticTacToe.handleCellClick(event);
    });
  });
  
  const restartBtn = document.getElementById("restart-btn");
  restartBtn.addEventListener("click", () => {
    ticTacToe.restartGame();
  });