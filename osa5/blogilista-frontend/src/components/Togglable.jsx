import { forwardRef, useState, useImperativeHandle } from 'react'
import PropTypes from 'prop-types'

// eslint-disable-next-line
const Togglable = forwardRef(({ children, buttonLabel, closeLabel, startVisible }, ref) => {
  const [visible, setVisible] = useState(startVisible)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

  return (
    <div>
      <div style={hideWhenVisible}>
        <button onClick={toggleVisibility} className='toggleButton'>{buttonLabel}</button>
      </div>
      <div style={showWhenVisible}>
        {children}
        <button onClick={toggleVisibility}>{closeLabel ? closeLabel : 'close'}</button>
      </div>
    </div>
  )
})

Togglable.propTypes = {
  buttonLabel: PropTypes.string.isRequired
}

export default Togglable