import { createContext, useReducer, useContext } from 'react'

const messageReducer = (state, action) => {
  switch (action.type) {
    case "SET":
        return action.payload
    case "CLEAR":
        return ''
    default:
        return state
  }
}

const MessageContext = createContext()

export const MessageContextProvider = (props) => {
  const [message, messageDispatch] = useReducer(messageReducer, '')

  return (
    <MessageContext.Provider value={[message, messageDispatch]}>
      {props.children}
    </MessageContext.Provider>
  )
}

export const useMessageValue = () => {
    const msgAndDispatch = useContext(MessageContext)
    return msgAndDispatch[0]
  }

export const useMessageDispatch = () => {
    const msgAndDispatch = useContext(MessageContext)
    return msgAndDispatch[1]
}

export default MessageContext