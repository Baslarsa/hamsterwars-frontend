import React, { useState, useEffect } from 'react';
import Fighter from './battle/Fighters'
import './battle/battle.css'

let Hamsters = () => {
    const [hamstersFromDb, setHamstersFromDb] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function getHamsters() {
            let url = 'http://localhost:4000/api/hamsters/'
            let hamsterData = await fetch(url, {
                headers: {
                    authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
                }
            })
            let jsonHamsterData = await hamsterData.json()
            setHamstersFromDb(jsonHamsterData)
            setIsLoaded(true)
        }
        getHamsters()
    }, [])

    function renderHamsters() {
        let hamsters = hamstersFromDb
        let objects = []
        for (let hamster of hamsters) {
            objects.push(
                <Fighter
                    key={hamster.id}
                    name={hamster.name}
                    age={hamster.age}
                    imgName={hamster.imgName}
                    loves={hamster.loves}
                    favFood={hamster.favFood}
                    id={hamster.id}
                    class="hamsterCard"
                />
            )
        }
        return objects
    }
    return (
        <div className="wrapper">
            <div >
                <h1>Check out all the sweet hamsterz on this page!</h1>
                <div className="wallOfFame">
                    {
                        isLoaded
                            ? renderHamsters()
                            : "Loading"
                    }
                </div>
            </div>
        </div>
    )
}



export default Hamsters;