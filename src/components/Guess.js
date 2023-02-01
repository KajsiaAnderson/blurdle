import React from 'react'
import { FiSearch } from 'react-icons/fi'

const Guess = () => {
    return (
        <div className='guess-section'>
            <div className='guess'>
                <FiSearch className='search' color="#444" size="1.25rem" />
                <input type="text" placeholder="Know it? Enter your guess here" />
            </div>
            <div className='guess-btns'>
                <button className='skip-btn'>Skip</button>
                <button className='submit-btn'>Submit</button>
            </div>
        </div>
    )
}

export default Guess