import React, { Component } from "react";

class Square extends Component {
  render() {
    return (
      <button className={"board__square " + (this.props.background)} onClick={this.props.turnClick}>
      {this.props.value}
      </button>
    )
  }
}

export default Square;