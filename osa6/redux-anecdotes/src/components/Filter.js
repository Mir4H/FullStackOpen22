import { connect } from 'react-redux'
import { setFilter } from '../reducers/filterReducer'
import { useRef } from 'react'

const Filter = (props) => {
  const ref = useRef(null)
  const handleChange = (event) => {
    props.setFilter(event.target.value)
  }
  const style = {
    marginBottom: 10
  }
  const clear = () => {
    props.setFilter('')
    ref.current.value = ''
  }

  return (
    <div style={style}>
        Filter <input ref={ref} onChange={handleChange} /><button onClick={clear}>Clear</button>
    </div>
  )
}


export default connect(null, { setFilter })(Filter)