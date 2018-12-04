import React, { Component } from "react";
import Board from "./Board";

class Game extends Component {
  constructor(props) {
    super(props);
    this.state = {
      boards: Array.from(Array(9).keys()),
      winningCombinations: [
        [0, 1, 2],
        [3, 4, 5],
        [6, 7, 8],
        [0, 3, 6],
        [1, 4, 7],
        [2, 5, 8],
        [0, 4, 8],
        [6, 4, 2]
      ],
      winningCombination: [],
      stepNumber: 0,
      winner: ""
    }
    this.restartGame = this.restartGame.bind(this)
    this.turnClick = this.turnClick.bind(this)
    this.turn = this.turn.bind(this)
    this.checkWin = this.checkWin.bind(this)
    this.gameOver = this.gameOver.bind(this)
    this.declareWinner = this.declareWinner.bind(this)
    this.emptySquares = this.emptySquares.bind(this)
    this.checkTie = this.checkTie.bind(this)
    this.bestSpot = this.bestSpot.bind(this)
    this.minimax = this.minimax.bind(this)

    
  }

  restartGame() {
    this.setState({
      boards: Array.from(Array(9).keys()),
      stepNumber: 0,
      winningCombination: [],
      winner: ""
    });
  }

  turnClick(square) {
    if (typeof this.state.boards[square] == 'number') {
      this.turn(square, "O");
      if (!this.checkTie()) {
        this.turn(this.bestSpot(), "X");
      }
    }
  }

  turn(index, player) {
    if (this.state.winner === "") {
      const boards = this.state.boards;
      const newIndex = this.state.stepNumber + 1;
      boards[index] = player;
  
      this.setState({
        boards: boards,
        stepNumber: newIndex
      });
  
      let gameWon = this.checkWin(boards, player);
      if (gameWon) {
        this.gameOver(gameWon);
        return
      }
    }
  }

  checkWin(board, player) {
    var gameWon = null;
    var newBoard = []
    board.map((element, index) => {
      if (element === player) {
        newBoard.push(index);
      }
    })

    this.state.winningCombinations.forEach( function(win, index) {

      for(var i = 0 , len = win.length; i < len; i++){
        if (newBoard.indexOf(win[i]) == -1) return false;
      }
      gameWon = {index: index, player: player};
      return;
    });
    
    return gameWon
  }

  gameOver(gameWon) {
      // reminder change background on win
      this.setState({
        winningCombination: this.state.winningCombinations[gameWon.index]
      })
      this.declareWinner(gameWon.player)
  }

  declareWinner(player) {
    switch (player) {
      case "tie":
        this.setState({
          winner: "It's a tie!"
        })
        break;
      case "X":
        this.setState({
          winner: "You lost"
        })
        break;
    }
  }

  emptySquares() {
    let currentBoard = this.state.boards;
    return currentBoard.filter(word => typeof word == 'number')
  }

  checkTie() {
    if (this.emptySquares().length === 0) {
      // reminder declare winner visually
      this.declareWinner("tie");
      return true;
    }
    return false;
  }

  bestSpot() {
    let currentBoard = this.state.boards;
    return this.minimax(currentBoard, "X").index;
  }

  minimax(board, player) {
    let availSpots = this.emptySquares();

    if (this.checkWin(board, "O")) {
      return {score: -10};
    } else if (this.checkWin(board, "X")) {
      return {score: 10};
    } else if (availSpots.length === 0) {
      return {score: 0};
    }
    var moves = [];
    for (var i = 0; i < availSpots.length; i++) {
      var move = {};
      move.index = board[availSpots[i]];
      board[availSpots[i]] = player;

      if (player == "X") {
        var result = this.minimax(board, "O");
        move.score = result.score;
      } else {
        var result = this.minimax(board, "X");
        move.score = result.score;
      }

      board[availSpots[i]] = move.index;

      moves.push(move);
    }

    var bestMove;
    if(player === "X") {
      var bestScore = -10000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score > bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    } else {
      var bestScore = 10000;
      for(var i = 0; i < moves.length; i++) {
        if (moves[i].score < bestScore) {
          bestScore = moves[i].score;
          bestMove = i;
        }
      }
    }

    return moves[bestMove];
  }

  render() {
    let board = this.state.boards;

    return (
      <div className="game">
        <Board
          squares={board}
          turnClick={i => this.turnClick(i)}
          winningCombination={this.state.winningCombination}
        />
        <div className={"game__endGame" + (this.state.winner === "" ? "hide" : "")}>
          <div className="endGame__endStatus">{this.state.winner}</div>
        </div>
        <div className="game__restart">
          <button onClick={i => this.restartGame()} className="restart__button">
            Replay
          </button>
        </div>
      </div>
    )
  }
}

export default Game;