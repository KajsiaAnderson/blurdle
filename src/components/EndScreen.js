import React from 'react'

const Number = ({number, label}) => (
    <div>
        <div className='number'>{number}</div>
        <div className='label'>{label}</div>
    </div>
)

const GuessDistributionBox = ({position, amount, percentage}) => {
    return (
        <div className='guess-distribution'>
            <div className='guess-position'>{position}</div>
            <div style={
                {padding: 5,
                marginBottom: 5,
                backgroundColor: 'gray',
                width: `${percentage}%`}
            }>{amount}</div>
        </div>
    )
}

const GuessDistribution = () => {
    return (
        <div>
            <div className='distribution'>GUESS DISTRIBUTION</div>
             <GuessDistributionBox position={1} amount={2} percentage={70} />
             <GuessDistributionBox position={2} amount={2} percentage={50} />
             <GuessDistributionBox position={3} amount={2} percentage={5} />
             <GuessDistributionBox position={4} amount={2} percentage={0} />
             <GuessDistributionBox position={5} amount={2} percentage={0} />
             <GuessDistributionBox position={6} amount={2} percentage={0} />
        </div>
    )
}

const EndScreen = ({ won = false }) => {
    const share = () => {

    }

    return (
        <div>
            <div className='completed'>
                {won ? "You won!" : "Sorry, try again tomorrow."}
            </div>
            <div className='stats'>
                STATISTICS
            </div>
            <div className='stat-numbers'>
                <Number number={2} label={"Played"} />
                <Number number={2} label={"Win %"} />
                <Number number={2} label={"Current Streak"} />
                <Number number={2} label={"Max Streak"} />
            </div>
            <GuessDistribution />
            <div>
                <div>
                    <div>Next Blurdle</div>
                    <div>10:35:00</div>
                </div>
                <button onClick={share}>Share</button>
            </div>
        </div>
    )
}

export default EndScreen