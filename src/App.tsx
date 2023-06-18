import React, { useState, useEffect } from "react";
import "./App.css";
import axios from "axios";
import PokemonCollection from "./components/PokemonCollection";
import { Pokemon } from "./interface";

interface Pokemons {
  name: string
  url: string
}


const App: React.FC = () => {

  const [pokemons, setPokemons] = useState<Pokemon[]>([]);
  const [nextUrl, setNextUrl] = useState<string>("second")

  useEffect(() => {
    const getPokemon = async () => {
      const res = await axios.get(
        "https://pokeapi.co/api/v2/pokemon?limit=20&offset=20"
      );
      setNextUrl(res.data.next)
      

      res.data.results.forEach(async (pokemon: Pokemons) => {
        const poke = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
          )
          console.log(poke.data)
          setPokemons((p) => [...p, poke.data])
      })
    };
    getPokemon()
  }, []);
console.log(nextUrl)
const nextPage =async () => {
  
  let res = await axios.get(nextUrl)
  setNextUrl(res.data.next)
  res.data.results.forEach(async (pokemon: Pokemons) => {
    const poke = await axios.get(
      `https://pokeapi.co/api/v2/pokemon/${pokemon.name}`
      )
      console.log(poke.data)
      setPokemons((p) => [...p, poke.data])
  })
}
  return (
    <div className="App">
      <header className="pokemon-header">POKEDEX</header>
      <PokemonCollection pokemons={pokemons}/>
      <div className="btn-container">
        <button className="btn" onClick={nextPage}>charger
        </button>
      </div>
      
    </div>
  );
}

export default App;
