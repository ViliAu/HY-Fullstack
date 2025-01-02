import { useState } from 'react'
import Statistics from './Statistics';
import Button from './Button';

function App() {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <>
      <h1>give feedback</h1>
      <Button clickAction={() => setGood(good + 1)} text={'good'} />
      <Button clickAction={() => setNeutral(neutral + 1)} text={'neutral'} />
      <Button clickAction={() => setBad(bad + 1)} text={'bad'} />

      <Statistics good={good} bad={bad} neutral={neutral}/>
    </>
  )
}

export default App
