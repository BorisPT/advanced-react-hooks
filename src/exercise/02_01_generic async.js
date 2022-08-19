// useCallback: custom hooks
// http://localhost:3000/isolated/exercise/02.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'

const useAsync = (asyncCallback, initialState) => { 

// interessante : define a generic reducer, for use in the "useReducer" hook that we'll use in this custom hook.
function genericReducer(state, action) {
  switch (action.type) {
    case 'pending': {      
      return {status: 'pending', data: null, error: null}
    }
    case 'resolved': {      
      return {status: 'resolved', data: action.data, error: null}
    }
    case 'rejected': {      
      return {status: 'rejected', data: null, error: action.error}
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`)
    }
  }
}

// interessante : define the reducer with the initial state, and complement it with the initial state
// from outside. 
const [state, dispatch] = React.useReducer(genericReducer, {
  status: 'idle',  
  data: null,
  error: null,
  ...initialState});

React.useEffect(() => {

  // interessante : this returns a promise, or it doesn't return anything. 
  // Check the "function snippet" that was passed as parameter to this useAsync hook.
  const promise = asyncCallback()
   if (!promise) {
     return
   }

  dispatch({type: 'pending'});

  promise.then(
    data => {
      dispatch({type: 'resolved', data})
    },
    error => {
      dispatch({type: 'rejected', error})
    }
  );

  // 🐨 because of limitations with ESLint, you'll need to ignore
  // the react-hooks/exhaustive-deps rule. We'll fix this in an extra credit.
}, [asyncCallback]);

return state;

 };

function PokemonInfo({pokemonName}) {
  
  const asyncCallback = () => {
    if (!pokemonName) {
      return;
    }

    return fetchPokemon(pokemonName);
  };

  const memoizedAsync = React.useCallback(asyncCallback, [pokemonName]);
      
  const state = useAsync(memoizedAsync, {status: pokemonName ? 'pending' : 'idle'});
  
  const {data, status, error} = state

  switch (status) {
    case 'idle':
      return <span>Submit a pokemon</span>
    case 'pending':
      return <PokemonInfoFallback name={pokemonName} />
    case 'rejected':
      throw error
    case 'resolved':
      return <PokemonDataView pokemon={data} />
    default:
      throw new Error('This should be impossible')
  }
}

function App() {
  const [pokemonName, setPokemonName] = React.useState('')

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleReset() {
    setPokemonName('')
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <div className="pokemon-info">
        <PokemonErrorBoundary onReset={handleReset} resetKeys={[pokemonName]}>
          <PokemonInfo pokemonName={pokemonName} />
        </PokemonErrorBoundary>
      </div>
    </div>
  )
}

function AppWithUnmountCheckbox() {
  const [mountApp, setMountApp] = React.useState(true)
  return (
    <div>
      <label>
        <input
          type="checkbox"
          checked={mountApp}
          onChange={e => setMountApp(e.target.checked)}
        />{' '}
        Mount Component
      </label>
      <hr />
      {mountApp ? <App /> : null}
    </div>
  )
}

export default AppWithUnmountCheckbox
