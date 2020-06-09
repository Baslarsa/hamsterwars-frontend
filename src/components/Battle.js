import React, { useState, useEffect } from 'react';
import './battle.css';

const Battle = () => {
    const url = 'http://localhost:4000/hamsters';

    const [data, setData] = useState([])
    const [isLoaded, setIsLoaded] = useState(false);
    useEffect(() => {
        async function fetchData() {
            const response = await fetch(url, {
                headers: {
                    authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
                }
            });
            setData(await response.json())
        }
        fetchData()
        setIsLoaded(true)
    }, [])
    console.log(data)
    return (
        <>
            <div className="description">
                <h1>Battle</h1>
                <p>Pick the one you think's the cutest!</p>
            </div>
            <section className="battle-canvas">
                <article className="contestant">
                    <img src="#" alt="hamster-contestant-one" />
                    <h2>Name: </h2>
                    <p>Likes:  </p>
                </article>

                <article className="contestant">
                    <img src="#" alt="hamster-contestant-two" />
                    <h2>Name: </h2>
                    <p>Likes:  </p>
                </article>

            </section>
        </>
    );
}

export default Battle;