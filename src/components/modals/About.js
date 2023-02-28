import React from 'react'
import {IoMdClose} from 'react-icons/io'

const About = ({ open, onClose }) => {
  if (!open) return null

  return (
    <div onClick={onClose} className='overlay'>
      <div onClick={(e) => {e.stopPropagation()}} className='modalContainer'>
        <button onClick={onClose} className='closeBtn'><IoMdClose /></button>
        <h4 className='title'>About</h4>
        <p className='content'>Each daily Blurdle features a scene from a popular movie. Guess in as few tries as possible, and be sure to come back every day for a new movie scene.</p>
      </div>
    </div>
  )
}

export default About