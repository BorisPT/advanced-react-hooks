// useReducer: simple Counter
// http://localhost:3000/isolated/exercise/01.js

import * as React from 'react'

function Counter({initialCount = 0, step = 1}) {
  
  
  function reducerFunction(currentState, action){

    if (action.type === "INCREMENT")
    {
      return { count : currentState.count + action.step };
    }

    throw Error("Computer says no");

  };

  const [state, dispatch] = React.useReducer(reducerFunction, {
    count: initialCount,
  });

  const {count} = state;

  const increment = () => dispatch({type: 'INCREMENT', step});

  return <button onClick={increment}>{count}</button>;
}

function App() {
  return <Counter initialCount={0} step={4}/>
}

export default App




