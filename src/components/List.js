import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import Guess from './Guess'

const List = () => {
    const { currAttempt, movie } = useContext(AppContext)
    const [blur, setBlur] = useState('')

    useEffect(() => {
        if (currAttempt.attempt === 0) {
            setBlur("blurOne")
        } else if (currAttempt.attempt === 1) {
            setBlur("blurTwo")
        } else if (currAttempt.attempt === 2) {
            setBlur("blurThree")
        } else if (currAttempt.attempt === 3) {
            setBlur("blurFour")
        } else if (currAttempt.attempt === 4) {
            setBlur("blurFive")
        } else {
            setBlur("blurSix")
        }
    }, [currAttempt])

    return (
        <div className='guess-list'>
            {" "}
            <div className='img'>
                <img src={`https://image.tmdb.org/t/p/w500${movie.backdrop_path}`} alt="movie scene" className={blur} />
            </div>
            <div className='guess-box'>
                <Guess attempt={0} />
            </div>
            <div className='guess-box'>
                <Guess attempt={1} />
            </div>
            <div className='guess-box'>
                <Guess attempt={2} />
            </div>
            <div className='guess-box'>
                <Guess attempt={3} />
            </div>
            <div className='guess-box'>
                <Guess attempt={4} />
            </div>
            <div className='guess-box'>
                <Guess attempt={5} />
            </div>
        </div>
    )
}

export default List