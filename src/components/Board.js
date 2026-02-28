import React from 'react'

import Square from './Square'
import { Linear } from '../utils/Numbers'

export default function Board(props) {
    function renderSquare(i, idx) {
        const cmp = (props.win) ? props.win.find(a => a === i) : false
        return (
            <Square
                key={idx}
                value={props.squares[i]}
                onClick={() => props.onClick(i)}
                isWin={cmp}
                isCrash={props.isCrash}
            />
        )
    }

    function renderBoardRow(element, idx) {
        return (
            <div key={idx} className="board-row">
                {element.map((item, index) => renderSquare(item, index))}
            </div>
        )
    }

    return (
        <div>
            {Linear.map((item, index) =>
                renderBoardRow([item[0], item[1], item[2]], index)
            )}
        </div>
    )
}