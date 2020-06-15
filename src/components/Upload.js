import React, { useState } from 'react'
import './../App.css'

const Upload = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [loves, setLoves] = useState("")
    const [favFood, setFavFood] = useState("")
    const [imgSrc, setImgSrc] = useState("")

    const handleUpload = () => {
        var myHeaders = new Headers();
        myHeaders.append("Authorization", "AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs");
        myHeaders.append("Content-Type", "application/json");

        var raw = JSON.stringify({ "name": name, "age": age, "loves": loves, "favFood": favFood, "imgName": imgSrc });

        var requestOptions = {
            method: 'POST',
            headers: myHeaders,
            body: raw,
            redirect: 'follow'
        };

        fetch("http://localhost:4000/api/hamsters", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    return (
        <div className="wrapper">
            <div className="upload-form">
                <h1> Upload new hamster </h1>
                <label>Name</label>
                <input onChange={e => { setName(e.target.value) }} placeholder="Hamster name." type="text"></input>
                <label>Age</label>
                <input onChange={e => { setAge(e.target.value) }} placeholder="Hamster age." type="number"></input>
                <label>Loves</label>
                <input onChange={e => { setLoves(e.target.value) }} type="text" placeholder="What does it love?"></input>
                <label>Favorite food</label>
                <input onChange={e => { setFavFood(e.target.value) }} type="text" placeholder="What is it's favorite food?"></input>
                <label>Profile pic</label>
                <input type="file" onChange={e => { setImgSrc(e.target.value) }}></input>
                <button onClick={handleUpload}>Submit new hamster</button>
            </div>
        </div>
    )
}


export default Upload