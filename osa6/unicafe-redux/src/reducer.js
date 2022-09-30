const initialState = {
    good: 0,
    ok: 0,
    bad: 0
  }
  
  const counterReducer = (state = initialState, action) => {
    console.log(action)
    switch (action.type) {
      case 'GOOD':
      const good = state.good
      const newGood = {...state, good: good + 1}
        return newGood
      case 'OK':
        const ok = state.ok
        const newOk = {...state, ok: ok + 1}
        return newOk
      case 'BAD':
        const bad = state.bad
        const newBad = {...state, bad: bad + 1}
        return newBad
      case 'ZERO':
        const zeroAll = initialState
        return zeroAll
      default: 
        return state
    }
  }
  
  export default counterReducer
  