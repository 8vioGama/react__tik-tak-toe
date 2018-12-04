import React, { Component } from "react";
import Square from "./Square";

class Board extends Component {
  renderSquare(i) {
    let isAvailable = typeof this.props.squares[i] === "number";
    let value = isAvailable ? "" : this.props.squares[i];
    let background = this.props.winningCombination.includes(i) ? 'blue' : '';

    return (
      <Square
        value={value}
        turnClick={() => this.props.turnClick(i)}
        background={background}
      />
    );
  }
  
  render() {
    return (
      <div className="game__board">
        <div className="board__row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board__row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board__row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}

export default Board;