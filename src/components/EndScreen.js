import React, { useState, useEffect, useCallback } from 'react'
import { colorsToEmoji } from '../colors'
import { CopyToClipboard } from 'react-copy-to-clipboard'

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
                    minWidth: 10,
                    textAlign: 'end'
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
                <GuessDistributionBox key={index} position={index + 1} amount={dist} percentage={dist / sum * 100} />
            ))}
        </div>
    )
}

const EndScreen = ({ won = false, board, correctMovie }) => {
    const [secondsTilTomorrow, setSecondsTilTomorrow] = useState(0)
    const [played, setPlayed] = useState(0)
    const [winRate, setWinRate] = useState(0)
    const [curStreak, setCurStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)
    const [distribution, setDistribution] = useState(null)
    const [copied, setCopied] = useState(false)


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


    const onCopy = useCallback(() => {
        setCopied(true);
    }, [])

    useEffect(() => {
        if(copied === true){
            const timer = setTimeout(() => {
                setCopied(false)
            }, 2000);

            return () => {
                clearTimeout(timer)
            };
        }
    }, [copied])

    const shareBoard = board.map((item) =>
        colorsToEmoji[item === correctMovie ? "#528d4e" : "#444"]).join('')
        // item === correctMovie ? "#528d4e" : item === 'skipped' ? "#444" : item !== "" && !correctMovie ? "#d20000b5" : "#D3D3D4")

    const textToShare = `Blurdle \n${shareBoard}`


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

        values.forEach((game) => {
            if (game.gameState === 'won') {
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
        <div className='overlay-endscreen'>
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
                <CopyToClipboard onCopy={onCopy} text={textToShare}>
                    <button className='share-btn'>Share</button>
                </CopyToClipboard>
            </div>
            <div className="copied">
                {copied ? <span>Copied to clipboard!</span> : null}
             </div>
        </div>
    )
}

export default EndScreen
