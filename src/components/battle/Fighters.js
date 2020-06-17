import React, { useEffect, useState } from 'react';
import './battle.css'



const Fighter = (props) => {
    const [imgUrl, setImgUrl] = useState("");

    useEffect(() => {
        const abortController = new AbortController();
        const signal = abortController.signal;
        let url = `/api/assets/${props.imgName}`
        let headers = {
            headers: {
                authorization: "AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs"
            },
            signal: signal
        }
        const loadImg = async () => {

            await fetch(url, headers)
                .then(response => response.blob())
                .then(images =>
                    setImgUrl(URL.createObjectURL(images)
                    ))
        }
        loadImg()

        return function cleanup() {
            abortController.abort()
        }
    }, [props])

    return (
        <article className={props.class}>
            <img alt="hamster" src={imgUrl} />
            <div className="text-box">
                <p><span className="bold">Name:</span> {props.name}</p>
                <p><span className="bold">Age:</span> {props.age}</p>
                <p><span className="bold">Likes to:</span> {props.loves}</p>
                <p><span className="bold">Favorite food:</span> {props.favFood}</p>
            </div>
        </article >
    )
}


export default Fighter