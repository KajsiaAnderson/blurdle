import React, { useState, useEffect } from 'react'
import { IoMdClose } from 'react-icons/io'

const Number = ({ number, label }) => (
  <div>
    <div className='number'>{number}</div>
    <div className='label'>{label}</div>
  </div>
)

const GuessDistributionBox = ({ position, amount, percentage }) => {
  return (
    <div className='guess-distribution-stats'>
      <div className='guess-position'>{position}</div>
      <div style={
        {
          padding: 5,
          marginBottom: 5,
          backgroundColor: 'gray',
          width: `${percentage}%`,
          minWidth: 10,
          textAlign: 'end'
        }
      }>{amount}</div>
    </div>
  )
}

const GuessDistribution = ({ distribution }) => {
  if (!distribution) {
    return null;
  }
  const sum = distribution.reduce((total, dist) => dist + total, 0)
  return (
    <div className='distribution-box'>
      <div className='distribution'>GUESS DISTRIBUTION</div>
      {distribution.map((dist, index) => (
        <GuessDistributionBox key={index} position={index + 1} amount={dist} percentage={dist / sum * 100} />
      ))}
    </div>
  )
}

const Stats = ({ open, onClose }) => {
  const [played, setPlayed] = useState(0)
  const [winRate, setWinRate] = useState(0)
  const [curStreak, setCurStreak] = useState(0)
  const [maxStreak, setMaxStreak] = useState(0)
  const [distribution, setDistribution] = useState(null)

  useEffect(() => {
    readState()
  }, [])


  const readState = () => {
    if (localStorage.getItem('game') === null) return
    const dataString = localStorage.getItem('game')
    let data;
    try {
      data = JSON.parse(dataString)
    } catch (e) {
      console.log('error')
    }
    const keys = Object.keys(data)
    const values = Object.values(data)

    const playing = values.filter(game => game.gameState === 'playing').length
    setPlayed(keys.length - playing)

    const numberOfWins = values.filter(game => game.gameState === 'won').length
    setWinRate(Math.floor(100 * numberOfWins / keys.length))

    let curStreak = 0
    let maxStreak = 0
    let prevDay = 0
    keys.forEach(key => {
      const day = parseInt(key.split('-')[1])
      if (data[key].gameState === 'won' && curStreak === 0) {
        curStreak += 1
      } else if (data[key].gameState === 'won' && prevDay + 1 === day) {
        curStreak += 1
      } else {
        curStreak = data[key].gameState === 'won' ? 1 : 0
      }

      if (curStreak > maxStreak) {
        maxStreak = curStreak
      }

      prevDay = day
    })
    setCurStreak(curStreak)
    setMaxStreak(maxStreak)


    const dist = [0, 0, 0, 0, 0, 0]

    values.forEach(game => {
      if (game.gameState === 'won') {
        const tries = game.currAttempt.attempt - 1
        dist[tries] = dist[tries] + 1
      }
    })
    setDistribution(dist)
  }

  if (!open) return null


  return (
    <div onClick={onClose} className='overlay'>
      <div onClick={(e) => { e.stopPropagation() }} className='modalContainer'>
        <button onClick={onClose} className='closeBtn'><IoMdClose /></button>
        <h4 className='title'>Stats</h4>
        <div className='stat-numbers'>
          <Number number={played} label={"Played"} />
          <Number number={winRate} label={"Win %"} />
          <Number number={curStreak} label={"Current Streak"} />
          <Number number={maxStreak} label={"Max Streak"} />
        </div>
        <GuessDistribution distribution={distribution} />
      </div>
    </div>
  )
}

export default Stats
