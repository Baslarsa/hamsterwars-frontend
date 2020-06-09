import React from 'react';

let start = () => {
    return (
        <>
            <div className="main-container">
                <h1>Welcome to the infamous HamsterWars</h1>
                <p>Together we will find out which of the hamsters that's the cutest.... Or ugliest, you decide!</p>
            </div>
            <div className="leader-frame">
                <h2>Currently cutest hamster!</h2>
                <p>Name: HAMSTER</p>
                <p>Votes: </p>
                <p>Win percentage: </p>
                <img src="#" alt="leadinghamster"></img>
            </div>
        </>
    )
}

export default start;