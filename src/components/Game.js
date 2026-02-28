import React from 'react'

import Board from './Board'
import { Winner as winner_ } from '../utils/Numbers'

export default class Game extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            history: [{
                squares: Array(9).fill(null),
            }],
            xIsNext: true,
            stepNumber: 0,
        }
    }

    calculateWinner(squares) {
        const lines = winner_
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i]
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return { squares: squares[a], win: lines[i] }
            }
        }
        return { squares: null, win: null }
    }

    nextPlayer(next) { return next ? 'X' : '0' }

    handleClick(i) {
        const history = this.state.history.slice(0, this.state.stepNumber + 1)
        const current = history[history.length - 1]
        const squares = [...current.squares]
        // const squares = current.squares.slice();

        if (this.calculateWinner(squares).squares || squares[i]) { return; }

        squares[i] = this.nextPlayer(this.state.xIsNext)

        this.setState({
            history: history.concat([{
                squares: squares,
            }]),
            xIsNext: !this.state.xIsNext,
            stepNumber: history.length,
        });
    }

    jumpTo(step) {
        this.setState({
            stepNumber: step,
            xIsNext: (step % 2) === 0,
        })
    }

    render() {
        const history = this.state.history;
        const current = history[this.state.stepNumber]
        const winner = this.calculateWinner(current.squares).squares

        const moves = history.map((step, move) => {
            const desc = move ? `Go to move# ${move}` : `Go to game start`
            return (
                <li key={move}>
                    <button onClick={() => this.jumpTo(move)}>{desc}</button>
                </li>
            )
        })

        const status = (winner)
            ? `Winner: ${winner}`
            : `Next player: ${this.nextPlayer(this.state.xIsNext)}`

        const gameCrash =
            !(this.calculateWinner(current.squares).win)
            && this.state.history.length === 10
            && this.state.stepNumber === 9

        return (
            <div>
                <h1>TIC-TAC-TOE</h1>
                <div className="game" >
                    <div className="game-board">
                        <Board
                            squares={current.squares}
                            onClick={(i) => this.handleClick(i)}
                            win={this.calculateWinner(current.squares).win}
                            isCrash={gameCrash}
                        />
                    </div>
                    <div className="game-info">
                        <div>{status}</div>
                        <ol>{moves}</ol>
                    </div>
                </div>
            </div>
        )
    }
}