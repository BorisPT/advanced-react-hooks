// useContext: simple Counter
// http://localhost:3000/isolated/exercise/03.js

import * as React from 'react'

// 🐨 create your CountContext here with React.createContext

const CountContext = React.createContext()

function CountProvider(props) {
  const [count, setCount] = React.useState(0)

  const value = {
    count: count,
    setCount: setCount,
  }

  return (
    <CountContext.Provider value={value}>{props.children}</CountContext.Provider>
  )
}

function CountDisplay() {
  // 🐨 get the count from useContext with the CountContext
  const theContext = React.useContext(CountContext)

  // const count = 0
  return <div>{`The current count is ${theContext.count}`}</div>
}

function Counter() {
  // 🐨 get the setCount from useContext with the CountContext
  const theContext = React.useContext(CountContext)
  const setCount = theContext.setCount
  const increment = () => setCount(c => c + 1)
  return <button onClick={increment}>Increment count</button>
}

function App() {
  return (
    <div>
      <CountProvider>
        <CountDisplay />
        <Counter />
      </CountProvider>
    </div>
  )
}

export default App
