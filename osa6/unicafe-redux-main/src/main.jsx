import React from 'react'
import ReactDOM from 'react-dom/client'

import { createStore } from 'redux'
import reducer from './reducer'

const store = createStore(reducer)

const App = () => {
  const updateState = (event) => {
      store.dispatch({
          type: event.target.innerText.toUpperCase()
      })
  }

  
  return (
      <div>
          <button onClick={(event) => {updateState(event)}}>good</button>
          <button onClick={(event) => {updateState(event)}}>ok</button>
          <button onClick={(event) => {updateState(event)}}>bad</button>
          <button onClick={(event) => {updateState(event)}}>reset stats</button>
          <div>good {store.getState().good}</div>
          <div>ok {store.getState().ok}</div>
          <div>bad {store.getState().bad}</div>
      </div>
  )
}

const root = ReactDOM.createRoot(document.getElementById('root'))

const renderApp = () => {
  root.render(<App />)
}

renderApp()
store.subscribe(renderApp)
