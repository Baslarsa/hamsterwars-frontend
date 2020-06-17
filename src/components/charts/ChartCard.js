import React, { useEffect, useState } from 'react';
import './charts.css'



const Fighter = (props) => {
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        let url = `http://localhost:4000/api/assets/${props.imgName}`
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
        <article key={props.id} className={props.class}>
            <p>{props.position}</p>
            <img alt="hamster" src={imgUrl} />
            <p>Name:</p>
            <h2>{props.name}</h2>
            <p>{props.leaderBoard}</p>
            <h1>{props.stat}</h1>
        </article >
    )


}


export default Fighter