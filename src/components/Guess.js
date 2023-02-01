import React, {useContext} from 'react'
import { AppContext } from '../App'

const Guess = ({attempt}) => {
    const {board} = useContext(AppContext)
    const guess = board[attempt]

    return (
        <div className='guess-section' >
            {guess}
        </div>
    )
}

export default Guess