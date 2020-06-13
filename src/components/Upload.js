import React from 'react'
import './../App.css'

const Upload = () => {





    return (
        <div className="wrapper">
            <div className="upload-form">
                <h1> Upload new hamster </h1>
                <label>Name</label>
                <input placeholder="Your name." type="text"></input>
                <label>Age</label>
                <input placeholder="Your age." type="number"></input>
                <label>Loves</label>
                <input type="text" placeholder="What does it love?"></input>
                <label>Favorite food</label>
                <input type="text" placeholder="What is it's favorite food?"></input>
                <label>Profile pic</label>
                <input type="file"></input>
                <button>Submit new hamster</button>
            </div>
        </div>
    )
}


export default Upload