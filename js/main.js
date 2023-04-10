import { initPokedex } from "./pokedexController.js"

const numberOfPokemonToShow = 150
const pokeApiUrl = "https://pokeapi.co/api/v2/pokemon"
const pokeApiHabitats = "https://pokeapi.co/api/v2/pokemon-habitat"

initPokedex(
  pokeApiUrl,
  numberOfPokemonToShow,
  pokeApiHabitats)