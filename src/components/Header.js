import React, {useState} from 'react'
import { AiOutlineInfoCircle, AiOutlineQuestionCircle, AiOutlinePlayCircle } from 'react-icons/ai'
import { FiBarChart2 } from 'react-icons/fi'
import About from './modals/About'
// import Stats from './modals/Stats'
import HowToPlay from './modals/HowToPlay'

const Header = () => {
    const [aboutModal, setAboutModal] = useState(false)
    const [statsModal, setStatsModal] = useState(false)
    const [howToPlayModal, setHowToPlayModal] = useState(false)


    return (
        <div className='header'>
            <nav>
                <button className='headerBtn' >
                    <AiOutlinePlayCircle size="1.5rem" color="#ffffff" />
                </button>
                <button className='headerBtn' onClick={() => setAboutModal(true)}>
                    <AiOutlineInfoCircle size="1.5rem" color="#ffffff" />
                </button>
                <About open={aboutModal} onClose={() => setAboutModal(false)}/>
                <h1>Blurdle</h1>
                <button className='headerBtn' onClick={() => setStatsModal(true)}>
                    <FiBarChart2 size="1.5rem" color="#ffffff" />
                </button>
                {/* <Stats open={statsModal} onClose={() => setStatsModal(false)}/> */}
                <button className='headerBtn' onClick={() => setHowToPlayModal(true)}>
                    <AiOutlineQuestionCircle size="1.5rem" color="#ffffff" />
                </button>
                <HowToPlay open={howToPlayModal} onClose={() => setHowToPlayModal(false)}/>
            </nav>
        </div>
    )
}

export default Header


