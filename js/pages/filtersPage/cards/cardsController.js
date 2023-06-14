import { disableLoadingElements } from "../../../pokedexController.js"
import { renderPokemon } from "./cardCreator.js"

let pokeCards = []
let pokemonMapped
let habitats

export function printRecoveredPokemonData(mappedData, habitatsData, cardsContainerId, onCardClickFunction) {
  pokemonMapped = mappedData
  habitats = habitatsData
  for (let index = 0; index < pokemonMapped.length; index++) {
    const element = pokemonMapped[index];
    pokeCards.push(renderPokemon(element, cardsContainerId, onCardClickFunction));
    
  }
  disableLoadingElements();
}

export function clearTypeFilter() {
  pokeCards.forEach((card) => {
    card.classList.remove("hidden");
  })
}


// TODO: COMPLEX FILTERS
export function showCardsByFilter(filters) {
  const filtersList = []
  filters.forEach((filter) => {
    let filteredList = []
    if (filter.getIsEnabled()) {
      switch (filter.name) {
        case "id":
          console.log("id-enaBLED")
          filteredList.push(...pokemonMapped.filter((x) => x.number == filter.getInputValue()))
          break
        case "name":
          console.log("name-on")
          filteredList.push(...pokemonMapped.filter((x) => x.name.includes(filter.getInputValue())))
          break
        case "type":
          console.log("type-on")
          filteredList.push(...pokemonMapped.filter((x) => containsDesiredType(x, filter.getInputValue())))
          break
        case "habitat":
          console.log("habitat-on")
          filteredList.push(...pokemonMapped.filter((x) => containsDesiredHabitat(x, filter.getInputValue())))
          break
      }
    }
    if(filteredList.length > 0)
      filtersList.push(...filteredList)
  })

  console.log("filtersList")
  console.log(filtersList)

  const pokemonToHide = []

  pokemonMapped.forEach((pokemon) => {
    let result = false
    filtersList.forEach((list) => {
      if (list === pokemon) {
        result = true
      }
    })
    if (!result) {
      pokemonToHide.push(pokemon)
    }
  })
  console.log("Pokemons to hide"+pokemonToHide)

  pokemonToHide.forEach((pokemon) => {
    document.getElementById(pokemon.number).classList.add("hidden")
  });
}

export function showFilterCardByName(name) {
  const targetId = pokemonMapped.filter((e) => e.name == name.toLowerCase())
  console.log(targetId[0])
  document.getElementById(targetId[0].number)?.click();
}

export function showFilterCardByType(type) {
  console.log("type: " + type);
  const pokemonToHide = pokemonMapped.filter(
    (x) => containsDesiredType(x, type) !== true
  );
  pokemonToHide.forEach((pokemon) => {
    document.getElementById(pokemon.number).classList.add("hidden")
  });
}

export function showFilterByCardHabitat(habitat) {
  console.log("habitat: " + habitat);
  const pokemonToHide = pokemonMapped.filter(
    (x) => containsDesiredHabitat(x, habitat) !== true
  );
  pokemonToHide.forEach((pokemon) => {
    document.getElementById(pokemon.number).classList.add("hidden")
  });
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

  const targetHabitat = habitats.filter((x) => x.name == requiredHabitat.toLowerCase())
  console.log("Habitat")
  console.log(targetHabitat)
  const targetHabitatSpecies = targetHabitat[0].species
  console.log("Habitat species")
  console.log(targetHabitatSpecies)
  console.log(pokemon.species.name)

  targetHabitatSpecies.forEach((specie) => {
    if (specie.name == pokemon.species.name) {
      result = true;
    }
  });
  console.log(result ? "Contains type" : "Not contains type");
  return result;
}