import { useContext } from 'react'
import { useMessageValue } from "../MessageContext"


const Notification = () => {

  const msg = useMessageValue()

  const style = {
    border: 'solid',
    padding: 10,
    borderWidth: 1,
    marginBottom: 5,
    display: msg.length > 0 ? 'block' : 'none'
  }

  return (
    <div style={style}>
      {msg}
    </div>
  )
}

export default Notification
