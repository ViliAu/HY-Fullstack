

const UserCard = ({ user, setUser }) => {
  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }
  if (user) {
    return (
      <div>{user.name} logged in<button onClick={logout}>logout</button></div>
    )
  }
}

export default UserCard