import React, { useEffect, useState } from 'react';
import './battle.css'



const Fighter = (props) => {
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        let url = `http://localhost:4000/assets/${props.imgName}`
        let headers = {
            headers: {
                authorization: "AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs"
            }
        }
        const loadImg = async () => {
            await fetch(url, headers)
                .then(response => response.blob())
                .then(images =>
                    setImgUrl(URL.createObjectURL(images)
                    ))
        }
        loadImg()
    }, [props])

    return (
        <article className={props.class}>
            <img alt="hamster" src={imgUrl} />
            <p>Name: {props.name}</p>
            <p>Age: {props.age}</p>
            <p>Likes to: {props.loves}</p>
            <p>Favorite food: {props.favFood}</p>
        </article >
    )


}


export default Fighter