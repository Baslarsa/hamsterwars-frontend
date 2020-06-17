import React, { useEffect, useState } from 'react';
import Fighter from './battle/Fighters'

let Start = () => {
    const [topHamster, setTopHamster] = useState([]);
    useEffect(() => {
        async function getTopHamster() {
            let topUrl = '/api/charts/top'

            const getTopFive = await fetch(topUrl, {
                method: "GET",
                headers: {
                    authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
                }
            })
            const jsonTopFive = await getTopFive.json()
            setTopHamster(jsonTopFive[0])
        }
        getTopHamster();
    }, [])

    return (
        <>
            <div className="main-container">
                <div className="title-box">
                    <h1>Welcome to the infamous HamsterWars</h1>
                    <p>Together we will find out which of the hamsters that's the cutest.... Or ugliest, you decide!</p>
                    <p>Choose from the menu above!</p>
                </div>
                <div className="leader-frame">
                    <h2>Currently cutest hamster</h2>
                    <Fighter
                        name={topHamster.name}
                        age={topHamster.age}
                        imgName={topHamster.imgName}
                        loves={topHamster.loves}
                        favFood={topHamster.favFood}
                        id={topHamster.id}
                        class="startHamster"
                    />
                </div>
            </div>
        </>
    )
}

export default Start;