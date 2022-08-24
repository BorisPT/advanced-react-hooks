// useDebugValue: useMedia
// http://localhost:3000/isolated/exercise/06.js

import * as React from 'react'

function useMedia(query, initialState = false) {
  const [state, setState] = React.useState(initialState)
  
  // interessante : use the "useDebugValue" hook to provide more information in the React developer tools plugin.
  // Look for the png files for more information. This only works for debug values inside custom hooks.
  // 💰 here's the formatted label I use: `\`${query}\` => ${state}`
  
  // React.useDebugValue(`\`${query}\` => ${state}`);

  // interessante : we can also pass a function to do the formating for the data we want to present.
  // The first parameter, the object passed into "useDebugValue" will be passed as parametere to this formatter function.
  const formatter = ({initialState , query}) => { 
    return `NewFormat: ${query} ==> ${initialState}`;
   };

   React.useDebugValue({initialState : initialState, query : query}, formatter);

  React.useEffect(() => {
    let mounted = true
    const mql = window.matchMedia(query)
    function onChange() {
      if (!mounted) {
        return
      }
      setState(Boolean(mql.matches))
    }

    mql.addListener(onChange)
    setState(mql.matches)

    return () => {
      mounted = false
      mql.removeListener(onChange)
    }
  }, [query])

  return state
}

function Box() {
  const isBig = useMedia('(min-width: 1000px)')
  const isMedium = useMedia('(max-width: 999px) and (min-width: 700px)')
  const isSmall = useMedia('(max-width: 699px)')
  const color = isBig ? 'green' : isMedium ? 'yellow' : isSmall ? 'red' : null

  return <div style={{width: 200, height: 200, backgroundColor: color}} />
}

function App() {
  return <Box />
}

export default App
