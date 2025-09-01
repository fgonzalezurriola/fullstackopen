

import { useState } from 'react'

const Header = ({ header }) => {
  console.log(header)
  return (
    <h1>{header}</h1>
  )
}

const Statistics = ({ good, neutral, bad }) => {
  const total = good + neutral + bad
  const average = (good + (-bad)) / total
  const positive = (good / (good + bad + neutral)) * 100
  console.log("total: ", total)
  console.log("average: ", average)
  console.log("positive: ", positive)

  return (
    total === 0 ? <p> No feedback given </p> :
      <table>
        <tbody>
          <StatisticLine text="Good" value={good} />
          <StatisticLine text="Neutral" value={neutral} />
          <StatisticLine text="Bad" value={bad} />
          <StatisticLine text="All" value={total} />
          <StatisticLine text="Average" value={average} />
           <StatisticLine text="Positive" value={positive + " %"} />
        </tbody>
      </table>
  )
}

const Button = ({ handleClick, text }) => (
  <button onClick={handleClick}>{text}</button>
)

const StatisticLine = ({ text, value }) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
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
      <Button handleClick={handleGoodClick} text="Good" />
      <Button handleClick={handleNeutralClick} text="Neutral" />
      <Button handleClick={handleBadClick} text="Bad" />

      <Header header={headers.header2} />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App