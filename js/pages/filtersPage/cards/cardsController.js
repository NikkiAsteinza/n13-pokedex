import { restoreBackground, setNotFound } from "../../../pokedexController.js";
import { renderPokemon } from "./cardCreator.js";

let pokeCards = [];
let pokemonMapped;
let habitats;

export function printRecoveredPokemonData(
  mappedData,
  habitatsData,
  cardsContainerId,
  onCardClickFunction
) {
  pokemonMapped = mappedData;
  habitats = habitatsData;
  for (let index = 0; index < pokemonMapped.length; index++) {
    const element = pokemonMapped[index];
    pokeCards.push(
      renderPokemon(element, cardsContainerId, onCardClickFunction)
    );
  }
}

export function clearFilter() {
  pokeCards.forEach((card) => {
    card.classList.remove("hidden");
  });
  restoreBackground();
}

export function showCardsByFilter(filters) {
  const filteredPokemon = pokemonMapped.filter((pokemon) => {
    for (const filter of filters) {
      if (filter.getIsEnabled()) {
        switch (filter.name) {
          case "id":
            if (pokemon.number != filter.getInputValue())
              return false;
            break;
          case "name":
            if (!pokemon.name.includes(filter.getInputValue()))
              return false;
            break;
          case "type":
            if (!containsDesiredType(pokemon, filter.getInputValue()))
              return false;
            break;
          case "habitat":
            if (!containsDesiredHabitat(pokemon, filter.getInputValue()))
              return false;
            break;
        }
      }
    }
    return true;
  });

  const pokemonToHide = pokemonMapped.filter(
    (pokemon) => !filteredPokemon.includes(pokemon)
  );

  pokemonToHide.forEach((pokemon) => {
    document.getElementById(pokemon.number).classList.add("hidden");
  });

  if(pokemonToHide.length == pokemonMapped.length){
      console.log("not found")
      setNotFound();
  }
}

function containsDesiredType(x, requiredType) {
  let result = false;
  //console.log(x.types);
  x.types.forEach((type) => {
    //console.log(type.type.name);
    if (type.type.name == requiredType) {
      result = true;
    }
  });
  return result;
}

function containsDesiredHabitat(pokemon, requiredHabitat) {
  let result = false;

  const targetHabitat = habitats.filter(
    (x) => x.name == requiredHabitat.toLowerCase()
  );
  console.log("Habitat");
  console.log(targetHabitat);
  const targetHabitatSpecies = targetHabitat[0].species;
  console.log("Habitat species");
  console.log(targetHabitatSpecies);
  console.log(pokemon.species.name);

  targetHabitatSpecies.forEach((specie) => {
    if (specie.name == pokemon.species.name) {
      result = true;
    }
  });
  console.log(result ? "Contains type" : "Not contains type");
  return result;
}