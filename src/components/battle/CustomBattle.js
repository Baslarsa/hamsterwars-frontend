import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom'
import './battle.css';
import Fighters from './Fighters';
import BattleResult from './BattleResult';

const Battle = () => {

    const [hamsterOne, setHamsterOne] = useState([])
    const [hamsterTwo, setHamsterTwo] = useState([])
    const [winningHamster, setWinningHamster] = useState("");

    const { id1, id2 } = useParams();

    useEffect(() => {
        console.log("hje")
        setHamsters();
    }, [])
    async function setHamsters() {
        const url1 = `http://localhost:4000/hamsters/${id1}`;
        const url2 = `http://localhost:4000/hamsters/${id2}`;

        const getHamsterOne = await fetch(url1, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            }
        });
        let jsonHamsterOne = await getHamsterOne.json();

        const getHamsterTwo = await fetch(url2, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            }
        });
        let jsonHamsterTwo = await getHamsterTwo.json();

        setHamsterOne(jsonHamsterOne[0])
        setHamsterTwo(jsonHamsterTwo[0])

    }

    async function handleVoteClick(winner, loser) {
        let winnerUrl = `http://localhost:4000/hamsters/${winner.id}/win`
        let loserUrl = `http://localhost:4000/hamsters/${loser.id}/defeat`

        let updateWinnerDb = await fetch(winnerUrl, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            },
            method: 'PUT'
        })
        let resWinnerJson = await updateWinnerDb.json()

        let updateLoserDb = await fetch(loserUrl, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            },
            method: 'PUT'
        })
        let resLoserJson = await updateLoserDb.json()
        setWinningHamster(winner.name)
        setHamsters();
        console.log(resWinnerJson, resLoserJson)
    }

    return (
        <>
            {
                winningHamster
                    ? <BattleResult name={winningHamster} />
                    : ""
            }

            <div className="battle-cage">
                <div className="battle-corner">
                    <button className="vote-button" onClick={() => handleVoteClick(hamsterOne, hamsterTwo)}>Vote for {hamsterOne.name}</button>
                    <Fighters
                        name={hamsterOne.name}
                        age={hamsterOne.age}
                        imgName={hamsterOne.imgName}
                        loves={hamsterOne.loves}
                        favFood={hamsterOne.favFood}
                        id={hamsterOne.id}
                    />
                </div>
                <h1>VS</h1>
                <div className="battle-corner">
                    <button className="vote-button" onClick={() => handleVoteClick(hamsterTwo, hamsterOne)}>Vote for {hamsterTwo.name}</button>
                    <Fighters
                        name={hamsterTwo.name}
                        age={hamsterTwo.age}
                        imgName={hamsterTwo.imgName}
                        loves={hamsterTwo.loves}
                        favFood={hamsterTwo.favFood}
                        id={hamsterTwo.id} />
                </div>
            </div>
            <p>Let's get ready to fight!</p>

        </>
    );
}

export default Battle;