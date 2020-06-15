import React from 'react';
import './battleResult.css';

const BattleResult = (props) => {
    let winner = props.winner
    let loser = props.loser
    return (
        <>
            <div className="result-box">
                <h2>Previous Game</h2>
                <p>Fighters</p>
                <h2>{winner.name} VS {loser.name}</h2>
                <p>Winner</p>
                <h1>{winner.name}</h1>
            </div>
        </>
    )

}




export default BattleResult;