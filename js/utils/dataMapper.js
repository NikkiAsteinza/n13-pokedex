import { print } from "./logger.js";

print("Thanks for visiting N13-Pokedex");

export async function getPokeDataFromFetch(pokeApiUrl, offset) {
  try {
    let getPokemonResult = await getBuiltPokemonData(pokeApiUrl);
    console.log(getPokemonResult[0].results);

    await getBuildData(getPokemonResult[0].results);

    // Mapeamos los datos para incluir el nombre, la URL, la imagen, y el número del índice
    const pokemonMap = getPokemonResult[0].results.map((result, index) => ({
      name: result.name,
      url: result.url,
      image: result.sprites.front_default, // Obtener la imagen desde los detalles
      number: index + 1 + offset// Asigna el índice basado en la posición
    }));

    return pokemonMap;
  } catch (error) {
    console.error("Error in getPokeDataFromFetch:", error);
    return [];
  }
}

// dataMapper.js

export async function getPokemonDetails(pokemonId) {
  try {
    console.log(pokemonId);
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemonId}`);
    const result = await response.json();

    // Mapeamos los datos del Pokémon
    const pokemonDetails = {
      name: result.name,
      number: result.id,
      speed: result.stats.find(stat => stat.stat.name === 'speed').base_stat,
      attack: result.stats.find(stat => stat.stat.name === 'attack').base_stat,
      defense: result.stats.find(stat => stat.stat.name === 'defense').base_stat,
      specialAttack: result.stats.find(stat => stat.stat.name === 'special-attack').base_stat,
      specialDefense: result.stats.find(stat => stat.stat.name === 'special-defense').base_stat,
      hp: result.stats.find(stat => stat.stat.name === 'hp').base_stat,
      image: result.sprites.other.dream_world.front_default || 'default-image-url.png',
      baseExperience: result.base_experience,
      types: result.types.map(typeInfo => typeInfo.type.name),
      abilities: result.abilities.map(abilityInfo => abilityInfo.ability.name),
      stats: result.stats,
      forms: result.forms.map(formInfo => formInfo.name),
      height: result.height,
      weight: result.weight,
      moves: result.moves.map(moveInfo => moveInfo.move.name),
      species: result.species.name,
      order: result.order
    };

    return pokemonDetails;
  } catch (error) {
    console.error("Error in getPokemonDetails:", error);
    return null;
  }
}


async function getBuiltPokemonData(pokeApiUrl) {
  try {
    let getPokemonResult = [];

    const petition = await fetch(`${pokeApiUrl}`);
    const response = await petition.json();
    getPokemonResult.push(response);

    if (getPokemonResult.length > 0) {
      print("Data received correctly");
    }
    return getPokemonResult;
  } catch (error) {
    console.error("Error in getBuiltPokemonData:", error);
    return [];
  }
}

async function getBuildData(pokemonData) {
  try {
    for (let index = 0; index < pokemonData.length; index++) {
      if (pokemonData[index]) {
        const petition2 = await fetch(`${pokemonData[index].url}`);
        const response2 = await petition2.json();

        // Agregar la imagen del Pokémon a los datos
        pokemonData[index].sprites = response2.sprites;
      }
    }

    if (pokemonData.length > 0) {
      print("Data received correctly");
    }
  } catch (error) {
    console.error("Error in getBuildData:", error);
  }
}

export async function getHabitatDataFromFetch(pokeApiHabitats) {
  try {
    let getPokemonHabitatResult = [];
    let getPokemonHabitatDetail = [];

    const petition = await fetch(`${pokeApiHabitats}`);
    const response = await petition.json();

    const data = response.results;
    getPokemonHabitatResult.push(data);

    if (getPokemonHabitatResult.length > 0) {
      print("Habitats Data received correctly");
    }
    const habitatResults = getPokemonHabitatResult[0];

    for (let index = 0; index < habitatResults.length; index++) {
      const habitat = habitatResults[index];
      const petition2 = await fetch(`${habitat.url}`);
      const response2 = await petition2.json();
      getPokemonHabitatDetail.push(response2);
    }

    const pokemonMap = getPokemonHabitatDetail.map((result) => ({
      id: result.id,
      name: result.name,
      species: result.pokemon_species,
    }));

    return pokemonMap;
  } catch (error) {
    console.error("Error in getHabitatDataFromFetch:", error);
    return [];
  }
}
