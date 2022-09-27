import { useState, useImperativeHandle, forwardRef } from 'react'

const Togglable = forwardRef((props, ref) => {
  const [visible, setVisible] = useState(false)

  const hideVisible = { display: visible ? 'none' : '' }
  const showInvisible = { display: visible ? '' : 'none' }

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
      <div style={hideVisible}>
        <button onClick={toggleVisibility}>{props.buttonLabel}</button>
      </div>
      <div style={showInvisible}>
        {props.children}
        <button onClick={toggleVisibility}>cancel</button>
      </div>
    </div>
  )
})

export default Togglable