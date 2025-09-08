export function renderPokemon(pokeData, pokeCardsContainer, onCardClickFunction) {
  // Check if the card already exists
  const existingCard = document.getElementById(pokeData.number);
  if (existingCard) {
    // If the card already exists, return it
    return existingCard;
  }

  // Create a new card and append it if it doesn't exist
  const pokeContainer = createPokeCard(pokeData, onCardClickFunction);
  const container = document.getElementById(pokeCardsContainer);
  container.append(pokeContainer);

  return pokeContainer;
}

function createPokeCard(pokeData, onCardClickFunction) {
  let pokeCardContainer = document.createElement("div");
  pokeCardContainer.setAttribute("id", pokeData.number);
  pokeCardContainer.setAttribute("poke-name", pokeData.name);
  pokeCardContainer.classList.add("card");

  let pokeNumber = document.createElement("p");
  pokeNumber.innerText = `${pokeData.number}`;
  pokeNumber.classList.add("poke-number");

  let space = document.createElement("img");
  space.src = `${pokeData.image}`; // Use 'src' instead of 'srcset' for a single image
  space.classList.add("card-image");

  let pokeName = document.createElement("h4");
  pokeName.classList.add("poke-name");
  pokeName.innerText = pokeData.name.replace(
    pokeData.name[0],
    pokeData.name[0].toUpperCase()
  );

  pokeCardContainer.append(pokeName, space, pokeNumber);

  pokeCardContainer.addEventListener("click", () => {
    onCardClickFunction(pokeData.number);
  });

  return pokeCardContainer;
}
