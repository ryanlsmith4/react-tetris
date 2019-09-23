import React, { Component } from 'react';
import { connect } from 'react-redux';

class MessagePopup extends Component {
  render() {
    const { gameOver, isRunning } = this.props;
    let message = '';
    let isHidden = 'hidden';
    if(gameOver) {
      message = 'Game Over';
      isHidden = '';
    } else if (!isRunning) {
      message = 'Paused';
      isHidden = '';
    } else {
      message = '???';
    }
    return (
      <div className={`message-popup ${isHidden}`}>
        <h1>{message}</h1>
        <p>Message info...</p>
      </div>
    );
  };
};

const mapStateToProps = (state) => {
  return {
    gameOver: state.game.gameOver,
    isRunning: state.game.isRunning,
  };
};

const mapDispatchToProps = () => {
  return { }
}

export default connect(mapStateToProps, mapDispatchToProps())(MessagePopup);