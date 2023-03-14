import React, { useContext, useState, useEffect } from 'react'
import { AppContext } from '../App'
import Guess from './Guess'
// import Blur from "react-blur"

const List = () => {
    const { currAttempt } = useContext(AppContext)
    const [blur, setBlur] = useState(14)

    useEffect(() => {
        if (currAttempt.attempt === 0) {
            setBlur(40)
        } else if (currAttempt.attempt === 1) {
            setBlur(18)
        } else if (currAttempt.attempt === 2) {
            setBlur(14)
        } else if (currAttempt.attempt === 3) {
            setBlur(10)
        } else if (currAttempt.attempt === 4) {
            setBlur(6)
        } else {
            setBlur(2)
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
                {/* <Blur img="https://filmschoolrejects.com/wp-content/uploads/2020/05/inception-top.jpg" alt="movie scene" blurRadius={blur} /> */}
                {/* <Blur img="https://hips.hearstapps.com/digitalspyuk.cdnds.net/12/28/movies_dark_knight_christian_bale_heath_ledger.jpg" alt="movie scene" blurRadius={blur} /> */}
                {/* <Blur img="https://www.gannett-cdn.com/-mm-/94572ad71c1c554abae670ec7bd4871e2898e3b2/c=0-142-3000-1837/local/-/media/2015/10/21/USATODAY/USATODAY/635809824922215243-AP-BACK-TO-THE-FUTURE-DAY-76890712.JPG?width=3000&height=1695&fit=crop&format=pjpg&auto=webp" alt="movie scene" blurRadius={blur} /> */}
            </div>
        </div>
    )
}

export default List