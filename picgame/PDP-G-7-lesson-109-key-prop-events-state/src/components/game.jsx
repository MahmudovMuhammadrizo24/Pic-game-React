import React, { Component } from 'react';
import dice1 from "../assets/1.png";
import dice2 from "../assets/2.png";
import dice3 from "../assets/3.png";
import dice4 from "../assets/4.png";
import dice5 from "../assets/5.png";
import dice6 from "../assets/6.png";
import "./game.scss";

class GameComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedDice: "",
            player1Score: 0,
            player2Score: 0,
            player1Point: 0,
            player2Point: 0,
            activClass: "active",
            currentPlayer: 1,
            player1: '',
            player2: '',
        };
    }
    componentDidMount() {
        const playerName = prompt("Enter your name:");
        const playerName2 = prompt("Enter your name:");
        if (playerName) {
            this.setState({ player1: playerName });
            this.setState({ player2: playerName2 });
        }
    }
    /*
        handelWinner = () => {
            const { player1Score, player2Score } = this.state;
            if (player1Score >= 100) {
                alert(`Winner ${this.state.player1} 🥱`);
                this.handleNewGame();
            } else if (player2Score >= 100) {
                alert(`Winner ${this.state.player2} 🥱`);
                this.handleNewGame();
            }
        }*/
    /*
    handleDice = () => {
        const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
        const rand = Math.floor(Math.random() * dices.length);
        const selectedDice = dices[rand];
        if (this.state.currentPlayer === 1) {
            this.setState((prevState) => ({
                selectedDice,
                player1Point: rand !== 0 ? prevState.player1Point + rand + 1 : 0,
                currentPlayer: rand !== 0 ? prevState.currentPlayer : 2
            }));
        } else {
            this.setState((prevState) => ({
                selectedDice,
                player2Point: rand !== 0 ? prevState.player2Point + rand + 1 : 0,
                currentPlayer: rand !== 0 ? prevState.currentPlayer : 1
            }));
        }
    };*/
    handleDice = () => {
        const { currentPlayer } = this.state;
        const dices = [dice1, dice2, dice3, dice4, dice5, dice6];
        const rand = Math.floor(Math.random() * dices.length);
        const selectedDice = dices[rand];

        this.setState((prevState) => ({
            selectedDice,
            player1Point: currentPlayer === 1 ? (rand !== 0 ? prevState.player1Point + rand + 1 : 0) : prevState.player1Point,
            player2Point: currentPlayer === 2 ? (rand !== 0 ? prevState.player2Point + rand + 1 : 0) : prevState.player2Point,
            currentPlayer: rand !== 0 ? prevState.currentPlayer : currentPlayer === 1 ? 2 : 1
        }), this.handleWinner);
    };
    handleNewGame = () =>
        this.setState({
            player1Score: 0,
            player2Score: 0,
            selectedDice: "",
            player1Point: 0,
            player2Point: 0,
            currentPlayer: 1
        });
    /*
        handleHold = () => {
            if (this.state.currentPlayer === 1) {
                this.setState((prevState) => ({
                    player1Score: prevState.player1Score + prevState.player1Point,
                    player1Point: 0,
                    currentPlayer: 2,
                    selectedDice: ""
                }));
            } else {
                this.setState((prevState) => ({
                    player2Score: prevState.player2Score + prevState.player2Point,
                    player2Point: 0,
                    currentPlayer: 1,
                    selectedDice: ""
                }));
            }
        };*/
    handleHold = () => {
        const { currentPlayer, player1Point, player2Point } = this.state;

        this.setState((prevState) => ({
            player1Score: currentPlayer === 1 ? prevState.player1Score + player1Point : prevState.player1Score,
            player2Score: currentPlayer === 2 ? prevState.player2Score + player2Point : prevState.player2Score,
            player1Point: currentPlayer === 1 ? 0 : player1Point,
            player2Point: currentPlayer === 2 ? 0 : player2Point,
            currentPlayer: currentPlayer === 1 ? 2 : 1,
            selectedDice: ""
        }), this.handleWinner);
    };

    handleWinner = () => {
        const { player1Score, player2Score } = this.state;
        if (player1Score >= 100) {
            alert(`Winner ${this.state.player1} 🥱`);

            this.handleNewGame();
        } else if (player2Score >= 100) {
            alert(`Winner ${this.state.player2} 🥱`);
            this.handleNewGame();
        }
    };



    render() {
        const {
            selectedDice,
            player1Score,
            player2Score,
            player1Point,
            player2Point,
            activClass,
            currentPlayer,
            player1,
            player2
        } = this.state;
        return (
            <div className="container">
                <div className="main">
                    <img src={selectedDice} className="image dice" alt="" />
                    <div className="center">
                        <div className="new-game-btn btn--new" onClick={this.handleNewGame}> 🔄 NEW GAME </div>
                        <div className="center-bottom">
                            <div className="roll-btn btn--roll" onClick={this.handleDice}> 🎲 ROOL DICE </div>
                            <div className="hold-btn btn--hold" onClick={this.handleHold} >📥 Hold</div>
                        </div>
                    </div>
                    <div className={`main-left players ${currentPlayer === 1 ? activClass : ""}`}>
                        <div>
                            <div className="player-name">{player1}</div>
                            <div className="player-score">{player1Score}</div>
                        </div>
                        <div className="board">
                            <div className="current">Current</div>
                            <div className="point">{player1Point}</div>
                        </div>
                    </div>
                    <div className={`main-right players ${currentPlayer === 2 ? activClass : ""}`}>
                        <div>
                            <div className="player-name">{player2}</div>
                            <div className="player-score">{player2Score}</div>
                        </div>
                        <div className="board">
                            <div className="current">Current</div>
                            <div className="point">{player2Point}</div>
                        </div>
                    </div>
                </div>
            </div>
        );

    }
}

export default GameComponent;
