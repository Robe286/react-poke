import { useEffect, useState } from 'react';
import './App.css';


function App () {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState({})

  const getPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`)
    try {
      if(!res.ok) throw new Error ('No se ha podido acceder a la API')
      const data = await res.json()
      setPokemon(data)
      console.log(data)
      
    } catch (err) {
      console.log(err)
    }
  }

  useEffect(() => {
    getPokemon()
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nombre.trim() !== '') // Manejar adecuadamente los casos de búsqueda vacía
    getPokemon(nombre)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit}>
        <label htmlFor='nombre'>Introduce el nombre del pokemon</label>
        <input 
          type='text'
          id='nombre'
          name='nombre'
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <button type='submit'>Enviar</button>
      </form>
      {pokemon && pokemon.species &&
        <div>
          <h2>{pokemon.species.name}</h2>
          <img 
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={150}
            height={150}

          />
        </div>
      } 
    </>

  )
};

export default App;
