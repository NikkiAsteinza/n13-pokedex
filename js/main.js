import { initPokedex } from "./pokedexController.js";

let offset = 0;
let loading = false;
const limit = 20;
const pokeApiHabitats = "https://pokeapi.co/api/v2/pokemon-habitat";

// Initial URL setup
let pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;

// Initialize Pokedex
initPokedex(pokeApiUrl, offset, pokeApiHabitats);

// Scroll event listener
document.getElementById("pokedex").addEventListener("scroll", () => {
  const pokedexElement = document.getElementById("pokedex");
  if (
    pokedexElement.scrollTop + pokedexElement.clientHeight >= pokedexElement.scrollHeight - 100 &&
    !loading
  ) {
    loading = true; // Set loading to true to prevent multiple calls
    offset += limit;
    pokeApiUrl = `https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`;
    
    // Fetch and append new Pokémon data
    initPokedex(pokeApiUrl, offset, pokeApiHabitats).finally(() => {
      loading = false; // Reset loading state after fetch is complete
    });
  }
});
