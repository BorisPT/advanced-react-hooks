// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  
  function reducerFunction(currentState, action){
    return currentState + action;
  };

  const [count, changeCount] = React.useReducer(reducerFunction, initialCount);

  const increment = () => changeCount(step);

  return <button onClick={increment}>{count}</button>
}

function App() {
  return <Counter step={5}/>
}

export default App
