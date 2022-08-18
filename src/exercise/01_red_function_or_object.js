// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  
  // interessante : supporting an object or a function in the reducer function.
  function reducerFunction(currentState, functionOrObject){

    if (typeof functionOrObject === "function")
    {
      return functionOrObject(currentState);
    }
    else
    {
      return functionOrObject;
    }
  };

  const [state, setState] = React.useReducer(reducerFunction, {
    count: initialCount,
  });

  const {count} = state

  // const increment = () => setState({count: count + step})
  const increment = () => setState(currentState => ({count: currentState.count + step}))

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter initialCount={0} step={7}/>
}

export default App





