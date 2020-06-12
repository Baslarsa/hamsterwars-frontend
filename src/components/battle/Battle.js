import React, { useState } from 'react';
import './battle.css';
import Fighters from './Fighters';
import BattleResult from './BattleResult';

const CustomBattle = (props) => {

    const [hamsterOne, setHamsterOne] = useState([])
    const [hamsterTwo, setHamsterTwo] = useState([])
    const [isHamstersSet, setIsHamstersSet] = useState(false);
    const [winningHamster, setWinningHamster] = useState("");

    async function setHamsters() {
        const url = 'http://localhost:4000/hamsters/random';

        const getRandomHamsterOne = await fetch(url, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            }
        });
        let jsonHamsterOne = await getRandomHamsterOne.json();
        console.log(jsonHamsterOne)

        const getRandomHamsterTwo = await fetch(url, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            }
        });
        let jsonHamsterTwo = await getRandomHamsterTwo.json();
        console.log(jsonHamsterTwo)


        setHamsterOne(jsonHamsterOne)
        setHamsterTwo(jsonHamsterTwo)


        setIsHamstersSet(true)
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
            <button onClick={setHamsters}>Randomize a battle</button>
            {
                winningHamster
                    ? <BattleResult name={winningHamster} />
                    : ""
            }

            {
                isHamstersSet
                    ?
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
                    :
                    <p>Let's get ready to fight!</p>
            }
        </>
    );
}

export default CustomBattle;