import { useState, useEffect } from 'react'
import userService from '../services/user'
import blogService from '../services/blogs'
import PropTypes from 'prop-types'

const LoginForm = ({ showMessage, setUser }) => {

  const [credentials, setCredentials] = useState({ username: '', password: '' })

  const updateUsername = (value) => {
    setCredentials({ ...credentials, username: value })
  }

  const updatePassword = (value) => {
    setCredentials({ ...credentials, password: value })
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const result = await userService.login(credentials)
      console.log(result)
      if (result) {
        window.localStorage.setItem(
          'loggedUser', JSON.stringify(result)
        )
      }
      blogService.setToken(result.token)
      setUser(result)
      setCredentials({ username: '', password: '' })
    }
    catch (e) {
      showMessage(true, 'Login failed')
      console.log(e)
    }
  }

  return <>
    <h1>Log in to application</h1>
    <form onSubmit={handleLogin}>
      <div>username <input value={credentials.username} onChange={({ target }) => updateUsername(target.value)} className="usernameInput" /></div>
      <div>password <input value={credentials.password} onChange={({ target }) => updatePassword(target.value)} className="passwordInput" /></div>
      <button type="submit">log in</button>
    </form>
  </>
}

LoginForm.propTypes = {
  showMessage: PropTypes.func.isRequired,
  setUser: PropTypes.func.isRequired
}

export default LoginForm