// useContext: Caching response data in context
// 💯 caching in a context provider (exercise)
// http://localhost:3000/isolated/exercise/03.extra-2.js

import * as React from 'react'
import {
  fetchPokemon,
  PokemonForm,
  PokemonDataView,
  PokemonInfoFallback,
  PokemonErrorBoundary,
} from '../pokemon'
import {useAsync} from '../utils'

// interessante : create a pokemon cache context
const PokemonCacheContext = React.createContext()

// interessante : define a provider for this context. Use the reducer as a means to maintain state.

export const PokemonCacheProvider = props => {
  // interessante : define a reducer function and a reducer state, and manage it in this context.

  function pokemonCacheReducer(state, action) {
    switch (action.type) {
      case 'ADD_POKEMON': {
        return {...state, [action.pokemonName]: action.pokemonData}
      }
      default: {
        throw new Error(`Unhandled action type: ${action.type}`)
      }
    }
  }

  const [cache, dispatch] = React.useReducer(pokemonCacheReducer, {})

  const value = {
    cache: cache,
    dispatch: dispatch,
  }

  return (
    // interessante : define the value for the cache context provider
    <PokemonCacheContext.Provider value={value}>
      {props.children}
    </PokemonCacheContext.Provider>
  )
}

// 🐨 create a PokemonCacheProvider function
// 🐨 useReducer with pokemonCacheReducer in your PokemonCacheProvider
// 💰 you can grab the one that's in PokemonInfo
// 🐨 return your context provider with the value assigned to what you get back from useReducer
// 💰 value={[cache, dispatch]}
// 💰 make sure you forward the props.children!

function PokemonInfo({pokemonName}) {

  // interessante : get the cache and dispatch function from the context
  const {cache, dispatch} = React.useContext(PokemonCacheContext)

  const {data: pokemon, status, error, run, setData} = useAsync()

  React.useEffect(() => {
    if (!pokemonName) {
      return
    } else if (cache[pokemonName]) {
      setData(cache[pokemonName])
    } else {
      run(
        fetchPokemon(pokemonName).then(pokemonData => {
          dispatch({type: 'ADD_POKEMON', pokemonName, pokemonData})
          return pokemonData
        }),
      )
    }
  }, [cache, pokemonName, run, setData, dispatch])

  if (status === 'idle') {
    return 'Submit a pokemon'
  } else if (status === 'pending') {
    return <PokemonInfoFallback name={pokemonName} />
  } else if (status === 'rejected') {
    throw error
  } else if (status === 'resolved') {
    return <PokemonDataView pokemon={pokemon} />
  }
}

function PreviousPokemon({onSelect}) {

  // interessante : get the cache from the react context
  const {cache} = React.useContext(PokemonCacheContext)
  return (
    <div>
      Previous Pokemon
      <ul style={{listStyle: 'none', paddingLeft: 0}}>
        {Object.keys(cache).map(pokemonName => (
          <li key={pokemonName} style={{margin: '4px auto'}}>
            <button
              style={{width: '100%'}}
              onClick={() => onSelect(pokemonName)}
            >
              {pokemonName}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}

function PokemonSection({onSelect, pokemonName}) {
  
  // interessante : wrap the components in a cache provider
  return (
    <PokemonCacheProvider>
      <div style={{display: 'flex'}}>
        <PreviousPokemon onSelect={onSelect} />
        <div className="pokemon-info" style={{marginLeft: 10}}>
          <PokemonErrorBoundary
            onReset={() => onSelect('')}
            resetKeys={[pokemonName]}
          >
            <PokemonInfo pokemonName={pokemonName} />
          </PokemonErrorBoundary>
        </div>
      </div>
    </PokemonCacheProvider>
  )
}

function App() {
  const [pokemonName, setPokemonName] = React.useState(null)

  function handleSubmit(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  function handleSelect(newPokemonName) {
    setPokemonName(newPokemonName)
  }

  return (
    <div className="pokemon-info-app">
      <PokemonForm pokemonName={pokemonName} onSubmit={handleSubmit} />
      <hr />
      <PokemonSection onSelect={handleSelect} pokemonName={pokemonName} />
    </div>
  )
}

export default App
