import { useEffect, useState } from 'react';
import './App.css';

// --- DUDAS ---> Si no existiera nos tiene que devolver un mensaje de `pokemon no encontrado`, como se podría hacer?


function App () {
  const [nombre, setNombre] = useState('')
  const [pokemon, setPokemon] = useState({}) // Como la respuesta es un objeto, el estado inicial es un objeto vacio.

  const getPokemon = async () => {
    const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${nombre}/`)
    try {
      if(!res.ok) throw new Error ('Pokemon no encotrado') // Si no existiera nos tiene que devolver un mensaje de `pokemon no encontrado` ¿OK?
      const data = await res.json()
      setPokemon(data)
      
    } catch (err) {
      console.log(err) // Que errores debería recoger el catch?
    }
  }

  useEffect(() => {
    getPokemon()
  }, [nombre]) // actualizar en cada momento la busqueda pasándole el parametro de cambio ¿OK?

  const handleSubmit = (e) => {
    e.preventDefault();
    if(nombre.trim() !== '') // Manejar adecuadamente los casos de búsqueda vacía
    getPokemon(nombre)
  }
  
  return (
    <>
      <form onSubmit={handleSubmit} className='formulario' >
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
      {pokemon && pokemon.species && // Renderizamos directamente sin mapear. Los datos vienen en un objeto y no podríamos mapear a no ser que establezcamos [pokemon]
        <div className='result-container'>
          <h2>{pokemon.species.name}</h2>
          <img 
            src={pokemon.sprites.front_default}
            alt={pokemon.name}
            width={140}
            height={140}
          />
        </div>
      } 
    </>

  )
};

export default App;
