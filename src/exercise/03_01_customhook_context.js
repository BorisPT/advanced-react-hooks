// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0);

  const value = {
    count: count,
    setCount: setCount,
  };

  return (
    <CountContext.Provider value={value}>{props.children}</CountContext.Provider>
  )
}

// interessante : custom hook
// Check to see if the values state and updater function values are available. Throw error if they are not.
const useCount = () => { 

  const theContext = React.useContext(CountContext);

  if (!theContext) {
    throw new Error("Could not find the React context to use in custom hook 'useCount'");
  }

  const {count, setCount} = theContext;

  // interessante : the loose equality operator allows us to check if it is undefined or null
  if (count == null) {
    throw new Error("Could not find 'count' variable from the React context");
  }

  // interessante : the loose equality operator allows us to check if it is undefined or null
  if (count == null) {
    throw new Error("Could not find 'setCount' variable from the React context");
  }

  return [count, setCount];
 };


function CountDisplay() {
  const [count] = useCount();
  return <div>{`The current count is ${count}`}</div>
}

function Counter() {
  
  const [ , setCount] = useCount();  
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      {/* // interessante : wrap the components that need the context with the CountProvider. */}
      <CountProvider>
        <CountDisplay /> 
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
