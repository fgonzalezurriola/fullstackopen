

import { useState } from 'react'

const Header = ({ header }) => {
  console.log(header)
  return (
    <h1>{header}</h1>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  console.log("total: ", total)
  const average = (good + (-bad)) / total
  console.log("average: ", average)
  const positive = (good / (good + bad + neutral)) * 100
  console.log("positive: ", positive)

  return (
    total === 0 ? <p> No feedback given </p> :
      <>
        <p> Good: {good}</p>
        <p> Neutral: {neutral}</p>
        <p> Bad: {bad}</p>
        <p> All: {total}</p>
        <p> Average: {average} </p>
        <p> Positive: {positive} %</p>
      </>
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

  return (
    <div>
      <Header header={headers.header1} />
      <button onClick={handleGoodClick}> Good </button>
      <button onClick={handleNeutralClick}> Neutral </button>
      <button onClick={handleBadClick}> Bad </button>

      <Header header={headers.header2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App