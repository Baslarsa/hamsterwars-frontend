import React, { useEffect, useState } from 'react';
import './charts.css'
import ChartCard from './ChartCard'

let Charts = () => {

    const [topList, setTopList] = useState([])
    const [bottomList, setBottomList] = useState([])
    useEffect(() => {
        async function getTopBottomFive() {
            let topUrl = 'http://localhost:4000/charts/top'
            let bottomUrl = 'http://localhost:4000/charts/bottom'

            const getTopFive = await fetch(topUrl, {
                method: "GET",
                headers: {
                    authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
                }
            })
            const jsonTopFive = await getTopFive.json()
            const getBottomFive = await fetch(bottomUrl, {
                method: "GET",
                headers: {
                    authorization: 'AIzaSyAHFQEHkjdigK1SGrYLAxpKNiEG4j9pmKs'
                }
            })
            const jsonBottomFive = await getBottomFive.json()

            setTopList(jsonTopFive)
            setBottomList(jsonBottomFive)
        }
        getTopBottomFive()
    }, [])

    function renderTopFive() {

        let topHamsters = topList
        let hamsterToRend = []
        let position = 1
        for (let hamster of topHamsters) {
            hamsterToRend.push(
                <ChartCard
                    position={position}
                    key={hamster.id}
                    name={hamster.name}
                    imgName={hamster.imgName}
                    leaderBoard="Wins"
                    id={hamster.id}
                    stat={hamster.wins}
                    class="chartCardTop"
                />
            )
            position++
        }
        return hamsterToRend
    }
    function renderBottomFive() {

        let bottomHamsters = bottomList
        let hamsterToRend = []
        let position = 1
        for (let hamster of bottomHamsters) {
            hamsterToRend.push(
                <ChartCard
                    position={position}
                    key={hamster.id}
                    name={hamster.name}
                    imgName={hamster.imgName}
                    id={hamster.id}
                    leaderBoard="Defeats"
                    stat={hamster.defeats}
                    class="chartCardTop"
                    class="chartCardBottom"
                />
            )
            position++
        }
        return hamsterToRend
    }

    return (
        <div className="chartsWrapper">
            <div className="topList">
                <h1>Top-List</h1>
                {renderTopFive()}
            </div>
            <div className="bottomList">
                <h1>Bottom-List</h1>
                {renderBottomFive()}
            </div>
        </div>
    )
}



export default Charts;