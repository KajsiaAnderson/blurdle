import React, {useContext, useRef} from 'react'
import { FiSearch } from 'react-icons/fi'
import { AppContext } from '../App'


const Submit = () => {
    const inputRef = useRef()
    const {board, setBoard, currAttempt, setCurrAttempt} = useContext(AppContext)

    const checkRef = (e) => {
        e.preventDefault()
        if (currAttempt.attempt > 5) return;
        if (inputRef.current.value === '') return;

        const newBoard = [...board]
        newBoard[currAttempt.attempt] = inputRef.current.value
        setBoard(newBoard)
        setCurrAttempt({...currAttempt, attempt: currAttempt.attempt + 1})
        console.log('newBoard', newBoard)
        inputRef.current.value = ''
        inputRef.current.focus()
    }

    const skipHandler = (e) => {
        e.preventDefault()
        if (currAttempt.attempt > 5) return;

        const newBoard = [...board]
        newBoard[currAttempt.attempt] = 'skipped'
        setBoard(newBoard)
        setCurrAttempt({...currAttempt, attempt: currAttempt.attempt + 1})
        console.log('skipBoard', newBoard)
        inputRef.current.value = ''
        inputRef.current.focus()
    }

    return (
        <form className='guess-section' onSubmit={checkRef}>
            <div className='guess'>
                <FiSearch className='search' color="#444" size="1.25rem" />
                <input type="text" placeholder="Know it? Enter your guess here" ref={inputRef}/>
            </div>
            <div className='guess-btns'>
                <button className='skip-btn' type='button' onClick={skipHandler}>Skip</button>
                <button className='submit-btn' type='submit'>Submit</button>
            </div>
        </form>
    )
}

export default Submit