import React from 'react'
import { IoMdClose } from 'react-icons/io'
import { TbMovie, TbThumbUp, TbPlayerSkipForward } from 'react-icons/tb'

const HowToPlay = ({ open, onClose }) => {
    if (!open) return null

    return (
        <div onClick={onClose} className='overlay'>
            <div onClick={(e) => { e.stopPropagation() }} className='modalContainer'>
                <button onClick={onClose} className='closeBtn'><IoMdClose /></button>
                <h4 className='title'>How To Play</h4>
                <div className='how-to-play'>
                    <div className='how-section'>
                        <TbMovie className='how-to-icon' size="2rem" color="#888888"/>
                        <span>Look at the image, then find the correct movie title in the list.</span>
                    </div>
                    <div className='how-section'>
                        <TbPlayerSkipForward className='how-to-icon' size="2rem" color="#888888"/>
                        <span>Skipped or incorrect attempts unblur more of the image.</span>
                    </div>
                    <div className='how-section'>
                        <TbThumbUp className='how-to-icon' size="2rem" color="#888888"/>
                        <span>Answer in as few tries as possible and share your score!</span>
                    </div>
                    <button onClick={onClose} className='play-btn'>Play</button>
                </div>
            </div>
        </div>
    )
}

export default HowToPlay