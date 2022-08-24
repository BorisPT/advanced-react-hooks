// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// interessante : creating the initial context
const CountContext = React.createContext()

// interessante : defining a "CountProvider", so we can easily wrap around the other components.
// Note the passing of children to the components below. We can manage state, take props, etc.
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

// interessante : use the context here, to display the current count.
function CountDisplay() {
  const theContext = React.useContext(CountContext)
  return <div>{`The current count is ${theContext.count}`}</div>
}

function Counter() {
  
  // interessante : use the context here to get the updater function
  const theContext = React.useContext(CountContext)
  const setCount = theContext.setCount
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
