import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import Guess from './Guess'
import Blur from "react-blur"

const List = () => {
    const { currAttempt } = useContext(AppContext)
    const [blur, setBlur] = useState(14)

    useEffect(() => {
        if (currAttempt.attempt === 0) {
            setBlur(14)
        } else if (currAttempt.attempt === 1) {
            setBlur(11)
        } else if (currAttempt.attempt === 2) {
            setBlur(8)
        } else if (currAttempt.attempt === 3) {
            setBlur(5)
        } else if (currAttempt.attempt === 4) {
            setBlur(2)
        } else {
            setBlur(0)
        }
    }, [currAttempt])

    return (
        <div className='guess-list'>
            {" "}
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
            <div className='img'>
                <Blur img="https://filmschoolrejects.com/wp-content/uploads/2020/05/inception-top.jpg" alt="movie scene" blurRadius={blur} />
            </div>
        </div>
    )
}

export default List