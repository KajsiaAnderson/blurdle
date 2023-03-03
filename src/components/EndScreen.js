import React, {useState, useEffect} from 'react'

const Number = ({number, label}) => (
    <div>
        <div className='number'>{number}</div>
        <div className='label'>{label}</div>
    </div>
)

const GuessDistributionBox = ({position, amount, percentage}) => {
    return (
        <div className='guess-distribution'>
            <div className='guess-position'>{position}</div>
            <div style={
                {padding: 5,
                marginBottom: 5,
                backgroundColor: 'gray',
                width: `${percentage}%`}
            }>{amount}</div>
        </div>
    )
}

const GuessDistribution = () => {
    return (
        <div>
            <div className='distribution'>GUESS DISTRIBUTION</div>
             <GuessDistributionBox position={1} amount={2} percentage={70} />
             <GuessDistributionBox position={2} amount={2} percentage={50} />
             <GuessDistributionBox position={3} amount={2} percentage={5} />
             <GuessDistributionBox position={4} amount={2} percentage={0} />
             <GuessDistributionBox position={5} amount={2} percentage={0} />
             <GuessDistributionBox position={6} amount={2} percentage={0} />
        </div>
    )
}

const EndScreen = ({ won = false, board }) => {
    const[secondsTilTomorrow, setSecondsTilTomorrow] = useState(0)
    const [played, setPlayed] = useState(0)
    const [winRate, setWinRate] = useState(0)
    const [curStreak, setCurStreak] = useState(0)
    const [maxStreak, setMaxStreak] = useState(0)

    //! useEffect(() => {
    //     readState()
    // }, [])

    const share = () => {
        // const textMap = board.map((row, i) =>
        // row.map((cell, j) => colorsToEmoji[getCellBGColor(i, j)]).join(""))
        // .filter((row) => row)
        // .join("\n")
        // const textToShare = `Blurdle \n${textMap}`
        // Clipboard.setString(textToShare)
        // alert("Copied successfully", "Share your score on your social media")
    }

    useEffect(() => {
        const updateTime = () => {
            const now = new Date()
            const tomorrow = new Date(now.getFullYear(), now.getMonth(), now.getDate() + 1)

            setSecondsTilTomorrow((tomorrow - now) / 1000)
        }

        const interval = setInterval(updateTime, 1000)
        return () => clearInterval(interval)
    }, [])

    //! const readState = () => {
    //     const dataString = localStorage.getItem('game')
    //     let data;
    //     try {
    //         data = JSON.parse(dataString)
    //     } catch (e) {
    //         console.log('error')
    //     }
    //     const keys = Object.keys(data)
    //     const values = Object.values(data)
    //     console.log('keys', keys)
    //     console.log('data', data)
    //     console.log('values', values)

    //     setPlayed(keys.length)

    //     const numberOfWins = values.filter(game => game.gameState === 'won').length
    //     setWinRate(Math.floor(100 * numberOfWins / keys.length))
    // }

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
            <GuessDistribution />
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