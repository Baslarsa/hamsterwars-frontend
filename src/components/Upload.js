import React, { useState } from 'react'
import './../App.css'

const Upload = () => {
    const [name, setName] = useState("")
    const [age, setAge] = useState("")
    const [loves, setLoves] = useState("")
    const [favFood, setFavFood] = useState("")
    const [imgSrc, setImgSrc] = useState("")

    const [nameTouched, setNameTouched] = useState(false);
    const [ageTouched, setAgeTouched] = useState(false);

    const stopSubmit = event => {
        event.preventDefault();
    }

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

        fetch("/api/hamsters", requestOptions)
            .then(response => response.text())
            .then(result => console.log(result))
            .catch(error => console.log('error', error));
    }
    let [nameClass, nameError] = nameTouched
        ? isValidName(name)
        : ['', ''];
    let [ageClass, ageError] = ageTouched
        ? isValidAge(age)
        : ['', ''];
    return (
        <div className="wrapper">
            <form onSubmit={stopSubmit} className="upload-form">
                <h1> Upload new hamster </h1>
                <label>Name</label>
                <input onChange={e => { setName(e.target.value) }}
                    placeholder="Hamster name."
                    type="text"
                    onBlur={() => setNameTouched(true)}
                    className={nameClass}></input>
                <div className="error">{nameError}</div>
                <label>Age</label>
                <input onChange={e => { setAge(e.target.value) }}
                    placeholder="Hamster age." type="number"
                    onBlur={() => setAgeTouched(true)}
                    className={ageClass}></input>
                <div className="error">{ageError}</div>
                <label>Loves</label>
                <input onChange={e => { setLoves(e.target.value) }} type="text" placeholder="What does it love?"></input>
                <label>Favorite food</label>
                <input onChange={e => { setFavFood(e.target.value) }} type="text" placeholder="What is it's favorite food?"></input>
                <label>Profile pic</label>
                <input type="file" onChange={e => { setImgSrc(e.target.value) }}></input>
                <button disabled={nameError || ageError} onClick={handleUpload}>Submit new hamster</button>
            </form>
        </div>
    )
}

function isValidName(name) {
    if (String(name) !== '') {
        return ['valid', ''];
    } else {
        return ['invalid', 'Please enter a name']
    }
}
function isValidAge(age) {
    let validAge = typeof (Number(age)) === "number"
        && Number(age) < 100;
    if (validAge) {
        return ['valid', ''];
    } else {
        return ['invalid', "Please enter age"]
    }
}
export default Upload