import React, { useState, useEffect } from 'react'

const Number = ({ number, label }) => (
    <div>
        <div className='number'>{number}</div>
        <div className='label'>{label}</div>
    </div>
)

const GuessDistributionBox = ({ position, amount, percentage }) => {
    return (
        <div className='guess-distribution'>
            <div className='guess-position'>{position}</div>
            <div style={
                {
                    padding: 5,
                    marginBottom: 5,
                    backgroundColor: 'gray',
                    width: `${percentage}%`,
                    minWidth: 10
                }
            }>{amount}</div>
        </div>
    )
}

const GuessDistribution = ({distribution}) => {
    if (!distribution) {
        return null;
    }
    const sum = distribution.reduce((total, dist) => dist + total, 0)
    return (
        <div>
            <div className='distribution'>GUESS DISTRIBUTION</div>
            {distribution.map((dist, index) => (
                <GuessDistributionBox position={index + 1} amount={dist} percentage={dist / sum * 100} />
            ))}
        </div>
    )
}

const EndScreen = ({ won = false, board }) => {
    const [secondsTilTomorrow, setSecondsTilTomorrow] = useState(0)
    const [played, setPlayed] = useState(0)
    const [winRate, setWinRate] = useState(0)
    const [curStreak, setCurStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)
    const [distribution, setDistribution] = useState(null)

    useEffect(() => {
        readState()
    }, [])

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

            setSecondsTilTomorrow((tomorrow - now) / 1000)
        }

        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    const share = () => {
        // const textMap = board.map((row, i) =>
        // row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join(""))
        // .filter((row) => row)
        // .join("\n")
        // const textToShare = `Blurdle \n${textMap}`
        // Clipboard.setString(textToShare)
        // alert("Copied successfully", "Share your score on your social media")
    }

    const readState = () => {
        const dataString = localStorage.getItem('game')
        let data;
        try {
            data = JSON.parse(dataString)
        } catch (e) {
            console.log('error')
        }
        const keys = Object.keys(data)
        const values = Object.values(data)

        setPlayed(keys.length)

        const numberOfWins = values.filter(game => game.gameState === 'won').length
        setWinRate(Math.floor(100 * numberOfWins / keys.length))

        let curStreak = 0
        let maxStreak = 0
        let prevDay = 0
        keys.forEach(key => {
            const day = parseInt(key.split('-')[1])
            if (data[key].gameState === 'won' && curStreak === 0) {
                curStreak += 1
            } else if (data[key].gameState === 'won' && prevDay + 1 === day) {
                curStreak += 1
            } else {
                curStreak = data[key].gameState === 'won' ? 1 : 0
            }

            if (curStreak > maxStreak) {
                maxStreak = curStreak
            }

            prevDay = day
        })
        setCurStreak(curStreak)
        setMaxStreak(maxStreak)


        const dist = [0, 0, 0, 0, 0, 0]

        values.map(game => {
            if (game.gameState === 'won') {
                // const tries = game.board.filter((board) => board[0]).length
                const tries = game.currAttempt.attempt - 1
                dist[tries] = dist[tries] + 1
            }
        })
        setDistribution(dist)
    }

    const formatSeconds = () => {
        const hours = Math.floor(secondsTilTomorrow / (60 * 60)).toString().padStart(2, '0')
        const minutes = Math.floor(secondsTilTomorrow % (60 * 60) / 60).toString().padStart(2, '0')
        const seconds = Math.floor(secondsTilTomorrow % 60).toString().padStart(2, '0')
        return `${hours}:${minutes}:${seconds}`
    }

    return (
        <div>
            <div className='completed'>
                {won ? "You won!" : "Sorry, try again tomorrow."}
            </div>
            <div className='stats'>
                STATISTICS
            </div>
            <div className='stat-numbers'>
                <Number number={played} label={"Played"} />
                <Number number={winRate} label={"Win %"} />
                <Number number={curStreak} label={"Current Streak"} />
                <Number number={maxStreak} label={"Max Streak"} />
            </div>
            <GuessDistribution distribution={distribution} />
            <div className='next-game'>
                <div>
                    <div>Next Blurdle</div>
                    <div className='time'>{formatSeconds()}</div>
                </div>
                <button className='share-btn' onClick={share}>Share</button>
            </div>
        </div>
    )
}

export default EndScreen