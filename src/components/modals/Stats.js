import React from 'react'
import {IoMdClose} from 'react-icons/io'

const Stats = ({ open, onClose }) => {
  if (!open) return null

  return (
    <div onClick={onClose} className='overlay'>
      <div onClick={(e) => {e.stopPropagation()}} className='modalContainer'>
        <button onClick={onClose} className='closeBtn'><IoMdClose /></button>
        <h4 className='title'>Stats</h4>
        <p className='content'>No stats</p>
      </div>
    </div>
  )
}

export default Stats