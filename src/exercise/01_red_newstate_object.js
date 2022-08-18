// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  
  function reducerFunction(currentState, newState){
    return newState;
  };

  const [state, setState] = React.useReducer(reducerFunction, {
    count: initialCount,
  });

  const {count} = state

  const increment = () => setState({count: count + step})

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter initialCount={0} step={5}/>
}

export default App





