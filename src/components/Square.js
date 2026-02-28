import React from 'react'

const Square = props => {
    const stylee = (props.isCrash)
        ? 'squareWhithoutWinner'
        : ((props.isWin) ? 'squareWinner' : 'square')
        
    return (
        <button className={stylee} onClick={() => props.onClick()}>
            {props.value}
        </button>
    )
}

export default Square