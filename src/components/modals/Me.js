import React from 'react'
import {IoMdClose} from 'react-icons/io'

const Me = ({ open, onClose }) => {
    if (!open) return null

  return (
    <div onClick={onClose} className='overlay'>
    <div onClick={(e) => {e.stopPropagation()}} className='modalContainer'>
      <button onClick={onClose} className='closeBtn'><IoMdClose /></button>
      <p className='content'>Hi, I'm Kajsia and I am a front end developer! </p>
    </div>
  </div>
  )
}

export default Me