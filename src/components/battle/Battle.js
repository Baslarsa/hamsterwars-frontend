import React, { useState } from 'react';
import './battle.css';
import Fighters from './Fighters';
import BattleResult from './BattleResult';

const CustomBattle = (props) => {

    const [hamsterOne, setHamsterOne] = useState([])
    const [hamsterTwo, setHamsterTwo] = useState([])
    const [isHamstersSet, setIsHamstersSet] = useState(false);
    const [winningHamster, setWinningHamster] = useState("");
    const [losingHamster, setLosingHamster] = useState("");
    const [showPopUp, setShowPopUp] = useState(false);

    async function setHamsters() {
        const url = 'http://localhost:4000/api/hamsters/random';

        const getRandomHamsterOne = await fetch(url, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            }
        });
        let jsonHamsterOne = await getRandomHamsterOne.json();

        const getRandomHamsterTwo = await fetch(url, {
            headers: {
                authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
            }
        });
        let jsonHamsterTwo = await getRandomHamsterTwo.json();

        setHamsterOne(jsonHamsterOne)
        setHamsterTwo(jsonHamsterTwo)


        setIsHamstersSet(true)
    }
    function popUp() {
        setShowPopUp(true);
        setTimeout(setShowPopUp, 5000);
    }
    async function handleVoteClick(winner, loser) {
        let winnerUrl = `http://localhost:4000/api/hamsters/${winner.id}/win`
        let loserUrl = `http://localhost:4000/api/hamsters/${loser.id}/defeat`
        //Update Hamsters DB
        let postGameUrl = "http://localhost:4000/api/games/";

        let post = await fetch(postGameUrl,
            {
                method: 'POST',
                headers: new Headers({
                    'Content-Type': 'application/json',
                    'authorization': 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
                }),
                body: JSON.stringify(
                    {
                        contestants: [winner, loser],
                        winner: winner
                    }
                )
            })

        const content = await post.json()

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
        //Update recent games

        setWinningHamster(winner)
        setLosingHamster(loser)
        setHamsters();
        popUp();
    }

    return (
        <>
            <button onClick={setHamsters}>Randomize a battle</button>
            {
                winningHamster && showPopUp
                    ? <BattleResult winner={winningHamster} loser={losingHamster} />
                    : ""
            }

            {
                isHamstersSet
                    ?
                    <div className="battle-cage">
                        <div className="battle-corner">
                            <button className="vote-button" onClick={() => handleVoteClick(hamsterOne, hamsterTwo)}>Vote for {hamsterOne.name}</button>
                            <Fighters
                                class="fighter"
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
                                class="fighter"
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