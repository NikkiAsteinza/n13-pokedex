import { print } from "./logger.js";
print ("Thanks for visiting N13-Pokedex")
export async function getPokeDataFromFetch(pokeApiUrl,numberOfPokemonToShow) {
    let getPokemonResult = await getBuiltPokemonData(
        pokeApiUrl,numberOfPokemonToShow);
  
    const pokemonMap = getPokemonResult.map((result) => ({
      name: result.name,
      number: result.id,
      speed: result.stats[0].base_stat,
      attack: result.stats[1].base_stat,
      defense: result.stats[2].base_stat,
      specialAttack: result.stats[3].base_stat,
      specialDefense: result.stats[4].base_stat,
      defense: result.stats[5].base_stat,
      image: result.sprites.other.dream_world.front_default,
      baseExperience: result.base_experience,
      types: result.types,
      abilities: result.abilities,
      stats: result.stats,
      forms: result.forms,
      height: result.height,
      weight: result.weight,
      moves: result.moves,
      locationAreas: result.location_area_encounters,
      species: result.species,
      order: result.order,
    }));
    return pokemonMap;
  }
  
  async function getBuiltPokemonData(pokeApiUrl, numberOfPokemonToShow) {
    let getPokemonResult = [];
    let getPokemonHabitatResult = [];
  
    for (let index = 1; index < numberOfPokemonToShow + 1; index++) {
      const petition = await fetch(`${pokeApiUrl}/${index}`);
      const response = await petition.json();
      getPokemonResult.push(response);
  
      const petition2 = await fetch(`${pokeApiUrl}/${index}/encounters`);
      const response2 = await petition2.json();
      getPokemonHabitatResult.push(response2);
  
      response.location_area_encounters = response2;
    }
  
    if (getPokemonResult.length > 0) {
      print("Data recieved correctly");
    }
    return getPokemonResult;
  }
  
  export async function getHabitatDataFromFetch(pokeApiHabitats) {
    let getPokemonHabitatResult = [];
    let getPokemonHabitatDetail = [];
  
    const petition = await fetch(`${pokeApiHabitats}`);
    const response = await petition.json();
  
    const data = response.results;
    getPokemonHabitatResult.push(data);
  
    if (getPokemonHabitatResult.length > 0) {
      print("Habitats Data recieved correctly");
  
    }
    const habitatResults = getPokemonHabitatResult[0];
  
    for (let index = 0;index < habitatResults.length;index++) {
      const habitat = habitatResults[index] ;
      const petition2 = await fetch(`${habitat.url}`);
      const response2 = await petition2.json();
      getPokemonHabitatDetail.push(response2);
    }
  
    const pokemonMap = getPokemonHabitatDetail.map((result) => ({
      id: result.id,
      name: result.name,
      species: result.pokemon_species
    }))
  
    return pokemonMap;
  }
  