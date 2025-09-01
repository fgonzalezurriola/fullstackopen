

import { useState } from 'react'

const Header = ({ header }) => {
  console.log(header)
  return (
    <h1>{header}</h1>
  )
}



const App = () => {
  const headers = {
    header1: 'give feedback',
    header2: 'statistics'
  }

  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const handleGoodClick = () => {
    console.log("Good")
    setGood(good + 1)
  }

  const handleNeutralClick = () => {
    console.log("Neutral")
    setNeutral(neutral + 1)
  }

  const handleBadClick = () => {
    console.log("Bad")
    setBad(bad + 1)
  }

  const total = good + neutral + bad
  console.log("total: ", total)
  const average = (good + (-bad)) / total
  console.log("average: ", average)
  const positive = (good / (good + bad + neutral)) * 100
  console.log("positive: ", positive)

  return (
    <div>
      <Header header={headers.header1} />
      <button onClick={handleGoodClick}> Good </button>
      <button onClick={handleNeutralClick}> Neutral </button>
      <button onClick={handleBadClick}> Bad </button>

      <Header header={headers.header2} />
      <p> Good: {good}</p>
      <p> Neutral: {neutral}</p>
      <p> Bad: {bad}</p>
      <p> All: {total}</p>
      <p> Average: {average ? average : 0}</p>
      <p> Positive: {positive ? positive : 0} %</p>
    </div>
  )
}

export default App