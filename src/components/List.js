import React from 'react'
import Guess from './Guess'

const List = () => {

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
            <div>
                <img src="https://filmschoolrejects.com/wp-content/uploads/2020/05/inception-top.jpg" alt="movie scene" />
            </div>
        </div>
    )
}

export default List