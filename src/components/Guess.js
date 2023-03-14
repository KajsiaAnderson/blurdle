import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../App'
import { getDayOfTheYear } from '../Movies'

const Guess = ({ attempt }) => {
    // localStorage.removeItem('game')
    const { board, correctMovie, currAttempt, setBoard, setCurrAttempt, gameState, setGameState } = useContext(AppContext)
    const guess = [...board[attempt]]

    const correct = correctMovie === guess.join('')
    const skipped = guess.join('') === 'skipped'

    const wrongOrRight = currAttempt.attempt > attempt && (correct ? "correct" : skipped ? "skipped" : "error")
    //------------//

    const [loaded, setLoaded] = useState(false)

    const dayOfTheYear = getDayOfTheYear()
    const dayKey = `day-${dayOfTheYear}`

    useEffect(() => {
        if (loaded) {
            persistState()
        }
    }, [board, currAttempt, gameState])

    useEffect(() => {
        readState()
    }, [])

    const persistState = () => {
        const dataForToday = {
            board,
            currAttempt,
            gameState
        }

        try {
            const existingStateString = localStorage.getItem('game')
            const existingState = existingStateString ? JSON.parse(existingStateString) : {};

            existingState[dayKey] = dataForToday
            const dataString = JSON.stringify(existingState)
            localStorage.setItem('game', dataString)
        } catch (e) {
            console.log('error', e)
        }
    }
    const readState = () => {
        const dataString = localStorage.getItem('game')
        try {
            const data = JSON.parse(dataString)
            const day = data[dayKey]
            setBoard(day.board)
            setCurrAttempt(day.currAttempt)
            setGameState(day.gameState)
        } catch (e) {
            console.log('error')
        }

        setLoaded(true)
    }


    return (
        <div className='guess-section' id={wrongOrRight}>
            {guess}
        </div>
    )
}

export default Guess