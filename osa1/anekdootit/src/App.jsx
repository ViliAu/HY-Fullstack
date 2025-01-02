import { useState } from 'react'

const App = () => {
  const [anecdotes, setAnecdotes] = useState([
    {
      text: 'If it hurts, do it more often.',
      score: 0
    },
    {
      text: 'Adding manpower to a late software project makes it later!',
      score: 0
    },
    {
      text: 'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
      score: 0
    },
    {
      text: 'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
      score: 0
    },
    {
      text: 'Premature optimization is the root of all evil.',
      score: 0
    },
    {
      text: 'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
      score: 0
    },
    {
      text: 'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when dianosing patients.',
      score: 0
    },
    {
      text: 'The only way to go fast, is to go well.',
      score: 0
    }
  ]);
   
  const [selected, setSelected] = useState(0)
  const [mostVoted, setMostVoted] = useState(0)

  const rng = () => Math.floor(Math.random()*anecdotes.length)

  const voteCurrent = () => {
    const copy = [...anecdotes];
    copy[selected].score++;
    setAnecdotes(copy);
    calcMostVoted();
  }
  
  const calcMostVoted = () => {
    let i = 0;
    anecdotes.forEach((a, j) => {
      if (a.score > anecdotes[i].score) {
        i = j
      }
    })
    setMostVoted(i);
  }

  return (
    <>
      <p>{anecdotes[selected].text}</p>
      <p>score: {anecdotes[selected].score}</p>
      <button onClick={() => setSelected(rng)}>Next anecdote</button>
      <button onClick={() => voteCurrent()}>vote</button>
      <h1>Anecdote with most votes</h1>
      <p>{anecdotes[mostVoted].text}</p>
      <p>Has {anecdotes[mostVoted].score} votes</p>
    </>
  )
}

export default App